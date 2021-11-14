using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HoozOn.Data;
using HoozOn.Data.PhaseRepo1;
using HoozOn.Data.TaggingRepo;
using HoozOn.DTOs;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;
using HoozOn.Entities.Responces;
using HoozOn.Entities.Users;
using HoozOn.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Controllers.Users {
    [ApiController]
    [Route ("api/[controller]")]
    public class UserController : ControllerBase {
        private readonly ICrudRepo _crudrepo;
        private readonly ITaggingRepo _itaggingrepo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UserController (ICrudRepo crudrepo, IMapper mapper, ITaggingRepo itaggingrepo, DataContext context) {
            _crudrepo = crudrepo;
            _mapper = mapper;
            _itaggingrepo = itaggingrepo;
            _context = context;
        }
        //Register Method api/User/register
        [HttpPost ("register")]
        public async Task<IActionResult> Register ([FromBody] User user) {
            // Checking Duplicate Entry
            if (await _crudrepo.IsUserExist (user.UserName)) {
                ModelState.AddModelError ("Duplicates", "This UserName already taken! Please choose another name");
                user.Success = false;
                user.Status = 422;
                user.Status_Message = "User with this User Name already exist";
            }

            // validate request
            if (!ModelState.IsValid) {
                user.Success = false;
                user.Status = 400;
                user.Status_Message = "User creation failed";
                return BadRequest (user);
            }

            //Saving Success data.
            var CreatedUser = await _crudrepo.AddUser (user);
            CreatedUser.Success = true;
            CreatedUser.Status = 200;
            CreatedUser.Status_Message = "User created successfully";
            return Ok (CreatedUser);
        }

        //Get All Users from Db
        [HttpGet ("AllUsers")]
        public async Task<IActionResult> GetUsers ([FromQuery] UserParams userParams) {
            var quickAdmission = await _crudrepo.GetUser (userParams);
            Response.AddPagination (quickAdmission.CurrentPage, quickAdmission.PageSize, quickAdmission.TotalCount, quickAdmission.TotalPages);
            return Ok (quickAdmission);
        }

        [HttpGet ("UserById/{Id}")]
        public async Task<IActionResult> UserById (int Id) {
            var serchItemShowing = await _itaggingrepo.getUserWithTagById (Id);
            return Ok (serchItemShowing);
        }

        //Update User Details                                                                                                                                  
        [HttpPost ("{Id}")]
        public async Task<IActionResult> updateUser (int Id, [FromBody] SocialAuthentication userDtos) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            ResponceData responceData = new ResponceData ();
            var user = await _crudrepo.getAuthUserById (Id);
            if (user == null) {
                responceData.Success = true;
                responceData.Status = 404;
                responceData.Status_Message = $"Could not find User with id of {Id}";
                return Ok (responceData);
            }

            user.Name = userDtos.Name;
            user.UserName = userDtos.UserName;
            user.MobileNumber = userDtos.MobileNumber;
            user.Email = userDtos.Email;
            user.AboutUs = userDtos.AboutUs;
            user.UserAddress = userDtos.UserAddress;
            user.WebSiteUrl = userDtos.WebSiteUrl;
            user.IsProfileCreated = true;
            user.Latitude=userDtos.Latitude;
            user.Longitude=userDtos.Longitude;

            userDtos.ImageUrl = user.ImageUrl;
            userDtos.CoverImageUrl = user.CoverImageUrl;

            _context.SocialAuthentication.Update (user);

            //Remove All Previous Tags Before Updateing User Tag
            var Usertagings = await _context.Tags.Where (c => c.UserId == Id).ToListAsync ();
            _context.Tags.RemoveRange (Usertagings);
            //END  

            foreach (var item in userDtos.tags) {
                item.UserId = Id;
                await _context.Tags.AddAsync (item);
            }

            if (await _context.SaveChangesAsync () > 0) {
                user.Success = true;
                user.Status = 201;
                user.Status_Message = $"User with id {Id} has been updated successfully.";
                return Ok (user);
            }
            throw new Exception ($"Updating user with id {Id} failed. Please try later to update.");

        }

        [HttpDelete ("{Id}")]
        public async Task<IActionResult> DeleteUser (int Id) {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            var user = await _crudrepo.getUserById (Id);
            if (user == null)
                return NotFound ($"Could not find user with id of {Id}");

            _crudrepo.Delete (user);
            await _crudrepo.SaveAll ();
            return NoContent ();

            throw new System.Exception ($"Deleting User with id {Id} failed. Please try later");
        }

        [HttpGet ("UserWithTags/{userId}")]
        public async Task<IActionResult> UserWithTags (int userId) {
            var serchItemShowing = await _itaggingrepo.getUserWithTagById (userId);
            return Ok (serchItemShowing);
        }

        [HttpGet ("UserListWithUserTagMatching/{userId}")]
        public async Task<ActionResult<IEnumerable<SocialAuthentication>>> UserListWithUserTagMatching (int userId) {
            List<SocialAuthentication> authUser = new List<SocialAuthentication> ();
            var CurrentUser = await _crudrepo.getAuthUserByIdWithTags (userId);
            var allUser = await _crudrepo.GetAllSocialAuthUserWithoutLoggedInUser (userId);

            foreach (var item1 in allUser) {
                foreach (var item3 in item1.tags) {
                    foreach (var item2 in CurrentUser.tags) {
                        if (item2.TagName == item3.TagName) {
                            authUser.Add (item1);
                        }
                    }
                }
            }

            if (authUser.ToList ().Count () == 0) {
                ResponceData _responces = new ResponceData ();
                _responces.Status = 209;
                _responces.Success = true;
                _responces.Status_Message = "No data found";
                return Ok (_responces);
            }
            return Ok (authUser.GroupBy (x => x.Id).Select (x => x.First ()).ToList ());
        }

        //Add JOb By Users
        [HttpPost ("AddUserJobs")]
        public async Task<IActionResult> AddUserJobs ([FromBody] UserJobs userjob) {
            ResponceData _responce = new ResponceData ();
            UserJobs CreatedUserJob = new UserJobs ();
            // Checking Duplicate Entry
            if (await _crudrepo.IsUserJobExist (userjob.socialAuthenticationId, userjob.jobModelId)) {
                ModelState.AddModelError ("Duplicates", "This Job already added!");

                _responce.Success = true;
                _responce.Status = 422;
                _responce.Status_Message = "Job already added!";
                CreatedUserJob = null;
                return Ok (new { _responce, CreatedUserJob });
            }

            // validate request
            if (!ModelState.IsValid) {
                return BadRequest ();
            }

            //Saving Success data.
            CreatedUserJob = await _crudrepo.AddUserJob (userjob);
            _responce.Success = true;
            _responce.Status = 200;
            _responce.Status_Message = "Job added successfully!";
            return Ok (new { _responce, CreatedUserJob });
        }

        // User List By Their Tag MACHING WIth job tag
        [HttpGet ("UserListWithUserTagMatchingWithJob/{userId}/{tagSearch}")]
        public async Task<ActionResult<IEnumerable<SocialAuthentication>>> UserListWithUserTagMatchingWithJob (int userId, string tagSearch) {
            List<JobModel> authUser = new List<JobModel> ();
            var CurrentUser = await _crudrepo.getAuthUserByIdWithTags (userId);
            var allJob = await _context.Jobs.Include (t => t.Tags).ToListAsync ();

            foreach (var item1 in allJob) {
                foreach (var item3 in item1.Tags) {
                    foreach (var item2 in CurrentUser.tags) {
                        if (item3.TagName.ToLower() == tagSearch.ToLower()) {
                            authUser.Add (item1);
                        }
                    }
                }
            }

            if (authUser.ToList ().Count () == 0) {
                ResponceData _responces = new ResponceData ();
                _responces.Status = 209;
                _responces.Success = true;
                _responces.Status_Message = "No data found";
                return Ok (_responces);
            }
            return Ok (authUser.GroupBy (x => x.Id).Select (x => x.First ()).ToList ());
        } 
    }
}
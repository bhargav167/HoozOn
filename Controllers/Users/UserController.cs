using System;
using System.Threading.Tasks;
using AutoMapper;
using HoozOn.Data.TaggingRepo;
using HoozOn.Entities.Responces;
using HoozOn.Data.PhaseRepo1;
using HoozOn.DTOs;
using HoozOn.Entities.Users;
using HoozOn.Helpers;
using Microsoft.AspNetCore.Mvc;
using HoozOn.Entities.Authentication;
using HoozOn.Data;

namespace HoozOn.Controllers.Users {
    [ApiController]
    [Route ("api/[controller]")]
    public class UserController : ControllerBase {
        private readonly ICrudRepo _crudrepo;
        private readonly ITaggingRepo _itaggingrepo;
        private readonly IMapper _mapper;
         private readonly DataContext _context;
        public UserController (ICrudRepo crudrepo, IMapper mapper, ITaggingRepo itaggingrepo,DataContext context) {
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

            user.Name=userDtos.Name;
            user.UserName=userDtos.UserName;
            user.MobileNumber=userDtos.MobileNumber;
            user.Email=userDtos.Email;
            user.AboutUs=userDtos.AboutUs;
            user.UserAddress=userDtos.UserAddress;
            user.WebSiteUrl=userDtos.WebSiteUrl;
            user.IsProfileCreated=true;
            
            userDtos.ImageUrl = user.ImageUrl;
            userDtos.CoverImageUrl = user.CoverImageUrl;
          
            _context.SocialAuthentication.Update(user);

            foreach (var item in userDtos.tags)
            {
                item.UserId=Id;
                await _context.Tags.AddAsync(item);
            }
            
            if (await _context.SaveChangesAsync()>0) {
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
    }
}
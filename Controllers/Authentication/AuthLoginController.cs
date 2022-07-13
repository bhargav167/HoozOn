using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using hoozonlinedatabase.Extensions;
using HoozOn.Data;
using HoozOn.Data.AuthenticationRepo;
using HoozOn.Data.PhaseRepo1;
using HoozOn.DTOs.Photos;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Responces;
using HoozOn.Entities.Users;
using HoozOn.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HoozOn.Controllers.Authentication {
    [ApiController]
    [Route ("api/[controller]")]
    public class AuthLoginController : ControllerBase {
        private readonly IAuthRepo _iAuthRepo;
        private readonly ICrudRepo _iUserRepo;
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
         private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById ("India Standard Time");
        public AuthLoginController (IAuthRepo iAuthRepo,
            ICrudRepo iUserRepo,
            IWebHostEnvironment environment,
            DataContext context,
            IOptions<CloudinarySettings> cloudinarysetting) {
            _iAuthRepo = iAuthRepo;
            _iUserRepo = iUserRepo;

            _context = context;
            this._environment = environment;
            _cloudinaryConfig = cloudinarysetting;
            Account acc = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary (acc);
        }
        //Register Method api/Auth/register
        [HttpPost ("AddAuthUser")]
        public async Task<IActionResult> AddAuthUser ([FromBody] SocialAuthentication socialAuthentication) {
            // Transaction
            // using (var transaction = _context.Database.BeginTransaction ()) {
            try {
                // Checking Duplicate Entry
                if (await _iAuthRepo.IsAuthExist (socialAuthentication.Email)) {
                    var Existuser = await _iAuthRepo.getAuthByEmail (socialAuthentication.Email);
                    Existuser.LastActive = TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
                    Existuser.IsOnline = true;
                    Existuser.Status = 409;
                    Existuser.Success = true;
                    Existuser.LoginTime = DateTime.Now;
                    Existuser.Status_Message = "User with this google account already exist";
                    _context.SocialAuthentication.Update(Existuser);
                    await _context.SaveChangesAsync();
                    return Ok (Existuser);
                }

                // validate request
                if (!ModelState.IsValid)
                    return BadRequest (ModelState);

                //Create random UserName on server
                var createdUserName = RandomUserName.CreateUserName (socialAuthentication.UserName);

                //TODO Check If CreatedUsername Exist

                //Initiliz auth status
                socialAuthentication.Status = 200;
                socialAuthentication.Name = socialAuthentication.UserName;
                socialAuthentication.UserName = createdUserName;
                socialAuthentication.ImageUrl = "http://res.cloudinary.com/drmnyie0t/image/upload/v1652501879/Default_User_1_esjtmm.png";
                socialAuthentication.ProfileImageName = "Default_User_1_esjtmm.png";
                socialAuthentication.CoverImageUrl = "http://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/banner_rtgv2n.png";
                socialAuthentication.Success = true;
                socialAuthentication.LoginTime = TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
                socialAuthentication.Status_Message = "User added to database successfully";
                 socialAuthentication.LastActive=TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
            socialAuthentication.IsOnline=true;
                var CreatedAuth = await _iAuthRepo.AddAuth (socialAuthentication);

             
                return Ok (CreatedAuth);
            } catch (Exception ex) {
                throw new Exception ($"Error in adding Auth Data {ex}");
            }
            // }
        }

        //CustomUser Method api/Auth/AddCustomUser
        [HttpPost ("AddCustomUser")]
        public async Task<IActionResult> AddCustomUser ([FromBody] SocialAuthentication socialAuthentication) {
            try {
                // Checking Duplicate Entry
                if (await _iAuthRepo.IsAuthExist (socialAuthentication.Email)) {
                    var Existuser = await _iAuthRepo.getAuthByEmail (socialAuthentication.Email);
                    Existuser.Status = 409;
                    Existuser.Success = true;
                    Existuser.LoginTime = DateTime.Now;
                    Existuser.Status_Message = "User with this google account already exist";

                    return Ok (Existuser);
                }
                // validate request
                if (!ModelState.IsValid)
                    return BadRequest (ModelState);

                //Create random UserName on server
                var createdUserName = RandomUserName.CreateUserName (socialAuthentication.UserName);

                //TODO Check If CreatedUsername Exist

                //Initiliz auth status
                socialAuthentication.Status = 200;
                socialAuthentication.Name = socialAuthentication.UserName;
                socialAuthentication.UserName = createdUserName;
                socialAuthentication.ImageUrl = "http://res.cloudinary.com/drmnyie0t/image/upload/v1652501879/Default_User_1_esjtmm.png";
                socialAuthentication.CoverImageUrl = "http://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/banner_rtgv2n.png";
                socialAuthentication.Success = true;
                socialAuthentication.LoginTime = DateTime.Now;
                socialAuthentication.Status_Message = "User added to database successfully";

                var CreatedAuth = await _iAuthRepo.AddAuth (socialAuthentication);
                return Ok (CreatedAuth);
            } catch (Exception ex) {
                throw new Exception ($"Error in adding Auth Data {ex}");
            }
        }

        //CustomUser Login ByPassword Method api/Auth/AddCustomUser
        [HttpPost ("Login")]
        public async Task<IActionResult> Login ([FromBody] AuthLogin login) {
            try {
                // Checking Duplicate Entry
                if (await _iAuthRepo.IsAuthExist (login.Email)) {
                    var Existuser = await _iAuthRepo.Login (login.Email, login.Password);
                    //Initiliz auth status
                    if (Existuser == null) {
                        ResponceData responce = new ResponceData ();
                        responce.Status = 209;
                        responce.Success = true;
                        responce.Status_Message = "Email or password is not correct. Please check";
                        return Ok (responce);
                    }
                    return Ok (Existuser);
                }
            } catch (Exception ex) {
                throw new Exception ($"Error in adding Auth Data {ex}");
            }
            return NoContent ();
        }


        //LogOut Activity
        [HttpPost("LogOut/{loginId}")]
        public async Task<IActionResult> LogOut(int loginId)
        {
            try
            {
               await _iAuthRepo.LogOut(loginId);
                
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in adding Auth Data {ex}");
            }
            return NoContent();
        }

         //LogOut Activity
        [HttpGet("IsOnline/{loginId}")]
        public async Task<IActionResult> IsOnline(int loginId)
        {
            try
            {
               var user =_context.SocialAuthentication.Where(x=>x.Id==loginId).Select(x=> new {x.IsOnline,x.LastActive}).FirstOrDefault();
               return Ok(user);
                
            }
            catch (Exception ex)
            {
                throw new Exception($"Error in adding Auth Data {ex}");
            }
            
        }



        //Add User Profile Image
        [HttpPost ("AddAuthUserImage/{userId}")]
        public async Task<IActionResult> AddPhotoForUser (int userId, [FromHeader] IFormFile file) {
            try {
                var userToUpdate = await _iAuthRepo.getAuthById (userId);
                var userProfile = await _iUserRepo.getUserByAuthId (userToUpdate.Id);
                if (userToUpdate == null)
                    return NoContent ();

                //Handle Image to save to cloudinary
                var imgfile = file;
                var uploadResult = new ImageUploadResult ();
                PhotoDto photoDto = new PhotoDto ();

                if (imgfile.Length > 0) {
                    using (var stream = file.OpenReadStream ()) {
                        var uploadParms = new ImageUploadParams () {
                        File = new FileDescription (imgfile.Name, stream),
                        Transformation = new Transformation ()
                        };
                        uploadResult = _cloudinary.Upload (uploadParms);
                        if (uploadResult.Format.ToLower () == "pdf" || uploadResult.Format.ToLower () == "docx") {
                            photoDto.Success = false;
                            photoDto.Status = 400;
                            photoDto.Status_Message = "Uploded file not supported. Please Choose image file";
                            return BadRequest (photoDto);
                        }

                    }
                }
                //Photo field for responces 
                photoDto.url = uploadResult.Url.ToString ().Replace("http","https");
                photoDto.PublicId = uploadResult.PublicId;
                photoDto.Success = true;
                photoDto.Status = 200;
                photoDto.Status_Message = "Profile image uploaded successfully";

                userToUpdate.ImageUrl = photoDto.url.Replace("http","https");;
                userToUpdate.ProfileImageName = uploadResult.PublicId + "." + uploadResult.Format;
                if (userProfile != null) {
                    userProfile.ImageUrl = photoDto.url;
                    _context.Users.Update (userProfile);
                }

                _context.SocialAuthentication.Update (userToUpdate);
                if (await _context.SaveChangesAsync () > 0)
                    return Ok (photoDto);

            } catch (Exception ex) {
                throw new Exception ($"Error in Uploading file {ex}");
            }
            return BadRequest ("Not Uploaded");
        }

        //Add User Cover Image
        [HttpPost ("AddAuthUserCoverImage/{userId}")]
        public async Task<IActionResult> AddAuthUserCoverImage (int userId, [FromHeader] IFormFile file) {
            var userToUpdate = await _iAuthRepo.getAuthById (userId);
            var userProfile = await _iUserRepo.getUserByAuthId (userToUpdate.Id);
            if (userToUpdate == null)
                return NoContent ();

            //Handle Image to save to cloudinary
            var imgfile = file;
            var uploadResult = new ImageUploadResult ();
            PhotoDto photoDto = new PhotoDto ();

            if (imgfile.Length > 0) {
                using (var stream = file.OpenReadStream ()) {
                    var uploadParms = new ImageUploadParams () {
                    File = new FileDescription (imgfile.Name, stream),
                    Transformation = new Transformation ()
                    };
                    uploadResult = _cloudinary.Upload (uploadParms);
                    if (uploadResult.Format.ToLower () == "pdf" || uploadResult.Format.ToLower () == "docx") {
                        photoDto.Success = false;
                        photoDto.Status = 400;
                        photoDto.Status_Message = "Uploded file not supported. Please Choose image file";
                        return BadRequest (photoDto);
                    }

                }
            }
            //Photo field for responces 
            photoDto.url = uploadResult.Url.ToString ().Replace("http","https");
            photoDto.PublicId = uploadResult.PublicId;
            photoDto.Success = true;
            photoDto.Status = 200;
            photoDto.Status_Message = "Cover image uploaded successfully";

            userToUpdate.CoverImageUrl = photoDto.url.Replace("http","https");
            _context.SocialAuthentication.Update (userToUpdate);

            if (userProfile != null) {
                userProfile.CoverImageUrl = photoDto.url.Replace("http","https");
                _context.Users.Update (userProfile);
            }

            if (await _context.SaveChangesAsync () > 0)
                return Ok (photoDto);

            return BadRequest ("Not Uploaded");
        }

        //Remove User Profile Image
        [HttpPost ("RemoveAuthUserImage/{userId}")]
        public async Task<IActionResult> RemovePhotoForUser (int userId) {
            try {
                var userToUpdate = await _iAuthRepo.getAuthById (userId);
                if (userToUpdate == null)
                    return NoContent ();

                //Photo field to Remove 
                userToUpdate.ImageUrl = "http://res.cloudinary.com/drmnyie0t/image/upload/v1652501879/Default_User_1_esjtmm.png";
                userToUpdate.ProfileImageName = "Default_User_1_esjtmm.png";

                _context.SocialAuthentication.Update (userToUpdate);
                if (await _context.SaveChangesAsync () > 0)
                    return Ok (userToUpdate);

            } catch (Exception ex) {
                throw new Exception ($"Error in Removing file {ex}");
            }
            return BadRequest ("Not Removed");
        }

    }
}
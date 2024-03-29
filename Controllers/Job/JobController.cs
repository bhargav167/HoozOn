using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using HoozOn.Data;
using HoozOn.Data.JobRepo;
using HoozOn.DTOs.Photos;
using HoozOn.Entities;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;
using HoozOn.Entities.Responces;
using HoozOn.Extensions;
using HoozOn.Helpers;
using HoozOn.Helpers.Job;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HoozOn.Controllers.Job {
    [ApiController]
    [Route ("api/[controller]")]
    public class JobController : ControllerBase {
        private readonly IJobRepo _jobrepo;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IWebHostEnvironment _environment;

        enum JobStatus {
            OPEN,
            CLOSED,
            ONHOLD,
            DELETE
        }

        public JobController (IJobRepo jobrepo, IMapper mapper,
            IWebHostEnvironment environment,
            DataContext context,
            IOptions<CloudinarySettings> cloudinarysetting) {
            _jobrepo = jobrepo;
            _mapper = mapper;
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
        //Register Method api/Job/AddJob
        [HttpPost ("AddJob")]
        public async Task<IActionResult> Addjob ([FromBody] JobModel job) {
            //Instances of Responces
            ResponceData responceData = new ResponceData ();
            // Checking Duplicate Entry
            if (await _jobrepo.IsJobExist (job.Id)) {
                var jobToUpdate = await _jobrepo.getJobToUpdate (job.Id);
                jobToUpdate.JobStatus = job.JobStatus;
                jobToUpdate.Latitude = job.Latitude;
                jobToUpdate.Longitude = job.Longitude;
                jobToUpdate.Address = job.Address;
                jobToUpdate.Descriptions = job.Descriptions;
                jobToUpdate.IsAnonymous = job.IsAnonymous;
                jobToUpdate.ImagesUrl = jobToUpdate.ImagesUrl;

                _context.Jobs.Update (jobToUpdate);
                await _context.SaveChangesAsync ();

                // ModelState.AddModelError ("Duplicates", "This Job already taken! Please Add another Job");
                responceData.Status = 200;
                responceData.Success = true;
                responceData.Status_Message = "Job Updated Successfully";
                return Ok (responceData);
            }

            // validate request
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            if (job.IsAnonymous == true) {
                job.AnonmousUserPic = "https://res.cloudinary.com/drmnyie0t/image/upload/v1653390397/anonymous_hmtlx2.png";
            } else {
                job.AnonmousUserPic = null;
            }

            var CreatedJob = await _jobrepo.AddJob (job);

            responceData.Status = 200;
            responceData.Success = true;
            responceData.Status_Message = "Your Job saved Successfully";
            return Ok (new { responceData, CreatedJob });

        }
        //Add User Profile Image
        [HttpPost ("AddJobImage/{jobId}")]
        public async Task<IActionResult> AddJobImage (int jobId, [FromHeader] IFormFile file) {
            if (file == null) {
                ResponceData data = new ResponceData ();
                Random _random = new Random ();

                List<string> colorCode = new List<string> ();
                colorCode.Add ("https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/yellow_nqizfk_vwqwci.png");
                colorCode.Add ("https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/blue_oz08g2_fzsuc7.png");
                colorCode.Add ("https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/dark_fuuilg_wfwzl4.png");
                colorCode.Add ("https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/red_a5ofay_dbezfi.png"); 

                var choosesColorIndex = _random.Next (0, 4);
                string selectedColor = colorCode[choosesColorIndex];
                var LastJobs = await _context.Jobs.FirstOrDefaultAsync (c => c.Id == jobId);

                //Photo field for responces 
                LastJobs.ImagesUrl = selectedColor;
                if(selectedColor=="https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/yellow_nqizfk_vwqwci.png"){
                     LastJobs.ImageName = "yellow_nqizfk_vwqwci.png";
                }
                if(selectedColor=="https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/blue_oz08g2_fzsuc7.png"){
                     LastJobs.ImageName = "blue_oz08g2_fzsuc7.png";
                }
                if(selectedColor=="https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/dark_fuuilg_wfwzl4.png"){
                    LastJobs.ImageName = "dark_fuuilg_wfwzl4.png";
                }
                if(selectedColor=="https://res.cloudinary.com/drmnyie0t/image/upload/v1652498915/red_a5ofay_dbezfi.png"){
                    LastJobs.ImageName = "red_a5ofay_dbezfi.png";
                }
                _context.Jobs.Update (LastJobs);
                await _context.SaveChangesAsync ();
                return Ok (LastJobs);
            }

            //     //Saving Image to cloudinary
            //       //Handle Image to save to cloudinary
            var imgfile = file;
            var uploadResult = new ImageUploadResult ();
            PhotoDto photoDto = new PhotoDto ();

            if (imgfile.Length > 0) {
                using (var stream = imgfile.OpenReadStream ()) {
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

            var LastJob = await _context.Jobs.FirstOrDefaultAsync (c => c.Id == jobId);

            //Photo field for responces 
            LastJob.ImagesUrl = uploadResult.Url.ToString ().Replace("http","https");
            LastJob.ImageName = uploadResult.PublicId + "." + uploadResult.Format;
            _context.Jobs.Update (LastJob);
            await _context.SaveChangesAsync ();
            return Ok (LastJob);
        }

        //Update Job Method api/Job/UpdateJob
        [HttpPost ("UpdateJob/{JobId}")]
        public async Task<IActionResult> UpdateJob (int JobId, [FromBody] JobModel job) {
            //Instances of Responces
            ResponceData responceData = new ResponceData ();
            // Checking Duplicate Entry
            if (await _jobrepo.IsJobExist (JobId)) {
                var CreatedJob = await _jobrepo.getJobToUpdate (JobId);
                CreatedJob.JobStatus = job.JobStatus;
                CreatedJob.Latitude = job.Latitude;
                CreatedJob.Longitude = job.Longitude;
                CreatedJob.Address = job.Address;
                CreatedJob.Descriptions = job.Descriptions;
                CreatedJob.IsAnonymous = job.IsAnonymous;
                CreatedJob.JobStatus = job.JobStatus;

                _context.Jobs.Update (CreatedJob);
                await _context.SaveChangesAsync ();

                // ModelState.AddModelError ("Duplicates", "This Job already taken! Please Add another Job");
                responceData.Status = 200;
                responceData.Success = true;
                responceData.Status_Message = "Job Updated Successfully";
                return Ok (new { responceData, CreatedJob });
            }

            // validate request
            if (!ModelState.IsValid)
                return BadRequest (ModelState);

            return null;
        }

        //Get All Job from Db
        [HttpGet ("AllJob")]
        public async Task<IActionResult> GetJobs ([FromQuery] UserParams userParams) {
            var jobs = await _jobrepo.GetAllJob (userParams);

            JobResponces res = new JobResponces ();
            if (jobs.Count == 0) {
                res.Status = 209;
                res.Success = true;
                res.status_message = "success";
                return Ok (res);
            }

            res.Status = 200;
            res.Success = true;
            res.status_message = "success";
            res.data = jobs;
            res.TotalRecord = res.data.Count ();

            foreach (var item in res.data) {
                item.TimeAgo = DateFormat.RelativeDate (item.CreatedBy);
                if (item.ImagesUrl == null) {
                    item.ThumbNailImage = null;
                } else {
                    item.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.ImageName);
                    item.JobDetailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (1030).Height (412).Crop ("fill"))
                        .BuildUrl (item.ImageName);
                }
            }
            foreach (var item in res.data) {
                var totalMessages = await _context.JobUserChat.Where (c => c.JobId == item.Id).ToListAsync ();
                var totalMessagesRead = await _context.JobUserChat.Where (c => c.JobId == item.Id && c.IsRead == false).ToListAsync ();
                item.TotalResponces = totalMessages.Count ();
                item.TotalRead = totalMessagesRead.Count ();
            }
            return Ok (res);
        }

        [HttpGet ("JobById/{Id}")]
        public async Task<IActionResult> JobById (int Id, [FromQuery] UserParams userParams) {
            var job = await _jobrepo.getJobById (Id, userParams);
            var AllJob = await _context.Jobs.Where (c => c.UserId == Id && c.JobStatus == userParams.JobStatus).ToListAsync ();
            JobResponces res = new JobResponces ();
            if (job.Count == 0) {
                res.PageNumber = 0;
                res.PageSize = 0;
                res.TotalRecord = 0;
                if (userParams.JobStatus == JobStatus.OPEN.ToString ()) {
                    res.Status = 101;
                }
                if (userParams.JobStatus == JobStatus.CLOSED.ToString ()) {
                    res.Status = 102;
                }
                if (userParams.JobStatus == "ON HOLD") {
                    res.Status = 103;
                }
                if (userParams.JobStatus == JobStatus.DELETE.ToString ()) {
                    res.Status = 104;
                }
                res.Success = true;
                res.status_message = "success";
                return Ok (res);

            }

            res.PageNumber = userParams.PageNumber;
            res.PageSize = userParams.PageSize;
            res.Status = 200;
            res.Success = true;
            res.status_message = "success";
            res.data = job;
            res.TotalRecord = res.data.Count ();
            float total = AllJob.Count;
            float pagecount = total / userParams.PageSize;
            res.TotalPage = Convert.ToInt16 (Math.Ceiling (pagecount) + 1);

            foreach (var item in res.data) {
              //  item.TimeAgo = DateFormat.RelativeDate (item.CreatedBy);
                item.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                        .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                    .BuildUrl (item.User.ProfileImageName).Replace("http","https");
               item.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
                    item.JobDetailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (200).Height (200).Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
            }
            foreach (var item in res.data) {
                 item.TotalResponces = await _jobrepo.GetResponcesCount(item.Id,userParams.userId);
                
            }
            return Ok (res);
        }

        // Job List With Added Job By User

        [HttpGet ("GetAllWithAddedJob/{userId}")]
        public async Task<IActionResult> GetAllWithAddedJob (int userId, [FromQuery] JobParams userParams) {
            var jobs = await _jobrepo.GetAllWithAddedJob (userId, userParams);
           
            var AllJob = await _context.Jobs.Where (x => x.JobStatus == userParams.JobStatus).ToListAsync ();
            JobResponces res = new JobResponces ();
            if (jobs.Count == 0) {
                res.PageNumber = 0;
                res.PageSize = 0;
                res.TotalRecord = 0;
                if (userParams.JobStatus == JobStatus.OPEN.ToString ()) {
                    res.Status = 101;
                }
                if (userParams.JobStatus == JobStatus.CLOSED.ToString ()) {
                    res.Status = 102;
                }
                if (userParams.JobStatus == "ON HOLD") {
                    res.Status = 103;
                }
                if (userParams.JobStatus == JobStatus.DELETE.ToString ()) {
                    res.Status = 104;
                }

                res.Success = true;
                res.status_message = "success";
                return Ok (res);
            }
            res.PageNumber = userParams.PageNumber;
            res.PageSize = userParams.pageSize;

            res.Status = 200;
            res.Success = true;
            res.status_message = "success";
            res.data = jobs;
            res.TotalRecord = res.data.Count ();
            decimal pagecount = AllJob.Count / res.PageSize;
            res.TotalPage = Convert.ToInt16 (Math.Ceiling (pagecount + 1));
            foreach (var item in res.data) {
                item.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                        .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                    .BuildUrl (item.User.ProfileImageName).Replace("http","https");
 
                if (item.ImagesUrl == null) {
                    item.ThumbNailImage = null;
                } else {
                    item.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
                    item.JobDetailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (200).Height (200).Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
                }
            }
            
            return Ok (res);
        }

        //Single Job By Job Id
        [HttpGet ("SingleJobByJobId")]
        public async Task<IActionResult> SingleJobByJobId ([FromQuery] JobParams jobParams) {
            var job = await _jobrepo.getJobByJobId (jobParams);
            JobResponces res = new JobResponces ();
            if (job == null) {
                res.TotalRecord = 0;
                res.Status = 209;
                res.Success = true;
                res.status_message = "success";
                return Ok (res);
            }
            res.Status = 200;
            res.Success = true;
            res.status_message = "success";
            res.data = job;
            res.TotalRecord = res.data.Count ();
            foreach (var item in res.data) {
               item.TimeAgo = DateFormat.RelativeDate (item.CreatedBy);
                if (item.ImagesUrl == null) {
                    item.ThumbNailImage = null;
                } else {
                    item.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
                }
                item.JobDetailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                        .Quality ("auto").FetchFormat ("auto").Width (1030).Height (412).Crop ("fill"))
                    .BuildUrl (item.ImageName).Replace("http","https");
            }
            foreach (var item in res.data) {
                var totalMessages = await _context.JobUserChat.Where (c => c.JobId == item.Id).ToListAsync ();
                var totalMessagesRead = await _context.JobUserChat.Where (c => c.JobId == item.Id && c.IsRead == false).ToListAsync ();
                item.TotalResponces = totalMessages.Count ();
                item.TotalRead = totalMessagesRead.Count ();
            }
            return Ok (res);
        }

        //Get Job By Addtress
        //Get All Job from Db
        [HttpGet ("GetJobsByAddress")]
        public async Task<IActionResult> GetJobsByAddress ([FromQuery] JobParams jobParams) {
            var jobs = await _jobrepo.GetAllJobByAddress (jobParams);

            NewJob res = new NewJob ();
            if (jobs.Count == 0) {
                return Ok (res);
            }
            res.data = jobs;
            foreach (var item in res.data) {
                item.TimeAgo = DateFormat.RelativeDate (item.CreatedBy);
                if (item.ImagesUrl == null) {
                    item.ThumbNailImage = null;
                } else {
                    item.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
                }
            }
            return Ok (res);
        }

        [HttpGet ("GetUserByAddressAdTag")]
        public async Task<IActionResult> GetUserByAddressAdTag ([FromQuery] JobParams jobParam) {
            DataResponces modal = new DataResponces ();
            List<SocialAuthentication> users = new List<SocialAuthentication> ();
            var user = await _context.SocialAuthentication.Where (x => x.UserAddress.Contains (jobParam.Address))
                .Include (x => x.tags).OrderByDescending (c => c.Id).ToListAsync ();

            var loginUserTags = await _context.SocialAuthentication.Include (x => x.tags)
                .Where (c => c.Id == jobParam.UserId).FirstOrDefaultAsync ();

            // GetAllJob Job With Tag Search
            if (user.Count == 0) {
                var job = await _context.SocialAuthentication
                    .Include (x => x.tags).ToListAsync ();
                foreach (var item in job) {
                    foreach (var tag in item.tags) {
                        if (tag.TagName.ToLower () == jobParam.Address.ToLower ()) {
                            users.Add (item);
                            modal.data = users;
                        }
                    }
                }
            }
            // GetAllJob Job With Address And User Tags Related

            if (user.Count > 0) {
                if (loginUserTags != null) {
                    foreach (var job in user) {
                        foreach (var jobtag in job.tags) {
                            foreach (var item in loginUserTags.tags) {
                                if (item.TagName.ToLower () == jobtag.TagName.ToLower ()) {
                                    users.Add (job);
                                    modal.data = users;
                                }
                            }
                        }
                    }
                } else {
                    foreach (var job in user) {
                        users.Add (job);
                        modal.data = users;
                    }
                }

            }

            return Ok (modal);
        }

        //Job By Public Post
        [HttpGet ("AllJobByPublicPost")]
        public async Task<IActionResult> AllJobByPublicPost ([FromQuery] UserParams userParams) {
            var jobs = await _jobrepo.GetAllJobByPublic (userParams);
            var AllJob = await _context.Jobs.Where (x => x.JobStatus == userParams.JobStatus).ToListAsync ();
            JobResponces res = new JobResponces ();
            if (jobs.Count == 0) {
                res.PageNumber = 0;
                res.PageSize = 0;
                res.TotalRecord = 0;
                res.Status = 209;
                res.Success = true;
                res.status_message = "success";
                return Ok (res);
            }
            res.PageNumber = userParams.PageNumber;
            res.PageSize = userParams.PageSize;

            res.Status = 200;
            res.Success = true;
            res.status_message = "success";
            res.data = jobs;
            res.TotalRecord = res.data.Count ();
            decimal pagecount = AllJob.Count / res.PageSize;
            res.TotalPage = Convert.ToInt16 (Math.Floor (pagecount + 1));
            foreach (var item in res.data) {
                item.TimeAgo = DateFormat.RelativeDate (item.CreatedBy);
                if (item.ImagesUrl == null) {
                    item.ThumbNailImage = null;
                } else {
                    item.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
                    item.JobDetailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (1030).Height (412).Crop ("fill"))
                        .BuildUrl (item.ImageName).Replace("http","https");
                }
            }
            foreach (var item in res.data) {
                var totalMessages = await _context.JobUserChat.Where (c => c.JobId == item.Id && c.IsRead == false).ToListAsync ();
                var totalMessagesRead = await _context.JobUserChat.Where (c => c.JobId == item.Id && c.IsRead == true).ToListAsync ();

                item.TotalResponces = totalMessages.Count ();
                item.TotalRead = totalMessagesRead.Count ();
            }
            return Ok (res);
        }

        //Update JOb Status 
        [HttpPost ("UpdateJobStatus/{JobId}/{JobStatus}")]
        public async Task<IActionResult> UpdateJobStatus (int JobId, string JobStatus) {
            //Instances of Responces
            ResponceData responceData = new ResponceData ();
            // Checking Duplicate Entry
            if (await _jobrepo.IsJobExist (JobId)) {
                var CreatedJob = await _jobrepo.getJobToUpdate (JobId);
                if (CreatedJob.JobStatus == "CLOSED") {
                    responceData.Status = 209;
                    responceData.Success = true;
                    responceData.Status_Message = "Closed Job status cannot be change";
                    return Ok (new { responceData, CreatedJob });
                }
                CreatedJob.JobStatus = JobStatus;

                _context.Jobs.Update (CreatedJob);
                await _context.SaveChangesAsync ();
                responceData.Status = 200;
                responceData.Success = true;
                responceData.Status_Message = "Job status Updated Successfully";
                return Ok (new { responceData, CreatedJob });
            }
            return null;
        }

        //For Web oNly for now later remove
        //Single Job By Job Id
        [HttpGet ("WebSingleJobByJobId/{jobId}")]
        public async Task<IActionResult> WebSingleJobByJobId (int jobId) {
            var job = _context.Jobs.Where (x => x.Id == jobId).Include (x => x.Tags).Include (c => c.User)
                .OrderByDescending (c => c.Id).AsQueryable ();

            try {
                var totalMessages = await _context.JobUserChat.Where (c => c.JobId == jobId && c.IsRead == false).ToListAsync ();
                var totalMessagesRead = await _context.JobUserChat.Where (c => c.JobId == jobId && c.IsRead == true).ToListAsync ();

                foreach (var item in job) {
                 //  item.TimeAgo = DateFormat.RelativeDate (item.CreatedBy);
                    item.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.User.ProfileImageName).Replace("http","https");
                    if (item.ImagesUrl == null) {
                        item.ThumbNailImage = null;
                    } else {
                        item.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                            .BuildUrl (item.ImageName).Replace("http","https");
                        item.JobDetailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                .Quality ("auto").FetchFormat ("auto").Width (1030).Height (412).Crop ("fill"))
                            .BuildUrl (item.ImageName).Replace("http","https");
                    }
                    item.TotalResponces = totalMessages.Count ();
                    item.TotalRead = totalMessagesRead.Count ();
                }
            } catch (System.Exception ex) {
                return Ok (ex);
            }

            return Ok (job);
        }

    }
}
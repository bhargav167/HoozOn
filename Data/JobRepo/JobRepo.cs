using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using HoozOn.Data.TaggingRepo;
using HoozOn.Entities.Job;
using HoozOn.Entities.Message.JobMessage;
using HoozOn.Entities.Tag;
using HoozOn.Entities.Users;
using HoozOn.Helpers;
using HoozOn.Helpers.Job;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HoozOn.Data.JobRepo {
    public class JobRepo : IJobRepo {
        private readonly DataContext _context;
        private readonly ITaggingRepo _itaggingrepo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public JobRepo (DataContext context, ITaggingRepo itaggingrepo, IOptions<CloudinarySettings> cloudinarysetting) {
            _context = context;
            _itaggingrepo = itaggingrepo;
            _cloudinaryConfig = cloudinarysetting;
            Account acc = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary (acc);
        }
        public void Add<T> (T entity) where T : class {
            _context.Add (entity);
        }
        public async Task<JobModel> AddJob (JobModel job) {
            await _context.Jobs.AddAsync (job);
            await _context.SaveChangesAsync ();

            return job;
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove (entity);
        }

        public async Task<List<JobModel>> GetAllJob (UserParams userParam) {
            List<JobModel> modal = new List<JobModel> ();
            var job = await _context.Jobs.Where (x => x.JobStatus == "OPEN").Include (x => x.Tags).Include (x => x.User)
                .OrderByDescending (c => c.Id).ToListAsync ();

            if (userParam.SearchTagTerm != null) {
                foreach (var item in job) {
                    foreach (var tag in item.Tags) {
                        if (tag.TagName.ToLower () == userParam.SearchTagTerm.ToLower ()) {
                            modal.Add (item);
                        }
                    }
                }
            } else {
                return job;
            }

            return modal;
        }

        public async Task<List<JobModel>> GetAllJobByAddress (JobParams jobParam) {
            List<JobModel> modal = new List<JobModel> ();
            var jobs = await _context.Jobs.Where (x => x.JobStatus == "OPEN" && x.Address.Contains (jobParam.Address))
                .Include (x => x.Tags).Include (x => x.User).OrderByDescending (c => c.Id).ToListAsync ();

            var loginUserTags = await _context.SocialAuthentication.Include (x => x.tags)
                .Where (c => c.Id == jobParam.UserId).FirstOrDefaultAsync ();

            // GetAllJob Job With Tag Search
            if (jobs.Count == 0) {
                var job = await _context.Jobs.Where (x => x.JobStatus == "OPEN")
                    .Include (x => x.Tags).Include (x => x.User).ToListAsync ();
                foreach (var item in job) {
                    foreach (var tag in item.Tags) {
                        if (tag.TagName == jobParam.Address) {
                            modal.Add (item);
                        }
                    }
                }
            }
            // GetAllJob Job With Address And User Tags Related

            if (jobs.Count > 0) {
                if (loginUserTags != null) {
                    foreach (var job in jobs) {
                        foreach (var jobtag in job.Tags) {
                            foreach (var item in loginUserTags.tags) {
                                if (item.TagName == jobtag.TagName) {
                                    modal.Add (job);
                                }
                            }
                        }
                    }
                } else {
                    foreach (var job in jobs) {
                        modal.Add (job);
                    }
                }

            }

            return modal;
        }

        public async Task<PagedList<JobModel>> GetAllJobByPublic (UserParams userParam) {
            var job = _context.Jobs.Where (x => x.JobStatus == userParam.JobStatus && x.IsPublic == true).Include (x => x.Tags).Include (x => x.User)
                .OrderByDescending (c => c.Id).AsQueryable ();
            return await PagedList<JobModel>.CreateAsync (job, userParam.PageNumber, userParam.PageSize);
        }

        public async Task<PagedList<JobModel>> GetAllWithAddedJob(int userId, JobParams jobParam)
        {
            try
            {
                List<JobModel> modal = new List<JobModel>();
                var jobs = _context.Jobs.Where(x => x.JobStatus == jobParam.JobStatus && x.UserId != userId)
                    .Include(x => x.Tags).Include(x => x.User).AsQueryable();

                var loginUserTags = await _context.Tags.Where(x => x.UserId == userId).ToListAsync();

                var addedJobs = await _context.UserJobs.Include(c => c.jobModel).Include(c => c.jobModel.Tags).Include(c => c.jobModel.User)
                .Where(x => x.socialAuthenticationId == userId && x.jobModel.JobStatus == jobParam.JobStatus)
                .ToListAsync();

                var messagedJobs = await _context.JobUserChat.Include(c => c.Job).Include(c => c.Job.Tags).Include(c => c.Job.User)
               .Where(x => x.SenderId == userId)
               .ToListAsync();

                // GetAllJob Job With Address And User Tags Related 
                if (jobs.Count() > 0)
                {
                    if (loginUserTags != null)
                    {
                        foreach (var job in jobs)
                        {
                            foreach (var jobtag in job.Tags)
                            {
                                foreach (var item in loginUserTags)
                                {
                                    if (item.TagName.ToLower() == jobtag.TagName.ToLower())
                                    {
                                        modal.Add(job);
                                    }
                                }
                            }
                        }
                        // Add Addrd job 
                        foreach (var item in addedJobs)
                        {
                            modal.Add(item.jobModel);
                        }

                        // Add messaged job 

                        foreach (var item in messagedJobs)
                        {
                            modal.Add(item.Job);
                        }
                    }
                }

                // var results = modal.OrderByDescending(x => x.CreatedBy).GroupBy(x => x.Id).Select(x => x.Single()).ToList();

                return await PagedList<JobModel>.CreateAsync1(modal.OrderByDescending(x => x.CreatedBy).GroupBy(x => x.Id).Select(x => x.First()).ToList() ,jobParam.PageNumber, jobParam.pageSize);
            }
            catch (System.Exception e)
            {
                throw new Exception("Throw Exceptions" + e);
            }
        }
        public async Task<PagedList<JobModel>> GetJob (UserParams userParam) {
            var job = _context.Jobs.AsQueryable ();
            return await PagedList<JobModel>.CreateAsync (job, userParam.PageNumber, userParam.PageSize);
        }
        public async Task<PagedList<JobModel>> getJobById (int Id, UserParams userParam) {
            var job = _context.Jobs.Where (u => u.UserId == Id && u.JobStatus == userParam.JobStatus)
                .Include (c => c.Tags).Include (c => c.User)
                .OrderByDescending (c => c.Id)
                .AsQueryable ();
            return await PagedList<JobModel>.CreateAsync (job, userParam.PageNumber, userParam.PageSize);
        }

        public async Task<PagedList<JobModel>> getJobByJobId (JobParams jobParam) {
            var singlejob = _context.Jobs.Where (x => x.Id == jobParam.JobId).Include (x => x.Tags).Include (c => c.User)
                .OrderByDescending (c => c.Id).AsQueryable ();
            return await PagedList<JobModel>.CreateAsync (singlejob, jobParam.PageNumber, jobParam.pageSize);
        }

        //Wall Method
        public async Task<List<JobTags>> GetAllJobByMultiTag (JobParams jobParam) {
            var jobBasedOnTagSearch = await _context.JobTag.Include (x => x.Job).Include (x => x.Job.Tags)
                .Include (x => x.Job.User)
                .Where (c => c.TagName.ToLower ().Contains (jobParam.searchTag.Trim ().ToLower ())).ToListAsync ();

            return jobBasedOnTagSearch;
        }

        public Task<JobModel> getJobToUpdate (int JobId) {
            var singlejob = _context.Jobs.Where (x => x.Id == JobId).Include (x => x.Tags).Include (c => c.User).FirstOrDefaultAsync ();
            return singlejob;
        }

        public async Task<bool> IsJobExist (int Id) {
            if (await _context.Jobs.AnyAsync (e => e.Id == Id))
                return true;

            return false;
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }

        public async Task<List<Tags>> GetAllUserByMultiTag (UserParams userParam) {
            var jobBasedOnTagSearch = await _context.Tags.Include (x => x.User).Include (x => x.User.tags).
            Where (x => x.User.Id != userParam.userId)
                .Where (c => c.TagName.ToLower ().Contains (userParam.SearchTagTerm.Trim ().ToLower ())).ToListAsync ();

            return jobBasedOnTagSearch;
        }

        public async Task<PagedList<JobTags>> GetJobsByMultiTags (JobParams jobParams) {
            WallResponce jobTags = new WallResponce ();
            List<JobTags> jobs1 = new List<JobTags> ();
             try {
                if (jobParams.searchTag == null) {
                    var jobBasedOnTagSearch = await _context.JobTag.Include (x => x.Job).Include (x => x.Job.User)
                        .Include (x => x.Job.Tags).OrderByDescending (c => c.JobId).ToListAsync ();
                    var addedJob = await _context.UserJobs.Where (x => x.socialAuthenticationId == jobParams.UserId).ToListAsync ();
                    foreach (var item in jobBasedOnTagSearch) {

                        if (addedJob.Count != 0) {
                            foreach (var item1 in addedJob) {
                                if (item.JobId == item1.jobModelId) {
                                    item.Job.IsAdded = true;
                                }
                            }
                        }
                        item.Job.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                            .BuildUrl (item.Job.User.ProfileImageName).Replace("http","https");
                        //For Job Images
                         item.Job.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                     .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                                 .BuildUrl (item.Job.ImageName).Replace("http","https");
                        //Calculate Distances 
                        // double userlat = Convert.ToDouble (Loggeduser.Latitude);
                        // double userlonng = Convert.ToDouble (Loggeduser.Longitude);
                        // double lat = Convert.ToDouble (item.Job.Latitude);
                        // double lonng = Convert.ToDouble (item.Job.Longitude);
                        // var dis = CalculateDistance.DistanceTo (userlat, userlonng, lat, lonng);
                        // if (dis <= 200) {
                      //  item.Job.TimeAgo = DateFormat.RelativeDate (item.Job.CreatedBy);
                        jobTags.Success = true;
                        jobTags.Status = 200;
                        jobTags.status_message = "";
                        jobs1.Add (item);
                        jobTags.data = jobs1.Where (x => x.Job.JobStatus == "OPEN").OrderByDescending (c => c.JobId).GroupBy (x => x.JobId).Select (x => x.First ()).ToList ();

                        // } 
                    }
                    if(jobTags.data!=null){
                        return await PagedList<JobTags>.CreateAsync1 (jobTags.data, jobParams.PageNumber, jobParams.pageSize);
                    }else{
                        return null;
                    }
                    }

                var jobs = await GetAllJobByMultiTag (jobParams);
                if (jobs.Count != 0) {
                    foreach (var item in jobs) {
                         item.Job.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                 .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                             .BuildUrl (item.Job.User.ProfileImageName).Replace("http","https");
                        if (item.Job.ImagesUrl == null) {
                            item.Job.ImagesUrl = null;
                            item.Job.ThumbNailImage = null;
                        } else {
                            // item.Job.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            //         .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                            //     .BuildUrl (item.Job.ImageName);
                        }
                       // item.Job.TimeAgo = DateFormat.RelativeDate (item.Job.CreatedBy);
                        jobTags.Success = true;
                        jobTags.Status = 200;
                        jobTags.status_message = "";
                        jobs1.Add (item);
                        jobTags.data = jobs1.Where (x => x.Job.JobStatus == "OPEN").OrderByDescending (c => c.JobId).GroupBy (x => x.JobId).Select (x => x.First ()).ToList ();
                    }
                }
                if (jobs.Count == 0) {
                    var jobBasedOnTagSearch = await _context.JobTag.Include (x => x.Job)
                        .Include (x => x.Job.Tags).Include (x => x.Job.User).ToListAsync ();
                    var searchtag = jobParams.searchTag.Trim ().Split (' ');
                    foreach (var item2 in searchtag) {
                        foreach (var item in jobBasedOnTagSearch) {
                            var tag = item.TagName.Split (' ');
                            foreach (var item1 in tag) {
                                if (item2.ToLower () == item1.ToLower ()) {
                                    item.Job.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                            .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                                        .BuildUrl (item.Job.User.ProfileImageName).Replace("http","https");
                                    if (item.Job.ImagesUrl == null) {
                                        item.Job.ImagesUrl = null;
                                        item.Job.ThumbNailImage = null;
                                    } else {
                                        // item.Job.ThumbNailImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                                        //         .Quality ("auto").FetchFormat ("auto").Width (500).Height (500).Gravity ("faces").Crop ("fill"))
                                        //     .BuildUrl (item.Job.ImageName);
                                    }
                                   // item.Job.TimeAgo = DateFormat.RelativeDate (item.Job.CreatedBy);
                                    jobTags.Success = true;
                                    jobTags.Status = 200;
                                    jobTags.status_message = "";
                                    jobs1.Add (item);
                                    jobTags.data = jobs1.Where (x => x.Job.JobStatus == "OPEN").OrderByDescending (c => c.JobId).GroupBy (x => x.JobId).Select (x => x.First ()).ToList ();
                                }
                            }

                        }
                    }

                    //If No tag match then add that tag to tag master 
                    if (jobTags.data == null && !await _itaggingrepo.IsTagMasterExist (jobParams.searchTag)) {
                        // TagMaster tagMaster = new TagMaster ();
                        // tagMaster.TagName = jobParams.searchTag;
                        // await _itaggingrepo.AddTagMaster (tagMaster);
                        // await _context.SaveChangesAsync ();

                        return await PagedList<JobTags>.CreateAsync1 (jobTags.data, jobParams.PageNumber, jobParams.pageSize);
                    }

                    return await PagedList<JobTags>.CreateAsync1 (jobTags.data, jobParams.PageNumber, jobParams.pageSize);
                }

                return await PagedList<JobTags>.CreateAsync1 (jobTags.data, jobParams.PageNumber, jobParams.pageSize);
            } catch (System.Exception ex) {
                throw new Exception ("Error in featching data from server :" + ex.Message);
            }

        }

        public async Task<PagedList<Tags>> GetUsersByMultiTags (UserParams jobParams) {
            UserResponce jobTags = new UserResponce ();
            List<Tags> jobs1 = new List<Tags> ();

            if (jobParams.SearchTagTerm == null) 
            {
                var jobBasedOnTagSearch = await _context.Tags.Include (x => x.User)
                    .Include (x => x.User.tags).Where (x => x.User.Id != jobParams.userId).OrderByDescending (c => c.UserId).ToListAsync ();
                    
                    var alluser=await _context.SocialAuthentication.Where(x=>x.Id!= jobParams.userId).ToListAsync();
                    
                foreach (var item in alluser) {
                    item.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.ProfileImageName).Replace("http","https");
                    jobTags.Success = true;
                    jobTags.Status = 200;
                    jobTags.status_message = "";
                    Tags tg=new Tags();
                    tg.UserId=item.Id;
                    tg.User=item;
                    jobs1.Add (tg);
                    jobTags.data = jobs1.OrderByDescending (c => c.UserId).GroupBy (x => x.UserId).Select (x => x.First ()).ToList ();

                }
                return await PagedList<Tags>.CreateAsync1 (jobTags.data, jobParams.PageNumber, jobParams.PageSize);
            }

            var jobs = await GetAllUserByMultiTag (jobParams);

            foreach (var item in jobs) {
                  item.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.User.ProfileImageName).Replace("http","https");
                jobTags.Success = true;
                jobTags.Status = 200;
                jobTags.status_message = "";
                jobs1.Add (item);
                jobTags.data = jobs1.OrderByDescending (c => c.UserId).GroupBy (x => x.UserId).Select (x => x.First ()).ToList ();
            }

            if (jobs.Count == 0) {
                var jobBasedOnTagSearch = await _context.Tags.Include (x => x.User)
                    .Include (x => x.User.tags).Where (x => x.User.Id != jobParams.userId).ToListAsync ();
                var searchtag = jobParams.SearchTagTerm.Trim ().Split (' ');
                foreach (var item2 in searchtag) {
                    foreach (var item in jobBasedOnTagSearch) {
                        var tag = item.TagName.Split (' ');
                        foreach (var item1 in tag) {
                            if (item2.ToLower () == item1.ToLower ()) {
                                  item.User.UserImage = _cloudinary.Api.UrlImgUp.Transform (new Transformation ()
                            .Quality ("auto").FetchFormat ("auto").Width (128).Height (128).Gravity ("faces").Crop ("fill"))
                        .BuildUrl (item.User.ProfileImageName).Replace("http","https");
                                jobTags.Success = true;
                                jobTags.Status = 200;
                                jobTags.status_message = "";
                                jobs1.Add (item);
                                jobTags.data = jobs1.OrderByDescending (c => c.UserId).GroupBy (x => x.UserId).Select (x => x.First ()).ToList ();
                            }
                        }

                    }
                }
                return await PagedList<Tags>.CreateAsync1 (jobTags.data, jobParams.PageNumber, jobParams.PageSize);
            }

            return await PagedList<Tags>.CreateAsync1 (jobTags.data, jobParams.PageNumber, jobParams.PageSize);
        }

        public async Task<int> GetResponcesCount (int jobId,int senderId) {
             var totalMessages = await _context.JobUserChat.Where (c => c.JobId == jobId && c.SenderId!=senderId && c.IsRead==false).ToListAsync ();
                 int TotalResponces = totalMessages.Count ();
                 return TotalResponces;
        }
        public async Task<List<JobUserChat>> GetResponcesCountGlobal(int senderId)
        {
            var notification = await _context.JobUserChat.Where(c => c.RecipientId == senderId)
            .Include(c=>c.Job).OrderBy(c=>c.CreateDate)
            .ToListAsync();
             
            return notification;
        }
         public async Task<int> GetCount (int senderId) {
             var totalMessages = await _context.JobUserChat.Where (c => c.RecipientId == senderId && c.IsRead==false).ToListAsync ();
                 int TotalResponces = totalMessages.Count ();
                 return TotalResponces;
        }
    }
}
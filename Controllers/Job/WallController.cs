using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using HoozOn.Data;
using HoozOn.Data.JobRepo;
using HoozOn.Data.TaggingRepo;
using HoozOn.Entities.Job;
using HoozOn.Entities.Tag;
using HoozOn.Entities.Users;
using HoozOn.Extensions;
using HoozOn.Helpers;
using HoozOn.Helpers.Job;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HoozOn.Controllers.Job {
    [ApiController]
    [Route ("api/[controller]")]
    public class WallController : ControllerBase {
        private readonly IJobRepo _jobrepo;
        private readonly DataContext _context;
        private readonly ITaggingRepo _itaggingrepo; 
       
        public WallController (IJobRepo jobrepo, ITaggingRepo itaggingrepo, DataContext context
        ) {
            _jobrepo = jobrepo;
            _context = context;
            _itaggingrepo = itaggingrepo;
           
        }

        [HttpGet ("GetJobsByMultiTags")]
        public async Task<IActionResult> GetJobsByMultiTags ([FromQuery] JobParams jobParams) {
            WallResponce jobTags = new WallResponce ();
            List<JobTags> jobs1 = new List<JobTags> ();

            if (jobParams.searchTag == null) {
                var jobBasedOnTagSearch = await _context.JobTag.Include (x => x.Job).Include (x => x.Job.User)
                    .Include (x => x.Job.Tags).OrderByDescending (c => c.JobId).ToListAsync ();

                foreach (var item in jobBasedOnTagSearch) {

                    item.Job.TimeAgo = DateFormat.RelativeDate (item.Job.CreatedBy);
                    jobTags.Success = true;
                    jobTags.Status = 200;
                    jobTags.status_message = "";
                    jobs1.Add (item);
                    jobTags.data = jobs1.Where (x => x.Job.JobStatus == "OPEN").OrderByDescending (c => c.JobId).GroupBy (x => x.JobId).Select (x => x.First ()).ToList ();

                }
                return Ok (jobTags);
            }

            var jobs = await _jobrepo.GetAllJobByMultiTag (jobParams);

            foreach (var item in jobs) {
                item.Job.TimeAgo = DateFormat.RelativeDate (item.Job.CreatedBy);
                jobTags.Success = true;
                jobTags.Status = 200;
                jobTags.status_message = "";
                jobs1.Add (item);
                jobTags.data = jobs1.Where (x => x.Job.JobStatus == "OPEN").OrderByDescending (c => c.JobId).GroupBy (x => x.JobId).Select (x => x.First ()).ToList ();
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
                                item.Job.TimeAgo = DateFormat.RelativeDate (item.Job.CreatedBy);
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
                    TagMaster tagMaster = new TagMaster ();
                    tagMaster.TagName = jobParams.searchTag;
                    await _itaggingrepo.AddTagMaster (tagMaster);
                    await _context.SaveChangesAsync ();
                    return Ok (jobTags);
                }

                return Ok (jobTags);
            }

            return Ok (jobTags);
        }

        [HttpGet ("GetUserByMultiTags")]
        public async Task<IActionResult> GetUserByMultiTags ([FromQuery] UserParams jobParams) {
            UserResponce jobTags = new UserResponce ();
            List<Tags> jobs1 = new List<Tags> ();

            if (jobParams.SearchTagTerm == null) {
                var jobBasedOnTagSearch = await _context.Tags.Include (x => x.User)
                    .Include (x => x.User.tags).OrderByDescending (c => c.UserId).ToListAsync ();

                foreach (var item in jobBasedOnTagSearch) {
                    jobTags.Success = true;
                    jobTags.Status = 200;
                    jobTags.status_message = "";
                    jobs1.Add (item);
                    jobTags.data = jobs1.OrderByDescending (c => c.UserId).GroupBy (x => x.UserId).Select (x => x.First ()).ToList ();

                }
                return Ok (jobTags);
            }

            var jobs = await _jobrepo.GetAllUserByMultiTag (jobParams);

            foreach (var item in jobs) {

                jobTags.Success = true;
                jobTags.Status = 200;
                jobTags.status_message = "";
                jobs1.Add (item);
                jobTags.data = jobs1.OrderByDescending (c => c.UserId).GroupBy (x => x.UserId).Select (x => x.First ()).ToList ();
            }

            if (jobs.Count == 0) {
                var jobBasedOnTagSearch = await _context.Tags.Include (x => x.User)
                    .Include (x => x.User.tags).ToListAsync ();
                var searchtag = jobParams.SearchTagTerm.Trim ().Split (' ');
                foreach (var item2 in searchtag) {
                    foreach (var item in jobBasedOnTagSearch) {
                        var tag = item.TagName.Split (' ');
                        foreach (var item1 in tag) {
                            if (item2.ToLower () == item1.ToLower ()) {

                                jobTags.Success = true;
                                jobTags.Status = 200;
                                jobTags.status_message = "";
                                jobs1.Add (item);
                                jobTags.data = jobs1.OrderByDescending (c => c.UserId).GroupBy (x => x.UserId).Select (x => x.First ()).ToList ();
                            }
                        }

                    }
                }
                return Ok (jobTags);
            }

            return Ok (jobTags);
        }

        //fOR Web App
        [HttpGet ("WebGetJobsByMultiTags")]
        public async Task<IActionResult> WebGetJobsByMultiTags ([FromQuery] JobParams jobParams) {
            try {
                var wallList = await _jobrepo.GetJobsByMultiTags (jobParams);
                
                return Ok (wallList);
            } catch (System.Exception ex) {
                 throw new System.Exception("Error "+ex);
            }

        }

    }
}
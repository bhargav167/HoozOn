using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HoozOn.Data;
using HoozOn.Data.JobRepo;
using HoozOn.Entities.Job;
using HoozOn.Entities.Tag;
using HoozOn.Extensions;
using HoozOn.Helpers.Job;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Controllers.Job {
    [ApiController]
    [Route ("api/[controller]")]
    public class WallController : ControllerBase {
        private readonly IJobRepo _jobrepo;
        private readonly DataContext _context;
        public WallController (IJobRepo jobrepo, DataContext context) {
            _jobrepo = jobrepo;
            _context = context;
        }

        [HttpGet ("GetJobsByMultiTags")]
        public async Task<IActionResult> GetJobsByAddress ([FromQuery] JobParams jobParams) {
             List<JobTags> jobTags = new List<JobTags> ();
           
            if(jobParams.searchTag==null){
                  var jobBasedOnTagSearch = await _context.JobTag.Include (x => x.Job).Include(x=>x.Job.User)
                .Include (x => x.Job.Tags).ToListAsync ();

                foreach (var item in jobBasedOnTagSearch)
                {
                    item.Job.TimeAgo= DateFormat.RelativeDate(item.Job.CreatedBy);
                    jobTags.Add(item);
                }
                return Ok(jobTags.GroupBy (x => x.JobId).Select (x => x.First ()).ToList ());
            }

           
            var jobs = await _jobrepo.GetAllJobByMultiTag (jobParams);
            foreach (var item in jobs)
            {
                 item.Job.TimeAgo= DateFormat.RelativeDate(item.Job.CreatedBy);
                    jobTags.Add(item);
            }
            if (jobs.Count == 0) {
                var jobBasedOnTagSearch = await _context.JobTag.Include (x => x.Job)
                .Include (x => x.Job.Tags).Include(x=>x.Job.User).ToListAsync ();

                var searchtag = jobParams.searchTag.Split (' ');
                foreach (var item2 in searchtag) {
                    foreach (var item in jobBasedOnTagSearch) {
                        var tag = item.TagName.Split (' ');
                        foreach (var item1 in tag) { 
                            if (item2==item1) {
                                 item.Job.TimeAgo= DateFormat.RelativeDate(item.Job.CreatedBy);
                    
                                jobTags.Add (item);
                            }
                        }

                    }
                }
                return Ok (jobTags);
            }


            return Ok (jobTags);
        }

    }
}
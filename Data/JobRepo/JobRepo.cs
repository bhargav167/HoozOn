using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HoozOn.Entities.Job;
using HoozOn.Helpers;
using HoozOn.Helpers.Job;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Data.JobRepo {
    public class JobRepo : IJobRepo {
        private readonly DataContext _context;
        public JobRepo (DataContext context) {
            _context = context;
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

        public async Task<PagedList<JobModel>> GetAllJob (UserParams userParam) {
            var job = _context.Jobs.Where (x => x.JobStatus == userParam.JobStatus).Include (x => x.Tags).Include (x => x.User)
                .OrderByDescending (c => c.Id).AsQueryable ();
            return await PagedList<JobModel>.CreateAsync (job, userParam.PageNumber, userParam.PageSize);
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
    }
}
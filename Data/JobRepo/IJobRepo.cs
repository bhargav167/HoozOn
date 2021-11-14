using System.Collections.Generic;
using System.Threading.Tasks;
using HoozOn.Entities.Job;
using HoozOn.Helpers;
using HoozOn.Helpers.Job;

namespace HoozOn.Data.JobRepo {
    public interface IJobRepo {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll ();
        //Job Repo
        Task<bool> IsJobExist (int Id);
        Task<JobModel> AddJob (JobModel job);
        Task<PagedList<JobModel>> getJobById (int id, UserParams userParam);
        Task<PagedList<JobModel>> getJobByJobId (JobParams jobParam);
        Task<JobModel> getJobToUpdate (int JobId);
        Task<PagedList<JobModel>> GetJob (UserParams userParam);
        Task<List<JobModel>> GetAllJob (UserParams userParam);
        Task<List<JobModel>> GetAllJobByAddress (JobParams jobParam);

        //Job With Public Post Only
        Task<PagedList<JobModel>> GetAllJobByPublic (UserParams userParam);

        //JobList By Added Job by user
        Task<PagedList<JobModel>> GetAllWithAddedJob (JobParams userParam);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using HoozOn.Entities.Job;
using HoozOn.Entities.Message.JobMessage;
using HoozOn.Entities.Tag;
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
        Task<List<JobTags>> GetAllJobByMultiTag (JobParams jobParam);
         Task<List<Tags>> GetAllUserByMultiTag (UserParams userParam);

        //Job With Public Post Only
        Task<PagedList<JobModel>> GetAllJobByPublic (UserParams userParam);

        //JobList By Added Job by user
        Task<PagedList<JobModel>> GetAllWithAddedJob (int userId, JobParams userParam);


        //For Web
        Task<PagedList<JobTags>> GetJobsByMultiTags(JobParams jobParams);
        Task<PagedList<Tags>> GetUsersByMultiTags(UserParams jobParams);
        Task<int> GetResponcesCount(int jobId, int senderId);
         Task<int> GetCount(int senderId);
        Task<List<JobUserChat>> GetResponcesCountGlobal(int senderId);
    }
}
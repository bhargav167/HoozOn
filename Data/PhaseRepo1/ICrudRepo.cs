using System.Collections.Generic;
using System.Threading.Tasks;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Users;
using HoozOn.Helpers;

namespace HoozOn.Data.PhaseRepo1 {
    public interface ICrudRepo {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll ();

        //User Repo
        Task<bool> IsUserExist (string UserName);
        Task<User> AddUser (User users);
        Task<User> getUserById (int id);
        Task<User> getUserByAuthId (int id);
        Task<SocialAuthentication> getAuthUserById (int id);
        Task<SocialAuthentication> getAuthUserByIdWithTags (int userId);
        Task<PagedList<User>> GetUser (UserParams userParam);
        Task<IEnumerable<SocialAuthentication>> GetAllSocialAuthUserWithoutLoggedInUser (int authId);

        //AddUserJob
        Task<bool> IsUserJobExist (int userId,int jobId);
        Task<UserJobs> AddUserJob (UserJobs usersJob);
    }
}
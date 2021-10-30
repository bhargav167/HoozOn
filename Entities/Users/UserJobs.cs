using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;

namespace HoozOn.Entities.Users
{
    public class UserJobs
    {
        public int Id { get; set; }
        public int socialAuthenticationId { get; set; }
        public SocialAuthentication socialAuthentication { get; set; }
        public int jobModelId { get; set; }
        public JobModel jobModel { get; set; }
    }
}
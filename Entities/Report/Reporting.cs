using System.ComponentModel.DataAnnotations;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;

namespace HoozOn.Entities.Report
{
    public class Reporting
    {
        [Key]
        public int Id { get; set; }
        public int socialAuthenticationId { get; set; }
        public SocialAuthentication socialAuthentication { get; set; }
        public int jobModelId { get; set; }
        public JobModel jobModel { get; set; }
        public string Isusue { get; set; }
        public bool IsActive { get; set; } 
    }
}
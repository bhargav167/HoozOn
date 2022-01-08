using HoozOn.Entities.Authentication;

namespace HoozOn.Entities.Report
{
    public class UserReport
    {
        public int Id { get; set; }
        public int repoterID { get; set; }
        public SocialAuthentication repoter { get; set; }
          public int repotedID { get; set; }
        public SocialAuthentication repoted { get; set; }
        public string Issues { get; set; } 
    }
}
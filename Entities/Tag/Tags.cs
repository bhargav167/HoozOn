using System.ComponentModel.DataAnnotations;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Tag;

namespace HoozOn.Entities.Tag {
    public class Tags {
        [Key]
        public int Id { get; set; }
        public string TagName { get; set; }
        public int UserId { get; set; }
        public SocialAuthentication User { get; set; }
        public TagMaster TagMaster { get; set; }
        public int TagMasterId { get; set; }
        public bool IsApproved { get; set; }
    }
}
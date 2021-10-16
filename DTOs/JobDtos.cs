using System.ComponentModel.DataAnnotations;

namespace HoozOn.DTOs {
    public class JobDtos {
        [StringLength (500, MinimumLength = 50, ErrorMessage = "Description Length must be alteast 50 character long.")]
        public string Descriptions { get; set; }
        public string ImagesUrl { get; set; }
        public string Status { get; set; }
        public bool IsAnonymous { get; set; }
        public bool IsPublic { get; set; }
    }
}
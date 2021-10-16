using System;
using System.ComponentModel.DataAnnotations;

namespace HoozOn.DTOs.Photos
{
    public class PhotoDto
    { 
        public string url { get; set; }
        public string PublicId { get; set; }
        public int Status { get; set; } 
        public bool Success { get; set; }
        
        [Display(Name ="Status_Message")]
        public string Status_Message { get; set; }
        public DateTime UploadDate { get; set; }
        public PhotoDto()
        {
            UploadDate=DateTime.Now;
        }
    }
}
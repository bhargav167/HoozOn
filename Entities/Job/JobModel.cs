using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Tag;
using Microsoft.AspNetCore.Http;

namespace HoozOn.Entities.Job {
    public class JobModel { 
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public SocialAuthentication User { get; set; }

        [StringLength (2000, MinimumLength = 3, ErrorMessage = "Description Length must be alteast 5 character long.")]
        public string Descriptions { get; set; }
        public string ImagesUrl { get; set; }
        public string ImageName { get; set; } 
        [NotMapped]
        public string ThumbNailImage { get; set; } 
         [NotMapped]
        public string JobDetailImage { get; set; } 
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Address { get; set; } 
        public string Status { get; set; }
        public string City { get; set; }
        public string AnonmousUserPic { get; set; }
        public string ColorCode { get; set; } 

        //Boolean Properties
        public bool IsAnonymous { get; set; }
        public bool IsPublic { get; set; }
        public bool IsLocal { get; set; }
        public bool IsGlobal { get; set; }
        [NotMapped]
        public bool IsAdded { get; set; }
        
        
        //End Properties
        public DateTime CreatedBy { get; set; }
        [NotMapped]
        public string TimeAgo { get; set; }
        [NotMapped]
        public int TotalResponces { get; set; } 
        [NotMapped]
        public int TotalRead { get; set; } 
        public string JobStatus { get; set; } 
        [NotMapped]
        public IFormFile JobImges { get; set; } 
        public ICollection<JobTags> Tags { get; set; }
        public JobModel () {
            CreatedBy = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,INDIAN_ZONE);
            JobStatus="OPEN";
        }
    }  
}
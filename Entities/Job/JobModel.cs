using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Tag;
using Microsoft.AspNetCore.Http;

namespace HoozOn.Entities.Job {
    public class JobModel { 
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public SocialAuthentication User { get; set; }

        [StringLength (200, MinimumLength = 5, ErrorMessage = "Description Length must be alteast 5 character long.")]
        public string Descriptions { get; set; }
        public string ImagesUrl { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Address { get; set; } 
        public string Status { get; set; }

        //Boolean Properties
        public bool IsAnonymous { get; set; }
        public bool IsPublic { get; set; }
        public bool IsLocal { get; set; }
        public bool IsGlobal { get; set; }
        //End Properties
        public DateTime CreatedBy { get; set; }
        [NotMapped]
        public string TimeAgo { get; set; }
        [NotMapped]
        public int TotalResponces { get; set; } 
        public string JobStatus { get; set; } 
        [NotMapped]
        public IFormFile JobImges { get; set; } 
        public ICollection<JobTags> Tags { get; set; }
        public JobModel () {
            CreatedBy = DateTime.Now;
            JobStatus="OPEN";
        }
    }  
}
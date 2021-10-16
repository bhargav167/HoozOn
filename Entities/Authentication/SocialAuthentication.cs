using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HoozOn.Entities.Tag;
namespace HoozOn.Entities.Authentication
{
    public class SocialAuthentication
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        [Required (ErrorMessage = "Email should not be empty")]
        public string Email { get; set; }
        public string LoginProvider { get; set; }
        public string ImageUrl { get; set; }
        public string CoverImageUrl { get; set; } 
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string WebSiteUrl { get; set; } 
        public string Latitude { get; set; } 
        public string Longitude { get; set; }
        public string UserAddress { get; set; } 
        public string AboutUs { get; set; }
        public ICollection<Tags> tags { get; set; }
        public int Status { get; set; } 
        public bool Success { get; set; }
        [Display(Name ="Status_Message")]
        public string Status_Message { get; set; }
        public DateTime LoginTime { get; set; }
        public bool IsProfileCreated { get; set; }
        public SocialAuthentication()
        {
            LoginTime=DateTime.Now;
            IsProfileCreated=false;
        }
    }
}
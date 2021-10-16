using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Tag;

namespace HoozOn.Entities.Users {
    public class User {
        [Key]
        public int Id { get; set; }

        [Required (ErrorMessage = "UserName should not be empty")]
        [Display (Name = "User Name")]
        [RegularExpression (@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        [StringLength (30, MinimumLength = 6, ErrorMessage = "Length must be alteast 6 character and maximum 30.")]
        public string UserName { get; set; }

        // [Required (ErrorMessage = "Name should not be empty")]
        // [Display (Name = "Name")]
        // [RegularExpression (@"^[a-zA-Z'' ']+$", ErrorMessage = "Special character and Number should not be entered")]
        // [StringLength (50, MinimumLength = 4, ErrorMessage = "Length must be alteast 4 character and maximum 50.")]
        public string Name { get; set; }

        // [Required (ErrorMessage = "Mobile Number should not be empty")]
        // [Display (Name = "Mobile Number")]
        // [DataType (DataType.PhoneNumber)]
        // [RegularExpression (@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
        public string MobileNumber { get; set; }
        public string WebSiteUrl { get; set; } 
        public string Latitude { get; set; } 
        public string Longitude { get; set; }
        public string UserAddress { get; set; } 
        public string AboutUs { get; set; }
        public string ImageUrl { get; set; }
        public string CoverImageUrl { get; set; }  
        public bool IsUserOnline { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int SocialAuthenticationId { get; set; }
        public SocialAuthentication SocialAuthentication { get; set; } 
        public int? Status { get; set; } 
        public bool Success { get; set; } 
        [Display (Name = "Status_Message")]
        public string Status_Message { get; set; }
        public User () {
            CreatedOn = DateTime.Now;
        }
    }
}
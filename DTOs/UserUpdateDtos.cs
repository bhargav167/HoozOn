using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HoozOn.Entities.Tag;

namespace HoozOn.DTOs {
    public class UserUpdateDtos {
        [Required (ErrorMessage = "UserName should not be empty")]
        [Display (Name = "User Name")]
        [RegularExpression (@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special character should not be entered")]
        [StringLength (30, MinimumLength = 6, ErrorMessage = "Length must be alteast 6 character and maximum 30.")]
        public string UserName { get; set; }
        public string Name { get; set; }
        [Required (ErrorMessage = "Mobile Number should not be empty")]
        [Display (Name = "Mobile Number")]
        [DataType (DataType.PhoneNumber)]
        [RegularExpression (@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
        public string MobileNumber { get; set; }
        public string WebSiteUrl { get; set; } 
        public string Latitude { get; set; } 
        public string Longitude { get; set; }
        public string UserAddress { get; set; }
        public string AboutUs { get; set; }
        public string ImageUrl { get; set; }
        public string CoverImageUrl { get; set; }
         public ICollection<Tags> Tags { get; set; }

    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HoozOn.Entities.Authentication;

namespace HoozOn.Entities.Responces
{
    public class ResponceUserData
    {
         public int? Status { get; set; }
        public bool Success { get; set; }

        [Display (Name = "Status_Message")]
        public string Status_Message { get; set; }
        public List<SocialAuthentication> data { get; set; }
        
        
    }
}
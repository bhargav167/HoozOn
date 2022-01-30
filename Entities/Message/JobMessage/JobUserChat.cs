using System;
using System.ComponentModel.DataAnnotations.Schema;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;

namespace HoozOn.Entities.Message.JobMessage
{
    public class JobUserChat
    {
       private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public int Id { get; set; }
        public int JobId { get; set; }
        public JobModel Job { get; set; }
        [NotMapped]
        public bool IsAnonymous { get; set; } 
        public int SenderId { get; set; }
        public SocialAuthentication Sender { get; set; }
        public int RecipientId { get; set; }
        public SocialAuthentication Recipient { get; set; } 
        public bool IsRead { get; set; }
        public DateTime CreateDate { get; set; }
        public JobUserChat()
        {
          IsRead=false;
          CreateDate= TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,INDIAN_ZONE);
        }
    }
}
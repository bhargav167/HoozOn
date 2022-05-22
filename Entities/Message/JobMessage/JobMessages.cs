using System;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;
namespace HoozOn.Entities.Message.JobMessage
{
    public class JobMessages
    {
         private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public int Id { get; set; }
        public int JobId { get; set; }
        public JobModel Job { get; set; }
        public int SenderId { get; set; }
        public SocialAuthentication Sender { get; set; }
        public int RecipientId { get; set; }
        public SocialAuthentication Recipient { get; set; }
        public string Content { get; set; }
        public DateTime MessageSent { get; set; }
        public bool IsRead { get; set; }
        
        public JobMessages()
        {
          MessageSent = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,INDIAN_ZONE);
         
            IsRead=false;
        }
    }
}
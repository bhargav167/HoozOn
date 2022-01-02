using System;
using HoozOn.Entities.Authentication;

namespace HoozOn.Entities.Message
{
    public class MessagedUsers
    {
         private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public int Id { get; set; }
        public int SenderId { get; set; }
        public virtual SocialAuthentication Sender { get; set; } 
        public int RecipientId { get; set; }
        public virtual SocialAuthentication Recipient { get; set; } 
        public DateTime MessageSent { get; set; }
        public MessagedUsers()
        {
             MessageSent = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,INDIAN_ZONE);
        }
    }
}
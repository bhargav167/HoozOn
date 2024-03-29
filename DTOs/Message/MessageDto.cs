using System;
using System.Text.Json.Serialization;

namespace HoozOn.DTOs.Message
{
    public class MessageDto
    {
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public string Content { get; set; }
        public string SenderContent { get; set; }
        public string RecipientContent { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
        public string TimeAgo { get; set; }
        public string Times { get; set; } 
        [JsonIgnore]
        public bool SenderDeleted { get; set; }
        [JsonIgnore]
        public bool RecipientDeleted { get; set; }
        public MessageDto()
        {
          //  MessageSent = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,INDIAN_ZONE);
           MessageSent =DateTime.Now;
        }
    }
}
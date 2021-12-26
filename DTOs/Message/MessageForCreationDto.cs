using System;

namespace HoozOn.DTOs.Message
{
    public class MessageForCreationDto
    {
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public int RecipientId { get; set; }
        public DateTime MessageSent { get; set; }
        public string ChatTime { get; set; }
        public string Content { get; set; }
        public MessageForCreationDto()
        {
            MessageSent = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,INDIAN_ZONE);
        }
    }
}
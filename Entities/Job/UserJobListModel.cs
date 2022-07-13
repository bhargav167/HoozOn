using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace HoozOn.Entities.Job
{
    public class UserJobListModel
    {
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public int Id { get; set; }
        public int UserId { get; set; }
        public int JobId { get; set; }
        public string AddedType { get; set; }
        public DateTime CreatedDate { get; set; }
        public UserJobListModel()
        {
            CreatedDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
        }
    }
}
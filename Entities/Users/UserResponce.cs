using System.Collections.Generic;
using HoozOn.Entities.Tag;

namespace HoozOn.Entities.Users
{
    public class UserResponce
    {
         public bool Success { get; set; }
        public int Status { get; set; }
        public string status_message { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecord { get; set; }
        public int TotalPage { get; set; }
        public List<Tags> data { get; set; }
    }
}
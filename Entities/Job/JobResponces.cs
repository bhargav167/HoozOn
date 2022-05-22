using System.Collections.Generic;
using HoozOn.Helpers;

namespace HoozOn.Entities.Job
{
    public class JobResponces
    {
        public bool Success { get; set; }
        public int Status { get; set; }
        public string status_message { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecord { get; set; }
        public int TotalPage { get; set; }
        public IEnumerable<JobModel> data { get; set; }
    }
}
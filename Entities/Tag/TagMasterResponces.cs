using System.Collections.Generic;

namespace HoozOn.Entities.Tag
{
    public class TagMasterResponces
    {
         public bool Success { get; set; }
        public int Status { get; set; }
        public string status_message { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecord { get; set; }
        public int TotalPage { get; set; }
        public List<TagMaster> data { get; set; }
    }
}
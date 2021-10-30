namespace HoozOn.Helpers {
    public class UserParams {
        private const int MaxPageSize = 20;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 4;
        private int TotalRecord = 0;
        private int TotalPage { get; set; }
        public int PageSize {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string UserName { get; set; }
        public int userId { get; set; } 
        public string JobStatus { get; set; } = "OPEN";
        public string OrderBy { get; set; }
    }
}
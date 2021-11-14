namespace HoozOn.Helpers {
    public class UserParams {
        private const int MaxPageSize = 20;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 4; 
        public int PageSize {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string UserName { get; set; }
        public int userId { get; set; } 
         public string SearchTagTerm { get; set; }
        public string JobStatus { get; set; } = "OPEN";
        public string OrderBy { get; set; }
    }
}
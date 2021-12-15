namespace HoozOn.Helpers.Job {
    public class JobParams {
        private const int MaxPageSize = 20;
        public int JobId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int pageSize  = 4;
          public int PageSize {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string Address { get; set; }
        public string searchTag { get; set; }="";
         public string JobStatus { get; set; } = "OPEN";
        public int? UserId { get; set; }
    }
}
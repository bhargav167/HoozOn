namespace HoozOn.Helpers.Job {
    public class JobParams {
        public int JobId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int pageSize = 4;
        public string Address { get; set; }
        public int? UserId { get; set; }
    }
}
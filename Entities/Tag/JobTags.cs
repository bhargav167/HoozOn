using HoozOn.Entities.Job;

namespace HoozOn.Entities.Tag {
    public class JobTags {
        public int Id { get; set; }
        public string TagName { get; set; }
        public int JobId { get; set; }
        public JobModel Job { get; set; }
        // public TagMaster TagMaster { get; set; }
        public int TagMasterId { get; set; }
    }
}
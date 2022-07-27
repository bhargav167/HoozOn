using HoozOn.Entities.Job;
namespace API.Entities.Control
{
    public class SetJob{
        public int Id { get; set; }
        public int JobId { get; set; }
        public JobModel Job { get; set; }
        public int SetId { get; set; }
        public Sets Set { get; set; }
    }
}
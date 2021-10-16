using HoozOn.Entities.Authentication;
using HoozOn.Entities.Job;
namespace HoozOn.Entities.Message.JobMessage
{
    public class JobMessages
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public JobModel Job { get; set; }
        public int SenderId { get; set; }
        public SocialAuthentication Sender { get; set; }
        public int RecipientId { get; set; }
        public SocialAuthentication Recipient { get; set; }
        public string Content { get; set; }
    }
}
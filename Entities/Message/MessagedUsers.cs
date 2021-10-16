using HoozOn.Entities.Authentication;

namespace HoozOn.Entities.Message
{
    public class MessagedUsers
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public virtual SocialAuthentication Sender { get; set; } 
        public int RecipientId { get; set; }
        public virtual SocialAuthentication Recipient { get; set; }
    }
}
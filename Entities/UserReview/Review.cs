using System.ComponentModel.DataAnnotations;
using HoozOn.Entities.Authentication;

namespace HoozOn.Entities.UserReview
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public int SenderId { get; set; }
        public SocialAuthentication Sender { get; set; }
        public int RecipientId { get; set; }
        public SocialAuthentication Recipient { get; set; }
        public float ReviewValue { get; set; }
    }
}
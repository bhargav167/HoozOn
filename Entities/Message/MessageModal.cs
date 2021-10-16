using System;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Users;

namespace HoozOn.Entities.Message
{
    public class MessageModal
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public virtual SocialAuthentication Sender { get; set; }
        public string SenderUsername { get; set; }
        public int RecipientId { get; set; }
        public virtual SocialAuthentication Recipient { get; set; }
        public string RecipientUsername { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
        public MessageModal()
        {
            MessageSent=DateTime.Now;
        }
    }
}
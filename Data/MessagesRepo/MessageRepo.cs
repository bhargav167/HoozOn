using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HoozOn.DTOs.Message;
using HoozOn.Entities.Message;
using HoozOn.Entities.Message.JobMessage;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Data.MessagesRepo {
    public class MessageRepo : IMessageRepo {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessageRepo (DataContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MessagedUsers> AddChatUser (MessagedUsers messagedUser) {
            var isuserchart = await _context.MessagedUser.Where (x => x.SenderId == messagedUser.SenderId &&
                    x.RecipientId == messagedUser.RecipientId || x.SenderId == messagedUser.RecipientId &&
                    x.RecipientId == messagedUser.SenderId)
                .FirstOrDefaultAsync ();
            if (isuserchart != null)
                return messagedUser;

            await _context.MessagedUser.AddAsync (messagedUser);
            return messagedUser;
        }

        public async Task<JobMessages> AddJobChat (JobMessages jobMessage) {
            await _context.JobMessages.AddAsync (jobMessage);
            return jobMessage;
        }

        public async Task<JobUserChat> AddJobUserChat (JobUserChat jobUserChat) {
            await _context.JobUserChat.AddAsync (jobUserChat);
            return jobUserChat;
        }

        public async Task<MessageModal> GetMessage (int id) {
            return await _context.Message.FirstOrDefaultAsync (m => m.Id == id);
        }

        public async Task<IEnumerable<MessagedUsers>> GetMessagedUser (int userId) {
            var query = await _context.MessagedUser.Include (x => x.Recipient).Include (x => x.Sender)
                .Where (c => c.SenderId == userId || c.RecipientId == userId).OrderByDescending(x=>x.MessageSent)
                .ToListAsync ();
            return query;
        }

        public async Task<IEnumerable<MessageDto>> GetMessagesForUser (int userId) {
            var query = await _context.Message.Where (c => c.SenderId == userId)
                .ProjectTo<MessageDto> (_mapper.ConfigurationProvider)
                .ToListAsync ();
            return query;
        }

        public async Task<IEnumerable<MessageDto>> GetSingleUserChat (int senderId, int RecipientId) {
            var query = await _context.Message.Where (c => c.SenderId == senderId && c.RecipientId == RecipientId ||
                    c.SenderId == RecipientId && c.RecipientId == senderId)
                .ProjectTo<MessageDto> (_mapper.ConfigurationProvider)
                .ToListAsync ();
            return query;
        }

        public async Task<IEnumerable<MessageDto>> GetSingleUserChatByJob (int jobId, int senderId, int RecipientId) {
            var query = await _context.JobMessages.Where (c => c.SenderId == senderId && c.RecipientId == RecipientId && c.JobId==jobId ||
                    c.SenderId == RecipientId && c.RecipientId == senderId && c.JobId==jobId)
                .ProjectTo<MessageDto> (_mapper.ConfigurationProvider)
                .ToListAsync ();
            return query;
        }

        public async Task<List<JobUserChat>> JobUserChartByJob (int jobId, int userId) {
            var responcesDetails = await _context.JobUserChat
                .Include (b => b.Recipient)
                .Where (x => x.JobId == jobId && x.SenderId == userId)
                .ToListAsync ();
            return responcesDetails;
        }

        //User List For JobChart Intraction 
        public async Task<IEnumerable<JobUserChat>> JobUserResponcesDetails (int jobId, int userId) {
            List<JobUserChat> jobUserChats = new List<JobUserChat> ();
            var responcesDetails = await _context.JobUserChat.Include (c => c.Job).Include (c => c.Sender)
                .Include (b => b.Recipient).Where (x => x.JobId == jobId).ToListAsync ();

            foreach (var item in responcesDetails) {
                if (item.SenderId == userId) {
                    item.IsAnonymous = item.Job.IsAnonymous;
                    item.Sender.AboutUs = item.Recipient.AboutUs;
                    item.Sender.CoverImageUrl = item.Recipient.CoverImageUrl;
                    item.Sender.Email = item.Recipient.Email;
                    item.Sender.Id = item.Recipient.Id;
                    item.Sender.ImageUrl = item.Recipient.ImageUrl;
                    item.Sender.IsProfileCreated = item.Recipient.IsProfileCreated;
                    item.Sender.Latitude = item.Recipient.Latitude;
                    item.Sender.Longitude = item.Recipient.Longitude;
                    item.Sender.MobileNumber = item.Recipient.MobileNumber;
                    item.Sender.Name = item.Recipient.Name;
                    item.Sender.tags = item.Recipient.tags;
                    jobUserChats.Add (item);
                } else {
                    item.IsAnonymous = item.Job.IsAnonymous;
                    jobUserChats.Add (item);
                }
            }
            return responcesDetails;
        }

        public async Task<IEnumerable<JobUserChat>> JobUserResponcesDetailsWithSender (int jobId, int userId) {
            List<JobUserChat> jobUserChats = new List<JobUserChat> ();
            var responcesDetails = await _context.JobUserChat.Include (c => c.Sender)
                .Where (x => x.JobId == jobId).OrderByDescending(x=>x.CreateDate).ToListAsync ();

            return responcesDetails;
        }

    }
}
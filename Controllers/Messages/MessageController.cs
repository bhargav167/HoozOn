using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using HoozOn.Data;
using HoozOn.Data.AuthenticationRepo;
using HoozOn.Data.MessagesRepo;
using HoozOn.Data.PhaseRepo1;
using HoozOn.DTOs.Message;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Message;
using HoozOn.Entities.Message.JobMessage;
using HoozOn.Extensions;
using HoozOn.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace HoozOn.Controllers.Messages {
    [ApiController]
    [Route ("api/[controller]")]
    public class MessageController : ControllerBase {
        private readonly ICrudRepo _crudrepo;
        private readonly IAuthRepo _iAuthRepo;
        private readonly IMessageRepo _iMessageRepo;
        private readonly IMapper _mapper;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly DataContext _context;

        public MessageController (ICrudRepo crudrepo,
            IMapper mapper,
            IAuthRepo iAuthRepo,
            IMessageRepo iMessageRepo,
            DataContext context,
            IHubContext<ChatHub> hubContext
        ) {
            _crudrepo = crudrepo;
            _iAuthRepo = iAuthRepo;
            _iMessageRepo = iMessageRepo;
            _context = context;
            _hubContext = hubContext;
            _mapper = mapper;
        }

        //Getting Message after sending
        [HttpGet ("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage (int userId, int id) {
            if (userId != int.Parse (User.FindFirst (ClaimTypes.NameIdentifier).Value))
                return Unauthorized ();

            var messageFromRepo = await _iMessageRepo.GetMessage (id);

            if (messageFromRepo == null)
                return NotFound ();

            return Ok (messageFromRepo);
        }
        // Sending Messages to end user
        [HttpPost ("Send/{userId}")]
        public async Task<IActionResult> CreateMessage (int userId, [FromBody] MessageForCreationDto messageForCreationDto) {
            messageForCreationDto.SenderId = userId;
            await _hubContext.Clients.All.SendAsync ("ReceiveOne", messageForCreationDto.SenderId, messageForCreationDto.Content);
            var sender = await _iAuthRepo.getAuthById (userId);

            var recipient = await _iAuthRepo.getAuthById (messageForCreationDto.RecipientId);

            if (recipient == null)
                return BadRequest ("Could not find user");

            var message = _mapper.Map<MessageModal> (messageForCreationDto);
            MessagedUsers messagedUsers = new MessagedUsers ();
            messagedUsers.SenderId = userId;
            messagedUsers.RecipientId = messageForCreationDto.RecipientId;

            await _iMessageRepo.AddChatUser (messagedUsers);
            _crudrepo.Add (message);

            if (await _crudrepo.SaveAll ()) {
                var messageToReturn = _mapper.Map<MessageToReturnDto> (message);
                // return CreatedAtRoute("GetMessage", new {id = message.Id}, messageToReturn);
                return Ok (messageForCreationDto);
            }

            throw new Exception ("Creating the message failed on save");
        }

        [HttpGet ("All/{userId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser (int userId) {
            var messages = await _iMessageRepo.GetMessagesForUser (userId);
            return Ok (messages);
        }

        [HttpGet ("AllChatsUser/{userId}")]
        public async Task<ActionResult<IEnumerable<MessagedUsers>>> AllChatsUser (int userId) {
            List<SocialAuthentication> users = new List<SocialAuthentication> ();
            var messages = await _iMessageRepo.GetMessagedUser (userId);
            foreach (var item in messages) {
                if (item.SenderId == userId) {
                    users.Add (item.Recipient);
                }
                if (item.RecipientId == userId) {
                    users.Add (item.Sender);
                }
            }
            return Ok (users);
        }

        [HttpGet ("UserChat/{senderId}/{recipentId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser (int senderId, int recipentId) {
            List<MessageDto> users = new List<MessageDto> ();
            var messages = await _iMessageRepo.GetSingleUserChat (senderId, recipentId);
            foreach (var item in messages) {
                if (item.SenderId == senderId) {
                    item.SenderContent = item.Content;
                    item.TimeAgo = DateFormat.RelativeDate (item.MessageSent);
                    users.Add (item);
                }
                if (item.SenderId == recipentId) {
                    item.RecipientContent = item.Content;
                    item.TimeAgo = DateFormat.RelativeDate (item.MessageSent);
                    users.Add (item);
                }
            }
            return Ok (users);
        }

        // Sending Messages to end user
        [HttpPost ("JobChat/{jobId}/{recipientId}/{senderId}")]
        public async Task<IActionResult> JobChat (int jobId, int recipientId, int senderId, [FromBody] JobMessages jobMessages) {
            jobMessages.JobId = jobId;
            jobMessages.SenderId = senderId;
            jobMessages.RecipientId = recipientId;
            await _iMessageRepo.AddJobChat (jobMessages);

            JobUserChat jobUserChat = new JobUserChat ();
            jobUserChat.JobId = jobId;
            jobUserChat.SenderId = senderId;
            jobUserChat.RecipientId = recipientId;

            var isUserConnected = await _context.JobUserChat.Where (k => k.JobId == jobId && k.SenderId == senderId).FirstOrDefaultAsync ();
            if (isUserConnected == null)
                await _iMessageRepo.AddJobUserChat (jobUserChat);

            if (await _crudrepo.SaveAll ()) {
                return Ok (jobMessages);
            }
            throw new Exception ("Creating the message failed on save");
        }

        //USER LIST WHO RESPONCE TO YOUR JOB
        [HttpGet ("UserJobResponce/{jobId}/{userId}")]
        public async Task<ActionResult<IEnumerable<JobUserChat>>> UserJobResponce (int jobId, int userId) {
            var userJobResponces = await _iMessageRepo.JobUserResponcesDetails (jobId, userId);
            return Ok (userJobResponces);
        }

        [HttpGet ("JobUserChartByJob/{jobId}/{userId}")]
        public async Task<ActionResult<IEnumerable<JobUserChat>>> JobUserChartByJob (int jobId, int userId) {
            var userJobResponces = await _iMessageRepo.JobUserChartByJob (jobId, userId);
            return Ok (userJobResponces);
        }
        // USER MESSAGES ONE TO ONE FOR JOBS
        [HttpGet ("GetSingleUserChatByJob/{jobId}/{senderId}/{recipentId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetSingleUserChatByJob (int jobId, int senderId, int recipentId) {
            List<MessageDto> users = new List<MessageDto> ();
            var messages = await _iMessageRepo.GetSingleUserChatByJob (jobId, senderId, recipentId);
            foreach (var item in messages) {
                if (item.SenderId == senderId) {
                    item.SenderContent = item.Content;
                    // item.TimeAgo = DateFormat.RelativeDate (item.MessageSent);
                    users.Add (item);
                }
                if (item.SenderId == recipentId) {
                    item.RecipientContent = item.Content;
                    // item.TimeAgo = DateFormat.RelativeDate (item.MessageSent);
                    users.Add (item);
                }
            }
            return Ok (users);
        }

    }
}
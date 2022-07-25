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
using HoozOn.Entities.Responces;
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
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById ("India Standard Time");

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
           // await _hubContext.Clients.All.SendAsync ("messageReceivedFromApi", messageForCreationDto);
            messageForCreationDto.SenderId = userId;
            var sender = await _iAuthRepo.getAuthById (userId);

            var recipient = await _iAuthRepo.getAuthById (messageForCreationDto.RecipientId);

            if (recipient == null)
                return BadRequest("Could not find user");

            var message = _mapper.Map<MessageModal>(messageForCreationDto);
            MessagedUsers messagedUsers = new MessagedUsers();
            messagedUsers.SenderId = userId;
            messagedUsers.RecipientId = messageForCreationDto.RecipientId;

            //Check If Usered Aready Messaged Each Othet than Update its Time Of Chat To Databases
            var isUserChat = await _context.MessagedUser.Where (x => x.RecipientId == messageForCreationDto.RecipientId && x.SenderId == userId).FirstOrDefaultAsync ();
            if (isUserChat == null) {
                message.MessageSent=TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
                await _iMessageRepo.AddChatUser (messagedUsers);
                _crudrepo.Add (message);

                if (await _crudrepo.SaveAll ()) {
                    messageForCreationDto.ChatTime = DateFormat.MeridianTime (message.MessageSent);
                    var messageToReturn = _mapper.Map<MessageToReturnDto> (message);
                    return CreatedAtRoute ("GetMessage", new { id = messageToReturn.Id }, messageForCreationDto);

                    throw new Exception ("Creating message failed");
                }
            } else {
                  message.MessageSent=TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
                _crudrepo.Add (message);
                 
               //isUserChat.MessageSent = DateTime.UtcNow;
                _context.MessagedUser.Update (isUserChat);
                await _context.SaveChangesAsync ();
                return Ok (messageForCreationDto);
            }
            return Ok (messageForCreationDto);
        }

        [HttpGet ("All/{userId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser (int userId) {
            var messages = await _iMessageRepo.GetMessagesForUser (userId);
            return Ok (messages);
        }

        [HttpGet ("AllChatsUser/{userId}")]
        public async Task<ActionResult<IEnumerable<MessagedUsers>>> AllChatsUser (int userId) {
            ResponceUserData rs = new ResponceUserData ();
            List<SocialAuthentication> users = new List<SocialAuthentication> ();
            var messages = await _iMessageRepo.GetMessagedUser (userId);
            if (messages.Count () == 0) {
                rs.Status = 209;
                rs.Success = true;
                rs.Status_Message = "No Chat found";
                rs.data = null;
                return Ok (rs);
            }
            foreach (var item in messages) {
                if (item.SenderId == userId) {
                    users.Add (item.Recipient);
                }
                if (item.RecipientId == userId) {
                    users.Add (item.Sender);
                }
            }
            users.OrderBy ((x => x.Name));
            rs.Status = 200;
            rs.Success = true;
            rs.Status_Message = "Chat List Found";
            rs.data = users;
            return Ok (rs);
        }

        //UserList By Alphabetical Order
        [HttpGet ("AllChatsUserByAlphaOrder/{userId}")]
        public async Task<ActionResult<IEnumerable<MessagedUsers>>> AllChatsUserByAlphaOrder (int userId) {
            ResponceUserData rs = new ResponceUserData ();
            List<SocialAuthentication> users = new List<SocialAuthentication> ();
            var messages = await _iMessageRepo.GetMessagedUser (userId);
            if (messages.Count () == 0) {
                rs.Status = 209;
                rs.Success = true;
                rs.Status_Message = "No Chat found";
                rs.data = null;
                return Ok (rs);
            }
            foreach (var item in messages) {
                if (item.SenderId == userId) {
                    users.Add (item.Recipient);
                }
                if (item.RecipientId == userId) {
                    users.Add (item.Sender);
                }
            }
            users.OrderBy ((x => x.Name));
            rs.Status = 200;
            rs.Success = true;
            rs.Status_Message = "Chat List Found";
            rs.data = users;
            return Ok (rs);
        }

        [HttpGet ("UserChat/{senderId}/{recipentId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser (int senderId, int recipentId) {
            List<MessageDto> users = new List<MessageDto> ();
            var messages = await _iMessageRepo.GetSingleUserChat (senderId, recipentId);
            foreach (var item in messages) {
                if (item.SenderId == senderId) {
                    item.SenderContent = item.Content;
                DateTime timeago=   TimeZoneInfo.ConvertTimeFromUtc (item.MessageSent, INDIAN_ZONE);
                DateTime timeago1=   TimeZoneInfo.ConvertTimeFromUtc (item.MessageSent, INDIAN_ZONE);
                item.TimeAgo =  DateFormat.RelativeDate (timeago);
                item.Times = DateFormat.MeridianTime (timeago1);
                    users.Add (item);
                }
                if (item.SenderId == recipentId) {
                    item.RecipientContent = item.Content;
                    DateTime timeago=   TimeZoneInfo.ConvertTimeFromUtc (item.MessageSent, INDIAN_ZONE);
                  DateTime timeago1=   TimeZoneInfo.ConvertTimeFromUtc (item.MessageSent, INDIAN_ZONE);
                   item.TimeAgo = DateFormat.RelativeDate (timeago);
                   item.Times = DateFormat.MeridianTime (timeago1);
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
            jobMessages.IsRead=false;
            jobMessages.MessageSent=TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
          
            await _iMessageRepo.AddJobChat (jobMessages);
            await _hubContext.Clients.All.SendAsync ("messageReceivedFromApi", jobMessages);
            JobUserChat jobUserChat = new JobUserChat ();
            jobUserChat.JobId = jobId;
            jobUserChat.SenderId = senderId;
            jobUserChat.RecipientId = recipientId;
           jobUserChat.CreateDate = TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
            var isUserConnected = await _context.JobUserChat.Where (k => k.JobId == jobId && k.SenderId == senderId).FirstOrDefaultAsync ();
            if (isUserConnected == null) {
                jobUserChat.CreateDate=TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
                jobUserChat.ActiveNotification=true;
                await _iMessageRepo.AddJobUserChat (jobUserChat); 
            }
            if (isUserConnected != null) {
                isUserConnected.CreateDate = TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
                isUserConnected.ActiveNotification=true;
                _context.JobUserChat.Update (isUserConnected);
            }

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

        [HttpGet ("{jobId}/{userId}")]
        public async Task<ActionResult<IEnumerable<JobUserChat>>> UserJobResponceWithSender (int jobId, int userId) {
            var userJobResponces = await _iMessageRepo.JobUserResponcesDetailsWithSender (jobId, userId);
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
            var recipientUser= await _iAuthRepo.getAuthById(recipentId);
            foreach (var item in messages) {
                if (item.SenderId == senderId) {
                    item.SenderContent = item.Content;
                    item.RecipientContent=null;
                    item.RecipientPhotoUrl=recipientUser.ImageUrl;
                    item.TimeAgo = DateFormat.RelativeDate (item.MessageSent);
                    item.Times = DateFormat.MeridianTime (item.MessageSent);
                    users.Add (item);
                }
                if (item.SenderId == recipentId) {
                    item.RecipientContent = item.Content;
                    item.SenderContent=null;
                    item.RecipientPhotoUrl=recipientUser.ImageUrl;
                   item.TimeAgo = DateFormat.RelativeDate (item.MessageSent);
                    item.Times = DateFormat.MeridianTime (item.MessageSent);
                    users.Add (item);
                }
            }
            return Ok (users);
        }

        // Update IsRead Job Responces Message In JobUserChat
        [HttpPost ("JobUserMessageResponceUpdate/{jobId}/{senderId}/{recipentId}")]
        public async Task<IActionResult> JobUserMessageResponceUpdate (int jobId, int senderId, int recipentId) {
            try {
                StatusResponces statusResponces = new StatusResponces ();
                var ChatToUpdate = await _context.JobUserChat
                    .Where (x => x.JobId == jobId && x.SenderId == senderId && x.RecipientId == recipentId)
                    .FirstOrDefaultAsync ();

                if (ChatToUpdate == null) {
                    statusResponces.status = false;
                    return Ok (statusResponces);
                }

                ChatToUpdate.IsRead = true;
                statusResponces.status = true;
                _context.JobUserChat.Update (ChatToUpdate);
                await _context.SaveChangesAsync ();

                return Ok (statusResponces);
            } catch (System.Exception ex) {
                throw new Exception ("Error In Updating" + ex);
            }

        }

        [HttpPost ("TestSend/{userId}/{recipentId}")]
        public async Task<IActionResult> CreateMessage (int userId, int recipentId, [FromBody] MessageForCreationDto messageForCreationDto) {
            messageForCreationDto.SenderId = userId;
            messageForCreationDto.RecipientId = recipentId;
            var sender = await _iAuthRepo.getAuthById (userId);

            var recipient = await _iAuthRepo.getAuthById (messageForCreationDto.RecipientId);

            if (recipient == null)
                return BadRequest ("Could not find user");

            //Check If Usered Aready Messaged Each Othet than Update its Time Of Chat To Databases
            var isUserChat = await _context.MessagedUser.Where (x => x.RecipientId == messageForCreationDto.RecipientId && x.SenderId == userId).FirstOrDefaultAsync ();
            if (isUserChat == null) {
                var message = _mapper.Map<MessageModal> (messageForCreationDto);
                MessagedUsers messagedUsers = new MessagedUsers ();
                messagedUsers.SenderId = userId;
                messagedUsers.RecipientId = messageForCreationDto.RecipientId;

                await _iMessageRepo.AddChatUser (messagedUsers);
                _crudrepo.Add (message);

                if (await _crudrepo.SaveAll ()) {
                    messageForCreationDto.ChatTime = DateFormat.MeridianTime (message.MessageSent);
                    var messageToReturn = _mapper.Map<MessageToReturnDto> (message);
                    return CreatedAtRoute ("GetMessage", new { id = messageToReturn.Id }, messageForCreationDto);

                    throw new Exception ("Creating message failed");
                    // return Ok (messageForCreationDto);
                }
            } else {

                isUserChat.MessageSent = TimeZoneInfo.ConvertTimeFromUtc (DateTime.UtcNow, INDIAN_ZONE);
                _context.MessagedUser.Update (isUserChat);
                await _context.SaveChangesAsync ();
                return Ok (messageForCreationDto);
            }
            return NoContent ();
        }

    }
}
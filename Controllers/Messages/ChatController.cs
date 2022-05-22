using HoozOn.Entities.Message;
using HoozOn.Entities.Message.JobMessage;
using HoozOn.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace HoozOn.Controllers.Messages {
    [Produces("application/json")]
    [Route("api/Chat")]
    [ApiController]
    public class ChatController : ControllerBase {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController (IHubContext<ChatHub> hubContext) {
            _hubContext = hubContext;
        }

        [Route ("send")] //path looks like this: https://localhost:44379/api/chat/send
        [HttpPost]
        public IActionResult SendRequest ([FromBody] MessageModal msg) {
            _hubContext.Clients.All.SendAsync ("ReceiveOne", msg);
            return Ok (msg);
        }

         [Route ("Jobsend")] //path looks like this: https://localhost:44379/api/chat/send
        [HttpPost]
        public IActionResult JobSendRequest ([FromBody] JobMessages msg) {
            _hubContext.Clients.All.SendAsync ("ReceiveOne", msg);
            return Ok (msg);
        }
    }
}
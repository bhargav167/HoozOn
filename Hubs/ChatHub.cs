using System.Threading.Tasks;
using HoozOn.DTOs.Message;
using Microsoft.AspNetCore.SignalR;

namespace HoozOn.Hubs {
      public class ChatHub : Hub        // inherit this
    {
        public Task SendMessage1(MessageForCreationDto message)  // Two parameters accepted
        {
            return Clients.All.SendAsync("ReceiveOne",message);    // Note this 'ReceiveOne' 
        }
    }
}
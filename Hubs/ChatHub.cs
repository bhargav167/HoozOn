using System.Threading.Tasks;
using HoozOn.DTOs.Message;
using Microsoft.AspNetCore.SignalR;

namespace HoozOn.Hubs {
    public class ChatHub : Hub<IChatHub> {
        public async Task BroadcastAsync (MessageForCreationDto message) {
            await Clients.All.MessageReceivedFromHub (message);
        }
        public override async Task OnConnectedAsync () {
            await Clients.All.NewUserConnected ("a new user connectd");
        }
    }

    public interface IChatHub {
        Task MessageReceivedFromHub (MessageForCreationDto message);

        Task NewUserConnected (string message);
    }
}
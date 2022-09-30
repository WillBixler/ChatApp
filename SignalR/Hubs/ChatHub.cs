using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public sealed class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine(message);
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}

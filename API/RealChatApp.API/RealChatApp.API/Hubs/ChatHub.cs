using Microsoft.AspNetCore.SignalR;
using RealChatApp.API.Models;

namespace RealChatApp.API.Hubs;

public class ChatHub : Hub
{
    public async Task JoinChat(UserConnection connection)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined");
    }
    public async Task JoinSpecificGroup(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
        await Clients.Group(connection.ChatRoom)
            .SendAsync("JoinSpecificGroup", "admin",
            $"{connection.Username} has joined {connection.ChatRoom}");
    }
}

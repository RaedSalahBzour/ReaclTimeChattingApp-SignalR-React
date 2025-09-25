using Microsoft.AspNetCore.SignalR;
using RealChatApp.API.DataService;
using RealChatApp.API.Models;

namespace RealChatApp.API.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDB _sharedDB;
    public ChatHub(SharedDB sharedDB) => _sharedDB = sharedDB;
    public async Task JoinChat(UserConnection connection)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined");
    }
    public async Task JoinSpecificGroup(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
        _sharedDB.connections[Context.ConnectionId] = connection;
        await Clients.Group(connection.ChatRoom)
            .SendAsync("JoinSpecificGroup", "admin",
            $"{connection.Username} has joined {connection.ChatRoom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_sharedDB.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.ChatRoom) // IClientProxy
            .SendAsync(method: "ReceiveSpecificMessage", arg1: conn.Username, arg2: msg); // Task
        }
    }
}

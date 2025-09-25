using RealChatApp.API.Models;
using System.Collections.Concurrent;

namespace RealChatApp.API.DataService;

public class SharedDB
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}

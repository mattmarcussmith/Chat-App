using System;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
	public class ChatHub : Hub
	{
		public async Task SendMessage(string userInput)
		{
			await Clients.All.SendAsync("ReceiveMessage", userInput);

		}
	}
}


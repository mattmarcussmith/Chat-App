"use strict";

//Inital connection to hub.
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.querySelector(".send-button").disabled = true;

connection.on("ReceiveMessage", userInput => {    

    var p = document.createElement("p");
    var messageList = document.querySelector(".message-list").appendChild(p);
   
    messageList.textContent = `${userInput}`;
    document.querySelector(".user-input").value = "";
 
});

connection.start().then(() => {
    document.querySelector(".send-button").disabled = false;
    
}).catch(function (err) {
    return console.error(err.toString());
});

document.querySelector(".send-button")
    .addEventListener("click", (event) => {
    var userInput = document.querySelector(".user-input").value;
 
    connection.invoke("SendMessage", userInput)
        .catch((err) => {
        return console.error(err.toString());
    });
    event.preventDefault();
});
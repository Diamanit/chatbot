let socket;
let inputElement;
let chatWindow;
let userId

let serverURL = "https://10.20.8.226:3000";


document.addEventListener("DOMContentLoaded", function () {
    socket = io(serverURL);
    chatWindow = document.getElementById("p");
    inputElement = document.getElementById("message");


    socket.on("message", function (data) {
        addMessage(data);
    });

    socket.on("message", function (data) {
        console.log(data);
    });

    socket.on("connect_error", function () {
        chatWindow.innerHTML = "Connect Error. Maybe the server is not rummimg.";
    });

    socket.on("clientId", function (Id) {
        userId = Id

    });
});

function addMessage(message) {
    let messageDiv = document.createElement("div");
    let userNameP = document.createElement("p");
    let messageTextP = document.createElement("p");
    let messageSendTime = document.createElement("p");


    if(message.senderId == userId){
        messageDiv.classList.add("mymessage");
        messageSendTime.classList.add("mysendtime");
    } else {
        messageDiv.classList.add("message");
        messageSendTime.classList.add("sendtime");
    }

    userNameP.innerHTML = message.username;
    userNameP.classList.add("username");

    messageTextP.innerHTML = message.text;
    messageTextP.classList.add("messageText");

    messageSendTime.innerHTML = message.timestamp;


    messageDiv.appendChild(userNameP);
    messageDiv.appendChild(messageTextP);
    messageDiv.appendChild(messageSendTime);


    chatWindow.appendChild(messageDiv);
}

userName = prompt("Write your Username here","");

function sendMessage() {
    let m = message.value;
    let messageObj = {
        text: m,
        username: userName
    }
    socket.emit("clientMessage", messageObj);
}
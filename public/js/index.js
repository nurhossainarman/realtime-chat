
const socket = io()

const form = document.querySelector(".sendMessage");
const chatbox = document.querySelector(".container"); 

function appendInChatBox(text, position) {
    const d = document.createElement("div");
    d.innerHTML = text;
    d.classList.add("chat-text");
    d.classList.add(position);
    chatbox.appendChild(d);
}
function join(text){
    const c = document.createElement("div");
    const d = document.createElement("div");
    c.classList.add("center");
    d.classList.add("joinText");
    d.innerHTML = text;
    c.appendChild(d);
    chatbox.appendChild(c);
}
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    var text = document.getElementById("messageInp");
    var message = text.value
    if(message != ""){
        console.log("send");
        socket.emit('send-message', message);
       
    }
    text.value= "";
    
    
})

const newuser = prompt("Username:");
socket.emit('new-user', newuser);
socket.on('user-connected', newuser => {
    join("You have joined the chat");
});

socket.on('other-user-join', newuser => {
    join(`${newuser} has joined`);
    });

socket.on('s-message', message=>{
    appendInChatBox(message, "right");
    })
    
socket.on('receive-message', message=>{
    appendInChatBox(message, "left");
    })


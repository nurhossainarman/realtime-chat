
const socket = io()

const form = document.querySelector(".sendMessage");
const chatbox = document.querySelector(".chatbox");

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
//needs fix
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const text = document.getElementById("messageInp");
    const message = text.value
    if(message != ""){
        console.log("w");
        socket.emit('send-message', message);
        socket.on('receive-message', message=>{
        console.log("x");
        appendInChatBox(message, "left");
        }) 
        message= "";
        text.value= "";
    }
    
})

const name = prompt("Username:");
socket.emit('new-user', name);
socket.on('user-connected', name => {
    join("You have joined the chat");
    socket.on('other-user-join', name => {
    join(`${name} has joined`);
    });
});



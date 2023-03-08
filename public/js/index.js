
const socket = io()

const form = document.querySelector(".sendMessage");
const chatbox = document.querySelector(".chatbox");

function appendInChatBox(text, position) {
    const d = document.createElement("div");
    d.innerHTML = text;
    d.classList.add("chat-text");
    d.classList.add("right");
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
    const text = document.getElementById("messageInp");
    if(text.value != ""){
        appendInChatBox(text.value);
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


const socket = io()
const form = document.querySelector(".sendMessage");
const container = document.querySelector(".container"); 
function appendInChatBox(text, position) {
    const div = document.createElement("div");
    div.innerText = text;
    div.classList.add("chat-text");
    div.classList.add(position);
    container.appendChild(div);
}
function join(text){
    const c = document.createElement("div");
    c.classList.add("center");
    c.innerHTML = `<div class="joinText">${text}</div>`
    container.appendChild(c);
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
    container.scrollTop = container.scrollHeight;
    })
    
socket.on('receive-message', message=>{
    appendInChatBox(message, "left");
    container.scrollTop = container.scrollHeight;
    })


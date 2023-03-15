const socket = io()
const form = document.querySelector(".sendMessage");
const container = document.querySelector(".container"); 
function appendRight(text) {
    const div = document.createElement("div");
    div.innerText = text;
    div.classList.add("chat-text");
    div.classList.add("right");
    container.appendChild(div);
}
function appendLeft(text,username) {
    const div = document.createElement("div");
    div.innerHTML = `<div class="username"> ${username}</div>
                    <div>${text}</div>`
    div.classList.add("chat-text");
    div.classList.add("left");
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
    appendRight(message);
    container.scrollTop = container.scrollHeight;
    })
    
socket.on('receive-message', (message,username)=>{

    appendLeft(message, username);
    
    container.scrollTop = container.scrollHeight;
    })



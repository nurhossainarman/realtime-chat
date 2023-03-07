const socket = io('http://localhost:8000');

const chatbox = document.querySelector(".chatbox");

function append(message){
    const pop = document.createElement("div");
    pop.innerText= message;
    pop.classList.add("chat-text");
    pop.classList.add("right");
    chatbox.appendChild(pop);
}

const name = prompt("who are you?");

socket.on('user-joined', name=>{
    append(`${name} has joined`);
});
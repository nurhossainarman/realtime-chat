// server.js
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

//Run when client connects
io.on('connection', socket => {
    socket.on('new-user', newuser => {
        socket.emit('user-connected', newuser);
        socket.broadcast.emit('other-user-join', newuser);
    })

    socket.on('send-message', message => {
        socket.emit('s-message', message);
        socket.broadcast.emit('receive-message', message);
    })

    
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running at ${PORT} port`))
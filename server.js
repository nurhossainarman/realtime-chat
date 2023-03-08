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
    socket.on('new-user', name => {
        socket.emit('user-connected', name);
        socket.broadcast.emit('other-user', name);
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running at ${PORT} port`))
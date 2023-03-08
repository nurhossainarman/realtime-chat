// server.js
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set at static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when client connects
io.on('connection', socket => {
    console.log('Client is connected');
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running at ${PORT} port`))
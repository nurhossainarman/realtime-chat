
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {joinUser, getUserBySocketId, filterUser} = require('./utils/users');
//Connects the client side code
app.use(express.static(path.join(__dirname, 'public')));

//Array for storing every client
let usersList = [];

//Run when client connects
io.on('connection', socket => {

    //Listens for event when a new client/user connects
    socket.on('new-user', newuser => {
        
        console.log(`${newuser} connected ${socket.id}`);

        // This method is from ./utils/users.js. Pushing the new user into usersList array
        joinUser(usersList, newuser, socket.id); 

        //Showing the list of users in console
        console.log(usersList); 

        socket.emit('user-connected', newuser);
        socket.broadcast.emit('other-user-join', newuser);
    })

    //Listens for event when a message is sent
    socket.on('send-message', message => {
        const user = getUserBySocketId(usersList, socket.id);
        const username = user.username
        socket.emit('s-message', message);
        socket.broadcast.emit('receive-message', message, username);
    })

    //Listens for event when a client disconnects
    socket.on('disconnect', newuser => {
        const user = getUserBySocketId(usersList, socket.id);
        try {
            console.log(`${user.username} has disconnected`);
            usersList = filterUser(usersList, socket.id)
            console.log(usersList);

        } catch (error) {
            console.log(error);
        }
    })    
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running at ${PORT} port`))
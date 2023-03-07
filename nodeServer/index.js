// Node server
const io = require('socket.io')(8000);
const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("success");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
})


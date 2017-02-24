const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'./','../','public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room Name are required');
        }
        if (users.existsNameInRoom(params.name, params.room)) {
            return callback('The Name is already taken');
        }
        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // Emite un mensaje al usuario que abre una conexión
        socket.emit('newMessage', generateMessage("Admin", "Welcome to Chat App"));

        // Enmite un mensaje al resto de los usuarios
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined the room`));

        callback();
    });

    // Cada vez que recibe un mensaje de un usuario, lo reenvía a todos los usuarios
    // El callback se usa para confirmar que se recibio el mensaje (Aknowledgement)
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback('This is from the server.');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });


    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left the room`));
        }
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

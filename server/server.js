const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'./','../','public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Emite un mensaje al usuario que abre una conexión
    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the Chat App"
    });

    // Enmite un mensaje al resto de los usuarios
    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New User has joined",
        createdAt: new Date().getTime()
    });

    // Cada vez que recibe un mensaje de un usuario, lo reenvía a todos los usuarios
    socket.on('createMessage', (message) => {
        console.log("Create Message:", message);
        socket.emit.emit('newMessage', {
            from: "Admin",
            text: message.text,
            createdAt: new Date().getTime()
        });

    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

});

server.listen(3000, () => {
    console.log(`Server is up on port ${port}`);
});

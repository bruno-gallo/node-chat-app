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

    // Emite un mensaje a una conexión
    socket.emit('newMessage', {
        from: "Host",
        text: "Welcome",
        createdAt: 666
    });

    // Cada vez que recibe un mensaje de un usuario, lo reenvía a todos los usuarios
    socket.on('createMessage', (message) => {
        console.log("Create Message:", message);
        // Emite un mensaje a todas las conexiones (broadcast)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

});

server.listen(3000, () => {
    console.log(`Server is up on port ${port}`);
});

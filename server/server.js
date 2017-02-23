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

    socket.emit('newMessage', {
        from: "Bruno",
        text: "Nuttin but a G thang",
        createdAt: 666
    });

    socket.on('createMessage', (message) => {
        console.log("Create Message:", message);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

});

server.listen(3000, () => {
    console.log(`Server is up on port ${port}`);
});

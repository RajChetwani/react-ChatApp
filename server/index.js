const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
  });


const server = http.createServer(app);
const io = socketio(server);
const router = require('./router')


app.use(router);

io.on('connection', (socket) => {
    console.log("We have a new connection");

    socket.on('disconnect',() => {
        console.log("disconnected");
    })
})

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
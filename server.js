var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//require mongodb database
var mongodb = require('mongodb');

server.listen(80);
console.log("Server is Listening...");

app.use(express.static(__dirname+'/'));

io.on('connection', function (socket) {
    console.log("New Connection to server.. Id :: "+socket.id);

    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
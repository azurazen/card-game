var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var database = require('./database/aladdin.js')

server.listen(80);
console.log("Server is Listening...");

app.use(express.static(__dirname+'/'));

io.on('connection', function (socket) {
    console.log("New Connection to server.. Id :: "+socket.id);

    socket.emit('news', { hello: 'world' });

    socket.on('my other event', async function (data) {
        console.log(data);
        var test = await database.get('accounts',{username:'azurazen'});//await database.account;
        console.log(test);
    });
});
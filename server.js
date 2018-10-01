var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var database = require('./database/aladdin.js')

server.listen(80);
console.log("Server is Listening...");

app.use(express.static(__dirname+'/app/'));

let Lobby = {
    room:[],
    chatlog:[]
}


io.on('connection', function (socket) {
    console.log("New Connection to server.. Id :: "+socket.id);

    socket.on('newPlayer',async function(user,pswd){
        console.log("test")
        socket.player = await database.get('accounts',{username:user});
        if(socket.player){
            if(pswd == socket.player.password){
                console.log('< NEW CONNECTION > Player connected '+socket.player.username)
                socket.emit('connected',socket.player,Lobby);
            }
        }
    });

    socket.on('newMsg',function(msg){
        Lobby.chatlog.push(socket.player.username+" : "+msg);
        io.emit('newMsg',socket.player.username+" : "+msg);
    });

    socket.on('reqNewRoom',async function(roomName){
        var containsRoom = false;
        Lobby.room.forEach(element => {
            if(element.name==roomName){
                containsRoom = true;
            }
        });
        if(!containsRoom){
            var newRoom = {name:roomName}
            Lobby.room.push(newRoom)
            socket.emit('newRoom',newRoom);
        }
    });
});
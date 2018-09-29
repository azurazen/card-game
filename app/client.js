var Client = {}

Client.player = {}
Client.lobby = {}

Client.askNewPlayer = function(user,pswd){
  Client.socket = io.connect('http://localhost');
  Client.socket.emit('newPlayer',user,pswd);
  console.log('Attempting to connect to server');


  Client.socket.on('connected', function(playerData,lobbyData){
    // Switch from login state to game state
    console.log('connected!');
    Client.player = playerData;
    Client.lobby = lobbyData;
    lobbyWindow.setRoom(lobbyData.room);
    game.state.start('Lobby');
  });

  Client.socket.on("newRoom",function(room){
    lobbyWindow.addRoom(room);
  });
}
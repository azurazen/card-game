let loginWindow = {
    id:"#loginWindow",
    init : function() {
        console.log("init loginWindow")

        var $div = $("<div>",{id:"loginWindow"});
        var $form = $("<form>",{id:"loginForm"});

        $form.append(
            $("<label>",{ text:"Username:"}),
            $("<input/>",{ id:"login_username", type:"text", value:""}),
            $("<label>",{ text:"Password:"}),
            $("<input/>",{ id:"login_password", type:"text", value:""}),
            $("<input/>",{ type:"submit", value:"Submit"})
        );
        $div.append($form);
        $("#game").append($div)

        $form.submit(function(event){
            event.preventDefault();
            console.log($("#login_username").val())
            // talk to client before getting ok, then switch to next screen
            Client.askNewPlayer($("#login_username").val(),$("#login_password").val());
            //game.state.start('Lobby');
        });
    }
}

let lobbyWindow = {
    id:"#lobbyWindow",
    data : {room:[],chatlog:[]},
    init : function (){
        room=[];

        // Div Definitions
        var $div          = $("<div>",{id:"lobbyWindow"});
        var $exitDiv      = $("<div>",{id:"lobbyExitDiv", class:"lobbyTAreaNames lobbyBorder"});
        var $iconBarDiv   = $("<div>",{id:"lobbyIconBarDiv"});
        var $containerDiv = $("<div>",{id:"lobbyContainerDiv"});
        //var $friendsDiv   = $("<div>",{id:"lobbyFriendsDiv", class:"lobbyTAreaDiv"});
        var $chatDiv      = $("<div>",{id:"lobbyChatDiv", class:"lobbyTAreaDiv lobbyChat"});
        var $roomsDiv     = $("<div>",{id:"lobbyRoomsDiv", class:"lobbyTAreaDiv"});

        // Button Definitions
        var $exitButton = $("<button/>",{id:"lobbyExitButton", html:"&times;", click: function(){

        } });
        var $shopButton = $("<button/>",{id:"lobbyShopButton", text:"shop", click: function(){
            // Shop
        } });
        var $buildButton = $("<button/>",{id:"lobbyBuildButton", text:"build", click: function(){
            // Build
        } });
        var $mailButton = $("<button/>",{id:"lobbyMailButton", text:"mail", click: function(){
            // Mail
        } });
        var $guildButton = $("<button/>",{id:"lobbyGuildButton", text:"guild", click: function(){
            // Guild
        } });

        // Para Definitions
        //var $friendsPara = $("<p/>",{id:"lobbyFriendsPara", class:"lobbyTAreaNames lobbyBorder" , text:"Friends"});
        var $chatPara    = $("<p/>",{id:"lobbyChatPara", class:"lobbyTAreaNames lobbyBorder" , text:"Chat"});
        var $roomsPara   = $("<p/>",{id:"lobbyRoomsPara", class:"lobbyTAreaNames lobbyBorder" , text:"Rooms"});

        // Text Area Definitions
        //var $friendsTArea    = $("<textarea>",{id:"lobbyFriendsTArea", class:"lobbyTArea lobbyBorder"});
        var $chatTArea    = $("<textarea>",{id:"lobbyChatTArea", class:"lobbyTArea lobbyChat lobbyBorder"});

        // Room(s) Container Div
        var $roomsContainerDiv     = $("<div>",{id:"lobbyRoomsContainerDiv", class:"lobbyRoomsContainerDiv lobbyBorder"});

        // Chat Text Field Definition
        //var $chatTField    = $("<input>",{id:"lobbyChatTField", class:"lobbyBorder"});
        var $chatForm = $("<form>",{id:"lobbyChatForm"});
        var $newRoomForm = $("<form>",{id:"lobbyNewRoomForm"});

        $chatForm.append(
            $("<label>",{ text:"Message: "}),
            $("<input/>",{ id:"lobbyChatInput", type:"text", value:"", placeholder:""}),
            $("<input/>",{ type:"submit", value:"Submit"})
        );
        $chatForm.submit(function(event){
            event.preventDefault();
            // New Room
            if($("#lobbyChatInput").val().replace(/\s/g, '')!=""){
                lobbyWindow.sendMsg($("#lobbyChatInput").val());
            }
            $("#lobbyChatInput").val("");
        });

        $newRoomForm.append(
            $("<label>",{ text:"Create New Room"}),
            $("<input/>",{ id:"newRoomInput", type:"text", value:"", placeholder:""}),
            $("<input/>",{ type:"submit", value:"Submit"})
        );
        $newRoomForm.submit(function(event){
            event.preventDefault();
            // New Room
            if($("#newRoomInput").val().replace(/\s/g, '')!=""){
                lobbyWindow.reqRoom($("#newRoomInput").val());
            }
            $("#newRoomInput").val("");
        });

        // Setup Divs
        $exitDiv.append($exitButton);
        $iconBarDiv.append($shopButton,$buildButton,$mailButton,$guildButton);
        //$friendsDiv.append($friendsPara,$friendsTArea);
        $chatDiv.append($chatPara,$chatTArea,$chatForm);//$chatTField);
        $roomsDiv.append($roomsPara,$roomsContainerDiv,$newRoomForm);

        $containerDiv.append($chatDiv,$roomsDiv);//$friendsDiv,$chatDiv,$roomsDiv);

        // Put it all together
        $div.append($exitDiv,$iconBarDiv,$containerDiv);

        $("#game").append($div)
        
    },
    setChat : function(pastchat){
        pastchat.forEach(element => {
            this.recMsg(element);
        });
        
    },
    sendMsg : function (msg){
        Client.socket.emit("newMsg",msg);
    },
    recMsg : function (msg){
        $("#lobbyChatTArea").val($("#lobbyChatTArea").val() + msg + "\n");
    },

    reqRoom : function (roomName){
        Client.socket.emit("reqNewRoom",roomName);
    },
    setRoom : function (rooms){
        rooms.forEach(room => {
            this.addRoom(room);
        });
    },
    addRoom : function (room){
        $("#lobbyRoomsContainerDiv").append(
            $("<button/>",{
                id:"lobbyRM-"+room.name, 
                text:room.name, 
                class:"lobbyRoomBtn", 
                click:function(){ 
                    //goto room.loc
                } 
            })
        );
    },
    delRoom : function (roomName){
        $("#lobbyRM-"+roomName).remove();
    }
}
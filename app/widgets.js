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
            game.state.start('Lobby');
        });
    }
}

let lobbyWindow = {
    id:"#lobbyWindow"
}
let Stage = {
    widgets : [loginWindow,lobbyWindow],

    init : function() {
        let stage = this;
        $(document).ready(function(){
            stage.widgets.forEach(element => {
                element.init();
            });
        });
    },
    set : function(state) {
        this.widgets.forEach(element => {
            $(element.id).hide();
        });
        state.widgets.forEach(element => {
            console.log("Showing "+element.id)
            $(element.id).show();
        });
    }
}

let Intro = function() {
    this.widgets = [loginWindow];
    
    this.preload = () =>{
            Stage.set(this);
    }
    this.create = () =>{
            game.input.mouse.capture = true;
    }
    this.render = () =>{

    } 
};

let Lobby = function() {
    this.widgets = [lobbyWindow];
    
    this.preload = () =>{
            Stage.set(this);
            
    }
    this.create = () =>{
            game.input.mouse.capture = true;
    }
    this.render = () =>{

    } 
};


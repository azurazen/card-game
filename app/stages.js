let Stage = {
    widgets : [loginWindow],

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
    this.widgets = [];
    
    this.preload = () =>{
            Stage.set(this);
            game.load.image("background","assets/ui/lobby.png");
            
    }
    this.create = () =>{
            game.input.mouse.capture = true;

            var background = game.add.sprite(0, 0 ,'background');
            background.height = window.innerHeight;
            background.width = swindow.innerWidth;
            console.log(window.innerWidth);
    }
    this.render = () =>{

    } 
};


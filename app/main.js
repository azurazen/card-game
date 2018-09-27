var game = new Phaser.Game(window.innerWidth-20, window.innerHeight-20, Phaser.CANVAS, 'game');

game.state.add('Intro',Intro);
game.state.add('Lobby',Lobby);

Stage.init();
game.state.start('Intro');
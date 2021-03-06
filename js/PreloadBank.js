var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.PreloadBank = function(){};

TopDownGame.PreloadBank.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('level1', 'assets/tilemaps/carmap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tiles.png');
    this.load.image('player', 'assets/images/user.png');
    this.load.image('doc', 'assets/images/doc.png');
    this.load.image('bank', 'assets/images/bank.png');

  },
  create: function() {
    this.state.start('Bank');
  }
};

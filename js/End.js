var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.End = function(){};

TopDownGame.End.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.stage.backgroundColor = "#dadada";
    this.game.add.text(32, 32, "You Win!", { font: "30px sans-serif"});
  }
};

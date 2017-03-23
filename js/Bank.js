var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Bank = function(){};

TopDownGame.Bank.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.roadLayer = this.map.createLayer('roadLayer');

    //collision on roadLayer
    this.map.setCollisionBetween(1, 2000, true, 'roadLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    // Set count value of cups.
    this.cupCount = 0;

    this.createItems();
    this.createBank();

    //create player
    var result = this.findObjectsByType('user', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();


  },
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
      this.cupCount++;
    }, this);
  },
  createBank: function() {
    //create doors
    this.bank = this.game.add.group();
    this.bank.enableBody = true;
    result = this.findObjectsByType('bank', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.bank);
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.roadLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, this.insideDoor, this);

    //player movement

    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y += 50;
    }
    else {
      this.player.body.velocity.y = 0;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
    }
  },
  collect: function(player, collectable) {
    this.cupCount--;
    //remove sprite
    collectable.destroy();
  },
  insideDoor: function(player, door) {
    if (this.cupCount > 0) {
      return false;
    }
  },
  enterDoor: function(player, door) {
    _state = this.state;
    setTimeout(function() {
      _state.start('End');
    }, 500);
  },
};

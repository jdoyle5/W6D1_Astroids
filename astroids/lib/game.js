const Astroid = require('./astroid.js');
const Ship = require('./ship.js');

function Game(){
  this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
}

Game.prototype.DIM_X = 1000;
Game.prototype.DIM_Y = 500;
Game.prototype.NUM_ASTEROIDS = 20;


Game.prototype.addAsteroids = function(){
  this.astroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.astroids.push(new Astroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function(){
  return [
    Math.floor(Math.random() * this.DIM_X),
    Math.floor(Math.random() * this.DIM_Y)
  ];
};

Game.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function(obj){
    obj.draw(ctx);
  });
  // this.astroids.forEach(function(astroid){
  //   astroid.draw(ctx);
  // });
};

Game.prototype.move = function(ctx){
  this.allObjects().forEach(function(obj){
    obj.move();
  });
  // this.astroids.forEach(function(astroid){
  //   astroid.move();
  // });
};

Game.prototype.wrap = function(astroid) {
  const left = -astroid.radius;
  const right = this.DIM_X + astroid.radius;
  const top = -astroid.radius;
  const bottom = this.DIM_Y + astroid.radius;

  if (astroid.pos[0] < left) {
    astroid.pos[0] += (right + astroid.radius);
  }
  if (astroid.pos[0] > right) {
    astroid.pos[0] -= (right + astroid.radius);
  }
  if (astroid.pos[1] > bottom) {
    astroid.pos[1] -= (bottom + astroid.radius);
  }
  if (astroid.pos[1] < top) {
    astroid.pos[1] += (bottom + astroid.radius);
  }

};

Game.prototype.checkCollisions = function() {
  // const allObj = this.allObjects();

  for (var i = 0; i < this.astroids.length; i++) {
    for (var j = i + 1; j < this.astroids.length; j++) {
      if (this.astroids[i].isCollidedWith(this.astroids[j])) {
        this.astroids.splice(i, 1);
        if (j > i) {
          this.astroids.splice(j-1, 1);
        } else {
          this.astroids.splice(j, 1);
        }
      }
    }
  }
};

Game.prototype.step = function (ctx) {
  this.move(ctx);
  this.checkCollisions();

};

Game.prototype.allObjects = function() {
  return this.astroids.concat([this.ship]);
};



module.exports = Game;

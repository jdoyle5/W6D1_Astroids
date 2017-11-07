
function MovingObject(pojo) {
  this.pos = pojo.pos;
  this.vel = pojo.vel;
  this.radius = pojo.radius;
  this.color = pojo.color;
  this.game = pojo.game;
}

MovingObject.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.colorStyle = this.color;
  ctx.fill();
};


MovingObject.prototype.move = function(ctx){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this);
};


MovingObject.prototype.isCollidedWith = function(otherObject) {
  const distance = Math.sqrt(
    Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
    Math.pow((this.pos[1] - otherObject.pos[1]), 2)
  );
  if (distance <= (this.radius + otherObject.radius)) {
    return true;
  }
  return false;
};



module.exports = MovingObject;

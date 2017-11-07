const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
function Ship(pos, game) {
  MovingObject.call(this, {pos: pos,
                           vel: [0,0],
                           radius: this.RADIUS,
                           color: this.COLOR,
                           game: game});
}
Util.inherits(Ship, MovingObject);

Ship.prototype.COLOR = "blue";
Ship.prototype.RADIUS = 10;


module.exports = Ship;

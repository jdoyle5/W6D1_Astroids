const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
function Astroid(pos, game) {
  MovingObject.call(this, {pos: pos,
                           vel: Util.randomVec(2),
                           radius: this.RADIUS,
                           color: this.COLOR,
                           game: game});
}
Util.inherits(Astroid, MovingObject);

Astroid.prototype.COLOR = "grey";
Astroid.prototype.RADIUS = 20;


module.exports = Astroid;

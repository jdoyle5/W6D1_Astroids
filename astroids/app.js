/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// ENTRY!!!
const Util = __webpack_require__(1);
const Astroid = __webpack_require__(2);
const Game = __webpack_require__(4);
const GameView = __webpack_require__(5);

window.a = new Astroid([100,100]);
window.Astroid = Astroid;

window.g = new Game();
window.Game = Game;


document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById('game-canvas');
  console.log(canvas);
  canvas.width = window.g.DIM_X;
  canvas.height = window.g.DIM_Y;
  const ctx = canvas.getContext("2d");

  window.gv = new GameView(ctx);
  window.gv.start();
});






//


/***/ }),
/* 1 */
/***/ (function(module, exports) {


const Util = {
  inherits(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  }
};


module.exports = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(1);
const MovingObject = __webpack_require__(3);
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {


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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Astroid = __webpack_require__(2);
const Ship = __webpack_require__(6);

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

function GameView(ctx) {
  this.ctx = ctx;
  this.game = new Game();
}

GameView.prototype.start = function(){
  setInterval( () => {
    this.game.step(this.ctx);
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(1);
const MovingObject = __webpack_require__(3);
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


/***/ })
/******/ ]);
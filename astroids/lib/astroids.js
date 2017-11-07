// ENTRY!!!
const Util = require('./utils.js');
const Astroid = require('./astroid.js');
const Game = require('./game.js');
const GameView = require('./game_view.js');

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

import { Gameboard } from './scripts/gameboard.js';
import { Player } from './scripts/player.js';
import { Ship } from './scripts/ship.js';
import { Game } from './scripts/game.js';
import { renderShip } from './scripts/render.js';

const playBtn = document.querySelector('.play-btn');
const status = document.querySelector('.game-status');
status.textContent = 'Waiting for start';

const game = Game('Player 1', 'Player 2');

game.playerOne.board.resetBoard();
game.playerTwo.board.resetBoard();
// Place ships
game.playerOne.board.placeShip(0, game.playerOne.ships[0]);
// game.playerOne.board.placeShip(23, game.playerOne.ships[1]);
// game.playerOne.board.placeShip(75, game.playerOne.ships[2]);
// game.playerOne.board.placeShip(57, game.playerOne.ships[3]);
// game.playerOne.board.placeShip(29, game.playerOne.ships[4]);

// game.playerTwo.board.placeShip(5, game.playerTwo.ships[0]);
// game.playerTwo.board.placeShip(27, game.playerTwo.ships[1]);
// game.playerTwo.board.placeShip(76, game.playerTwo.ships[2]);
// game.playerTwo.board.placeShip(52, game.playerTwo.ships[3]);
game.playerTwo.board.placeShip(29, game.playerTwo.ships[4]);

game.playerOne.allocateDOMBoard(document.querySelector('.board__table-1'));
game.playerTwo.allocateDOMBoard(document.querySelector('.board__table-2'));


// Render ships on boards
game.playerOne.ships.forEach((ship) => {
  renderShip(1, ship);
});

game.playerTwo.ships.forEach((ship) => {
  renderShip(2, ship);
});

game.gameStart();

playBtn.addEventListener('click', () => {
  status.textContent = 'Game started';
  console.log(game.currentTurn());
  game.resetGame();
  console.log(game.currentTurn());
});

import { Gameboard } from './scripts/gameboard.js';
import { Player } from './scripts/player.js';
import { Ship } from './scripts/ship.js';
import { Game } from './scripts/game.js';
import { renderShip, clearBoardsVisually, createDraggableShip, createDOMShipFleet } from './scripts/render.js';
import { checkAmountOfPlayers, dragAndDrop } from './scripts/controller.js';

const playBtn = document.querySelector('.play-btn');
const status = document.querySelector('.game-status');
status.textContent = 'Waiting for start';

const game = Game('Player 1', 'Player 2');

game.playerOne.board.resetBoard();
game.playerTwo.board.resetBoard();
// Place ships

game.playerOne.board.rotateShip(game.playerOne.ships[0]);
game.playerOne.board.rotateShip(game.playerOne.ships[1]);
game.playerOne.board.rotateShip(game.playerOne.ships[2]);
game.playerOne.board.rotateShip(game.playerOne.ships[3]);
game.playerOne.board.rotateShip(game.playerOne.ships[4]);

game.playerOne.board.placeShip(0, game.playerOne.ships[0]);
game.playerOne.board.placeShip(10, game.playerOne.ships[1]);
game.playerOne.board.placeShip(20, game.playerOne.ships[2]);
game.playerOne.board.placeShip(30, game.playerOne.ships[3]);
game.playerOne.board.placeShip(40, game.playerOne.ships[4]);

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

playBtn.addEventListener('click', () => {
  // if (!game.playerOne.allShipsPlaced() || !game.playerTwo.allShipsPlaced()) {
  //   throw new Error('Not all ships placed');
  // }

  if (checkAmountOfPlayers() === 1) {
    game.gameStartOnePlayer();
  } else {
    game.gameStartTwoPlayer();
  }
  // game.gameSetupOnePlayer();
  
  status.textContent = 'Game reset';
  // game.resetGame();
  // clearBoardsVisually();
  // console.log(game.playerOne.ships);
});

createDOMShipFleet();

dragAndDrop();

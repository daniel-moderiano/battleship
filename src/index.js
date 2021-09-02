import { Gameboard } from './scripts/gameboard.js';
import { Player } from './scripts/player.js';
import { Ship } from './scripts/ship.js';
import { Game } from './scripts/game.js';
import { createDOMShipFleet, refreshDOMBoardShips } from './scripts/render.js';
import { addShipListeners, checkAmountOfPlayers, dragAndDrop, addPlayerNumberControls } from './scripts/controller.js';

const playBtn = document.querySelector('.play-btn');
const status = document.querySelector('.game-status');
status.textContent = 'Waiting for start';

let gameActive = false;

const game = Game('Player 1', 'Player 2');

game.playerOne.board.resetBoard();
game.playerTwo.board.resetBoard();
// Place ships

// DO NOT REMOVE as this will cause immediate game over for player 2
// game.playerTwo.board.placeShip(29, game.playerTwo.ships[4]);

game.playerOne.allocateDOMBoard(document.querySelector('.board__table-1'));
game.playerTwo.allocateDOMBoard(document.querySelector('.board__table-2'));

playBtn.addEventListener('click', () => {
  console.log(game.playerTwo.board.getCurrentShips());
  console.log(game.playerOne.board.getCurrentShips());
  

  if (checkAmountOfPlayers() === 1) {
    if (!game.playerOne.allShipsPlaced()) {
      throw new Error('Not all ships placed');
    }
    document.querySelectorAll('.board__cell').forEach((cell) => cell.classList.add('board__cell--active'));
    game.gameStartOnePlayer();
    gameActive = true;
    refreshDOMBoardShips(game.playerOne);
  } else {
    if (!game.playerTwo.allShipsPlaced() || !game.playerOne.allShipsPlaced()) {
      throw new Error('Not all ships placed');
    }
    document.querySelectorAll('.board__cell').forEach((cell) => cell.classList.add('board__cell--active'));
    game.gameStartTwoPlayer();
    refreshDOMBoardShips(game.playerOne);
  }
  // game.gameSetupOnePlayer();
  
  status.textContent = 'Game reset';
  // game.resetGame();
  // clearBoardsVisually();
  // console.log(game.playerOne.ships);
});

createDOMShipFleet();

if (checkAmountOfPlayers() === 1) {
  dragAndDrop(game.playerOne);
} else {
  dragAndDrop(game.playerOne);
  dragAndDrop(game.playerTwo);
}

addShipListeners(game.playerOne);
addPlayerNumberControls();
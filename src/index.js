import { Gameboard } from './scripts/gameboard.js';
import { Player } from './scripts/player.js';
import { Ship } from './scripts/ship.js';
import { Game } from './scripts/game.js';
import { createDOMShipFleet, refreshDOMBoardShips, clearBoardsVisually } from './scripts/render.js';
import { addShipListeners, checkAmountOfPlayers, dragAndDrop, addPlayerBtnListener } from './scripts/controller.js';

const playBtn = document.querySelector('.play-btn');
const status = document.querySelector('.game-status');
status.textContent = 'Waiting for start';

function createNewGame() {
  const game = Game('Player 1', 'Player 2');
  document.querySelector('.restart-btn').classList.add('hidden');

  game.playerOne.board.resetBoard();
  game.playerTwo.board.resetBoard();

  game.playerOne.allocateDOMBoard(document.querySelector('.board__table-1'));
  game.playerTwo.allocateDOMBoard(document.querySelector('.board__table-2'));
  return game;
}

const game = createNewGame();

playBtn.addEventListener('click', () => {
  if (checkAmountOfPlayers() === 1) {
    if (!game.playerOne.allShipsPlaced()) {
      throw new Error('Not all ships placed');
    }
    document.querySelectorAll('.board__cell').forEach((cell) => cell.classList.add('board__cell--active'));
    game.gameStartOnePlayer();
    refreshDOMBoardShips(game.playerOne, 1);
  } else if (!game.playerTwo.allShipsPlaced() || !game.playerOne.allShipsPlaced()) {
    throw new Error('Not all ships placed');
  }
});

createDOMShipFleet();

if (checkAmountOfPlayers() === 1) {
  dragAndDrop(game.playerOne, game.playerTwo);
  addShipListeners(game.playerOne);
}

window.addEventListener('boardswitched', () => {
  dragAndDrop(game.playerTwo, game.playerOne);
  addShipListeners(game.playerTwo);
});

window.addEventListener('begintwoplayer', () => {
  document.querySelectorAll('.board__cell').forEach((cell) => cell.classList.add('board__cell--active'));
  game.gameStartTwoPlayer();
  refreshDOMBoardShips(game.playerOne, 1);
  refreshDOMBoardShips(game.playerTwo, 2);
});

addPlayerBtnListener();

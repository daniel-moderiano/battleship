import { Game } from './scripts/game';
import { createDOMShipFleet, refreshDOMBoardShips } from './scripts/render';
import {
  addShipListeners,
  checkAmountOfPlayers,
  dragAndDrop,
  addPlayerBtnListener,
  addRestartBtnListener,
} from './scripts/controller';

const playBtn = document.querySelector('.play-btn');
const status = document.querySelector('.game-status');
const error = document.querySelector('.error');
status.textContent = 'Waiting for start';

function createNewGame() {
  const game = Game('Player 1', 'Player 2');
  document.querySelector('.reset-btn').classList.add('hidden');

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
      error.textContent = 'All ships must be placed first!';
      throw new Error('Not all ships placed');
    }
    document.querySelectorAll('.board__cell').forEach((cell) => cell.classList.add('board__cell--active'));
    game.gameStartOnePlayer();
    refreshDOMBoardShips(game.playerOne, 1);
    document.querySelector('.play-btn').classList.add('hidden');
    document.querySelector('.restart-btn').classList.remove('hidden');
    document.querySelector('.shipyard').remove();
    status.textContent = 'The battle is on!';
  } else if (!game.playerTwo.allShipsPlaced() || !game.playerOne.allShipsPlaced()) {
    error.textContent = 'All ships must be placed first!';
    throw new Error('Not all ships placed');
  }
});

createDOMShipFleet();

if (checkAmountOfPlayers() === 1) {
  dragAndDrop(game.playerOne);
  addShipListeners(game.playerOne);
}

window.addEventListener('boardswitched', () => {
  dragAndDrop(game.playerTwo);
  addShipListeners(game.playerTwo);
});

window.addEventListener('begintwoplayer', () => {
  document.querySelectorAll('.board__cell').forEach((cell) => cell.classList.add('board__cell--active'));
  game.gameStartTwoPlayer();
  // TODO: need to refresh in such a way that ships are hidden for 2 player
  refreshDOMBoardShips(game.playerOne, 1);
  refreshDOMBoardShips(game.playerTwo, 2);
});

addPlayerBtnListener();

document.querySelector('.name-one').addEventListener('input', (e) => {
  game.playerTwo.name = e.target.textContent;
});

document.querySelector('.name-two').addEventListener('input', (e) => {
  game.playerTwo.name = e.target.textContent;
});

addRestartBtnListener(game);

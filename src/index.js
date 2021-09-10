import { createNewGame } from './scripts/game';
import { createDOMShipFleet, refreshDOMBoardShips } from './scripts/render';
import {
  addShipListeners,
  checkAmountOfPlayers,
  dragAndDrop,
  addPlayerBtnListener,
  addRestartBtnListener,
} from './scripts/controller';



const game = createNewGame();

document.querySelector('.play-btn').addEventListener('click', () => {
  if (checkAmountOfPlayers() === 1) {
    if (!game.playerOne.allShipsPlaced()) {
      document.querySelector('.error').textContent = 'All ships must be placed first!';
      throw new Error('Not all ships placed');
    }
    document.querySelectorAll('.board__cell').forEach((cell) => cell.classList.add('board__cell--active'));
    game.gameStartOnePlayer();
    refreshDOMBoardShips(game.playerOne, 1);
    document.querySelector('.play-btn').classList.add('hidden');
    document.querySelector('.restart-btn').classList.remove('hidden');
    document.querySelector('.shipyard').remove();
    document.querySelector('.game-status').textContent = 'The battle is on!';
  } else if (!game.playerTwo.allShipsPlaced() || !game.playerOne.allShipsPlaced()) {
    document.querySelector('.error').textContent = 'All ships must be placed first!';
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
addRestartBtnListener(game);

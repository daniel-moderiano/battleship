import { createNewGame } from './scripts/game';
import { createDOMShipFleet } from './scripts/render';
import {
  addShipListeners,
  checkAmountOfPlayers,
  dragAndDrop,
  addPlayerBtnListener,
  addRestartBtnListener,
  addPlayBtnListener,
} from './scripts/controller';

const game = createNewGame();

addPlayBtnListener(game);

addPlayerBtnListener();

addRestartBtnListener(game);

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
  document.querySelectorAll('.ship').forEach((ship) => ship.remove());
  game.gameStartTwoPlayer();
});

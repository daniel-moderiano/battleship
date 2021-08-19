import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { Game } from './game.js';

const tableOne = document.querySelector('.board__table-1');
const tableTwo = document.querySelector('.board__table-2');

function captureClickedCell(e) {
  if (e.target.classList.contains('board__cell')) {
    return parseInt(e.target.dataset.coordinate);
  }
}

function attackClickedCell(e) {
  if (e.target.classList.contains('board__cell')) {
    board.receiveAttack(parseInt(e.target.dataset.coordinate));
  }
}

export { captureClickedCell };
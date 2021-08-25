import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { Game } from './game.js'

// const tables = document.querySelectorAll('.board__table');

// function createTable(table) {
//   let count = 0;
//   for (let i = 0; i < 10; i++) {
//     const tr = document.createElement('tr');
//     tr.classList.add('board__row');
//     table.appendChild(tr);
//     for (let j = 0; j < 10; j++) {
//       const td = document.createElement('td');
//       td.classList.add('board__cell');
//       td.dataset.coordinate = count;
//       tr.appendChild(td);
//       count += 1;
//     }
//   }
// }

function renderShip(boardNum, ship) {
  ship.position.forEach((coordinate) => {
    document.querySelector(`.board__table-${boardNum} [data-coordinate='${coordinate}']`).classList.add('board__cell--ship');
  });
}

function markCell(cell, didHit) {
  if (didHit) {
    cell.classList.add('board__cell--hit');
  } else {
    cell.classList.add('board__cell--miss');
  }
}


export { renderShip, markCell };
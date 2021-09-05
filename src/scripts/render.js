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

// Create ship DOM objects that can be dragged on to board for later use
function createDraggableShip(length, id) {
  const shipyard = document.querySelector('.shipyard');
  const table = document.createElement('table');
  table.classList.add('ship');
  table.setAttribute('draggable', 'true');
  table.dataset.id = id;
  for (let i = 0; i < length; i++) {
    const tr = document.createElement('tr');
    tr.classList.add('ship-row');
    const td = document.createElement('td');
    td.classList.add('ship-cell');
    tr.appendChild(td);
    table.appendChild(tr);
    table.dataset.length = i + 1;
    table.dataset.orientation = 'vertical';
  }
  shipyard.appendChild(table);
}

// Fleets of ships will always be of the following structure, so a function can be hardcoded
function createDOMShipFleet() {
  createDraggableShip(5, 0);
  createDraggableShip(4, 1);
  createDraggableShip(3, 2);
  createDraggableShip(3, 3);
  createDraggableShip(2, 4);
}

function renderShip(boardNum, ship) {
  ship.position.forEach((coordinate) => {
    document.querySelector(`.board__table-${boardNum} [data-coordinate='${coordinate}']`).classList.add('board__cell--ship');
  });
}

function refreshDOMBoardShips(player, boardNum) {
  // Add in colour indications for current ships
  document.querySelectorAll(`.board__table-${boardNum} .board__cell`).forEach((cell) => cell.classList.remove('board__cell--ship'));
  player.board.getCurrentShips().forEach((ship) => renderShip(boardNum, ship));
  // Remove actual ship DOM elements to help styling and prevent user moving ships mid game
  document.querySelectorAll('.ship').forEach((ship) => ship.remove());
}

function markCell(cell, didHit) {
  if (didHit) {
    cell.classList.add('board__cell--hit');
  } else {
    cell.classList.add('board__cell--miss');
  }
}

function clearBoardsVisually() {
  document.querySelectorAll('.board__cell').forEach((cell) => {
    cell.classList.remove('board__cell--miss');
    cell.classList.remove('board__cell--hit');
    cell.classList.remove('board__cell--ship');
  });
}

function switchBoards(boardToHide, boardToDisplay) {
  boardToHide.classList.add('board--hidden');
  boardToDisplay.classList.remove('board--hidden');
}

export { renderShip, markCell, clearBoardsVisually, createDraggableShip, createDOMShipFleet, refreshDOMBoardShips, switchBoards };
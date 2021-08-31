import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { Game } from './game.js';
import { renderShip } from './render.js';

const tableOne = document.querySelector('.board__table-1');
const tableTwo = document.querySelector('.board__table-2');

function captureClickedCell(e) {
  if (e.target.classList.contains('board__cell')) {
    return parseInt(e.target.dataset.coordinate);
  }
}

function attackClickedCell(e) {
  if (e.target.classList.contains('board__cell')) {
    board.receiveAttack();
  }
}

function checkAmountOfPlayers() {
  if (document.querySelector('#one-player').checked === true) {
    return 1;
  }
  return 2;
}

function dragAndDrop(player) {
  // Drag and Drop
  const shipDOMObjects = document.querySelectorAll('.ship');
  const boardCells = document.querySelectorAll('.board__cell');
  let currentShipLength = null;
  let currentShipOrientation = null;
  let currentShipID = null;

  // function saveData(e) {
  //   currentShipLength = e.target.dataset.length;
  //   currentShipOrientation = e.target.dataset.orientation;
  //   console.log('Runs');
  // }

  // Drag functions
  // Data transfer is used to communicate the length of the ship while dragging/dropping
  function dragStart(e) {
    currentShipLength = parseInt(e.target.dataset.length);
    currentShipOrientation = e.target.dataset.orientation;
    currentShipID = e.target.dataset.id;
    const shipData = { length: parseInt(e.target.dataset.length), orientation: e.target.dataset.orientation };
    e.dataTransfer.setData('text/plain', JSON.stringify(shipData));
  }

  function dragEnd(e) {
    currentShipLength = null;
    currentShipOrientation = null;
    currentShipID = null;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter() {
    if (player.board.isValidPosition(parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation)) {
      this.classList.add('board__cell--hovered');
    }
  }

  function dragLeave() {
    this.classList.remove('board__cell--hovered');
  }

  function dragDrop() {
    if (player.board.isValidPosition(parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation)) {
      player.board.placeShip(parseInt(this.dataset.coordinate), player.ships[currentShipID]);
      renderShip(1, player.ships[currentShipID]);
    }
    console.log(player.board.getCurrentShips());
    this.classList.remove('board__cell--hovered');
  }

  // Add listeners
  shipDOMObjects.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
  });

  boardCells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
  });
}

export { captureClickedCell, checkAmountOfPlayers, dragAndDrop };
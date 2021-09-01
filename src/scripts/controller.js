import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { Game } from './game.js';
import { addShipHover, removeShipHover, renderShip, refreshDOMBoardShips } from './render.js';

const tableOne = document.querySelector('.board__table-1');
const tableTwo = document.querySelector('.board__table-2');

function captureClickedCell(e) {
  if (e.target.classList.contains('board__cell')) {
    return parseInt(e.target.dataset.coordinate);
  }
}

function rotateOnClick(e, player) {
  const shipElement = e.target.parentNode.parentNode;
  if (shipElement.classList.contains('ship--placed')) {
    // Rotate player ship
    try {
      player.board.rotateShip(player.ships[shipElement.dataset.id]);
      shipElement.classList.toggle('ship--horizontal');
    } catch (error) {
      //TODO: CSS style to wobble or change ship colour, indicating invalid rotation?
      console.log(error);
      shipElement.classList.add('ship--error');
      setTimeout(() => shipElement.classList.remove('ship--error'), 100);
    }
  }
}

function addShipListeners(player) {
  document.querySelectorAll('.ship').forEach((ship) => {
    ship.addEventListener('click', (e) => {
      rotateOnClick(e, player);
    });
  });
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
  let currentShipObject = null;

  // Drag functions
  // Data transfer is used to communicate the length of the ship while dragging/dropping
  function dragStart(e) {
    currentShipLength = parseInt(e.target.dataset.length);
    currentShipOrientation = e.target.dataset.orientation;
    currentShipID = e.target.dataset.id;
    currentShipObject = e.target;
  }

  function dragEnd() {
    currentShipLength = null;
    currentShipOrientation = null;
    currentShipID = null;
    currentShipObject = null;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter() {
    if (player.board.isValidPosition(parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation)) {
      currentShipObject.classList.add('ship--placed');
      this.appendChild(currentShipObject);
    }
  }

  function dragDrop() {
    if (player.board.isValidPosition(parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation)) {
      player.board.placeShip(parseInt(this.dataset.coordinate), player.ships[currentShipID]);
      currentShipObject.classList.add('ship--placed');
      this.appendChild(currentShipObject);
    }
  }

  // Add listeners
  shipDOMObjects.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
  });

  boardCells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('drop', dragDrop);
  });
}

export { captureClickedCell, checkAmountOfPlayers, dragAndDrop, rotateOnClick, addShipListeners };
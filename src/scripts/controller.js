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
    shipElement.classList.toggle('ship--horizontal');
    // Rotate player ship
    player.board.rotateShip(player.ships[shipElement.dataset.id]);
  }
  console.log(player.ships);
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
  const shipyard = document.querySelector('.shipyard');
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

  function dragEnd(e) {
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
      // setTimeout(() => {
      //   addShipHover(1, parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation);
      //   this.classList.add('board__cell--hovered');
      // }, 0);
      currentShipObject.classList.add('ship--placed');
      this.appendChild(currentShipObject);
    }
  }

  function dragLeave() {
    if (player.board.isValidPosition(parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation)) {
      // removeShipHover(1, parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation);
    //  removeShipHover(1, parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation);
    }
    // this.classList.remove('board__cell--hovered');
    currentShipObject.classList.add('ship--placed');
    // this.remove(currentShipObject);
  }

  function dragDrop() {
    if (player.board.isValidPosition(parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation)) {
      player.board.placeShip(parseInt(this.dataset.coordinate), player.ships[currentShipID]);
      // refreshDOMBoardShips(player);
      // shipyard.removeChild(currentShipObject);
      currentShipObject.classList.add('ship--placed');
      this.appendChild(currentShipObject);
    }
    removeShipHover(1, parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation);
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

export { captureClickedCell, checkAmountOfPlayers, dragAndDrop, rotateOnClick, addShipListeners };
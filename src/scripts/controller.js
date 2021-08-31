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
    board.receiveAttack();
  }
}

function checkAmountOfPlayers() {
  if (document.querySelector('#one-player').checked === true) {
    return 1;
  }
  return 2;
}

function dragAndDrop(gameboard) {
  // Drag and Drop
  const shipDOMObjects = document.querySelectorAll('.ship');
  const boardCells = document.querySelectorAll('.board__cell');

  // Drag functions
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.length);
  }

  function dragEnd() {
    console.log('Drag ended');
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter() {
    if (gameboard.isValidPosition(this.dataset.coordinate)) {
      this.classList.add('board__cell--hovered');
    }
  }

  function dragLeave() {
    this.classList.remove('board__cell--hovered');
  }

  function dragDrop(e) {
    this.classList.remove('board__cell--hovered');
    console.log(e.dataTransfer.getData('text/plain'));
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
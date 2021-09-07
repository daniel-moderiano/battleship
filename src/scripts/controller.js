import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { Game } from './game.js';
import { renderShip, refreshDOMBoardShips, createDOMShipFleet } from './render.js';

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

function dragAndDrop(playerInControl) {
  // Drag and Drop
  const shipDOMObjects = document.querySelectorAll('.ship');
  // Select only the cells in the specified player's DOM board
  const boardCells = [...document.querySelectorAll('.board__cell')].filter((cell) => playerInControl.getDOMBoard().contains(cell));
  const shipyard = document.querySelector('.shipyard');
  let currentShipLength = null;
  let currentShipOrientation = null;
  let currentShipID = null;
  let currentShipObject = null;
  const currentBoard = document.querySelector('.board--active');
  let currentBoardId = parseInt(currentBoard.dataset.id);

  // Drag functions
  // Data transfer is used to communicate the length of the ship while dragging/dropping
  function dragStart() {
    currentShipLength = parseInt(this.dataset.length);
    currentShipOrientation = this.dataset.orientation;
    currentShipID = this.dataset.id;
    currentShipObject = this;
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
    if (playerInControl.board.isValidPosition(parseInt(this.dataset.coordinate), currentShipLength, currentShipOrientation)) {
      playerInControl.board.placeShip(parseInt(this.dataset.coordinate), playerInControl.ships[currentShipID]);
      currentShipObject.classList.add('ship--placed');
      this.appendChild(currentShipObject);
    }
  }

  function playerOneReady() {
    window.removeEventListener('dragend', dragDrop);
    // Switch boards
    document.querySelector('.board-one').classList.add('board--hidden');
    document.querySelector('.board-one').classList.remove('board--active');
    document.querySelector('.board-two').classList.remove('board--hidden');
    document.querySelector('.board-two').classList.add('board--active');
    // Refresh shipyard
    createDOMShipFleet();
    // Adjust board count
    currentBoardId = 2;
    const event = new Event('boardswitched');
    window.dispatchEvent(event);
    document.querySelector('.board__ready[data-id="1"]').remove();
    document.querySelector('.play-btn').classList.add('hidden');
    document.querySelector('.restart-btn').classList.remove('hidden');
  }

  function playerTwoReady() {
    window.removeEventListener('dragend', dragDrop);
    // Switch board and remove shipyard
    shipyard.remove();
    // Reset board
    currentBoardId = 1;
    const event = new Event('begintwoplayer');
    window.dispatchEvent(event);
    document.querySelector('.board__ready[data-id="2"]').remove();
    document.querySelector('.play-btn').classList.add('hidden');
    document.querySelector('.restart-btn').classList.remove('hidden');
  }

  function dragDrop() {
    // Depending on the game, i.e. one vs two players, different actions will need to be taken once all ships are placed
    if (playerInControl.allShipsPlaced() && checkAmountOfPlayers() === 2) {
      // Switch boards and refresh shipyard to allow player two to place ships if they have not already
      if (currentBoardId === 1) {
        document.querySelector('.board__ready[data-id="1"]').addEventListener('click', playerOneReady);
      } else {
        document.querySelector('.board__ready[data-id="2"]').textContent = 'Begin game';
        document.querySelector('.board__ready[data-id="2"]').addEventListener('click', playerTwoReady);
      }
    } else if (playerInControl.allShipsPlaced()) {
      // Remove the shipyard to center both boards, ready for one player mode
      shipyard.remove();
    }
    console.log(playerInControl.getName());
  }

  // Add listeners
  shipDOMObjects.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
  });

  boardCells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
  });

  window.addEventListener('dragend', dragDrop);
}

function displayOnePlayerSetup() {
  document.querySelector('.board-two').classList.remove('board--hidden');
}

function displayTwoPlayerSetup() {
  // Hide the second board initially to allow player one to place their ships, then the board will switch to player two's to place their ships
  document.querySelector('.board-two').classList.add('board--hidden');
}

function addPlayerBtnListener() {
  document.querySelector('.num-players__btn').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';

    if (checkAmountOfPlayers() === 1) {
      displayOnePlayerSetup();
    } else {
      displayTwoPlayerSetup();
    }
  });
}


export { captureClickedCell, checkAmountOfPlayers, dragAndDrop, rotateOnClick, addShipListeners, addPlayerBtnListener };
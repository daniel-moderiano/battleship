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

function dragAndDrop(player) {
  // Drag and Drop
  const shipDOMObjects = document.querySelectorAll('.ship');
  // Select only the cells in the specified player's DOM board
  const boardCells = [...document.querySelectorAll('.board__cell')].filter((cell) => player.getDOMBoard().contains(cell));
  const shipyard = document.querySelector('.shipyard');
  let currentShipLength = null;
  let currentShipOrientation = null;
  let currentShipID = null;
  let currentShipObject = null;
  let currentBoard = 1;

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
      player.board.placeShip(parseInt(this.dataset.coordinate), player.ships[currentShipID]);
      currentShipObject.classList.add('ship--placed');
      this.appendChild(currentShipObject);
    }
  }

  function dragLeave() {
    // TODO
  }

  function dragDrop() {
    // Depending on the game, i.e. one vs two players, different actions will need to be taken once all ships are placed
    if (player.allShipsPlaced() && checkAmountOfPlayers() === 2) {
      // Switch boards and refresh shipyard to allow player two to place ships if they have not already
      if (currentBoard === 1) {
        // Switch boards
        document.querySelector('.board-one').classList.add('board--hidden');
        document.querySelector('.board-two').classList.remove('board--hidden');
        // Refresh shipyard
        createDOMShipFleet();
        // Adjust board count
        currentBoard = 2;
      } else {
        // Switch board and remove shipyard
        shipyard.remove();
        // document.querySelector('.board-two').classList.add('board--hidden');
        document.querySelector('.board-one').classList.remove('board--hidden');
        // Reset board
        currentBoard = 1;
      }
    } else if (player.allShipsPlaced()) {
      // Remove the shipyard to center both boards, ready for one player mode
      shipyard.remove();
    }
  }

  // Add listeners
  shipDOMObjects.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
    ship.addEventListener('mouseup', (e) => console.log(e.target));
  });

  boardCells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    // cell.addEventListener('drop', dragDrop);
  });

  window.addEventListener('dragend', () => {
    // Depending on the game, i.e. one vs two players, different actions will need to be taken once all ships are placed
    if (player.allShipsPlaced() && checkAmountOfPlayers() === 2) {
      // Switch boards and refresh shipyard to allow player two to place ships if they have not already
      if (currentBoard === 1) {
        // Switch boards
        document.querySelector('.board-one').classList.add('board--hidden');
        document.querySelector('.board-two').classList.remove('board--hidden');
        // Refresh shipyard
        createDOMShipFleet();
        // Adjust board count
        currentBoard = 2;
      } else {
        // Switch board and remove shipyard
        shipyard.remove();
        // document.querySelector('.board-two').classList.add('board--hidden');
        document.querySelector('.board-one').classList.remove('board--hidden');
        // Reset board
        currentBoard = 1;
      }
    } else if (player.allShipsPlaced()) {
      // Remove the shipyard to center both boards, ready for one player mode
      shipyard.remove();
    }
  });
}



// Add listeners to radio buttons. These will switch the pre-game to one or two player mode. Default one player
function addPlayerNumberControls() {
  document.querySelector('#one-player').addEventListener('change', () => {
    document.querySelector('.board-two').classList.remove('board--hidden');
  });

  document.querySelector('#two-player').addEventListener('change', () => {
    // Hide the second board initially to allow player one to place their ships, then the board will switch to player two's to place their ships
    document.querySelector('.board-two').classList.add('board--hidden');
  });
}

export { captureClickedCell, checkAmountOfPlayers, dragAndDrop, rotateOnClick, addShipListeners, addPlayerNumberControls };
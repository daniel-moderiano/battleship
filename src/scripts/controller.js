import { createDOMShipFleet } from './render';

function rotateOnClick(e, player) {
  const shipElement = e.target.parentNode.parentNode;
  if (shipElement.classList.contains('ship--placed')) {
    // Rotate player ship
    try {
      player.board.rotateShip(player.ships[shipElement.dataset.id]);
      shipElement.classList.toggle('ship--horizontal');
      // Switch the orientation on the ship object data-orientation attribute to prevent inability to place ship at edges
      if (shipElement.dataset.orientation === 'vertical') {
        shipElement.dataset.orientation = 'horizontal';
      } else {
        shipElement.dataset.orientation = 'vertical';
      }
    } catch (error) {
      // Flash a red border around the ship if the user attempts to make an invalid rotation
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

  // Note 'this' is used instead of e.target, as e.target gets the specific target clicked, while 'this' reverts to the nearest 'div' element
  function dragStart() {
    currentShipLength = parseInt(this.dataset.length);
    currentShipOrientation = this.dataset.orientation;
    currentShipID = this.dataset.id;
    currentShipObject = this;
  }

  // Ensure no data if left over after drag ends to avoid clash of data
  function dragEnd() {
    currentShipLength = null;
    currentShipOrientation = null;
    currentShipID = null;
    currentShipObject = null;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  // Give the effect of seeing the ship in the spot you are hovering. Will only active for valid positions
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
    // Adjust board count to avoid repeating this function fro player 2
    currentBoardId = 2;
    // Send message to main module that identifies boards have been switched
    const event = new Event('boardswitched');
    window.dispatchEvent(event);
    document.querySelector('.board__ready[data-id="1"]').remove();
    document.querySelector('.play-btn').classList.add('hidden');
  }

  function playerTwoReady() {
    // window.removeEventListener('dragend', dragDrop);
    // Switch board and remove shipyard
    shipyard.remove();
    // Let main module know the game should now begin
    const event = new Event('begintwoplayer');
    window.dispatchEvent(event);
    document.querySelector('.board__ready[data-id="2"]').remove();
    document.querySelector('.play-btn').classList.add('hidden');
  }

  function dragDrop() {
    // Depending on the game, i.e. one vs two players, different actions will need to be taken once all ships are placed
    if (playerInControl.allShipsPlaced() && checkAmountOfPlayers() === 2) {
      // Switch boards and refresh shipyard to allow player two to place ships if they have not already
      if (currentBoardId === 1) {
        document.querySelector('.board__ready[data-id="1"]').classList.remove('hidden');
        document.querySelector('.board__ready[data-id="1"]').addEventListener('click', playerOneReady);
      } else {
        document.querySelector('.board__ready[data-id="2"]').classList.remove('hidden');
        document.querySelector('.board__ready[data-id="2"]').textContent = 'Begin game';
        document.querySelector('.board__ready[data-id="2"]').addEventListener('click', playerTwoReady);
      }
    } else {
      document.querySelector('.error').textContent = '';
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

// Simply reload the page
function addRestartBtnListener() {
  document.querySelector('.restart-btn').addEventListener('click', () => {
    window.location.reload();
  });

  document.querySelector('.reset-btn').addEventListener('click', () => {
    window.location.reload();
  });
}

export {
  addRestartBtnListener,
  checkAmountOfPlayers,
  dragAndDrop,
  rotateOnClick,
  addShipListeners,
  addPlayerBtnListener,
};

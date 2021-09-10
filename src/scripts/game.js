import { Player } from './player';

import { markCell, switchBoards } from './render';

import {
  calculateValidCells,
  filterAttackedCells,
  determineOrientation,
  calculateValidVerticalCells,
  calculateValidHorizontalCells,
} from './ai';

function Game(playerOneName, playerTwoName) {
  const playerOne = Player(playerOneName);
  const playerTwo = Player(playerTwoName);

  let turn = 0;

  const changeTurn = () => {
    if (turn === 0) {
      turn += 1;
    } else {
      turn = 0;
    }
  };

  const currentTurn = () => turn;

  const resetTurn = () => {
    turn = 0;
  };

  const currentPlayers = [playerOne, playerTwo];

  let currentPlayer = currentPlayers[turn];

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayers[currentTurn()];
  };

  const setActiveBoards = () => {
    if (currentTurn() === 0) {
      playerOne.deactivateDOMBoard();
      playerTwo.activateDOMBoard();
      document.querySelector('.board__title-1').classList.add('board__title--active');
      document.querySelector('.board__title-2').classList.remove('board__title--active');
    } else {
      playerOne.activateDOMBoard();
      playerTwo.deactivateDOMBoard();
      document.querySelector('.board__title-2').classList.add('board__title--active');
      document.querySelector('.board__title-1').classList.remove('board__title--active');
    }
  };

  const indicateActivePlayer = () => {
    if (currentTurn() === 0) {
      document.querySelector('.board__title-1').classList.add('board__title--active');
      document.querySelector('.board__title-2').classList.remove('board__title--active');
    } else {
      document.querySelector('.board__title-2').classList.add('board__title--active');
      document.querySelector('.board__title-1').classList.remove('board__title--active');
    }
  };

  const turnComplete = () => {
    changeTurn();
    changeCurrentPlayer();
    setActiveBoards();
    indicateActivePlayer();
  };

  const checkLose = (player) => player.board.remainingShips() === 0;

  const gameOver = () => {
    resetTurn();
    playerOne.deactivateDOMBoard();
    playerTwo.deactivateDOMBoard();
    document.querySelector('.game-status').textContent = `Game over, ${currentPlayer.name} wins!`;
    document.querySelector('.reset-btn').classList.remove('hidden');
  };

  // Computer will, by default, always be player two. Below is random cell choice
  const chooseRandomCell = () => {
    const validCells = playerOne.board.getRemainingFreeCells();
    const cellChoice = Math.floor((Math.random() * validCells.length));
    return validCells[cellChoice];
  };

  // Chooses an AI-guided cell that varies depending on whether orientation is known or not
  const chooseComputerCell = (previousCellChoice, currentShipOrientation = null) => {
    let validCells;
    const cellInput = parseInt(previousCellChoice);
    if (currentShipOrientation === 'vertical') {
      validCells = calculateValidVerticalCells(cellInput);
      if (validCells === 'none') {
        return undefined;
      }
    } else if (currentShipOrientation === 'horizontal') {
      validCells = calculateValidHorizontalCells(cellInput);
      if (validCells === 'none') {
        return undefined;
      }
    } else {
      validCells = calculateValidCells(cellInput);
    }
    const attackedCells = playerOne.board.getAllAttackedCoordinates();
    const filteredCellChoices = filterAttackedCells(validCells, attackedCells);
    return filteredCellChoices[(Math.floor(Math.random() * filteredCellChoices.length))];
  };

  function onePlayerGameLoop() {
    let previousCell = chooseRandomCell();
    let didPreviousCellHit = [];
    const currentTargetHits = [];
    let currentTargetShip = null;
    // Player 2 board
    document.querySelector('.board__table-2').addEventListener('click', (e) => {
      // If the parent node chain works, the target by definition must be a board cell
      if (e.target.parentNode.parentNode.parentNode.classList.contains('board__table--active')) {
        const p = new Promise((resolve) => {
          const didHit = playerTwo.board.receiveAttack(parseInt(e.target.dataset.coordinate));
          if (didHit.length === 0) {
            markCell(e.target, false);
            document.querySelector('.game-status').textContent = 'The battle is on!';
          } else {
            markCell(e.target, true);
            if (didHit[0].isSunk()) {
              document.querySelector('.game-status').textContent = `You sunk one of ${playerTwo.name}'s ships!`;
            }
          }
          resolve();
        });
        p.then(() => {
          if (checkLose(playerTwo)) {
            gameOver();
            // End game
          } else {
            turnComplete();
          }
        })
          .then(() => {
            let currentCell;

            // Use AI to choose next cell if previous cell was a successful hit
            if (didPreviousCellHit.length !== 0) {
              // Use orientation of ship to guide choice if ship has already sustained 2+ hits
              if (currentTargetHits.length > 1) {
                if (determineOrientation(currentTargetHits) === 'horizontal') {
                  currentCell = chooseComputerCell(previousCell, 'horizontal');
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCell(currentTargetHits[0], 'horizontal');
                  }
                } else {
                  currentCell = chooseComputerCell(previousCell, 'vertical');
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCell(currentTargetHits[0], 'vertical');
                  }
                }
              } else {
                currentCell = chooseComputerCell(previousCell);
              }
            // If previous cell missed, but there is a currently un-sunk ship, choose next cell based on most recent hit
            } else if (didPreviousCellHit.length === 0 && currentTargetHits.length !== 0) {
              if (currentTargetHits.length > 1) {
                if (determineOrientation(currentTargetHits) === 'horizontal') {
                  currentCell = chooseComputerCell(currentTargetHits[currentTargetHits.length - 1], 'horizontal');
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCell(currentTargetHits[0], 'horizontal');
                  }
                } else {
                  currentCell = chooseComputerCell(currentTargetHits[currentTargetHits.length - 1], 'vertical');
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCell(currentTargetHits[0], 'vertical');
                  }
                }
              } else {
                currentCell = chooseComputerCell(currentTargetHits[currentTargetHits.length - 1]);
                if (currentCell === undefined) {
                  // Undefined cell in this logic tree indicates that one end of the ship has been reached, but the ship is not yet sunk. The solution is to switch to the other end of the ship.
                  currentCell = chooseComputerCell(currentTargetHits[0]);
                }
              }
            } else {
              currentCell = chooseRandomCell();
            }
            previousCell = currentCell;

            didPreviousCellHit = playerOne.board.receiveAttack(parseInt(currentCell));

            if (currentTargetShip !== null) {
              if (didPreviousCellHit.length !== 0) {
                if (didPreviousCellHit[0] !== currentTargetShip) {
                  [currentTargetShip] = didPreviousCellHit;
                  currentTargetHits.length = 0;
                  // currentTargetHits.push(currentCell);
                }
              }
            }

            if (didPreviousCellHit.length !== 0) {
              [currentTargetShip] = didPreviousCellHit;
            }

            setTimeout(() => {
              if (didPreviousCellHit.length === 0) {
                markCell(document.querySelector(`.board__table-1 [data-coordinate='${currentCell}']`), false);
              } else {
                markCell(document.querySelector(`.board__table-1 [data-coordinate='${currentCell}']`), true);
                if (didPreviousCellHit[0].isSunk()) {
                  // Ensure the computer selects random choice if a ship is sunk on the previous attack
                  didPreviousCellHit.length = 0;
                  // Clear the current target array and currentShip variable
                  currentTargetHits.length = 0;
                  currentTargetShip = null;
                } else {
                  currentTargetHits.push(currentCell);
                }
              }
              if (checkLose(playerOne)) {
                gameOver();
              } else {
                turnComplete();
              }
            }, 500);
          }).catch((err) => console.log(err));
      }
    });
  }

  const playTurn = (e, player) => {
    if (e.target.parentNode.parentNode.parentNode.classList.contains('board__table--active')) {
      const p = new Promise((resolve) => {
        const didHit = player.board.receiveAttack(parseInt(e.target.dataset.coordinate));
        if (didHit.length === 0) {
          markCell(e.target, false);
          document.querySelector('.game-status').textContent = 'The battle is on!';
        } else {
          markCell(e.target, true);
          if (didHit[0].isSunk()) {
            if (player === playerOne) {
              document.querySelector('.game-status').textContent = `You sunk one of ${player.getName(2)}'s ships!`;
            } else {
              document.querySelector('.game-status').textContent = `You sunk one of ${player.getName(1)}'s ships!`;
            }
          }
          document.querySelector('.game-status').textContent = 'The battle is on!';
        }
        resolve();
      });
      p.then(() => {
        if (checkLose(player)) {
          gameOver();
        } else {
          turnComplete();
          // Switch boards with a timer
          if (player === playerOne) {
            setTimeout(() => switchBoards(document.querySelector('.board-one'), document.querySelector('.board-two')), 1000);
          } else {
            setTimeout(() => switchBoards(document.querySelector('.board-two'), document.querySelector('.board-one')), 1000);
          }
        }
      }).catch((err) => console.log(err));
    }
  };

  function twoPlayerGameLoop() {
    // Player 1 board
    document.querySelector('.board__table-1').addEventListener('click', (e) => {
      playTurn(e, playerOne);
    });
    // Player 2 board
    document.querySelector('.board__table-2').addEventListener('click', (e) => {
      playTurn(e, playerTwo);
    });
  }

  const gameStartOnePlayer = () => {
    playerTwo.placeAIShips();
    resetTurn();
    changeCurrentPlayer();
    setActiveBoards();
    indicateActivePlayer();
    onePlayerGameLoop();
  };

  const gameStartTwoPlayer = () => {
    resetTurn();
    changeCurrentPlayer();
    setActiveBoards();
    indicateActivePlayer();
    twoPlayerGameLoop();
  };

  return {
    playerOne,
    playerTwo,
    currentTurn,
    changeTurn,
    resetTurn,
    gameStartOnePlayer,
    gameStartTwoPlayer,
    changeCurrentPlayer,
    turnComplete,
    onePlayerGameLoop,
  };
}

export { Game };

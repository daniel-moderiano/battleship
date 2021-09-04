import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { renderShip, markCell } from './render.js';
import { calculateValidCells, filterAttackedCells, determineOrientation, calculateValidVerticalCells, calculateValidHorizontalCells } from './ai.js';

function Game(playerOneName, playerTwoName = 'PC') {
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

  const getCurrentPlayers = () => currentPlayers;

  const getCurrentPlayer = () => currentPlayer;

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
    // play function
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
    console.log(`Game over, ${currentPlayer.name} wins!`);
  };

  const resetGame = () => {
    resetTurn();
    playerOne.deactivateDOMBoard();
    playerTwo.deactivateDOMBoard();
    playerOne.resetAllShips();
    playerTwo.resetAllShips();
  };

  // Computer will, by default, always be player two. Below is random cell choice
  const chooseRandomCell = () => {
    const validCells = playerOne.board.getRemainingFreeCells();
    const cellChoice = Math.floor((Math.random() * validCells.length));
    return validCells[cellChoice];
  };

  const chooseComputerCell = (previousCellChoice) => {
    const cellInput = parseInt(previousCellChoice);
    const validCells = calculateValidCells(cellInput);
    const attackedCells = playerOne.board.getAllAttackedCoordinates();
    const filteredCellChoices = filterAttackedCells(validCells, attackedCells);
    return filteredCellChoices[(Math.floor(Math.random() * filteredCellChoices.length))];
  };

  const chooseComputerCellHorizontal = (previousCellChoice) => {
    const cellInput = parseInt(previousCellChoice);
    const validCells = calculateValidHorizontalCells(cellInput);
    if (validCells === 'none') {
      return undefined;
    }
    const attackedCells = playerOne.board.getAllAttackedCoordinates();
    const filteredCellChoices = filterAttackedCells(validCells, attackedCells);
    return filteredCellChoices[(Math.floor(Math.random() * filteredCellChoices.length))];
  };

  const chooseComputerCellVertical = (previousCellChoice) => {
    const cellInput = parseInt(previousCellChoice);
    const validCells = calculateValidVerticalCells(cellInput);
    if (validCells === 'none') {
      return undefined;
    }
    const attackedCells = playerOne.board.getAllAttackedCoordinates();
    const filteredCellChoices = filterAttackedCells(validCells, attackedCells);
    return filteredCellChoices[(Math.floor(Math.random() * filteredCellChoices.length))];
  };

  function placeAIShips() {
    const orientations = ['vertical', 'horizontal'];
    for (let i = 0; i < 5; i++) {
      const shipToBePlaced = playerTwo.ships[i];
      // Randomly choose orientation to be used
      const orientationChoice = orientations[(Math.floor(Math.random() * 2))];
      shipToBePlaced.orientation = orientationChoice;
      // Generate random coordinate from 0-99, and check that it is a valid position
      let coordinate = Math.floor(Math.random() * 100);
      while (!playerTwo.board.isValidPosition(coordinate, shipToBePlaced.length, orientationChoice, false)) {
        coordinate = Math.floor(Math.random() * 100);
      }
      playerTwo.board.placeShip(coordinate, shipToBePlaced);
    }
  }

  function onePlayerGameLoop() {
    let previousCell = chooseRandomCell();
    let didPreviousCellHit = [];
    let currentTargetHits = [];
    let currentTargetShip = null;
    // Player 2 board
    document.querySelector('.board__table-2').addEventListener('click', (e) => {
      // If the parent node chain works, the target by definition must be a board cell
      if (e.target.parentNode.parentNode.parentNode.classList.contains('board__table--active')) {
        const p = new Promise((resolve) => {
          const didHit = playerTwo.board.receiveAttack(parseInt(e.target.dataset.coordinate));
          if (didHit.length === 0) {
            markCell(e.target, false);
          } else {
            markCell(e.target, true);
            if (didHit[0].isSunk()) {
              console.log(`Ship of class ${didHit[0].length} has been sunk!`);
            }
          }
          resolve();
        });
        p.then(() => {
          if (checkLose(playerTwo)) {
            gameOver();
            throw new Error('Game Over');
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
                  currentCell = chooseComputerCellHorizontal(previousCell);
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCellHorizontal(currentTargetHits[0]);
                  }
                } else {
                  currentCell = chooseComputerCellVertical(previousCell);
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCellVertical(currentTargetHits[0]);
                  }
                }
              } else {
                currentCell = chooseComputerCell(previousCell);
              }
            // If previous cell missed, but there is a currently un-sunk ship, choose next cell based on most recent hit
            } else if (didPreviousCellHit.length === 0 && currentTargetHits.length !== 0) {
              if (currentTargetHits.length > 1) {
                if (determineOrientation(currentTargetHits) === 'horizontal') {
                  currentCell = chooseComputerCellHorizontal(currentTargetHits[currentTargetHits.length - 1]);
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCellHorizontal(currentTargetHits[0]);
                  }
                } else {
                  currentCell = chooseComputerCellVertical(currentTargetHits[currentTargetHits.length - 1]);
                  if (currentCell === undefined) {
                    currentCell = chooseComputerCellVertical(currentTargetHits[0]);
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
                  currentTargetHits.push(currentCell);
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
                throw new Error('Game Over');
                // End game
              } else {
                turnComplete();
              }
            }, 500);
          })
          .catch((err) => {
            if (err.message === 'Game Over') {
              // Game over logic here
              console.log('TODO: game over logic');
            } else {
              console.log(err);
            }
          });
      }
    });
  }

  function twoPlayerGameLoop() {
    // Player 1 board
    document.querySelector('.board__table-1').addEventListener('click', (e) => {
      // If the parent node chain works, the target by definition must be a board cell
      if (e.target.parentNode.parentNode.parentNode.classList.contains('board__table--active')) {
        const p = new Promise((resolve) => {
          const didHit = playerOne.board.receiveAttack(parseInt(e.target.dataset.coordinate));
          if (didHit.length === 0) {
            markCell(e.target, false);
          } else {
            markCell(e.target, true);
          }
          resolve();
        });
        p.then(() => {
          if (checkLose(playerOne)) {
            gameOver();
            throw new Error('Game Over');
            // End game
          } else {
            turnComplete();
          }
        }).catch((err) => console.log(err));
    }});

    // Player 2 board
    document.querySelector('.board__table-2').addEventListener('click', (e) => {
      // If the parent node chain works, the target by definition must be a board cell
      if (e.target.parentNode.parentNode.parentNode.classList.contains('board__table--active')) {
        const p = new Promise((resolve) => {
          const didHit = playerTwo.board.receiveAttack(parseInt(e.target.dataset.coordinate));
          if (didHit.length === 0) {
            markCell(e.target, false);
          } else {
            markCell(e.target, true);
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
        }).catch((err) => console.log(err));
      }
    });
  }

  const gameStartOnePlayer = () => {
    placeAIShips();
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

  return { playerOne, playerTwo, currentTurn, changeTurn, resetTurn, getCurrentPlayers, gameStartOnePlayer, gameStartTwoPlayer, getCurrentPlayer, changeCurrentPlayer, turnComplete, resetGame, onePlayerGameLoop, placeAIShips }
}

export { Game };
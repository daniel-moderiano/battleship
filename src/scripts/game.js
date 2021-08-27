import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { renderShip, markCell } from './render.js';
import { calculateValidCells, filterAttackedCells } from './ai.js';

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
    if (filteredCellChoices.length === 0) {
      return chooseRandomCell();
    }
    return filteredCellChoices[(Math.floor(Math.random() * filteredCellChoices.length))];
  };

  function onePlayerGameLoop() {
    let previousCell = chooseRandomCell();
    let didPreviousCellHit = [];
    let currentTargetHits = [];
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
              currentCell = chooseComputerCell(previousCell);
            // If previous cell missed, but there is a currently un-sunk ship, choose next cell based on most recent hit
            } else if (didPreviousCellHit.length === 0 && currentTargetHits.length !== 0) {
              currentCell = chooseComputerCell(currentTargetHits[currentTargetHits.length - 1]);
            // Otherwise select random cell
            } else {
              currentCell = chooseRandomCell();
            }
            console.log(`Previous cell was ${previousCell}, next attack at ${currentCell}`);
            previousCell = currentCell;

            didPreviousCellHit = playerOne.board.receiveAttack(parseInt(currentCell));
            setTimeout(() => {
              if (didPreviousCellHit.length === 0) {
                markCell(document.querySelector(`.board__table-1 [data-coordinate='${currentCell}']`), false);
              } else {
                markCell(document.querySelector(`.board__table-1 [data-coordinate='${currentCell}']`), true);
                if (didPreviousCellHit[0].isSunk()) {
                  // Ensure the computer selects random choice if a ship is sunk on the previous attack
                  didPreviousCellHit.length = 0;
                  // Clear the current target array
                  currentTargetHits.length = 0;
                } else {
                  currentTargetHits.push(currentCell);
                }
              }
              if (checkLose(playerTwo)) {
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
          markCell(e.target, didHit);
          resolve();
        });
        p.then(() => {
          if (checkLose(playerOne)) {
            gameOver();
            // End game
          } else {
            turnComplete();
          }
        }).catch((err) => console.log(err));
      }
    });

    // Player 2 board
    document.querySelector('.board__table-2').addEventListener('click', (e) => {
      // If the parent node chain works, the target by definition must be a board cell
      if (e.target.parentNode.parentNode.parentNode.classList.contains('board__table--active')) {
        const p = new Promise((resolve) => {
          const didHit = playerTwo.board.receiveAttack(parseInt(e.target.dataset.coordinate));
          markCell(e.target, didHit);
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

  // onePlayerGameLoop();

  const gameStartOnePlayer = () => {
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

  return { playerOne, playerTwo, currentTurn, changeTurn, resetTurn, getCurrentPlayers, gameStartOnePlayer, gameStartTwoPlayer, getCurrentPlayer, changeCurrentPlayer, turnComplete, resetGame, onePlayerGameLoop }
}

export { Game };
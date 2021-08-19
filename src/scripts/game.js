import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { renderShip, markCell } from './render.js';

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
    } else {
      playerOne.activateDOMBoard();
      playerTwo.deactivateDOMBoard();
    }
  };

  const gameStart = () => {
    resetTurn();
    changeCurrentPlayer();
    setActiveBoards();
  };

  const turnComplete = () => {
    // play function
    changeTurn();
    changeCurrentPlayer();
    setActiveBoards();
  };

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
        turnComplete();
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
        turnComplete();
      }).catch((err) => console.log(err));
    }
  });

  

  return { playerOne, playerTwo, currentTurn, changeTurn, resetTurn, getCurrentPlayers, gameStart, getCurrentPlayer, changeCurrentPlayer, turnComplete }
}


// MOCK GAME

const game = Game('Dan', 'Sam');

// Place ships
game.playerOne.board.placeShip(0, game.playerOne.ships[0]);
game.playerOne.board.placeShip(23, game.playerOne.ships[1]);
game.playerOne.board.placeShip(75, game.playerOne.ships[2]);
game.playerOne.board.placeShip(57, game.playerOne.ships[3]);
game.playerOne.board.placeShip(29, game.playerOne.ships[4]);

game.playerTwo.board.placeShip(5, game.playerTwo.ships[0]);
game.playerTwo.board.placeShip(27, game.playerTwo.ships[1]);
game.playerTwo.board.placeShip(76, game.playerTwo.ships[2]);
game.playerTwo.board.placeShip(52, game.playerTwo.ships[3]);
game.playerTwo.board.placeShip(29, game.playerTwo.ships[4]);

game.playerOne.allocateDOMBoard(document.querySelector('.board__table-1'));
game.playerTwo.allocateDOMBoard(document.querySelector('.board__table-2'));


// Render ships on boards
game.playerOne.ships.forEach((ship) => {
  renderShip(1, ship);
});

game.playerTwo.ships.forEach((ship) => {
  renderShip(2, ship);
});

game.gameStart();
game.turnComplete();

// game.playerOne.deactivateDOMBoard();

// game.playerOne.getDOMBoard().addEventListener('click', () => console.log('clicked'));


export { Game };
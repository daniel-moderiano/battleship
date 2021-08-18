import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { Ship } from './ship.js';
import { renderShip } from './render.js'

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

  return { playerOne, playerTwo, currentTurn, changeTurn, resetTurn }
}

const game = Game('Dan', 'Sam');

game.playerOne.board.placeShip(0, game.playerOne.ships[0]);
game.playerOne.board.placeShip(23, game.playerOne.ships[1]);
game.playerOne.board.placeShip(75, game.playerOne.ships[2]);
game.playerOne.board.placeShip(57, game.playerOne.ships[3]);
game.playerOne.board.placeShip(29, game.playerOne.ships[4]);

game.playerTwo.board.placeShip(0, game.playerTwo.ships[0]);
game.playerTwo.board.placeShip(23, game.playerTwo.ships[1]);
game.playerTwo.board.placeShip(75, game.playerTwo.ships[2]);
game.playerTwo.board.placeShip(57, game.playerTwo.ships[3]);
game.playerTwo.board.placeShip(29, game.playerTwo.ships[4]);

renderShip(game.playerTwo.ships[0]);

export { Game };
import { Gameboard } from './gameboard.js';
import { Player } from './player';
import { Ship } from './ship.js';

function createNewGame(playerOneName, playerTwoName = 'PC') {
  const playerOne = Player(playerOneName);
  const playerTwo = Player(playerTwoName);
  return { playerOne, playerTwo }
}

const game = createNewGame('Dan', 'Sam');

export { createNewGame };
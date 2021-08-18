import { Gameboard } from './scripts/gameboard.js';
import { Player } from './scripts/player';
import { Ship } from './scripts/ship.js';
import { createNewGame } from './scripts/game.js';

test('createNewGame generates two players with unique names for 2 player mode', () => {
  const game = createNewGame('Dan', 'Sam');
  expect(game.playerTwo.name).toBe('Sam');
});

test('createNewGame generates two players PC player for 1 player mode', () => {
  const game = createNewGame('Dan');
  expect(game.playerTwo.name).toBe('PC');
});
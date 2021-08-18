import { Gameboard } from './scripts/gameboard.js';
import { Player } from './scripts/player';
import { Ship } from './scripts/ship.js';
import { Game } from './scripts/game.js';

test('createNewGame generates two players with unique names for 2 player mode', () => {
  const game = Game('Dan', 'Sam');
  expect(game.playerTwo.name).toBe('Sam');
});

test('createNewGame generates two players PC player for 1 player mode', () => {
  const game = Game('Dan');
  expect(game.playerTwo.name).toBe('PC');
});

test('Initial turn starts at zero', () => {
  const game = Game('Dan');
  expect(game.currentTurn()).toBe(0);
});

test('Change turn switches from turn 0 to 1', () => {
  const game = Game('Dan');
  game.changeTurn();
  expect(game.currentTurn()).toBe(1);
});

test('Change turn switches from turn 1 to 0', () => {
  const game = Game('Dan');
  game.changeTurn();
  game.changeTurn();
  expect(game.currentTurn()).toBe(0);
});

test('ResetTurn returns game turn to 0', () => {
  const game = Game('Dan');
  game.changeTurn();
  game.resetTurn();
  expect(game.currentTurn()).toBe(0);
});
import Gameboard from './scripts/gameboard';

test('Gameboard.missedAttacks() returns empty array before any attacks are made', () => {
  expect(Gameboard().getMissedAttacks()).toEqual([]);
});

test('Gameboard.getCurrentShips() returns empty array before any ships are positioned', () => {
  expect(Gameboard().getCurrentShips()).toEqual([]);
});
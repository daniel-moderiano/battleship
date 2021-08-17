import Gameboard from './scripts/gameboard';
import Ship from './scripts/ship'

test('missedAttacks returns empty array before any attacks are made', () => {
  expect(Gameboard().getMissedAttacks()).toEqual([]);
});

test('getCurrentShips returns empty array before any ships are positioned', () => {
  expect(Gameboard().getCurrentShips()).toEqual([]);
});

test('placeShip successfully adds ship in designated location', () => {
  const gameboard = Gameboard();
  gameboard.placeShip('cruiser', 0);
  expect(gameboard.getCurrentShips()).toEqual([{name: 'cruiser', position: [0, 10, 20]}]);
});
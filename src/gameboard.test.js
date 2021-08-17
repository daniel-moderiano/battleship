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
  gameboard.placeShip(0, 4);
  expect(gameboard.getCurrentShips()).toEqual([{name: 'battleship', position: [0, 10, 20, 30], sunk: false}]);
});


test('isValidPosition correctly identifies valid position', () => {
  expect(Gameboard().isValidPosition(11, 5, 'vertical')).toBe(true);
});

test('isValidPosition correctly identifies valid position', () => {
  expect(Gameboard().isValidPosition(36, 4, 'horizontal')).toBe(true);
});

test('isValidPosition correctly identifies invalid position', () => {
  expect(Gameboard().isValidPosition(27, 5, 'horizontal')).toBe(false);
});

test('isValidPosition correctly identifies invalid position', () => {
  expect(Gameboard().isValidPosition(78, 4, 'vertical')).toBe(false);
});


test.todo('rotateShip correctly changes ship position');
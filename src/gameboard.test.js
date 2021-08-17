import Gameboard from './scripts/gameboard';
import { Ship } from './scripts/ship'

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

test('isValidPosition correctly identifies invalid position due to overlapping ships', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, 4);
  expect(gameboard.isValidPosition(31, 3, 'horizontal')).toBe(false);
});

test('isValidPosition correctly identifies valid position on board with multiple ships', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, 4);
  gameboard.placeShip(56, 3);
  gameboard.placeShip(71, 3);
  expect(gameboard.isValidPosition(25, 5, 'horizontal')).toBe(true);
});

// test('shipsRemaining returns > 0 when not all ships are sunk', () => {
//   const gameboard = Gameboard();
//   gameboard.placeShip(0, 4);
//   expect(gameboard.shipsRemaining()).toBe(1);
// });


// test('rotateShip correctly changes ship position', () => {
//   const gameboard = Gameboard();
//   gameboard.placeShip(22, 4);
//   gameboard.rotateShip()
//   expect(gameboard.getCurrentShips()).toEqual([{name: 'battleship', position: [22, 32, 42, 52], sunk: false}]);
// });
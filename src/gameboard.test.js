import Gameboard from './scripts/gameboard.js';
import { Ship } from './scripts/ship.js'

test('missedAttacks returns empty array before any attacks are made', () => {
  expect(Gameboard().getMissedAttacks()).toEqual([]);
});

test('getCurrentShips returns empty array before any ships are positioned', () => {
  expect(Gameboard().getCurrentShips()).toEqual([]);
});

test('placeShip successfully adds ship in designated location', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(0, 4);
  expect(gameboard.getCurrentShips()[0].position).toEqual([0, 10, 20, 30]);
});

test('placeShip throws error for invalid ship placement location', () => {
  const gameboard = Gameboard();
  expect(() => (gameboard.placeShip(97, 4))).toThrow('Error: invalid ship position');
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


test('rotateShip correctly rotates ship horizontally about the origin coordinate', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, 4);
  gameboard.rotateShip(gameboard.getCurrentShips()[0]);
  expect(gameboard.getCurrentShips()[0].position).toEqual([22, 23, 24, 25]);
});

test('rotateShip correctly rotates ship vertically about the origin coordinate', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, 4);
  gameboard.placeShip(51, 3);
  gameboard.rotateShip(gameboard.getCurrentShips()[0]);
  gameboard.rotateShip(gameboard.getCurrentShips()[0]);
  expect(gameboard.getCurrentShips()[0].position).toEqual([22, 32, 42, 52]);
});

test('rotateShip throws error where ship rotation causes ship overlap', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, 4);
  gameboard.placeShip(14, 5);
  expect(() => (gameboard.rotateShip(gameboard.getCurrentShips()[0]))).toThrow('Error: invalid rotation');
});

test('rotateShip throws error where ship rotation causes ship to pass outside game grid', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(29, 4);
  expect(() => (gameboard.rotateShip(gameboard.getCurrentShips()[0]))).toThrow('Error: invalid rotation');
});
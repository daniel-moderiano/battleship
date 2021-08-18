import { Gameboard } from './scripts/gameboard.js';
import { Ship } from './scripts/ship.js'

test('missedAttacks returns empty array before any attacks are made', () => {
  expect(Gameboard().getMissedAttacks()).toEqual([]);
});

test('getCurrentShips returns empty array before any ships are positioned', () => {
  expect(Gameboard().getCurrentShips()).toEqual([]);
});

test('placeShip successfully adds ship in designated location', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(0, Ship(4));
  expect(gameboard.getCurrentShips()[0].position).toEqual([0, 10, 20, 30]);
});

test('placeShip throws error for invalid ship placement location', () => {
  const gameboard = Gameboard();
  expect(() => (gameboard.placeShip(97, Ship(4)))).toThrow('Error: invalid ship position');
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
  gameboard.placeShip(22, Ship(4));
  expect(gameboard.isValidPosition(31, 3, 'horizontal')).toBe(false);
});

test('isValidPosition correctly identifies valid position on board with multiple ships', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.placeShip(56, Ship(3));
  gameboard.placeShip(71, Ship(3));
  expect(gameboard.isValidPosition(25, 5, 'horizontal')).toBe(true);
});

test('rotateShip correctly rotates ship horizontally about the origin coordinate', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.rotateShip(gameboard.getCurrentShips()[0]);
  expect(gameboard.getCurrentShips()[0].position).toEqual([22, 23, 24, 25]);
});

test('rotateShip correctly rotates ship vertically about the origin coordinate', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.placeShip(51, Ship(3));
  gameboard.rotateShip(gameboard.getCurrentShips()[0]);
  gameboard.rotateShip(gameboard.getCurrentShips()[0]);
  expect(gameboard.getCurrentShips()[0].position).toEqual([22, 32, 42, 52]);
});

test('rotateShip throws error where ship rotation causes ship overlap', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.placeShip(14, Ship(5));
  expect(() => (gameboard.rotateShip(gameboard.getCurrentShips()[0]))).toThrow('Error: invalid rotation');
});

test('rotateShip throws error where ship rotation causes ship to pass outside game grid', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(29, Ship(4));
  expect(() => (gameboard.rotateShip(gameboard.getCurrentShips()[0]))).toThrow('Error: invalid rotation');
});

test('receiveAttack successfully hits ship', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.receiveAttack(32)
  expect(gameboard.getCurrentShips()[0].hits).toEqual([32]);
});

test('receiveAttack records missed shot', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.receiveAttack(80)
  expect(gameboard.getMissedAttacks()).toEqual([80]);
});

test('receiveAttack does not include hits in missed attacks array', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.receiveAttack(32)
  expect(gameboard.getMissedAttacks()).toEqual([]);
});

test('receiveAttack includes hits and misses both into allAttacked array', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.receiveAttack(32);
  gameboard.receiveAttack(80);
  expect(gameboard.getAllAttackedCoordinates()).toEqual([32, 80]);
});

test('receiveAttack throws error if tying to hit duplicate coordinate', () => {
  const gameboard = Gameboard();
  gameboard.receiveAttack(32);
  expect(() => (gameboard.receiveAttack(32))).toThrow('Error: coordinate already attacked');
});

test('remainingShips reports a non-zero value when there are ships still afloat', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(4));
  gameboard.receiveAttack(22);
  gameboard.receiveAttack(32);
  gameboard.receiveAttack(42);
  expect(gameboard.remainingShips()).toBe(1);
});

test('remainingShips reports a zero when all ships are sunk', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(22, Ship(3));
  gameboard.receiveAttack(22);
  gameboard.receiveAttack(32);
  gameboard.receiveAttack(42);
  gameboard.placeShip(82, Ship(2));
  gameboard.receiveAttack(82);
  gameboard.receiveAttack(92);
  expect(gameboard.remainingShips()).toBe(0);
});
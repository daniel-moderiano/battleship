import { Player } from "./scripts/player.js";

test('Player function creates player objects', () => {
  expect(Player('John').name).toEqual('John');
});

test('Player creates gameboard objects successfully', () => {
  expect(Player('John').board.getMissedAttacks()).toEqual([]);
});

test('Player can successfully attack empty enemy board', () => {
  const comp = Player('PC');
  const human = Player('John');
  human.attack(comp.board, 32);
  expect(comp.board.getMissedAttacks()).toEqual([32]);
});

test('Player can successfully attack ship on enemy board', () => {
  const comp = Player('PC');
  const human = Player('John');
  comp.board.placeShip(22, 4);
  human.attack(comp.board, 22);
  human.attack(comp.board, 17);
  human.attack(comp.board, 64);
  human.attack(comp.board, 52);
  expect(comp.board.getMissedAttacks()).toEqual([17, 64]);
});

test('Player can successfully sink ship on enemy board', () => {
  const comp = Player('PC');
  const human = Player('John');
  comp.board.placeShip(22, 4);
  human.attack(comp.board, 22);
  human.attack(comp.board, 32);
  human.attack(comp.board, 42);
  human.attack(comp.board, 52);
  expect(comp.board.remainingShips()).toBe(0);
});
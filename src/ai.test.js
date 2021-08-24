import { calculateValidCells } from './scripts/ai.js';

test('Identifies correct adjacent cells on corner cell input', () => {
  expect(calculateValidCells(0)).toEqual([1, 10]);
});

test('Identifies correct adjacent cells on corner cell input', () => {
  expect(calculateValidCells(99)).toEqual([98, 89]);
});

test('Identifies correct adjacent cells on middle edge cell input', () => {
  expect(calculateValidCells(49)).toEqual([48, 39, 59]);
});

test('Identifies correct adjacent cells on middle edge cell input', () => {
  expect(calculateValidCells(5)).toEqual([4, 6, 15]);
});

test('Identifies correct adjacent cells on middle cell input', () => {
  expect(calculateValidCells(22)).toEqual([21, 23, 12, 32]);
});
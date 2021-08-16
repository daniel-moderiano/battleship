import { createShip } from './index.js';

test('createShip returns ship object correct length property', () => {
  expect(createShip(5).length).toEqual(5);
});


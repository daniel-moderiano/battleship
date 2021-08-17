function createShip(length) {
  if (length < 2 || length > 5) {
    throw new Error('Invalid ship length, must be between 2 and 5 inclusive');
  }

  const hits = [];

  // Fill this array with position occupied by ship. Can compare with hits later on
  const position = [];

  const hit = (cell) => {
    hits.push(cell);
  };

  const isSunk = () => hits.length === length;

  return { length, hit, isSunk };
}

export default createShip;

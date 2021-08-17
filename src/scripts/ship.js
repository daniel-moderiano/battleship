function shipNameFromLength(length) {
  let shipName;
  switch (length) {
    case 2:
      shipName = 'destroyer';
      break;
    case 3:
      shipName = 'destroyer';
      break;
    case 4:
      shipName = 'destroyer';
      break;
    case 5:
      shipName = 'destroyer';
      break;
    return shipName;
  }
}

function Ship(length) {
  if (length < 2 || length > 5) {
    throw new Error('Invalid ship length, must be between 2 and 5 inclusive');
  }

  const name = shipNameFromLength(length);

  const orientation = 'vertical';

  const position = [];

  const setPosition = (originCoordinate, shipOrientation) => {
    position[0] = originCoordinate;

    if (shipOrientation === 'vertical') {
      for (let i = 1; i < length; i++) {
        position[i] = position[i - 1] + 10;
      }
    } else {
      for (let j = 1; j < length; j++) {
        position[j] = position[j - 1] + 1;
      }
    }
  };

  const hits = [];

  // Fill this array with position occupied by ship. Can compare with hits later on
  // const position = [];

  const hit = (coordinate) => {
    hits.push(coordinate);
  };

  const isSunk = () => hits.length === length;

  return { name, length, orientation, hit, isSunk, setPosition, position };
}

export default Ship;

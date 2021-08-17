function shipNameFromLength(length) {
  let shipName;
  switch (length) {
    case 2:
      shipName = 'destroyer';
      break;
    case 3:
      shipName = 'cruiser';
      break;
    case 4:
      shipName = 'battleship';
      break;
    case 5:
      shipName = 'carrier';
      break;
    default:
      break;
  }
  return shipName;
}

const calculateShipPosition = (originCoordinate, shipLength, shipOrientation) => {
  const position = [];
  position[0] = originCoordinate;

  if (shipOrientation === 'vertical') {
    for (let i = 1; i < shipLength; i++) {
      position[i] = position[i - 1] + 10;
    }
  } else {
    for (let j = 1; j < shipLength; j++) {
      position[j] = position[j - 1] + 1;
    }
  }
  return position;
};

function Ship(length) {
  if (length < 2 || length > 5) {
    throw new Error('Invalid ship length, must be between 2 and 5 inclusive');
  }

  const name = shipNameFromLength(length);

  const orientation = 'vertical';

  const position = [];

  const setPosition = (originCoordinate, shipOrientation) => {
    position.length = 0;
    calculateShipPosition(originCoordinate, length, shipOrientation).forEach((coordinate) => {
      position.push(coordinate);
    });
  };

  const hits = [];

  const hit = (coordinate) => {
    hits.push(coordinate);
  };

  const isSunk = () => hits.length === length;

  return {
    name,
    length,
    orientation,
    hit,
    isSunk,
    setPosition,
    position,
    hits,
  };
}

export { calculateShipPosition, Ship };

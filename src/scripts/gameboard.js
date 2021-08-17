import Ship from './ship';

function Gameboard() {
  const missedAttacks = [];
  const currentShips = [];

  const getMissedAttacks = () => missedAttacks;
  const getCurrentShips = () => currentShips;

  const isValidPosition = (originCoordinate, shipLength, shipOrientation) => {
    let shipEdge;
    if (shipOrientation === 'horizontal') {
      shipEdge = originCoordinate + shipLength - 1;
    } else {
      shipEdge = originCoordinate + ((shipLength - 1) * 10);
    }

    if (shipEdge >= 100 || (shipEdge % 10) < (originCoordinate % 10)) {
      return false;
    }

    return true;
  };

  const placeShip = (originCoordinate, length) => {
    const newShip = Ship(length);
    newShip.setPosition(originCoordinate, newShip.orientation);
    currentShips.push({ name: newShip.name, position: newShip.position, sunk: false });
  };

  return { getMissedAttacks, getCurrentShips, placeShip, isValidPosition };
}

export default Gameboard;

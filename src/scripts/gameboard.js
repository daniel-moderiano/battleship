import { Ship, calculateShipPosition } from './ship.js';

function Gameboard() {
  const missedAttacks = [];
  const currentShips = [];
  const allAttackedCoordinates = [];

  const getMissedAttacks = () => missedAttacks;
  const getCurrentShips = () => currentShips;
  const getAllAttackedCoordinates = () => allAttackedCoordinates;

  const isValidPosition = (originCoordinate, shipLength, shipOrientation) => {
    const shipPosition = calculateShipPosition(originCoordinate, shipLength, shipOrientation);

    // This comparison determines whether the ship exceeds the edge of the board
    if (shipPosition[shipLength - 1] >= 100 || (shipPosition[shipLength - 1] % 10) < (originCoordinate % 10)) {
      return false;
    }

    // This comparison determines whether there is any ship overlap
    const currentPositions = [];
    getCurrentShips().forEach((ship) => {
      currentPositions.push(ship.position);
    });

    // Compare all the current occupied positions with the expected positions of the ship to be placed
    if (currentPositions.flat().some((position) => shipPosition.slice(1).includes(position))) {
      return false;
    }

    return true;
  };

  const placeShip = (originCoordinate, length) => {
    // New ships by default will onyl be placeable vertically, then can be optionally rotated
    if (!isValidPosition(originCoordinate, length, 'vertical')) {
      throw new Error('Error: invalid ship position');
    }
    const newShip = Ship(length);
    newShip.setPosition(originCoordinate, newShip.orientation);
    currentShips.push(newShip);
  };

  const rotateShip = (ship) => {
    if (ship.orientation === 'vertical') {
      if (!isValidPosition(ship.position[0], ship.length, 'horizontal')) {
        throw new Error('Error: invalid rotation');
      } else {
        ship.setPosition(ship.position[0], 'horizontal');
        ship.orientation = 'horizontal';
        return;
      }
    }

    if (!isValidPosition(ship.position[0], ship.length, 'vertical')) {
      throw new Error('Error: invalid rotation');
    } else {
      ship.setPosition(ship.position[0], 'vertical');
      ship.orientation = 'horizontal';
    }
  };

  const receiveAttack = (coordinate) => {
    if (allAttackedCoordinates.includes(coordinate)) {
      throw new Error('Error: coordinate already attacked');
    }
    const ships = getCurrentShips();
    for (let i = 0; i < currentShips.length; i++) {
      if (ships[i].position.includes(coordinate)) {
        ships[i].hit(coordinate);
        allAttackedCoordinates.push(coordinate);
        return true;
      }
    }
    allAttackedCoordinates.push(coordinate);
    missedAttacks.push(coordinate);
  };

  const remainingShips = () => {
    let numberOfShipsRemaining = 0;
    getCurrentShips().forEach((ship) => {
      if (!ship.isSunk()) {
        numberOfShipsRemaining += 1;
      }
    });
    return numberOfShipsRemaining;
  };

  return {
    getMissedAttacks,
    getCurrentShips,
    placeShip,
    isValidPosition,
    rotateShip,
    receiveAttack,
    remainingShips,
    getAllAttackedCoordinates,
  };
}

export default Gameboard;

import { calculateShipPosition } from './ship';

function Gameboard() {
  const allCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
  const missedAttacks = [];
  const currentShips = [];
  const allAttackedCoordinates = [];

  const getRemainingFreeCells = () => allCells.filter((cell) => !allAttackedCoordinates.includes(cell));
  const getMissedAttacks = () => missedAttacks;
  const getCurrentShips = () => currentShips;
  const getAllAttackedCoordinates = () => allAttackedCoordinates;

  const isValidPosition = (originCoordinate, shipLength, shipOrientation, rotating = false) => {
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

    // Compare all the current occupied positions with the expected positions of the ship to be placed. If rotating a ship, exclude the origin coordinate overlap when checking position (slice(1) vs slice(0))
    if (rotating) {
      if (currentPositions.flat().some((position) => shipPosition.slice(1).includes(position))) {
        return false;
      }
    } else {
      if (currentPositions.flat().some((position) => shipPosition.slice(0).includes(position))) {
        return false;
      }
    }
    return true;
  };

  const placeShip = (originCoordinate, ship) => {
    if (!isValidPosition(originCoordinate, ship.length, ship.orientation)) {
      throw new Error('Error: invalid ship position');
    }
    // If the ship already exists on the board, then this must be a move only operation. Don't push to currentShips
    if (!currentShips.some((ships) => ships === ship)) {
      currentShips.push(ship);
    }
    ship.setPosition(originCoordinate, ship.orientation);
  };

  const rotateShip = (ship) => {
    if (ship.orientation === 'vertical') {
      if (!isValidPosition(ship.position[0], ship.length, 'horizontal', true)) {
        throw new Error('Error: invalid rotation');
      } else {
        ship.setPosition(ship.position[0], 'horizontal');
        ship.orientation = 'horizontal';
        return;
      }
    }

    if (!isValidPosition(ship.position[0], ship.length, 'vertical', true)) {
      throw new Error('Error: invalid rotation');
    } else {
      ship.setPosition(ship.position[0], 'vertical');
      ship.orientation = 'vertical';
    }
  };

  // TODO: currently receiveAttack returns the ship that was hit in the form of an array. This is not appropriate really, and should somehow be abstracted to a different function.
  const receiveAttack = (coordinate) => {
    if (allAttackedCoordinates.includes(coordinate)) {
      throw new Error('Error: coordinate already attacked');
    }

    const attackResult = [];

    const ships = getCurrentShips();
    for (let i = 0; i < currentShips.length; i++) {
      if (ships[i].position.includes(coordinate)) {
        ships[i].hit(coordinate);
        attackResult.push(ships[i]);
        allAttackedCoordinates.push(coordinate);
        return attackResult;
      }
    }
    allAttackedCoordinates.push(coordinate);
    missedAttacks.push(coordinate);
    return attackResult;
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

  const resetBoard = () => {
    missedAttacks.length = 0;
    currentShips.length = 0;
    allAttackedCoordinates.length = 0;
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
    getRemainingFreeCells,
    resetBoard,
  };
}

export { Gameboard };

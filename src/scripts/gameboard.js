import { Ship, calculateShipPosition } from './ship';

function Gameboard() {
  const missedAttacks = [];
  const currentShips = [];

  const getMissedAttacks = () => missedAttacks;
  const getCurrentShips = () => currentShips;

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

    if (currentPositions.flat().some((position) => shipPosition.includes(position))) {
      return false;
    }

    return true;
  };

  const placeShip = (originCoordinate, length) => {
    const newShip = Ship(length);
    newShip.setPosition(originCoordinate, newShip.orientation);
    currentShips.push({ name: newShip.name, position: newShip.position, sunk: false });
  };

  return {
    getMissedAttacks,
    getCurrentShips,
    placeShip,
    isValidPosition,
  };
}

export default Gameboard;

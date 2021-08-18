import Gameboard from './gameboard.js'
import { calculateShipPosition, Ship } from './ship.js'

function Player(name) {
  const board = Gameboard();

  // const getBoard = () => board;

  function createFleet() {
    const carrier = Ship(5);
    const battleship = Ship(4);
    const cruiser = Ship(3);
    const submarine = Ship(3);
    const destroyer = Ship(2);
    return [carrier, battleship, cruiser, submarine, destroyer];
  }

  const ships = createFleet();

  const attack = (enemyBoard, coordinate) => {
    enemyBoard.receiveAttack(coordinate);
  };

  return { name, board, attack, ships };
}

export { Player };
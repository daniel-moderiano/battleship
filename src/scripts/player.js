/* eslint-disable radix */
import { Gameboard } from './gameboard';
import { Ship } from './ship';

function Player(name) {
  const board = Gameboard();

  let DOMBoard;

  const allocateDOMBoard = (element) => {
    DOMBoard = element;
  };

  const getDOMBoard = () => DOMBoard;

  const activateDOMBoard = () => {
    DOMBoard.classList.add('board__table--active');
  };

  const deactivateDOMBoard = () => {
    DOMBoard.classList.remove('board__table--active');
  };

  // Creates a set number of specified ships following original Battleship specs
  function createFleet() {
    const carrier = Ship(5);
    const battleship = Ship(4);
    const cruiser = Ship(3);
    const submarine = Ship(3);
    const destroyer = Ship(2);
    return [carrier, battleship, cruiser, submarine, destroyer];
  }

  const ships = createFleet();

  function resetAllShips() {
    ships.forEach((ship) => {
      ship.resetShip();
    });
  }

  const attack = (enemyBoard, coordinate) => {
    enemyBoard.receiveAttack(coordinate);
  };

  const allShipsPlaced = () => {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].position.length === 0) {
        return false;
      }
    }
    return true;
  };

  // Dynamically allocate name based on click-to-edit player names on UI
  const getName = () => document.querySelector('.name-one').textContent;

  return {
    name,
    board,
    attack,
    ships,
    allocateDOMBoard,
    getDOMBoard,
    activateDOMBoard,
    deactivateDOMBoard,
    resetAllShips,
    allShipsPlaced,
    getName,
  };
}

export { Player };

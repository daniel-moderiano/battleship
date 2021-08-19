/* eslint-disable radix */
import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';
import { Game } from './game.js';

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

  return { name, board, attack, ships, allocateDOMBoard, getDOMBoard, activateDOMBoard, deactivateDOMBoard };
}

export { Player };
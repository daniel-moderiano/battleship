import Gameboard from './gameboard.js'

function Player(name) {
  const board = Gameboard();

  // const getBoard = () => board;

  const attack = (enemyBoard, coordinate) => {
    enemyBoard.receiveAttack(coordinate);
  };

  return { name, board, attack };
}

export { Player };
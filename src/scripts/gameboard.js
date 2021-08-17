import Ship from './ship';

function Gameboard() {
  const missedAttacks = [];
  const currentShips = [];

  const getMissedAttacks = () => missedAttacks;
  const getCurrentShips = () => currentShips;

  const placeShip = (shipType, originCoordinate) => {
    const newShip = Ship(3);
    newShip.setPosition(originCoordinate, newShip.orientation);
    currentShips.push({name: shipType, position: newShip.position});
  };

  return { getMissedAttacks, getCurrentShips, placeShip };
}



export default Gameboard;
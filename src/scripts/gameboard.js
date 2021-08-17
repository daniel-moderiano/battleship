function Gameboard() {

  const missedAttacks = [];

  const currentShips = [];

  const getMissedAttacks = () => missedAttacks;

  const getCurrentShips = () => currentShips;

  return { getMissedAttacks, getCurrentShips };
}



export default Gameboard;
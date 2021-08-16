function createShip(length) {
  return {
    length,
    hit() {
      // hit a particular point on the ship
    },
    isSunk() {
      // determine if the ship is sunk
    },
  };
}

export { createShip };

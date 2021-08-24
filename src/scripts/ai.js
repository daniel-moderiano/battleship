function createCellArr() {
  const allCells = [];
  for (let i = 0; i < 10; i++) {
    const inner = [];
    for (let j = 0; j < 10; j++) {
      inner.push(j + (i * 10));
    }
    allCells.push(inner);
  }
  return allCells;
}

const topMiddleCells = [1, 2, 3, 4, 5, 6, 7, 8];
const bottomMiddleCells = [91, 92, 93, 94, 95, 96, 97, 98];
const rightMiddleCells = [19, 29, 39, 49, 59, 69, 79, 89]; 
const leftMiddleCells = [10, 20, 30, 40, 50, 60, 70, 80]; 
const topLeftCell = 0;
const topRightCell = 9;
const bottomLeftCell = 90;
const bottomRightCell = 99;

const attackedCells = [2, 4, 6, 12, 16, 17, 18];

// Using a reference cell, this function returns an array of all valid cells that may contain another leg of the ship. Note this does not take into account if any adjacent cells are hit
function calculateValidCells(cell) {
  let validCells = [];
  switch (true) {
    case cell === 0:
      validCells = [cell + 1, cell + 10];
      break;
    case cell === 9:
      validCells = [cell - 1, cell + 10];
      break;
    case cell === 90:
      validCells = [cell + 1, cell - 10];
      break;
    case cell === 99:
      validCells = [cell - 1, cell - 10];
      break;
    case leftMiddleCells.includes(cell):
      validCells = [cell + 1, cell - 10, cell + 10];
      break;
    case rightMiddleCells.includes(cell):
      validCells = [cell - 1, cell - 10, cell + 10];
      break;
    case topMiddleCells.includes(cell):
      validCells = [cell - 1, cell + 1, cell + 10];
      break;
    case bottomMiddleCells.includes(cell):
      validCells = [cell - 1, cell + 1, cell - 10];
      break;
    default:
      validCells = [cell - 1, cell + 1, cell - 10, cell + 10]
      break;
  }
  return validCells;
}

const allCells = createCellArr();

// Use array.filter on the array returns from calculateValidCells to remove any cells that are currently marked as a hit
function filterAttackedCells(validCells) {
  return validCells.filter((cell) => !attackedCells.includes(cell));
} 


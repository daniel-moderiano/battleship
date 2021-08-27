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

const arr100 = 
[[0,  1,  2,  3,  4,  5,  6,  7,  8,  9],
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
[20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
[30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
[40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
[50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
[60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
[70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
[80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
[90, 91, 92, 93, 94, 95, 96, 97, 98, 99]];

const topMiddleCells = [1, 2, 3, 4, 5, 6, 7, 8];
const bottomMiddleCells = [91, 92, 93, 94, 95, 96, 97, 98];
const rightMiddleCells = [19, 29, 39, 49, 59, 69, 79, 89]; 
const leftMiddleCells = [10, 20, 30, 40, 50, 60, 70, 80]; 


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
      validCells = [cell - 1, cell + 1, cell - 10, cell + 10];
      break;
  }
  return validCells;
}

// Use array.filter on the array returns from calculateValidCells to remove any cells that are currently marked as a hit
function filterAttackedCells(validCells, attackedCells) {
  return validCells.filter((cell) => !attackedCells.includes(cell));
}

// TODO: AI choice is undefined when choosing a cell that has all adjacent cells already hit

export { calculateValidCells, filterAttackedCells };

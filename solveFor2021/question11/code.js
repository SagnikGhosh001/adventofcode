const input = Deno.readTextFileSync("./solveFor2021/question11/input.txt");
const dbg = (x) => console.log(x) || x;
let flashes = 0;
const parseInput = () =>
  input.split("\n").map((ele) => [...ele].map((x) => parseInt(x)));

const DIRECTIONS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
  upRight: [-1, 1],
  upLeft: [-1, -1],
  downLeft: [1, -1],
  downRight: [1, 1],
};

const deepIncludes = (array, element) =>
  array.some((ele) => ele[0] === element[0] && ele[1] === element[1]);

const isInBoundary = (row, col, grid) =>
  row >= 0 && col >= 0 && row < grid.length && col < grid[row].length;

const isEveryElementZero = (grid) =>
  grid.every((row) => row.every((ele) => ele === 0));

const flash = (row, col, grid, blasted = []) => {
  flashes++;
  grid[row][col] = 0;
  for (const key in DIRECTIONS) {
    const currentDirection = DIRECTIONS[key];
    const rowToCheck = row + currentDirection[0];
    const colToCheck = col + currentDirection[1];
    if (
      !deepIncludes(blasted, [rowToCheck, colToCheck]) &&
      isInBoundary(rowToCheck, colToCheck, grid)
    ) {
      grid[rowToCheck][colToCheck] += 1;
      if (grid[rowToCheck][colToCheck] === 10) {
        blasted.push([rowToCheck, colToCheck]);
        flash(rowToCheck, colToCheck, grid, blasted);
      }
    }
  }
};

const increaseEnergyLevel = (grid) => {
  const blasted = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      if (!deepIncludes(blasted, [row, col])) {
        grid[row][col] += 1;
        if (grid[row][col] === 10) {
          blasted.push([row, col]);
          flash(row, col, grid, blasted);
        }
      }
    }
  }
};

const main = () => {
  const grid = parseInput();
  let term = 1;
  while (true) {
    increaseEnergyLevel(grid);
    if (isEveryElementZero(grid)) {
      break;
    }
    term++;
  }
  console.log(term);

  // console.log(grid);
  // console.log(flashes);
};

main();

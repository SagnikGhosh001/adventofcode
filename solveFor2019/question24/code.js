import { deep_equals } from "@ordo-pink/deep-equals";

const input = Deno.readTextFileSync("solveFor2019/question24/input.txt");

const parseInput = () => input.split("\n").map((row) => [...row]);

const allGrids = [];

const getCoordinates = (grid) => {
  const cords = [];

  grid.forEach((rows, r) => {
    rows.forEach((col, c) => {
      if (col === "#") {
        cords.push([r, c]);
      }
    });
  });

  return cords;
};

const calculateBioDiversity = (grid) => {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "#") {
        count += Math.pow(2, grid.length * row + col);
      }
    }
  }

  console.log(count);
  prompt("");
};

const adjacents = (grid, row, col) => {
  const adj = [];
  if (row > 0) adj.push([row - 1, col]);
  if (row < grid.length - 1) adj.push([row + 1, col]);
  if (col < grid[row].length - 1) adj.push([row, col + 1]);
  if (col > 0) adj.push([row, col - 1]);

  return adj;
};

const countAdjacent = (grid, row, col) => {
  let count = 0;

  for (const adj of adjacents(grid, row, col)) {
    if (grid[adj[0]][adj[1]] === "#") count++;
  }

  return count;
};

const checkIfReappear = (newGrid) => {
  const gridString = newGrid.map((row) => row.join("")).join("\n");

  for (const previousGrid of allGrids) {
    if (previousGrid === gridString) {
      return true;
    }
  }

  return false;
};

const changeGird = (grid) => {
  const newGrid = [];

  for (let row = 0; row < grid.length; row++) {
    newGrid.push([]);
    for (let col = 0; col < grid[row].length; col++) {
      const countOfAdjacentBugs = countAdjacent(grid, row, col);

      if (grid[row][col] === "#") {
        const pushedElement = (countOfAdjacentBugs === 1) ? "#" : ".";
        newGrid[row].push(pushedElement);
      } else {
        const pushedElement =
          (countOfAdjacentBugs === 1 || countOfAdjacentBugs === 2) ? "#" : ".";
        newGrid[row].push(pushedElement);
      }
    }
  }

  const gridString = newGrid.map((r) => r.join("")).join("\n");

  if (checkIfReappear(newGrid)) {
    console.log(newGrid.map((r) => r.join("")).join("\n"));
    calculateBioDiversity(newGrid);
    return;
  }

  allGrids.push(gridString);
  return changeGird(newGrid);
};

const main = () => {
  const grid = parseInput();
  console.log(grid.map((r) => r.join("")).join("\n"), "\n");
  // const insectCords = getCoordinates(grid);
  const gridString = grid.map((r) => r.join("")).join("\n");
  allGrids.push(gridString);
  changeGird(grid);
};

main();

const input = Deno.readTextFileSync("solveFor2019/question24/input.txt");

const parseInput = () => input.split("\n").map((row) => [...row]);

const allGrids = {};

const blankGrid = () => {
  const grid = [];
  for (let row = 0; row < 5; row++) {
    grid.push([]);
    for (let col = 0; col < 5; col++) {
      grid[row].push(".");
    }
  }

  return grid;
};

const countBugs = () => {
  let count = 0;

  for (let index = -100; index < 101; index++) {
    const grid = allGrids[index];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        if (grid[row][col] === "#") count++;
      }
    }
  }

  return count;
};

const printAllGrid = () => {
  for (let index = -100; index < 101; index++) {
    console.log(index);

    console.log(allGrids[index].map((r) => r.join("")).join("\n"), "\n");
  }
};

const adjacents = (row, col, depth) => {
  const adj = [];
  if (col === 0) adj.push([2, 1, depth - 1]);
  if (col === 4) adj.push([2, 3, depth - 1]);
  if (row === 0) adj.push([1, 2, depth - 1]);
  if (row === 4) adj.push([3, 2, depth - 1]);

  if (row > 0 && !(row - 1 === 2 && col === 2)) adj.push([row - 1, col, depth]);
  if (row < 4 && !(row + 1 === 2 && col === 2)) adj.push([row + 1, col, depth]);
  if (col > 0 && !(row === 2 && col - 1 === 2)) adj.push([row, col - 1, depth]);
  if (col < 4 && !(row === 2 && col + 1 === 2)) adj.push([row, col + 1, depth]);
  if (row === 1 && col === 2) {
    for (let c = 0; c < 5; c++) adj.push([0, c, depth + 1]);
  }
  if (row === 3 && col === 2) {
    for (let c = 0; c < 5; c++) adj.push([4, c, depth + 1]);
  }
  if (row === 2 && col === 1) {
    for (let r = 0; r < 5; r++) adj.push([r, 0, depth + 1]);
  }
  if (row === 2 && col === 3) {
    for (let r = 0; r < 5; r++) adj.push([r, 4, depth + 1]);
  }

  return adj;
};

const countAdjacent = (row, col, depth) => {
  let count = 0;

  for (const adj of adjacents(row, col, depth)) {
    // console.log(Object.keys(allGrids));
    // console.log(adj, row, col);
    if (!allGrids[adj[2]]) allGrids[adj[2]] = blankGrid();
    if (allGrids[adj[2]][adj[0]][adj[1]] === "#") count++;
  }

  return count;
};

const changeGird = (minutes) => {
  for (let m = 0; m < minutes; m++) {
    const newGrids = {};
    const depths = Object.keys(allGrids).map(Number);

    const minDepth = Math.min(...depths) - 1;
    const maxDepth = Math.max(...depths) + 1;

    if (!allGrids[minDepth]) allGrids[minDepth] = blankGrid();
    if (!allGrids[maxDepth]) allGrids[maxDepth] = blankGrid();

    for (let depth = minDepth; depth <= maxDepth; depth++) {
      const newGrid = [];
      const grid = allGrids[depth];

      for (let row = 0; row < grid.length; row++) {
        newGrid.push([]);
        for (let col = 0; col < grid[row].length; col++) {
          if (row === 2 && col === 2) {
            newGrid[row].push(".");
            continue;
          }

          const countOfAdjacentBugs = countAdjacent(row, col, depth);

          if (grid[row][col] === "#") {
            const pushedElement = (countOfAdjacentBugs === 1) ? "#" : ".";
            newGrid[row].push(pushedElement);
          } else {
            const pushedElement =
              (countOfAdjacentBugs === 1 || countOfAdjacentBugs === 2)
                ? "#"
                : ".";
            newGrid[row].push(pushedElement);
          }
        }
      }

      newGrids[depth] = newGrid;
    }

    Object.assign(allGrids, newGrids);
  }

  const count = countBugs();
  printAllGrid();
  console.log(count);
};

const main = () => {
  const grid = parseInput();
  // console.log(grid.map((r) => r.join("")).join("\n"), "\n");
  allGrids[0] = [...grid.map((r) => [...r])];
  changeGird(200);
};

main();

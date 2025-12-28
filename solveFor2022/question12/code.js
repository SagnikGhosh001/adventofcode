const input = Deno.readTextFileSync("./solveFor2022/question12/input.txt");

const parseInput = () => input.split("\n").map((row) => [...row]);

const getLoc = (grid, char) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === char) return [row, col];
    }
  }
};

const getAllALoc = (grid) => {
  const coords = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "a") coords.push([row, col]);
    }
  }

  return coords;
};

const adjacents = (x, y, grid) => {
  const adj = [];
  if (x > 0) adj.push([x - 1, y]);
  if (x < grid.length - 1) adj.push([x + 1, y]);
  if (y > 0) adj.push([x, y - 1]);
  if (y < grid[x].length - 1) adj.push([x, y + 1]);

  return adj;
};

const traverse = (grid, endLoc, visited, queue) => {
  while (queue.length !== 0) {
    const [x, y, step] = queue.shift();

    if (x === endLoc[0] && y === endLoc[1]) return step;

    for (const adj of adjacents(x, y, grid)) {
      const [nx, ny] = adj;
      const key = `${nx},${ny}`;
      const currentHeight = grid[x][y].charCodeAt();
      const nextHeight = grid[nx][ny].charCodeAt();

      if (!visited.has(key) && nextHeight <= currentHeight + 1) {
        queue.push([nx, ny, step + 1]);
        visited.add(key);
      }
    }
  }

  return Infinity;
};

const part1 = () => {
  const grid = parseInput();

  const startLoc = getLoc(grid, "S");
  grid[startLoc[0]][startLoc[1]] = "a";
  const endLoc = getLoc(grid, "E");
  grid[endLoc[0]][endLoc[1]] = "z";

  const visited = new Set();
  visited.add(`${startLoc[0]},${startLoc[1]}`);
  const queue = [[...startLoc, 0]];

  const step = traverse(grid, endLoc, visited, queue);
  console.log(step);
};

const part2 = () => {
  const grid = parseInput();

  const startLocs = getAllALoc(grid);
  const endLoc = getLoc(grid, "E");
  grid[endLoc[0]][endLoc[1]] = "z";
  let minStep = Infinity;

  for (const startLoc of startLocs) {
    const visited = new Set();
    visited.add(`${startLoc[0]},${startLoc[1]}`);
    const queue = [[...startLoc, 0]];

    const step = traverse(grid, endLoc, visited, queue);
    minStep = Math.min(minStep, step);
  }

  console.log(minStep);
};

part2();

const input = Deno.readTextFileSync("./solveFor2022/question8/input.txt");

const parseTrees = () => input.split("\n").map((e) => [...e].map(Number));

const countEdges = (grid) => 2 * (grid.length + grid[0].length) - 4;

const isOnEdge = (grid, x, y) =>
  x === 0 || y === 0 || x === grid.length - 1 || y === grid[0].length - 1;

const adjacents = () => [[1, 0], [-1, 0], [0, 1], [0, -1]];

const hasEdgeFound = (grid, x, y, nextX, nextY, adj) => {
  if (grid[x][y] <= grid[nextX][nextY]) return false;
  if (isOnEdge(grid, nextX, nextY)) return true;

  nextX += adj[0];
  nextY += adj[1];
  return hasEdgeFound(grid, x, y, nextX, nextY, adj);
};

const isVisible = (grid, x, y) => {
  for (const adj of adjacents()) {
    const nextX = x + adj[0];
    const nextY = y + adj[1];

    if (hasEdgeFound(grid, x, y, nextX, nextY, adj)) return true;
  }

  return false;
};

const countVisibleTrees = (grid) => {
  let count = countEdges(grid);
  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      if (isVisible(grid, row, col)) count++;
    }
  }

  return count;
};

const part1 = () => {
  const trees = parseTrees();
  // console.log(trees);

  const treesCount = countVisibleTrees(trees);
  console.log(treesCount);
};

const part2 = () => {
  const trees = parseTrees();
  // console.log(trees);

  const treesCount = countVisibleTrees(trees);
  console.log(treesCount);
};

part2();

const input = Deno.readTextFileSync("./solveFor2021/question15/input.txt");
const dbg = (x) => console.log(x) || x;

const parseInput = () => input.split("\n").map((ele) => [...ele].map(Number));

const adjacentNodes = (x, y, grid) => {
  const values = [];
  if (x > 0) values.push([x - 1, y]);
  if (x < grid.length - 1) values.push([x + 1, y]);
  if (y > 0) values.push([x, y - 1]);
  if (y < grid[0].length - 1) values.push([x, y + 1]);
  return values;
};

const dijekstraShortestPath = (grid) => {
  const row = grid.length;
  const col = grid[0].length;

  const distance = Array.from({ length: row }, () => Array(col).fill(Infinity));
  const minHeap = [{ x: 0, y: 0, cost: 0 }];

  while (minHeap.length) {
    minHeap.sort((a, b) => a.cost - b.cost);
    const { x, y, cost } = minHeap.shift();

    if (x === grid[0].length - 1 && y === grid.length - 1) {
      return cost;
    }

    for (const [nx, ny] of adjacentNodes(x, y, grid)) {
      const newCost = cost + grid[nx][ny];
      if (newCost < distance[nx][ny]) {
        distance[nx][ny] = newCost;
        minHeap.push({ x: nx, y: ny, cost: newCost });
      }
    }
  }
};

const increaseGrid = (grid) => {
  for (const row of grid) {
    const orginalRow = [...row];
    for (let times = 1; times <= 4; times++) {
      for (const col of orginalRow) {
        let increasedValue = col + times;
        if (increasedValue > 9) increasedValue -= 9;
        row.push(increasedValue);
      }
    }
  }

  const copyGrid = [...grid];
  for (let times = 1; times <= 4; times++) {
    for (const row of copyGrid) {
      const newRow = [...row].map((val) => {
        let increasedValue = val + times;
        if (increasedValue > 9) increasedValue -= 9;
        return increasedValue;
      });
      grid.push(newRow);
    }
  }

  return grid;
};

const main = () => {
  let grid = parseInput();
  grid = increaseGrid(grid);
  const cost = dijekstraShortestPath(grid);
  console.log(cost);
};

main();

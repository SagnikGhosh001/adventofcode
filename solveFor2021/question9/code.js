const input = Deno.readTextFileSync("./solveFor2021/question9/input.txt");
const dbg = (x) => console.log(x) || x;

const parseInput = () =>
  input.split("\n").map((row) => [...row].map((x) => +x));

const isInBoundary = (row, col, heightMap) =>
  row >= 0 && col >= 0 && row < heightMap.length && col < heightMap[row].length;

const DIRECTIONS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

const calculateRisk = (heightMap, row, col, lowPoints) => {
  let totalRisk = 0;

  let isLowPoint = true;
  for (const key in DIRECTIONS) {
    const currentDirection = DIRECTIONS[key];
    const rowToCheck = row + currentDirection[0];
    const colToCheck = col + currentDirection[1];

    if (
      isInBoundary(rowToCheck, colToCheck, heightMap) &&
      heightMap[row][col] >= heightMap[rowToCheck][colToCheck] &&
      isLowPoint
    ) {
      isLowPoint = false;
    }
  }

  if (isLowPoint) {
    lowPoints.push([row, col]);
    totalRisk += heightMap[row][col] + 1;
  }
};

const deepIncludes = (array, element) =>
  array.some((ele) => ele[0] === element[0] && ele[1] === element[1]);

const findBasin = (heightMap, row, col, visited = []) => {
  if (!isInBoundary(row, col, heightMap)) return 0;
  if (heightMap[row][col] === 9) return 0;
  if (deepIncludes(visited, [row, col])) return 0;

  let size = 1;
  visited.push([row, col]);

  for (const key in DIRECTIONS) {
    const currentDirection = DIRECTIONS[key];
    const rowToCheck = row + currentDirection[0];
    const colToCheck = col + currentDirection[1];
    size += findBasin(heightMap, rowToCheck, colToCheck, visited);
  }

  return size;
};

const main = () => {
  const heightMap = parseInput();
  const lowPoints = [];

  for (let row = 0; row < heightMap.length; row++) {
    for (let col = 0; col < heightMap[row].length; col++) {
      calculateRisk(heightMap, row, col, lowPoints);
    }
  }

  const basin = [];
  for (const point of lowPoints) {
    const size = findBasin(heightMap, point[0], point[1]);
    basin.push(size);
  }
  const [first, second, third] = basin.sort((a, b) => b - a);
  console.log(lowPoints, first * second * third);
};

main();

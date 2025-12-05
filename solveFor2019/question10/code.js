const input = Deno.readTextFileSync("./solveFor2019/question10/input.txt");
const parsedInput = input.split("\n");

const gcd = (x, y) => {
  let hcf = 1;
  let currentTerm = 1;

  while (currentTerm <= x && currentTerm <= y) {
    const isFirstNumberDivisible = x % currentTerm === 0;
    const isSecondNumberDivisible = y % currentTerm === 0;
    hcf = isFirstNumberDivisible && isSecondNumberDivisible ? currentTerm : hcf;
    currentTerm++;
  }

  hcf = x === 0 ? y : hcf;
  hcf = y === 0 ? x : hcf;

  return hcf;
};

const fetchCoordinates = () => {
  const coordinates = [];

  for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[i].length; j++) {
      if (parsedInput[i][j] === "#") {
        coordinates.push([i, j]);
      }
    }
  }

  return coordinates;
};

const normalize = (x, y) => {
  const hcf = gcd(Math.abs(x), Math.abs(y));
  return [x / hcf, y / hcf];
};

const isElePresent = (array, x, y) =>
  array.some((ele) => ele[0] === x && ele[1] === y);

const countVisibleAsteroid = (curentCoor, curentIndex, coordinates) => {
  const visibleAsteroid = [];

  for (let index = 0; index < coordinates.length; index++) {
    if (index !== curentIndex) {
      const delX = curentCoor[0] - coordinates[index][0];
      const delY = curentCoor[1] - coordinates[index][1];
      const [normalizeX, normalizeY] = normalize(delX, delY);
      if (!isElePresent(visibleAsteroid, normalizeX, normalizeY)) {
        visibleAsteroid.push([normalizeX, normalizeY]);
      }
    }
  }

  return { curentCoor, count: visibleAsteroid.length };
};

const calculateSomething = (station, coordinates) => {
  // console.log(station.curentCoor[0], coordinates);

  const array = [];
  for (let index = 0; index < coordinates.length; index++) {
    if (
      coordinates[index][0] !== station.curentCoor[0] &&
      coordinates[index][1] !== station.curentCoor[1]
    ) {
      const dx = coordinates[index][1] - station.curentCoor[1];
      const dy = coordinates[index][0] - station.curentCoor[0];
      const angle = Math.atan2(dx, -dy);
      const distance = Math.sqrt(dx * dx + dy * dy);

      array.push({
        angle,
        distance,
        x: coordinates[index][1],
        y: coordinates[index][0],
      });
    }
  }
  return array;
};

const main = () => {
  const coordinates = fetchCoordinates();
  const counts = [];
  for (let index = 0; index < coordinates.length; index++) {
    counts.push(countVisibleAsteroid(coordinates[index], index, coordinates));
  }

  const station = counts.sort((a, b) => b.count - a.count)[0];
  const hits = calculateSomething(station, coordinates);
  console.log(
    hits.sort((a, b) => {
      if (a.angle !== b.angle) return a.angle - b.angle;
      return a.distance - b.distance;
    })[200    ],
  );
};

main();

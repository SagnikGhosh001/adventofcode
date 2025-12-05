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
      let angle = Math.atan2(dx, -dy);
      if (angle < 0) angle += 2 * Math.PI;
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
  const object = {};

  for (const element of hits) {
    if (!(element.angle in object)) object[element.angle] = [];
    object[element.angle].push(element);
  }

  for (const angle in object) {
    object[angle].sort((a, b) => a.distance - b.distance);
  }

  const keys = Object.keys(object).map((x) => parseFloat(x)).sort((a, b) =>
    a - b
  );

  const v = [];
  let i = 0;
  while (v.length < 200) {
    const angle = keys[i];
    if (object[angle].length > 0) {
      v.push(object[angle].shift());
    }

    i = (i + 1) % keys.length;
  }

  console.log(v[199]);
};

main();

const input = Deno.readTextFileSync("solveFor2022/question14/input.txt");
const sandLocs = [];

const parseInput = () =>
  input.split("\n").map((e) =>
    e.split(" -> ").map((ele) => ele.split(",").map(Number))
  );

const getLines = (input) => {
  const coords = [];
  for (const i of input) {
    if (coords.length === 0) coords.push(i);
    else {
      const dx = Math.sign(i[0] - coords.at(-1)[0]);
      const dy = Math.sign(i[1] - coords.at(-1)[1]);

      while (coords.at(-1)[0] !== i[0] || coords.at(-1)[1] !== i[1]) {
        coords.push([coords.at(-1)[0] + dx, coords.at(-1)[1] + dy]);
      }
    }
  }

  return coords;
};

const getCoords = (parsedInput) => {
  const cords = [];
  for (const input of parsedInput) {
    cords.push(...getLines(input));
  }

  return cords;
};

const deepIncludes = (array1, array2) =>
  array1.some((ele) => (ele[0] === array2[0]) && (ele[1] === array2[1]));

const checkBellowRock = (currentSandLoc, rocks) =>
  deepIncludes(rocks, [currentSandLoc[0], currentSandLoc[1] + 1]);

const checkBellowSand = (currentSandLoc) =>
  deepIncludes(sandLocs, [currentSandLoc[0], currentSandLoc[1] + 1]);

const checkBellowLeftRock = (currentSandLoc, rocks) =>
  deepIncludes(rocks, [currentSandLoc[0] - 1, currentSandLoc[1] + 1]);

const checkBellowLeftSand = (currentSandLoc) =>
  deepIncludes(sandLocs, [currentSandLoc[0] - 1, currentSandLoc[1] + 1]);

const checkBellowRightRock = (currentSandLoc, rocks) =>
  deepIncludes(rocks, [currentSandLoc[0] + 1, currentSandLoc[1] + 1]);

const checkBellowRightSand = (currentSandLoc) =>
  deepIncludes(sandLocs, [currentSandLoc[0] + 1, currentSandLoc[1] + 1]);

const checkBellow = (currentSandLoc, rocks) => {
  if (
    !checkBellowRock(currentSandLoc, rocks) &&
    !checkBellowSand(currentSandLoc)
  ) {
    return [currentSandLoc[0], currentSandLoc[1] + 1];
  } else if (
    !checkBellowLeftRock(currentSandLoc, rocks) &&
    !checkBellowLeftSand(currentSandLoc)
  ) {
    return [currentSandLoc[0] - 1, currentSandLoc[1] + 1];
  } else if (
    !checkBellowRightRock(currentSandLoc, rocks) &&
    !checkBellowRightSand(currentSandLoc)
  ) {
    return [currentSandLoc[0] + 1, currentSandLoc[1] + 1];
  }
};

const simulateSingleSandDrop = (rocks, sandSource, maxY) => {
  let currentSandLoc = [...sandSource];

  while (true) {
    if (currentSandLoc[1] + 1 === maxY) return currentSandLoc;

    const result = checkBellow(currentSandLoc, rocks);
    if (!result) return currentSandLoc;

    currentSandLoc = result;
  }
};

const simulateSandDrop = (rocks, sandSource, maxY) => {
  while (true) {
    const currentSand = simulateSingleSandDrop(rocks, sandSource, maxY);

    sandLocs.push(currentSand);
    if (currentSand[0] === 500 && currentSand[1] === 0) {
      return sandLocs;
    }
  }
};

const part1 = () => {
  const sandSource = [500, 0];
  const parsedInput = parseInput();
  const rocks = getCoords(parsedInput);
  const maxRocksY = Math.max(...rocks.map((x) => x[1])) + 2;

  simulateSandDrop(rocks, sandSource, maxRocksY);

  console.log(sandLocs.length);
};

part1();

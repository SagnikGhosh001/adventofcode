const input = Deno.readTextFileSync("./solveFor2021/question12/input.txt");
const dbg = (x) => console.log(x) || x;

const parseInput = () => {
  const splittedInput = input.split("\n").map((ele) => ele.split("-"));
  const structurePaths = {};
  splittedInput.forEach((element) => {
    if (!(element[1] in structurePaths)) structurePaths[element[1]] = [];
    if (!(element[0] in structurePaths)) structurePaths[element[0]] = [];
    structurePaths[element[1]].push(element[0]);
    structurePaths[element[0]].push(element[1]);
  });

  return structurePaths;
};

const frequencyTable = (frequency, cave) => {
  frequency[cave] = (frequency[cave] || 0) + 1;
  return frequency;
};

const isLowerCase = (char) => char.toLowerCase() === char;

const isSmallCaveVisitedMoreThanTwice = (currentPath) => {
  const frequencyOfSmallCave = currentPath.filter(isLowerCase)
    .reduce(frequencyTable, {});
  let doubleVisitCount = 0;
  let isVisitMoreThanTwice = false;

  for (const count of Object.values(frequencyOfSmallCave)) {
    if (count === 2) doubleVisitCount++;
    if (count > 2) isVisitMoreThanTwice = true;
  }

  return doubleVisitCount > 1 || isVisitMoreThanTwice;
};

const findPath = (
  caveStructure,
  currentState,
  paths = [],
  currentPath = [],
) => {
  const possiblePath = caveStructure[currentState];
  if (currentState === "end") {
    paths.push([...currentPath]);
    return;
  }

  for (const path of possiblePath) {
    if (path === "start") continue;
    currentPath.push(path);
    if (isSmallCaveVisitedMoreThanTwice(currentPath)) {
      currentPath.pop();
      continue;
    }
    findPath(caveStructure, path, paths, currentPath);
    currentPath.pop();
  }
};

const main = () => {
  const caveStructure = parseInput();
  console.log(caveStructure);
  const paths = [];
  findPath(caveStructure, "start", paths);
  console.log(paths.length);
};

main();

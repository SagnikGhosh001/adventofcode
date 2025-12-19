const input = Deno.readTextFileSync("./solveFor2021/question10/input.txt");
const dbg = (x) => console.log(x) || x;
const parseInput = () => input.split("\n");
const CLOSING_MAPS = {
  ")": "(",
  "}": "{",
  "]": "[",
  ">": "<",
};
const OPENINGS = ["(", "{", "[", "<"];

const matchSingleInput = (input, notMatchedEle) => {
  const stack = [];
  for (const bracket of input) {
    if (OPENINGS.includes(bracket)) stack.push(bracket);
    else if (CLOSING_MAPS[bracket] === stack.at(-1)) stack.pop();
    else {
      notMatchedEle.push(bracket);
      return;
    }
  }
};

const matchSingleInputPart2 = (input) => {
  const stack = [];
  for (const bracket of input) {
    if (OPENINGS.includes(bracket)) stack.push(bracket);
    else if (CLOSING_MAPS[bracket] === stack.at(-1)) stack.pop();
    else if (getKey(CLOSING_MAPS, stack.at(-1)) === CLOSING_MAPS[bracket]) {
      stack.pop();
    } else return [];
  }

  return stack;
};

const SYNTAX_POINTS = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const SYNTAX_POINTS_PART_2 = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const getKey = (obj, value) => {
  for (const key in obj) {
    if (obj[key] === value) return key;
  }
};

const part1 = () => {
  const notMatchedEle = [];
  const inputs = parseInput();
  for (const input of inputs) {
    matchSingleInput(input, notMatchedEle);
  }

  const cost = notMatchedEle.reduce(
    (c, bracket) => c += SYNTAX_POINTS[bracket],
    0,
  );

  console.log(cost);
};

const findClosingBrackets = (stack) => {
  const closings = [];
  for (const element of stack) {
    for (const key in CLOSING_MAPS) {
      if (CLOSING_MAPS[key] === element) closings.push(key);
    }
  }

  return closings.reverse();
};

const calculateCOstForSingleMisMatch = (input, costs) => {
  const stack = matchSingleInputPart2(input);

  const closings = findClosingBrackets(stack);
  const cost = closings.reduce(
    (c, bracket) => c = 5 * c + SYNTAX_POINTS_PART_2[bracket],
    0,
  );
  // console.log({ stack, closings });

  if (cost) costs.push(cost);
};

const part2 = () => {
  const inputs = parseInput();
  const costs = [];
  for (const input of inputs) {
    calculateCOstForSingleMisMatch(input, costs);
  }
  costs.sort((a, b) => a - b);
  console.log(costs);
  console.log(costs[costs.length >> 1]);
};

// part1();
part2();

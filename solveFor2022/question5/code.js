const stack1 = ["W", "R", "F"];
const stack2 = ["T", "H", "M", "C", "D", "V", "W", "P"];
const stack3 = ["P", "M", "Z", "N", "L"];
const stack4 = ["J", "C", "H", "R"];
const stack5 = ["C", "P", "G", "H", "Q", "T", "B"];
const stack6 = ["G", "C", "W", "L", "F", "Z"];
const stack7 = ["W", "V", "L", "Q", "Z", "J", "G", "C"];
const stack8 = ["P", "N", "R", "F", "W", "T", "V", "C"];
const stack9 = ["J", "W", "H", "G", "R", "S", "V"];

const stacks = [
  stack1,
  stack2,
  stack3,
  stack4,
  stack5,
  stack6,
  stack7,
  stack8,
  stack9,
];
// const stack1 = ["Z", "N"];
// const stack2 = ["M", "C", "D"];
// const stack3 = ["P"];

// const stacks = [
//   stack1,
//   stack2,
//   stack3,
// ];

const input = Deno.readTextFileSync("./solveFor2022/question5/input.txt");

const parseInput = () => {
  const moves = [];
  input.split("\n").forEach((ele) => {
    const splittedEle = ele.split(" ");
    moves.push({
      quantity: +splittedEle[1],
      pos: +splittedEle[3],
      nextPos: +splittedEle[5],
    });
  });

  return moves;
};

const part1 = () => {
  const moves = parseInput();
  for (const { quantity, pos, nextPos } of moves) {
    for (let time = 0; time < quantity; time++) {
      stacks[nextPos - 1].push(stacks[pos - 1].pop());
    }
  }

  let topElements = "";
  for (const stack of stacks) {
    topElements += stack.at(-1);
  }

  console.log(topElements);
};

const getContainers = (quantity, stack) => {
  if (quantity > 1) {
    const popedElements = [];
    for (let time = 0; time < quantity; time++) {
      popedElements.push(stack.pop());
    }
    return popedElements.reverse();
  }

  return stack.pop();
};

const part2 = () => {
  const moves = parseInput();

  for (const { quantity, pos, nextPos } of moves) {
    stacks[nextPos - 1].push(...getContainers(quantity, stacks[pos - 1]));
  }

  let topElements = "";
  for (const stack of stacks) {
    topElements += stack.at(-1);
  }

  // console.log(stacks);

  console.log(topElements);
};

part2();

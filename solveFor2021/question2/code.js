const dbg = (x) => {
  console.log(x);
  return x;
};

let horizontalPos = 0;
let depth = 0;
let aim = 0;

const input = Deno.readTextFileSync("./solveFor2021/question2/input.txt");
const parseInput = () =>
  input.split("\n").map((ele) => ele.split(" ")).map(
    (ele) => [ele[0], +ele[1]],
  );

const up = (x) => aim -= x;
const down = (x) => aim += x;
const forward = (x) => {
  horizontalPos += x;
  depth += aim * x;
};

const chooseFn = (key, value) => {
  const predicates = {
    "forward": forward,
    "up": up,
    "down": down,
  };

  return predicates[key](value);
};

const main = () => {
  const parsedInput = parseInput();
  parsedInput.forEach((ele) => chooseFn(...ele));

  console.log(horizontalPos * depth);
};

main();

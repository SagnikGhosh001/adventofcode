const input = Deno.readTextFileSync("./solveFor2021/question1/input.txt");
const parseInput = () => input.split("\n").map((x) => +x);

const dbg = (x) => {
  console.log(x);
  return x;
};

const main = () => {
  const parsedInput = parseInput();
  // const depthCalc = parsedInput.reduce(
  //   (count, ele, index, arr) => arr[index + 1] > ele ? count + 1 : count,
  //   0,
  // );

  const groupSum = [];

  for (let index = 0; index < parsedInput.length - 2; index++) {
    groupSum.push(
      parsedInput[index] + parsedInput[index + 1] + parsedInput[index + 2],
    );
  }

  const depthCalc = groupSum.reduce(
    (count, ele, index, arr) => arr[index + 1] > ele ? count + 1 : count,
    1,
  );

  console.log(depthCalc);
};

main();

const input = Deno.readTextFileSync("./solveFor2025/question1/input.txt");

const parseInput = () =>
  input.split("\n").map((ele) => [ele[0], parseInt(ele.slice(1))]);

const main = () => {
  const instructions = parseInput();
  let dialPos = 50;
  let zeroCount = 0;

  for (const [dir, value] of instructions) {
    for (let pos = 0; pos < value; pos++) {
      dialPos = (dir === "R") ? (dialPos + 1) % 100 : (dialPos - 1 + 100) % 100;
      if (dialPos === 0) zeroCount++;
    }
  }

  console.log({ zeroCount, dialPos });
};

main();

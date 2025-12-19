const input = Deno.readTextFileSync("./solveFor2021/question7/input.txt");

const parseInput = () => input.split(",").map((x) => parseInt(x));

const sumOfNaturalNumber = (num) => num * (num + 1) >> 1;

const calculateFuel = (positions, allign) =>
  positions.reduce(
    (sum, ele) => sum += sumOfNaturalNumber(Math.abs(ele - allign)),
    0,
  );

const main = () => {
  const parsedInput = parseInput();
  let minFuel = Infinity;
  const min = Math.min(...parsedInput);
  const max = Math.max(...parsedInput);

  for (let allign = min; allign <= max; allign++) {
    const totalFuel = calculateFuel(parsedInput, allign);
    minFuel = Math.min(totalFuel, minFuel);
  }

  console.log(minFuel);
};

main();

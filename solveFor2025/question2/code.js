const input = Deno.readTextFileSync("./solveFor2025/question2/input.txt");

const parseInput = () =>
  input.split(",").map((ele) => {
    const [start, end] = ele.split("-").map(Number);
    return { start, end };
  });

const isInvalid = (number) => {
  const stringNumber = number.toString();
  if (stringNumber.length & 1) return false;
  const halfIndex = stringNumber.length >> 1;
  const firstHalf = stringNumber.slice(0, halfIndex);
  const lastHalf = stringNumber.slice(halfIndex);

  return firstHalf === lastHalf;
};

const isInvalidNumberInRange = ({ start, end }, invalid) => {
  for (let number = start; number <= end; number++) {
    if (isInvalid(number)) invalid.push(number);
  }
};

const main = () => {
  const ranges = parseInput();
  const invalid = [];

  ranges.forEach((range) => isInvalidNumberInRange(range, invalid));
  const totalSum = invalid.reduce((sum, number) => sum += number, 0);
  console.log(totalSum);
};

main();

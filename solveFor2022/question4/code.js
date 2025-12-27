const input = Deno.readTextFileSync("./solveFor2022/question4/input.txt");

const parseInput = () => {
  const ranges = [];

  input.split("\n").forEach((range) => {
    const [range1, range2] = range.split(",").map((ele) =>
      ele.split("-").map(Number)
    );

    ranges.push({ range1, range2 });
  });

  return ranges;
};

const isFullyContains = (range1, range2) =>
  range1[0] <= range2[0] && range1[1] >= range2[1];

const isFullyContainsComplement = (range1, range2) =>
  isFullyContains(range2, range1);

const part1 = () => {
  const ranges = parseInput();

  let fullyContains = 0;

  for (const range of ranges) {
    fullyContains += isFullyContains(range.range1, range.range2) ||
        isFullyContainsComplement(range.range1, range.range2)
      ? 1
      : 0;
  }

  console.log(fullyContains);
};

const isInBetween = (range1, range2) =>
  range1[1] >= range2[0] && range1[0] <= range2[1];

const isInBetweenComplement = (range1, range2) => isInBetween(range2, range1);

const part2 = () => {
  const ranges = parseInput();

  let inBetween = 0;

  for (const range of ranges) {
    inBetween += isInBetween(range.range1, range.range2) ||
        isInBetweenComplement(range.range1, range.range2)
      ? 1
      : 0;
  }

  console.log(inBetween);
};

part2();

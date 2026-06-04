const input = Deno.readTextFileSync("solveFor2022/question13/input.txt");

// const parseInput = () =>
//   input.split("\n\n").map((ele) => ele.split("\n").map((ele) => eval(ele)));

const parseInput = () =>
  input.split("\n\n").flatMap((ele) => ele.split("\n").map((ele) => eval(ele)));

const compareValue = (value1, value2) => {
  if (Array.isArray(value1) || Array.isArray(value2)) {
    return compareList(value1, value2);
  }

  if (value1 === value2) return undefined;
  return value1 < value2;
};

const compareList = (list1, list2) => {
  let newList1 = list1;
  let newList2 = list2;

  if (typeof list2 !== "object") newList2 = [list2];
  if (typeof list1 !== "object") newList1 = [list1];

  let index = 0;

  while (index < newList1.length && index < newList2.length) {
    const result = compareValue(newList1[index], newList2[index]);

    if (result !== undefined) return result;
    index++;
  }

  if (index === newList1.length && index === newList2.length) return undefined;
  return index >= newList1.length;
};

const part1 = () => {
  const pairs = parseInput();
  const trueIndexes = [];

  for (let index = 0; index < pairs.length; index++) {
    const result = compareList(...pairs[index]);
    if (result) trueIndexes.push(index + 1);
  }

  console.log(trueIndexes, trueIndexes.reduce((m, e) => m += e));
};

// part1();

const part2 = () => {
  const packets = parseInput();
  const sortedPackets = packets.toSorted((a, b) => {
    if (compareList(a, b) === undefined) return 0;
    return compareList(a, b) ? -1 : 1;
  });

  const indexes = [];
  for (let index = 0; index < sortedPackets.length; index++) {
    if (
      sortedPackets[index].length === 1 &&
      sortedPackets[index][0].length === 1 &&
      (sortedPackets[index][0][0] === 2 || sortedPackets[index][0][0] === 6)
    ) {
      indexes.push(index + 1);
    }
  }

  console.log(indexes[0] * indexes[1]);
};

part2();

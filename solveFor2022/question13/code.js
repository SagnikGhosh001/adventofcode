const input = Deno.readTextFileSync("solveFor2022/question13/input.txt");

const parseInput = () =>
  input.split("\n\n").map((ele) => ele.split("\n").map((ele) => eval(ele)));

const compareValue = (value1, value2) => {
  if (typeof value1 === "object" || typeof value2 === "object") {
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

part1();

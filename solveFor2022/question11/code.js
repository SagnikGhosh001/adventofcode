const input = Deno.readTextFileSync("./solveFor2022/question11/input.txt");

const parseInput = () => {
  const monkeys = {};
  input.split("\n\n").forEach((ele) => {
    const details = ele.split("\n").map((e) => e.trim());

    const monkeyNo = details[0].split(" ")[1].slice(0, -1);

    monkeys[monkeyNo] = {};
    const startingItems = details[1].split(":")[1].split(",").map(Number);
    monkeys[monkeyNo]["startingItems"] = startingItems;
    const operation = details[2].split(" = ")[1].split(" ");
    monkeys[monkeyNo]["operation"] = operation;

    const testObj = {};
    const test = details.slice(3);
    const lastIndexOfSpace = test[0].lastIndexOf(" ");
    const divider = +test[0].slice(lastIndexOfSpace + 1);
    testObj["divider"] = divider;
    const trueMonkey = +test[1].slice(test[1].lastIndexOf(" ") + 1);
    testObj["trueMonkey"] = trueMonkey;
    const falseMonkey = +test[2].slice(test[2].lastIndexOf(" ") + 1);
    testObj["falseMonkey"] = falseMonkey;

    monkeys[monkeyNo]["test"] = testObj;
  });

  return monkeys;
};

const actualValue = (value, oldValue) => value === "old" ? oldValue : +value;

const performOperation = (value, operation) => {
  const [operand1, oeperator, operand2] = operation;
  if (oeperator === "*") {
    return actualValue(operand1, value) * actualValue(operand2, value);
  }
  return actualValue(operand1, value) + actualValue(operand2, value);
};

// const simulateRound = (monkeys) => {
//   for (const monkey in monkeys) {
//     monkeys[monkey].count = (monkeys[monkey].count || 0) +
//       monkeys[monkey].startingItems.length;

//     for (const st of monkeys[monkey].startingItems) {
//       const changedValue = Math.floor(
//         performOperation(st, monkeys[monkey].operation) / 3,
//       );

//       const throwMonkey = (changedValue % monkeys[monkey].test.divider === 0)
//         ? monkeys[monkey].test.trueMonkey
//         : monkeys[monkey].test.falseMonkey;

//       monkeys[throwMonkey].startingItems.push(changedValue);
//     }

//     monkeys[monkey].startingItems = [];
//   }
// };

const simulateRound = (monkeys, modValue) => {
  for (const monkey in monkeys) {
    monkeys[monkey].count = (monkeys[monkey].count || 0) +
      monkeys[monkey].startingItems.length;

    for (const st of monkeys[monkey].startingItems) {
      const changedValue = performOperation(st, monkeys[monkey].operation) %
        modValue;

      const throwMonkey = (changedValue % monkeys[monkey].test.divider === 0)
        ? monkeys[monkey].test.trueMonkey
        : monkeys[monkey].test.falseMonkey;

      monkeys[throwMonkey].startingItems.push(changedValue);
    }

    monkeys[monkey].startingItems = [];
  }
};

const part1 = () => {
  const monkeys = parseInput();

  // console.log(monkeys);

  for (let times = 0; times < 20; times++) {
    simulateRound(monkeys);
  }

  const sortedMonkey = Object.values(monkeys).map((x) => x.count).sort((a, b) =>
    b - a
  );
  console.log(sortedMonkey[0] * sortedMonkey[1]);
};

const part2 = () => {
  const monkeys = parseInput();

  // console.log(monkeys);
  const modValue = Object.values(monkeys).map((x) => x.test.divider)
    .reduce((acc, value) => acc *= value);

  // console.log(modValue);

  for (let times = 0; times < 10000; times++) {
    simulateRound(monkeys, modValue);
  }

  const sortedMonkey = Object.values(monkeys).map((x) => x.count).sort((a, b) =>
    b - a
  );

  console.log(monkeys);

  console.log(sortedMonkey[0] * sortedMonkey[1]);
};

part2();

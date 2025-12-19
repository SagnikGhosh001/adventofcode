const input = Deno.readTextFileSync("./solveFor2021/question14/input.txt");
const dbg = (x) => console.log(x) || x;

const parseInput = () => {
  const splittedInput = input.split("\n");
  const pairInsertionRule = {};
  for (const element of splittedInput) {
    const [left, right] = element.split(" -> ");
    pairInsertionRule[left] = right;
  }

  return pairInsertionRule;
};

const frequencyTable = (frequency, element, offset = 1) => {
  frequency[element] = (frequency[element] || 0) + offset;
  return frequency;
};

const applyRules = (pairInsertionRule, currentPairs) => {
  const newPairs = {};

  for (const pair in currentPairs) {
    const value = pairInsertionRule[pair];
    if (value) {
      const [first, last] = [...pair];
      newPairs[first + value] = (newPairs[first + value] || 0) +
        currentPairs[pair];
      newPairs[value + last] = (newPairs[value + last] || 0) +
        currentPairs[pair];
    } else {
      newPairs[pair] = (newPairs[pair] || 0) + currentPairs[pair];
    }
  }

  return newPairs;
};

const main = () => {
  const polymarTemplate = [..."ONSVVHNCFVBHKVPCHCPV"];
  const pairInsertionRule = parseInput();
  let currentPairs = {};
  for (let index = 0; index < polymarTemplate.length - 1; index++) {
    const adjacent = polymarTemplate.slice(index, index + 2).join("");
    frequencyTable(currentPairs, adjacent);
  }

  let step = 0;
  const MAX_STEP = 40;
  while (step !== MAX_STEP) {
    currentPairs = applyRules(pairInsertionRule, currentPairs);
    step++;
  }

  const count = {};
  for (const pair in currentPairs) {
    frequencyTable(count, pair[0], currentPairs[pair]);
  }

  count[polymarTemplate.at(-1)]++;

  const value = Object.values(count);
  value.sort((a, b) => a - b);
  console.log(value.at(-1) - value[0]);
};

main();

import { chunk, intersect } from "jsr:@std/collections";
const input = Deno.readTextFileSync("./solveFor2022/question3/input.txt");

const parseInput = () => input.split("\n");

const getItemType = (rucksack) => {
  const middle = rucksack.length / 2;
  const firstItem = rucksack.slice(0, middle);
  const secondItem = rucksack.slice(middle);
  const commonItem = intersect(firstItem, secondItem);
  return commonItem;
};

const getPririty = (char) =>
  char.toLowerCase() === char ? char.charCodeAt() - 96 : char.charCodeAt() - 38;

const part1 = () => {
  const rucksacks = parseInput();
  const commonItems = [];
  for (const rucksack of rucksacks) {
    commonItems.push(...getItemType(rucksack));
  }

  const priority = commonItems.reduce((p, ct) => p += getPririty(ct), 0);
  console.log(priority);
};

const part2 = () => {
  const rucksacks = parseInput();
  const chunkedRucksacks = chunk(rucksacks, 3);

  const commonItems = [];
  for (const chunk of chunkedRucksacks) {
    commonItems.push(...intersect(...chunk));
  }

  const priority = commonItems.reduce((p, ct) => p += getPririty(ct), 0);
  console.log(priority);
};

part2();

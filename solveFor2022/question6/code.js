const input = Deno.readTextFileSync("./solveFor2022/question6/input.txt");

const isRepeated = (string) => {
  for (let i = 0; i < string.length - 1; i++) {
    for (let j = i + 1; j < string.length; j++) {
      if (string[i] === string[j]) return true;
    }
  }

  return false;
};

const part1 = () => {
  for (let index = 0; index < input.length - 3; index++) {
    if (!isRepeated(input.slice(index, index + 4))) return index + 4;
  }
};

const part2 = () => {
  for (let index = 0; index < input.length - 13; index++) {
    if (!isRepeated(input.slice(index, index + 14))) return index + 14;
  }
};

// console.log(part1());
console.log(part2());

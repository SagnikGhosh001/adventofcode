const input = Deno.readTextFileSync("./solveFor2021/question6/input.txt");

const parseInput = () => input.split(",").map((x) => +x);

const fishCount = {
  "0": 0,
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  "7": 0,
  "8": 0,
  "9": 0,
};

const main = () => {
  const fishLifes = parseInput();
  let day = 1;

  fishLifes.forEach((ele) => fishCount[ele] += 1);
  console.log(fishCount);

  while (day <= 256) {
    for (const key in fishCount) {
      if (key !== "0") {
        const previousKey = parseInt(key) - 1;
        fishCount[previousKey] += fishCount[key];
        fishCount[key] = 0;
      } else {
        fishCount[9] += fishCount[0];
        fishCount[7] += fishCount[0];
        fishCount[0] = 0;
      }
    }
    // console.log({ day, fishCount });
    // prompt("");
    day++;
  }
  console.log(Object.values(fishCount).reduce((sum, count) => sum += count, 0));
  console.log(fishCount);
};

main();

const input = Deno.readTextFileSync("./solveFor2022/question10/input.txt");

const crt = [...".".repeat(240)];

const parseInput = () =>
  input.split("\n").map((ele) => ({
    [ele.split(" ")[0]]: +(ele.split(" ")[1] ?? 0),
  }));

const part1 = () => {
  let x = 1;
  const instructions = parseInput();
  let i = 0;

  const signalStrength = [];
  let cycle = 1;
  let shouldSkip = false;

  while (cycle < 221) {
    cycle++;

    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      signalStrength.push(cycle * x);
    }

    if (shouldSkip) {
      shouldSkip = false;
      continue;
    }

    if ("addx" in instructions[i]) {
      x += instructions[i]["addx"];
      shouldSkip = true;
    }

    i++;
  }

  console.log(signalStrength);
  console.log(signalStrength.reduce((sum, e) => sum += e));
};

// part1();

const part2 = () => {
  let sprite = [1, 0, -1];

  const instructions = parseInput();

  let x = 1;
  let cycle = 1;

  let i = 0;
  let shouldSkip = false;
  let pixel = 0;

  while (cycle <= 240) {
    pixel = (cycle - 1) % 40;

    if (sprite.includes(pixel)) crt[cycle - 1] = "#";
    cycle++;

    sprite = [x - 1, x, x + 1];

    if (shouldSkip) {
      shouldSkip = false;
      continue;
    }

    if ("addx" in instructions[i]) {
      x += instructions[i]["addx"];
      shouldSkip = true;
    }

    i++;
  }

  for (let i = 0; i < crt.length; i += 40) {
    console.log(crt.slice(i, i + 40).join(""));
  }
};

part2();

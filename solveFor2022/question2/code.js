const input = Deno.readTextFileSync("./solveFor2022/question2/input.txt");

// const elements = {
//   "A": { win: "C", lose: "B", draw: "A", point: 1 },
//   "B": { win: "A", lose: "C", draw: "B", point: 2 },
//   "C": { win: "B", lose: "A", draw: "C", point: 3 },
// };

const elements = {
  "A": { lose: "C", win: "B", draw: "A", point: 1 },
  "B": { lose: "A", win: "C", draw: "B", point: 2 },
  "C": { lose: "B", win: "A", draw: "C", point: 3 },
};

const responses = {
  "X": "lose",
  "Y": "draw",
  "Z": "win",
};

// const responses = {
//   "X": "A",
//   "Y": "B",
//   "Z": "C",
// };

const parseInput = () => input.split("\n");

const part1 = () => {
  const rounds = parseInput();
  let score = 0;

  for (const round of rounds) {
    const opponentResponse = round[0];
    const myResponse = round.at(-1);
    const actualMyResponse = responses[myResponse];

    if (elements[actualMyResponse].win === opponentResponse) {
      score += elements[actualMyResponse].point + 6;
    } else if (opponentResponse === actualMyResponse) {
      score += elements[actualMyResponse].point + 3;
    } else {
      score += elements[actualMyResponse].point;
    }
  }

  console.log(score);
};

const part2 = () => {
  const rounds = parseInput();
  const points = { lose: 0, win: 6, draw: 3 };

  let score = 0;

  for (const round of rounds) {
    const opponentResponse = round[0];
    const myResponse = round.at(-1);
    const actualMyResponse = responses[myResponse];

    score += points[actualMyResponse] +
      elements[elements[opponentResponse][actualMyResponse]].point;
  }

  console.log(score);
};

part2();

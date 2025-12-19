const input = Deno.readTextFileSync("./solveFor2021/question4/input.txt");
const parseInput = () => {
  const [instructions, ...rest] = input.split("\n\n");
  const bingoBoards = rest.map((ele) =>
    ele.split("\n").map((ele) =>
      ele.replaceAll(/\s\s*/g, " ").trim().split(" ")
    )
  );

  return { instructions, bingoBoards };
};

const selectMatch = (instruction, bingoBoards) => {
  bingoBoards.forEach((board) => {
    let isFound = false;
    for (const row of board) {
      let index = 0;

      while (!isFound && index < row.length) {
        if (row[index] === instruction) {
          row[index] = "X";
          isFound = true;
        }

        index++;
      }
    }
  });
};

const dbg = (x) => console.log(x) || x;

const sumOfNonSelected = (board) => {
  return board.flatMap((x) => x).filter((x) => x !== "X").map(
    (x) => +x,
  ).reduce(
    (sum, ele) => sum += ele,
    0,
  );
};

const main = () => {
  const { instructions, bingoBoards } = parseInput();

  for (const instruction of instructions.split(",")) {
    selectMatch(instruction, bingoBoards);

    const winningIndexes = [];

    bingoBoards.forEach((board, i) => {
      const rowWin = board.some((row) => row.every((x) => x === "X"));
      const colWin = board[0].some((_, col) =>
        board.every((row) => row[col] === "X")
      );

      if (rowWin || colWin) {
        winningIndexes.push(i);
      }
    });

    if (bingoBoards.length === 1 && winningIndexes.includes(0)) {
      return sumOfNonSelected(bingoBoards[0]) * parseInt(instruction);
    }

    winningIndexes.sort((a, b) => b - a).forEach((idx) =>
      bingoBoards.splice(idx, 1)
    );
  }
};

console.log(main());

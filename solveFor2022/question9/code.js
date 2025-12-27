const input = Deno.readTextFileSync("./solveFor2022/question9/input.txt");

const parseInput = () =>
  input.split("\n").map((ele) => {
    const [dir, offset] = ele.split(" ");
    return { dir, offset: parseInt(offset) };
  });

const changeCoord = (x, y, dir) => {
  const moves = {
    "R": { x, y: y + 1 },
    "L": { x, y: y - 1 },
    "U": { x: x - 1, y },
    "D": { x: x + 1, y },
  };

  return moves[dir];
};

const changeTailLoc = (headLoc, tailLoc) => {
  // console.log({ headLoc, tailLoc });

  const dx = headLoc.x - tailLoc.x;
  const dy = headLoc.y - tailLoc.y;

  if (Math.abs(dx) === 2 || Math.abs(dy) === 2) {
    tailLoc.x += Math.sign(dx);
    tailLoc.y += Math.sign(dy);
  }

  return tailLoc;
};

const moveAllTail = (tailLoc) => {
  for (let i = 1; i < tailLoc.length; i++) {
    tailLoc[i] = changeTailLoc(tailLoc[i - 1], tailLoc[i]);
  }
};

const caluateHeadTailLocation = (headLoc, tailLoc, instruction, visited) => {
  for (let i = 0; i < instruction.offset; i++) {
    headLoc = changeCoord(headLoc.x, headLoc.y, instruction.dir);
    tailLoc[0] = changeTailLoc(headLoc, tailLoc[0]);
    moveAllTail(tailLoc);
    visited.add(`${tailLoc.at(-1).x},${tailLoc.at(-1).y}`);
  }

  return { headLoc, tailLoc };
};

const part = () => {
  const instructions = parseInput();
  let headLoc = { x: 0, y: 0 };
  const tailStart = { x: 0, y: 0 };
  let tailLoc = [
    tailStart,
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  const visited = new Set();

  for (const inst of instructions) {
    const locs = caluateHeadTailLocation(headLoc, tailLoc, inst, visited);
    headLoc = locs.headLoc;
    tailLoc = locs.tailLoc;
  }

  console.log(visited.size);
};

part();

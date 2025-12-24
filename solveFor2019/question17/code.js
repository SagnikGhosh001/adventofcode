const input = Deno.readTextFileSync("./solveFor2019/question17/input.txt");

const memory = input.split(",").map((x) => +x);

const grid = [];
const robotDetails = {};

const parseOutput = (output) => {
  const parsedResult = String.fromCharCode(output);
  if (parsedResult === "^") robotDetails["dir"] = parsedResult;
  return parsedResult;
};

const operation = {
  1: (x, y) => x + y,
  2: (x, y) => x * y,
  3: () => +prompt("input"),
  4: (x) => x,
  5: (x, y, ip) => (x !== 0 ? y : ip + 3),
  6: (x, y, ip) => (x === 0 ? y : ip + 3),
  7: (x, y) => (x < y ? 1 : 0),
  8: (x, y) => (x === y ? 1 : 0),
  9: (x, y) => x + y,
};

const parse = (code) => {
  const codeForOperation = (code + "").padStart(5, "0");
  const opcode = +codeForOperation.slice(3);
  const operationMode = codeForOperation.slice(0, 3);
  const [third, second, first] = [...operationMode].map((x) => +x);
  return { first, second, third, opcode };
};

const read = (arr, value, mode, rb) => {
  if (mode === 0) return arr[value] !== undefined ? arr[value] : 0;
  if (mode === 1) return value;
  if (mode === 2) return arr[value + rb] !== undefined ? arr[value + rb] : 0;
};

let index = 0;

const write = (_, value, mode, rb) => {
  if (mode === 0) return value;
  if (mode === 2) return value + rb;
};

const takeInput = (
  copyArray,
  ip,
  _3,
  param1,
  _,
  _1,
  _2,
  input,
) => {
  copyArray[param1] = input[index++];
  return { ip: ip + 2 };
};

const showOutput = (_, ip, _1, param1) => ({ ip: ip + 2, output: param1 });

const jump = (_, ip, opcode, param1, param2) => {
  ip = operation[opcode](param1, param2, ip);
  return { ip };
};

const comparison = (copyArray, ip, opcode, param1, param2, param3) => {
  const valueToStore = operation[opcode](param1, param2);

  copyArray[param3] = valueToStore;
  return { ip: ip + 4 };
};

const otherOperations = (copyArray, ip, opcode, param1, param2, param3) => {
  const result = operation[opcode](param1, param2);
  copyArray[param3] = result;
  return { ip: ip + 4 };
};

const relaiveBase = (_, ip, opcode, param1, _1, _2, rb) => {
  const result = operation[opcode](param1, rb);
  return { ip: ip + 2, rb: result };
};

const chooseOperation = {
  1: otherOperations,
  2: otherOperations,
  3: takeInput,
  4: showOutput,
  5: jump,
  6: jump,
  7: comparison,
  8: comparison,
  9: relaiveBase,
};

const intcode = (copyArray, ip = 0, rb = 0, input) => {
  while (ip < copyArray.length) {
    const modes = parse(copyArray[ip]);
    const opcode = parse(copyArray[ip]).opcode;
    const param1Fn = opcode === 3 ? write : read;
    const param1 = param1Fn(copyArray, copyArray[ip + 1], modes.first, rb);
    const param2 = read(copyArray, copyArray[ip + 2], modes.second, rb);
    const param3 = write(copyArray, copyArray[ip + 3], modes.third, rb);

    if (opcode === 99) {
      return;
    }

    const result = chooseOperation[opcode](
      copyArray,
      ip,
      opcode,
      param1,
      param2,
      param3,
      rb,
      input,
    );
    ip = result.ip;

    if (opcode === 4) {
      grid.push(parseOutput(result.output));
      console.log(result.output);
    }

    if (opcode === 9) rb = result.rb;
  }
};

const dbg = () => {
  console.log(x);
  return x;
};

const formatGrid = () => {
  const stringFormat = grid.join("");
  const formatedGrid = stringFormat.split("\n");
  return formatedGrid.map((ele) => [...ele]);
};

const isIntersent = (formatedGrid, row, col) =>
  formatedGrid[row + 1][col] === "#" &&
  formatedGrid[row - 1][col] === "#" &&
  formatedGrid[row][col + 1] === "#" &&
  formatedGrid[row][col - 1] === "#";

const findIntersections = (formatedGrid) => {
  const intersectCoord = [];
  for (let row = 1; row < formatedGrid.length - 1; row++) {
    for (let col = 1; col < formatedGrid[row].length - 1; col++) {
      if (formatedGrid[row][col] === "^") {
        robotDetails["row"] = row;
        robotDetails["col"] = col;
        continue;
      }
      if (
        isIntersent(formatedGrid, row, col) && formatedGrid[row][col] === "#"
      ) intersectCoord.push([row, col]);
    }
  }

  return intersectCoord;
};

const part1 = () => {
  intcode(memory, 0, 0);
  const formatedGrid = formatGrid();

  const intersectCoord = findIntersections(formatedGrid);
  const allignmentPara = intersectCoord.reduce(
    (result, ele) => result += ele[0] * ele[1],
    0,
  );

  console.log(intersectCoord);
  console.log(grid.join(""));

  console.log(allignmentPara);
};

const directions = {
  "^": [-1, 0],
  "<": [0, -1],
  "v": [1, 0],
  ">": [0, 1],
};

const isValidMove = (grid, x, y) =>
  x >= 0 && y >= 0 && x < grid.length && y < grid[x].length &&
  grid[x][y] === "#";

const findPath = (grid, startX, startY, startDir) => {
  const moves = [];
  let x = startX;
  let y = startY;
  let dir = startDir;
  while (true) {
    const [dx, dy] = directions[dir];
    let nextX = x + dx;
    let nextY = y + dy;
    if (isValidMove(grid, nextX, nextY)) {
      let step = 0;
      while (isValidMove(grid, nextX, nextY)) {
        x = nextX;
        y = nextY;
        nextX += dx;
        nextY += dy;
        step++;
      }
      moves.push(step);
    } else {
      const right = (Object.keys(directions).indexOf(dir) + 3) % 4;
      const left = (Object.keys(directions).indexOf(dir) + 1) % 4;

      if (
        isValidMove(
          grid,
          x + directions[Object.keys(directions)[left]][0],
          y + directions[Object.keys(directions)[left]][1],
        )
      ) {
        moves.push("L");
        dir = Object.keys(directions)[left];
      } else if (
        isValidMove(
          grid,
          x + directions[Object.keys(directions)[right]][0],
          y + directions[Object.keys(directions)[right]][1],
        )
      ) {
        moves.push("R");
        dir = Object.keys(directions)[right];
      } else {
        break;
      }
    }
  }

  console.log(moves);
  return moves;
};

const part2 = () => {
  const copyMemory = [...memory];

  intcode(memory, 0, 0);
  const formatedGrid = formatGrid();
  findIntersections(formatedGrid);
  findPath(formatedGrid, robotDetails.row, robotDetails.col, robotDetails.dir);

  const mainRoutine = [..."A,B,A,C,B,A,C,A,C,B\n"];
  const AFn = [..."L,12,L,8,L,8\n"];
  const BFn = [..."L,12,R,4,L,12,R,6\n"];
  const CFn = [..."R,4,L,12,L,12,R,6\n"];

  console.log(AFn);

  const inputData = [
    ...mainRoutine.map((char) => char.charCodeAt(0)),
    ...AFn.map((char) => char.charCodeAt(0)),
    ...BFn.map((char) => char.charCodeAt(0)),
    ...CFn.map((char) => char.charCodeAt(0)),
    110,
    10,
  ];

  copyMemory[0] = 2;
  intcode(copyMemory, 0, 0, inputData);
  console.log(formatedGrid.map((r) => r.join("")).join("\n"));
};

part2();

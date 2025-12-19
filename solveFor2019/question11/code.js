const input =
  "3,8,1005,8,324,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1001,8,0,29,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,50,1,1106,9,10,1,102,15,10,2,1003,3,10,1,3,19,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,89,1,1105,9,10,2,1103,1,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,119,1006,0,26,1,109,7,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,147,1006,0,75,1,1005,17,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,176,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,199,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,102,1,8,220,2,103,10,10,1,1,0,10,1,102,17,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,254,2,1001,10,10,1006,0,12,1,3,6,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,288,2,1106,9,10,2,1009,6,10,2,1101,18,10,2,103,8,10,101,1,9,9,1007,9,1045,10,1005,10,15,99,109,646,104,0,104,1,21101,838211318676,0,1,21102,341,1,0,1106,0,445,21101,0,838211051932,1,21101,0,352,0,1106,0,445,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,0,21704576195,1,21101,0,399,0,1106,0,445,21101,0,179356830951,1,21101,410,0,0,1105,1,445,3,10,104,0,104,0,3,10,104,0,104,0,21102,837897052948,1,1,21102,1,433,0,1106,0,445,21102,709052085092,1,1,21102,1,444,0,1105,1,445,99,109,2,21201,-1,0,1,21101,0,40,2,21102,476,1,3,21102,466,1,0,1105,1,509,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,471,472,487,4,0,1001,471,1,471,108,4,471,10,1006,10,503,1102,1,0,471,109,-2,2106,0,0,0,109,4,2102,1,-1,508,1207,-3,0,10,1006,10,526,21101,0,0,-3,21201,-3,0,1,21201,-2,0,2,21101,0,1,3,21101,545,0,0,1105,1,550,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,573,2207,-4,-2,10,1006,10,573,21201,-4,0,-4,1105,1,641,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21101,592,0,0,1105,1,550,21201,1,0,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,611,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,633,21202,-1,1,1,21101,633,0,0,106,0,508,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0";
const inputToArray = input.split(",").map((x) => +x);

const path = [[0, 0, 1]];
const currentDetail = { x: 0, y: 0, c: 1 };
let currentHeading = "N";
const DIRECTIONS = ["N", "E", "S", "W"];

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
  // const input = operation[opcode]();
  copyArray[param1] = input;
  return { ip: ip + 2 };
};

const showOutput = (_, ip, _1, param1) => {
  return { ip: ip + 2, output: param1 };
};

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

const intcode = (copyArray, ip, input, rb) => {
  // const copyArray = [...array];
  const output = [];
  while (ip < copyArray.length) {
    if (copyArray[ip] === 99) return { isHalted: true, output, ip, rb };

    const modes = parse(copyArray[ip]);
    const opcode = parse(copyArray[ip]).opcode;
    const param1Fn = opcode === 3 ? write : read;
    const param1 = param1Fn(copyArray, copyArray[ip + 1], modes.first, rb);
    const param2 = read(copyArray, copyArray[ip + 2], modes.second, rb);
    const param3 = write(copyArray, copyArray[ip + 3], modes.third, rb);

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
      output.push(result.output);

      if (output.length === 2) {
        return { output, isHalted: false, ip, rb };
      }
    }

    if (opcode === 9) rb = result.rb;
  }
};

const direction = (x, y, heading) => {
  const moves = {
    N: { x, y: y + 1 },
    S: { x, y: y - 1 },
    E: { x: x + 1, y },
    W: { x: x - 1, y },
  };

  return moves[heading];
};

const turn = (output) => {
  const offset = output ? 1 : -1;
  const index = (DIRECTIONS.indexOf(currentHeading) + offset) %
    DIRECTIONS.length;

  currentHeading = DIRECTIONS.at(index);
};

const getColor = (x, y) => {
  const found = path.find((p) => p[0] === x && p[1] === y);
  return found ? found[2] : 0;
};

const dbg = () => {
  console.log(x);
  return x;
};
const print = () => {
  const maxX = Math.max(...path.map((x) => x[0]));
  const maxY = Math.max(...path.map((x) => x[1]));
  const minX = Math.min(...path.map((x) => x[0]));
  const minY = Math.min(...path.map((x) => x[1]));

  for (let i = minX; i <= maxX; i++) {
    let string = "";
    for (let j = minY; j <= maxY; j++) {
      const existing = path.find((ele) => ele[0] === i && ele[1] === j);
      const color = existing && existing[2] === 1 ? "⬜️" : "  ";
      string += color;
    }
    console.log(string);
  }
};

const main = () => {
  let count = 1;
  let insPointer = 0;
  let relativeBase = 0;

  while (true) {
    const { isHalted, ip, output, rb } = intcode(
      inputToArray,
      insPointer,
      currentDetail.c,
      relativeBase,
    );

    if (isHalted) break;
    insPointer = ip;
    relativeBase = rb;

    const existing = path.find((ele) =>
      ele[0] === currentDetail.x && ele[1] === currentDetail.y
    );

    if (existing) {
      existing[2] = output[0];
    } else {
      path.push([currentDetail.x, currentDetail.y, output[0]]);
      count++;
    }
    turn(output[1]);

    const newPath = direction(currentDetail.x, currentDetail.y, currentHeading);
    currentDetail.x = newPath.x;
    currentDetail.y = newPath.y;
    currentDetail.c = getColor(currentDetail.x, currentDetail.y);
  }

  print();
};

console.log(main());

const input =
  "109,424,203,1,21101,11,0,0,1105,1,282,21102,18,1,0,1106,0,259,1201,1,0,221,203,1,21102,1,31,0,1105,1,282,21101,38,0,0,1106,0,259,20102,1,23,2,21201,1,0,3,21101,1,0,1,21102,57,1,0,1105,1,303,1201,1,0,222,21001,221,0,3,20101,0,221,2,21102,1,259,1,21101,0,80,0,1105,1,225,21101,76,0,2,21102,1,91,0,1106,0,303,2102,1,1,223,21002,222,1,4,21102,1,259,3,21101,0,225,2,21102,225,1,1,21102,1,118,0,1105,1,225,21001,222,0,3,21102,1,54,2,21102,1,133,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21101,148,0,0,1106,0,259,1202,1,1,223,21001,221,0,4,20101,0,222,3,21101,14,0,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,0,195,0,106,0,108,20207,1,223,2,20101,0,23,1,21101,0,-1,3,21102,1,214,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1202,-4,1,249,22102,1,-3,1,21201,-2,0,2,21202,-1,1,3,21101,0,250,0,1106,0,225,22101,0,1,-4,109,-5,2105,1,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,21201,-2,0,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,22101,0,-2,3,21102,1,343,0,1106,0,303,1106,0,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22102,1,-4,1,21101,0,384,0,1105,1,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21202,1,1,-4,109,-5,2106,0,0";

const memory = input.split(",").map((x) => +x);

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

let askForInput = 0;

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
  const indexToGet = askForInput % 2;
  copyArray[param1] = input[indexToGet];
  askForInput++;
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

const intcode = (copyArray, ip = 0, rb = 0, input) => {
  // const copyArray = [...array];
  while (ip < copyArray.length) {
    const modes = parse(copyArray[ip]);
    const opcode = parse(copyArray[ip]).opcode;
    const param1Fn = opcode === 3 ? write : read;
    const param1 = param1Fn(copyArray, copyArray[ip + 1], modes.first, rb);
    const param2 = read(copyArray, copyArray[ip + 2], modes.second, rb);
    const param3 = write(copyArray, copyArray[ip + 3], modes.third, rb);

    if (opcode === 99) {
      return { ip, rb };
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
    if (opcode === 4) {
      return result.output;
    }

    ip = result.ip;

    if (opcode === 9) rb = result.rb;
  }
};

const dbg = (x) => console.log(x) && x;

const checkSquare = (r, c, gridSize = 100) => {
  for (let dx = 0; dx < gridSize; dx++) {
    for (let dy = 0; dy < gridSize; dy++) {
      const output = intcode([...memory], 0, 0, [r + dx, c + dy]);
      if (output !== 1) return false;
    }
  }

  return true;
};

const main = () => {
  const start = 600;
  const end = 1000;

  for (let r = start; r <= end; r++) {
    for (let c = start; c <= end; c++) {
      if (checkSquare(r, c, 100)) {
        console.log(r * 10000 + c);
        return;
      }
    }
  }

  console.log("no match");
};

main();

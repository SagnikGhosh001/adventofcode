const input = Deno.readTextFileSync("./solveFor2019/question25/input.txt");

const memory = input.split(",").map((x) => +x);

const operation = {
  1: (x, y) => x + y,
  2: (x, y) => x * y,
  3: () => prompt("input"),
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

let output = [];
const inputArr = [];

const takeInput = (
  copyArray,
  ip,
  _3,
  param1,
  _,
  _1,
  _2,
) => {
  console.log(output.map((c) => String.fromCharCode(c)).join(""));
  output = [];

  if (inputArr.length === 0) {
    const ipt = operation[3]().split("");
    const ascii = ipt.map((c) => c.charCodeAt());
    inputArr.push(...ascii, 10);
  }

  copyArray[param1] = inputArr.shift();
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

const intcode = (copyArray, ip = 0, rb = 0) => {
  // const copyArray = [...array];

  while (ip < copyArray.length) {
    const modes = parse(copyArray[ip]);
    const opcode = parse(copyArray[ip]).opcode;
    const param1Fn = opcode === 3 ? write : read;
    const param1 = param1Fn(copyArray, copyArray[ip + 1], modes.first, rb);
    const param2 = read(copyArray, copyArray[ip + 2], modes.second, rb);
    const param3 = write(copyArray, copyArray[ip + 3], modes.third, rb);

    if (opcode === 99) {
      return output;
    }

    const result = chooseOperation[opcode](
      copyArray,
      ip,
      opcode,
      param1,
      param2,
      param3,
      rb,
    );
    if (opcode === 4) {
      output.push(result.output);
    }

    ip = result.ip;

    if (opcode === 9) rb = result.rb;
  }
};

const dbg = (x) => {
  console.log(x);
  return x;
};

const main = () => {
  // while (true) {
    const o = intcode(memory, 0, 0, input);
    console.log(o.map((c) => String.fromCharCode(c)).join(""));
  // }
};

main();

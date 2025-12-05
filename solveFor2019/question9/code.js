const input = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
const inputToArray = input.split(",").map((x) => +x);

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
  if (mode === 0) return arr[value] ? arr[value] : 0;
  if (mode === 1) return value;
  if (mode === 2) return arr[value + rb] ? arr[value + rb] : 0;
};

const write = (_, value, mode, rb) => mode === 0 ? value : value + rb;

const takeInput = (copyArray, ip, opcode, param1) => {
  const input = operation[opcode]();
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

const intcode = (array, ip) => {
  const copyArray = [...array];
  let output = 0;
  let rb = 0;

  while (ip < copyArray.length) {
    if (copyArray[ip] === 99) return copyArray;

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
    );
    ip = result.ip;

    if (opcode === 4) {
      output = result.output;
      console.log(output);
    }

    if (opcode === 9) rb = result.rb;
  }
};

const main = () => {
  const result = intcode(inputToArray, 0);
  // console.log({ result, inputToArray });
};

main();

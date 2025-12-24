const input = Deno.readTextFileSync("./solveFor2019/question23/input.txt");
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

const isAllComputerIdle = (computer) =>
  computer.every((c) => c.input.length === 0 && c.waiting);

const takeInput = (
  copyArray,
  ip,
  _,
  param1,
  __,
  ___,
  ____,
  input,
  computer,
) => {
  if (input.length === 0) {
    copyArray[param1] = -1;
    computer.waiting = true;
  } else {
    copyArray[param1] = input.shift();
    computer.waiting = false;
  }

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

const intcode = (memory, ip, rb, input, output, computer) => {
  while (ip < memory.length) {
    const modes = parse(memory[ip]);
    const opcode = parse(memory[ip]).opcode;
    const param1Fn = opcode === 3 ? write : read;
    const param1 = param1Fn(memory, memory[ip + 1], modes.first, rb);
    const param2 = read(memory, memory[ip + 2], modes.second, rb);
    const param3 = write(memory, memory[ip + 3], modes.third, rb);

    if (opcode === 99) return { ip, rb };

    const result = chooseOperation[opcode](
      memory,
      ip,
      opcode,
      param1,
      param2,
      param3,
      rb,
      input,
      computer,
    );

    ip = result.ip;

    if (opcode === 3) {
      return { ip, rb };
    }

    if (opcode === 4) {
      output.push(result.output);
      return { ip, rb };
    }

    if (opcode === 9) rb = result.rb;
  }
};

const dbg = (x) => {
  console.log(x);
  return x;
};

let lastY = 0;

const idleFnFirstTime = (computer, special) => {
  computer[0].input = [...special];
  special.length = 0;

  while (true) {
    let sendPacket = false;
    for (let i = 0; i < 50; i++) {
      const currCom = computer[i];

      const { ip, rb } = intcode(
        currCom.memory,
        currCom.ip,
        currCom.rb,
        currCom.input,
        currCom.output,
        currCom,
      );

      currCom.ip = ip;
      currCom.rb = rb;

      if (currCom.output.length === 3) {
        sendPacket = true;
        const [destination, x, y] = currCom.output;
        currCom.output = [];

        if (destination === 255) {
          special = [x, y];
        } else {
          computer[destination].input.push(x, y);
        }
      }
    }

    if (isAllComputerIdle(computer) && special.length > 0 && !sendPacket) {
      if (lastY === special[1]) {
        console.log(lastY, special[1]);
        prompt("");
      }

      lastY = special[1];
      return idleFnFirstTime(computer, special);
    }
  }
};

const main = () => {
  const computer = [];
  let special = [];

  for (let term = 0; term < 50; term++) {
    computer.push({
      memory: [...memory],
      ip: 0,
      rb: 0,
      input: [term],
      output: [],
      waiting: false,
    });
  }

  while (true) {
    let sendPacket = false;
    for (let i = 0; i < 50; i++) {
      const currCom = computer[i];

      const { ip, rb } = intcode(
        currCom.memory,
        currCom.ip,
        currCom.rb,
        currCom.input,
        currCom.output,
        currCom,
      );

      currCom.ip = ip;
      currCom.rb = rb;

      if (currCom.output.length === 3) {
        sendPacket = true;
        const [destination, x, y] = currCom.output;
        currCom.output = [];

        if (destination === 255) {
          special = [x, y];
        } else {
          computer[destination].input.push(x, y);
        }
      }
    }

    if (isAllComputerIdle(computer) && special.length > 0 && !sendPacket) {
      return idleFnFirstTime(computer, special);
    }
  }
};

main();

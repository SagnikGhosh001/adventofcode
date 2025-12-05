import { permutationSet } from "jsr:@hugoalh/setation/set";

// const input =
//   "3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99";
const input =
  "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
const inputToArray = input.split(",").map((x) => +x);

const operation = {
  1: (x, y) => x + y,
  2: (x, y) => x * y,
  4: (x) => x,
  5: (x, y, ip) => (x !== 0 ? y : ip + 3),
  6: (x, y, ip) => (x === 0 ? y : ip + 3),
  7: (x, y) => (x < y ? 1 : 0),
  8: (x, y) => (x === y ? 1 : 0),
};

const parse = (code) => {
  const codeForOperation = (code + "").padStart(5, "0");
  const opcode = +codeForOperation.slice(3);
  const operationMode = codeForOperation.slice(0, 3);
  const [third, second, first] = [...operationMode].map((x) => +x);
  return { first, second, third, opcode };
};

const selectLoc = (arr, value, mode, isResult) => {
  // if (isResult) {
  //   if (mode === 0) return value;
  //   if (mode === 1) return arr[value];
  // }
  return mode === 1 ? value : arr[value];
};

const takeInput = (
  copyArray,
  ip,
  _,
  _1,
  _2,
  _3,
  firstInput,
  secondInput,
  isPhaseUsed,
) => {
  const input = !isPhaseUsed ? firstInput : secondInput;
  const nextIndex = copyArray[ip + 1];
  copyArray[nextIndex] = input;
  return { isPhaseUsed: true, ip: ip + 2 };
};

const showOutput = (copyArray, ip, opcode) => {
  const nextIndex = copyArray[ip + 1];
  const output = operation[opcode](copyArray[nextIndex]);
  return { ip: ip + 2, output };
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

const chooseOperation = {
  1: otherOperations,
  2: otherOperations,
  3: takeInput,
  4: showOutput,
  5: jump,
  6: jump,
  7: comparison,
  8: comparison,
};

const intcode = (array, firstInput, secondInput, ip, isPhaseUsed) => {
  const copyArray = [...array];
  let output = 0;
  while (ip < copyArray.length) {
    if (copyArray[ip] === 99) {
      return { ip, copyArray, isHalt: true, output, isPhaseUsed };
    }

    const modes = parse(copyArray[ip]);
    const opcode = parse(copyArray[ip]).opcode;
    const param1 = selectLoc(copyArray, copyArray[ip + 1], modes.first);
    const param2 = selectLoc(copyArray, copyArray[ip + 2], modes.second);
    // const param3 = selectLoc(copyArray, copyArray[ip + 3], modes.third, true);
    const param3 = copyArray[ip + 3];

    const result = chooseOperation[opcode](
      copyArray,
      ip,
      opcode,
      param1,
      param2,
      param3,
      firstInput,
      secondInput,
      isPhaseUsed,
    );
    ip = result.ip;

    if (opcode === 3) {
      isPhaseUsed = result.isPhaseUsed;
    }

    if (opcode === 4) {
      output = result.output;
      // console.log(output);

      return { ip, copyArray, isHalt: false, output, isPhaseUsed };
    }
  }
};

const runAllThrust = () => {
  const allPossibleCombo = [...permutationSet([5, 6, 7, 8, 9], 5)];
  let maxThrust = -Infinity;

  for (const combo of allPossibleCombo) {
    const amp = [
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
    ];
    let thrust = 0;
    let countOfHaltAmpl = 0;

    while (countOfHaltAmpl < 5) {
      for (let i = 0; i < amp.length; i++) {
        if (amp[i].isHalt) continue; // Skip halted amplifiers
        const intcodeValues = intcode(
          amp[i].memory,
          combo[i],
          thrust,
          amp[i].ip,
          amp[i].isPhaseUsed,
        );

        thrust = intcodeValues.output;
        amp[i].ip = intcodeValues.ip;
        amp[i].memory = intcodeValues.copyArray;
        amp[i].isHalt = intcodeValues.isHalt;
        amp[i].isPhaseUsed = intcodeValues.isPhaseUsed;

        if (amp[i].isHalt) {
          countOfHaltAmpl++;
        }
      }

      maxThrust = Math.max(maxThrust, thrust);
    }
  }

  return maxThrust;
};

console.log(runAllThrust());

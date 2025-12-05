import { permutationSet } from "jsr:@hugoalh/setation/set";

const input =
  "3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99";
const inputToArray = input.split(",").map((x) => +x);

const operation = {
  1: (x, y) => x + y,
  2: (x, y) => x * y,
  // 3: () => +prompt("input"),
  4: (x) => x,
  5: (x, y, ip) => (x !== 0) ? y : ip + 3,
  6: (x, y, ip) => (x === 0) ? y : ip + 3,
  7: (x, y) => (x < y) ? 1 : 0,
  8: (x, y) => (x === y) ? 1 : 0,
};

const parse = (code) => {
  const codeForOperation = (code + "").padStart(5, "0");
  const opcode = +codeForOperation.slice(3);
  const operationMode = codeForOperation.slice(0, 3);
  const [third, second, first] = [...operationMode].map((x) => +x);
  return { first, second, third, opcode };
};

const selectLoc = (arr, value, mode, isResult) => {
  if (isResult) {
    if (mode === 0) return value;
    if (mode === 1) return arr[value];
  }
  if (mode === 1) return value;
  if (mode === 0) return arr[value];
};

const intcode = (array, firstInput, secondInput, ip, isPhaseUsed) => {
  let offset = 0;
  const copyArray = [...array];
  let output = 0;
  for (let index = ip; index < copyArray.length; index += offset) {
    if (copyArray[index] === 99) {
      return { index, copyArray, isHalt: true, output, isPhaseUsed };
    }

    const modes = parse(copyArray[index]);
    const opcode = parse(copyArray[index]).opcode;
    if (opcode === 3) {
      const input = !isPhaseUsed ? firstInput : secondInput;
      const nextIndex = copyArray[index + 1];
      copyArray[nextIndex] = input;
      offset = 2;
      isPhaseUsed = true;
      continue;
    } else if (opcode === 4) {
      const nextIndex = copyArray[index + 1];
      output = operation[opcode](copyArray[nextIndex]);
      offset = 2;
      return { ip: index + 2, copyArray, isHalt: false, output, isPhaseUsed };
    } else if (opcode === 5 || opcode === 6) {
      const param1 = selectLoc(copyArray, copyArray[index + 1], modes.first);
      const param2 = selectLoc(copyArray, copyArray[index + 2], modes.second);
      index = operation[opcode](param1, param2, index);
      offset = 0;
      continue;
    } else if (opcode === 7 || opcode === 8) {
      const param1 = selectLoc(copyArray, copyArray[index + 1], modes.first);
      const param2 = selectLoc(copyArray, copyArray[index + 2], modes.second);
      const param3 = selectLoc(
        copyArray,
        copyArray[index + 3],
        modes.third,
        true,
      );
      const valueToStore = operation[opcode](param1, param2);
      copyArray[param3] = valueToStore;
      offset = 4;
      continue;
    } else {
      offset = 4;
    }

    const result = operation[opcode](
      selectLoc(copyArray, copyArray[index + 1], modes.first),
      selectLoc(copyArray, copyArray[index + 2], modes.second),
    );

    copyArray[
      selectLoc(copyArray, copyArray[index + 3], modes.third, true)
    ] = result;
  }
};

const runAllThrust = () => {
  const allPossibleCombo = [...permutationSet([5, 6, 7, 8, 9], 5)];
  let maxThrust = -Infinity;
  let thrust = 0;

  for (const combo of allPossibleCombo) {
    const amp = [
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
      { memory: [...inputToArray], ip: 0, isHalt: false, isPhaseUsed: false },
    ];
    thrust = 0;
    let countOfHaltAmpl = 0;
    while (countOfHaltAmpl < 5) {
      for (let i = 0; i < amp.length; i++) {
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
        if (amp[i].isHalt) countOfHaltAmpl++;
      }

      maxThrust = Math.max(maxThrust, thrust);
    }
  }
  return maxThrust;
};

console.log(runAllThrust());

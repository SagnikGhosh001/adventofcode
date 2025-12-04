const input =
  "3,225,1,225,6,6,1100,1,238,225,104,0,1102,27,28,225,1,113,14,224,1001,224,-34,224,4,224,102,8,223,223,101,7,224,224,1,224,223,223,1102,52,34,224,101,-1768,224,224,4,224,1002,223,8,223,101,6,224,224,1,223,224,223,1002,187,14,224,1001,224,-126,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,1102,54,74,225,1101,75,66,225,101,20,161,224,101,-54,224,224,4,224,1002,223,8,223,1001,224,7,224,1,224,223,223,1101,6,30,225,2,88,84,224,101,-4884,224,224,4,224,1002,223,8,223,101,2,224,224,1,224,223,223,1001,214,55,224,1001,224,-89,224,4,224,102,8,223,223,1001,224,4,224,1,224,223,223,1101,34,69,225,1101,45,67,224,101,-112,224,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1102,9,81,225,102,81,218,224,101,-7290,224,224,4,224,1002,223,8,223,101,5,224,224,1,223,224,223,1101,84,34,225,1102,94,90,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1007,677,677,224,102,2,223,223,1005,224,329,101,1,223,223,1108,226,677,224,1002,223,2,223,1005,224,344,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,359,101,1,223,223,8,226,677,224,1002,223,2,223,1006,224,374,101,1,223,223,108,226,677,224,1002,223,2,223,1006,224,389,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,404,1001,223,1,223,7,226,677,224,1002,223,2,223,1005,224,419,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,434,1001,223,1,223,1107,226,226,224,1002,223,2,223,1006,224,449,101,1,223,223,1108,226,226,224,1002,223,2,223,1005,224,464,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,479,101,1,223,223,8,226,226,224,1002,223,2,223,1006,224,494,1001,223,1,223,1007,226,677,224,1002,223,2,223,1006,224,509,1001,223,1,223,108,226,226,224,1002,223,2,223,1006,224,524,1001,223,1,223,1108,677,226,224,102,2,223,223,1006,224,539,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,554,101,1,223,223,107,226,677,224,1002,223,2,223,1006,224,569,101,1,223,223,107,677,677,224,102,2,223,223,1006,224,584,101,1,223,223,7,677,226,224,102,2,223,223,1005,224,599,101,1,223,223,1008,226,226,224,1002,223,2,223,1005,224,614,1001,223,1,223,107,226,226,224,1002,223,2,223,1005,224,629,101,1,223,223,7,226,226,224,102,2,223,223,1006,224,644,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,659,101,1,223,223,108,677,677,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226";
// const input =
//   "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";
const inputIntoArray = input.split(",").map((x) => +x);

const operation = {
  1: (x, y) => x + y,
  2: (x, y) => x * y,
  3: () => +prompt("input"),
  4: (x) => console.log(x),
  5: (x, y, ip) => {
    if (x !== 0) return y;
    return ip + 3;
  },
  6: (x, y, ip) => {
    if (x === 0) return y;
    return ip + 3;
  },
  7: (x, y) => {
    if (x < y) return 1;
    return 0;
  },
  8: (x, y) => {
    if (x === y) return 1;
    return 0;
  },
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

const intcode = (array) => {
  let offset = 0;
  const copyArray = [...array];

  for (let index = 0; index < copyArray.length; index += offset) {
    if (copyArray[index] === 99) break;
    const modes = parse(copyArray[index]);
    const opcode = parse(copyArray[index]).opcode;

    if (opcode === 3) {
      const input = operation[copyArray[index]]();
      const nextIndex = copyArray[index + 1];
      copyArray[nextIndex] = input;
      offset = 2;
      continue;
    } else if (opcode === 4) {
      const nextIndex = copyArray[index + 1];
      operation[opcode](copyArray[nextIndex]);
      offset = 2;
      continue;
    } else if (opcode === 5 || opcode === 6) {
      const param1 = selectLoc(copyArray, copyArray[index + 1], modes.first);
      const param2 = selectLoc(copyArray, copyArray[index + 2], modes.second);
      index = operation[opcode](param1, param2, index);
      offset = 0;
      continue;
    } else if (opcode === 7 || opcode === 8) {
      const param1 = selectLoc(copyArray, copyArray[index + 1], modes.first);
      const param2 = selectLoc(copyArray, copyArray[index + 2], modes.second);
      const valueToStore = operation[opcode](param1, param2);

      copyArray[
        selectLoc(copyArray, copyArray[index + 3], modes.third, true)
      ] = valueToStore;
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

  return copyArray;
};

intcode(inputIntoArray);

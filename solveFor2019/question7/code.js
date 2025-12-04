import { permutationSet } from "jsr:@hugoalh/setation/set";

const input =
  "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
const inputIntoArray = input.split(",").map((x) => +x);

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

const intcode = (array, firstInput, secondInput, ip, offset) => {
  console.log({ array, firstInput, secondInput, ip, ele: array[ip], offset });

  // let offset = 0;
  const copyArray = [...array];
  let isFirstInputDone = false;
  let output = 0;
  for (let index = ip; index < copyArray.length; index += offset) {
    if (copyArray[index] === 99) {
      return { ip: ip, copyArray, isHalt: true, output, offset };
    }

    const modes = parse(copyArray[index]);
    const opcode = parse(copyArray[index]).opcode;
    if (opcode === 3) {
      // const input = operation[copyArray[index]]();
      const input = !isFirstInputDone ? firstInput : secondInput;
      const nextIndex = copyArray[index + 1];
      copyArray[nextIndex] = input;
      offset = 2;
      isFirstInputDone = true;
      continue;
    } else if (opcode === 4) {
      const nextIndex = copyArray[index + 1];
      output = operation[opcode](copyArray[nextIndex]);
      offset = 2;
      return { ip: ip + 2, copyArray, isHalt: false, output, offset };
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

  // return output;
};

const runAllThrust = () => {
  const allPossibleCombo = [...permutationSet([5, 6, 7, 8, 9], 5)];
  // let inputForOperation = [...inputIntoArray];

  let maxThrust = -Infinity;
  let thrust = 0;
  const amp = [
    { memory: [...inputIntoArray], ip: 0, isHalt: false, offset: 0 },
    { memory: [...inputIntoArray], ip: 0, isHalt: false, offset: 0 },
    { memory: [...inputIntoArray], ip: 0, isHalt: false, offset: 0 },
    { memory: [...inputIntoArray], ip: 0, isHalt: false, offset: 0 },
    { memory: [...inputIntoArray], ip: 0, isHalt: false, offset: 0 },
  ];

  for (const combo of allPossibleCombo) {
    for (let i = 0; i < amp.length; i++) {
      const intcodeValues = intcode(
        amp[i].memory,
        combo[i],
        thrust,
        amp[i].ip,
        amp[i].offset,
      );
      thrust = intcodeValues.output;
      amp[i].ip = intcodeValues.ip;
      amp[i].memory = intcodeValues.copyArray;
      amp[i].isHalt = intcodeValues.isHalt;
      amp[i].offset = intcodeValues.offset;
      if (amp[i].isHalt) return maxThrust;
    }

    // inputForOperation = [...inputIntoArray];
    maxThrust = Math.max(maxThrust, thrust);
  }
  // return maxThrust;
};

console.log(runAllThrust());

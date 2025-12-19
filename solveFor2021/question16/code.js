const input = Deno.readTextFileSync("./solveFor2021/question16/input.txt");
const dbg = (x) => console.log(x) || x;
const binaryToDecimal = (binary) => parseInt(binary, 2);

const chooseOperation = (value, key) => {
  const operations = {
    0: value.reduce((sum, ele) => sum += ele, 0),
    1: value.reduce((sum, ele) => sum *= ele, 1),
    2: Math.min(...value),
    3: Math.max(...value),
    5: value[0] > value[1] ? 1 : 0,
    6: value[0] < value[1] ? 1 : 0,
    7: value[0] === value[1] ? 1 : 0,
  };

  return operations[key];
};

const parseInput = (binary) => {
  const header = binary.slice(0, 3);
  const typeId = binary.slice(3, 6);

  return { header, typeId, otherBits: binary.slice(6) };
};

const hexToBinary = (hex) =>
  [...hex].map((h) => parseInt(h, 16).toString(2).padStart(4, "0")).join("");

const literalMode = (bits) => {
  let value = "";
  for (let index = 0; index < bits.length; index += 5) {
    value += bits.slice(index + 1, index + 5);
    if (bits[index] === "0") {
      return {
        value: parseInt(value, 2),
        remaining: bits.slice(index + 5),
        consumed: index + 5,
      };
    }
  }
};

const forZeroMode = (bits, size, version) => {
  let consumed = 0;
  let remaining = bits;
  const value = [];

  while (consumed < size) {
    const result = modes(remaining, version);
    remaining = result.remaining;
    consumed += result.consumed;
    value.push(result.value);
  }

  return { value, remaining, consumed };
};

const forOneMode = (bits, size, version) => {
  let consumed = 0;
  let remaining = bits;
  let subPacketsRead = 0;
  const value = [];

  while (subPacketsRead < size) {
    const result = modes(remaining, version);
    remaining = result.remaining;
    consumed += result.consumed;
    value.push(result.value);
    subPacketsRead++;
  }

  return { value, remaining, consumed };
};

const operatorMode = (bits, version, typeId) => {
  const lengthTypeId = bits[0];
  const offset = (lengthTypeId === "0") ? 15 : 11;
  const lengthInfo = bits.slice(1, offset + 1);
  const size = parseInt(lengthInfo, 2);
  const fnToUse = lengthTypeId === "0" ? forZeroMode : forOneMode;
  const result = fnToUse(bits.slice(offset + 1), size, version);
  const remaining = result.remaining;
  const consumed = 1 + offset + result.consumed;

  return { value: chooseOperation(result.value, typeId), remaining, consumed };
};

const modes = (binaryStr, version) => {
  const { header, typeId, otherBits } = parseInput(binaryStr);
  version.push(header);
  const decimalOfTypeId = binaryToDecimal(typeId);
  const fnToUse = (decimalOfTypeId === 4) ? literalMode : operatorMode;
  const result = fnToUse(otherBits, version, decimalOfTypeId);
  const remaining = result.remaining;
  const consumed = 6 + result.consumed;

  return { value: result.value, remaining, consumed };
};

const main = () => {
  const hexString = input;
  const binaryStr = hexToBinary(hexString);
  const version = [];
  const value = modes(binaryStr, version).value;
  const decimalVersionValue = version.map((ele) => parseInt(ele, 2));
  const sumOfversion = decimalVersionValue.reduce((sum, ele) => sum += ele, 0);

  console.log({ sumOfversion, value });
};

main();

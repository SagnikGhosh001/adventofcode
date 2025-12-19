const input = Deno.readTextFileSync("./solveFor2021/question3/input.txt");
const parseInput = () => input.split("\n");

const frequencyTable = (frequency, ele) => {
  if (!(ele in frequency)) frequency[ele] = 0;
  frequency[ele]++;
  return frequency;
};

const getKey = (obj, value) => {
  for (const key in obj) {
    if (obj[key] === value) return key;
  }
};

const filterAndStop = (array, predicate, index) => {
  let i = 0;

  while (i < array.length) {
    if (predicate !== array[i][index]) {
      array.splice(i, 1);
      i--;
    }
    i++;
  }
};

const mostOccuredDigit = (parsedInput, index) => {
  const digitInOrder = [];

  let stringIndex = 0;
  const stringLength = parsedInput[0].length;

  while (stringIndex !== stringLength) {
    let string = "";
    for (let i = 0; i < parsedInput.length; i++) {
      string += parsedInput[i][stringIndex];
    }
    digitInOrder.push(string);
    stringIndex++;
  }

  const frequncyForEachElement = digitInOrder.map((element) =>
    [...element].reduce(frequencyTable, {})
  );

  const occurence =
    frequncyForEachElement.map((ele) => Object.values(ele))[index];

  if (occurence[0] === occurence[1]) return "1";

  return getKey(frequncyForEachElement[index], Math.max(...occurence));
};

const leastOccuredDigit = (parsedInput, index) => {
  const digitInOrder = [];

  let stringIndex = 0;
  const stringLength = parsedInput[0].length;

  while (stringIndex !== stringLength) {
    let string = "";
    for (let i = 0; i < parsedInput.length; i++) {
      string += parsedInput[i][stringIndex];
    }
    digitInOrder.push(string);
    stringIndex++;
  }

  const frequncyForEachElement = digitInOrder.map((element) =>
    [...element].reduce(frequencyTable, {})
  );

  const occurence =
    frequncyForEachElement.map((ele) => Object.values(ele))[index];

  if (occurence[0] === occurence[1]) return "0";

  return getKey(frequncyForEachElement[index], Math.min(...occurence));
};

const gnerateRating = (array, fn, index = 0) => {
  if (array.length === 1) return array;
  const bit = fn(array, index);

  filterAndStop(array, bit, index);
  return gnerateRating(array, fn, index + 1);
};

const main = () => {
  const oxygen = parseInput();
  const co2 = parseInput();

  const filterdCo2Data = gnerateRating(co2, leastOccuredDigit)[0];
  const filterdOxygenData = gnerateRating(oxygen, mostOccuredDigit)[0];
  // console.log(filterdCo2Data);

  const decimalValueOfFilteredCo2 = parseInt(filterdCo2Data, 2);
  const decimalValueOfFilteredO2 = parseInt(filterdOxygenData, 2);

  console.log(decimalValueOfFilteredCo2 * decimalValueOfFilteredO2);
};

main();

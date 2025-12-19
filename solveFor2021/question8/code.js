const input = Deno.readTextFileSync("./solveFor2021/question8/input.txt");

const digits = {
  0: "abcefg",
  1: "cf",
  2: "acdeg",
  3: "acdfg",
  4: "bcdf",
  5: "abdfg",
  6: "abdfge",
  7: "acf",
  8: "abcdfeg",
  9: "abcdfg",
};

const uniqueDigitCounts = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

const dbg = (x) => console.log(x) || x;

const uniqueDigitTable = (uniqueSignalArray, table) => {
  uniqueSignalArray.forEach((uniqueSignal) => {
    for (const key in digits) {
      const currentDigit = digits[key];
      if (
        uniqueSignal.length in uniqueDigitCounts &&
        currentDigit.length === uniqueSignal.length
      ) {
        table[uniqueSignal] = key;
      }
    }
  });
};

const getKey = (obj, value) => {
  for (const key in obj) {
    if (obj[key] === value) return key;
  }
};

const fiveDigitTable = (uniqueSignal, table) => {
  if (
    !(uniqueSignal.length in table) &&
    [...getKey(table, "1")].every((ele) => uniqueSignal.includes(ele))
  ) {
    table[uniqueSignal] = "3";
    return;
  }
  const fourDecodedStr = getKey(table, "4");
  const matchWithCurrentSignal = [...uniqueSignal].reduce(
    (count, ele) => fourDecodedStr.includes(ele) ? count + 1 : count,
    0,
  );

  table[uniqueSignal] = (matchWithCurrentSignal === 3) ? "5" : "2";
};

const sixDigitTable = (uniqueSignal, table) => {
  const fourDecodedStr = getKey(table, "4");
  const matchWithCurrentSignal = [...uniqueSignal].reduce(
    (count, ele) => fourDecodedStr.includes(ele) ? count + 1 : count,
    0,
  );

  if (matchWithCurrentSignal === 4) {
    table[uniqueSignal] = "9";
    return;
  }

  const oneDecodedStr = getKey(table, "1");
  const matchWithCurrentSignalForOne = [...uniqueSignal].reduce(
    (count, ele) => oneDecodedStr.includes(ele) ? count + 1 : count,
    0,
  );
  table[uniqueSignal] = (matchWithCurrentSignalForOne === 2) ? "0" : "6";
};

const chooseFn = {
  5: fiveDigitTable,
  6: sixDigitTable,
};

const decodedTable = (tableArray, uniqueSignals) => {
  const table = {};
  const uniqueSignalArray = uniqueSignals.split(" ");
  uniqueDigitTable(uniqueSignalArray, table);

  uniqueSignalArray.forEach((uniqueSignal) => {
    chooseFn[uniqueSignal.length]
      ? chooseFn[uniqueSignal.length](uniqueSignal, table)
      : "";
  });

  return tableArray.push(table) && tableArray;
};

const parseInput = () => {
  const signals = input.split("\n").map((ele) => {
    const splittedStr = ele.split("|").map((x) => x.trim());
    return { uniqueSignal: splittedStr[0], outputValue: splittedStr[1] };
  });

  return signals;
};

const countUniqueDigitsSingleOutput = (outputValues) => {
  const parseOutput = outputValues.split(" ");
  return parseOutput.reduce(
    (count, ele) => ele.length in uniqueDigitCounts ? count + 1 : count,
    0,
  );
};

const countUniqueDigits = (signals) => {
  return signals.reduce(
    (count, signal) =>
      count += countUniqueDigitsSingleOutput(signal.outputValue),
    0,
  );
};

const mapScrambleInput = (signal) => {
  const mappedTable = signal.reduce(
    (table, ele) => decodedTable(table, ele.uniqueSignal),
    [],
  );

  return mappedTable;
};

const mappedIntoNumber = (mappedValues, value) => {
  for (const key in mappedValues) {
    if (
      [...key].every((k) => value.includes(k)) && key.length === value.length
    ) return mappedValues[key];
  }
};

const mappedAllOutPutIntoNumber = (mappedValues, outputs) => {
  return outputs.reduce(
    (number, ele) => number += mappedIntoNumber(mappedValues, ele),
    "",
  );
};

const mappedAllSignalsIntoNumber = (mappedValues, outputs) =>
  outputs.reduce(
    (sum, ele, i) => {
      const number = mappedAllOutPutIntoNumber(
        mappedValues[i],
        ele.split(" "),
      );

      sum += parseInt(number);
      return sum;
    },
    0,
  );

const main = () => {
  const parsedInput = parseInput();
  const mappedTable = mapScrambleInput(parsedInput);
  const onlyOutputs = parsedInput.map((ele) => ele.outputValue);
  // console.log({ mappedTable, onlyOutputs });
  const sum = mappedAllSignalsIntoNumber(mappedTable, onlyOutputs);
  console.log(sum);
  // const uniqueDigitsCount = countUniqueDigits(parsedInput);
  // console.log(uniqueDigitsCount);
};

main();

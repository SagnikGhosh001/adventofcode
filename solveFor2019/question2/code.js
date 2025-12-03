let input = "";

const operation = {
  1: (x, y) => x + y,
  2: (x, y) => x * y,
};

const intcode = (array) => {
  const copyArray = [...array];
  for (let index = 0; index < copyArray.length; index += 4) {
    if (copyArray[index] === 99) break;

    const result = operation[copyArray[index]](
      copyArray[copyArray[index + 1]],
      copyArray[copyArray[index + 2]],
    );
    copyArray[copyArray[index + 3]] = result;
  }

  if (copyArray[0] === 19690720) return true;
  return false;
};

try {
  input = Deno.readTextFileSync("./solveFor2019/question2/input.txt");
} catch (error) {
  throw error;
}

const inputIntoArray = input.split(",").map((x) => +x);

const tryAllPossibleCombo = () => {
  let copy = [...inputIntoArray];
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      copy[1] = i;
      copy[2] = j;
      const result = intcode(copy);
      if (result) return { i, j };
      copy = [...inputIntoArray];
    }
  }
};

const result = tryAllPossibleCombo();
console.log(result);

console.log(100 * result.i + result.j);

const fuleForOne = (mass) => {
  if ((Math.floor(mass / 3) - 2) < 0) return 0;
  const sum = Math.floor(mass / 3) - 2;
  return sum + fuleForOne(sum);
};

const calculateTotalFuel = (input) => {
  return input.reduce((sum, ele) => sum + fuleForOne(ele), 0);
};

let input = "";

try {
  input = Deno.readTextFileSync("./solveFor2019/question1/input.txt");
} catch (error) {
  throw error;
}

const inputIntoArray = input.split("\n").map((x) => +x);

console.log(calculateTotalFuel(inputIntoArray));

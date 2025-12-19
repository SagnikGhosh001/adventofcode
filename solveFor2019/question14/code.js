const input = Deno.readTextFileSync("./solveFor2019/question14/input.txt");

const parseInput = () => {
  const splitedInput = input.split("\n")
    .map((ele) => ele.split("=>"))
    .map((ele) => ele.map((e) => e.split(",")));

  const obj = splitedInput.reduce((object, ele) => {
    console.log(ele);
  }, {});

  console.log(splitedInput);
};

parseInput();

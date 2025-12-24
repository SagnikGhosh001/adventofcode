const input = Deno.readTextFileSync("./solveFor2019/question18/input.txt");
let grid = [];

const extractCoord = () => {
  const entrace = [];
  const keys = [];
  const doors = [];

  grid = input.split("\n").map((ele) => [...ele]);
  grid.forEach((row, i) => {
    for (let index = 0; index < row.length; index++) {
      if (row[index] === "@") entrace.push({ x: i, y: index });
      if (
        row[index].toLowerCase() === row[index] && !"#.@".includes(row[index])
      ) {
        keys.push({ x: i, y: index });
      }
      if (
        row[index].toUpperCase() === row[index] && !"#.@".includes(row[index])
      ) {
        doors.push({ x: i, y: index });
      }
    }
  });

  return { entrace, keys, doors };
};

const main = () => {
  const { entrace, keys, doors } = extractCoord();
  console.log({ entrace, keys, doors });
  console.log(input);
};

main();

const data = Deno.readTextFileSync("./solveFor2019/question8/input.txt");
// const data = "0222112222120000";
const grid = [];

const structureData = () => {
  let index = 0;
  let colData = [];

  while (index < data.length) {
    colData.push(data[index]);
    index++;

    if (index % 150 === 0) {
      grid.push(colData);
      colData = [];
    }
  }
};

// const count = (array, ele) => {
//   let count = 0;
//   for (let index = 0; index < array.length; index++) {
//     if (array[index] === ele) count++;
//   }
//   return count;
// };

// const findLowestNumberOfZero = () => {
//   let lowestZeroRow = -1;
//   let lowestZeroCount = +Infinity;

//   for (let row = 0; row < grid.length; row++) {
//     const zeroCount = count(grid[row], "0");
//     if (zeroCount < lowestZeroCount) {
//       lowestZeroRow = row;
//       lowestZeroCount = zeroCount;
//     }
//   }

//   return lowestZeroRow;
// };

const getPixel = () => {
  const pixels = [];

  for (let i = 0; i < 150; i++) {
    for (let j = 0; j < 100; j++) {
      if (grid[j][i] !== "2") {
        pixels.push(grid[j][i]);
        break;
      }
    }
  }

  return pixels;
};
//11232422

//1123
//2422
const main = () => {
  structureData();
  const pixels = getPixel().join("");

  for (let i = 0; i < 6; i++) {
    let row = "";
    for (let j = 0; j < 25; j++) {
      const pixel = pixels[25 * i + j];
      row += pixel === "1" ? "⬜️" : "⬛";
    }
    console.log(row);
  }
  // const lowestZeroRow = findLowestNumberOfZero();
  // const countNumberOfOne = count(grid[lowestZeroRow], "1");
  // const countNumberOfTwo = count(grid[lowestZeroRow], "2");
  // return countNumberOfOne * countNumberOfTwo;
};

main();

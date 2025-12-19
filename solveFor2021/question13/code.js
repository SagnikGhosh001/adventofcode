const input = Deno.readTextFileSync("./solveFor2021/question13/input.txt");
const dbg = (x) => console.log(x) || x;

const parseInput = () => {
  const coordinates = input.split("\n");

  return coordinates.map((ele) => {
    const [x, y] = ele.split(",").map((x) => +x);
    return { x, y };
  });
};

const foldingAccordingly = (axis, value, coordinates, uniq) => {
  coordinates.forEach((coord) => {
    let x = coord.x;
    let y = coord.y;
    if (axis === "x" && x > value) x = 2 * value - x;
    if (axis === "y" && y > value) y = 2 * value - y;
    uniq.add(`${x},${y}`);
  });
};

const parseCoordinates = (uniq) => {
  return Array.from(uniq).map((s) => {
    const [x, y] = s.split(",").map((x) => +x);
    return { x, y };
  });
};

const drawImage = (coordinates) => {
  const allY = coordinates.map((ele) => ele.y);
  const allX = coordinates.map((ele) => ele.x);
  const minX = Math.min(...allX);
  const minY = Math.min(...allY);
  const maxX = Math.max(...allX);
  const maxY = Math.max(...allY);

  for (let y = minY; y <= maxY; y++) {
    let line = "";
    for (let x = minX; x <= maxX; x++) {
      line += coordinates.some((ele) => ele.x === x && ele.y === y)
        ? "⬜️"
        : "  ";
    }

    console.log(line);
  }
};
const main = () => {
  const foldingsAxis = [
    "x",
    "y",
    "x",
    "y",
    "x",
    "y",
    "x",
    "y",
    "x",
    "y",
    "y",
    "y",
  ];
  const foldingsValues = [655, 447, 327, 223, 163, 111, 81, 55, 40, 27, 13, 6];
  let coordinates = parseInput();

  for (let index = 0; index < foldingsAxis.length; index++) {
    const uniq = new Set();
    foldingAccordingly(
      foldingsAxis[index],
      foldingsValues[index],
      coordinates,
      uniq,
    );
    coordinates = parseCoordinates(uniq);
  }

  drawImage(coordinates);
  console.log(coordinates.length);
};

main();

const input = Deno.readTextFileSync("./solveFor2021/question5/input.txt");

const parseInput = () =>
  input.split("\n")
    .map((ele) => ele.split(" -> ").map((ele) => ele.split(",").map((x) => +x)))
    .reduce((points, ele) => {
      const point1 = { x: ele[0][0], y: ele[0][1] };
      const point2 = { x: ele[1][0], y: ele[1][1] };
      return points.push([point1, point2]) && points;
    }, []);

const findIntersection = (start, end, intersections) => {
  const dx = Math.sign(end.x - start.x);
  const dy = Math.sign(end.y - start.y);
  const isDxNotZero = dx !== 0;
  const isDyNotZero = dy !== 0;

  // if (isDxNotZero && isDyNotZero) return;

  let x = start.x;
  let y = start.y;

  while (true) {
    const key = `${x},${y}`;
    intersections[key] = (intersections[key] || 0) + 1;
    if (x === end.x && y === end.y) return;
    x += dx;
    y += dy;
  }
};

const main = () => {
  const parsedInput = parseInput();
  const intersections = {};

  parsedInput.forEach((ele) => {
    const start = ele[0];
    const end = ele[1];
    findIntersection(start, end, intersections);
  });

  console.log(intersections);

  console.log(Object.values(intersections).filter((x) => x >= 2).length);
};

main();

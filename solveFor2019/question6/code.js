import { intersect } from "jsr:@std/collections/intersect";

const input = Deno.readTextFileSync("./solveFor2019/question6/input.txt");
const inputArray = input.split("\n");
const obj = inputArray.reduce((obj, ele) => {
  const [parent, child] = ele.split(")");
  obj[child] = parent;
  return obj;
}, {});

const findOrbit = (ele, path = []) => {
  const parent = obj[ele];
  if (parent === "COM") return path;
  path.push(parent);
  return findOrbit(parent, path);
};

const findTotalOrbit = (ele) => {
  let path = [];
  for (const key in obj) {
    if (key === ele) {
      path = findOrbit(obj[key]);
    }
  }

  return path;
};

const main = () => {
  const myPath = findTotalOrbit("YOU");
  const santaPath = findTotalOrbit("SAN");
  const intersectPoint = intersect(myPath, santaPath)[0];
  // console.log({ myPath, santaPath, intersectPoint });

  console.log(
    myPath.indexOf(intersectPoint) + santaPath.indexOf(intersectPoint) + 2,
  );
};

main();
// console.log(findTotalOrbit(), { obj });

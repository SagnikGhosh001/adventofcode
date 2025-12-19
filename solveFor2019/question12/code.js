import { deep_equals } from "jsr:@ordo-pink/deep-equals";
import { lcm } from "@babia/tiny-math";

const compareDistance = (pos1, pos2, vel1, vel2, key) => {
  if (pos1[key] > pos2[key]) {
    vel1[key] -= 1;
    vel2[key] += 1;
  } else if (pos1[key] < pos2[key]) {
    vel1[key] += 1;
    vel2[key] -= 1;
  }
};

let stars = [
  { pos: { x: 0, y: 6, z: 1 }, vel: { x: 0, y: 0, z: 0 } },
  { pos: { x: 4, y: 4, z: 19 }, vel: { x: 0, y: 0, z: 0 } },
  { pos: { x: -11, y: 1, z: 8 }, vel: { x: 0, y: 0, z: 0 } },
  { pos: { x: 2, y: 19, z: 15 }, vel: { x: 0, y: 0, z: 0 } },
];

const initialState = [
  { pos: { x: 0, y: 6, z: 1 }, vel: { x: 0, y: 0, z: 0 } },
  { pos: { x: 4, y: 4, z: 19 }, vel: { x: 0, y: 0, z: 0 } },
  { pos: { x: -11, y: 1, z: 8 }, vel: { x: 0, y: 0, z: 0 } },
  { pos: { x: 2, y: 19, z: 15 }, vel: { x: 0, y: 0, z: 0 } },
];

// const stars = [
//   { pos: [-1, 0, 2], vel: [0, 0, 0] },
//   { pos: [2, -10, -7], vel: [0, 0, 0] },
//   { pos: [4, -8, 8], vel: [0, 0, 0] },
//   { pos: [3, 5, -1], vel: [0, 0, 0] },
// ];

// const initialState = [
//   { pos: [-1, 0, 2], vel: [0, 0, 0] },
//   { pos: [2, -10, -7], vel: [0, 0, 0] },
//   { pos: [4, -8, 8], vel: [0, 0, 0] },
//   { pos: [3, 5, -1], vel: [0, 0, 0] },
// ];

const comapreForAll = () => {
  for (let star = 0; star < stars.length - 1; star++) {
    for (let nextStar = star + 1; nextStar < stars.length; nextStar++) {
      for (const key in stars[star].pos) {
        compareDistance(
          stars[star].pos,
          stars[nextStar].pos,
          stars[star].vel,
          stars[nextStar].vel,
          key,
        );
      }
    }
  }
};

const applyVelocity = () => {
  for (const star of stars) {
    for (const key in star.pos) {
      star.pos[key] += star.vel[key];
    }
  }
};

const calculateEnergy = () => {
  let t = 0;

  for (const star of stars) {
    let k = 0;
    let p = 0;
    for (const key in star.pos) {
      p += Math.abs(star.pos[key]);
      k += Math.abs(star.vel[key]);
    }
    t += k * p;
  }

  return t;
};

const cloneStars = (arr) =>
  arr.map((s) => ({
    pos: { ...s.pos },
    vel: { ...s.vel },
  }));

const main = () => {
  // for (let term = 0; term < 1000; term++) {
  //   comapreForAll();
  //   applyVelocity();
  // }
  const allX = stars.map(({ pos, vel }) => [pos.x, vel.x]);
  const allY = stars.map(({ pos, vel }) => [pos.y, vel.y]);
  const allZ = stars.map(({ pos, vel }) => [pos.z, vel.z]);
  let xRepeat = 0;

  while (true) {
    comapreForAll();
    applyVelocity();
    xRepeat++;
    if (deep_equals(stars.map(({ pos, vel }) => [pos.x, vel.x]), allX)) {
      break;
    }
  }

  stars = cloneStars(initialState);
  console.log(stars, "after get x");

  let yRepeat = 0;

  while (true) {
    comapreForAll();
    applyVelocity();
    yRepeat++;
    if (deep_equals(stars.map(({ pos, vel }) => [pos.y, vel.y]), allY)) {
      break;
    }
  }

  console.log(stars, "after get y");
  let zRepeat = 0;
  stars = cloneStars(initialState);
  while (true) {
    comapreForAll();
    applyVelocity();
    zRepeat++;
    if (deep_equals(stars.map(({ pos, vel }) => [pos.z, vel.z]), allZ)) {
      break;
    }
  }
  console.log(stars, "after getting z");

  console.log(xRepeat, yRepeat, zRepeat);

  // const totalEnergy = calculateEnergy();
  console.log(initialState, "initial");
  console.log(lcm(xRepeat, yRepeat, zRepeat), "repeat");
  // console.log(totalEnergy);
};

main();

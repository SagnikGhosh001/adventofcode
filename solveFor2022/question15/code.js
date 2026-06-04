const input = Deno.readTextFileSync("solveFor2022/question15/input.txt");

const parseInput = () =>
  input.split("\n")
    .map((ele) =>
      ele.split(":").map((e) => e.split("at ")[1]).map((ele) =>
        ele.split(", ").map((ele) => Number(ele.split("=")[1]))
      )
    );

const calculateDistance = (sensorLoc, beaconLoc) =>
  Math.abs(beaconLoc[0] - sensorLoc[0]) + Math.abs(beaconLoc[1] - sensorLoc[1]);

const calculateRangeOnRow = (sensorLoc, beaconLoc, targetRow) => {
  const distance = calculateDistance(sensorLoc, beaconLoc);
  const verticalDistance = Math.abs(sensorLoc[1] - targetRow);
  const remaining = distance - verticalDistance;
  if (remaining < 0) return null;

  const start = sensorLoc[0] - remaining;
  const end = sensorLoc[0] + remaining;
  return [start, end];
};

const mergeRanges = (ranges) => {
  ranges = ranges.filter((r) => r !== null).sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (const [start, end] of ranges) {
    const lastRange = merged[merged.length - 1];
    if (merged.length === 0 || start > lastRange[1] + 1) {
      merged.push([start, end]);
    } else {
      lastRange[1] = Math.max(lastRange[1], end);
    }
  }

  return merged;
};

const part1 = () => {
  const targetRow = 2000000;
  const locations = parseInput();
  const ranges = [];

  for (const [sensor, beacon] of locations) {
    const range = calculateRangeOnRow(sensor, beacon, targetRow);
    if (range) ranges.push(range);
  }

  const merged = mergeRanges(ranges);

  let count = 0;

  for (const [start, end] of merged) {
    count += end - start + 1;
  }

  const beaconsOnRow = new Set();

  for (const [, beacon] of locations) {
    if (beacon[1] === targetRow) {
      beaconsOnRow.add(beacon[0]);
    }
  }

  console.log({ merged, count: count - beaconsOnRow.size });
};

part1();

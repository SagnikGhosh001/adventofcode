const input = Deno.readTextFileSync("solveFor2022/question16/input.txt");

const parseInput = () => {
  const valves = {};
  input.split("\n").forEach((ele) => {
    const sliceOffset = ele.indexOf(" ") + 1;
    const valveName = ele.slice(sliceOffset, ele.indexOf(" ", sliceOffset));
    valves[valveName] = {};
    const flowRate = +ele.slice(ele.indexOf("=") + 1, ele.indexOf(";"));
    valves[valveName]["flowRate"] = flowRate;
    const leadingTunnelString = ele.split("; ")[1].split("valve")[1];
    const leadingTunnel = leadingTunnelString.slice(
      leadingTunnelString.indexOf(" ") + 1,
    ).split(", ");

    valves[valveName]["leadingTunnels"] = leadingTunnel;
    valves[valveName]["opened"] = false;
  });

  return valves;
};

const calculateDistance = (start, graph) => {
  const queue = [[start, 0]];
  const visited = new Set([start]);
  const dists = {};

  while (queue.length) {
    const [valve, dist] = queue.shift();
    if (graph[valve].flowRate > 0 && valve !== start) dists[valve] = dist;

    for (const possibleValve of graph[valve].leadingTunnels) {
      if (!visited.has(possibleValve)) {
        visited.add(possibleValve);
        queue.push([possibleValve, dist + 1]);
      }
    }
  }

  return dists;
};

const calulatePressure = (
  graph,
  currentValve,
  usefulValves,
  distances,
  time,
  opened,
) => {
  let maxPressure = 0;
  for (const nextvalve of usefulValves) {
    const timeCost = distances[currentValve][nextvalve] + 1;
    if (timeCost > time) continue;

    const remainingTime = time - timeCost;
    const newOpened = new Set();
  }
};

const part1 = () => {
  const valves = parseInput();

  const usefulValves = Object.keys(valves)
    .filter((v) => valves[v].flowRate > 0 || v === "AA");

  const distances = {};

  for (const valve of usefulValves) {
    distances[valve] = calculateDistance(valve, valves);
  }

  calulatePressure(valves, "AA", distances, usefulValves, 30, new Set());
};

part1();

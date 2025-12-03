const inst1 = "R2";
const inst2 = "U2,R1,D1";
const directions = (x, y, offset, d) => {
  const moves = {
    R: { x, y: y + offset },
    L: { x, y: y - offset },
    U: { x: x - offset, y },
    D: { x: x + offset, y },
  };

  return moves[d];
};

const wiresUpdatedLoc = (x, y, inst) => {
  const offset = inst ? +inst.slice(1) : 0;
  const heading = inst ? inst[0] : "R";
  return directions(x, y, offset, heading);
};

const isIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  return d !== 0;
};

const findInterSection = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  const d = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
  return {
    x: ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / d,
    y: ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / d,
  };
};

const run = () => {
  const firstWire = { x: 0, y: 0, inst: inst1.split(",") };
  const secondWire = { x: 0, y: 0, inst: inst2.split(",") };
  let minDistance = Infinity;
  let index = 0;
  let canPerform = false;
  while (index < firstWire.inst.length || index < secondWire.inst.length) {
    const firstWireUpdatedLoc = wiresUpdatedLoc(
      firstWire.x,
      firstWire.y,
      firstWire.inst[index],
    );

    const secondWireUpdatedLoc = wiresUpdatedLoc(
      secondWire.x,
      secondWire.y,
      secondWire.inst[index],
    );

    if (
      canPerform &&
      isIntersect(
        firstWire.x,
        firstWire.y,
        firstWireUpdatedLoc.x,
        firstWireUpdatedLoc.y,
        secondWire.x,
        secondWire.y,
        secondWireUpdatedLoc.x,
        secondWireUpdatedLoc.y,
      )
    ) {
      const intersectPoint = findInterSection(
        firstWire.x,
        firstWire.y,
        firstWireUpdatedLoc.x,
        firstWireUpdatedLoc.y,
        secondWire.x,
        secondWire.y,
        secondWireUpdatedLoc.x,
        secondWireUpdatedLoc.y,
      );

      console.log({ firstWire, secondWire, intersectPoint });
      const distance = Math.abs(0 - intersectPoint.x) +
        Math.abs(0 - intersectPoint.y);

      minDistance = Math.min(distance, minDistance);
    }

    firstWire.x = firstWireUpdatedLoc.x;
    firstWire.y = firstWireUpdatedLoc.y;
    secondWire.x = secondWireUpdatedLoc.x;
    secondWire.y = secondWireUpdatedLoc.y;

    canPerform = true;

    index++;
  }

  return minDistance;
};

console.log(run());

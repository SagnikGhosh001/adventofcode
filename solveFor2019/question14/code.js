const input = Deno.readTextFileSync("./solveFor2019/question14/input.txt");

const parseOre = (ele, producer) => {
  const leftSide = ele[0].split(" ");
  const rightSide = ele[1].split(" ");
  producer.push({ [leftSide[1]]: +leftSide[0], [rightSide[1]]: +rightSide[0] });
};

const parseFinalReaction = (ele, finalReaction) => {
  const currentReaction = {};
  ele.split(", ").forEach((e) => {
    const [amount, chemical] = e.split(" ");
    currentReaction[chemical] = +amount;
  });

  finalReaction.push(currentReaction);
};

const parseMiddleReaction = (ele, middleReactions) => {
  const [input, output] = ele;
  const currentReaction = {};

  input.split(", ").forEach((e) => {
    const [amount, chemical] = e.split(" ");
    currentReaction[chemical] = +amount;
  });

  const parsedOutput = output.split(" ");
  middleReactions.push({
    input: currentReaction,
    output: { [parsedOutput[1]]: +parsedOutput[0] },
  });
};

const parseInput = () => {
  const producer = [];
  const finalReaction = [];
  const middleReactions = [];

  input.split("\n")
    .map((ele) => ele.split(" => "))
    .forEach((ele) => {
      if (ele[0].includes("ORE")) parseOre(ele, producer);
      else if (ele[1].includes("FUEL")) {
        parseFinalReaction(ele[0], finalReaction);
      } else parseMiddleReaction(ele, middleReactions);
    });

  return { producer, finalReaction, middleReactions };
};

const need = {};
const extra = {};

const calulateNeed = (ele, amount) => {
  need[ele] = (need[ele] || 0) + amount;
};

const isProducedFromOre = (ele, producer) => {
  for (const element of producer) {
    for (const key in element) {
      if (key === ele) return true;
    }
  }

  return false;
};

const checkInMiddleReaction = (
  ele,
  middleReactions,
  producer,
  amountNeeded,
) => {
  for (const element of middleReactions) {
    if (ele in element.output) {
      const available = extra[ele] || 0;
      const remainingNeeded = amountNeeded - available;
      extra[ele] = Math.max(0, available - amountNeeded);
      if (remainingNeeded <= 0) return;
      const outputPerBatch = element.output[ele];
      const batches = Math.ceil(remainingNeeded / outputPerBatch);
      const produced = batches * outputPerBatch;
      const leftover = produced - remainingNeeded;
      extra[ele] = (extra[ele] || 0) + leftover;

      checkElementInProducer(element.input, producer, middleReactions, batches);
      return;
    }
  }
};

const checkElementInProducer = (
  finalReaction,
  producer,
  middleReactions,
  multiplier,
) => {
  for (const key in finalReaction) {
    const amountNeeded = finalReaction[key] * multiplier;

    if (isProducedFromOre(key, producer)) {
      calulateNeed(key, amountNeeded);
    } else {
      checkInMiddleReaction(key, middleReactions, producer, amountNeeded);
    }
  }
};

const caluclateTotalOre = (producer) => {
  let totalOre = 0;

  for (const key in need) {
    for (const element of producer) {
      if (key in element) {
        const batches = Math.ceil(need[key] / element[key]);
        totalOre += batches * element.ORE;
      }
    }
  }

  return totalOre;
};

const main = () => {
  const { producer, finalReaction, middleReactions } = parseInput();
  checkElementInProducer(finalReaction[0], producer, middleReactions, 1);
  const totalOre = caluclateTotalOre(producer);
  console.log(need);
  console.log({ totalOre });
  // console.log({ producer, finalReaction, middleReactions });
};

main();

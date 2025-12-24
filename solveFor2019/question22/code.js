const dealIntoNewStack = (deck) => deck.reverse();

const cut = (deck, n) => {
  if (Math.sign(n) === 1) {
    const cards = deck.splice(0, n);
    deck.push(...cards);
  } else {
    const cards = deck.splice(n);
    deck.unshift(...cards);
  }
};

const dealWithIncreament = (deck, n) => {
  const newDeck = [];
  let newDeckIndex = 0;

  for (let index = 0; index < deck.length; index++) {
    newDeck[newDeckIndex] = deck[index];
    newDeckIndex = (newDeckIndex + n) % deck.length;
  }

  return newDeck;
};

const modExp = (a, times, mod) => {
  let result = 1n;

  while (times > 0n) {
    if (times % 2n === 1n) result = (result * a) % mod;
    a = (a * a) % mod;
    times = times / 2n;
  }

  return result;
};

const modInverse = (a, mod) => modExp(a, mod - 2n, mod);

const main = () => {
  const length = 119315717514047n;
  const times = 101741582076661n;
  const targetPos = 2020n;

  const instruction = Deno.readTextFileSync(
    "./solveFor2019/question22/input.txt",
  );

  let a = 1n;
  let b = 0n;

  instruction.split("\n").forEach((line) => {
    if (line.includes("deal into new stack")) {
      a = (length - a) % length;
      b = (length - 1n - b) % length;
    } else if (line.includes("cut ")) {
      const n = BigInt(line.split(" ").pop());
      b = (b - n + length) % length;
    } else if (line.includes("deal with increment ")) {
      const n = BigInt(line.split(" ").pop());
      a = (a * n) % length;
      b = (b * n) % length;
    }
  });

  const aT = modExp(a, times, length);
  const bT = (b * (1n - modExp(a, times, length) + length) *
    modInverse(1n - a + length, length)) % length;

  const card = (targetPos - bT + length) * modInverse(aT, length) % length;

  console.log(card.toString());
};

main();

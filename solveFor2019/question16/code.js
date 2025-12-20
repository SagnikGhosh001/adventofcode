// const input = "02935109699940807407585447034323";
const input =
  "59749012692497360857047467554796667139266971954850723493205431123165826080869880148759586023048633544809012786925668551639957826693687972765764376332866751104713940802555266397289142675218037547096634248307260671899871548313611756525442595930474639845266351381011380170903695947253040751698337167594183713030695951696818950161554630424143678657203441568388368475123279525515262317457621810448095399401556723919452322199989580496608898965260381604485810760050252737127446449982328185199195622241930968611065497781555948187157418339240689789877555108205275435831320988202725926797165070246910002881692028525921087207954194585166525017611171911807360959";

const pattern = [0, 1, 0, -1];
const makeRepeatationArray = (pos, length) => {
  const repeatationArray = [];

  for (let i = 0; i < length; i++) {
    repeatationArray.push(
      pattern[Math.floor((i + 1) / (pos + 1)) % pattern.length],
    );
  }

  return repeatationArray;
};

const getPhaseResult = (inputArray, repeatedValue) =>
  inputArray.reduce(
    (result, element, i) => result += element * repeatedValue[i],
    0,
  );

const part1 = () => {
  let inputArray = [...input].map(Number);

  for (let time = 0; time < 100; time++) {
    const newStringArray = [];
    for (let pos = 0; pos < inputArray.length; pos++) {
      const repeatedValue = makeRepeatationArray(pos, inputArray.length);
      const phaseResult = getPhaseResult(inputArray, repeatedValue);

      const lastDigit = Math.abs(phaseResult % 10);
      newStringArray.push(lastDigit);
    }

    inputArray = [...newStringArray];
  }

  console.log(inputArray.slice(0, 8).join(""));
};

part1();

const part2 = () => {
  const largeInput = input.repeat(10000);
  const messageOffset = +input.slice(0, 7);
  const inputArray = [...largeInput].map(Number);

  let relevantInput = inputArray.slice(messageOffset);

  for (let time = 0; time < 100; time++) {
    const newArray = [];
    let sum = 0;
    for (let i = relevantInput.length - 1; i >= 0; i--) {
      sum += relevantInput[i];
      newArray[i] = Math.abs(sum) % 10;
    }
    relevantInput = [...newArray];
  }

  console.log(relevantInput.slice(0, 8).join(""));
};

part2();

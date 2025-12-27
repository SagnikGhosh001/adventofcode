const input = Deno.readTextFileSync("./solveFor2022/question1/input.txt");

const calculateInventory = () => {
  const inventory = [];
  let sum = 0;

  input.split("\n").forEach((ele) => {
    if (ele === "") {
      inventory.push(sum);
      sum = 0;
      return;
    }

    sum += parseInt(ele);
  });

  inventory.push(sum);
  return inventory;
};

const part1 = () => {
  const eachElfInventory = calculateInventory();
  const maxCalories = Math.max(...eachElfInventory);
  console.log(maxCalories);
};

const part2 = () => {
  const eachElfInventory = calculateInventory();

  const topThreeCalories = eachElfInventory.toSorted((a, b) => b - a).slice(0,3);

  const totalCal = topThreeCalories.reduce((sum, ele) => sum += ele);
  console.log(totalCal);
};

part2();

const matched = [];

const checkHasDouble = (inputArray) => {
  let doubleCount = 0;
  let hasPerfectDouble = false;

  for (let i = 0; i < inputArray.length - 1; i++) {
    if (inputArray[i] > inputArray[i + 1]) {
      return false;
    }
    if (inputArray[i] === inputArray[i + 1]) {
      doubleCount++;
    } else {
      if (doubleCount === 1) hasPerfectDouble = true;
      doubleCount = 0;
    }
  }

  if (doubleCount === 1) hasPerfectDouble = true;
  return true && hasPerfectDouble;
};

for (let index = 271973; index <= 785961; index++) {
  const inputArray = [...index.toString()];
  if (checkHasDouble(inputArray)) matched.push(index);
}

console.log(matched.length);

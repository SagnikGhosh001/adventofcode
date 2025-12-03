const matched = [];

for (let index = 271973; index <= 785961; index++) {
  const inputArray = [...index.toString()];
  let isMatch = true;
  let doubleCount = 0;

  for (let index = 0; index < inputArray.length - 1; index++) {
    if (!isMatch) break;
    if (inputArray[index] === inputArray[index + 1]) {
      doubleCount++;
      break;
    }
    if (inputArray[index] > inputArray[index + 1]) {
      isMatch = false;
      break;
    }
  }

  if (isMatch && doubleCount > 0) matched.push(index);
}

console.log(matched.length);

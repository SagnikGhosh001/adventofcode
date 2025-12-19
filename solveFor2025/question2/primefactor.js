const isPrime = (number) => {
  if (number < 2) true;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }

  return true;
};

const calculatePrimeFactor = (number, currentFactors, primeFactors, i = 0) => {
  if (isPrime(number)) return primeFactors.push([1, number]) && primeFactors;

  currentFactors.push(1);
  primeFactors.push([]);

  for (let divisor = number - 1; divisor > 1; divisor--) {
    if (number % divisor === 0) {
      currentFactors.push(divisor);
      calculatePrimeFactor(divisor, [], primeFactors, i + 1);
      primeFactors[i].push([...currentFactors]);
    }
  }

  return primeFactors;
};

calculatePrimeFactor(12, [], []);

function factorial(n) {
  if (n < 0) throw 'n<0';
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

function getPermutationWithDuplicates(placesLength, elementsLength, index) {
  if (index >= elementsLength ** placesLength) throw 'outside of range';
  const result = new Uint8Array(placesLength);
  let reminder = index;
  let i = 0;
  while (reminder > 0) {
    result[placesLength - i - 1] = reminder % elementsLength;
    reminder = Math.floor(reminder / elementsLength);
    i++;
  }
  return result;
}

function getPermutationImplementation(result, index, current) {
  if (current === result.length - 1) return;
  const partitionLength = factorial(result.length - current - 1);
  const swapIndex = current + Math.floor(index / partitionLength);
  index = index - Math.floor(index / partitionLength) * partitionLength;
  const temp = result[swapIndex];
  result[swapIndex] = result[current];
  result[current] = temp;
  getPermutationImplementation(result, index, current + 1);
}

function getPermutation(placesLength, index) {
  if (index >= factorial(placesLength)) throw 'outside of range';
  const result = Uint8Array.from({ length: placesLength }, (_, i) => i);
  getPermutationImplementation(result, index, 0);
  return result;
}

module.exports = { getPermutationWithDuplicates, getPermutation, factorial };

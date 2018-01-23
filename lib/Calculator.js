const { split, splitWithout } = require('../lib');

function calculateImplementation(
  numbers,
  allOperations,
  operations,
  priorities,
  left,
  right,
) {
  if (left === right) return numbers[left];
  let index = left;
  for (let i = left + 1; i < right; i++)
    if (priorities[i] > priorities[index]) index = i;
  const operation = allOperations[operations[index]];
  return operation(
    calculateImplementation(
      numbers,
      allOperations,
      operations,
      priorities,
      left,
      index,
    ),

    calculateImplementation(
      numbers,
      allOperations,
      operations,
      priorities,
      index + 1,
      right,
    ),
  );
}

function calculate(numbers, allOperations, operations, priorities) {
  return calculateImplementation(
    numbers,
    allOperations,
    operations,
    priorities,
    0,
    numbers.length - 1,
  );
}

module.exports = { calculate };

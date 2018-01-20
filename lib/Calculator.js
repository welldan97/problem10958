const { split, splitWithout } = require('../lib');

function calculate(numbers, operations, priorities) {
  if (numbers.length === 1) return numbers[0];
  if (numbers.length === 2) return operations[0](...numbers);
  const max = Math.max(...priorities);
  const index = priorities.indexOf(max);
  const [operation, leftOperations, rightOperations] = splitWithout(
    operations,
    index,
  );
  const [priority, leftPriorities, rightPriorities] = splitWithout(
    priorities,
    index,
  );
  const [leftNumbers, rightNumbers] = split(numbers, index);
  return operation(
    calculate(leftNumbers, leftOperations, leftPriorities),
    calculate(rightNumbers, rightOperations, rightPriorities),
  );
}

module.exports = { calculate };


const {
  without,
  split,
  splitWithout,
  permutations,
  permutationsWithDuplicates,
} = require('./lib');

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

function func10958(
  generator,
  operations,
  each = () => {
    false;
  },
) {
  let numbers = [];
  while (true) {
    const next = generator.next();
    if (next.done) return;
    numbers = numbers.concat(next.value);
    let initializedOperationsGenerator = operationsGenerator(
      numbers.length,
      operations,
    );

    while (true) {
      const next = initializedOperationsGenerator.next();
      if (next.done) break;
      const { operations, priorities } = next.value;

      let result = calculate(numbers, operations, priorities);

      if (each({ numbers, operations, priorities, result }))
        return { numbers, operations, priorities, result };
    }
  }
}

module.exports = { func10958 };

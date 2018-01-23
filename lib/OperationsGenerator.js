const { factorial } = require('../lib');
const { permutationsWithDuplicates, permutations } = require('../lib');

function* operationsGenerator(length, allOperations) {
  if (length === 1) {
    return { operations: [], priorities: [] };
  }

  const operationsPermutations = permutationsWithDuplicates(
    length - 1,
    Array.from({ length: allOperations.length }, (_, i) => i),
  );
  const allPriorities = Array.from({ length: length - 1 }, (_, i) => i);
  const prioritiesPermutations = permutations(allPriorities);
  for (let i = 0; i < operationsPermutations.length; i++) {
    for (let j = 0; j < prioritiesPermutations.length; j++) {
      const value = {
        operations: operationsPermutations[i],
        priorities: prioritiesPermutations[j],
      };

      if (
        i === operationsPermutations.length - 1 &&
        j === prioritiesPermutations.length - 1
      )
        return value;

      yield value;
    }
  }
}

const DEFAULT_OPTIONS = {
  start: 0,
  length: Infinity,
};

class OperationsGenerator {
  constructor(numbers, operations, { start, length } = DEFAULT_OPTIONS) {
    this.operationsGenerator = operationsGenerator(numbers.length, operations);
    this.start = start;
    this.end = start + length - 1;

    this.index = -1;

    while (true) {
      this.next();
      if (this.index === start) return;
    }
  }

  next() {
    if (this.done) throw 'no more operations';
    const { value, done } = this.operationsGenerator.next();

    this.index = this.index + 1;

    this.value = value;
    this.done = done || this.index === this.end;
  }
}

OperationsGenerator.calculateLength = (numbersLength, operationsLength) => {
  return (
    Math.pow(operationsLength, numbersLength - 1) * factorial(numbersLength - 1)
  );
};

module.exports = OperationsGenerator;

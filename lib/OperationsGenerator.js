const {
  factorial,
  getPermutation,
  getPermutationWithDuplicates,
} = require('./Utils');

const DEFAULT_OPTIONS = {
  start: 0,
  length: Infinity,
};

function operationByIndex(numbers, operations, index) {
  if (numbers.length < 1) throw 'there are less than 1 number';
  if (numbers.length === 1) return { operations: [], priorities: [] };

  const prioritiesLength = factorial(numbers.length - 1);
  return {
    operations: getPermutationWithDuplicates(
      numbers.length - 1,
      operations.length,
      Math.floor(index / prioritiesLength),
    ),
    priorities: getPermutation(numbers.length - 1, index % prioritiesLength),
  };
}

class OperationsGenerator {
  constructor(numbers, operations, { start, length } = DEFAULT_OPTIONS) {
    this.numbers = numbers;
    this.operations = operations;
    this.start = start;
    const max =
      OperationsGenerator.calculateLength(numbers.length, operations.length) -
      1;
    this.end = Math.min(start + length - 1, max);
    this.index = this.start - 1;
    this.next();
  }

  next() {
    if (this.done) throw 'no more operations';
    this.index = this.index + 1;
    const value = operationByIndex(this.numbers, this.operations, this.index);
    this.value = value;
    this.done = this.index === this.end;
  }
}

OperationsGenerator.calculateLength = (numbersLength, operationsLength) => {
  if (numbersLength < 1) throw 'there are less than 1 number';
  if (numbersLength === 1) return 1;
  return (
    Math.pow(operationsLength, numbersLength - 1) * factorial(numbersLength - 1)
  );
};

module.exports = OperationsGenerator;

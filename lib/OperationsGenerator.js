const { factorial } = require('../lib');
const { permutationsWithDuplicates, permutations } = require('../lib');

function* operationsGenerator(length, allOperations) {
  if (length === 1) {
    return { operations: [], priorities: [] };
  }

  const operationsPermutations = permutationsWithDuplicates(
    length - 1,
    allOperations,
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

function calculateLength() {
  return (
    Math.pow(this.operations.length, this.numbersLength - 1) *
    factorial(this.numbersLength - 1)
  );
}

module.exports = {
  operationsGenerator,
  calculateLength,
};

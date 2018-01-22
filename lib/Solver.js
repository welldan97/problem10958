const CombinationGenerator = require('./CombinationGenerator');
const Calculator = require('./Calculator');

const BATCH_LENGTH = 200;
const DEFAULT_OPTIONS = {
  batchLength: Infinity,
  batchNumber: 0,
};

function run(
  numberGenerator,
  operations,
  forEach,
  { batchNumber, batchLength = BATCH_LENGTH } = DEFAULT_OPTIONS,
) {
  const combinationGenerator = new CombinationGenerator(
    numberGenerator,
    operations,
    { batchLength, batchNumber },
  );
  while (true) {
    const value = combinationGenerator.value;
    const result = Calculator.calculate(
      value.numbers,
      value.operations,
      value.priorities,
    );
    const done = forEach({
      ...value,
      result,
      index: combinationGenerator.index,
    });
    if (done || combinationGenerator.done) return;
    combinationGenerator.next();
  }
}

module.exports = { run };

const OperationsGenerator = require('./OperationsGenerator');
const NumberGenerator = require('./NumberGenerator');
const BATCH_LENGTH = 200;
const DEFAULT_OPTIONS = {
  batchLength: Infinity,
  batchNumber: 0,
};

class CombinationGenerator {
  constructor(
    numberGenerator,
    operations,
    { batchLength, batchNumber = BATCH_LENGTH } = DEFAULT_OPTIONS,
  ) {
    this.operations = operations;
    this.numberGenerator = new NumberGenerator(numberGenerator, {
      batchLength,
      batchNumber,
      variationsCount: numbers =>
        OperationsGenerator.calculateLength(numbers.length, operations.length),
    });
    this.resetOperationsGenerator();
    this.setState();
  }

  setState() {
    this.value = {
      numbers: this.numberGenerator.value,
      ...this.operationsGenerator.value,
    };
    this.done = this.numberGenerator.done && this.operationsGenerator.done;
    this.index = this.numberGenerator.index + this.operationsGenerator.index;
  }

  resetOperationsGenerator() {
    let options = { start: 0, length: Infinity };
    const { start, end, index, count } = this.numberGenerator;
    let operationsStart = 0;
    if (start > index) options.start = start - index;

    if (end < index + count) options.length = end - Math.max(start, index) + 1;
    this.operationsGenerator = new OperationsGenerator(
      this.numberGenerator.value,
      this.operations,
      options,
    );
  }

  next() {
    if (this.done) throw 'no more combinations';

    if (this.operationsGenerator.done) {
      this.numberGenerator.next();
      this.resetOperationsGenerator();
    } else {
      this.operationsGenerator.next();
    }
    this.setState();
  }
}

module.exports = CombinationGenerator;

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
    return;
    this.start = start;
    this.end = start + length - 1;

    this.index = -1;

    while (true) {
      this.next();
      if (this.index === start) return;
    }
  }

  setState() {
    this.value = {
      numbers: this.numberGenerator.value,
      ...this.operationsGenerator.value,
    };
    this.done = this.numberGenerator.done && this.operationsGenerator.done;
  }

  resetOperationsGenerator() {
    let options = undefined;
    if (this.numberGenerator.done) {
      const start = this.numberGenerator.start - this.numberGenerator.index;
      options = {
        start: start >= 0 ? start : 0,
        length: this.numberGenerator.end - this.numberGenerator.start + 1,
      };
    }
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
    this.index = this.index + 1;
  }
}

module.exports = CombinationGenerator;

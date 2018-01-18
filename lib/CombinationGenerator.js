const { operationsGenerator } = require('./OperationsGenerator');
const PATCH = 200;

class CombinationGenerator {
  constructor(numberGenerator, operations) {
    this.numberGenerator = numberGenerator;
    this.operations = operations;

    this.numbers = [];
    this.operationsGenerator = undefined;

    this.numberIteratorResult = { value: undefined, done: false };
    this.operationsIteratorResult = { value: undefined, done: true };
  }

  next() {
    if (this.operationsIteratorResult.done && this.numberIteratorResult.done)
      throw 'no more values';
    let done = false;

    if (this.operationsIteratorResult.done) {
      this.numberIteratorResult = this.numberGenerator.next();
      this.numbers = this.numbers.concat(this.numberIteratorResult.value);
      this.operationsIterator = operationsGenerator(
        this.numbers.length,
        this.operations,
      );
    }

    this.operationsIteratorResult = this.operationsIterator.next();

    if (this.numberIteratorResult.done && this.operationsIteratorResult.done)
      done = true;
    const value = {
      numbers: this.numbers,
      ...this.operationsIteratorResult.value,
    };
    return { value, done };
  }
}
module.exports = CombinationGenerator;

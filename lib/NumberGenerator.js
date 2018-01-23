const DEFAULT_OPTIONS = {
  batchLength: Infinity,
  batchNumber: 0,
  variationsCount: () => 1,
};

class NumberGenerator {
  constructor(
    numberGenerator,
    { batchLength, batchNumber, variationsCount } = DEFAULT_OPTIONS,
  ) {
    this.numberGenerator = numberGenerator;
    this.variationsCount = variationsCount;

    this.start = batchNumber && batchNumber * batchLength;
    this.end = this.start + batchLength - 1;
    this.numberGeneratorIndex = 0;
    this.index = 0;
    this.count = 0;

    while (true) {
      this.next();
      if (this.inRange(this.start)) return;
    }
  }

  inRange(index) {
    return index >= this.index && index < this.index + this.count;
  }

  next() {
    if (this.done) throw 'no more numbers';
    const { value, done } = this.numberGenerator(this.numberGeneratorIndex);
    this.numberGeneratorIndex++;
    this.value = value;

    this.index = this.index + this.count;
    this.count = this.variationsCount(this.value);

    this.done = done || this.inRange(this.end);
  }
}

module.exports = NumberGenerator;

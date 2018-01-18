class NumberGeneratorWrapper {
  constructor(numberGenerator) {
    this.numberGenerator = numberGenerator;
  }

  fromSeed(seed) {
    let numbers = [];
    for (let i = 0; i < seed; i++) {
      numbers = numbers.concat(this.numberGenerator.next().value);
    }
    return numbers;
  }
}

module.exports = NumberGeneratorWrapper;

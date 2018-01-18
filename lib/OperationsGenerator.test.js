const OperationsGenerator = require('./OperationsGenerator');
const { AllDigitsByOneGenerator } = require('../specifics/numberGenerators');
const { add, subtract, multiply, divide } = require('../specifics/operations');

describe.skip('OperationsGenerator', () => {
  it('calculates total number of combinations', () => {
    const operations = [add, subtract, multiply, divide];
    const generator = new OperationsGenerator(3, operations);
    expect(generator.length).toEqual(32);
  });
});

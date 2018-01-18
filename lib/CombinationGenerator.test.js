const CombinationGenerator = require('./CombinationGenerator');
const { allDigitsByOneGenerator } = require('../specifics/numberGenerators');
const { add, subtract, multiply, divide } = require('../specifics/operations');

const present = result => ({
  ...result,
  value: {
    ...result.value,
    operations: result.value.operations
      ? result.value.operations.map(o => o.name)
      : undefined,
  },
});
describe('CombinationGenerator', () => {
  it('generates by one', () => {
    const operations = [add, subtract];
    const numberGenerator = allDigitsByOneGenerator(3);
    const generator = new CombinationGenerator(numberGenerator, operations);
    // expect(present(generator.next())).toMatchSnapshot();

    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
    expect(present(generator.next())).toMatchSnapshot();
  });
});

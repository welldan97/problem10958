const Solver = require('./Solver');
const { allDigitsByOneGenerator } = require('../specifics/numberGenerators');
const { add, multiply } = require('../specifics/operations');

const present = value => ({
  ...value,
  operations: value.operations.map(o => o.name),
});

describe('Solver', () => {
  it('finds all combinations', () => {
    const numberGenerator = allDigitsByOneGenerator(3);
    const operations = [add, multiply];
    const values = [];
    Solver.run(numberGenerator, operations, value => {
      values.push(present(value));
      return false;
    });
    expect(values).toMatchSnapshot();
  });

  it('finishes once condition met', () => {
    const numberGenerator = allDigitsByOneGenerator(3);
    const operations = [add, multiply];
    const values = [];
    Solver.run(numberGenerator, operations, value => {
      values.push(present(value));
      if (value.result === 6) return true;
    });
    expect(values).toMatchSnapshot();
  });

  it('finds soltions for given batch', () => {
    const numberGenerator = allDigitsByOneGenerator(3);
    const operations = [add, multiply];
    const values = [];
    Solver.run(
      numberGenerator,
      operations,
      value => {
        values.push(present(value));
        return false;
      },
      { batchLength: 3, batchNumber: 1 },
    );
    expect(values).toMatchSnapshot();
  });
});

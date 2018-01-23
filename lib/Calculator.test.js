const Calculator = require('./Calculator');
const { add, multiply } = require('../specifics/operations');

describe('Calculator', () => {
  it('calculates #1', () => {
    const result = Calculator.calculate(
      [1, 2, 3],
      [add, multiply],
      [0, 1],
      [0, 1],
    );
    expect(result).toEqual(9);
  });

  it('calculates #2', () => {
    const result = Calculator.calculate(
      [1, 2, 3, 4],
      [add, multiply],
      [0, 1, 0],
      [0, 2, 1],
    );
    expect(result).toEqual(21);
  });
});

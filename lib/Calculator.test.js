const Calculator = require('./Calculator');
const { add, multiply } = require('../specifics/operations');

describe('Calculator', () => {
  it('calculates', () => {
    const result = Calculator.calculate([1, 2, 3], [add, multiply], [0, 1]);
    expect(result).toEqual(9);
  });
});

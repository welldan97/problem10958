const { allDigitsByOneGenerator } = require('./numberGenerators');

describe('allDigitsByOneGenerator', () => {
  it('gives digits one by one', () => {
    const generator = allDigitsByOneGenerator(3);
    expect(generator.next()).toEqual({ value: [1], done: false });
    expect(generator.next()).toEqual({ value: [2], done: false });
    expect(generator.next()).toEqual({ value: [3], done: true });
  });
});

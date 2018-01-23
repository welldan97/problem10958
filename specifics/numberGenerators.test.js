const {
  allNumbersByOneGenerator,
  allDigitsGenerator,
  oneDigitGenerator,
} = require('./numberGenerators');

describe('allNumbersByOneGenerator', () => {
  it('gives ascending positive integers one by one', () => {
    let value, done;
    ({ value, done } = allNumbersByOneGenerator(3)(0));
    expect(Array.from(value)).toEqual([1]);
    expect(done).toEqual(false);
    ({ value, done } = allNumbersByOneGenerator(3)(1));
    expect(Array.from(value)).toEqual([1, 2]);
    expect(done).toEqual(false);
    ({ value, done } = allNumbersByOneGenerator(3)(2));
    expect(Array.from(value)).toEqual([1, 2, 3]);
    expect(done).toEqual(true);
  });
});

describe.skip('allDigitsGenerator', () => {
  it('gives all digits in ascending order once', () => {
    expect(allDigitsGenerator()(0)).toEqual({
      value: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      done: true,
    });
  });
});

describe.skip('oneDigitGenerator', () => {
  it('gives one digit again and again', () => {
    expect(oneDigitGenerator(3)(0)).toEqual({
      value: [3],
      done: false,
    });
    expect(oneDigitGenerator(3)(3)).toEqual({
      value: [3, 3, 3, 3],
      done: false,
    });
  });
});

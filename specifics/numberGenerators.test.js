const {
  allNumbersByOneGenerator,
  allDigitsGenerator,
  oneDigitGenerator,
} = require('./numberGenerators');

describe('allNumbersByOneGenerator', () => {
  it('gives ascending positive integers one by one', () => {
    expect(allNumbersByOneGenerator(3)(0)).toEqual({
      value: [1],
      done: false,
    });
    expect(allNumbersByOneGenerator(3)(1)).toEqual({
      value: [1, 2],
      done: false,
    });
    expect(allNumbersByOneGenerator(3)(2)).toEqual({
      value: [1, 2, 3],
      done: true,
    });
  });
});

describe('allDigitsGenerator', () => {
  it('gives all digits in ascending order once', () => {
    expect(allDigitsGenerator()(0)).toEqual({
      value: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      done: true,
    });
  });
});

describe('oneDigitGenerator', () => {
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

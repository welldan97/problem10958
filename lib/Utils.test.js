const Utils = require('./Utils');

describe('Utils', () => {
  describe('getPermutationWithDuplicates', () => {
    it('returns permutation by index', () => {
      const placesLength = 3;
      const elementsLength = 2;
      let value;
      value = Utils.getPermutationWithDuplicates(
        placesLength,
        elementsLength,
        0,
      );
      expect(Array.from(value)).toEqual([0, 0, 0]);
      value = Utils.getPermutationWithDuplicates(
        placesLength,
        elementsLength,
        1,
      );
      expect(Array.from(value)).toEqual([0, 0, 1]);
      value = Utils.getPermutationWithDuplicates(
        placesLength,
        elementsLength,
        6,
      );
      expect(Array.from(value)).toEqual([1, 1, 0]);
    });
  });

  describe('getPermutation', () => {
    it('returns permutation by index', () => {
      const placesLength = 4;
      const value = [];
      for (let i = 0; i < 24; i++)
        value.push(Array.from(Utils.getPermutation(placesLength, i)));
      expect(Array.from(value)).toMatchSnapshot();
    });
  });
});

const NumberGeneratorWrapper = require('./NumberGeneratorWrapper');
const { oneDigitGenerator } = require('../specifics/numberGenerators');

describe('NumberGeneratorWrapper', () => {
  describe('.fromSeed', () => {
    it('generates digits from seed', () => {
      const wrapper = new NumberGeneratorWrapper(oneDigitGenerator(3));
      const numbers = wrapper.fromSeed(4);
      expect(numbers).toEqual([3, 3, 3, 3]);
    });
  });
  describe('.next', () => {
    it('generates digits from seed', () => {
      const wrapper = new NumberGeneratorWrapper(oneDigitGenerator(3));
      const numbers = wrapper.fromSeed(4);
      expect(numbers).toEqual([3, 3, 3, 3]);
    });
  });
});

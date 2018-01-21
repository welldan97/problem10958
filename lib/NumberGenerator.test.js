const NumberGenerator = require('./NumberGenerator');
const { allNumbersByOneGenerator } = require('../specifics/numberGenerators');

describe('NumberGenerator', () => {
  describe('without batches', () => {
    it('sets new numbers', () => {
      const numberGenerator = new NumberGenerator(allNumbersByOneGenerator(3));
      expect(numberGenerator.value).toEqual([1]);
      expect(numberGenerator.done).toEqual(false);
      numberGenerator.next();
      expect(numberGenerator.value).toEqual([1, 2]);
      expect(numberGenerator.done).toEqual(false);
      numberGenerator.next();
      expect(numberGenerator.value).toEqual([1, 2, 3]);
      expect(numberGenerator.done).toEqual(true);
    });
  });

  describe('in batches', () => {
    it('sets new numbers', () => {
      const numberGenerator1 = new NumberGenerator(
        allNumbersByOneGenerator(8),
        {
          batchLength: 2,
          batchNumber: 0,
          variationsCount: numbers => 3,
        },
      );

      const numberGenerator2 = new NumberGenerator(
        allNumbersByOneGenerator(8),
        {
          batchLength: 2,
          batchNumber: 1,
          variationsCount: numbers => 3,
        },
      );

      const numberGenerator3 = new NumberGenerator(
        allNumbersByOneGenerator(8),
        {
          batchLength: 2,
          batchNumber: 2,
          variationsCount: numbers => 3,
        },
      );

      expect(numberGenerator1.value).toEqual([1]);
      expect(numberGenerator1.done).toEqual(true);

      expect(numberGenerator2.value).toEqual([1]);
      expect(numberGenerator2.done).toEqual(false);
      numberGenerator2.next();
      expect(numberGenerator2.value).toEqual([1, 2]);
      expect(numberGenerator2.done).toEqual(true);

      expect(numberGenerator3.value).toEqual([1, 2]);
      expect(numberGenerator3.done).toEqual(true);
    });
  });
});

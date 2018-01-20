const CombinationGenerator = require('./CombinationGenerator');
const { allDigitsByOneGenerator } = require('../specifics/numberGenerators');
const { add, subtract } = require('../specifics/operations');

const present = ({ value }) => ({
  value: {
    ...value,
    operations: value.operations.map(o => o.name),
  },
});

describe('CombinationGenerator', () => {
  describe('without batches', () => {
    it('generates by one', () => {
      const operations = [add, subtract];
      const numberGenerator = allDigitsByOneGenerator(3);
      const generator = new CombinationGenerator(numberGenerator, operations);

      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(true);
    });
  });

  describe.only('in batches', () => {
    it('generates by one for given batch from beginning', () => {
      const operations = [add, subtract];
      const generator = new CombinationGenerator(
        allDigitsByOneGenerator(3),
        operations,
        {
          batchNumber: 0,
          batchLength: 3,
        },
      );

      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(true);
    });

    it('generates by one for given batch from middle 1', () => {
      const operations = [add, subtract];
      const generator = new CombinationGenerator(
        allDigitsByOneGenerator(3),
        operations,
        {
          batchNumber: 1,
          batchLength: 3,
        },
      );

      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(true);
    });

    it.only('generates by one for given batch from middle 2', () => {
      const operations = [add, subtract];
      const generator = new CombinationGenerator(
        allDigitsByOneGenerator(3),
        operations,
        {
          batchNumber: 2,
          batchLength: 3,
        },
      );

      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(true);
    });

    it('generates by one for given batch from end', () => {
      const operations = [add, subtract];
      const generator = new CombinationGenerator(
        allDigitsByOneGenerator(3),
        operations,
        {
          batchNumber: 3,
          batchLength: 3,
        },
      );

      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(false);
      generator.next();
      expect(present(generator)).toMatchSnapshot();
      expect(generator.done).toEqual(true);
    });
  });
});

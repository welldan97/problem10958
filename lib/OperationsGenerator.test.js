const OperationsGenerator = require('./OperationsGenerator');
const { add, subtract } = require('../specifics/operations');

const present = ({ value: { operations, priorities } }) => ({
  operations: operations.map(o => o.name),
  priorities,
});

describe('OperationsGenerator', () => {
  describe('without batches', () => {
    it('generates operations by one', () => {
      const numbers = [1, 2, 3];
      const operations = [add, subtract];
      const operationsGenerator = new OperationsGenerator(numbers, operations);

      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(false);
      operationsGenerator.next();
      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(false);
      operationsGenerator.next();
      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(false);
      operationsGenerator.next();
      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(false);
      operationsGenerator.next();
      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(false);
      operationsGenerator.next();
      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(false);
      operationsGenerator.next();
      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(false);
      operationsGenerator.next();
      expect(present(operationsGenerator)).toMatchSnapshot();
      expect(operationsGenerator.done).toEqual(true);
    });
  });

  describe('with  batches', () => {
    it('generates operations by one for given batch', () => {
      const numbers = [1, 2, 3];
      const operations = [add, subtract];
      const operationsGenerator1 = new OperationsGenerator(
        numbers,
        operations,
        {
          start: 0,
          length: 2,
        },
      );

      expect(present(operationsGenerator1)).toMatchSnapshot();
      expect(operationsGenerator1.done).toEqual(false);
      operationsGenerator1.next();
      expect(present(operationsGenerator1)).toMatchSnapshot();
      expect(operationsGenerator1.done).toEqual(true);

      const operationsGenerator2 = new OperationsGenerator(
        numbers,
        operations,
        {
          start: 2,
          length: 2,
        },
      );

      expect(present(operationsGenerator2)).toMatchSnapshot();
      expect(operationsGenerator2.done).toEqual(false);
      operationsGenerator2.next();
      expect(present(operationsGenerator2)).toMatchSnapshot();
      expect(operationsGenerator2.done).toEqual(true);

      const operationsGenerator3 = new OperationsGenerator(
        numbers,
        operations,
        {
          start: 6,
          length: 2,
        },
      );

      expect(present(operationsGenerator3)).toMatchSnapshot();
      expect(operationsGenerator3.done).toEqual(false);
      operationsGenerator3.next();
      expect(present(operationsGenerator3)).toMatchSnapshot();
      expect(operationsGenerator3.done).toEqual(true);
    });
  });

  it('calculates total number of combinations', () => {
    const length = OperationsGenerator.calculateLength(3, 4);
    expect(length).toEqual(32);
  });
});

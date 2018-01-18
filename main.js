const { func10958 } = require('./index.js');
const { add, subtract, multiply, divide } = require('./operations');
const { oneDigitGenerator } = require('./numberGenerators');

const operations = [add, subtract, multiply, divide];

function each({ numbers, operations, priorities, result }) {
  console.log({
    numbers,
    operations: operations.map(o => o.name),
    priorities,
    result,
  });

  return result === 25; // node main.js  2.80s user 0.32s system 79% cpu 3.910 total
  //  return result === 40; // node main.js  7.24s user 0.74s system 79% cpu 9.986 total
}

const result = func10958(oneDigitGenerator(3), operations, each);

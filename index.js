//10958

function* allDigitsGenerator(length) {
  yield Array.from({ length }, (_, i) => i + 1);
}

function* oneDigitGenerator(digit) {
  while (true) yield [digit];
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function without(array, index, length = 1) {
  const clone = array.slice();
  clone.splice(index, length);
  return clone;
}

function permutations(members) {
  if (members.length === 1) return [members];
  let result = [];

  members.forEach((member, i) => {
    const rest = without(members, i);
    const restPermutations = permutations(rest);
    restPermutations.forEach(p => {
      p.unshift(member);
      result.push(p);
    });
  });

  return result;
}

function permutationsWithLimit(length, members) {
  if (members.length < length) throw 'not enough members';
  if (length === 0) return [[]];
  if (members.length === length) return permutations(members);
  let result = [];

  members.forEach((member, i) => {
    const rest = without(members, i);
    const restPermutations = permutationsWithLimit(length - 1, rest);
    //    console.log(restPermutations);
    restPermutations.forEach(p => {
      p.unshift(member);
      result.push(p);
    });
  });

  return result;
}

function permutationsWithDuplicates(length, members) {
  if (length === 0) return [[]];
  let result = [];
  members.forEach((member, i) => {
    const restPermutations = permutationsWithDuplicates(length - 1, members);
    restPermutations.forEach(p => {
      p.unshift(member);
      result.push(p);
    });
  });

  return result;
}

function* operationsGenerator(length, allOperations) {
  if (length === 1) {
    yield { operations: [], priorities: [] };
    return;
  }
  const operationsPermutations = permutationsWithDuplicates(
    length - 1,
    allOperations,
  );

  const allPriorities = Array.from({ length: length - 1 }, (_, i) => i);
  const prioritiesPermutations = permutations(allPriorities);
  for (let i = 0; i < operationsPermutations.length; i++) {
    for (let j = 0; j < prioritiesPermutations.length; j++) {
      yield {
        operations: operationsPermutations[i],
        priorities: prioritiesPermutations[j],
      };
    }
  }
}

function split(array, index) {
  return [array.slice(0, index + 1), array.slice(index + 1, array.length)];
}

function splitWithout(array, index) {
  return [
    array[index],
    array.slice(0, index),
    array.slice(index + 1, array.length),
  ];
}

function calculate(numbers, operations, priorities) {
  if (numbers.length === 1) return numbers[0];
  if (numbers.length === 2) return operations[0](...numbers);
  const max = Math.max(...priorities);
  const index = priorities.indexOf(max);
  const [operation, leftOperations, rightOperations] = splitWithout(
    operations,
    index,
  );
  const [priority, leftPriorities, rightPriorities] = splitWithout(
    priorities,
    index,
  );
  const [leftNumbers, rightNumbers] = split(numbers, index);
  return operation(
    calculate(leftNumbers, leftOperations, leftPriorities),
    calculate(rightNumbers, rightOperations, rightPriorities),
  );
}

function output({ numbers, operations, priorities, result }) {
  console.log({
    numbers,
    operations: operations.map(o => o.name),
    priorities,
    result,
  });
}

function func10958(
  generator,
  operations,
  condition = () => {
    false;
  },
) {
  let numbers = [];
  while (true) {
    const next = generator.next();
    if (next.done) return;
    numbers = numbers.concat(next.value);
    let initializedOperationsGenerator = operationsGenerator(
      numbers.length,
      operations,
    );

    while (true) {
      const next = initializedOperationsGenerator.next();
      if (next.done) break;
      const { operations, priorities } = next.value;

      let result = calculate(numbers, operations, priorities);
      output({ numbers, operations, priorities, result });
      if (condition(result)) return { numbers, operations, priorities, result };
    }
  }
}

const operations = [add, subtract, multiply, divide];

const result = func10958(
  oneDigitGenerator(3),
  operations,
  result => result === 25,
);
console.log(result);

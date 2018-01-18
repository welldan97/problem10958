function without(array, index, length = 1) {
  const clone = array.slice();
  clone.splice(index, length);
  return clone;
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

function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

module.exports = {
  without,
  split,
  splitWithout,
  permutations,
  permutationsWithLimit,
  permutationsWithDuplicates,
  factorial,
};

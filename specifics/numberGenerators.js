function allNumbersByOneGenerator(length = Infinity) {
  return index => {
    if (index >= length || index < 0) throw 'Outside of range';
    const done = index === length - 1;
    return { value: Array.from({ length: index + 1 }, (_, i) => i + 1), done };
  };
}

function allDigitsGenerator(length = 9) {
  return index => {
    if (index !== 0) throw 'Outside of range';
    return { value: Array.from({ length }, (_, i) => i + 1), done: true };
  };
}

function oneDigitGenerator(digit) {
  return index => {
    if (index < 0) throw 'Outside of range';
    return {
      value: Array.from({ length: index + 1 }, (_, i) => digit),
      done: false,
    };
  };
}

oneDigitGenerator.max = Infinity;

module.exports = {
  allDigitsGenerator,
  allNumbersByOneGenerator,
  oneDigitGenerator,
};

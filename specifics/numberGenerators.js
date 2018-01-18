function* allDigitsGenerator(length = 9) {
  yield Array.from({ length }, (_, i) => i + 1);
}

function* allDigitsByOneGenerator(length = Infinity) {
  let digit = 1;
  for (; digit < length; digit++) {
    yield [digit];
  }
  return [digit];
}

function* oneDigitGenerator(digit) {
  while (true) yield [digit];
}

oneDigitGenerator.max = Infinity;

module.exports = {
  allDigitsGenerator,
  allDigitsByOneGenerator,
  oneDigitGenerator,
};

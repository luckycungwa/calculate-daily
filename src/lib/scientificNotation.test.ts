import assert from 'node:assert/strict';
import test from 'node:test';
import {
  computeScientific,
  formatDecimal,
  formatENotation,
  formatEngineering,
  formatScientific,
  orderOfMagnitude,
  parseNumberInput,
  toEngineeringParts,
  toScientificParts,
} from './scientificNotation';

test('normalises values into scientific form', () => {
  assert.deepEqual(toScientificParts(35000), { mantissa: 3.5, exponent: 4 });
  assert.deepEqual(toScientificParts(0.0045), { mantissa: 4.5, exponent: -3 });
  assert.deepEqual(toScientificParts(-450), { mantissa: -4.5, exponent: 2 });
  assert.deepEqual(toScientificParts(0), { mantissa: 0, exponent: 0 });
});

test('carries the mantissa when rounding reaches ten', () => {
  assert.deepEqual(toScientificParts(99999, 3), { mantissa: 1, exponent: 5 });
  assert.deepEqual(toScientificParts(9.99, 2), { mantissa: 1, exponent: 1 });
});

test('uses exponents that are multiples of three for engineering notation', () => {
  assert.deepEqual(toEngineeringParts(35000), { mantissa: 35, exponent: 3 });
  assert.deepEqual(toEngineeringParts(0.0045), { mantissa: 4.5, exponent: -3 });
  assert.deepEqual(toEngineeringParts(1.2e-8), { mantissa: 12, exponent: -9 });
});

test('formats the same value in each supported notation', () => {
  assert.equal(formatScientific(35000), '3.5 × 10^4');
  assert.equal(formatENotation(35000), '3.5e4');
  assert.equal(formatEngineering(35000), '35 × 10^3');
  assert.equal(formatDecimal(35000), '35000');
  assert.equal(formatScientific(0), '0');
  assert.equal(formatDecimal(0.0025), '0.0025');
  assert.equal(orderOfMagnitude(35000), 4);
});

test('parses the input formats a person actually types', () => {
  assert.equal(parseNumberInput('35000'), 35000);
  assert.equal(parseNumberInput('3.5e4'), 35000);
  assert.equal(parseNumberInput('3.5E4'), 35000);
  assert.equal(parseNumberInput('3.5 × 10^4'), 35000);
  assert.equal(parseNumberInput('3.5 x 10^4'), 35000);
  assert.equal(parseNumberInput('4.5 × 10^-3'), 0.0045);
  assert.equal(parseNumberInput('35,000'), 35000);
  assert.equal(parseNumberInput('−2.5'), -2.5);
  assert.equal(parseNumberInput('abc'), null);
  assert.equal(parseNumberInput(''), null);
  assert.equal(parseNumberInput('3..5'), null);
});

test('computes across magnitudes without losing precision', () => {
  assert.equal(computeScientific(3, 4, 'multiply', 2, 3), 6e7);
  assert.equal(computeScientific(8, 5, 'divide', 2, 2), 4000);
  assert.equal(computeScientific(1.5, 4, 'add', 5, 3), 20000);
  assert.equal(computeScientific(1.5, 4, 'subtract', 5, 3), 10000);
  assert.throws(() => computeScientific(1, 2, 'divide', 0, 0), /divide by zero/i);
});

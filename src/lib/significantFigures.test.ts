import assert from 'node:assert/strict';
import test from 'node:test';
import { countSignificantFigures, roundToSignificantFigures } from './significantFigures';

test('counts significant figures using the standard rules', () => {
  assert.equal(countSignificantFigures('0.00450')?.count, 3);
  assert.equal(countSignificantFigures('1.230')?.count, 4);
  assert.equal(countSignificantFigures('6.022e23')?.count, 4);
  assert.equal(countSignificantFigures('1.20E-5')?.count, 3);
  assert.equal(countSignificantFigures('42')?.count, 2);
  assert.equal(countSignificantFigures('0.0001')?.count, 1);
  assert.equal(countSignificantFigures('-3.14')?.count, 3);
  assert.equal(countSignificantFigures('4500.')?.count, 4);
  assert.equal(countSignificantFigures('4500.0')?.count, 5);
  assert.equal(countSignificantFigures('10,500')?.count, 3);
});

test('flags trailing zeros that do not fix the count', () => {
  const whole = countSignificantFigures('1200');
  assert.equal(whole?.count, 2);
  assert.equal(whole?.ambiguous, true);
  assert.match(whole?.note ?? '', /placeholders/);

  const exact = countSignificantFigures('1200.');
  assert.equal(exact?.count, 4);
  assert.equal(exact?.ambiguous, false);
});

test('treats zero as a documented special case rather than guessing', () => {
  const zero = countSignificantFigures('0');
  assert.equal(zero?.count, 0);
  assert.equal(zero?.ambiguous, true);
  assert.match(zero?.note ?? '', /non-zero digits/);
});

test('rejects input that is not a number', () => {
  assert.equal(countSignificantFigures('twelve'), null);
  assert.equal(countSignificantFigures('1.2.3'), null);
  assert.equal(countSignificantFigures(''), null);
});

test('rounds to a requested number of significant figures', () => {
  assert.equal(roundToSignificantFigures(1234, 2).value, 1200);
  assert.equal(roundToSignificantFigures(1234, 2).scientific, '1.2 × 10^3');
  assert.equal(roundToSignificantFigures(1234, 2).decimal, '1200');
  assert.equal(roundToSignificantFigures(0.004567, 2).value, 0.0046);
  assert.equal(roundToSignificantFigures(0.004567, 2).decimal, '0.0046');
  // Carries into the next power of ten when rounding reaches 10.
  assert.equal(roundToSignificantFigures(9.996, 3).value, 10);
  assert.equal(roundToSignificantFigures(9.996, 3).scientific, '10.0');
  assert.equal(roundToSignificantFigures(0, 3).value, 0);
  assert.throws(() => roundToSignificantFigures(12, 0), /1 to 15/);
  assert.throws(() => roundToSignificantFigures(12, 2.5), /whole number/);
});

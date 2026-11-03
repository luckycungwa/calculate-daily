import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBoundedNumber, clampToBounds, isWithinBounds } from './numberField';
import { CALCULATOR_CATALOG } from '../data/calculators';

test('a value inside the range passes through untouched and without a message', () => {
  const result = parseBoundedNumber('150', { min: 0 });
  assert.equal(result.value, 150);
  assert.equal(result.error, undefined);
});

test('a negative value is rejected where the field declares a zero minimum', () => {
  const result = parseBoundedNumber('-40', { min: 0 });
  assert.equal(result.value, 0);
  assert.equal(result.error, 'Must be at least 0.');
});

test('a value above the maximum is clamped and the clamp is announced', () => {
  const result = parseBoundedNumber('250', { min: 0, max: 100 });
  assert.equal(result.value, 100);
  assert.equal(result.error, 'Must be at most 100.');
});

test('an empty field falls back into range instead of calculating with NaN', () => {
  const result = parseBoundedNumber('   ', { min: 1, max: 10 });
  assert.equal(result.value, 1);
  assert.equal(result.error, 'Enter a value.');
  assert.ok(Number.isFinite(result.value));
});

test('non-numeric and infinite text is rejected', () => {
  for (const raw of ['abc', '1,5', 'Infinity', '1e999']) {
    const result = parseBoundedNumber(raw, { min: 0 });
    assert.equal(result.value, 0, `${raw} should fall back`);
    assert.equal(result.error, 'Enter a valid number.', `${raw} should be reported`);
  }
});

test('decimal and signed fields keep their legitimate values', () => {
  assert.equal(parseBoundedNumber('-5', {}).value, -5);
  assert.equal(parseBoundedNumber('0.05', { min: 0, max: 1 }).value, 0.05);
  assert.equal(parseBoundedNumber('-120.5', { min: -200, max: 200 }).value, -120.5);
});

test('an unbounded field accepts anything finite', () => {
  const result = parseBoundedNumber('12345.678', {});
  assert.equal(result.value, 12345.678);
  assert.equal(result.error, undefined);
});

test('clamping never escapes the declared range', () => {
  assert.equal(clampToBounds(-10, { min: 0, max: 5 }), 0);
  assert.equal(clampToBounds(10, { min: 0, max: 5 }), 5);
  assert.equal(clampToBounds(3, { min: 0, max: 5 }), 3);
  assert.equal(clampToBounds(-3, { min: -10, max: -1 }), -3);
});

test('isWithinBounds agrees with the parser', () => {
  assert.equal(isWithinBounds(0, { min: 0, max: 100 }), true);
  assert.equal(isWithinBounds(-1, { min: 0 }), false);
  assert.equal(isWithinBounds(101, { max: 100 }), false);
  assert.equal(isWithinBounds(Number.NaN, {}), false);
});

test('every declared default sits inside its own bounds', () => {
  // A default outside its range would make a calculator open in an error state.
  for (const calc of CALCULATOR_CATALOG) {
    if (calc.kind !== 'config') continue;
    for (const field of calc.config.fields) {
      assert.ok(
        isWithinBounds(field.defaultValue, { min: field.min, max: field.max }),
        `${calc.slug}.${field.id} defaults to ${field.defaultValue} outside [${field.min}, ${field.max}]`
      );
    }
  }
});

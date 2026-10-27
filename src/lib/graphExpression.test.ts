import assert from 'node:assert/strict';
import test from 'node:test';
import {
  compileGraphExpression,
  isValidGraphRange,
  sampleGraphFunction,
} from './graphExpression';

test('evaluates arithmetic with precedence, powers, unary signs, and implicit multiplication', () => {
  assert.equal(compileGraphExpression('2 + 3 * 4')(0), 14);
  assert.equal(compileGraphExpression('-x^2')(3), -9);
  assert.equal(compileGraphExpression('2x + 1')(4), 9);
  assert.equal(compileGraphExpression('2^3^2')(0), 512);
});

test('evaluates supported constants, functions, and adjustable parameter a', () => {
  assert.equal(compileGraphExpression('sqrt(9) + abs(-2) + log(100)')(0), 7);
  assert.equal(compileGraphExpression('a*x^2')(3, 2), 18);
  assert.ok(Math.abs(compileGraphExpression('sin(pi/2)')(0) - 1) < 1e-12);
  assert.ok(Math.abs(compileGraphExpression('sin(90)', 'degrees')(0) - 1) < 1e-12);
});

test('rejects unsupported syntax and non-finite function results', () => {
  assert.throws(() => compileGraphExpression('import(1)'), /Unknown name/);
  assert.throws(() => compileGraphExpression('x +'), /Expected/);
  assert.throws(() => compileGraphExpression('sqrt(-1)')(0), /undefined/);
  assert.throws(() => compileGraphExpression('1 / 0')(0), /undefined/);
});

test('accepts only finite, increasing, bounded graph ranges', () => {
  assert.equal(isValidGraphRange(-10, 10), true);
  assert.equal(isValidGraphRange(2, 2), false);
  assert.equal(isValidGraphRange(Number.NaN, 5), false);
  assert.equal(isValidGraphRange(-1e9, 1), false);
});

test('samples a function and leaves undefined regions as gaps', () => {
  const samples = sampleGraphFunction(compileGraphExpression('1/x'), -1, 1, 4);
  assert.deepEqual(samples.map(({ y }) => y), [-1, -2, null, 2, 1]);
  assert.throws(() => sampleGraphFunction(compileGraphExpression('x'), 1, -1), /x-range/);
  assert.throws(() => sampleGraphFunction(compileGraphExpression('x'), -1, 1, 1), /Sample count/);
});

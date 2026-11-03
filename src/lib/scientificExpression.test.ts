import assert from 'node:assert/strict';
import test from 'node:test';
import {
  evaluateExpression,
  formatResult,
  tryEvaluate,
  ExpressionError,
} from './scientificExpression';

const close = (actual: number, expected: number, tolerance = 1e-10) =>
  assert.ok(Math.abs(actual - expected) < tolerance, `expected ${expected}, received ${actual}`);

test('evaluates arithmetic with conventional precedence', () => {
  assert.equal(evaluateExpression('2 + 3 * 4'), 14);
  assert.equal(evaluateExpression('(2 + 3) * 4'), 20);
  assert.equal(evaluateExpression('10 - 2 - 3'), 5);
  assert.equal(evaluateExpression('100 / 4 / 5'), 5);
  assert.equal(evaluateExpression('2^3^2'), 512);
  assert.equal(evaluateExpression('-2^2'), -4);
  assert.equal(evaluateExpression('(-2)^2'), 4);
});

test('parses scientific-notation input, including negative exponents', () => {
  assert.equal(evaluateExpression('2.5e-3'), 0.0025);
  assert.equal(evaluateExpression('2.5E-3'), 0.0025);
  assert.equal(evaluateExpression('6.02e23'), 6.02e23);
  assert.equal(evaluateExpression('1e-7 * 1e7'), 1);
  close(evaluateExpression('4.5e-9 / 1.5e-9'), 3);
});

test('supports implicit multiplication', () => {
  assert.equal(evaluateExpression('2(3)'), 6);
  assert.equal(evaluateExpression('2(3 + 1)'), 8);
  assert.equal(evaluateExpression('(2)(3)'), 6);
  close(evaluateExpression('2pi'), 2 * Math.PI);
  close(evaluateExpression('3sin(30)'), 1.5);
  assert.equal(evaluateExpression('2sqrt(16)'), 8);
});

test('respects the angle mode for trigonometry and its inverses', () => {
  close(evaluateExpression('sin(30)', 'deg'), 0.5);
  close(evaluateExpression('cos(60)', 'deg'), 0.5);
  close(evaluateExpression('sin(pi/2)', 'rad'), 1);
  close(evaluateExpression('asin(0.5)', 'deg'), 30);
});

test('handles postfix factorial and percent', () => {
  assert.equal(evaluateExpression('5!'), 120);
  assert.equal(evaluateExpression('0!'), 1);
  assert.equal(evaluateExpression('50%'), 0.5);
  assert.equal(evaluateExpression('200 * 15%'), 30);
});

test('handles logarithms, roots, and constants', () => {
  assert.equal(evaluateExpression('log(100)'), 2);
  assert.equal(evaluateExpression('ln(e)'), 1);
  assert.equal(evaluateExpression('sqrt(144)'), 12);
  assert.equal(evaluateExpression('cbrt(27)'), 3);
  assert.equal(evaluateExpression('abs(-7)'), 7);
  close(evaluateExpression('log(1000) + ln(1)'), 3);
});

test('rejects incomplete input instead of silently truncating it', () => {
  // Regression: the previous parser returned 2 here by ignoring the "(3)".
  assert.throws(() => evaluateExpression('2 3'), ExpressionError);
  assert.throws(() => evaluateExpression('2 +'), ExpressionError);
  assert.throws(() => evaluateExpression('sin('), ExpressionError);
  assert.throws(() => evaluateExpression('(2 + 3'), ExpressionError);
  assert.throws(() => evaluateExpression('2 + 3)'), ExpressionError);
  assert.throws(() => evaluateExpression('foo(2)'), ExpressionError);
  assert.throws(() => evaluateExpression(''), ExpressionError);
});

test('formats results for display without inventing precision', () => {
  assert.equal(formatResult(120), '120');
  assert.equal(formatResult(0.0025), '0.0025');
  assert.equal(formatResult(1 / 3), '0.333333333333');
  assert.equal(formatResult(Infinity), 'Undefined');
  assert.equal(formatResult(1e-7), '1e-7');
  assert.equal(tryEvaluate('1/0', 'deg'), 'Undefined');
  assert.equal(tryEvaluate('2 +', 'deg'), '');
  assert.equal(tryEvaluate('   ', 'deg'), '');
});

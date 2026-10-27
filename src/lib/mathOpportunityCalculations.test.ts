import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateSolidVolume, calculateZScore } from './mathOpportunityCalculations';

test('calculates positive, negative, and zero z-scores', () => {
  assert.equal(calculateZScore(85, 80, 5), 1);
  assert.equal(calculateZScore(70, 80, 5), -2);
  assert.equal(calculateZScore(80, 80, 5), 0);
});

test('rejects invalid z-score inputs and non-finite results', () => {
  assert.throws(() => calculateZScore(1, 0, 0), /greater than zero/);
  assert.throws(() => calculateZScore(Number.NaN, 0, 1), /finite numbers/);
  assert.throws(() => calculateZScore(Number.MAX_VALUE, -Number.MAX_VALUE, Number.MIN_VALUE), /supported/);
});

test('calculates common solid volumes in the entered linear unit cubed', () => {
  assert.equal(calculateSolidVolume({ shape: 'cube', dimensions: { side: 3 } }), 27);
  assert.equal(calculateSolidVolume({
    shape: 'rectangular-prism',
    dimensions: { length: 2, width: 3, height: 4 },
  }), 24);
  assert.ok(Math.abs(calculateSolidVolume({ shape: 'sphere', dimensions: { radius: 3 } }) - 36 * Math.PI) < 1e-12);
  assert.ok(Math.abs(calculateSolidVolume({ shape: 'cylinder', dimensions: { radius: 2, height: 5 } }) - 20 * Math.PI) < 1e-12);
  assert.ok(Math.abs(calculateSolidVolume({ shape: 'cone', dimensions: { radius: 2, height: 6 } }) - 8 * Math.PI) < 1e-12);
});

test('rejects missing, non-positive, and overflowing solid dimensions', () => {
  assert.throws(() => calculateSolidVolume({ shape: 'cylinder', dimensions: { radius: 2 } }), /dimension greater than zero/);
  assert.throws(() => calculateSolidVolume({ shape: 'sphere', dimensions: { radius: 0 } }), /dimension greater than zero/);
  assert.throws(() => calculateSolidVolume({ shape: 'cube', dimensions: { side: Number.MAX_VALUE } }), /supported calculation range/);
});

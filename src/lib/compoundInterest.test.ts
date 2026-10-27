import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateCompoundInterest } from './compoundInterest';

test('calculates the compound-interest calculator example with end-of-month deposits', () => {
  const result = calculateCompoundInterest(5000, 250, 8, 10);
  assert.equal(result.totalDeposited, 35000);
  assert.ok(Math.abs(result.futureValue - 56834.709968150215) < 1e-8);
  assert.ok(Math.abs(result.totalInterestEarned - 21834.709968150215) < 1e-8);
});

test('handles zero interest and no contributions', () => {
  assert.equal(calculateCompoundInterest(1000, 100, 0, 1).futureValue, 2200);
  assert.equal(calculateCompoundInterest(1000, 0, 0, 1).futureValue, 1000);
});

test('matches the documented early-start and later-start projections', () => {
  const monthlyRate = 0.07 / 12;
  const annuityValue = (payment: number, months: number) =>
    payment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const early = annuityValue(200, 120) * Math.pow(1 + monthlyRate, 360);
  const later = annuityValue(200, 360);

  assert.ok(Math.abs(early - 280968.4805114839) < 1e-7);
  assert.ok(Math.abs(later - 243994.19915518895) < 1e-7);
});

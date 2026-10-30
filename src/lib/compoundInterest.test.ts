import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateCompoundInterest, compoundInterestYearlySeries } from './compoundInterest';

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

test('yearly series ends exactly on the calculator result and grows monotonically', () => {
  const result = calculateCompoundInterest(5000, 250, 8, 10);
  const series = compoundInterestYearlySeries(5000, 250, 8, 10);

  assert.equal(series.length, 10);
  const last = series[series.length - 1];
  assert.ok(Math.abs(last.balance - result.futureValue) < 1e-9);
  assert.ok(Math.abs(last.interestEarned - result.totalInterestEarned) < 1e-9);

  // Deposited is a straight contribution line independent of the rate.
  for (const point of series) {
    assert.ok(Math.abs(point.deposited - (5000 + 250 * point.year * 12)) < 1e-9);
    assert.ok(point.interestEarned >= -1e-9);
  }
  for (let i = 1; i < series.length; i++) {
    assert.ok(series[i].balance > series[i - 1].balance);
    assert.ok(Math.abs(series[i].interestEarned - series[i - 1].interestEarned) > -1);
  }
});

test('yearly series handles zero rate cleanly', () => {
  const series = compoundInterestYearlySeries(1000, 100, 0, 3);
  assert.equal(series.length, 3);
  assert.ok(Math.abs(series[2].balance - 4600) < 1e-9);
  assert.equal(series[2].interestEarned, 0);
});

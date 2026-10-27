import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateInflation,
  calculateIrr,
  calculateNpv,
  parseCashFlowList,
} from './financialMath';

test('cash flow parsing accepts commas, spaces, and accounting negatives', () => {
  assert.deepEqual(parseCashFlowList('-1000, 300 420;680'), [-1000, 300, 420, 680]);
  assert.deepEqual(parseCashFlowList('(1000) 500'), [-1000, 500]);
  assert.deepEqual(parseCashFlowList('  250 , 0 , 75  '), [250, 0, 75]);

  assert.throws(() => parseCashFlowList('1000'), /at least two/);
  assert.throws(() => parseCashFlowList(''), /at least two/);
  assert.throws(() => parseCashFlowList('-1000, abc'), /must be a number/);
});

test('NPV discounts each cash flow from its own period', () => {
  const flows = [-1000, 500, 500, 500];
  assert.equal(Number(calculateNpv(0, flows).toFixed(6)), 500);
  assert.equal(Number(calculateNpv(0.1, flows).toFixed(6)), 243.425995);

  // A zero rate must not divide by zero or return NaN.
  assert.ok(Number.isFinite(calculateNpv(0, flows)));

  assert.throws(() => calculateNpv(-1, flows), /greater than -100%/);
  assert.throws(() => calculateNpv(0.1, [100]), /at least two/);
  assert.throws(() => calculateNpv(0.1, [-100, Number.NaN]), /finite/);
});

test('IRR solves a one-period investment exactly and a multi-period series sensibly', () => {
  // -1000 now, 1100 in one year: the internal rate is exactly 10%.
  assert.equal(Number(calculateIrr([-1000, 1100]).toFixed(8)), 0.1);

  const multi = calculateIrr([-1000, 500, 500, 500]);
  assert.ok(multi > 0.23 && multi < 0.24, `expected ~23.4%, got ${multi}`);
  // The defining property of IRR: NPV at the returned rate is ~zero.
  assert.ok(Math.abs(calculateNpv(multi, [-1000, 500, 500, 500])) < 1e-6);

  assert.throws(() => calculateIrr([100, 200, 300]), /negative and one positive/);
  assert.throws(() => calculateIrr([-100]), /at least two/);

  // No sign change in the NPV curve means no conventional IRR.
  assert.throws(() => calculateIrr([-1000, -100, -100]), /negative and one positive/);
});

test('inflation projects future cost and the shrinking value of money', () => {
  const result = calculateInflation(1000, 3, 10);
  assert.equal(Number(result.futureCost.toFixed(2)), 1343.92);
  assert.equal(Number(result.purchasingPower.toFixed(2)), 744.09);
  assert.equal(Number(result.cumulativeInflationPercent.toFixed(2)), 34.39);
  assert.equal(Number(result.realChangePercent.toFixed(2)), -25.59);

  // Zero years is a no-op, and deflation raises purchasing power.
  const flat = calculateInflation(500, 3, 0);
  assert.equal(flat.futureCost, 500);
  assert.equal(flat.purchasingPower, 500);

  const deflation = calculateInflation(1000, -2, 5);
  assert.ok(deflation.futureCost < 1000);
  assert.ok(deflation.purchasingPower > 1000);

  assert.throws(() => calculateInflation(-1, 3, 10), /zero or greater/);
  assert.throws(() => calculateInflation(1000, 3, 101), /between 0 and 100/);
});

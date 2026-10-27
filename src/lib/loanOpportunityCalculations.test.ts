import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateGoldLoan, calculatePersonalLoan } from './loanOpportunityCalculations';

test('personal loan separates net proceeds from scheduled repayments', () => {
  const result = calculatePersonalLoan({
    loanAmount: 10000,
    originationFeePercent: 5,
    annualRate: 0,
    termMonths: 20,
  });

  assert.equal(result.originationFee, 500);
  assert.equal(result.netCashReceived, 9500);
  assert.equal(result.monthlyPayment, 500);
  assert.equal(result.totalPayments, 10000);
  assert.equal(result.totalCost, 500);
});

test('personal loan includes interest in the total financing cost', () => {
  const result = calculatePersonalLoan({
    loanAmount: 10000,
    originationFeePercent: 5,
    annualRate: 12.5,
    termMonths: 36,
  });

  assert.ok(result.monthlyPayment > 334 && result.monthlyPayment < 336);
  assert.ok(result.totalCost > result.originationFee);
});

test('personal loan rejects invalid fees, terms, and non-finite values', () => {
  const base = { loanAmount: 10000, originationFeePercent: 5, annualRate: 10, termMonths: 36 };
  assert.throws(() => calculatePersonalLoan({ ...base, originationFeePercent: 100 }), /under 100%/);
  assert.throws(() => calculatePersonalLoan({ ...base, termMonths: 0 }), /1 to 120 months/);
  assert.throws(() => calculatePersonalLoan({ ...base, loanAmount: Number.NaN }), /finite numbers/);
});

test('gold loan estimates purity-adjusted value and a capped loan amount', () => {
  const result = calculateGoldLoan({
    netGoldWeightGrams: 20,
    purityCarats: 22,
    goldPricePerGram: 80,
    loanToValuePercent: 75,
    annualRate: 0,
    termMonths: 12,
  });

  assert.equal(result.fineGoldEquivalentGrams, 20 * 22 / 24);
  assert.ok(Math.abs(result.estimatedGoldValue - 1466.6666666666667) < 1e-10);
  assert.ok(Math.abs(result.estimatedMaximumLoan - 1100) < 1e-10);
  assert.ok(Math.abs(result.monthlyPayment - 1100 / 12) < 1e-10);
  assert.equal(result.totalInterest, 0);
});

test('gold loan rejects unsupported purity, LTV, and term inputs', () => {
  const base = { netGoldWeightGrams: 20, purityCarats: 22, goldPricePerGram: 80, loanToValuePercent: 75, annualRate: 12, termMonths: 12 };
  assert.throws(() => calculateGoldLoan({ ...base, purityCarats: 25 }), /no more than 24 carats/);
  assert.throws(() => calculateGoldLoan({ ...base, loanToValuePercent: 101 }), /from 0% to 100%/);
  assert.throws(() => calculateGoldLoan({ ...base, termMonths: 121 }), /1 to 120 months/);
});
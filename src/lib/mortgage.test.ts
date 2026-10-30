import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  affordability,
  buildAmortization,
  monthlyPayment,
  refinanceAnalysis,
  rentVsBuy,
  totalMonthlyPayment,
} from './mortgage';

const close = (actual: number, expected: number, tolerance = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`
  );

/**
 * The mortgage example in the catalogue must agree with the calculator defaults:
 * $400,000 price, $80,000 down, 6.5%, 30 years, $4,000 annual tax,
 * $1,200 annual insurance.
 */
test('catalogue mortgage defaults produce the documented payment', () => {
  const pi = monthlyPayment(320_000, 6.5, 30);
  close(pi, 2022.62);

  const total = totalMonthlyPayment({
    principal: 320_000,
    annualRate: 6.5,
    years: 30,
    annualTax: 4_000,
    annualInsurance: 1_200,
  });

  close(total.principalAndInterest, 2022.62);
  close(total.monthlyTax, 333.33);
  close(total.monthlyInsurance, 100);
  close(total.total, 2455.95);
});

test('a zero interest loan splits principal evenly', () => {
  close(monthlyPayment(320_000, 0, 30), 320_000 / 360);
  close(monthlyPayment(12_000, 0, 1), 1_000);
});

test('a zero principal has no payment', () => {
  assert.equal(monthlyPayment(0, 6.5, 30), 0);
  assert.equal(monthlyPayment(-1000, 6.5, 30), 0);
});

test('the amortization schedule reaches a zero balance at term', () => {
  const amort = buildAmortization({ principal: 320_000, annualRate: 6.5, years: 30 });

  assert.equal(amort.rows.length, 360);
  assert.equal(amort.payoffMonths, 360);
  assert.equal(amort.rows.at(-1)?.balance, 0);
  close(amort.monthlyPayment, 2022.62);

  // Total payments exceed principal by the interest, and the final row's
  // cumulative interest equals the reported total.
  close(amort.totalPayment, 2022.62 * 360, 1);
  close(amort.totalInterest, amort.totalPayment - 320_000, 1);
  close(amort.rows.at(-1)?.cumulativeInterest ?? 0, amort.totalInterest, 0.02);
});

test('extra monthly payments shorten the term and cut interest', () => {
  const base = buildAmortization({ principal: 320_000, annualRate: 6.5, years: 30 });
  const extra = buildAmortization({
    principal: 320_000,
    annualRate: 6.5,
    years: 30,
    extraMonthly: 200,
  });

  assert.ok(extra.payoffMonths < base.payoffMonths);
  assert.ok(extra.totalInterest < base.totalInterest);
  close(extra.monthlyPayment, base.monthlyPayment + 200);
});

test('biweekly payments shorten the term instead of extending it', () => {
  const base = buildAmortization({ principal: 320_000, annualRate: 6.5, years: 30 });
  const biweekly = buildAmortization({
    principal: 320_000,
    annualRate: 6.5,
    years: 30,
    biweekly: true,
  });

  // 26 half-payments equal 13 monthly payments a year, so a 30-year loan is
  // repaid in roughly 24 years rather than 30.
  assert.ok(biweekly.payoffMonths < base.payoffMonths);
  assert.ok(biweekly.payoffMonths > 270);
  assert.ok(biweekly.payoffMonths < 300);
  assert.ok(biweekly.totalInterest < base.totalInterest);
  close(biweekly.monthlyPayment, base.monthlyPayment * (13 / 12), 0.02);
});

test('refinance analysis reports savings and a break-even month', () => {
  const result = refinanceAnalysis({
    currentBalance: 250_000,
    currentRate: 6.5,
    newRate: 5.5,
    remainingYears: 25,
    closingCosts: 7_000,
  });

  assert.ok(result.newPayment < result.currentPayment);
  assert.ok(result.monthlySavings > 0);
  assert.ok(result.breakEvenMonths > 0);
  assert.ok(Number.isFinite(result.breakEvenMonths));
  assert.ok(result.interestSavedTotal > 0);
});

test('refinance with no rate change has no break-even benefit', () => {
  const result = refinanceAnalysis({
    currentBalance: 250_000,
    currentRate: 6.5,
    newRate: 6.5,
    remainingYears: 25,
    closingCosts: 7_000,
  });

  close(result.monthlySavings, 0);
  assert.equal(result.breakEvenMonths, 0);
  close(result.interestSavedTotal, 0);
});

test('affordability respects the back-end DTI limit', () => {
  const result = affordability({
    annualIncome: 85_000,
    monthlyDebts: 400,
    downPaymentPercent: 20,
    annualRate: 6.5,
    years: 30,
    annualTaxPercent: 1,
    annualInsurance: 1_200,
    dtiLimit: 36,
  });

  assert.ok(result.maxHomePrice > 0);
  assert.ok(result.maxLoanAmount > 0);
  assert.ok(result.maxLoanAmount < result.maxHomePrice);
  assert.ok(result.dti <= 36.01);
  assert.ok(result.monthlyPayment > 0);
});

test('an unaffordable budget returns zero rather than a negative price', () => {
  const result = affordability({
    annualIncome: 12_000,
    monthlyDebts: 1_000,
    downPaymentPercent: 20,
    annualRate: 6.5,
    years: 30,
  });

  assert.equal(result.maxHomePrice, 0);
  assert.equal(result.maxLoanAmount, 0);
});

test('rent vs buy returns aligned series for the requested horizon', () => {
  const result = rentVsBuy({
    homePrice: 400_000,
    downPaymentPercent: 20,
    annualRate: 6.5,
    years: 30,
    annualTaxPercent: 1,
    annualInsurance: 1_200,
    monthlyRent: 1_800,
    rentIncreasePercent: 3,
    horizonYears: 10,
  });

  assert.equal(result.buyCumulative.length, 120);
  assert.equal(result.rentCumulative.length, 120);
  assert.equal(result.buyEquity.length, 120);
  assert.equal(result.labels.length, 120);
  assert.ok(result.buyCumulative.every((value) => value > 0));
  assert.ok(result.rentCumulative.every((value) => value > 0));
  assert.ok(result.buyEquity.at(-1)! > 0);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateCarLoan } from './carLoanCalculations';

test('calculates financed price and a zero-rate monthly payment', () => {
  const result = calculateCarLoan({
    vehiclePrice: 30000,
    taxesAndFees: 1800,
    downPayment: 3000,
    tradeInEquity: 1000,
    annualRate: 0,
    termMonths: 60,
  });

  assert.equal(result.amountFinanced, 27800);
  assert.equal(result.monthlyPayment, 27800 / 60);
  assert.equal(result.totalPayments, 27800);
  assert.equal(result.totalInterest, 0);
});

test('negative trade-in equity increases the financed balance', () => {
  const result = calculateCarLoan({
    vehiclePrice: 30000,
    taxesAndFees: 1800,
    downPayment: 3000,
    tradeInEquity: -2000,
    annualRate: 0,
    termMonths: 60,
  });

  assert.equal(result.amountFinanced, 30800);
});

test('calculates a positive-rate monthly installment', () => {
  const result = calculateCarLoan({
    vehiclePrice: 30000,
    taxesAndFees: 1800,
    downPayment: 3000,
    tradeInEquity: 0,
    annualRate: 6.5,
    termMonths: 60,
  });

  assert.ok(result.monthlyPayment > 563 && result.monthlyPayment < 564);
  assert.ok(result.totalInterest > 0);
});

test('rejects invalid terms, rates, and a non-positive loan amount', () => {
  const base = {
    vehiclePrice: 30000,
    taxesAndFees: 1800,
    downPayment: 3000,
    tradeInEquity: 0,
    annualRate: 6.5,
    termMonths: 60,
  };

  assert.throws(() => calculateCarLoan({ ...base, termMonths: 0 }), /1 to 120 months/);
  assert.throws(() => calculateCarLoan({ ...base, annualRate: 101 }), /supported range/);
  assert.throws(() => calculateCarLoan({ ...base, vehiclePrice: Number.NaN }), /finite numbers/);
  assert.throws(() => calculateCarLoan({ ...base, downPayment: 32000 }), /no loan payment/);
});
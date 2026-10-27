export interface PersonalLoanInputs {
  loanAmount: number;
  originationFeePercent: number;
  annualRate: number;
  termMonths: number;
}

export interface PersonalLoanResult {
  loanAmount: number;
  originationFee: number;
  netCashReceived: number;
  monthlyPayment: number;
  totalPayments: number;
  totalCost: number;
}

export interface GoldLoanInputs {
  netGoldWeightGrams: number;
  purityCarats: number;
  goldPricePerGram: number;
  loanToValuePercent: number;
  annualRate: number;
  termMonths: number;
}

export interface GoldLoanResult {
  fineGoldEquivalentGrams: number;
  estimatedGoldValue: number;
  estimatedMaximumLoan: number;
  monthlyPayment: number;
  totalInterest: number;
}

function validateLoanTerms(annualRate: number, termMonths: number): void {
  if (!Number.isFinite(annualRate) || annualRate < 0 || annualRate > 100) {
    throw new Error('Enter an APR from 0% to 100%.');
  }
  if (!Number.isInteger(termMonths) || termMonths < 1 || termMonths > 120) {
    throw new Error('Choose a whole-number term from 1 to 120 months.');
  }
}

function monthlyPayment(principal: number, annualRate: number, termMonths: number): number {
  if (principal <= 0) return 0;
  const rate = annualRate / 100 / 12;
  const payment = rate === 0
    ? principal / termMonths
    : principal * rate / (1 - (1 + rate) ** -termMonths);
  if (!Number.isFinite(payment)) throw new Error('These inputs exceed the supported calculation range.');
  return payment;
}

export function calculatePersonalLoan(inputs: PersonalLoanInputs): PersonalLoanResult {
  const { loanAmount, originationFeePercent, annualRate, termMonths } = inputs;
  if (![loanAmount, originationFeePercent, annualRate, termMonths].every(Number.isFinite)) {
    throw new Error('Enter finite numbers for every loan input.');
  }
  if (loanAmount <= 0 || originationFeePercent < 0 || originationFeePercent >= 100) {
    throw new Error('Loan amount must be positive and the origination fee must be from 0% to under 100%.');
  }
  validateLoanTerms(annualRate, termMonths);

  const originationFee = loanAmount * originationFeePercent / 100;
  const netCashReceived = loanAmount - originationFee;
  const payment = monthlyPayment(loanAmount, annualRate, termMonths);
  const totalPayments = payment * termMonths;
  const totalCost = totalPayments - netCashReceived;
  if (![originationFee, netCashReceived, totalPayments, totalCost].every(Number.isFinite)) {
    throw new Error('These inputs exceed the supported calculation range.');
  }

  return { loanAmount, originationFee, netCashReceived, monthlyPayment: payment, totalPayments, totalCost };
}

export function calculateGoldLoan(inputs: GoldLoanInputs): GoldLoanResult {
  const { netGoldWeightGrams, purityCarats, goldPricePerGram, loanToValuePercent, annualRate, termMonths } = inputs;
  if (![netGoldWeightGrams, purityCarats, goldPricePerGram, loanToValuePercent, annualRate, termMonths].every(Number.isFinite)) {
    throw new Error('Enter finite numbers for every gold-loan input.');
  }
  if (netGoldWeightGrams <= 0 || goldPricePerGram <= 0 || purityCarats <= 0 || purityCarats > 24) {
    throw new Error('Weight and price must be positive; purity must be greater than 0 and no more than 24 carats.');
  }
  if (loanToValuePercent < 0 || loanToValuePercent > 100) {
    throw new Error('Loan-to-value must be from 0% to 100%.');
  }
  validateLoanTerms(annualRate, termMonths);

  const fineGoldEquivalentGrams = netGoldWeightGrams * purityCarats / 24;
  const estimatedGoldValue = fineGoldEquivalentGrams * goldPricePerGram;
  const estimatedMaximumLoan = estimatedGoldValue * loanToValuePercent / 100;
  const payment = monthlyPayment(estimatedMaximumLoan, annualRate, termMonths);
  const totalInterest = payment * termMonths - estimatedMaximumLoan;
  if (![fineGoldEquivalentGrams, estimatedGoldValue, estimatedMaximumLoan, totalInterest].every(Number.isFinite)) {
    throw new Error('These inputs exceed the supported calculation range.');
  }

  return { fineGoldEquivalentGrams, estimatedGoldValue, estimatedMaximumLoan, monthlyPayment: payment, totalInterest };
}
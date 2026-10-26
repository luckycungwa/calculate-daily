export interface CarLoanInputs {
  vehiclePrice: number;
  taxesAndFees: number;
  downPayment: number;
  tradeInEquity: number;
  annualRate: number;
  termMonths: number;
}

export interface CarLoanResult {
  amountFinanced: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
}

export function calculateCarLoan(inputs: CarLoanInputs): CarLoanResult {
  const { vehiclePrice, taxesAndFees, downPayment, tradeInEquity, annualRate, termMonths } = inputs;
  const values = [vehiclePrice, taxesAndFees, downPayment, tradeInEquity, annualRate, termMonths];

  if (!values.every(Number.isFinite)) {
    throw new Error('Enter finite numbers for every loan input.');
  }
  if (vehiclePrice <= 0 || taxesAndFees < 0 || downPayment < 0 || annualRate < 0 || annualRate > 100) {
    throw new Error('Price must be positive; fees, down payment, and APR must be within a supported range.');
  }
  if (!Number.isInteger(termMonths) || termMonths < 1 || termMonths > 120) {
    throw new Error('Choose a whole-number loan term from 1 to 120 months.');
  }

  const amountFinanced = vehiclePrice + taxesAndFees - downPayment - tradeInEquity;
  if (!Number.isFinite(amountFinanced) || amountFinanced <= 0) {
    throw new Error('The entered cash and trade-in equity cover the amount due; no loan payment is calculated.');
  }

  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = monthlyRate === 0
    ? amountFinanced / termMonths
    : amountFinanced * monthlyRate / (1 - (1 + monthlyRate) ** -termMonths);
  const totalPayments = monthlyPayment * termMonths;
  const totalInterest = totalPayments - amountFinanced;

  if (![monthlyPayment, totalPayments, totalInterest].every(Number.isFinite)) {
    throw new Error('These inputs exceed the supported calculation range.');
  }

  return { amountFinanced, monthlyPayment, totalPayments, totalInterest };
}
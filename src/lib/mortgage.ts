export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export interface AmortizationSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffMonths: number;
  firstPayment: string;
  rows: AmortizationRow[];
}

export interface LoanInputs {
  principal: number;
  annualRate: number; // percent, e.g. 6.5
  years?: number;
  extraMonthly?: number;
  biweekly?: boolean;
  startYear?: number;
  startMonth?: number;
}

/**
 * Standard fixed-rate amortization: M = P x r x (1+r)^n / ((1+r)^n - 1)
 */
export function monthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/**
 * Build a full monthly amortization schedule, optionally accelerated by an
 * extra monthly payment or a biweekly payment mode (26 half-payments/year,
 * equivalent to 13 full payments per year).
 */
export function buildAmortization(input: LoanInputs): AmortizationSummary {
  const principal = Math.max(0, input.principal);
  const annualRate = Math.max(0, input.annualRate);
  const baseYears = Math.max(1, input.years ?? 30);
  const r = annualRate / 100 / 12;
  const base = monthlyPayment(principal, annualRate, baseYears);
  // A biweekly plan makes 26 half-payments a year, which is 13 full monthly
  // payments. Modelling that as 13/12 of the scheduled monthly amount keeps the
  // table monthly while correctly shortening the term. The extra monthly amount
  // stays a monthly addition in either mode.
  const accelerated = input.biweekly ? base * (13 / 12) : base;
  const monthly = accelerated + Math.max(0, input.extraMonthly ?? 0);

  const rows: AmortizationRow[] = [];
  let balance = principal;
  let cumulativeInterest = 0;
  let month = 0;
  const startYear = input.startYear ?? new Date().getFullYear();
  const startMonth = input.startMonth ?? new Date().getMonth();

  const cap = Math.max(12 * 100, baseYears * 12 * 2);
  while (balance > 0 && month < cap) {
    const interest = balance * r;
    let payment = monthly;
    let principalPaid = payment - interest;
    if (principalPaid <= 0) {
      principalPaid = 0;
      payment = interest;
    }
    if (principalPaid > balance) {
      principalPaid = balance;
      payment = balance + interest;
    }
    balance = Math.max(0, balance - principalPaid);
    cumulativeInterest += interest;
    month += 1;

    const d = new Date(startYear, startMonth + (month - 1), 1);
    const label = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    rows.push({
      month,
      payment: Math.round(payment * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
      cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
      // expose date for tables
    } as AmortizationRow & { date?: string });
    (rows[rows.length - 1] as any).date = label;
  }

  const totalPayment = rows.reduce((s, r) => s + r.payment, 0);
  return {
    monthlyPayment: Math.round(monthly * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(cumulativeInterest * 100) / 100,
    payoffMonths: rows.length,
    firstPayment: rows[0] ? (rows[0] as any).date : '',
    rows,
  };
}

/**
 * Monthly payment including escrow (property tax + home insurance + PMI).
 */
export function totalMonthlyPayment(input: {
  principal: number;
  annualRate: number;
  years: number;
  annualTax?: number;
  annualInsurance?: number;
  annualPmi?: number;
}): {
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  total: number;
} {
  const pi = monthlyPayment(input.principal, input.annualRate, input.years);
  const t = Math.max(0, input.annualTax ?? 0) / 12;
  const i = Math.max(0, input.annualInsurance ?? 0) / 12;
  const p = Math.max(0, input.annualPmi ?? 0) / 12;
  return {
    principalAndInterest: Math.round(pi * 100) / 100,
    monthlyTax: Math.round(t * 100) / 100,
    monthlyInsurance: Math.round(i * 100) / 100,
    monthlyPmi: Math.round(p * 100) / 100,
    total: Math.round((pi + t + i + p) * 100) / 100,
  };
}

export interface RefinanceResult {
  currentPayment: number;
  newPayment: number;
  monthlySavings: number;
  closingCosts: number;
  breakEvenMonths: number;
  interestSavedTotal: number;
}

/**
 * Refinance break-even: monthly savings vs closing costs, plus lifetime
 * interest savings on the remaining balance.
 */
export function refinanceAnalysis(input: {
  currentBalance: number;
  currentRate: number;
  newRate: number;
  remainingYears: number;
  closingCosts: number;
  newTermYears?: number;
}): RefinanceResult {
  const balance = Math.max(0, input.currentBalance);
  const remainingYears = Math.max(1, input.remainingYears);
  const newTerm = Math.max(1, input.newTermYears ?? remainingYears);
  const current = monthlyPayment(balance, input.currentRate, remainingYears);
  const fresh = monthlyPayment(balance, input.newRate, newTerm);
  const monthlySavings = Math.max(0, current - fresh);
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(input.closingCosts / monthlySavings) : Infinity;

  // Lifetime interest if holding current loan to term vs refinanced loan.
  const currentInterest = current * remainingYears * 12 - balance;
  const newInterest = fresh * newTerm * 12 - balance;
  const interestSavedTotal = Math.max(0, currentInterest - newInterest);

  return {
    currentPayment: Math.round(current * 100) / 100,
    newPayment: Math.round(fresh * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    closingCosts: Math.round(Math.max(0, input.closingCosts) * 100) / 100,
    breakEvenMonths: Number.isFinite(breakEvenMonths) ? breakEvenMonths : 0,
    interestSavedTotal: Math.round(interestSavedTotal * 100) / 100,
  };
}

export interface AffordabilityResult {
  maxHomePrice: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  monthlyDebtPayment: number;
  dti: number;
}

/**
 * How much house can I afford? Solves the largest home price whose total
 * monthly housing payment fits the back-end DTI limit (default 36%).
 */
export function affordability(input: {
  annualIncome: number;
  monthlyDebts: number;
  downPaymentPercent: number;
  annualRate: number;
  years: number;
  annualTaxPercent?: number; // of home price
  annualInsurance?: number;
  dtiLimit?: number;
}): AffordabilityResult {
  const income = Math.max(0, input.annualIncome);
  const monthlyDebts = Math.max(0, input.monthlyDebts);
  const dtiLimit = (input.dtiLimit ?? 36) / 100;
  const downPct = Math.min(0.9, Math.max(0, input.downPaymentPercent / 100));
  const years = Math.max(1, input.years);
  const taxPct = Math.max(0, input.annualTaxPercent ?? 1) / 100;
  const insuranceMonthly = Math.max(0, input.annualInsurance ?? 0) / 12;

  const monthlyBudget = (income / 12) * dtiLimit - monthlyDebts;
  if (monthlyBudget <= 0) {
    return {
      maxHomePrice: 0,
      maxLoanAmount: 0,
      monthlyPayment: 0,
      monthlyDebtPayment: monthlyDebts,
      dti: monthlyDebts > 0 ? (monthlyDebts / Math.max(1, income / 12)) * 100 : 0,
    };
  }

  // Binary search on price such that P&I + tax + insurance <= budget.
  let lo = 0;
  let hi = Math.max(monthlyBudget * years * 12 * 2, 1_000_000);
  for (let k = 0; k < 80; k++) {
    const price = (lo + hi) / 2;
    const loan = price * (1 - downPct);
    const pi = monthlyPayment(loan, input.annualRate, years);
    const total = pi + price * taxPct / 12 + insuranceMonthly;
    if (total > monthlyBudget) hi = price;
    else lo = price;
  }

  const maxHomePrice = Math.round(lo * 100) / 100;
  const maxLoanAmount = Math.round(maxHomePrice * (1 - downPct) * 100) / 100;
  const pi = monthlyPayment(maxLoanAmount, input.annualRate, years);
  const monthlyPaymentTotal = pi + (maxHomePrice * taxPct) / 12 + insuranceMonthly;
  const dti = income > 0 ? ((monthlyPaymentTotal + monthlyDebts) / (income / 12)) * 100 : 0;

  return {
    maxHomePrice,
    maxLoanAmount,
    monthlyPayment: Math.round(monthlyPaymentTotal * 100) / 100,
    monthlyDebtPayment: monthlyDebts,
    dti: Math.round(dti * 100) / 100,
  };
}

/**
 * Cumulative cost comparison for rent vs buy over a horizon.
 * Buy costs: down payment + closing + (P&I + tax + insurance) each month
 * (principal portion is captured as equity, reported separately).
 * Rent costs: rent each month, growing by a rent-increase rate.
 */
export function rentVsBuy(input: {
  homePrice: number;
  downPaymentPercent: number;
  annualRate: number;
  years: number;
  annualTaxPercent?: number;
  annualInsurance?: number;
  monthlyRent: number;
  rentIncreasePercent?: number;
  horizonYears: number;
  investmentReturnPercent?: number;
}): {
  buyCumulative: number[];
  rentCumulative: number[];
  buyEquity: number[];
  crossoverMonth: number;
  labels: string[];
} {
  const price = Math.max(0, input.homePrice);
  const down = price * (input.downPaymentPercent / 100);
  const loan = price - down;
  const pi = monthlyPayment(loan, input.annualRate, input.years);
  const taxMonthly = (price * (input.annualTaxPercent ?? 1) / 100) / 12;
  const insuranceMonthly = Math.max(0, input.annualInsurance ?? 0) / 12;
  const buyMonthly = pi + taxMonthly + insuranceMonthly;
  const rent0 = Math.max(0, input.monthlyRent);
  const rentGrowth = Math.max(0, input.rentIncreasePercent ?? 3) / 100;
  const horizon = Math.max(1, Math.min(40, input.horizonYears)) * 12;
  const investReturn = Math.max(0, input.investmentReturnPercent ?? 5) / 100 / 12;

  const buyCumulative: number[] = [];
  const rentCumulative: number[] = [];
  const buyEquity: number[] = [];
  const labels: string[] = [];

  let balance = loan;
  let buySpent = down;
  let rentSpent = 0;
  let principalPaidTotal = 0;

  const startYear = new Date().getFullYear();
  const startMonth = new Date().getMonth();
  const r = input.annualRate / 100 / 12;

  let crossoverMonth = -1;
  for (let m = 1; m <= horizon; m++) {
    const interest = balance * r;
    let principalPart = Math.max(0, pi - interest);
    if (principalPart > balance) principalPart = balance;
    balance = Math.max(0, balance - principalPart);
    principalPaidTotal += principalPart;

    buySpent += buyMonthly;
    rentSpent += rent0 * Math.pow(1 + rentGrowth, Math.floor((m - 1) / 12));

    buyCumulative.push(Math.round(buySpent * 100) / 100);
    rentCumulative.push(Math.round(rentSpent * 100) / 100);
    buyEquity.push(Math.round(principalPaidTotal * 100) / 100);

    if (crossoverMonth < 0 && m > 1 && rentSpent > buySpent) {
      crossoverMonth = m;
    }

    const d = new Date(startYear, startMonth + m, 1);
    labels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  return { buyCumulative, rentCumulative, buyEquity, crossoverMonth, labels };
}
export interface CompoundInterestResult {
  principal: number;
  monthlyContribution: number;
  futureValue: number;
  totalDeposited: number;
  totalInterestEarned: number;
  interestRatio: number;
  principalRatio: number;
}

/**
 * Year-end balance and deposit totals for the projection chart. Uses exactly
 * the same monthly-compounding model as calculateCompoundInterest: balance at
 * the end of year y is the future value of the closing contributions of month
 * 12*y. The chart is only allowed to render values from this function.
 */
export function compoundInterestYearlySeries(
  principal: number,
  monthlyContribution: number,
  annualRatePercent: number,
  years: number
): { year: number; balance: number; deposited: number; interestEarned: number }[] {
  const P = Math.max(0, principal);
  const PMT = Math.max(0, monthlyContribution);
  const rate = Math.max(0, annualRatePercent) / 100;
  const termYears = Math.max(1, Math.floor(years || 1));
  const monthlyRate = rate / 12;

  const series: { year: number; balance: number; deposited: number; interestEarned: number }[] = [];
  for (let y = 1; y <= termYears; y++) {
    const months = y * 12;
    const balance =
      P * Math.pow(1 + monthlyRate, months) +
      (monthlyRate > 0
        ? PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        : PMT * months);
    const deposited = P + PMT * months;
    series.push({
      year: y,
      balance,
      deposited,
      interestEarned: Math.max(0, balance - deposited),
    });
  }
  return series;
}

export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRatePercent: number,
  years: number
): CompoundInterestResult {
  const P = Math.max(0, principal);
  const PMT = Math.max(0, monthlyContribution);
  const rate = Math.max(0, annualRatePercent) / 100;
  const termYears = Math.max(1, years || 1);
  const months = termYears * 12;
  const monthlyRate = rate / 12;

  const futurePrincipal = P * Math.pow(1 + monthlyRate, months);
  const futureContributions =
    monthlyRate > 0
      ? PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : PMT * months;
  const futureValue = futurePrincipal + futureContributions;
  const totalDeposited = P + PMT * months;
  const totalInterestEarned = Math.max(0, futureValue - totalDeposited);
  const interestRatio = futureValue > 0 ? (totalInterestEarned / futureValue) * 100 : 0;

  return {
    principal: P,
    monthlyContribution: PMT,
    futureValue,
    totalDeposited,
    totalInterestEarned,
    interestRatio,
    principalRatio: 100 - interestRatio,
  };
}

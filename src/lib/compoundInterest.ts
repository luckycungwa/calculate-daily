export interface CompoundInterestResult {
  principal: number;
  monthlyContribution: number;
  futureValue: number;
  totalDeposited: number;
  totalInterestEarned: number;
  interestRatio: number;
  principalRatio: number;
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

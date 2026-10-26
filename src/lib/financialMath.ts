/**
 * Financial math for discounted cash flow and tax-agnostic money tools.
 *
 * None of these functions encode a jurisdiction's tax rates. Where a rate is needed it is supplied
 * by the caller, so the tool cannot silently go stale when legislation changes.
 */

export function parseCashFlowList(input: string): number[] {
  const parts = input
    .split(/[\s,;]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  if (parts.length < 2) {
    throw new RangeError('Enter at least two cash flows, starting with the initial investment.');
  }
  const values = parts.map((part) => Number(part.replace(/[()]/g, (match) => (match === '(' ? '-' : ''))));
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError('Every cash flow must be a number. Use a minus sign for money paid out.');
  }
  return values;
}

/**
 * Net present value of a cash-flow series where cashFlows[0] occurs at t = 0.
 * Rates are decimals (0.1 = 10%).
 */
export function calculateNpv(rate: number, cashFlows: number[]): number {
  if (!Number.isFinite(rate) || rate <= -1) {
    throw new RangeError('Discount rate must be greater than -100%.');
  }
  if (!Array.isArray(cashFlows) || cashFlows.length < 2) {
    throw new RangeError('Enter at least two cash flows.');
  }
  if (cashFlows.some((value) => !Number.isFinite(value))) {
    throw new RangeError('Every cash flow must be a finite number.');
  }
  return cashFlows.reduce((total, flow, index) => total + flow / (1 + rate) ** index, 0);
}

/**
 * Internal rate of return by bisection. Returns a decimal rate, or throws when the series has no
 * sign change (which means no conventional IRR exists).
 */
export function calculateIrr(cashFlows: number[], guessLow = -0.9999, guessHigh = 10): number {
  if (!Array.isArray(cashFlows) || cashFlows.length < 2) {
    throw new RangeError('Enter at least two cash flows.');
  }
  if (!cashFlows.some((value) => value < 0) || !cashFlows.some((value) => value > 0)) {
    throw new RangeError('Cash flows need at least one negative and one positive value to have an IRR.');
  }

  let low = guessLow;
  let high = guessHigh;
  let lowValue = calculateNpv(low, cashFlows);
  let highValue = calculateNpv(high, cashFlows);

  if (lowValue * highValue > 0) {
    throw new RangeError('No internal rate of return exists between -100% and 1,000% for these cash flows.');
  }

  for (let iteration = 0; iteration < 200; iteration += 1) {
    const mid = (low + high) / 2;
    const midValue = calculateNpv(mid, cashFlows);
    if (Math.abs(midValue) < 1e-9 || (high - low) / 2 < 1e-10) {
      return mid;
    }
    if (lowValue * midValue <= 0) {
      high = mid;
      highValue = midValue;
    } else {
      low = mid;
      lowValue = midValue;
    }
  }

  return (low + high) / 2;
}

export interface InflationResult {
  futureCost: number;
  purchasingPower: number;
  cumulativeInflationPercent: number;
  realChangePercent: number;
}

export function calculateInflation(amount: number, annualRatePercent: number, years: number): InflationResult {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError('Amount must be zero or greater.');
  }
  if (!Number.isFinite(annualRatePercent)) {
    throw new RangeError('Inflation rate must be a number.');
  }
  if (!Number.isFinite(years) || years < 0 || years > 100) {
    throw new RangeError('Years must be between 0 and 100.');
  }

  const factor = (1 + annualRatePercent / 100) ** years;
  if (!Number.isFinite(factor) || factor <= 0) {
    throw new RangeError('These values do not produce a valid inflation factor.');
  }

  return {
    futureCost: amount * factor,
    purchasingPower: amount / factor,
    cumulativeInflationPercent: (factor - 1) * 100,
    realChangePercent: (1 / factor - 1) * 100,
  };
}

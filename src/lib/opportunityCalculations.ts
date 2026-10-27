export type PriceUnit = 'g' | 'kg' | 'oz' | 'lb' | 'ml' | 'l' | 'count';

export interface UnitPriceItem {
  name: string;
  price: number;
  quantity: number;
  unit: PriceUnit;
}

const UNIT_FACTORS: Record<PriceUnit, { dimension: 'weight' | 'volume' | 'count'; base: number }> = {
  g: { dimension: 'weight', base: 1 },
  kg: { dimension: 'weight', base: 1000 },
  oz: { dimension: 'weight', base: 28.349523125 },
  lb: { dimension: 'weight', base: 453.59237 },
  ml: { dimension: 'volume', base: 1 },
  l: { dimension: 'volume', base: 1000 },
  count: { dimension: 'count', base: 1 },
};

export interface UnitPriceResult {
  items: Array<UnitPriceItem & { pricePerBase: number; pricePerDisplayUnit: number }>;
  displayUnit: string;
  bestIndex: number;
  savingPercent: number;
}

export function compareUnitPrices(items: UnitPriceItem[]): UnitPriceResult {
  if (items.length < 2) throw new RangeError('Enter at least two products to compare.');
  if (items.some((item) => !Number.isFinite(item.price) || item.price < 0)) {
    throw new RangeError('Product prices must be zero or greater.');
  }
  if (items.some((item) => !Number.isFinite(item.quantity) || item.quantity <= 0)) {
    throw new RangeError('Product quantities must be greater than zero.');
  }

  const dimension = UNIT_FACTORS[items[0].unit].dimension;
  if (items.some((item) => UNIT_FACTORS[item.unit].dimension !== dimension)) {
    throw new RangeError('Compare products in the same unit family: weight, volume, or count.');
  }

  const baseUnit = dimension === 'weight' ? 'g' : dimension === 'volume' ? 'ml' : 'item';
  const displayMultiplier = dimension === 'count' ? 1 : 100;
  const displayUnit = dimension === 'count' ? 'item' : `100 ${baseUnit}`;
  const results = items.map((item) => {
    const quantityInBase = item.quantity * UNIT_FACTORS[item.unit].base;
    const pricePerBase = item.price / quantityInBase;
    const pricePerDisplayUnit = pricePerBase * displayMultiplier;
    if (!Number.isFinite(quantityInBase) || quantityInBase <= 0 ||
        !Number.isFinite(pricePerBase) || !Number.isFinite(pricePerDisplayUnit)) {
      throw new RangeError('The entered package size and price are outside the supported calculation range.');
    }
    return {
      ...item,
      pricePerBase,
      pricePerDisplayUnit,
    };
  });
  const bestIndex = results.reduce(
    (best, item, index) => item.pricePerBase < results[best].pricePerBase ? index : best,
    0
  );
  const highestPrice = Math.max(...results.map((item) => item.pricePerBase));
  const lowestPrice = results[bestIndex].pricePerBase;

  return {
    items: results,
    displayUnit,
    bestIndex,
    savingPercent: highestPrice > 0 ? ((highestPrice - lowestPrice) / highestPrice) * 100 : 0,
  };
}

export interface BreakEvenResult {
  contributionPerUnit: number;
  contributionMarginPercent: number;
  exactUnits: number;
  wholeUnits: number;
  breakEvenRevenue: number;
  marginOfSafetyUnits: number | null;
}

export function calculateBreakEven(input: {
  fixedCosts: number;
  sellingPrice: number;
  variableCost: number;
  unitsSold?: number;
}): BreakEvenResult {
  const { fixedCosts, sellingPrice, variableCost } = input;
  if (![fixedCosts, sellingPrice, variableCost].every(Number.isFinite) ||
      fixedCosts < 0 || sellingPrice < 0 || variableCost < 0) {
    throw new RangeError('Costs and selling price must be finite and zero or greater.');
  }

  const contributionPerUnit = sellingPrice - variableCost;
  if (contributionPerUnit <= 0 && fixedCosts > 0) {
    throw new RangeError('Selling price must exceed variable cost to reach break-even.');
  }
  if (input.unitsSold !== undefined &&
      (!Number.isFinite(input.unitsSold) || input.unitsSold < 0)) {
    throw new RangeError('Units sold must be zero or greater.');
  }

  const exactUnits = fixedCosts === 0 ? 0 : fixedCosts / contributionPerUnit;
  const wholeUnits = Math.ceil(exactUnits);
  const breakEvenRevenue = wholeUnits * sellingPrice;
  if (!Number.isFinite(exactUnits) || !Number.isSafeInteger(wholeUnits) || !Number.isFinite(breakEvenRevenue)) {
    throw new RangeError('The break-even result is outside the supported calculation range.');
  }
  return {
    contributionPerUnit,
    contributionMarginPercent: sellingPrice > 0 ? (contributionPerUnit / sellingPrice) * 100 : 0,
    exactUnits,
    wholeUnits,
    breakEvenRevenue,
    marginOfSafetyUnits: input.unitsSold === undefined ? null : input.unitsSold - wholeUnits,
  };
}

export type FractionOperation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface FractionResult {
  numerator: number;
  denominator: number;
  decimal: number;
  steps: string;
}

function gcd(a: number, b: number): number {
  let left = Math.abs(a);
  let right = Math.abs(b);
  while (right !== 0) {
    [left, right] = [right, left % right];
  }
  return left || 1;
}

export function calculateFraction(
  aNumerator: number,
  aDenominator: number,
  bNumerator: number,
  bDenominator: number,
  operation: FractionOperation
): FractionResult {
  const values = [aNumerator, aDenominator, bNumerator, bDenominator];
  if (values.some((value) => !Number.isSafeInteger(value) || Math.abs(value) > 1_000_000)) {
    throw new RangeError('Use whole-number numerator and denominator values between -1,000,000 and 1,000,000.');
  }
  if (aDenominator === 0 || bDenominator === 0) {
    throw new RangeError('A fraction denominator cannot be zero.');
  }
  if (operation === 'divide' && bNumerator === 0) {
    throw new RangeError('Cannot divide by a fraction equal to zero.');
  }

  const leftDenominator = Math.abs(aDenominator);
  const rightDenominator = Math.abs(bDenominator);
  const leftNumerator = aDenominator < 0 ? -aNumerator : aNumerator;
  const rightNumerator = bDenominator < 0 ? -bNumerator : bNumerator;
  let numerator: number;
  let denominator: number;
  let steps: string;

  if (operation === 'add' || operation === 'subtract') {
    const sign = operation === 'add' ? 1 : -1;
    numerator = leftNumerator * rightDenominator + sign * rightNumerator * leftDenominator;
    denominator = leftDenominator * rightDenominator;
    steps = `(${leftNumerator} × ${rightDenominator} ${sign === 1 ? '+' : '−'} ${rightNumerator} × ${leftDenominator}) / (${leftDenominator} × ${rightDenominator})`;
  } else if (operation === 'multiply') {
    numerator = leftNumerator * rightNumerator;
    denominator = leftDenominator * rightDenominator;
    steps = `(${leftNumerator} × ${rightNumerator}) / (${leftDenominator} × ${rightDenominator})`;
  } else {
    numerator = leftNumerator * rightDenominator;
    denominator = leftDenominator * rightNumerator;
    steps = `(${leftNumerator} × ${rightDenominator}) / (${leftDenominator} × ${rightNumerator})`;
  }

  if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator)) {
    throw new RangeError('The calculation is too large to represent safely. Use smaller values.');
  }
  if (denominator < 0) {
    numerator *= -1;
    denominator *= -1;
  }
  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  return { numerator, denominator, decimal: numerator / denominator, steps };
}

export interface ShiftInput {
  start: string;
  end: string;
  breakMinutes: number;
}

export interface WeeklyHoursResult {
  dailyHours: number[];
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  grossPay: number;
}

function timeToMinutes(time: string): number | null {
  if (!time) return null;
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

export function calculateWeeklyHours(
  shifts: ShiftInput[],
  hourlyRate: number,
  overtimeThreshold = 40,
  overtimeMultiplier = 1.5
): WeeklyHoursResult {
  if (![hourlyRate, overtimeThreshold, overtimeMultiplier].every(Number.isFinite) ||
      hourlyRate < 0 || overtimeThreshold < 0 || overtimeMultiplier < 1) {
    throw new RangeError('Pay rate and threshold must be zero or greater, and overtime multiplier must be at least 1.');
  }

  const dailyHours = shifts.map((shift) => {
    if (!shift.start && !shift.end) return 0;
    const start = timeToMinutes(shift.start);
    const end = timeToMinutes(shift.end);
    if (start === null || end === null) {
      throw new RangeError('Enter valid start and end times for each worked day.');
    }
    if (!Number.isFinite(shift.breakMinutes) || shift.breakMinutes < 0) {
      throw new RangeError('Break duration must be zero or greater.');
    }
    let duration = end - start;
    if (duration < 0) duration += 24 * 60;
    if (shift.breakMinutes > duration) {
      throw new RangeError('A break cannot be longer than the shift.');
    }
    return (duration - shift.breakMinutes) / 60;
  });

  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const regularHours = Math.min(totalHours, overtimeThreshold);
  const overtimeHours = Math.max(0, totalHours - overtimeThreshold);
  const grossPay = regularHours * hourlyRate + overtimeHours * hourlyRate * overtimeMultiplier;
  if (![totalHours, regularHours, overtimeHours, grossPay].every(Number.isFinite)) {
    throw new RangeError('The timesheet result is outside the supported calculation range.');
  }
  return {
    dailyHours,
    totalHours,
    regularHours,
    overtimeHours,
    grossPay,
  };
}

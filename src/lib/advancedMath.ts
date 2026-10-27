/**
 * Advanced math: dataset statistics, the normal distribution, and triangle solving.
 *
 * Every function is pure and throws RangeError on inputs that have no defined answer, so the UI
 * can show a message instead of NaN. Percentiles use linear interpolation (the Excel
 * PERCENTILE.INC / NumPy "linear" convention), which is stated in each page's content.
 */

// ==========================================
// Dataset statistics
// ==========================================

export interface DatasetSummary {
  count: number;
  mean: number;
  min: number;
  max: number;
  range: number;
  sampleVariance: number;
  populationVariance: number;
  sampleStandardDeviation: number;
  populationStandardDeviation: number;
  sum: number;
}

export function parseNumberList(input: string): number[] {
  const parts = input
    .split(/[\s,;]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  if (parts.length === 0) {
    throw new RangeError('Enter at least one number.');
  }
  const values = parts.map((part) => Number(part));
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError('Every value must be a number. Remove any letters or stray symbols.');
  }
  return values;
}

export function summarizeDataset(values: number[]): DatasetSummary {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('Enter at least one number.');
  }
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError('Every value must be a finite number.');
  }
  const count = values.length;
  const sum = values.reduce((total, value) => total + value, 0);
  const mean = sum / count;
  const squaredDeviations = values.reduce((total, value) => total + (value - mean) ** 2, 0);
  const populationVariance = squaredDeviations / count;
  const sampleVariance = count > 1 ? squaredDeviations / (count - 1) : Number.NaN;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    count,
    mean,
    min,
    max,
    range: max - min,
    sampleVariance,
    populationVariance,
    sampleStandardDeviation: Math.sqrt(sampleVariance),
    populationStandardDeviation: Math.sqrt(populationVariance),
    sum,
  };
}

/**
 * Percentile with linear interpolation. p is 0–100.
 */
export function percentile(values: number[], p: number): number {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('Enter at least one number.');
  }
  if (!Number.isFinite(p) || p < 0 || p > 100) {
    throw new RangeError('Percentile must be between 0 and 100.');
  }
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (sorted.length - 1) * (p / 100);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sorted[lower];
  const weight = rank - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * Percentage of observations strictly below a value, plus half of any exact ties.
 */
export function percentileRank(values: number[], value: number): number {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('Enter at least one number.');
  }
  if (!Number.isFinite(value)) {
    throw new RangeError('Enter the value you want to rank.');
  }
  let below = 0;
  let equal = 0;
  for (const item of values) {
    if (item < value) below += 1;
    else if (item === value) equal += 1;
  }
  return ((below + equal / 2) / values.length) * 100;
}

// ==========================================
// Normal distribution
// ==========================================

/** Abramowitz & Stegun 7.1.26 error-function approximation (|error| < 1.5e-7). */
export function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * ax);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sign * y;
}

export function normalCdf(x: number, mean = 0, standardDeviation = 1): number {
  if (!Number.isFinite(x) || !Number.isFinite(mean) || !Number.isFinite(standardDeviation)) {
    throw new RangeError('Enter finite numbers for the value, mean, and standard deviation.');
  }
  if (standardDeviation <= 0) {
    throw new RangeError('Standard deviation must be greater than zero.');
  }
  return 0.5 * (1 + erf((x - mean) / (standardDeviation * Math.SQRT2)));
}

export function normalPdf(x: number, mean = 0, standardDeviation = 1): number {
  if (standardDeviation <= 0) {
    throw new RangeError('Standard deviation must be greater than zero.');
  }
  const exponent = -0.5 * ((x - mean) / standardDeviation) ** 2;
  return (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

export interface NormalRangeResult {
  zLower: number;
  zUpper: number;
  probability: number;
  percent: number;
}

export function normalRangeProbability(
  lower: number,
  upper: number,
  mean = 0,
  standardDeviation = 1
): NormalRangeResult {
  if (lower > upper) {
    throw new RangeError('The lower bound must not be greater than the upper bound.');
  }
  const zLower = (lower - mean) / standardDeviation;
  const zUpper = (upper - mean) / standardDeviation;
  const probability = normalCdf(upper, mean, standardDeviation) - normalCdf(lower, mean, standardDeviation);
  return { zLower, zUpper, probability, percent: probability * 100 };
}

/**
 * Inverse standard normal CDF (Acklam's rational approximation), used for "middle 95%" style
 * intervals. p must be strictly between 0 and 1.
 */
export function normalQuantile(p: number, mean = 0, standardDeviation = 1): number {
  if (!Number.isFinite(p) || p <= 0 || p >= 1) {
    throw new RangeError('Probability must be greater than 0 and less than 1.');
  }
  if (standardDeviation <= 0) {
    throw new RangeError('Standard deviation must be greater than zero.');
  }
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  let q: number;
  let r: number;
  let x: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  return mean + standardDeviation * x;
}

// ==========================================
// Triangle solver
// ==========================================

export type TriangleMode = 'sss' | 'sas' | 'asa' | 'aas';

export interface TriangleInput {
  mode: TriangleMode;
  /** Side a is opposite angle A, side b opposite B, side c opposite C. */
  a?: number;
  b?: number;
  c?: number;
  A?: number;
  B?: number;
  C?: number;
}

export interface TriangleResult {
  a: number;
  b: number;
  c: number;
  A: number;
  B: number;
  C: number;
  area: number;
  perimeter: number;
  /** Degrees. */
  anglesSum: number;
  type: 'Equilateral' | 'Isosceles' | 'Scalene';
}

const DEG = Math.PI / 180;

function requirePositive(value: number | undefined, label: string): number {
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive number.`);
  }
  return value;
}

function requireAngle(value: number | undefined, label: string): number {
  if (value === undefined || !Number.isFinite(value) || value <= 0 || value >= 180) {
    throw new RangeError(`${label} must be between 0 and 180 degrees.`);
  }
  return value;
}

export function solveTriangle(input: TriangleInput): TriangleResult {
  let a: number;
  let b: number;
  let c: number;
  let A: number;
  let B: number;
  let C: number;

  if (input.mode === 'sss') {
    a = requirePositive(input.a, 'Side a');
    b = requirePositive(input.b, 'Side b');
    c = requirePositive(input.c, 'Side c');
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new RangeError('These sides cannot form a triangle: each pair must add up to more than the third side.');
    }
    A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) / DEG;
    B = Math.acos((a * a + c * c - b * b) / (2 * a * c)) / DEG;
    C = 180 - A - B;
  } else if (input.mode === 'sas') {
    a = requirePositive(input.a, 'Side a');
    b = requirePositive(input.b, 'Side b');
    C = requireAngle(input.C, 'Included angle C');
    c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * DEG));
    A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) / DEG;
    B = 180 - A - C;
  } else {
    A = requireAngle(input.A, 'Angle A');
    B = requireAngle(input.B, 'Angle B');
    if (A + B >= 180) {
      throw new RangeError('Angles A and B must add up to less than 180 degrees.');
    }
    C = 180 - A - B;
    const knownSide = input.mode === 'asa' ? requirePositive(input.c, 'Side c (between A and B)') : requirePositive(input.a, 'Side a (opposite A)');
    // Law of sines. For ASA the known side c sits between angles A and B; for AAS the known side a
    // is opposite angle A.
    if (input.mode === 'asa') {
      a = (knownSide * Math.sin(A * DEG)) / Math.sin(C * DEG);
      b = (knownSide * Math.sin(B * DEG)) / Math.sin(C * DEG);
      c = knownSide;
    } else {
      a = knownSide;
      b = (a * Math.sin(B * DEG)) / Math.sin(A * DEG);
      c = (a * Math.sin(C * DEG)) / Math.sin(A * DEG);
    }
  }

  if (![a, b, c, A, B, C].every((value) => Number.isFinite(value))) {
    throw new RangeError('These values do not produce a valid triangle.');
  }
  if (Math.min(A, B, C) <= 0) {
    throw new RangeError('These values do not produce a valid triangle.');
  }

  const semiPerimeter = (a + b + c) / 2;
  const areaSquared = semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c);
  if (areaSquared <= 0) {
    throw new RangeError('These values describe a degenerate triangle with zero area.');
  }

  const sortedSides = [a, b, c].sort((x, y) => x - y);
  const type: TriangleResult['type'] =
    Math.abs(sortedSides[0] - sortedSides[2]) < 1e-8
      ? 'Equilateral'
      : Math.abs(sortedSides[0] - sortedSides[1]) < 1e-8 || Math.abs(sortedSides[1] - sortedSides[2]) < 1e-8
        ? 'Isosceles'
        : 'Scalene';

  return {
    a,
    b,
    c,
    A,
    B,
    C,
    area: Math.sqrt(areaSquared),
    perimeter: a + b + c,
    anglesSum: A + B + C,
    type,
  };
}

// ==========================================
// Fractions
// ==========================================

export interface FractionToDecimalResult {
  decimal: number;
  percent: number;
  numerator: number;
  denominator: number;
  mixedWhole: number;
  mixedNumerator: number;
  mixedDenominator: number;
  isTerminating: boolean;
}

function greatestCommonDivisor(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y > 0) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

export function fractionToDecimal(numerator: number, denominator: number): FractionToDecimalResult {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    throw new RangeError('Enter a finite numerator and denominator.');
  }
  if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
    throw new RangeError('Numerator and denominator must be whole numbers.');
  }
  if (denominator === 0) {
    throw new RangeError('The denominator cannot be zero.');
  }

  // Move a negative denominator's sign to the numerator.
  let n = numerator;
  let d = denominator;
  if (d < 0) {
    n = -n;
    d = -d;
  }

  const divisor = greatestCommonDivisor(n, d);
  const simplifiedNumerator = n / divisor;
  const simplifiedDenominator = d / divisor;

  const decimal = n / d;
  const whole = Math.trunc(decimal);
  const remainderAbs = Math.abs(n) % d;

  // A reduced fraction terminates only if its denominator factors into 2s and 5s.
  let reducedDenominator = simplifiedDenominator;
  while (reducedDenominator % 2 === 0) reducedDenominator /= 2;
  while (reducedDenominator % 5 === 0) reducedDenominator /= 5;
  const isTerminating = reducedDenominator === 1;

  return {
    decimal,
    percent: decimal * 100,
    numerator: simplifiedNumerator,
    denominator: simplifiedDenominator,
    mixedWhole: whole,
    mixedNumerator: remainderAbs / divisor,
    mixedDenominator: d / divisor,
    isTerminating,
  };
}

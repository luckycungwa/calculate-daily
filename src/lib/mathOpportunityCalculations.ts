export function calculateZScore(value: number, mean: number, standardDeviation: number): number {
  if (![value, mean, standardDeviation].every(Number.isFinite)) {
    throw new RangeError('Value, mean, and standard deviation must be finite numbers.');
  }
  if (standardDeviation <= 0) {
    throw new RangeError('Standard deviation must be greater than zero.');
  }

  const zScore = (value - mean) / standardDeviation;
  if (!Number.isFinite(zScore)) {
    throw new RangeError('The z-score is outside the supported calculation range.');
  }
  return zScore;
}

export type SolidShape = 'cube' | 'rectangular-prism' | 'sphere' | 'cylinder' | 'cone';
export type VolumeDimension = 'side' | 'length' | 'width' | 'height' | 'radius';

export interface SolidVolumeInput {
  shape: SolidShape;
  dimensions: Partial<Record<VolumeDimension, number>>;
}

export const SOLID_DIMENSIONS: Record<SolidShape, VolumeDimension[]> = {
  cube: ['side'],
  'rectangular-prism': ['length', 'width', 'height'],
  sphere: ['radius'],
  cylinder: ['radius', 'height'],
  cone: ['radius', 'height'],
};

function getDimension(
  dimensions: Partial<Record<VolumeDimension, number>>,
  id: VolumeDimension
): number {
  const value = dimensions[id];
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    throw new RangeError('Enter a finite dimension greater than zero for every required measurement.');
  }
  return value;
}

export function calculateSolidVolume({ shape, dimensions }: SolidVolumeInput): number {
  for (const dimension of SOLID_DIMENSIONS[shape]) {
    getDimension(dimensions, dimension);
  }

  let volume: number;
  switch (shape) {
    case 'cube': {
      const side = getDimension(dimensions, 'side');
      volume = side ** 3;
      break;
    }
    case 'rectangular-prism':
      volume =
        getDimension(dimensions, 'length') *
        getDimension(dimensions, 'width') *
        getDimension(dimensions, 'height');
      break;
    case 'sphere': {
      const radius = getDimension(dimensions, 'radius');
      volume = (4 / 3) * Math.PI * radius ** 3;
      break;
    }
    case 'cylinder': {
      const radius = getDimension(dimensions, 'radius');
      volume = Math.PI * radius ** 2 * getDimension(dimensions, 'height');
      break;
    }
    case 'cone': {
      const radius = getDimension(dimensions, 'radius');
      volume = (Math.PI * radius ** 2 * getDimension(dimensions, 'height')) / 3;
      break;
    }
  }

  if (!Number.isFinite(volume) || volume <= 0) {
    throw new RangeError('The volume is outside the supported calculation range.');
  }
  return volume;
}


function assertPositiveFinite(values: number[], label: string): void {
  if (!values.every((value) => Number.isFinite(value) && value > 0)) {
    throw new RangeError(`${label} must contain finite numbers greater than zero.`);
  }
}
function greatestCommonDivisor(a: number, b: number): number {
  let left = Math.abs(a), right = Math.abs(b);
  while (right !== 0) { const remainder = left % right; left = right; right = remainder; }
  return left;
}
export function calculateMissingRatioTerm(a: number, b: number, c: number): number {
  assertPositiveFinite([a, b, c], 'Ratio terms');
  const result = (b * c) / a;
  if (!Number.isFinite(result) || result <= 0) throw new RangeError('The missing proportion term is outside the supported calculation range.');
  return result;
}
export function simplifyRatio(a: number, b: number): { a: number; b: number; divisor: number } {
  assertPositiveFinite([a, b], 'Ratio terms');
  const precision = 1_000_000;
  const scaledA = Math.round(a * precision), scaledB = Math.round(b * precision);
  if (!Number.isSafeInteger(scaledA) || !Number.isSafeInteger(scaledB) || scaledA <= 0 || scaledB <= 0 ||
      Math.abs(a - scaledA / precision) > 1e-9 || Math.abs(b - scaledB / precision) > 1e-9) {
    throw new RangeError('Enter positive ratio terms with up to six decimal places and within the supported range.');
  }
  const divisor = greatestCommonDivisor(scaledA, scaledB);
  if (!divisor) throw new RangeError('The ratio could not be simplified.');
  return { a: scaledA / divisor, b: scaledB / divisor, divisor: divisor / precision };
}
export function scaleRatioToFirstTerm(a: number, b: number, newA: number): number {
  assertPositiveFinite([a, b, newA], 'Ratio terms and target value');
  const result = (newA * b) / a;
  if (!Number.isFinite(result) || result <= 0) throw new RangeError('The scaled ratio term is outside the supported calculation range.');
  return result;
}
/** Returns 1 when A:B is larger, -1 when C:D is larger, and 0 when equivalent. */
export function compareRatios(a: number, b: number, c: number, d: number): -1 | 0 | 1 {
  assertPositiveFinite([a, b, c, d], 'Ratio terms');
  const left = a * d, right = b * c;
  if (!Number.isFinite(left) || !Number.isFinite(right)) throw new RangeError('The ratio comparison is outside the supported calculation range.');
  return left === right ? 0 : left > right ? 1 : -1;
}
export function splitTotalByRatio(total: number, a: number, b: number): { shareA: number; shareB: number } {
  if (!Number.isFinite(total) || total < 0) throw new RangeError('The total must be a finite number greater than or equal to zero.');
  assertPositiveFinite([a, b], 'Ratio terms');
  const sum = a + b, shareA = (total * a) / sum, shareB = (total * b) / sum;
  if (!Number.isFinite(shareA) || !Number.isFinite(shareB)) throw new RangeError('The ratio shares are outside the supported calculation range.');
  return { shareA, shareB };
}

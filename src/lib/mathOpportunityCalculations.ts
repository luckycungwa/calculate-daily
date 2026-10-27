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

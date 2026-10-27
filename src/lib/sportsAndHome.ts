/**
 * Race, golf, pet, garden, and moving arithmetic.
 *
 * These functions are deliberately pure and unit-explicit: the UI decides how to label them, and the
 * tests here pin down the formulas without depending on React.
 */

// ==========================================
// Race time prediction (Riegel)
// ==========================================

export interface RacePrediction {
  seconds: number;
  minutes: number;
  paceSecondsPerKm: number;
}

/**
 * Riegel's endurance formula: T2 = T1 × (D2 / D1)^1.06.
 * The exponent 1.06 is the widely used endurance approximation, not a law; it fits road races better
 * than track races and drifts for very long or very short efforts.
 */
export function predictRaceTime(
  knownDistanceKm: number,
  knownTimeSeconds: number,
  targetDistanceKm: number,
  exponent = 1.06
): RacePrediction {
  if (!Number.isFinite(knownDistanceKm) || knownDistanceKm <= 0) {
    throw new RangeError('Known distance must be greater than zero.');
  }
  if (!Number.isFinite(knownTimeSeconds) || knownTimeSeconds <= 0) {
    throw new RangeError('Known time must be greater than zero.');
  }
  if (!Number.isFinite(targetDistanceKm) || targetDistanceKm <= 0) {
    throw new RangeError('Target distance must be greater than zero.');
  }
  if (!Number.isFinite(exponent) || exponent <= 0 || exponent > 2) {
    throw new RangeError('The endurance exponent must be between 0 and 2.');
  }

  const seconds = knownTimeSeconds * Math.pow(targetDistanceKm / knownDistanceKm, exponent);
  return {
    seconds,
    minutes: seconds / 60,
    paceSecondsPerKm: seconds / targetDistanceKm,
  };
}

export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '—';
  const rounded = Math.round(totalSeconds);
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const seconds = rounded % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// ==========================================
// Golf handicap (World Handicap System)
// ==========================================

export interface HandicapResult {
  index: number | null;
  used: number;
  adjustment: number;
  differentialsCount: number;
}

/**
 * Score differential for one round: (adjusted gross score − course rating) × 113 ÷ slope rating.
 * 113 is the neutral slope, so a course of standard difficulty leaves the differential unchanged.
 */
export function golfDifferential(adjustedScore: number, courseRating: number, slopeRating: number): number {
  if (!Number.isFinite(adjustedScore) || adjustedScore <= 0) {
    throw new RangeError('Score must be greater than zero.');
  }
  if (!Number.isFinite(courseRating) || courseRating <= 0) {
    throw new RangeError('Course rating must be greater than zero.');
  }
  if (!Number.isFinite(slopeRating) || slopeRating < 55 || slopeRating > 155) {
    throw new RangeError('Slope rating must be between 55 and 155.');
  }
  return ((adjustedScore - courseRating) * 113) / slopeRating;
}

interface HandicapRule {
  maxDifferentials: number;
  useLowest: number;
  adjustment: number;
}

/** WHS table for 3–20 differentials. Below three rounds no index is issued. */
const HANDICAP_RULES: HandicapRule[] = [
  { maxDifferentials: 3, useLowest: 1, adjustment: -2.0 },
  { maxDifferentials: 4, useLowest: 1, adjustment: -1.0 },
  { maxDifferentials: 5, useLowest: 1, adjustment: 0 },
  { maxDifferentials: 6, useLowest: 2, adjustment: -1.0 },
  { maxDifferentials: 8, useLowest: 2, adjustment: 0 },
  { maxDifferentials: 11, useLowest: 3, adjustment: 0 },
  { maxDifferentials: 14, useLowest: 4, adjustment: 0 },
  { maxDifferentials: 16, useLowest: 5, adjustment: 0 },
  { maxDifferentials: 18, useLowest: 6, adjustment: 0 },
  { maxDifferentials: 19, useLowest: 7, adjustment: 0 },
  { maxDifferentials: 20, useLowest: 8, adjustment: 0 },
];

/**
 * Rounds to the nearest tenth, the precision the WHS uses for a Handicap Index.
 * The most recent 20 differentials are used when more are supplied.
 */
export function golfHandicapIndex(differentials: number[]): HandicapResult {
  if (!Array.isArray(differentials) || differentials.length === 0) {
    throw new RangeError('Enter at least three score differentials.');
  }
  for (const value of differentials) {
    if (!Number.isFinite(value)) {
      throw new RangeError('Every differential must be a number.');
    }
    if (value < -10 || value > 60) {
      throw new RangeError('Differentials must be between -10 and 60.');
    }
  }

  const recent = differentials.slice(-20);
  if (recent.length < 3) {
    return { index: null, used: 0, adjustment: 0, differentialsCount: recent.length };
  }

  const rule = HANDICAP_RULES.find((entry) => recent.length <= entry.maxDifferentials) ?? HANDICAP_RULES[HANDICAP_RULES.length - 1];
  const lowest = [...recent].sort((a, b) => a - b).slice(0, rule.useLowest);
  const average = lowest.reduce((sum, value) => sum + value, 0) / lowest.length;
  const index = Math.round((average + rule.adjustment) * 10) / 10;

  return {
    index,
    used: rule.useLowest,
    adjustment: rule.adjustment,
    differentialsCount: recent.length,
  };
}

// ==========================================
// Pet calories
// ==========================================

export type PetSpecies = 'dog' | 'cat';
export type PetStage = 'neutered' | 'intact' | 'weight-loss' | 'growth' | 'senior';

export const PET_FACTORS: Record<PetSpecies, Record<PetStage, number>> = {
  dog: {
    neutered: 1.6,
    intact: 1.8,
    'weight-loss': 1.0,
    growth: 2.5,
    senior: 1.4,
  },
  cat: {
    neutered: 1.2,
    intact: 1.4,
    'weight-loss': 0.8,
    growth: 2.5,
    senior: 1.1,
  },
};

export interface PetCalorieResult {
  resting: number;
  maintenance: number;
  factor: number;
}

/**
 * Resting energy requirement: RER = 70 × body weight in kilograms^0.75.
 * Maintenance energy is RER multiplied by a life-stage factor. These are starting points for a
 * conversation with a veterinarian, not a prescription.
 */
export function petCalories(weightKg: number, species: PetSpecies, stage: PetStage): PetCalorieResult {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    throw new RangeError('Weight must be greater than zero.');
  }
  if (!(species in PET_FACTORS)) {
    throw new RangeError('Choose a dog or a cat.');
  }
  const factor = PET_FACTORS[species][stage];
  if (!factor) {
    throw new RangeError('Choose a valid life stage.');
  }
  const resting = 70 * Math.pow(weightKg, 0.75);
  return { resting, maintenance: resting * factor, factor };
}

// ==========================================
// Aquarium and pond volume
// ==========================================

export interface AquariumVolumeResult {
  grossLitres: number;
  netLitres: number;
  usGallons: number;
  ukGallons: number;
  waterKg: number;
}

export function aquariumVolume(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  substrateCm = 0,
  displacementPercent = 0
): AquariumVolumeResult {
  if (![lengthCm, widthCm, heightCm].every((value) => Number.isFinite(value) && value > 0)) {
    throw new RangeError('Length, width, and height must all be greater than zero.');
  }
  if (!Number.isFinite(substrateCm) || substrateCm < 0 || substrateCm >= heightCm) {
    throw new RangeError('Substrate depth must be zero or less than the tank height.');
  }
  if (!Number.isFinite(displacementPercent) || displacementPercent < 0 || displacementPercent > 90) {
    throw new RangeError('Displacement must be between 0% and 90%.');
  }

  const grossLitres = (lengthCm * widthCm * heightCm) / 1000;
  const netLitres = (lengthCm * widthCm * (heightCm - substrateCm) * (1 - displacementPercent / 100)) / 1000;

  return {
    grossLitres,
    netLitres,
    usGallons: netLitres / 3.785411784,
    ukGallons: netLitres / 4.54609,
    waterKg: netLitres,
  };
}

export interface PondVolumeResult {
  cubicMetres: number;
  litres: number;
  usGallons: number;
  waterTonnes: number;
}

/**
 * shapeFactor lets an irregular pond be approximated as a fraction of its bounding rectangle.
 * A rectangular pond is 1.0; a kidney or oval pond is commonly estimated at 0.7–0.85.
 */
export function pondVolume(
  lengthM: number,
  widthM: number,
  averageDepthM: number,
  shapeFactor = 1
): PondVolumeResult {
  if (![lengthM, widthM, averageDepthM].every((value) => Number.isFinite(value) && value > 0)) {
    throw new RangeError('Length, width, and average depth must all be greater than zero.');
  }
  if (!Number.isFinite(shapeFactor) || shapeFactor <= 0 || shapeFactor > 1) {
    throw new RangeError('Shape factor must be greater than zero and at most 1.');
  }

  const cubicMetres = lengthM * widthM * averageDepthM * shapeFactor;
  return {
    cubicMetres,
    litres: cubicMetres * 1000,
    usGallons: (cubicMetres * 1000) / 3.785411784,
    waterTonnes: cubicMetres,
  };
}

// ==========================================
// Fertiliser application
// ==========================================

export interface FertilizerResult {
  productPer1000: number;
  totalProduct: number;
  totalNitrogen: number;
  bagsNeeded: number;
  productPer1000Kg: number;
}

/**
 * Targets nitrogen rather than total product, because bag ratios differ:
 * a 10-10-10 bag needs twice the weight of a 20-10-10 bag for the same nitrogen.
 */
export function fertilizerProduct(
  areaSqFt: number,
  targetNitrogenLbPer1000: number,
  bagNitrogenPercent: number,
  bagWeightLb: number
): FertilizerResult {
  if (!Number.isFinite(areaSqFt) || areaSqFt <= 0) {
    throw new RangeError('Lawn area must be greater than zero.');
  }
  if (!Number.isFinite(targetNitrogenLbPer1000) || targetNitrogenLbPer1000 <= 0) {
    throw new RangeError('Target nitrogen must be greater than zero.');
  }
  if (!Number.isFinite(bagNitrogenPercent) || bagNitrogenPercent <= 0 || bagNitrogenPercent > 50) {
    throw new RangeError('Bag nitrogen percentage must be between 0 and 50.');
  }
  if (!Number.isFinite(bagWeightLb) || bagWeightLb <= 0) {
    throw new RangeError('Bag weight must be greater than zero.');
  }

  const productPer1000 = targetNitrogenLbPer1000 / (bagNitrogenPercent / 100);
  const totalProduct = (productPer1000 * areaSqFt) / 1000;
  const totalNitrogen = (targetNitrogenLbPer1000 * areaSqFt) / 1000;

  return {
    productPer1000,
    totalProduct,
    totalNitrogen,
    bagsNeeded: totalProduct / bagWeightLb,
    productPer1000Kg: productPer1000 * 0.45359237,
  };
}

// ==========================================
// Salary increase
// ==========================================

export interface SalaryIncreaseResult {
  newSalary: number;
  raise: number;
  monthlyRaise: number;
  realIncreasePercent: number;
  purchasingPower: number;
}

export function salaryIncrease(
  currentSalary: number,
  increasePercent: number,
  inflationPercent = 0
): SalaryIncreaseResult {
  if (!Number.isFinite(currentSalary) || currentSalary < 0) {
    throw new RangeError('Current salary must be zero or greater.');
  }
  if (!Number.isFinite(increasePercent) || increasePercent < -100 || increasePercent > 1000) {
    throw new RangeError('Increase must be between -100% and 1,000%.');
  }
  if (!Number.isFinite(inflationPercent) || inflationPercent <= -100 || inflationPercent > 1000) {
    throw new RangeError('Inflation must be greater than -100% and at most 1,000%.');
  }

  const newSalary = currentSalary * (1 + increasePercent / 100);
  const realIncreasePercent = ((1 + increasePercent / 100) / (1 + inflationPercent / 100) - 1) * 100;

  return {
    newSalary,
    raise: newSalary - currentSalary,
    monthlyRaise: (newSalary - currentSalary) / 12,
    realIncreasePercent,
    purchasingPower: newSalary / (1 + inflationPercent / 100),
  };
}

// ==========================================
// Moving cost
// ==========================================

export interface MovingCostInput {
  distanceKm: number;
  ratePerKm: number;
  baseFee: number;
  laborHours: number;
  hourlyRate: number;
  packingCost: number;
  suppliesCost: number;
  otherCost: number;
}

export interface MovingCostResult {
  transport: number;
  labor: number;
  extras: number;
  total: number;
  costPerKm: number;
}

export function movingCost({
  distanceKm,
  ratePerKm,
  baseFee,
  laborHours,
  hourlyRate,
  packingCost,
  suppliesCost,
  otherCost,
}: MovingCostInput): MovingCostResult {
  for (const [label, value] of [
    ['Distance', distanceKm],
    ['Rate per kilometre', ratePerKm],
    ['Base fee', baseFee],
    ['Labour hours', laborHours],
    ['Hourly rate', hourlyRate],
    ['Packing cost', packingCost],
    ['Supplies cost', suppliesCost],
    ['Other cost', otherCost],
  ] as const) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`${label} must be zero or greater.`);
    }
  }

  const transport = baseFee + distanceKm * ratePerKm;
  const labor = laborHours * hourlyRate;
  const extras = packingCost + suppliesCost + otherCost;
  const total = transport + labor + extras;

  return {
    transport,
    labor,
    extras,
    total,
    costPerKm: distanceKm > 0 ? total / distanceKm : 0,
  };
}

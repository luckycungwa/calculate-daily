/**
 * Body Mass Index engine shared by the BMI calculator's headline number, its
 * gauge bands and its healthy-weight range. One module, so the dial can never
 * disagree with the text. WHO adult cut-offs only; the UI carries the
 * limitations copy — nothing here is a diagnosis.
 */

export type BmiZoneId = 'under' | 'normal' | 'over' | 'obese';

export interface BmiZone {
  id: BmiZoneId;
  label: string;
  /** Range text for legend and table; `bounds` is the machine-readable form. */
  range: string;
  color: string;
  /** Exclusive lower bound; the first zone starts at the scale floor. */
  lower: number;
  /** Exclusive upper bound (the last zone is open-ended). */
  upper: number;
}

/** WHO adult classification. 
 *  Underweight < 18.5 | Normal 18.5–24.9 | Overweight 25–29.9 | Obese ≥ 30. */
export const BMI_ZONES: BmiZone[] = [
  {
    id: 'under',
    label: 'Underweight',
    range: '< 18.5',
    color: '#0ea5e9',
    lower: -Infinity,
    upper: 18.5,
  },
  {
    id: 'normal',
    label: 'Normal weight',
    range: '18.5 – 24.9',
    color: '#6366f1',
    lower: 18.5,
    upper: 25,
  },
  {
    id: 'over',
    label: 'Overweight',
    range: '25 – 29.9',
    color: '#f59e0b',
    lower: 25,
    upper: 30,
  },
  {
    id: 'obese',
    label: 'Obese',
    range: '30+',
    color: '#f43f5e',
    lower: 30,
    upper: Infinity,
  },
];

export function bmiValue(weightKg: number, heightMeters: number): number {
  if (weightKg <= 0 || heightMeters <= 0) return 0;
  return weightKg / (heightMeters * heightMeters);
}

export function bmiZoneFor(bmi: number): BmiZone {
  if (bmi <= 0) throw new Error('BMI must be positive to be classified');
  return BMI_ZONES.find((z) => bmi >= z.lower && bmi < z.upper) ?? BMI_ZONES[BMI_ZONES.length - 1];
}

export interface HealthyWeightRangeKg {
  min: number;
  max: number;
}

/** The weight span that lands inside the normal band for a given height. */
export function healthyWeightRange(heightMeters: number): HealthyWeightRangeKg {
  if (heightMeters <= 0) return { min: 0, max: 0 };
  const square = heightMeters * heightMeters;
  return {
    min: round1(BMI_ZONES[1].lower * square),
    max: round1((BMI_ZONES[1].upper - 0.1) * square),
  };
}

const KG_PER_LB = 1 / 2.2046226218487757; // lb → kg
export function kgToPounds(kg: number): number {
  return round1(kg / KG_PER_LB);
}
export function poundsToKg(lb: number): number {
  return lb * KG_PER_LB;
}

export interface BmiBoundaries {
  scaleMin: number;
  scaleMax: number;
  /** Dial band stops, ascending, matching BMI_ZONES cut-offs. */
  stops: number[];
}

/** Gauge geometry: a fixed 10–40 scale with the WHO cut-offs as stops. */
export const BMI_DIAL: BmiBoundaries = {
  scaleMin: 10,
  scaleMax: 40,
  stops: BMI_ZONES.slice(1).map((z) => z.lower).filter((n) => Number.isFinite(n)),
};

export function round1(n: number): number {
  return parseFloat(n.toFixed(1));
}

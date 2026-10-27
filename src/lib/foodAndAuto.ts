/**
 * Kitchen-weight and automotive arithmetic.
 *
 * Ingredient densities are grams per US cup. They are reference values, not constants: how a cook
 * scoops flour can move the weight by 10–20%, which is why the tools state that a scale is the only
 * precise method. Sources are cited in the catalogue entries.
 */

export type VolumeUnit = 'cup' | 'tbsp' | 'tsp' | 'ml' | 'floz';

export const VOLUME_UNIT_LABELS: Record<VolumeUnit, string> = {
  cup: 'US cup',
  tbsp: 'tablespoon',
  tsp: 'teaspoon',
  ml: 'millilitre',
  floz: 'fluid ounce',
};

/** US customary cup in millilitres. */
const ML_PER_CUP = 236.5882365;

const CUPS_PER_UNIT: Record<VolumeUnit, number> = {
  cup: 1,
  tbsp: 1 / 16,
  tsp: 1 / 48,
  ml: 1 / ML_PER_CUP,
  floz: 1 / 8,
};

export interface IngredientDensity {
  name: string;
  gramsPerCup: number;
  note?: string;
}

export const INGREDIENT_DENSITIES: IngredientDensity[] = [
  { name: 'All-purpose flour', gramsPerCup: 120 },
  { name: 'Bread flour', gramsPerCup: 127 },
  { name: 'Cake flour', gramsPerCup: 114 },
  { name: 'Whole-wheat flour', gramsPerCup: 120 },
  { name: 'Granulated sugar', gramsPerCup: 200 },
  { name: 'Brown sugar (packed)', gramsPerCup: 213 },
  { name: 'Powdered sugar', gramsPerCup: 120 },
  { name: 'Butter', gramsPerCup: 226.8 },
  { name: 'Water', gramsPerCup: 236.6 },
  { name: 'Milk', gramsPerCup: 244 },
  { name: 'Honey', gramsPerCup: 340 },
  { name: 'Rolled oats', gramsPerCup: 90 },
  { name: 'Cocoa powder', gramsPerCup: 85 },
  { name: 'Table salt', gramsPerCup: 273 },
  { name: 'Uncooked white rice', gramsPerCup: 185 },
];

export function findIngredientDensity(name: string): IngredientDensity {
  const match = INGREDIENT_DENSITIES.find((item) => item.name === name);
  if (!match) {
    throw new RangeError('Choose an ingredient from the list.');
  }
  return match;
}

export function gramsFromVolume(gramsPerCup: number, amount: number, unit: VolumeUnit): number {
  if (!Number.isFinite(gramsPerCup) || gramsPerCup <= 0) {
    throw new RangeError('Density must be greater than zero.');
  }
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError('Amount must be zero or greater.');
  }
  if (!(unit in CUPS_PER_UNIT)) {
    throw new RangeError('Choose a supported volume unit.');
  }
  return amount * CUPS_PER_UNIT[unit] * gramsPerCup;
}

export function volumeFromGrams(gramsPerCup: number, grams: number, unit: VolumeUnit): number {
  if (!Number.isFinite(gramsPerCup) || gramsPerCup <= 0) {
    throw new RangeError('Density must be greater than zero.');
  }
  if (!Number.isFinite(grams) || grams < 0) {
    throw new RangeError('Weight must be zero or greater.');
  }
  if (!(unit in CUPS_PER_UNIT)) {
    throw new RangeError('Choose a supported volume unit.');
  }
  return grams / gramsPerCup / CUPS_PER_UNIT[unit];
}

// ==========================================
// Butter
// ==========================================

export type ButterUnit = 'stick' | 'cup' | 'tbsp' | 'tsp' | 'gram' | 'ounce';

export interface ButterResult {
  grams: number;
  sticks: number;
  cups: number;
  tablespoons: number;
  teaspoons: number;
  ounces: number;
}

/** One US stick of butter is 1/2 cup, 8 tablespoons, or 113.4 g. */
const GRAMS_PER_STICK = 113.4;

const GRAMS_PER_BUTTER_UNIT: Record<ButterUnit, number> = {
  stick: GRAMS_PER_STICK,
  cup: GRAMS_PER_STICK * 2,
  tbsp: GRAMS_PER_STICK / 8,
  tsp: GRAMS_PER_STICK / 24,
  gram: 1,
  ounce: 28.349523125,
};

export const BUTTER_UNIT_LABELS: Record<ButterUnit, string> = {
  stick: 'stick',
  cup: 'cup',
  tbsp: 'tablespoon',
  tsp: 'teaspoon',
  gram: 'gram',
  ounce: 'ounce',
};

export function convertButter(amount: number, unit: ButterUnit): ButterResult {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError('Butter amount must be zero or greater.');
  }
  if (!(unit in GRAMS_PER_BUTTER_UNIT)) {
    throw new RangeError('Choose a supported butter unit.');
  }

  const grams = amount * GRAMS_PER_BUTTER_UNIT[unit];
  return {
    grams,
    sticks: grams / GRAMS_PER_STICK,
    cups: grams / (GRAMS_PER_STICK * 2),
    tablespoons: grams / (GRAMS_PER_STICK / 8),
    teaspoons: grams / (GRAMS_PER_STICK / 24),
    ounces: grams / 28.349523125,
  };
}

// ==========================================
// Flour
// ==========================================

export interface FlourType {
  name: string;
  gramsPerCup: number;
  protein: string;
}

export const FLOUR_TYPES: FlourType[] = [
  { name: 'All-purpose flour', gramsPerCup: 120, protein: '10–12%' },
  { name: 'Bread flour', gramsPerCup: 127, protein: '12–14%' },
  { name: 'Cake flour', gramsPerCup: 114, protein: '7–9%' },
  { name: 'Whole-wheat flour', gramsPerCup: 120, protein: '13–14%' },
  { name: 'Self-raising flour', gramsPerCup: 120, protein: '8–10%' },
];

export function findFlourType(name: string): FlourType {
  const match = FLOUR_TYPES.find((item) => item.name === name);
  if (!match) {
    throw new RangeError('Choose a flour type from the list.');
  }
  return match;
}

// ==========================================
// Oven temperature
// ==========================================

export type OvenScale = 'celsius' | 'fahrenheit' | 'gas';

export interface GasMarkRow {
  gas: number;
  celsius: number;
  fahrenheit: number;
}

/**
 * Conventional gas-mark chart. Oven thermostats are approximate, and the Celsius values are the
 * rounded dial markings published by manufacturers rather than a strict conversion.
 */
export const GAS_MARKS: GasMarkRow[] = [
  { gas: 0.25, celsius: 110, fahrenheit: 225 },
  { gas: 0.5, celsius: 130, fahrenheit: 250 },
  { gas: 1, celsius: 140, fahrenheit: 275 },
  { gas: 2, celsius: 150, fahrenheit: 300 },
  { gas: 3, celsius: 170, fahrenheit: 325 },
  { gas: 4, celsius: 180, fahrenheit: 350 },
  { gas: 5, celsius: 190, fahrenheit: 375 },
  { gas: 6, celsius: 200, fahrenheit: 400 },
  { gas: 7, celsius: 220, fahrenheit: 425 },
  { gas: 8, celsius: 230, fahrenheit: 450 },
  { gas: 9, celsius: 240, fahrenheit: 475 },
];

export interface OvenTemperatureResult {
  celsius: number;
  fahrenheit: number;
  gas: number;
  fanCelsius: number;
  gasLabel: string;
}

export function convertOvenTemperature(value: number, scale: OvenScale): OvenTemperatureResult {
  if (!Number.isFinite(value)) {
    throw new RangeError('Enter a valid oven temperature.');
  }

  let celsius: number;
  let gas: number;

  if (scale === 'celsius') {
    if (value < 50 || value > 300) {
      throw new RangeError('Celsius oven temperatures must be between 50 and 300 °C.');
    }
    celsius = value;
    const nearest = GAS_MARKS.reduce((best, row) =>
      Math.abs(row.celsius - value) < Math.abs(best.celsius - value) ? row : best
    );
    gas = nearest.gas;
  } else if (scale === 'fahrenheit') {
    if (value < 120 || value > 575) {
      throw new RangeError('Fahrenheit oven temperatures must be between 120 and 575 °F.');
    }
    celsius = ((value - 32) * 5) / 9;
    const nearest = GAS_MARKS.reduce((best, row) =>
      Math.abs(row.fahrenheit - value) < Math.abs(best.fahrenheit - value) ? row : best
    );
    gas = nearest.gas;
  } else {
    if (value < 0.25 || value > 9) {
      throw new RangeError('Gas marks run from ¼ to 9.');
    }
    gas = value;
    const lower = [...GAS_MARKS].reverse().find((row) => row.gas <= value) ?? GAS_MARKS[0];
    const upper = GAS_MARKS.find((row) => row.gas >= value) ?? GAS_MARKS[GAS_MARKS.length - 1];
    const span = upper.gas - lower.gas;
    const ratio = span === 0 ? 0 : (value - lower.gas) / span;
    celsius = lower.celsius + (upper.celsius - lower.celsius) * ratio;
  }

  return {
    celsius,
    fahrenheit: (celsius * 9) / 5 + 32,
    gas,
    fanCelsius: celsius - 20,
    gasLabel: formatGasMark(gas),
  };
}

export function formatGasMark(gas: number): string {
  if (gas === 0.25) return '¼';
  if (gas === 0.5) return '½';
  return Number.isInteger(gas) ? String(gas) : gas.toFixed(2);
}

// ==========================================
// Pizza dough
// ==========================================

export interface PizzaDoughInput {
  balls: number;
  ballWeight: number;
  hydration: number;
  saltPercent: number;
  yeastPercent: number;
}

export interface PizzaDoughResult {
  totalDough: number;
  flour: number;
  water: number;
  salt: number;
  yeast: number;
  hydration: number;
}

export function calculatePizzaDough({
  balls,
  ballWeight,
  hydration,
  saltPercent,
  yeastPercent,
}: PizzaDoughInput): PizzaDoughResult {
  if (!Number.isInteger(balls) || balls < 1 || balls > 100) {
    throw new RangeError('Number of dough balls must be a whole number from 1 to 100.');
  }
  if (!Number.isFinite(ballWeight) || ballWeight < 50 || ballWeight > 2000) {
    throw new RangeError('Each dough ball must weigh between 50 and 2,000 g.');
  }
  if (!Number.isFinite(hydration) || hydration < 40 || hydration > 100) {
    throw new RangeError('Hydration must be between 40% and 100% of flour weight.');
  }
  if (!Number.isFinite(saltPercent) || saltPercent < 0 || saltPercent > 10) {
    throw new RangeError('Salt must be between 0% and 10% of flour weight.');
  }
  if (!Number.isFinite(yeastPercent) || yeastPercent < 0 || yeastPercent > 10) {
    throw new RangeError('Yeast must be between 0% and 10% of flour weight.');
  }

  const totalDough = balls * ballWeight;
  const flour = totalDough / (1 + hydration / 100 + saltPercent / 100 + yeastPercent / 100);

  return {
    totalDough,
    flour,
    water: (flour * hydration) / 100,
    salt: (flour * saltPercent) / 100,
    yeast: (flour * yeastPercent) / 100,
    hydration,
  };
}

// ==========================================
// tire size
// ==========================================

export interface TireSize {
  width: number;
  aspect: number;
  rim: number;
}

export interface TireSizeResult {
  oldDiameter: number;
  newDiameter: number;
  oldCircumference: number;
  newCircumference: number;
  diameterChange: number;
  diameterChangePercent: number;
  speedometerErrorPercent: number;
  actualSpeedAt100: number;
  sidewall: number;
}

export function calculateTireSize(oldTire: TireSize, newTire: TireSize): TireSizeResult {
  for (const [label, tire] of [
    ['Original', oldTire],
    ['New', newTire],
  ] as const) {
    if (!Number.isFinite(tire.width) || tire.width < 100 || tire.width > 400) {
      throw new RangeError(`${label} tire width must be between 100 and 400 mm.`);
    }
    if (!Number.isFinite(tire.aspect) || tire.aspect < 20 || tire.aspect > 100) {
      throw new RangeError(`${label} aspect ratio must be between 20 and 100.`);
    }
    if (!Number.isFinite(tire.rim) || tire.rim < 10 || tire.rim > 30) {
      throw new RangeError(`${label} rim diameter must be between 10 and 30 inches.`);
    }
  }

  const oldSidewall = (oldTire.width * oldTire.aspect) / 100;
  const newSidewall = (newTire.width * newTire.aspect) / 100;
  const oldDiameter = oldTire.rim * 25.4 + 2 * oldSidewall;
  const newDiameter = newTire.rim * 25.4 + 2 * newSidewall;
  const oldCircumference = Math.PI * oldDiameter;
  const newCircumference = Math.PI * newDiameter;
  const diameterChange = newDiameter - oldDiameter;
  const diameterChangePercent = (diameterChange / oldDiameter) * 100;

  return {
    oldDiameter,
    newDiameter,
    oldCircumference,
    newCircumference,
    diameterChange,
    diameterChangePercent,
    speedometerErrorPercent: diameterChangePercent,
    actualSpeedAt100: 100 * (newDiameter / oldDiameter),
    sidewall: newSidewall,
  };
}

// ==========================================
// Car depreciation
// ==========================================

export interface DepreciationRow {
  year: number;
  value: number;
  depreciation: number;
}

export interface CarDepreciationResult {
  finalValue: number;
  totalDepreciation: number;
  averagePerYear: number;
  averagePerMonth: number;
  schedule: DepreciationRow[];
}

export function calculateCarDepreciation(
  price: number,
  annualRatePercent: number,
  years: number,
  salvageValue = 0
): CarDepreciationResult {
  if (!Number.isFinite(price) || price <= 0) {
    throw new RangeError('Purchase price must be greater than zero.');
  }
  if (!Number.isFinite(annualRatePercent) || annualRatePercent < 0 || annualRatePercent >= 100) {
    throw new RangeError('Annual depreciation must be between 0% and 100%.');
  }
  if (!Number.isFinite(years) || years < 0 || years > 40) {
    throw new RangeError('Years must be between 0 and 40.');
  }
  if (!Number.isFinite(salvageValue) || salvageValue < 0) {
    throw new RangeError('Salvage value cannot be negative.');
  }

  const rate = 1 - annualRatePercent / 100;
  const floor = Math.min(price, Math.max(0, salvageValue));
  const schedule: DepreciationRow[] = [{ year: 0, value: price, depreciation: 0 }];
  let previous = price;
  let value = price;

  for (let year = 1; year <= Math.floor(years); year += 1) {
    value = Math.max(floor, previous * rate);
    schedule.push({ year, value, depreciation: previous - value });
    previous = value;
  }

  // A fractional final year is applied continuously rather than rounded away.
  if (!Number.isInteger(years) && years > 0) {
    const fractional = years - Math.floor(years);
    value = Math.max(floor, value * rate ** fractional);
  }

  const totalDepreciation = price - value;
  return {
    finalValue: value,
    totalDepreciation,
    averagePerYear: years > 0 ? totalDepreciation / years : 0,
    averagePerMonth: years > 0 ? totalDepreciation / years / 12 : 0,
    schedule,
  };
}

// ==========================================
// Speed, distance, time
// ==========================================

export type SpeedDistanceMode = 'time' | 'speed' | 'distance';

export interface SpeedDistanceResult {
  distanceKm: number;
  speedKmh: number;
  timeHours: number;
  paceMinPerKm: number;
}

/**
 * Modes describe what is missing: 'time' takes distance and speed, 'speed' takes distance and
 * hours, 'distance' takes speed and hours.
 */
export function solveSpeedDistanceTime(
  mode: SpeedDistanceMode,
  first: number,
  second: number
): SpeedDistanceResult {
  if (!Number.isFinite(first) || first <= 0 || !Number.isFinite(second) || second <= 0) {
    throw new RangeError('Both known values must be greater than zero.');
  }

  let distanceKm: number;
  let speedKmh: number;
  let timeHours: number;

  if (mode === 'time') {
    distanceKm = first;
    speedKmh = second;
    timeHours = distanceKm / speedKmh;
  } else if (mode === 'speed') {
    distanceKm = first;
    timeHours = second;
    speedKmh = distanceKm / timeHours;
  } else if (mode === 'distance') {
    speedKmh = first;
    timeHours = second;
    distanceKm = speedKmh * timeHours;
  } else {
    throw new RangeError('Choose what you want to calculate.');
  }

  return {
    distanceKm,
    speedKmh,
    timeHours,
    paceMinPerKm: 60 / speedKmh,
  };
}

export function formatHoursMinutes(hours: number): string {
  if (!Number.isFinite(hours) || hours < 0) return '—';
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} min`;
  return `${h} h ${m} min`;
}

export function formatPace(minutesPerKm: number): string {
  if (!Number.isFinite(minutesPerKm) || minutesPerKm <= 0) return '—';
  const totalSeconds = Math.round(minutesPerKm * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')} /km`;
}

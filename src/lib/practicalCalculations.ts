/**
 * Arithmetic for the practical-toolkit calculators: marketing conversion rates,
 * parcel dimensional weight, freelance pricing, EV charging, trip budgets,
 * room cooling load, and insulation quantities.
 *
 * Every function validates its inputs and throws a RangeError with a message a
 * visitor can act on. The numbers are estimates built from stated assumptions;
 * none of them is a quote, a diagnosis, or a carrier invoice.
 */

function requireFinite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be a number.`);
  }
  return value;
}

function requireAtLeast(value: number, minimum: number, label: string): number {
  requireFinite(value, label);
  if (value < minimum) {
    throw new RangeError(`${label} must be at least ${minimum}.`);
  }
  return value;
}

function requireGreaterThan(value: number, minimum: number, label: string): number {
  requireFinite(value, label);
  if (value <= minimum) {
    throw new RangeError(`${label} must be greater than ${minimum}.`);
  }
  return value;
}

function requireWithin(value: number, minimum: number, maximum: number, label: string): number {
  requireFinite(value, label);
  if (value < minimum || value > maximum) {
    throw new RangeError(`${label} must be between ${minimum} and ${maximum}.`);
  }
  return value;
}

// ==========================================
// Conversion rate
// ==========================================

export interface ConversionRateInput {
  visitors: number;
  conversions: number;
  /** Optional ad or campaign spend, in the site currency. */
  spend?: number;
  /** Optional revenue attributed to the conversions. */
  revenue?: number;
}

export interface ConversionRateResult {
  /** Conversions divided by visitors, as a percentage. */
  ratePct: number;
  /** How many visitors each conversion represents. */
  visitorsPerConversion: number;
  costPerConversion: number | null;
  revenuePerVisitor: number | null;
  revenuePerConversion: number | null;
  /** Wilson score interval at 95% confidence, as percentages. */
  intervalLowPct: number;
  intervalHighPct: number;
  /** One standard error of the rate, in percentage points. */
  standardErrorPct: number;
}

/**
 * Wilson score interval for a binomial proportion.
 *
 * A raw "3 of 100" and "300 of 10,000" are both 3%, but the first could easily
 * be 1% or 6% in the population. The interval makes that uncertainty explicit
 * instead of letting a small sample look like a settled result.
 */
export function wilsonInterval(successes: number, trials: number, z = 1.96): [number, number] {
  requireAtLeast(trials, 1, 'Visitors');
  if (successes < 0 || successes > trials) {
    throw new RangeError('Conversions cannot exceed visitors.');
  }
  const p = successes / trials;
  const denominator = 1 + (z * z) / trials;
  const centre = (p + (z * z) / (2 * trials)) / denominator;
  const margin =
    (z * Math.sqrt((p * (1 - p)) / trials + (z * z) / (4 * trials * trials))) / denominator;
  return [Math.max(0, centre - margin) * 100, Math.min(1, centre + margin) * 100];
}

export function calculateConversionRate(input: ConversionRateInput): ConversionRateResult {
  const visitors = requireGreaterThan(input.visitors, 0, 'Visitors');
  requireFinite(input.conversions, 'Conversions');
  if (!Number.isInteger(input.conversions)) {
    throw new RangeError('Conversions must be a whole number.');
  }
  if (input.conversions < 0) {
    throw new RangeError('Conversions cannot be negative.');
  }
  if (input.conversions > visitors) {
    throw new RangeError('Conversions cannot exceed visitors.');
  }
  const spend = requireAtLeast(input.spend ?? 0, 0, 'Spend');
  const revenue = requireAtLeast(input.revenue ?? 0, 0, 'Revenue');

  const rate = input.conversions / visitors;

  return {
    ratePct: rate * 100,
    visitorsPerConversion: input.conversions > 0 ? visitors / input.conversions : Number.POSITIVE_INFINITY,
    costPerConversion: input.conversions > 0 && spend > 0 ? spend / input.conversions : null,
    revenuePerVisitor: revenue > 0 ? revenue / visitors : null,
    revenuePerConversion: revenue > 0 && input.conversions > 0 ? revenue / input.conversions : null,
    intervalLowPct: wilsonInterval(input.conversions, visitors)[0],
    intervalHighPct: wilsonInterval(input.conversions, visitors)[1],
    standardErrorPct: Math.sqrt((rate * (1 - rate)) / visitors) * 100,
  };
}

/** Visitors required to reach a conversion target at a known rate. */
export function visitorsForConversions(targetConversions: number, ratePct: number): number {
  requireGreaterThan(targetConversions, 0, 'Target conversions');
  requireWithin(ratePct, 0, 100, 'Conversion rate');
  if (ratePct === 0) {
    throw new RangeError('A conversion rate of zero can never reach the target.');
  }
  return Math.ceil(targetConversions / (ratePct / 100));
}

/** Conversions required at a given visitor count to hit a target rate. */
export function conversionsForRate(visitors: number, targetRatePct: number): number {
  requireGreaterThan(visitors, 0, 'Visitors');
  requireWithin(targetRatePct, 0, 100, 'Target rate');
  return Math.ceil((visitors * targetRatePct) / 100);
}

// ==========================================
// Dimensional weight
// ==========================================

export type DimWeightProfileId = 'ups-fedex' | 'usps-retail' | 'dhl' | 'air-freight-6000';

export interface DimWeightProfile {
  id: DimWeightProfileId;
  label: string;
  /** Cubic inches or centimetres per pound or kilogram. */
  divisor: number;
  dimensionUnit: 'in' | 'cm';
  weightUnit: 'lb' | 'kg';
  note: string;
}

export const DIM_WEIGHT_PROFILES: DimWeightProfile[] = [
  {
    id: 'ups-fedex',
    label: 'UPS / FedEx daily rates (in, lb)',
    divisor: 139,
    dimensionUnit: 'in',
    weightUnit: 'lb',
    note: 'UPS and FedEx use 139 for daily rates. Retail counter rates use 166.',
  },
  {
    id: 'usps-retail',
    label: 'USPS / retail counter (in, lb)',
    divisor: 166,
    dimensionUnit: 'in',
    weightUnit: 'lb',
    note: 'The 166 divisor applies to USPS and to UPS/FedEx retail rates.',
  },
  {
    id: 'dhl',
    label: 'DHL / metric air (cm, kg; 5000)',
    divisor: 5000,
    dimensionUnit: 'cm',
    weightUnit: 'kg',
    note: 'The common metric air divisor: cubic centimetres divided by 5,000.',
  },
  {
    id: 'air-freight-6000',
    label: 'Air freight / metric (cm, kg; 6000)',
    divisor: 6000,
    dimensionUnit: 'cm',
    weightUnit: 'kg',
    note: 'Some air-freight tariffs use 6,000 instead of 5,000. Confirm with the carrier.',
  },
];

export function findDimWeightProfile(id: DimWeightProfileId): DimWeightProfile {
  const profile = DIM_WEIGHT_PROFILES.find((item) => item.id === id);
  if (!profile) throw new RangeError('Choose a supported carrier profile.');
  return profile;
}

export interface DimWeightInput {
  length: number;
  width: number;
  height: number;
  actualWeight: number;
  profileId: DimWeightProfileId;
}

export interface DimWeightResult {
  volume: number;
  divisor: number;
  dimensionalWeight: number;
  billableWeight: number;
  /** Billable weight minus actual weight; zero when actual weight governs. */
  difference: number;
  /** Extra percentage the parcel is billed over its actual weight. */
  percentOverActual: number | null;
  dimensionalGoverns: boolean;
}

export function calculateDimensionalWeight(input: DimWeightInput): DimWeightResult {
  const profile = findDimWeightProfile(input.profileId);
  const length = requireGreaterThan(input.length, 0, 'Length');
  const width = requireGreaterThan(input.width, 0, 'Width');
  const height = requireGreaterThan(input.height, 0, 'Height');
  const actualWeight = requireAtLeast(input.actualWeight, 0, 'Actual weight');

  const volume = length * width * height;
  const dimensionalWeight = volume / profile.divisor;
  const billableWeight = Math.max(dimensionalWeight, actualWeight);

  return {
    volume,
    divisor: profile.divisor,
    dimensionalWeight,
    billableWeight,
    difference: billableWeight - actualWeight,
    percentOverActual:
      actualWeight > 0 ? ((billableWeight - actualWeight) / actualWeight) * 100 : null,
    dimensionalGoverns: dimensionalWeight > actualWeight,
  };
}

// ==========================================
// Freelance rate
// ==========================================

export interface FreelanceRateInput {
  /** Desired after-tax annual income. */
  targetIncome: number;
  /** Combined effective income and self-employment tax rate, as a percentage. */
  taxRatePct: number;
  /** Annual business expenses: software, insurance, equipment, accounting. */
  businessExpenses: number;
  billableHoursPerWeek: number;
  weeksOff: number;
  hoursPerDay: number;
}

export interface FreelanceRateResult {
  weeksWorked: number;
  billableHoursPerYear: number;
  revenueNeeded: number;
  hourlyRate: number;
  dayRate: number;
  weeklyRevenue: number;
  monthlyRetainer: number;
  /** Income kept per billable hour after tax and business costs. */
  netPerBillableHour: number;
  expenseSharePct: number;
}

export function calculateFreelanceRate(input: FreelanceRateInput): FreelanceRateResult {
  const targetIncome = requireGreaterThan(input.targetIncome, 0, 'Target income');
  requireWithin(input.taxRatePct, 0, 99, 'Tax rate');
  const businessExpenses = requireAtLeast(input.businessExpenses, 0, 'Business expenses');
  const billableHoursPerWeek = requireWithin(input.billableHoursPerWeek, 0.5, 80, 'Billable hours per week');
  const weeksOff = requireWithin(input.weeksOff, 0, 51, 'Weeks off');
  const hoursPerDay = requireWithin(input.hoursPerDay, 0.5, 24, 'Hours per day');

  const weeksWorked = 52 - weeksOff;
  const billableHoursPerYear = billableHoursPerWeek * weeksWorked;
  const revenueNeeded = targetIncome / (1 - input.taxRatePct / 100) + businessExpenses;
  const hourlyRate = revenueNeeded / billableHoursPerYear;

  return {
    weeksWorked,
    billableHoursPerYear,
    revenueNeeded,
    hourlyRate,
    dayRate: hourlyRate * hoursPerDay,
    weeklyRevenue: hourlyRate * billableHoursPerWeek,
    monthlyRetainer: (hourlyRate * billableHoursPerWeek * 52) / 12,
    netPerBillableHour: targetIncome / billableHoursPerYear,
    expenseSharePct: revenueNeeded > 0 ? (businessExpenses / revenueNeeded) * 100 : 0,
  };
}

// ==========================================
// EV charging cost
// ==========================================

export interface EvChargeInput {
  batteryKwh: number;
  startPct: number;
  endPct: number;
  /** Distance per kWh, in miles per kWh or kilometres per kWh. */
  efficiencyPerKwh: number;
  homePricePerKwh: number;
  publicPricePerKwh: number;
  /** Energy lost as heat in the charger and battery, as a percentage. */
  chargingLossPct: number;
  chargerKw: number;
}

export interface EvChargeResult {
  energyAddedKwh: number;
  gridEnergyKwh: number;
  lossKwh: number;
  rangeAdded: number;
  homeCost: number;
  publicCost: number;
  publicPremium: number;
  costPerDistanceHome: number;
  costPerDistancePublic: number;
  chargingMinutes: number;
}

export function calculateEvCharge(input: EvChargeInput): EvChargeResult {
  const batteryKwh = requireGreaterThan(input.batteryKwh, 0, 'Battery capacity');
  const startPct = requireWithin(input.startPct, 0, 100, 'Starting charge');
  const endPct = requireWithin(input.endPct, 0, 100, 'Ending charge');
  if (endPct <= startPct) {
    throw new RangeError('Ending charge must be higher than starting charge.');
  }
  const efficiency = requireGreaterThan(input.efficiencyPerKwh, 0, 'Efficiency');
  const homePrice = requireAtLeast(input.homePricePerKwh, 0, 'Home price per kWh');
  const publicPrice = requireAtLeast(input.publicPricePerKwh, 0, 'Public price per kWh');
  const lossPct = requireWithin(input.chargingLossPct, 0, 50, 'Charging loss');
  const chargerKw = requireGreaterThan(input.chargerKw, 0, 'Charger power');

  const energyAddedKwh = (batteryKwh * (endPct - startPct)) / 100;
  const gridEnergyKwh = energyAddedKwh / (1 - lossPct / 100);
  const lossKwh = gridEnergyKwh - energyAddedKwh;
  const rangeAdded = energyAddedKwh * efficiency;
  const homeCost = gridEnergyKwh * homePrice;
  const publicCost = gridEnergyKwh * publicPrice;

  return {
    energyAddedKwh,
    gridEnergyKwh,
    lossKwh,
    rangeAdded,
    homeCost,
    publicCost,
    publicPremium: publicCost - homeCost,
    costPerDistanceHome: homeCost / rangeAdded,
    costPerDistancePublic: publicCost / rangeAdded,
    chargingMinutes: (gridEnergyKwh / chargerKw) * 60,
  };
}

// ==========================================
// Trip cost
// ==========================================

export type TripEfficiencyUnit = 'mpg' | 'l-per-100km';

export interface TripCostInput {
  oneWayDistance: number;
  roundTrip: boolean;
  efficiency: number;
  fuelPrice: number;
  efficiencyUnit: TripEfficiencyUnit;
  tolls: number;
  parkingPerDay: number;
  days: number;
  lodgingPerNight: number;
  nights: number;
  foodPerDay: number;
  travellers: number;
  other: number;
}

export interface TripCostResult {
  distance: number;
  fuelVolume: number;
  fuelCost: number;
  parkingCost: number;
  lodgingCost: number;
  foodCost: number;
  otherCost: number;
  total: number;
  perPerson: number;
  perDistance: number;
  fuelSharePct: number;
}

export function calculateTripCost(input: TripCostInput): TripCostResult {
  const oneWayDistance = requireGreaterThan(input.oneWayDistance, 0, 'Distance');
  const efficiency = requireGreaterThan(input.efficiency, 0, 'Fuel efficiency');
  const fuelPrice = requireAtLeast(input.fuelPrice, 0, 'Fuel price');
  const days = requireAtLeast(input.days, 0, 'Days');
  const nights = requireAtLeast(input.nights, 0, 'Nights');
  const travellers = requireAtLeast(input.travellers, 1, 'Travellers');
  if (!Number.isInteger(travellers)) {
    throw new RangeError('Travellers must be a whole number.');
  }
  const tolls = requireAtLeast(input.tolls, 0, 'Tolls');
  const parkingPerDay = requireAtLeast(input.parkingPerDay, 0, 'Parking per day');
  const lodgingPerNight = requireAtLeast(input.lodgingPerNight, 0, 'Lodging per night');
  const foodPerDay = requireAtLeast(input.foodPerDay, 0, 'Food per day');
  const other = requireAtLeast(input.other, 0, 'Other costs');

  const distance = input.roundTrip ? oneWayDistance * 2 : oneWayDistance;

  let fuelVolume: number;
  if (input.efficiencyUnit === 'mpg') {
    fuelVolume = distance / efficiency;
  } else if (input.efficiencyUnit === 'l-per-100km') {
    fuelVolume = (distance / 100) * efficiency;
  } else {
    throw new RangeError('Choose a supported efficiency unit.');
  }

  const fuelCost = fuelVolume * fuelPrice;
  const parkingCost = parkingPerDay * days;
  const lodgingCost = lodgingPerNight * nights;
  const foodCost = foodPerDay * days * travellers;
  const total = fuelCost + parkingCost + lodgingCost + foodCost + tolls + other;

  return {
    distance,
    fuelVolume,
    fuelCost,
    parkingCost,
    lodgingCost,
    foodCost,
    otherCost: tolls + other,
    total,
    perPerson: total / travellers,
    perDistance: total / distance,
    fuelSharePct: total > 0 ? (fuelCost / total) * 100 : 0,
  };
}

// ==========================================
// BTU / room cooling load
// ==========================================

export type InsulationLevel = 'well' | 'average' | 'poor';
export type SunExposure = 'shaded' | 'average' | 'sunny';

export interface BtuInput {
  areaSqFt: number;
  ceilingHeightFt: number;
  insulation: InsulationLevel;
  sun: SunExposure;
  occupants: number;
  kitchen: boolean;
}

export interface BtuResult {
  btuPerHour: number;
  tons: number;
  kw: number;
  recommendedBtu: number;
}

const INSULATION_FACTORS: Record<InsulationLevel, number> = {
  well: 0.9,
  average: 1,
  poor: 1.15,
};

const SUN_FACTORS: Record<SunExposure, number> = {
  shaded: 0.9,
  average: 1,
  sunny: 1.1,
};

/** Portable and window units are sold in these nominal sizes. */
export const COMMON_AC_SIZES = [
  5000, 6000, 8000, 9000, 10000, 12000, 15000, 18000, 24000, 30000, 36000,
];

export function calculateBtu(input: BtuInput): BtuResult {
  const area = requireGreaterThan(input.areaSqFt, 0, 'Room area');
  const ceiling = requireWithin(input.ceilingHeightFt, 6, 20, 'Ceiling height');
  const occupants = requireAtLeast(input.occupants, 0, 'Occupants');
  if (!Number.isInteger(occupants)) {
    throw new RangeError('Occupants must be a whole number.');
  }
  const insulation = INSULATION_FACTORS[input.insulation];
  const sun = SUN_FACTORS[input.sun];
  if (insulation === undefined) throw new RangeError('Choose an insulation level.');
  if (sun === undefined) throw new RangeError('Choose a sun exposure.');

  const base = area * 20;
  const heightFactor = ceiling / 8;
  const peopleLoad = Math.max(0, occupants - 2) * 600;
  const kitchenLoad = input.kitchen ? 4000 : 0;
  const raw = base * heightFactor * insulation * sun + peopleLoad + kitchenLoad;
  const btuPerHour = Math.round(raw / 100) * 100;

  const recommendedBtu =
    COMMON_AC_SIZES.find((size) => size >= btuPerHour) ??
    Math.ceil(btuPerHour / 6000) * 6000;

  return {
    btuPerHour,
    tons: btuPerHour / 12000,
    kw: btuPerHour * 0.00029307107,
    recommendedBtu,
  };
}

// ==========================================
// Insulation quantity
// ==========================================

export type InsulationMaterialId =
  | 'fiberglass-batt'
  | 'blown-cellulose'
  | 'mineral-wool'
  | 'open-cell-foam'
  | 'closed-cell-foam'
  | 'polyiso'
  | 'xps'
  | 'eps';

export interface InsulationMaterial {
  id: InsulationMaterialId;
  label: string;
  /** Nominal R-value added per inch of installed thickness. */
  rPerInch: number;
  note: string;
}

export const INSULATION_MATERIALS: InsulationMaterial[] = [
  { id: 'fiberglass-batt', label: 'Fiberglass batt', rPerInch: 3.2, note: 'Typical 3.1-4.3 per inch depending on density.' },
  { id: 'blown-cellulose', label: 'Blown cellulose', rPerInch: 3.5, note: 'Settled density; loose-fill settles after installation.' },
  { id: 'mineral-wool', label: 'Mineral wool', rPerInch: 3.3, note: 'Batts and boards; density varies by product.' },
  { id: 'open-cell-foam', label: 'Open-cell spray foam', rPerInch: 3.7, note: 'About 0.5 lb per cubic foot.' },
  { id: 'closed-cell-foam', label: 'Closed-cell spray foam', rPerInch: 6.5, note: 'About 2 lb per cubic foot; also an air barrier.' },
  { id: 'polyiso', label: 'Polyiso rigid board', rPerInch: 6.0, note: 'Aged value; foil-faced boards lose some R over time.' },
  { id: 'xps', label: 'XPS rigid board', rPerInch: 5.0, note: 'Extruded polystyrene, common below grade.' },
  { id: 'eps', label: 'EPS rigid board', rPerInch: 3.8, note: 'Expanded polystyrene; the least expensive rigid board.' },
];

export function findInsulationMaterial(id: InsulationMaterialId): InsulationMaterial {
  const material = INSULATION_MATERIALS.find((item) => item.id === id);
  if (!material) throw new RangeError('Choose a supported insulation material.');
  return material;
}

export interface InsulationInput {
  /** Gross area to insulate, in square feet. */
  area: number;
  /** Windows, doors, or other openings to subtract, in square feet. */
  openings: number;
  targetR: number;
  existingR: number;
  materialId: InsulationMaterialId;
  /** Square feet covered by one package, as printed on the bag. */
  coveragePerPackage: number;
  wastePct: number;
  pricePerPackage: number;
}

export interface InsulationResult {
  netArea: number;
  additionalR: number;
  totalR: number;
  thicknessIn: number;
  packages: number;
  cost: number;
  coveredArea: number;
  leftoverArea: number;
  meetsTarget: boolean;
}

export function calculateInsulation(input: InsulationInput): InsulationResult {
  const material = findInsulationMaterial(input.materialId);
  const area = requireGreaterThan(input.area, 0, 'Area');
  const openings = requireAtLeast(input.openings, 0, 'Openings');
  if (openings >= area) {
    throw new RangeError('Openings must be smaller than the total area.');
  }
  const targetR = requireGreaterThan(input.targetR, 0, 'Target R-value');
  const existingR = requireAtLeast(input.existingR, 0, 'Existing R-value');
  const coverage = requireGreaterThan(input.coveragePerPackage, 0, 'Coverage per package');
  const wastePct = requireWithin(input.wastePct, 0, 50, 'Waste allowance');
  const price = requireAtLeast(input.pricePerPackage, 0, 'Price per package');

  const netArea = area - openings;
  const additionalR = Math.max(0, targetR - existingR);
  const meetsTarget = additionalR === 0;

  if (meetsTarget) {
    return {
      netArea,
      additionalR: 0,
      totalR: existingR,
      thicknessIn: 0,
      packages: 0,
      cost: 0,
      coveredArea: 0,
      leftoverArea: 0,
      meetsTarget,
    };
  }

  const thicknessIn = additionalR / material.rPerInch;
  const areaWithWaste = netArea * (1 + wastePct / 100);
  const packages = Math.ceil(areaWithWaste / coverage);
  const coveredArea = packages * coverage;

  return {
    netArea,
    additionalR,
    totalR: existingR + additionalR,
    thicknessIn,
    packages,
    cost: packages * price,
    coveredArea,
    leftoverArea: coveredArea - netArea,
    meetsTarget,
  };
}

/**
 * Appliance running-cost engine for the Electricity Cost Calculator.
 * Pure arithmetic: kWh = watts / 1000 x hours x days, cost = kWh x the
 * user-entered rate. The rate is always supplied by the caller/visitor — this
 * module hard-codes no tariff, because electricity tariffs differ per
 * municipality, supplier and plan, and one must never be presented as
 * official.
 */

export interface ApplianceLibraryEntry {
  id: string;
  label: string;
  /** Typical running wattage of the appliance, not its sticker start-up peak. */
  watts: number;
  /** Typical hours the appliance runs per day when used normally. */
  hoursPerDay: number;
  category: 'heating' | 'cooling' | 'lighting' | 'kitchen' | 'laundry' | 'media' | 'other';
  note?: string;
}

/**
 * Starter library, weighted toward South African households (geyser, pool
 * pump, stove plates). All values are typical figures for planning; the label
 * on the actual appliance wins — visitors can edit watts and hours freely.
 */
export const APPLIANCE_LIBRARY: ApplianceLibraryEntry[] = [
  { id: 'geyser', label: 'Electric geyser (150 L)', watts: 3000, hoursPerDay: 3, category: 'heating', note: 'The largest single consumer in most homes; thermostat and insulation matter more than brand.' },
  { id: 'space-heater', label: 'Electric space heater', watts: 2000, hoursPerDay: 4, category: 'heating' },
  { id: 'aircon', label: 'Air conditioner (9000 BTU)', watts: 1100, hoursPerDay: 5, category: 'cooling' },
  { id: 'stove-plate', label: 'Stove plate', watts: 1500, hoursPerDay: 2, category: 'kitchen', note: 'A hot plate at full power; ovens cycle on and off, so they average less per hour.' },
  { id: 'oven', label: 'Electric oven', watts: 2000, hoursPerDay: 1, category: 'kitchen' },
  { id: 'microwave', label: 'Microwave', watts: 1000, hoursPerDay: 0.5, category: 'kitchen' },
  { id: 'kettle', label: 'Kettle', watts: 2000, hoursPerDay: 0.25, category: 'kitchen' },
  { id: 'fridge', label: 'Refrigerator (defrost type)', watts: 100, hoursPerDay: 24, category: 'kitchen', note: 'Wattage is while the compressor runs; running about a third of the time averages near the figure shown.' },
  { id: 'freezer', label: 'Chest freezer', watts: 120, hoursPerDay: 24, category: 'kitchen' },
  { id: 'washing-machine', label: 'Washing machine', watts: 800, hoursPerDay: 0.75, category: 'laundry' },
  { id: 'tumble-dryer', label: 'Tumble dryer', watts: 3000, hoursPerDay: 1, category: 'laundry' },
  { id: 'iron', label: 'Iron', watts: 1400, hoursPerDay: 0.5, category: 'laundry' },
  { id: 'pool-pump', label: 'Pool pump', watts: 750, hoursPerDay: 6, category: 'other', note: 'Often the second-largest consumer after the geyser; a timer usually pays for itself.' },
  { id: 'tv', label: 'Television (LED, 55")', watts: 120, hoursPerDay: 4, category: 'media' },
  { id: 'decoder', label: 'Decoder / set-top box (standby incl.)', watts: 30, hoursPerDay: 24, category: 'media' },
  { id: 'router', label: 'Wi-Fi router / ONT', watts: 10, hoursPerDay: 24, category: 'media', note: 'Small per device, but it runs all day; relevant for backup-power sizing.' },
  { id: 'laptop', label: 'Laptop', watts: 65, hoursPerDay: 8, category: 'media' },
  { id: 'incandescent', label: 'Lighting: 10 incandescent/halogen bulbs (60 W)', watts: 600, hoursPerDay: 5, category: 'lighting' },
  { id: 'led-equivalent', label: 'Lighting: 10 LED bulbs (60 W-equivalent)', watts: 90, hoursPerDay: 5, category: 'lighting' },
] satisfies readonly ApplianceLibraryEntry[];

export interface ApplianceLoad {
  /** Library id, or a custom id the caller mints for ad-hoc appliances. */
  id: string;
  label: string;
  watts: number;
  hoursPerDay: number;
  quantity: number;
}

export interface ApplianceUsage {
  kwhPerDay: number;
  kwhPerMonth: number;
  kwhPerYear: number;
}

function clampNonNegative(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * Energy for one load line. Monthly figures use a `daysPerMonth` the caller
 * supplies (30.44 is the calendar-average; 30 is fine for planning).
 */
export function applianceUsage(load: ApplianceLoad, daysPerMonth = 30.44): ApplianceUsage {
  const kwhPerDay = (clampNonNegative(load.watts) / 1000) * clampNonNegative(load.hoursPerDay) * clampNonNegative(load.quantity);
  return {
    kwhPerDay,
    kwhPerMonth: kwhPerDay * clampNonNegative(daysPerMonth),
    kwhPerYear: kwhPerDay * 365,
  };
}

export interface ApplianceCost extends ApplianceUsage {
  ratePerKwh: number;
  costPerDay: number;
  costPerMonth: number;
  costPerYear: number;
}

export function applianceCost(load: ApplianceLoad, ratePerKwh: number, daysPerMonth = 30.44): ApplianceCost {
  const usage = applianceUsage(load, daysPerMonth);
  const rate = clampNonNegative(ratePerKwh);
  return {
    ...usage,
    ratePerKwh: rate,
    costPerDay: usage.kwhPerDay * rate,
    costPerMonth: usage.kwhPerMonth * rate,
    costPerYear: usage.kwhPerYear * rate,
  };
}

export interface HouseholdTotals extends ApplianceCost {}

/** Sum of every load line: shown as the estimated household usage + cost. */
export function householdTotals(loads: ApplianceLoad[], ratePerKwh: number, daysPerMonth = 30.44): HouseholdTotals {
  const sums: ApplianceCost = {
    kwhPerDay: 0,
    kwhPerMonth: 0,
    kwhPerYear: 0,
    ratePerKwh: clampNonNegative(ratePerKwh),
    costPerDay: 0,
    costPerMonth: 0,
    costPerYear: 0,
  };
  for (const load of loads) {
    const cost = applianceCost(load, ratePerKwh, daysPerMonth);
    sums.kwhPerDay += cost.kwhPerDay;
    sums.kwhPerMonth += cost.kwhPerMonth;
    sums.kwhPerYear += cost.kwhPerYear;
    sums.costPerDay += cost.costPerDay;
    sums.costPerMonth += cost.costPerMonth;
    sums.costPerYear += cost.costPerYear;
  }
  return sums;
}

export interface LedSavingsResult {
  conventional: ApplianceCost;
  led: ApplianceCost;
  monthlyKwhSaved: number;
  monthlySaving: number;
  annualSaving: number;
}

/**
 * LED versus conventional lighting on the same burning hours. Same engine
 * arithmetic as every other load — nothing here earns a special formula.
 */
export function ledVsConventionalSavings(input: {
  conventionalWatts: number;
  ledWatts: number;
  hoursPerDay: number;
  quantity: number;
  ratePerKwh: number;
  daysPerMonth?: number;
}): LedSavingsResult {
  const { daysPerMonth = 30.44, ...loads } = input;
  const conventionalLoad: ApplianceLoad = {
    id: 'conventional-lighting',
    label: 'Incandescent / halogen lighting',
    watts: clampNonNegative(input.conventionalWatts),
    hoursPerDay: clampNonNegative(input.hoursPerDay),
    quantity: clampNonNegative(input.quantity) || 1,
  };
  const ledLoad: ApplianceLoad = {
    id: 'led-lighting',
    label: 'LED lighting',
    watts: clampNonNegative(input.ledWatts),
    hoursPerDay: conventionalLoad.hoursPerDay,
    quantity: conventionalLoad.quantity,
  };
  const conventional = applianceCost(conventionalLoad, input.ratePerKwh, daysPerMonth);
  const led = applianceCost(ledLoad, input.ratePerKwh, daysPerMonth);
  return {
    conventional,
    led,
    monthlyKwhSaved: conventional.kwhPerMonth - led.kwhPerMonth,
    monthlySaving: Math.max(0, conventional.costPerMonth - led.costPerMonth),
    annualSaving: Math.max(0, conventional.costPerYear - led.costPerYear),
  };
}

/** Dead-simple electricity cost for a single usage figure (kWh x rate). */
export function costForKwh(kwh: number, ratePerKwh: number): number {
  return clampNonNegative(kwh) * clampNonNegative(ratePerKwh);
}

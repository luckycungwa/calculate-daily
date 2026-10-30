/**
 * Trip-cost engine for the South Africa Fuel Calculator. Pure arithmetic over
 * the published DMPR price table — the calculator component never re-derives
 * these formulas, so chart values and headline values share one source.
 */
import {
  FUEL_LABELS,
  FUEL_PRICE_DATA,
  PROVINCE_REGIONS,
  getFuelPrice,
  isDiesel,
  type FuelRegion,
  type FuelType,
  type Province,
} from '../data/fuelPrices';

export interface TripCostResult {
  /** Total distance travelled, including a doubled return leg. */
  distanceKm: number;
  fuelNeededL: number;
  pricePerLitre: number;
  totalCost: number;
  costPerKm: number;
  /** Where the litre price came from, for honest labelling in the UI. */
  priceSource: 'published-dmpr' | 'user-entered';
}

export interface TripCostInput {
  distanceKm: number;
  consumptionLPer100km: number;
  pricePerLitre: number;
  /** Doubles the distance (there and back) without doubling the price. */
  returnTrip?: boolean;
}

export function calculateTripCost(input: TripCostInput): TripCostResult {
  const distance = input.returnTrip ? input.distanceKm * 2 : input.distanceKm;
  const fuelNeeded = (distance * input.consumptionLPer100km) / 100;
  const totalCost = fuelNeeded * input.pricePerLitre;
  return {
    distanceKm: distance,
    fuelNeededL: fuelNeeded,
    pricePerLitre: input.pricePerLitre,
    totalCost,
    costPerKm: distance > 0 ? totalCost / distance : 0,
    priceSource: 'published-dmpr',
  };
}

export interface TripScenario {
  /** Display name, e.g. "95 ULP (inland)". */
  label: string;
  priceProof: string;
  scenario: TripCostResult;
}

export interface TripScenarioInput {
  province: Province;
  fuelTypes: FuelType[];
  distanceKm: number;
  consumptionLPer100km: number;
  returnTrip?: boolean;
  /**
   * Optional user-entered litre price applied to every fuel type. It is never
   * presented as an official rate — the UI labels it "your price".
   */
  priceOverride?: number;
}

/**
 * The same trip priced for several fuel types in one province. Prices come
 * only from the published schedule unless the caller passes a user override.
 */
export function tripFuelScenarios(input: TripScenarioInput): TripScenario[] {
  const region: FuelRegion = PROVINCE_REGIONS[input.province];
  return input.fuelTypes.map((fuelType) => {
    const published = getFuelPrice(region, fuelType);
    const hasOverride = Number.isFinite(input.priceOverride) && (input.priceOverride ?? 0) > 0;
    const price = hasOverride ? (input.priceOverride as number) : published;
    const scenario = calculateTripCost({
      distanceKm: input.distanceKm,
      consumptionLPer100km: input.consumptionLPer100km,
      pricePerLitre: price,
      returnTrip: input.returnTrip,
    });
    scenario.priceSource = hasOverride ? 'user-entered' : 'published-dmpr';
    return {
      label: hasOverride ? `${FUEL_LABELS[fuelType]} (your price)` : `${FUEL_LABELS[fuelType]}`,
      priceProof: hasOverride
        ? `R${price.toFixed(2)}/L user-entered`
        : `R${published.toFixed(2)}/L published ${isDiesel(fuelType) ? 'wholesale' : 'pump'} price, ${FUEL_PRICE_DATA.effectiveLabel}`,
      scenario,
    };
  });
}

/**
 * South African regulated fuel prices.
 *
 * Source of truth: the Department of Mineral and Petroleum Resources (DMPR)
 * schedule effective 7 October 2026, as published on the DMPR Fuel Prices page.
 * Petrol 93 and 95 are regulated retail prices. Diesel figures in that schedule
 * are wholesale baselines; forecourt diesel prices are deregulated and vary by
 * station, so they are labelled as baselines in the UI.
 *
 * Update procedure:
 * 1. Replace the prices and effective date from the DMPR schedule.
 * 2. Set `lastVerifiedDate` to the date the figures were checked.
 * 3. Set the next scheduled adjustment (first Wednesday of the month).
 * 4. Do not publish projections as if they were official prices.
 */
export type FuelType = '95ulp' | '93ulp' | 'diesel50' | 'diesel500';
export type FuelRegion = 'inland' | 'coastal';

export const FUEL_PRICE_DATA = {
  effectiveDate: '2026-10-07',
  effectiveLabel: '7 October 2026',
  lastVerifiedDate: '2026-10-28',
  lastVerifiedLabel: '28 October 2026',
  nextAdjustmentDate: '2026-11-04',
  nextAdjustmentLabel: '4 November 2026',
  nextAdjustmentPublished: false,
  source: {
    label: 'DMPR Fuel Prices — effective 7 October 2026',
    url: 'https://www.dmpr.gov.za/Services/Petroleum-Resources/Fuel-Prices',
  },
  secondarySource: {
    label: 'Petrol Price October 2026 — official DMPR figures',
    url: 'https://petrolprice.co.za/petrol-price-october-2026/',
  },
  prices: {
    inland: { '95ulp': 30.25, '93ulp': 29.88, diesel50: 32.8, diesel500: 31.95 },
    coastal: { '95ulp': 29.38, '93ulp': 29.01, diesel50: 31.93, diesel500: 31.08 },
  },
} as const;

export const FUEL_LABELS: Record<FuelType, string> = {
  '95ulp': '95 ULP',
  '93ulp': '93 ULP',
  diesel50: 'Diesel 50ppm',
  diesel500: 'Diesel 500ppm',
};

/**
 * South African fuel pricing uses two regulated zones. The provincial mapping
 * is a planning simplification: stations near a coastal boundary can fall into
 * the other zone, so the pump price at a specific station may differ.
 */
export const PROVINCE_REGIONS = {
  Gauteng: 'inland',
  Limpopo: 'inland',
  Mpumalanga: 'inland',
  'North West': 'inland',
  'Free State': 'inland',
  'KwaZulu-Natal': 'coastal',
  'Western Cape': 'coastal',
  'Eastern Cape': 'coastal',
  'Northern Cape': 'coastal',
} as const satisfies Record<string, FuelRegion>;

export type Province = keyof typeof PROVINCE_REGIONS;

export function getFuelPrice(region: FuelRegion, fuelType: FuelType): number {
  return FUEL_PRICE_DATA.prices[region][fuelType];
}

export function isDiesel(fuelType: FuelType): boolean {
  return fuelType === 'diesel50' || fuelType === 'diesel500';
}

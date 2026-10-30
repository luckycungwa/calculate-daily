import React, { useState, useMemo } from 'react';
import { Fuel, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/toast';
import {
  FUEL_LABELS,
  FUEL_PRICE_DATA,
  PROVINCE_REGIONS,
  getFuelPrice,
  isDiesel,
  type FuelType,
  type Province,
} from '../../data/fuelPrices';
import { calculateTripCost, tripFuelScenarios } from '../../lib/fuelTrip';
import { CalculationAssumptions, ResultComparison, ResultTableToggle, ResultDataTable } from '../results/ResultComponents';

const POPULAR_ROUTES: Record<string, number> = {
  'JHB to Durban': 568,
  'JHB to Cape Town': 1402,
  'Pretoria to JHB': 58,
  'Cape Town to PE': 750,
  'Durban to Cape Town': 1660,
  'JHB to Bloemfontein': 398,
  'JHB to Polokwane': 314,
  'Cape Town to Hermanus': 120,
  'Durban to Richards Bay': 179,
  'JHB to Nelspruit': 358,
};

export interface SaFuelCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

export default function SaFuelCalculator({ onSaveHistory }: SaFuelCalculatorProps) {
  const { toast } = useToast();
  const [province, setProvince] = useState<Province>('Gauteng');
  const [fuelType, setFuelType] = useState<FuelType>('95ulp');
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('7.5');
  const [overridePrice, setOverridePrice] = useState('');
  const [returnTrip, setReturnTrip] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [copied, setCopied] = useState(false);

  const region = PROVINCE_REGIONS[province];
  const currentPrice = getFuelPrice(region, fuelType);

  const parsedDistance = parseFloat(distance);
  const parsedConsumption = parseFloat(consumption);
  const parsedOverride = parseFloat(overridePrice);
  const hasValidDistance = Number.isFinite(parsedDistance) && parsedDistance > 0;
  const hasValidConsumption = Number.isFinite(parsedConsumption) && parsedConsumption > 0;
  const distanceNum = hasValidDistance ? parsedDistance : 0;
  const consumptionNum = hasValidConsumption ? parsedConsumption : 0;
  const overrideNum = Number.isFinite(parsedOverride) && parsedOverride > 0 ? parsedOverride : undefined;
  const totalDistance = returnTrip ? distanceNum * 2 : distanceNum;
  const showDistanceError = distance.trim() !== '' && !hasValidDistance;

  // Single source of arithmetic for the headline card, the strip chart and the
  // copy/export text: the engine in src/lib/fuelTrip.ts. The price shown in
  // the banner is the published one even when an override is active.
  const results = useMemo(() => {
    if (totalDistance <= 0 || consumptionNum <= 0) return null;
    return calculateTripCost({
      distanceKm: distanceNum,
      consumptionLPer100km: consumptionNum,
      pricePerLitre: overrideNum ?? getFuelPrice(region, fuelType),
      returnTrip,
    });
  }, [totalDistance, consumptionNum, distanceNum, overrideNum, returnTrip, region, fuelType]);

  // Every fuel type priced for the same trip — the comparison strip's data.
  const scenarios = useMemo(
    () =>
      tripFuelScenarios({
        province,
        fuelTypes: Object.keys(FUEL_LABELS) as FuelType[],
        distanceKm: distanceNum,
        consumptionLPer100km: consumptionNum,
        returnTrip,
        priceOverride: overrideNum,
      }),
    [province, distanceNum, consumptionNum, returnTrip, overrideNum]
  );

  const handleCopy = () => {
    if (!results) return;
    const lines = [
      'South Africa Fuel Calculation',
      `Prices effective: ${FUEL_PRICE_DATA.effectiveLabel}`,
      `Province: ${province} (${region})`,
      `Fuel: ${FUEL_LABELS[fuelType]} @ R${results.pricePerLitre.toFixed(2)}/L${
        results.priceSource === 'user-entered'
          ? ' (your own price, not the published rate)'
          : isDiesel(fuelType)
            ? ' (wholesale baseline)'
            : ''
      }`,
      `Distance: ${results.distanceKm.toLocaleString()} km`,
      `Consumption: ${consumptionNum} L/100km`,
      `Fuel Needed: ${results.fuelNeededL.toFixed(2)} L`,
      `Total Cost: R${results.totalCost.toFixed(2)}`,
      `Cost per km: R${results.costPerKm.toFixed(2)}`,
      `Source: ${FUEL_PRICE_DATA.source.url}`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast('Results copied to clipboard', 'success');
    onSaveHistory?.(`R${results.totalCost.toFixed(2)} for ${results.distanceKm}km ${region} trip`);
  };

  const handleReset = () => {
    setProvince('Gauteng');
    setFuelType('95ulp');
    setDistance('');
    setConsumption('7.5');
    setOverridePrice('');
    setReturnTrip(false);
    setShowRoutes(false);
  };

  const handleRouteSelect = (km: number) => {
    setDistance(String(km));
    setShowRoutes(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-primary dark:text-primary-tint">
          <Fuel className="h-8 w-8" />
          {/* The page shell already renders this tool's h1; keep one h1 per
              page by making the in-widget title a section heading. */}
          <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            South Africa Fuel Calculator
          </h2>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {FUEL_PRICE_DATA.effectiveLabel} fuel prices &middot; Updated monthly
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-primary-tint to-primary p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">{FUEL_LABELS[fuelType]}</p>
            <p className="text-4xl font-bold tracking-tight">R{currentPrice.toFixed(2)}</p>
            <p className="text-sm opacity-80">
              per litre — published{overrideNum ? '; your price overrides it below' : ''}
            </p>
            {isDiesel(fuelType) && (
              <p className="mt-1 text-[11px] font-medium opacity-90">Wholesale baseline — forecourt price varies</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-0 capitalize text-sm px-3 py-1">
              {region}
            </Badge>
            <span className="text-xs opacity-70">{province}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
        <p>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Effective:</span>{' '}
          {FUEL_PRICE_DATA.effectiveLabel} &middot;{' '}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Last verified:</span>{' '}
          {FUEL_PRICE_DATA.lastVerifiedLabel}
        </p>
        <p>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Next scheduled adjustment:</span>{' '}
          {FUEL_PRICE_DATA.nextAdjustmentLabel}.{' '}
          {FUEL_PRICE_DATA.nextAdjustmentPublished
            ? 'Official prices for that date are published.'
            : 'Official prices for that date have not been published yet.'}
        </p>
        <p>
          Petrol 93 and 95 are regulated pump prices. Diesel figures in the official schedule are wholesale
          baselines; forecourt diesel prices are deregulated and vary by station.
        </p>
        <a
          href={FUEL_PRICE_DATA.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline dark:text-primary-tint"
        >
          Source: {FUEL_PRICE_DATA.source.label}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2">
        <Label htmlFor="province" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Province
        </Label>
        <select
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value as Province)}
          className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary-tint"
        >
          {(Object.keys(PROVINCE_REGIONS) as Province[]).map((p) => (
            <option key={p} value={p}>
              {p} ({PROVINCE_REGIONS[p]})
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2">
        <Label>Fuel Type</Label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(FUEL_LABELS) as FuelType[]).map((ft) => (
            <Button
              key={ft}
              variant={fuelType === ft ? 'default' : 'outline'}
              className={
                fuelType === ft
                  ? 'bg-primary-tint hover:bg-primary text-white border-primary'
                  : 'border-zinc-300 dark:border-zinc-600 hover:border-primary-tint'
              }
              onClick={() => setFuelType(ft)}
            >
              {FUEL_LABELS[ft]}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2">
        <Label htmlFor="distance">Distance (km)</Label>
        <div className="flex gap-2">
          <Input
            id="distance"
            type="number"
            min="0"
            step="0.1"
            inputMode="decimal"
            placeholder="Enter distance in km"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            aria-describedby={showDistanceError ? 'distance-error' : undefined}
            className="flex-1"
          />
          <Button
            variant={showRoutes ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowRoutes(!showRoutes)}
            className={
              showRoutes
                ? 'bg-primary-tint hover:bg-primary text-white shrink-0'
                : 'shrink-0 border-primary/40 text-primary hover:bg-primary/5 dark:hover:bg-primary/10 dark:text-primary-tint'
            }
          >
            <MapPin className="h-4 w-4" />
            <span className="ml-1">Routes</span>
          </Button>
        </div>

        {showDistanceError && (
          <p id="distance-error" className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
            Enter a trip distance above 0 km.
          </p>
        )}

        {showRoutes && (
          <div className="mt-2 max-h-48 overflow-y-auto rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
            {Object.entries(POPULAR_ROUTES).map(([route, km]) => (
              <button
                key={route}
                onClick={() => handleRouteSelect(km)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors text-left text-zinc-700 dark:text-zinc-300"
              >
                <span>{route}</span>
                <span className="text-zinc-500 dark:text-zinc-400 tabular-nums">{km} km</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2">
        <Label htmlFor="consumption">Fuel Consumption (L/100km)</Label>
        <Input
          id="consumption"
          type="number"
          min="0"
          step="0.1"
          inputMode="decimal"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          aria-describedby="consumption-help"
        />
        <p id="consumption-help" className="text-xs text-zinc-500 dark:text-zinc-400">
          Average is 7-8 L/100km for sedans, 6-7 for hatchbacks, 10-14 for SUVs
        </p>
        {!hasValidConsumption && (
          <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
            Enter a fuel consumption above 0 L/100km.
          </p>
        )}
      </div>

      {/* Optional user-entered price. It is always labelled as the visitor's
          own figure — the banner keeps showing the published DMPR price. */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2">
        <Label htmlFor="override-price">Your price per litre (optional)</Label>
        <div className="relative">
          <Input
            id="override-price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="Leave empty to use the published price"
            value={overridePrice}
            onChange={(e) => setOverridePrice(e.target.value)}
            className="pl-8"
          />
          <span className="absolute left-3 top-2 text-xs font-mono text-zinc-500">R</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          For forecourt diesel or a deal you have negotiated. Anything entered here is{' '}
          <span className="font-medium text-zinc-700 dark:text-zinc-300">your assumption</span>, never presented as
          an official rate.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
        <input
          id="returnTrip"
          type="checkbox"
          checked={returnTrip}
          onChange={(e) => setReturnTrip(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary-tint"
        />
        <Label htmlFor="returnTrip" className="cursor-pointer">
          Return trip (doubles the distance)
        </Label>
      </div>

      {results && (
        <div
          className="rounded-xl border-2 border-primary/20 dark:border-primary/30 bg-white dark:bg-zinc-900 p-6 space-y-4"
          role="status"
          aria-live="polite"
        >
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Calculation Results
          </h2>
          {isDiesel(fuelType) && (
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Diesel is priced here at the official wholesale baseline. The forecourt price you pay may differ.
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-primary/5 dark:bg-primary-tint/10 p-4 text-center">
              <p className="text-sm text-primary dark:text-primary-tint">Fuel Needed</p>
              <p className="text-2xl font-bold text-primary dark:text-primary-tint">
                {results.fuelNeededL.toFixed(2)} L
              </p>
            </div>
            <div className="rounded-lg bg-primary/5 dark:bg-primary-tint/10 p-4 text-center">
              <p className="text-sm text-primary dark:text-primary-tint">Total Cost</p>
              <p className="text-2xl font-bold text-primary dark:text-primary-tint">
                R{results.totalCost.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Cost per km</p>
              <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                R{results.costPerKm.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Distance</p>
              <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                {results.distanceKm.toLocaleString()} km
              </p>
            </div>
          </div>

          {/* Same trip, every published fuel type — values straight from the
              engine scenario strip; the selected fuel type is highlighted. */}
          <ResultComparison
            title="Compare fuel types for this trip"
            items={scenarios.map((s) => ({
              label: s.label.replace('Diesel ', 'D'),
              value: s.scenario.totalCost,
              format: (n: number) => `R${n.toFixed(2)}`,
            }))}
            highlightIndex={scenarios.findIndex((s) => FUEL_LABELS[fuelType] === s.label || s.label === `${FUEL_LABELS[fuelType]} (your price)`)}
            summary={`The same trip costs more or less depending on fuel type. ${FUEL_LABELS[fuelType]} at ${results.priceSource === 'user-entered' ? 'your entered price' : `the published ${region} price of R${results.pricePerLitre.toFixed(2)}/L`} gives R${results.totalCost.toFixed(2)} total and R${results.costPerKm.toFixed(2)} per km. Diesel bars use published wholesale baselines, so real forecourt diesel differs.`}
            tableLabel="View the fuel-type comparison as a table"
          />
          <ResultTableToggle label="View every scenario's litres and price as a table">
            <ResultDataTable
              columns={['Fuel type', 'Litres', 'Price per litre', 'Total cost']}
              rows={scenarios.map((s) => [
                s.scenario.priceSource === 'user-entered' ? `${s.label} (user price)` : s.label,
                s.scenario.fuelNeededL.toFixed(2),
                `R${s.scenario.pricePerLitre.toFixed(2)}`,
                `R${s.scenario.totalCost.toFixed(2)}`,
              ])}
              caption={scenarios.map((s) => s.priceProof).join('; ')}
            />
          </ResultTableToggle>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleCopy} className="flex-1 bg-primary hover:bg-primary text-white">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Results'}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      )}

      <CalculationAssumptions
        items={[
          {
            label: 'Trip formula',
            detail: 'Litres = distance × consumption ÷ 100; Total = litres × price per litre; Cost per km = total ÷ distance. Return trips double the distance only.',
            badge: 'formula',
          },
          {
            label: 'Published fuel prices',
            detail: `Fuel prices come from the official DMPR schedule: pump prices for petrol, wholesale baselines for diesel, effective ${FUEL_PRICE_DATA.effectiveLabel} (verified ${FUEL_PRICE_DATA.lastVerifiedLabel}). Petrol prices are zone-based: inland vs coastal.`,
            badge: 'published',
            source: { label: FUEL_PRICE_DATA.source.label, href: FUEL_PRICE_DATA.source.url },
          },
          {
            label: 'Diesel caveat',
            detail: 'Diesel forecourt prices are deregulated and vary by station — the schedule supplies a wholesale baseline, so the diesel estimate is a floor.',
            badge: 'published',
          },
          {
            label: 'Your inputs',
            detail: 'Trip distance, consumption (L/100km), and optionally your own price per litre. Enter real figures from your car and bill; nothing here assumes them for you.',
            badge: 'assumption',
          },
        ]}
        caveat="Estimates are for trip planning only. Prices are never projected forward: the tool uses the last officially published schedule and will not claim rates before they exist."
      />
    </div>
  );
}

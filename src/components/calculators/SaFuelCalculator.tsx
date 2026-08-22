import React, { useState, useMemo } from 'react';
import { Fuel, MapPin, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/toast';

type FuelType = '95ulp' | '93ulp' | 'diesel50' | 'diesel500';
type Region = 'inland' | 'coastal';
type Province =
  | 'Gauteng'
  | 'Limpopo'
  | 'Mpumalanga'
  | 'North West'
  | 'Free State'
  | 'KwaZulu-Natal'
  | 'Western Cape'
  | 'Eastern Cape'
  | 'Northern Cape';

const FUEL_PRICES: Record<Region, Record<FuelType, number>> = {
  inland: { '95ulp': 25.58, '93ulp': 25.42, diesel50: 26.90, diesel500: 26.16 },
  coastal: { '95ulp': 24.93, '93ulp': 24.77, diesel50: 26.25, diesel500: 25.51 },
};

const PROVINCES: Record<Province, Region> = {
  Gauteng: 'inland',
  Limpopo: 'inland',
  Mpumalanga: 'inland',
  'North West': 'inland',
  'Free State': 'inland',
  'KwaZulu-Natal': 'coastal',
  'Western Cape': 'coastal',
  'Eastern Cape': 'coastal',
  'Northern Cape': 'coastal',
};

const FUEL_LABELS: Record<FuelType, string> = {
  '95ulp': '95 ULP',
  '93ulp': '93 ULP',
  diesel50: 'Diesel 50ppm',
  diesel500: 'Diesel 500ppm',
};

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
  const [returnTrip, setReturnTrip] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [copied, setCopied] = useState(false);

  const region: Region = PROVINCES[province];
  const currentPrice = FUEL_PRICES[region][fuelType];
  const distanceNum = parseFloat(distance) || 0;
  const consumptionNum = parseFloat(consumption) || 7.5;
  const totalDistance = returnTrip ? distanceNum * 2 : distanceNum;

  const results = useMemo(() => {
    if (totalDistance <= 0) return null;
    const fuelNeeded = (totalDistance * consumptionNum) / 100;
    const totalCost = fuelNeeded * currentPrice;
    const costPerKm = totalCost / totalDistance;
    return { fuelNeeded, totalCost, costPerKm, distance: totalDistance };
  }, [totalDistance, consumptionNum, currentPrice]);

  const handleCopy = () => {
    if (!results) return;
    const lines = [
      'South Africa Fuel Calculation',
      `Province: ${province} (${region})`,
      `Fuel: ${FUEL_LABELS[fuelType]} @ R${currentPrice.toFixed(2)}/L`,
      `Distance: ${results.distance.toLocaleString()} km`,
      `Consumption: ${consumptionNum} L/100km`,
      `Fuel Needed: ${results.fuelNeeded.toFixed(2)} L`,
      `Total Cost: R${results.totalCost.toFixed(2)}`,
      `Cost per km: R${results.costPerKm.toFixed(2)}`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast('Results copied to clipboard', 'success');
    onSaveHistory?.(`R${results.totalCost.toFixed(2)} for ${results.distance}km ${region} trip`);
  };

  const handleReset = () => {
    setProvince('Gauteng');
    setFuelType('95ulp');
    setDistance('');
    setConsumption('7.5');
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
        <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Fuel className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            South Africa Fuel Calculator
          </h1>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          August 2026 fuel prices &middot; Updated monthly
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">{FUEL_LABELS[fuelType]}</p>
            <p className="text-4xl font-bold tracking-tight">R{currentPrice.toFixed(2)}</p>
            <p className="text-sm opacity-80">per litre</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-0 capitalize text-sm px-3 py-1">
              {region}
            </Badge>
            <span className="text-xs opacity-70">{province}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-2">
        <Label htmlFor="province" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-emerald-500" />
          Province
        </Label>
        <select
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value as Province)}
          className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {(Object.keys(PROVINCES) as Province[]).map((p) => (
            <option key={p} value={p}>
              {p} ({PROVINCES[p]})
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
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500'
                  : 'border-zinc-300 dark:border-zinc-600 hover:border-emerald-400'
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
            placeholder="Enter distance in km"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="flex-1"
          />
          <Button
            variant={showRoutes ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowRoutes(!showRoutes)}
            className={
              showRoutes
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shrink-0'
                : 'shrink-0 border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 dark:text-emerald-400'
            }
          >
            <MapPin className="h-4 w-4" />
            <span className="ml-1">Routes</span>
          </Button>
        </div>

        {showRoutes && (
          <div className="mt-2 max-h-48 overflow-y-auto rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
            {Object.entries(POPULAR_ROUTES).map(([route, km]) => (
              <button
                key={route}
                onClick={() => handleRouteSelect(km)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors text-left text-zinc-700 dark:text-zinc-300"
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
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Average is 7-8 L/100km for sedans, 6-7 for hatchbacks, 10-14 for SUVs
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
        <input
          id="returnTrip"
          type="checkbox"
          checked={returnTrip}
          onChange={(e) => setReturnTrip(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 text-emerald-500 focus:ring-emerald-500"
        />
        <Label htmlFor="returnTrip" className="cursor-pointer">
          Return trip (doubles the distance)
        </Label>
      </div>

      {results && (
        <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Calculation Results
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950 p-4 text-center">
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Fuel Needed</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {results.fuelNeeded.toFixed(2)} L
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950 p-4 text-center">
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Cost</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
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
                {results.distance.toLocaleString()} km
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleCopy} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Results'}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

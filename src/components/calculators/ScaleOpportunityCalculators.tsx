import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  calculateCommission,
  calculateDensity,
  calculateFuelEconomy,
  calculateLandscapeMaterial,
  calculateRentalYield,
  calculateRoofingMaterials,
  calculateTileOrder,
  convertUnixTimestamp,
  countText,
  simulateDebtPayoff,
  type DebtInput,
  type DebtPayoffStrategy,
  type DistanceUnit,
  type FuelUnit,
} from '../../lib/scaleOpportunityCalculations';
import { useCurrency } from '../../lib/currency';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };
type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number | 'any';
  suffix?: string;
  multiline?: boolean;
};

function NumericField({ id, label, value, onChange, min, max, step = 'any', suffix }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input id={id} type="number" min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} className={suffix ? 'pr-16' : undefined} />
        {suffix && <span className="absolute right-3 top-2 text-xs text-zinc-400">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultPanel({
  title,
  primary,
  rows,
  error,
  note,
  onSave,
}: {
  title: string;
  primary?: { label: string; value: string };
  rows: Array<{ label: string; value: string }>;
  error: string;
  note: string;
  onSave?: () => void;
}) {
  return (
    <section aria-live="polite" className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {error ? <p role="alert" className="text-sm text-amber-300">{error}</p> : (
        <>
          {primary && <><p className="text-xs text-zinc-400">{primary.label}</p><p className="mt-1 font-mono text-3xl font-bold tabular-nums text-emerald-400">{primary.value}</p></>}
          <dl className="mt-5 space-y-3">
            {rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-3 border-b border-zinc-800 pb-2 text-sm last:border-0">
                <dt className="text-zinc-400">{row.label}</dt>
                <dd className="text-right font-mono tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
          {onSave && <Button type="button" variant="outline" size="sm" onClick={onSave} className="mt-5 w-full">Save estimate to history</Button>}
        </>
      )}
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">{note}</p>
    </section>
  );
}

function CalculatorCard({ title, description, onReset, children }: { title: string; description: string; onReset: () => void; children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></div>
        <Button type="button" variant="outline" size="sm" onClick={onReset}><RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset</Button>
      </CardHeader>
      {children}
    </Card>
  );
}

function parse(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value);
}

function errorOf(callback: () => unknown): string {
  try { callback(); return ''; } catch (error) { return error instanceof Error ? error.message : 'Check the entered values.'; }
}

function payoffLabel(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return years ? `${years} yr${years === 1 ? '' : 's'} ${remainder} mo` : `${remainder} months`;
}

export const DebtPayoffCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const defaults: DebtInput[] = [
    { name: 'Credit card', balance: 5000, annualRate: 24, minimumPayment: 150 },
    { name: 'Auto loan', balance: 12000, annualRate: 7.5, minimumPayment: 300 },
    { name: 'Student loan', balance: 8000, annualRate: 5, minimumPayment: 150 },
  ];
  const [debts, setDebts] = useState<DebtInput[]>(defaults);
  const [extra, setExtra] = useState('100');
  const [strategy, setStrategy] = useState<DebtPayoffStrategy>('avalanche');
  let result: ReturnType<typeof simulateDebtPayoff> | null = null;
  let error = '';
  try { result = simulateDebtPayoff(debts, parse(extra), strategy); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to model this payoff plan.'; }
  const money = (value: number) => `${currency}${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  const updateDebt = (index: number, field: keyof DebtInput, value: string) => setDebts((current) => current.map((debt, row) => row === index ? { ...debt, [field]: field === 'name' ? value : parse(value) } : debt));
  const save = () => { if (result) onSaveHistory?.(`${strategy} payoff: debt-free in ${payoffLabel(result.payoffMonths)}; estimated interest ${money(result.totalInterest)}.`); };

  return (
    <CalculatorCard title="Debt Payoff Strategy Calculator" description="Compare debt snowball and avalanche using each balance, APR, minimum, and extra monthly budget." onReset={() => { setDebts(defaults.map((debt) => ({ ...debt }))); setExtra('100'); setStrategy('avalanche'); }}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {debts.map((debt, index) => (
            <section key={index} className="grid gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor={`debt-name-${index}`}>Debt {index + 1} name</Label>
                <Input id={`debt-name-${index}`} value={debt.name} onChange={(event) => updateDebt(index, 'name', event.target.value)} />
              </div>
              <NumericField id={`debt-balance-${index}`} label={`Balance (${currency})`} value={String(debt.balance)} onChange={(value) => updateDebt(index, 'balance', value)} min={0.01} />
              <NumericField id={`debt-apr-${index}`} label="APR" value={String(debt.annualRate)} onChange={(value) => updateDebt(index, 'annualRate', value)} min={0} max={100} suffix="%" />
              <NumericField id={`debt-minimum-${index}`} label={`Minimum payment (${currency})`} value={String(debt.minimumPayment)} onChange={(value) => updateDebt(index, 'minimumPayment', value)} min={0.01} />
              {debts.length > 1 && <Button type="button" variant="outline" size="sm" onClick={() => setDebts((current) => current.filter((_, row) => row !== index))} className="sm:col-span-2">Remove debt</Button>}
            </section>
          ))}
          <div className="flex flex-wrap items-end gap-3">
            <NumericField id="debt-extra" label={`Extra monthly budget (${currency})`} value={extra} onChange={setExtra} min={0} />
            <Button type="button" variant="outline" size="sm" disabled={debts.length >= 8} onClick={() => setDebts((current) => [...current, { name: `Debt ${current.length + 1}`, balance: 1000, annualRate: 10, minimumPayment: 50 }])}>Add debt</Button>
          </div>
          <fieldset className="flex flex-wrap gap-4 text-sm">
            <legend className="mb-2 font-semibold">Payoff order</legend>
            <label className="flex items-center gap-2"><input type="radio" name="debt-strategy" value="avalanche" checked={strategy === 'avalanche'} onChange={() => setStrategy('avalanche')} /> Highest APR first (avalanche)</label>
            <label className="flex items-center gap-2"><input type="radio" name="debt-strategy" value="snowball" checked={strategy === 'snowball'} onChange={() => setStrategy('snowball')} /> Lowest balance first (snowball)</label>
          </fieldset>
        </div>
        <ResultPanel title="Modeled payoff" primary={result ? { label: 'Debt-free after', value: payoffLabel(result.payoffMonths) } : undefined} rows={result ? [{ label: 'Estimated total interest', value: money(result.totalInterest) }, { label: 'Total payments', value: money(result.totalPayments) }, { label: 'Payoff order', value: result.payoffOrder.join(' → ') }] : []} error={error} note="Model assumes interest accrues monthly, each debt's minimum is paid, and remaining budget follows the selected strategy. Fees, changing rates, due-date timing, and lender rules are excluded." onSave={save} />
      </CardContent>
    </CalculatorCard>
  );
};

type TileFields = { area: string; length: string; width: string; waste: string; tilesPerBox: string };
const TILE_DEFAULTS: TileFields = { area: '120', length: '12', width: '12', waste: '10', tilesPerBox: '10' };

export const TileCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [fields, setFields] = useState({ ...TILE_DEFAULTS });
  const values = { roomAreaSquareFeet: parse(fields.area), tileLengthInches: parse(fields.length), tileWidthInches: parse(fields.width), wastePercent: parse(fields.waste), tilesPerBox: parse(fields.tilesPerBox) };
  let result: ReturnType<typeof calculateTileOrder> | null = null;
  let error = '';
  try { result = calculateTileOrder(values); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to calculate this tile order.'; }
  const update = (field: keyof TileFields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const save = () => { if (result) onSaveHistory?.(`Tile estimate: ${result.tileCount} tiles, ${result.boxCount} boxes including ${fields.waste}% waste.`); };

  return (
    <CalculatorCard title="Tile Calculator" description="Estimate tile quantity and boxes from floor area, tile size, and a user-selected waste allowance." onReset={() => setFields({ ...TILE_DEFAULTS })}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <NumericField id="tile-area" label="Room area (sq ft)" value={fields.area} onChange={(value) => update('area', value)} min={0.01} />
          <NumericField id="tile-length" label="Tile length (in)" value={fields.length} onChange={(value) => update('length', value)} min={0.01} />
          <NumericField id="tile-width" label="Tile width (in)" value={fields.width} onChange={(value) => update('width', value)} min={0.01} />
          <NumericField id="tile-waste" label="Waste allowance" value={fields.waste} onChange={(value) => update('waste', value)} min={0} max={50} suffix="%" />
          <NumericField id="tile-per-box" label="Tiles per box" value={fields.tilesPerBox} onChange={(value) => update('tilesPerBox', value)} min={1} step={1} />
        </div>
        <ResultPanel title="Material estimate" primary={result ? { label: 'Boxes to purchase', value: String(result.boxCount) } : undefined} rows={result ? [{ label: 'Tiles required', value: String(result.tileCount) }, { label: 'Tile coverage each', value: `${result.tileAreaSquareFeet.toFixed(3)} sq ft` }, { label: 'Area with waste', value: `${result.orderAreaSquareFeet.toFixed(2)} sq ft` }] : []} error={error} note="Waste allowance is your input; layout, breakage, cuts, grout joints, and package coverage vary. Verify the manufacturer's coverage and buy strategy before ordering." onSave={save} />
      </CardContent>
    </CalculatorCard>
  );
};

type LandscapeFields = { material: 'gravel' | 'mulch' | 'topsoil'; area: string; depth: string; bagVolume: string };
const LANDSCAPE_DEFAULTS: LandscapeFields = { material: 'gravel', area: '200', depth: '3', bagVolume: '2' };

export const LandscapeMaterialCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [fields, setFields] = useState({ ...LANDSCAPE_DEFAULTS });
  const resultInput = { areaSquareFeet: parse(fields.area), depthInches: parse(fields.depth), bagVolumeCubicFeet: parse(fields.bagVolume) };
  let result: ReturnType<typeof calculateLandscapeMaterial> | null = null;
  let error = '';
  try { result = calculateLandscapeMaterial(resultInput); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to calculate material volume.'; }
  const update = (field: keyof LandscapeFields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const save = () => { if (result) onSaveHistory?.(`${fields.material} estimate: ${result.volumeCubicYards.toFixed(2)} cubic yards, ${result.bagCount} bags at ${fields.bagVolume} cu ft each.`); };

  return (
    <CalculatorCard title="Gravel, Mulch & Topsoil Calculator" description="Estimate delivered volume or bags from the area and depth you enter." onReset={() => setFields({ ...LANDSCAPE_DEFAULTS })}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium">Material
            <select value={fields.material} onChange={(event) => update('material', event.target.value as LandscapeFields['material'])} className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900">
              <option value="gravel">Gravel</option><option value="mulch">Mulch</option><option value="topsoil">Topsoil</option>
            </select>
          </label>
          <NumericField id="landscape-area" label="Coverage area (sq ft)" value={fields.area} onChange={(value) => update('area', value)} min={0.01} />
          <NumericField id="landscape-depth" label="Depth (in)" value={fields.depth} onChange={(value) => update('depth', value)} min={0.01} />
          <NumericField id="landscape-bag-size" label="Bag volume (cu ft)" value={fields.bagVolume} onChange={(value) => update('bagVolume', value)} min={0.01} />
        </div>
        <ResultPanel title={`${fields.material[0].toUpperCase()}${fields.material.slice(1)} estimate`} primary={result ? { label: 'Bulk volume', value: `${result.volumeCubicYards.toFixed(2)} cu yd` } : undefined} rows={result ? [{ label: 'Volume', value: `${result.volumeCubicFeet.toFixed(2)} cu ft` }, { label: `Bags at ${fields.bagVolume} cu ft`, value: String(result.bagCount) }] : []} error={error} note="Volume only. Material density, moisture, settling, coverage depth, delivery minimums, and bag labels vary; this tool does not infer weight or cost." onSave={save} />
      </CardContent>
    </CalculatorCard>
  );
};

type RoofingFields = { footprint: string; pitch: string; waste: string; bundle: string };
const ROOFING_DEFAULTS: RoofingFields = { footprint: '1000', pitch: '6', waste: '10', bundle: '33.3' };

export const RoofingCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [fields, setFields] = useState({ ...ROOFING_DEFAULTS });
  const values = { footprintSquareFeet: parse(fields.footprint), riseInchesPer12: parse(fields.pitch), wastePercent: parse(fields.waste), bundleCoverageSquareFeet: parse(fields.bundle) };
  let result: ReturnType<typeof calculateRoofingMaterials> | null = null;
  let error = '';
  try { result = calculateRoofingMaterials(values); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to estimate roof materials.'; }
  const update = (field: keyof RoofingFields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const save = () => { if (result) onSaveHistory?.(`Roof estimate: ${result.orderAreaSquareFeet.toFixed(1)} sq ft and ${result.bundleCount} bundles including entered waste.`); };

  return (
    <CalculatorCard title="Roofing Materials Calculator" description="Estimate sloped roof area, roofing squares, and bundles from footprint and pitch." onReset={() => setFields({ ...ROOFING_DEFAULTS })}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <NumericField id="roof-footprint" label="Horizontal footprint (sq ft)" value={fields.footprint} onChange={(value) => update('footprint', value)} min={0.01} />
          <NumericField id="roof-pitch" label="Rise per 12 in run (in)" value={fields.pitch} onChange={(value) => update('pitch', value)} min={0} max={36} />
          <NumericField id="roof-waste" label="Waste allowance" value={fields.waste} onChange={(value) => update('waste', value)} min={0} max={50} suffix="%" />
          <NumericField id="roof-bundle" label="Bundle coverage (sq ft)" value={fields.bundle} onChange={(value) => update('bundle', value)} min={0.01} />
        </div>
        <ResultPanel title="Roof area estimate" primary={result ? { label: 'Estimated bundles', value: String(result.bundleCount) } : undefined} rows={result ? [{ label: 'Pitch multiplier', value: result.pitchMultiplier.toFixed(3) }, { label: 'Sloped roof area', value: `${result.roofAreaSquareFeet.toFixed(1)} sq ft` }, { label: 'Area with waste', value: `${result.orderAreaSquareFeet.toFixed(1)} sq ft` }, { label: 'Roofing squares', value: result.roofingSquares.toFixed(2) }] : []} error={error} note="Uses a single slope multiplier on the entered horizontal footprint. Complex roofs, hips, valleys, dormers, underlayment, ridge caps, code, and manufacturer bundle coverage require separate takeoff." onSave={save} />
      </CardContent>
    </CalculatorCard>
  );
};

type RentalFields = { price: string; closing: string; rent: string; expenses: string; vacancy: string };
const RENTAL_DEFAULTS: RentalFields = { price: '200000', closing: '5000', rent: '2000', expenses: '6000', vacancy: '5' };

export const RentalYieldCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const [fields, setFields] = useState({ ...RENTAL_DEFAULTS });
  const values = { purchasePrice: parse(fields.price), closingCosts: parse(fields.closing), monthlyRent: parse(fields.rent), annualExpenses: parse(fields.expenses), vacancyPercent: parse(fields.vacancy) };
  let result: ReturnType<typeof calculateRentalYield> | null = null;
  let error = '';
  try { result = calculateRentalYield(values); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to calculate rental yield.'; }
  const update = (field: keyof RentalFields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const money = (value: number) => `${currency}${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  const save = () => { if (result) onSaveHistory?.(`Rental estimate: gross yield ${result.grossYieldPercent.toFixed(2)}%; net yield ${result.netYieldPercent.toFixed(2)}%.`); };

  return (
    <CalculatorCard title="Rental Yield Calculator" description="Compare gross rent yield with a simplified vacancy- and expense-adjusted yield." onReset={() => setFields({ ...RENTAL_DEFAULTS })}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <NumericField id="rental-price" label={`Purchase price (${currency})`} value={fields.price} onChange={(value) => update('price', value)} min={0.01} />
          <NumericField id="rental-closing" label={`Closing costs (${currency})`} value={fields.closing} onChange={(value) => update('closing', value)} min={0} />
          <NumericField id="rental-monthly-rent" label={`Monthly scheduled rent (${currency})`} value={fields.rent} onChange={(value) => update('rent', value)} min={0} />
          <NumericField id="rental-expenses" label={`Annual operating expenses (${currency})`} value={fields.expenses} onChange={(value) => update('expenses', value)} min={0} />
          <NumericField id="rental-vacancy" label="Vacancy allowance" value={fields.vacancy} onChange={(value) => update('vacancy', value)} min={0} max={100} suffix="%" />
        </div>
        <ResultPanel title="Operating estimate" primary={result ? { label: 'Simplified net yield', value: `${result.netYieldPercent.toFixed(2)}%` } : undefined} rows={result ? [{ label: 'Gross yield', value: `${result.grossYieldPercent.toFixed(2)}%` }, { label: 'Annual NOI estimate', value: money(result.annualNetOperatingIncome) }, { label: 'Monthly cash flow before financing', value: money(result.monthlyCashFlowBeforeFinancing) }] : []} error={error} note="NOI here subtracts entered annual operating expenses and vacancy only. It excludes debt service, taxes, insurance if not entered, capital expenditures, management, and income tax. Not investment advice." onSave={save} />
      </CardContent>
    </CalculatorCard>
  );
};

type CommissionFields = { amount: string; rate: string; share: string };
const COMMISSION_DEFAULTS: CommissionFields = { amount: '100000', rate: '5', share: '80' };

export const CommissionCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const [fields, setFields] = useState({ ...COMMISSION_DEFAULTS });
  const values = { saleAmount: parse(fields.amount), commissionPercent: parse(fields.rate), recipientSharePercent: parse(fields.share) };
  let result: ReturnType<typeof calculateCommission> | null = null;
  let error = '';
  try { result = calculateCommission(values); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to calculate commission.'; }
  const update = (field: keyof CommissionFields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const money = (value: number) => `${currency}${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  return (
    <CalculatorCard title="Commission Calculator" description="Calculate the total commission and an optional recipient share." onReset={() => setFields({ ...COMMISSION_DEFAULTS })}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <NumericField id="commission-amount" label={`Sale amount (${currency})`} value={fields.amount} onChange={(value) => update('amount', value)} min={0} />
          <NumericField id="commission-rate" label="Commission rate" value={fields.rate} onChange={(value) => update('rate', value)} min={0} max={100} suffix="%" />
          <NumericField id="commission-share" label="Recipient share of commission" value={fields.share} onChange={(value) => update('share', value)} min={0} max={100} suffix="%" />
        </div>
        <ResultPanel title="Commission breakdown" primary={result ? { label: 'Total commission', value: money(result.totalCommission) } : undefined} rows={result ? [{ label: 'Recipient share', value: money(result.recipientCommission) }, { label: 'Remaining share', value: money(result.remainingCommission) }] : []} error={error} note="A simple percentage calculation only. Contract terms, taxes, fees, tiered plans, and local rules are not modeled." onSave={result ? () => onSaveHistory?.(`Commission: ${money(result!.totalCommission)} total; ${money(result!.recipientCommission)} recipient share.`) : undefined} />
      </CardContent>
    </CalculatorCard>
  );
};

type FuelFields = { distance: string; fuel: string; distanceUnit: DistanceUnit; fuelUnit: FuelUnit };
const FUEL_DEFAULTS: FuelFields = { distance: '300', fuel: '10', distanceUnit: 'miles', fuelUnit: 'us-gallons' };

export const FuelEconomyCalculator: React.FC<CalculatorProps> = () => {
  const [fields, setFields] = useState({ ...FUEL_DEFAULTS });
  const values = { distance: parse(fields.distance), distanceUnit: fields.distanceUnit, fuelUsed: parse(fields.fuel), fuelUnit: fields.fuelUnit };
  let result: ReturnType<typeof calculateFuelEconomy> | null = null;
  let error = '';
  try { result = calculateFuelEconomy(values); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to calculate fuel economy.'; }
  const update = (field: keyof FuelFields, value: string) => setFields((current) => ({ ...current, [field]: value }));

  return (
    <CalculatorCard title="Fuel Economy & MPG Calculator" description="Convert a measured drive and fuel used to US MPG, Imperial MPG, and L/100 km." onReset={() => setFields({ ...FUEL_DEFAULTS })}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <NumericField id="economy-distance" label="Distance" value={fields.distance} onChange={(value) => update('distance', value)} min={0.01} />
          <label className="space-y-1.5 text-sm font-medium">Distance unit
            <select value={fields.distanceUnit} onChange={(event) => update('distanceUnit', event.target.value)} className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"><option value="miles">Miles</option><option value="kilometers">Kilometers</option></select>
          </label>
          <NumericField id="economy-fuel" label="Fuel used" value={fields.fuel} onChange={(value) => update('fuel', value)} min={0.01} />
          <label className="space-y-1.5 text-sm font-medium">Fuel unit
            <select value={fields.fuelUnit} onChange={(event) => update('fuelUnit', event.target.value)} className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"><option value="us-gallons">US gallons</option><option value="imperial-gallons">Imperial gallons</option><option value="liters">Liters</option></select>
          </label>
        </div>
        <ResultPanel title="Equivalent fuel economy" primary={result ? { label: 'US miles per gallon', value: result.usMilesPerGallon.toFixed(2) } : undefined} rows={result ? [{ label: 'Imperial miles per gallon', value: result.imperialMilesPerGallon.toFixed(2) }, { label: 'Liters per 100 km', value: result.litersPer100Kilometers.toFixed(2) }] : []} error={error} note="Uses the measured fuel volume you provide. US and Imperial gallons differ; vehicle displays, test methods, and real-world driving conditions may differ." />
      </CardContent>
    </CalculatorCard>
  );
};

export const UnixTimestampCalculator: React.FC<CalculatorProps> = () => {
  const [timestamp, setTimestamp] = useState('1700000000');
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  let result: ReturnType<typeof convertUnixTimestamp> | null = null;
  let error = '';
  try { result = convertUnixTimestamp(timestamp, unit); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to convert this timestamp.'; }
  const localDate = result ? new Date(result.milliseconds).toString() : '';

  return (
    <CalculatorCard title="Unix Timestamp Converter" description="Convert Unix seconds or milliseconds to UTC and local browser time." onReset={() => { setTimestamp('1700000000'); setUnit('seconds'); }}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <NumericField id="unix-timestamp" label="Unix timestamp" value={timestamp} onChange={setTimestamp} />
          <label className="space-y-1.5 text-sm font-medium">Timestamp unit
            <select value={unit} onChange={(event) => setUnit(event.target.value as typeof unit)} className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"><option value="seconds">Seconds</option><option value="milliseconds">Milliseconds</option></select>
          </label>
        </div>
        <ResultPanel title="Date and time" primary={result ? { label: 'UTC ISO 8601', value: result.isoUtc } : undefined} rows={result ? [{ label: 'Local browser time', value: localDate }, { label: 'Unix seconds', value: String(result.seconds) }, { label: 'Unix milliseconds', value: String(result.milliseconds) }] : []} error={error} note="UTC is the canonical timestamp. Local display uses this browser's time zone and locale; daylight-saving transitions affect only that display." />
      </CardContent>
    </CalculatorCard>
  );
};

export const WordCounterCalculator: React.FC<CalculatorProps> = () => {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState('238');
  let result: ReturnType<typeof countText> | null = null;
  let error = '';
  try { result = countText(text, parse(speed)); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to count this text.'; }

  return (
    <CalculatorCard title="Word & Character Counter" description="Count words, characters, sentences, paragraphs, and an adjustable reading-time estimate." onReset={() => { setText(''); setSpeed('238'); }}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <label htmlFor="word-counter-text" className="block space-y-1.5 text-sm font-medium">Text
            <textarea id="word-counter-text" value={text} onChange={(event) => setText(event.target.value)} rows={12} className="w-full resize-y rounded-lg border border-zinc-300 bg-white p-3 text-sm text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50" />
          </label>
          <NumericField id="word-counter-speed" label="Estimated reading speed (words per minute)" value={speed} onChange={setSpeed} min={1} max={2000} />
        </div>
        <ResultPanel title="Text statistics" primary={result ? { label: 'Words', value: String(result.words) } : undefined} rows={result ? [{ label: 'Characters with spaces', value: String(result.charactersWithSpaces) }, { label: 'Characters without spaces', value: String(result.charactersWithoutSpaces) }, { label: 'Sentences', value: String(result.sentences) }, { label: 'Paragraphs', value: String(result.paragraphs) }, { label: 'Estimated reading time', value: `${result.estimatedReadingMinutes.toFixed(1)} min` }] : []} error={error} note="Reading time is an estimate based on your selected words-per-minute rate. Word and sentence tokenization follows whitespace and common punctuation, not a language-specific editorial standard." />
      </CardContent>
    </CalculatorCard>
  );
};

type DensityFields = { mass: string; volume: string };
const DENSITY_DEFAULTS: DensityFields = { mass: '1', volume: '1' };

export const DensityCalculator: React.FC<CalculatorProps> = () => {
  const [fields, setFields] = useState({ ...DENSITY_DEFAULTS });
  let result: ReturnType<typeof calculateDensity> | null = null;
  let error = '';
  try { result = calculateDensity(parse(fields.mass), parse(fields.volume)); } catch (cause) { error = cause instanceof Error ? cause.message : 'Unable to calculate density.'; }
  const update = (field: keyof DensityFields, value: string) => setFields((current) => ({ ...current, [field]: value }));

  return (
    <CalculatorCard title="Density Calculator" description="Calculate density from mass in kilograms and volume in liters." onReset={() => setFields({ ...DENSITY_DEFAULTS })}>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <NumericField id="density-mass" label="Mass (kg)" value={fields.mass} onChange={(value) => update('mass', value)} min={0.01} />
          <NumericField id="density-volume" label="Volume (L)" value={fields.volume} onChange={(value) => update('volume', value)} min={0.01} />
        </div>
        <ResultPanel title="Density" primary={result ? { label: 'Kilograms per cubic meter', value: result.kilogramsPerCubicMeter.toLocaleString('en-US', { maximumFractionDigits: 4 }) } : undefined} rows={result ? [{ label: 'Grams per cubic centimeter', value: result.gramsPerCubicCentimeter.toLocaleString('en-US', { maximumFractionDigits: 4 }) }] : []} error={error} note="Enter mass in kilograms and volume in liters. Convert units before entry if needed; the result is mass divided by volume, not a material lookup." />
      </CardContent>
    </CalculatorCard>
  );
};
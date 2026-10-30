import React, { useMemo, useState } from 'react';
import { Copy, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useCurrency } from '../../lib/currency';
import {
  calculateBtu,
  calculateConversionRate,
  calculateDimensionalWeight,
  calculateEvCharge,
  calculateFreelanceRate,
  calculateInsulation,
  calculateTripCost,
  conversionsForRate,
  DIM_WEIGHT_PROFILES,
  findDimWeightProfile,
  INSULATION_MATERIALS,
  visitorsForConversions,
  type DimWeightProfileId,
  type InsulationLevel,
  type InsulationMaterialId,
  type SunExposure,
  type TripEfficiencyUnit,
} from '../../lib/practicalCalculations';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };
type DistanceUnit = 'mi' | 'km';

function format(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '-';
  return new Intl.NumberFormat('en', { maximumFractionDigits: digits }).format(value);
}

function money(value: number, currency: string, digits = 2): string {
  if (!Number.isFinite(value)) return '-';
  return `${currency}${new Intl.NumberFormat('en', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}`;
}

function toNumber(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to calculate with these values.';
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">{children}</div>
  );
}

function ResultRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-zinc-800/70 py-2 last:border-0">
      <div>
        <div className="text-xs text-zinc-400">{label}</div>
        {hint && <div className="mt-0.5 text-[10px] text-zinc-500">{hint}</div>}
      </div>
      <div className="text-right font-mono text-sm tabular-nums text-zinc-100">{value}</div>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
  hint,
  min,
  step = 'any',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  hint?: string;
  min?: string;
  step?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={suffix ? 'pr-16' : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  children,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-tint dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      >
        {children}
      </select>
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary-tint dark:border-zinc-600 dark:bg-zinc-900"
      />
      {label}
    </label>
  );
}

function useCopy(onSaveHistory?: (summary: string) => void) {
  const { toast } = useToast();
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Result copied to clipboard');
    } catch {
      toast('Clipboard unavailable - select and copy manually.', 'warning');
    }
    onSaveHistory?.(text);
  };
}

function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className="text-sm text-amber-300">
      {message}
    </p>
  );
}

// ==========================================
// Conversion rate
// ==========================================

export const ConversionRateCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const copy = useCopy(onSaveHistory);
  const [visitors, setVisitors] = useState('2500');
  const [conversions, setConversions] = useState('75');
  const [spend, setSpend] = useState('500');
  const [revenue, setRevenue] = useState('7500');
  const [targetConversions, setTargetConversions] = useState('100');

  const parsed = useMemo(
    () => ({
      visitors: toNumber(visitors),
      conversions: toNumber(conversions),
      spend: spend.trim() === '' ? 0 : toNumber(spend),
      revenue: revenue.trim() === '' ? 0 : toNumber(revenue),
    }),
    [visitors, conversions, spend, revenue]
  );

  const result = useMemo(() => {
    try {
      return { value: calculateConversionRate(parsed), error: '' };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [parsed]);

  const goal = useMemo(() => {
    try {
      const target = toNumber(targetConversions);
      if (!result.value) return null;
      return visitorsForConversions(target, result.value.ratePct);
    } catch {
      return null;
    }
  }, [targetConversions, result.value]);

  const targetRate = 5;
  const conversionsAtTarget = result.value?.ratePct
    ? (() => {
        try {
          return conversionsForRate(parsed.visitors, targetRate);
        } catch {
          return null;
        }
      })()
    : null;

  const handleCopy = () => {
    if (!result.value) return;
    void copy(
      `Conversion rate: ${format(result.value.ratePct)}% (${parsed.conversions} of ${format(parsed.visitors)} visitors). ` +
        `95% interval ${format(result.value.intervalLowPct)}%-${format(result.value.intervalHighPct)}%.`
    );
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 font-mono text-[11px]">Marketing math</Badge>
          <CardTitle>Conversion Rate Calculator</CardTitle>
          <CardDescription>
            Turn visitors and conversions into a rate, a confidence interval, and the cost of each result.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setVisitors('2500');
            setConversions('75');
            setSpend('500');
            setRevenue('7500');
            setTargetConversions('100');
          }}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="cr-visitors" label="Visitors" value={visitors} onChange={setVisitors} min="1" />
            <NumberField id="cr-conversions" label="Conversions" value={conversions} onChange={setConversions} min="0" step="1" />
            <NumberField id="cr-spend" label="Ad or campaign spend" value={spend} onChange={setSpend} min="0" hint="Optional" />
            <NumberField id="cr-revenue" label="Revenue from conversions" value={revenue} onChange={setRevenue} min="0" hint="Optional" />
          </div>
          <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="mb-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">Goal</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <NumberField
                id="cr-target"
                label="Conversions wanted"
                value={targetConversions}
                onChange={setTargetConversions}
                min="1"
                step="1"
              />
              <div className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                {goal === null ? (
                  'Enter a valid rate to project visitors.'
                ) : (
                  <>
                    At {format(result.value!.ratePct)}%, you need{' '}
                    <strong className="text-zinc-900 dark:text-zinc-100">{format(goal, 0)} visitors</strong>.
                    {conversionsAtTarget !== null && (
                      <> A {targetRate}% rate would produce {format(conversionsAtTarget, 0)} conversions from the same traffic.</>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            A conversion is any completed action you define: a purchase, a form, a booked call. Keep the definition
            identical between periods or the rate is not comparable.
          </p>
        </div>
        <ResultPanel>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-sm font-semibold">Result</div>
            {result.value && (
              <Button type="button" variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={handleCopy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </div>
          {result.error ? (
            <div className="mt-4"><ErrorNote message={result.error} /></div>
          ) : result.value && (
            <>
              <div className="mt-3 font-mono text-4xl font-semibold tabular-nums text-primary-on-dark">
                {format(result.value.ratePct)}%
              </div>
              <div className="mt-1 text-[11px] text-zinc-400">
                95% confidence: {format(result.value.intervalLowPct)}% to {format(result.value.intervalHighPct)}%
              </div>
              <div className="mt-4">
                <ResultRow label="Visitors per conversion" value={format(result.value.visitorsPerConversion, 1)} />
                <ResultRow label="Cost per conversion" value={result.value.costPerConversion === null ? 'No spend entered' : money(result.value.costPerConversion, currency)} />
                <ResultRow label="Revenue per visitor" value={result.value.revenuePerVisitor === null ? 'No revenue entered' : money(result.value.revenuePerVisitor, currency)} />
                <ResultRow label="Revenue per conversion" value={result.value.revenuePerConversion === null ? 'No revenue entered' : money(result.value.revenuePerConversion, currency)} />
                <ResultRow label="Standard error" value={`${format(result.value.standardErrorPct)} pts`} />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Dimensional weight
// ==========================================

export const DimensionalWeightCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [profileId, setProfileId] = useState<DimWeightProfileId>('ups-fedex');
  const [length, setLength] = useState('20');
  const [width, setWidth] = useState('16');
  const [height, setHeight] = useState('12');
  const [actualWeight, setActualWeight] = useState('10');

  const profile = findDimWeightProfile(profileId);
  const dimUnit = profile.dimensionUnit;
  const weightUnit = profile.weightUnit;

  const result = useMemo(() => {
    try {
      return {
        value: calculateDimensionalWeight({
          length: toNumber(length),
          width: toNumber(width),
          height: toNumber(height),
          actualWeight: toNumber(actualWeight),
          profileId,
        }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [length, width, height, actualWeight, profileId]);

  const handleCopy = () => {
    if (!result.value) return;
    void copy(
      `Dimensional weight (${profile.label}): ${format(result.value.dimensionalWeight)} ${weightUnit}. ` +
        `Billable weight ${format(result.value.billableWeight)} ${weightUnit} from ${format(result.value.volume)} ${dimUnit}3.`
    );
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 font-mono text-[11px]">Shipping</Badge>
          <CardTitle>Dimensional Weight Calculator</CardTitle>
          <CardDescription>
            Work out the billed weight of a parcel from its carton size and the carrier divisor.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setProfileId('ups-fedex');
            setLength('20');
            setWidth('16');
            setHeight('12');
            setActualWeight('10');
          }}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <SelectField
            id="dw-profile"
            label="Carrier profile"
            value={profileId}
            onChange={(value) => setProfileId(value as DimWeightProfileId)}
            hint={profile.note}
          >
            {DIM_WEIGHT_PROFILES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </SelectField>
          <div className="grid grid-cols-3 gap-3">
            <NumberField id="dw-length" label="Length" value={length} onChange={setLength} suffix={dimUnit} min="0" />
            <NumberField id="dw-width" label="Width" value={width} onChange={setWidth} suffix={dimUnit} min="0" />
            <NumberField id="dw-height" label="Height" value={height} onChange={setHeight} suffix={dimUnit} min="0" />
          </div>
          <NumberField
            id="dw-actual"
            label="Actual weight"
            value={actualWeight}
            onChange={setActualWeight}
            suffix={weightUnit}
            min="0"
            hint="Weigh the packed carton, not the product alone."
          />
          <p className="text-[11px] leading-relaxed text-zinc-500">
            Carriers bill the greater of actual weight and dimensional weight. A large, light carton is priced by the
            space it occupies, so shrinking the box is often cheaper than finding a lighter product.
          </p>
        </div>
        <ResultPanel>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-sm font-semibold">Result</div>
            {result.value && (
              <Button type="button" variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={handleCopy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </div>
          {result.error ? (
            <div className="mt-4"><ErrorNote message={result.error} /></div>
          ) : result.value && (
            <>
              <div className="mt-3 font-mono text-4xl font-semibold tabular-nums text-primary-on-dark">
                {format(result.value.billableWeight)} <span className="text-lg text-zinc-400">{weightUnit}</span>
              </div>
              <div className="mt-1 text-[11px] text-zinc-400">
                {result.value.dimensionalGoverns ? 'Dimensional weight governs' : 'Actual weight governs'}
              </div>
              <div className="mt-4">
                <ResultRow label="Carton volume" value={`${format(result.value.volume)} ${dimUnit}3`} />
                <ResultRow label="Dimensional weight" value={`${format(result.value.dimensionalWeight)} ${weightUnit}`} />
                <ResultRow label="Actual weight" value={`${format(toNumber(actualWeight))} ${weightUnit}`} />
                <ResultRow label="Extra billed weight" value={`${format(result.value.difference)} ${weightUnit}`} />
                <ResultRow
                  label="Over actual weight"
                  value={result.value.percentOverActual === null ? '-' : `${format(result.value.percentOverActual)}%`}
                />
                <ResultRow label="Divisor used" value={`${format(result.value.divisor, 0)} ${dimUnit}3/${weightUnit}`} />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Freelance rate
// ==========================================

export const FreelanceRateCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const copy = useCopy(onSaveHistory);
  const [targetIncome, setTargetIncome] = useState('80000');
  const [taxRate, setTaxRate] = useState('30');
  const [expenses, setExpenses] = useState('12000');
  const [hoursPerWeek, setHoursPerWeek] = useState('25');
  const [weeksOff, setWeeksOff] = useState('4');
  const [hoursPerDay, setHoursPerDay] = useState('6');

  const result = useMemo(() => {
    try {
      return {
        value: calculateFreelanceRate({
          targetIncome: toNumber(targetIncome),
          taxRatePct: toNumber(taxRate),
          businessExpenses: toNumber(expenses),
          billableHoursPerWeek: toNumber(hoursPerWeek),
          weeksOff: toNumber(weeksOff),
          hoursPerDay: toNumber(hoursPerDay),
        }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [targetIncome, taxRate, expenses, hoursPerWeek, weeksOff, hoursPerDay]);

  const handleCopy = () => {
    if (!result.value) return;
    void copy(
      `Freelance rate: ${money(result.value.hourlyRate, currency)} per billable hour ` +
        `(${money(result.value.dayRate, currency)} per ${format(toNumber(hoursPerDay))}-hour day; ` +
        `${money(result.value.revenueNeeded, currency)} revenue needed per year).`
    );
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 font-mono text-[11px]">Pricing</Badge>
          <CardTitle>Freelance Rate Calculator</CardTitle>
          <CardDescription>
            Set an hourly rate from the income you want, the tax you owe, and the hours you can actually bill.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setTargetIncome('80000');
            setTaxRate('30');
            setExpenses('12000');
            setHoursPerWeek('25');
            setWeeksOff('4');
            setHoursPerDay('6');
          }}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="fr-income" label="Target take-home income" value={targetIncome} onChange={setTargetIncome} suffix={currency} min="0" hint="After tax, per year" />
            <NumberField id="fr-tax" label="Combined tax set-aside" value={taxRate} onChange={setTaxRate} suffix="%" min="0" hint="Income tax plus self-employment tax" />
            <NumberField id="fr-expenses" label="Business expenses" value={expenses} onChange={setExpenses} suffix={currency} min="0" hint="Per year" />
            <NumberField id="fr-hours" label="Billable hours per week" value={hoursPerWeek} onChange={setHoursPerWeek} suffix="hrs" min="0" hint="Client work only, not admin" />
            <NumberField id="fr-weeks" label="Weeks off per year" value={weeksOff} onChange={setWeeksOff} suffix="wks" min="0" hint="Holiday, sick leave, gaps" />
            <NumberField id="fr-day" label="Length of a billable day" value={hoursPerDay} onChange={setHoursPerDay} suffix="hrs" min="0" />
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            The trap is pricing from a 40-hour week. Only billable hours earn money; admin, sales, and invoicing happen
            inside the same week. The calculator grosses income up for tax and expenses before dividing by billable time.
          </p>
        </div>
        <ResultPanel>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-sm font-semibold">Result</div>
            {result.value && (
              <Button type="button" variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={handleCopy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </div>
          {result.error ? (
            <div className="mt-4"><ErrorNote message={result.error} /></div>
          ) : result.value && (
            <>
              <div className="mt-3 font-mono text-4xl font-semibold tabular-nums text-primary-on-dark">
                {money(result.value.hourlyRate, currency)}
              </div>
              <div className="mt-1 text-[11px] text-zinc-400">per billable hour</div>
              <div className="mt-4">
                <ResultRow label="Day rate" value={money(result.value.dayRate, currency)} />
                <ResultRow label="Revenue per working week" value={money(result.value.weeklyRevenue, currency)} />
                <ResultRow label="Monthly retainer equivalent" value={money(result.value.monthlyRetainer, currency)} />
                <ResultRow label="Revenue needed per year" value={money(result.value.revenueNeeded, currency)} />
                <ResultRow label="Billable hours per year" value={`${format(result.value.billableHoursPerYear, 0)} hrs`} />
                <ResultRow label="Kept per billable hour" value={money(result.value.netPerBillableHour, currency)} hint="After tax and business costs" />
                <ResultRow label="Expenses as revenue share" value={`${format(result.value.expenseSharePct)}%`} />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// EV charging cost
// ==========================================

export const EvChargingCostCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const copy = useCopy(onSaveHistory);
  const [battery, setBattery] = useState('75');
  const [startPct, setStartPct] = useState('20');
  const [endPct, setEndPct] = useState('80');
  const [efficiency, setEfficiency] = useState('3.5');
  const [homePrice, setHomePrice] = useState('0.16');
  const [publicPrice, setPublicPrice] = useState('0.45');
  const [loss, setLoss] = useState('10');
  const [chargerKw, setChargerKw] = useState('7.2');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('mi');

  const result = useMemo(() => {
    try {
      return {
        value: calculateEvCharge({
          batteryKwh: toNumber(battery),
          startPct: toNumber(startPct),
          endPct: toNumber(endPct),
          efficiencyPerKwh: toNumber(efficiency),
          homePricePerKwh: toNumber(homePrice),
          publicPricePerKwh: toNumber(publicPrice),
          chargingLossPct: toNumber(loss),
          chargerKw: toNumber(chargerKw),
        }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [battery, startPct, endPct, efficiency, homePrice, publicPrice, loss, chargerKw]);

  const handleCopy = () => {
    if (!result.value) return;
    void copy(
      `EV charge ${startPct}% to ${endPct}%: ${format(result.value.energyAddedKwh)} kWh added, ` +
        `${money(result.value.homeCost, currency)} at home vs ${money(result.value.publicCost, currency)} public. ` +
        `Range added ${format(result.value.rangeAdded)} ${distanceUnit}.`
    );
  };

  const changeDistanceUnit = (next: DistanceUnit) => {
    if (next === distanceUnit) return;
    const factor = 1.609344;
    setEfficiency((current) => {
      const value = toNumber(current);
      if (!Number.isFinite(value)) return current;
      const converted = next === 'km' ? value * factor : value / factor;
      return String(Number(converted.toFixed(2)));
    });
    setDistanceUnit(next);
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 font-mono text-[11px]">Running costs</Badge>
          <CardTitle>EV Charging Cost Calculator</CardTitle>
          <CardDescription>
            Compare a home charge with a public charger after charging losses, and see the cost per mile or kilometre.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setBattery('75');
            setStartPct('20');
            setEndPct('80');
            setEfficiency('3.5');
            setHomePrice('0.16');
            setPublicPrice('0.45');
            setLoss('10');
            setChargerKw('7.2');
            setDistanceUnit('mi');
          }}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="ev-battery" label="Usable battery capacity" value={battery} onChange={setBattery} suffix="kWh" min="0" />
            <NumberField id="ev-start" label="Starting charge" value={startPct} onChange={setStartPct} suffix="%" min="0" />
            <NumberField id="ev-end" label="Ending charge" value={endPct} onChange={setEndPct} suffix="%" min="0" />
            <NumberField id="ev-efficiency" label="Driving efficiency" value={efficiency} onChange={setEfficiency} suffix={`${distanceUnit}/kWh`} min="0" />
            <NumberField id="ev-home" label="Home electricity price" value={homePrice} onChange={setHomePrice} suffix={`${currency}/kWh`} min="0" />
            <NumberField id="ev-public" label="Public charging price" value={publicPrice} onChange={setPublicPrice} suffix={`${currency}/kWh`} min="0" />
            <NumberField id="ev-loss" label="Charging loss" value={loss} onChange={setLoss} suffix="%" min="0" hint="Energy lost as heat" />
            <NumberField id="ev-kw" label="Charger power" value={chargerKw} onChange={setChargerKw} suffix="kW" min="0" />
          </div>
          <SelectField id="ev-unit" label="Distance unit" value={distanceUnit} onChange={(value) => changeDistanceUnit(value as DistanceUnit)}>
            <option value="mi">Miles</option>
            <option value="km">Kilometres</option>
          </SelectField>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            Prices are yours to enter: electricity tariffs and public charging networks vary by region and by time of
            day. The 10% loss default is a planning assumption, not a measurement of your car.
          </p>
        </div>
        <ResultPanel>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-sm font-semibold">Result</div>
            {result.value && (
              <Button type="button" variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={handleCopy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </div>
          {result.error ? (
            <div className="mt-4"><ErrorNote message={result.error} /></div>
          ) : result.value && (
            <>
              <div className="mt-3 font-mono text-3xl font-semibold tabular-nums text-primary-on-dark">
                {money(result.value.homeCost, currency)}
              </div>
              <div className="mt-1 text-[11px] text-zinc-400">home charge for this session</div>
              <div className="mt-4">
                <ResultRow label="Public charger cost" value={money(result.value.publicCost, currency)} />
                <ResultRow label="Public premium" value={money(result.value.publicPremium, currency)} />
                <ResultRow label="Energy added to battery" value={`${format(result.value.energyAddedKwh)} kWh`} />
                <ResultRow label="Grid energy drawn" value={`${format(result.value.gridEnergyKwh)} kWh`} hint={`${format(result.value.lossKwh)} kWh lost`} />
                <ResultRow label={`Range added`} value={`${format(result.value.rangeAdded)} ${distanceUnit}`} />
                <ResultRow label={`Cost per ${distanceUnit} (home)`} value={money(result.value.costPerDistanceHome, currency, 3)} />
                <ResultRow label={`Cost per ${distanceUnit} (public)`} value={money(result.value.costPerDistancePublic, currency, 3)} />
                <ResultRow label="Time at charger power" value={`${format(result.value.chargingMinutes, 0)} min`} />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Trip cost
// ==========================================

export const TripCostCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const copy = useCopy(onSaveHistory);
  const [unit, setUnit] = useState<DistanceUnit>('mi');
  const [distance, setDistance] = useState('250');
  const [roundTrip, setRoundTrip] = useState(true);
  const [efficiency, setEfficiency] = useState('25');
  const [fuelPrice, setFuelPrice] = useState('3.50');
  const [tolls, setTolls] = useState('30');
  const [parking, setParking] = useState('12');
  const [days, setDays] = useState('3');
  const [lodging, setLodging] = useState('120');
  const [nights, setNights] = useState('2');
  const [food, setFood] = useState('40');
  const [travellers, setTravellers] = useState('3');
  const [other, setOther] = useState('50');

  const efficiencyUnit: TripEfficiencyUnit = unit === 'mi' ? 'mpg' : 'l-per-100km';
  const distanceLabel = unit === 'mi' ? 'miles' : 'km';
  const fuelLabel = unit === 'mi' ? `${currency}/gal` : `${currency}/L`;
  const efficiencyLabel = unit === 'mi' ? 'mpg' : 'L/100km';

  const changeUnit = (next: DistanceUnit) => {
    if (next === unit) return;
    setUnit(next);
    if (next === 'km') {
      setDistance('400');
      setEfficiency('7.5');
      setFuelPrice('1.60');
    } else {
      setDistance('250');
      setEfficiency('25');
      setFuelPrice('3.50');
    }
  };

  const result = useMemo(() => {
    try {
      return {
        value: calculateTripCost({
          oneWayDistance: toNumber(distance),
          roundTrip,
          efficiency: toNumber(efficiency),
          fuelPrice: toNumber(fuelPrice),
          efficiencyUnit,
          tolls: toNumber(tolls),
          parkingPerDay: toNumber(parking),
          days: toNumber(days),
          lodgingPerNight: toNumber(lodging),
          nights: toNumber(nights),
          foodPerDay: toNumber(food),
          travellers: toNumber(travellers),
          other: toNumber(other),
        }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [distance, roundTrip, efficiency, fuelPrice, efficiencyUnit, tolls, parking, days, lodging, nights, food, travellers, other]);

  const handleCopy = () => {
    if (!result.value) return;
    void copy(
      `Trip cost: ${money(result.value.total, currency)} total for ${format(result.value.distance)} ${distanceLabel}; ` +
        `${money(result.value.perPerson, currency)} per person. Fuel ${money(result.value.fuelCost, currency)}.`
    );
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 font-mono text-[11px]">Travel budget</Badge>
          <CardTitle>Trip Cost Calculator</CardTitle>
          <CardDescription>
            Add fuel, tolls, parking, lodging, and food into one trip total, then split it per person.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setUnit('mi');
            setDistance('250');
            setRoundTrip(true);
            setEfficiency('25');
            setFuelPrice('3.50');
            setTolls('30');
            setParking('12');
            setDays('3');
            setLodging('120');
            setNights('2');
            setFood('40');
            setTravellers('3');
            setOther('50');
          }}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <SelectField id="trip-unit" label="Units" value={unit} onChange={(value) => changeUnit(value as DistanceUnit)}>
            <option value="mi">Miles and gallons (US)</option>
            <option value="km">Kilometres and litres (metric)</option>
          </SelectField>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="trip-distance" label="One-way distance" value={distance} onChange={setDistance} suffix={distanceLabel} min="0" />
            <NumberField id="trip-efficiency" label="Fuel efficiency" value={efficiency} onChange={setEfficiency} suffix={efficiencyLabel} min="0" />
            <NumberField id="trip-fuel" label="Fuel price" value={fuelPrice} onChange={setFuelPrice} suffix={fuelLabel} min="0" />
            <div className="flex items-end pb-2">
              <Toggle id="trip-round" label="Round trip (double the distance)" checked={roundTrip} onChange={setRoundTrip} />
            </div>
            <NumberField id="trip-tolls" label="Tolls (whole trip)" value={tolls} onChange={setTolls} suffix={currency} min="0" />
            <NumberField id="trip-parking" label="Parking per day" value={parking} onChange={setParking} suffix={currency} min="0" />
            <NumberField id="trip-days" label="Days" value={days} onChange={setDays} suffix="days" min="0" />
            <NumberField id="trip-lodging" label="Lodging per night" value={lodging} onChange={setLodging} suffix={currency} min="0" />
            <NumberField id="trip-nights" label="Nights" value={nights} onChange={setNights} suffix="nights" min="0" />
            <NumberField id="trip-food" label="Food per person per day" value={food} onChange={setFood} suffix={currency} min="0" />
            <NumberField id="trip-travellers" label="Travellers" value={travellers} onChange={setTravellers} suffix="people" min="1" step="1" />
            <NumberField id="trip-other" label="Other costs" value={other} onChange={setOther} suffix={currency} min="0" hint="Parking passes, entry fees, pet care" />
          </div>
        </div>
        <ResultPanel>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-sm font-semibold">Result</div>
            {result.value && (
              <Button type="button" variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={handleCopy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </div>
          {result.error ? (
            <div className="mt-4"><ErrorNote message={result.error} /></div>
          ) : result.value && (
            <>
              <div className="mt-3 font-mono text-3xl font-semibold tabular-nums text-primary-on-dark">
                {money(result.value.total, currency)}
              </div>
              <div className="mt-1 text-[11px] text-zinc-400">
                {money(result.value.perPerson, currency)} per person over {format(result.value.distance)} {distanceLabel}
              </div>
              <div className="mt-4">
                <ResultRow label="Fuel" value={money(result.value.fuelCost, currency)} hint={`${format(result.value.fuelVolume)} ${unit === 'mi' ? 'gal' : 'L'}`} />
                <ResultRow label="Tolls and extras" value={money(result.value.otherCost, currency)} />
                <ResultRow label="Parking" value={money(result.value.parkingCost, currency)} />
                <ResultRow label="Lodging" value={money(result.value.lodgingCost, currency)} />
                <ResultRow label="Food" value={money(result.value.foodCost, currency)} />
                <ResultRow label={`Cost per ${unit === 'mi' ? 'mile' : 'km'}`} value={money(result.value.perDistance, currency, 3)} />
                <ResultRow label="Fuel share of total" value={`${format(result.value.fuelSharePct)}%`} />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// BTU / room cooling load
// ==========================================

export const BtuCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [area, setArea] = useState('300');
  const [ceiling, setCeiling] = useState('8');
  const [insulation, setInsulation] = useState<InsulationLevel>('average');
  const [sun, setSun] = useState<SunExposure>('sunny');
  const [occupants, setOccupants] = useState('2');
  const [kitchen, setKitchen] = useState(false);

  const result = useMemo(() => {
    try {
      return {
        value: calculateBtu({
          areaSqFt: toNumber(area),
          ceilingHeightFt: toNumber(ceiling),
          insulation,
          sun,
          occupants: toNumber(occupants),
          kitchen,
        }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [area, ceiling, insulation, sun, occupants, kitchen]);

  const handleCopy = () => {
    if (!result.value) return;
    void copy(
      `Cooling load: ${format(result.value.btuPerHour, 0)} BTU/h (${format(result.value.tons)} tons). ` +
        `Look for a unit rated ${format(result.value.recommendedBtu, 0)} BTU/h or more.`
    );
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 font-mono text-[11px]">Home comfort</Badge>
          <CardTitle>BTU Calculator</CardTitle>
          <CardDescription>
            Estimate the cooling load of a room and translate it into BTU, tons, and a common air-conditioner size.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setArea('300');
            setCeiling('8');
            setInsulation('average');
            setSun('sunny');
            setOccupants('2');
            setKitchen(false);
          }}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="btu-area" label="Room area" value={area} onChange={setArea} suffix="sq ft" min="0" />
            <NumberField id="btu-ceiling" label="Ceiling height" value={ceiling} onChange={setCeiling} suffix="ft" min="0" />
            <SelectField id="btu-insulation" label="Insulation" value={insulation} onChange={(value) => setInsulation(value as InsulationLevel)}>
              <option value="well">Well insulated</option>
              <option value="average">Average</option>
              <option value="poor">Poor or unknown</option>
            </SelectField>
            <SelectField id="btu-sun" label="Sun exposure" value={sun} onChange={(value) => setSun(value as SunExposure)}>
              <option value="shaded">Mostly shaded</option>
              <option value="average">Average</option>
              <option value="sunny">Sunny, west or south facing</option>
            </SelectField>
            <NumberField id="btu-occupants" label="People in the room" value={occupants} onChange={setOccupants} suffix="people" min="0" step="1" hint="Above two, each adds 600 BTU/h" />
            <div className="flex items-end pb-2">
              <Toggle id="btu-kitchen" label="Includes a kitchen (adds 4,000 BTU/h)" checked={kitchen} onChange={setKitchen} />
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            A planning estimate, not a Manual J load calculation. Whole-house systems, vaulted ceilings, large glass
            areas, and duct losses need a professional room-by-room assessment.
          </p>
        </div>
        <ResultPanel>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-sm font-semibold">Result</div>
            {result.value && (
              <Button type="button" variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={handleCopy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </div>
          {result.error ? (
            <div className="mt-4"><ErrorNote message={result.error} /></div>
          ) : result.value && (
            <>
              <div className="mt-3 font-mono text-4xl font-semibold tabular-nums text-primary-on-dark">
                {format(result.value.btuPerHour, 0)} <span className="text-lg text-zinc-400">BTU/h</span>
              </div>
              <div className="mt-1 text-[11px] text-zinc-400">
                Look for a unit rated {format(result.value.recommendedBtu, 0)} BTU/h or more
              </div>
              <div className="mt-4">
                <ResultRow label="Cooling capacity" value={`${format(result.value.tons)} tons`} />
                <ResultRow label="In kilowatts" value={`${format(result.value.kw)} kW`} />
                <ResultRow label="Common unit size" value={`${format(result.value.recommendedBtu, 0)} BTU/h`} />
                <ResultRow label="Area covered" value={`${format(toNumber(area), 0)} sq ft`} />
              </div>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Insulation quantity
// ==========================================

export const InsulationCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const copy = useCopy(onSaveHistory);
  const [area, setArea] = useState('800');
  const [openings, setOpenings] = useState('100');
  const [targetR, setTargetR] = useState('38');
  const [existingR, setExistingR] = useState('13');
  const [materialId, setMaterialId] = useState<InsulationMaterialId>('fiberglass-batt');
  const [coverage, setCoverage] = useState('88');
  const [waste, setWaste] = useState('10');
  const [price, setPrice] = useState('55');

  const material = INSULATION_MATERIALS.find((item) => item.id === materialId);

  const result = useMemo(() => {
    try {
      return {
        value: calculateInsulation({
          area: toNumber(area),
          openings: toNumber(openings),
          targetR: toNumber(targetR),
          existingR: toNumber(existingR),
          materialId,
          coveragePerPackage: toNumber(coverage),
          wastePct: toNumber(waste),
          pricePerPackage: toNumber(price),
        }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [area, openings, targetR, existingR, materialId, coverage, waste, price]);

  const handleCopy = () => {
    if (!result.value) return;
    void copy(
      result.value.meetsTarget
        ? `Insulation: the existing R-${format(toNumber(existingR), 0)} already meets the R-${format(toNumber(targetR), 0)} target.`
        : `Insulation: ${result.value.packages} packages for ${format(result.value.netArea, 0)} sq ft, ` +
            `adding R-${format(result.value.additionalR, 0)} at about ${format(result.value.thicknessIn, 1)} in.`
    );
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 font-mono text-[11px]">Home improvement</Badge>
          <CardTitle>Insulation Calculator</CardTitle>
          <CardDescription>
            Find the extra R-value, installed thickness, and number of packages a wall or ceiling needs.
          </CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setArea('800');
            setOpenings('100');
            setTargetR('38');
            setExistingR('13');
            setMaterialId('fiberglass-batt');
            setCoverage('88');
            setWaste('10');
            setPrice('55');
          }}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id="ins-area" label="Gross area" value={area} onChange={setArea} suffix="sq ft" min="0" />
            <NumberField id="ins-openings" label="Windows and doors" value={openings} onChange={setOpenings} suffix="sq ft" min="0" hint="Subtracted from the gross area" />
            <NumberField id="ins-target" label="Target R-value" value={targetR} onChange={setTargetR} suffix="R" min="0" />
            <NumberField id="ins-existing" label="Existing R-value" value={existingR} onChange={setExistingR} suffix="R" min="0" hint="Use 0 for an empty cavity" />
            <SelectField
              id="ins-material"
              label="Material"
              value={materialId}
              onChange={(value) => setMaterialId(value as InsulationMaterialId)}
              hint={material?.note}
            >
              {INSULATION_MATERIALS.map((item) => (
                <option key={item.id} value={item.id}>{item.label} ({item.rPerInch} R/in)</option>
              ))}
            </SelectField>
            <NumberField id="ins-coverage" label="Coverage per package" value={coverage} onChange={setCoverage} suffix="sq ft" min="0" hint="Printed on the bag or board label" />
            <NumberField id="ins-waste" label="Waste allowance" value={waste} onChange={setWaste} suffix="%" min="0" hint="Cuts and offcuts; 10% is typical" />
            <NumberField id="ins-price" label="Price per package" value={price} onChange={setPrice} suffix={currency} min="0" />
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            R-values are nominal and vary by product, density, and age. Coverage per package differs by brand and
            thickness, so replace the default with the figure on the label before buying.
          </p>
        </div>
        <ResultPanel>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-sm font-semibold">Result</div>
            {result.value && (
              <Button type="button" variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" onClick={handleCopy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </div>
          {result.error ? (
            <div className="mt-4"><ErrorNote message={result.error} /></div>
          ) : result.value && (
            <>
              {result.value.meetsTarget ? (
                <>
                  <div className="mt-3 font-mono text-2xl font-semibold text-brand-on-dark">Already meets target</div>
                  <div className="mt-1 text-[11px] text-zinc-400">
                    Existing R-{format(toNumber(existingR), 0)} against a target of R-{format(toNumber(targetR), 0)}.
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-3 font-mono text-4xl font-semibold tabular-nums text-primary-on-dark">
                    {result.value.packages} <span className="text-lg text-zinc-400">packages</span>
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-400">
                    adds R-{format(result.value.additionalR, 0)} over {format(result.value.netArea, 0)} sq ft
                  </div>
                </>
              )}
              <div className="mt-4">
                <ResultRow label="Material cost" value={money(result.value.cost, currency)} />
                <ResultRow label="Installed thickness" value={`${format(result.value.thicknessIn, 1)} in`} hint={material?.label} />
                <ResultRow label="Total R-value" value={`R-${format(result.value.totalR, 0)}`} />
                <ResultRow label="Net area" value={`${format(result.value.netArea, 0)} sq ft`} />
                <ResultRow label="Area covered by packages" value={`${format(result.value.coveredArea, 0)} sq ft`} />
                <ResultRow label="Left over" value={`${format(result.value.leftoverArea, 0)} sq ft`} />
              </div>
              {result.value.thicknessIn > 3.5 && result.value.thicknessIn <= 5.5 && (
                <p className="mt-3 text-[11px] text-amber-300">
                  Thicker than a 2x4 cavity (3.5 in). Check the depth before choosing batts.
                </p>
              )}
              {result.value.thicknessIn > 5.5 && (
                <p className="mt-3 text-[11px] text-amber-300">
                  Thicker than a 2x6 cavity (5.5 in). Use a deeper assembly or a higher-R material.
                </p>
              )}
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

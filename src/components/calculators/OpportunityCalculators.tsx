import React, { useMemo, useState } from 'react';
import { Copy, RotateCcw } from 'lucide-react';
import {
  calculateBreakEven,
  calculateFraction,
  calculateWeeklyHours,
  compareUnitPrices,
  type FractionOperation,
  type PriceUnit,
  type ShiftInput,
  type UnitPriceItem,
} from '../../lib/opportunityCalculations';
import { useCurrency } from '../../lib/currency';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to calculate with these values.';
}

async function copySummary(text: string, toast: (message: string, kind?: 'success' | 'info' | 'warning') => void): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    toast('Result copied to clipboard');
    return true;
  } catch {
    toast('Clipboard access is unavailable. Select and copy the result manually.', 'warning');
    return false;
  }
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
      {children}
    </div>
  );
}

const UNIT_OPTIONS: Array<{ value: PriceUnit; label: string }> = [
  { value: 'g', label: 'grams (g)' },
  { value: 'kg', label: 'kilograms (kg)' },
  { value: 'oz', label: 'ounces (oz)' },
  { value: 'lb', label: 'pounds (lb)' },
  { value: 'ml', label: 'millilitres (ml)' },
  { value: 'l', label: 'litres (l)' },
  { value: 'count', label: 'items' },
];

const DEFAULT_PRODUCTS: UnitPriceItem[] = [
  { name: 'Product A', price: 4, quantity: 500, unit: 'g' },
  { name: 'Product B', price: 5.25, quantity: 750, unit: 'g' },
  { name: 'Product C', price: 6.5, quantity: 1000, unit: 'g' },
];

type UnitPriceFormItem = Omit<UnitPriceItem, 'price' | 'quantity'> & {
  price: string;
  quantity: string;
};

const DEFAULT_PRODUCT_FORM: UnitPriceFormItem[] = DEFAULT_PRODUCTS.map((item) => ({
  ...item,
  price: String(item.price),
  quantity: String(item.quantity),
}));

export const PricePerUnitCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();
  const [products, setProducts] = useState(DEFAULT_PRODUCT_FORM);
  const result = useMemo(() => {
    try {
      const numericProducts = products.map((item) => ({
        ...item,
        price: item.price.trim() === '' ? Number.NaN : Number(item.price),
        quantity: item.quantity.trim() === '' ? Number.NaN : Number(item.quantity),
      }));
      return { value: compareUnitPrices(numericProducts), error: '' };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [products]);

  const updateProduct = (index: number, patch: Partial<UnitPriceFormItem>) => {
    setProducts((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));
  };

  const handleCopy = async () => {
    if (!result.value) return;
    const bestItem = result.value.items[result.value.bestIndex];
    const text = `Price per unit comparison: ${result.value.items
      .map((item, index) => `${item.name || `Product ${index + 1}`}: ${currency}${item.pricePerDisplayUnit.toFixed(2)} per ${result.value!.displayUnit}`)
      .join('; ')}. Best value: ${bestItem.name || `Product ${result.value.bestIndex + 1}`}.`;
    if (await copySummary(text, toast)) onSaveHistory?.(text);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Shopping comparison</Badge>
          <CardTitle>Price per Unit Calculator</CardTitle>
          <CardDescription>Compare package sizes using a consistent price per 100 g, 100 ml, or item.</CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setProducts(DEFAULT_PRODUCT_FORM)}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {products.map((item, index) => (
            <section key={index} className="grid gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor={`unit-name-${index}`}>Product {String.fromCharCode(65 + index)} name</Label>
                <Input id={`unit-name-${index}`} value={item.name} onChange={(e) => updateProduct(index, { name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`unit-price-${index}`}>Package price ({currency})</Label>
                <Input id={`unit-price-${index}`} type="number" min="0" step="any" value={item.price} onChange={(e) => updateProduct(index, { price: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`unit-quantity-${index}`}>Package quantity</Label>
                <Input id={`unit-quantity-${index}`} type="number" min="0" step="any" value={item.quantity} onChange={(e) => updateProduct(index, { quantity: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`unit-kind-${index}`}>Quantity unit</Label>
                <select
                  id={`unit-kind-${index}`}
                  value={item.unit}
                  onChange={(e) => updateProduct(index, { unit: e.target.value as PriceUnit })}
                  className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                >
                  {UNIT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
            </section>
          ))}
        </div>
        <ResultPanel>
          <div className="mb-4 text-sm font-semibold">Normalized unit prices</div>
          {result.error ? (
            <p role="alert" className="text-sm text-amber-300">{result.error}</p>
          ) : result.value && (
            <>
              <p className="mb-4 text-xs text-zinc-400">Prices shown per {result.value.displayUnit}.</p>
              <ol className="space-y-3">
                {result.value.items.map((item, index) => (
                  <li key={index} className="flex justify-between gap-3 border-b border-zinc-800 pb-2 text-sm">
                    <span>{item.name || `Product ${index + 1}`}{index === result.value!.bestIndex && <span className="ml-2 text-emerald-400">Best value</span>}</span>
                    <strong className="font-mono">{currency}{item.pricePerDisplayUnit.toFixed(2)}</strong>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-zinc-300">
                Best option costs {result.value.savingPercent.toFixed(1)}% less per unit than the most expensive option.
              </p>
              <Button type="button" variant="outline" size="sm" onClick={handleCopy} className="mt-4 w-full">
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy comparison
              </Button>
            </>
          )}
          <p className="mt-4 text-[11px] text-zinc-500">Compare like with like. Weight, volume, and item counts cannot be compared across different unit families.</p>
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

export const BreakEvenCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();
  const [fixedCosts, setFixedCosts] = useState('10000');
  const [sellingPrice, setSellingPrice] = useState('25');
  const [variableCost, setVariableCost] = useState('15');
  const [unitsSold, setUnitsSold] = useState('1500');
  const result = useMemo(() => {
    try {
      return {
        value: calculateBreakEven({
          fixedCosts: Number(fixedCosts),
          sellingPrice: Number(sellingPrice),
          variableCost: Number(variableCost),
          unitsSold: unitsSold.trim() === '' ? undefined : Number(unitsSold),
        }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [fixedCosts, sellingPrice, variableCost, unitsSold]);

  const copyResult = async () => {
    if (!result.value) return;
    const text = `Break-even: ${result.value.wholeUnits} units and ${currency}${result.value.breakEvenRevenue.toFixed(2)} revenue. Contribution margin: ${result.value.contributionMarginPercent.toFixed(1)}%.`;
    if (await copySummary(text, toast)) onSaveHistory?.(text);
  };

  const fields = [
    { id: 'break-fixed', label: 'Fixed costs for the period', value: fixedCosts, set: setFixedCosts },
    { id: 'break-price', label: 'Selling price per unit', value: sellingPrice, set: setSellingPrice },
    { id: 'break-variable', label: 'Variable cost per unit', value: variableCost, set: setVariableCost },
    { id: 'break-sold', label: 'Units already sold (optional context)', value: unitsSold, set: setUnitsSold },
  ];

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Small business finance</Badge>
          <CardTitle>Break-Even Calculator</CardTitle>
          <CardDescription>Estimate the unit sales and revenue needed to cover fixed costs.</CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => {
          setFixedCosts('10000'); setSellingPrice('25'); setVariableCost('15'); setUnitsSold('1500');
        }}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-2">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-1.5">
              <Label htmlFor={field.id}>{field.label}{index < 3 ? ` (${currency})` : ''}</Label>
              <Input id={field.id} type="number" min="0" step="any" value={field.value} onChange={(e) => field.set(e.target.value)} />
            </div>
          ))}
        </div>
        <ResultPanel>
          {result.error ? (
            <p role="alert" className="text-sm text-amber-300">{result.error}</p>
          ) : result.value && (
            <>
              <p className="text-xs uppercase tracking-wide text-zinc-400">Break-even target</p>
              <p className="my-2 text-3xl font-bold font-mono">{result.value.wholeUnits.toLocaleString()} units</p>
              <p className="mb-5 text-sm text-zinc-300">At least {currency}{result.value.breakEvenRevenue.toFixed(2)} in revenue at this selling price.</p>
              <dl className="space-y-2 border-t border-zinc-800 pt-4 text-sm">
                <div className="flex justify-between gap-3"><dt>Contribution per unit</dt><dd className="font-mono">{currency}{result.value.contributionPerUnit.toFixed(2)}</dd></div>
                <div className="flex justify-between gap-3"><dt>Contribution margin</dt><dd className="font-mono">{result.value.contributionMarginPercent.toFixed(1)}%</dd></div>
                {result.value.marginOfSafetyUnits !== null && (
                  <div className="flex justify-between gap-3"><dt>Units above / below break-even</dt><dd className="font-mono">{result.value.marginOfSafetyUnits.toLocaleString()}</dd></div>
                )}
              </dl>
              <Button type="button" variant="outline" size="sm" onClick={copyResult} className="mt-4 w-full">
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy result
              </Button>
            </>
          )}
          <p className="mt-4 text-[11px] text-zinc-500">This simple model assumes one product, constant costs, and no taxes, discounts, or capacity limits.</p>
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

export const FractionCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [aNumerator, setANumerator] = useState('1');
  const [aDenominator, setADenominator] = useState('2');
  const [bNumerator, setBNumerator] = useState('1');
  const [bDenominator, setBDenominator] = useState('3');
  const [operation, setOperation] = useState<FractionOperation>('add');
  const result = useMemo(() => {
    try {
      return {
        value: calculateFraction(
          Number(aNumerator), Number(aDenominator), Number(bNumerator), Number(bDenominator), operation
        ),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [aNumerator, aDenominator, bNumerator, bDenominator, operation]);

  const copyResult = async () => {
    if (!result.value) return;
    const text = `${aNumerator}/${aDenominator} ${operation} ${bNumerator}/${bDenominator} = ${result.value.numerator}/${result.value.denominator} (${result.value.decimal})`;
    if (await copySummary(text, toast)) onSaveHistory?.(text);
  };

  const fractionFields = [
    { id: 'fraction-a-num', label: 'First numerator', value: aNumerator, set: setANumerator },
    { id: 'fraction-a-den', label: 'First denominator', value: aDenominator, set: setADenominator },
    { id: 'fraction-b-num', label: 'Second numerator', value: bNumerator, set: setBNumerator },
    { id: 'fraction-b-den', label: 'Second denominator', value: bDenominator, set: setBDenominator },
  ];

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Fraction arithmetic</Badge>
          <CardTitle>Fraction Calculator</CardTitle>
          <CardDescription>Add, subtract, multiply, or divide fractions and see the simplification steps.</CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => {
          setANumerator('1'); setADenominator('2'); setBNumerator('1'); setBDenominator('3'); setOperation('add');
        }}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-2">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {fractionFields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input id={field.id} type="number" step="1" value={field.value} onChange={(e) => field.set(e.target.value)} />
            </div>
          ))}
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="fraction-operation">Operation</Label>
            <select
              id="fraction-operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value as FractionOperation)}
              className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              <option value="add">Add (+)</option><option value="subtract">Subtract (−)</option>
              <option value="multiply">Multiply (×)</option><option value="divide">Divide (÷)</option>
            </select>
          </div>
        </div>
        <ResultPanel>
          {result.error ? (
            <p role="alert" className="text-sm text-amber-300">{result.error}</p>
          ) : result.value && (
            <>
              <p className="text-xs uppercase tracking-wide text-zinc-400">Simplified result</p>
              <p className="my-2 text-3xl font-bold font-mono">{result.value.numerator}/{result.value.denominator}</p>
              <p className="mb-4 text-sm text-zinc-300">Decimal: {result.value.decimal.toLocaleString(undefined, { maximumFractionDigits: 8 })}</p>
              <div className="rounded-lg bg-zinc-900 p-3">
                <p className="mb-1 text-xs font-semibold text-zinc-300">Working</p>
                <p className="break-words font-mono text-xs text-zinc-400">{result.value.steps}</p>
                <p className="mt-2 font-mono text-xs text-zinc-400">Reduce numerator and denominator by their greatest common divisor.</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={copyResult} className="mt-4 w-full">
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy result
              </Button>
            </>
          )}
          <p className="mt-4 text-[11px] text-zinc-500">Enter whole numbers. Fractions are kept exact; very large intermediate values are rejected rather than rounded.</p>
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DEFAULT_SHIFTS: ShiftInput[] = DAYS.map((_, index) =>
  index < 5 ? { start: '09:00', end: '17:00', breakMinutes: 30 } : { start: '', end: '', breakMinutes: 0 }
);

export const TimesheetCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();
  const [shifts, setShifts] = useState(DEFAULT_SHIFTS);
  const [hourlyRate, setHourlyRate] = useState('20');
  const [overtimeThreshold, setOvertimeThreshold] = useState('40');
  const [overtimeMultiplier, setOvertimeMultiplier] = useState('1.5');
  const result = useMemo(() => {
    try {
      return {
        value: calculateWeeklyHours(shifts, Number(hourlyRate), Number(overtimeThreshold), Number(overtimeMultiplier)),
        error: '',
      };
    } catch (error) {
      return { value: null, error: errorMessage(error) };
    }
  }, [shifts, hourlyRate, overtimeThreshold, overtimeMultiplier]);

  const updateShift = (index: number, patch: Partial<ShiftInput>) => {
    setShifts((current) => current.map((shift, i) => i === index ? { ...shift, ...patch } : shift));
  };

  const copyResult = async () => {
    if (!result.value) return;
    const text = `Weekly hours: ${result.value.totalHours.toFixed(2)} (regular ${result.value.regularHours.toFixed(2)}, overtime ${result.value.overtimeHours.toFixed(2)}); estimated gross pay ${currency}${result.value.grossPay.toFixed(2)}.`;
    if (await copySummary(text, toast)) onSaveHistory?.(text);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <Badge variant="outline" className="mb-2 text-[11px] font-mono">Weekly payroll planning</Badge>
          <CardTitle>Weekly Timesheet Calculator</CardTitle>
          <CardDescription>Total shift hours, weekly overtime, and estimated gross pay for up to seven days.</CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => {
          setShifts(DEFAULT_SHIFTS); setHourlyRate('20'); setOvertimeThreshold('40'); setOvertimeMultiplier('1.5');
        }}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <div className="grid gap-3">
          <div className="hidden grid-cols-[0.8fr_1fr_1fr_1fr] gap-3 px-1 text-xs font-semibold text-zinc-500 sm:grid">
            <span>Day</span><span>Start</span><span>End</span><span>Unpaid break (min)</span>
          </div>
          {shifts.map((shift, index) => (
            <div key={DAYS[index]} className="grid gap-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800 sm:grid-cols-[0.8fr_1fr_1fr_1fr] sm:items-center sm:border-0 sm:p-0">
              <Label className="text-xs font-semibold">{DAYS[index]}</Label>
              <div className="space-y-1 sm:space-y-0"><Label htmlFor={`shift-start-${index}`} className="text-[10px] text-zinc-500 sm:sr-only">Start time, {DAYS[index]}</Label><Input id={`shift-start-${index}`} type="time" value={shift.start} onChange={(e) => updateShift(index, { start: e.target.value })} /></div>
              <div className="space-y-1 sm:space-y-0"><Label htmlFor={`shift-end-${index}`} className="text-[10px] text-zinc-500 sm:sr-only">End time, {DAYS[index]}</Label><Input id={`shift-end-${index}`} type="time" value={shift.end} onChange={(e) => updateShift(index, { end: e.target.value })} /></div>
              <div className="space-y-1 sm:space-y-0"><Label htmlFor={`shift-break-${index}`} className="text-[10px] text-zinc-500 sm:sr-only">Unpaid break minutes, {DAYS[index]}</Label><Input id={`shift-break-${index}`} type="number" min="0" step="1" value={shift.breakMinutes} onChange={(e) => updateShift(index, { breakMinutes: Number(e.target.value) })} /></div>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5"><Label htmlFor="timesheet-rate">Hourly rate ({currency})</Label><Input id="timesheet-rate" type="number" min="0" step="any" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="timesheet-threshold">Weekly overtime threshold (hours)</Label><Input id="timesheet-threshold" type="number" min="0" step="any" value={overtimeThreshold} onChange={(e) => setOvertimeThreshold(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="timesheet-multiplier">Overtime pay multiplier</Label><Input id="timesheet-multiplier" type="number" min="1" step="any" value={overtimeMultiplier} onChange={(e) => setOvertimeMultiplier(e.target.value)} /></div>
        </div>
        <ResultPanel>
          {result.error ? (
            <p role="alert" className="text-sm text-amber-300">{result.error}</p>
          ) : result.value && (
            <div className="grid gap-4 sm:grid-cols-4">
              <div><p className="text-xs text-zinc-400">Weekly total</p><p className="mt-1 text-xl font-bold font-mono">{result.value.totalHours.toFixed(2)} h</p></div>
              <div><p className="text-xs text-zinc-400">Regular hours</p><p className="mt-1 text-xl font-bold font-mono">{result.value.regularHours.toFixed(2)} h</p></div>
              <div><p className="text-xs text-zinc-400">Overtime hours</p><p className="mt-1 text-xl font-bold font-mono">{result.value.overtimeHours.toFixed(2)} h</p></div>
              <div><p className="text-xs text-zinc-400">Estimated gross pay</p><p className="mt-1 text-xl font-bold font-mono">{currency}{result.value.grossPay.toFixed(2)}</p></div>
            </div>
          )}
          <Button type="button" variant="outline" size="sm" onClick={copyResult} disabled={!result.value} className="mt-4">
            <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
          </Button>
          <p className="mt-3 text-[11px] text-zinc-500">Overnight shifts roll into the next day. Overtime is modeled weekly only; local employment rules may use different thresholds or daily calculations.</p>
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

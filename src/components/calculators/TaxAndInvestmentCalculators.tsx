import React, { useMemo, useState } from 'react';
import { ArrowRightLeft, Copy, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  calculateInflation,
  calculateIrr,
  calculateNpv,
  parseCashFlowList,
} from '../../lib/financialMath';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

function format(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en', { maximumFractionDigits: digits }).format(value);
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">{children}</div>;
}

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 'any',
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={suffix ? 'pr-10' : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function toNumber(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value);
}

function useCopy(onSaveHistory?: (summary: string) => void) {
  const { toast } = useToast();
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Result copied to clipboard');
    } catch {
      toast('Clipboard unavailable — select and copy manually.', 'warning');
    }
    onSaveHistory?.(text);
  };
}

const SEGMENT_BASE =
  'flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600';
const SEGMENT_ON = 'border-emerald-600 bg-emerald-600 text-white';
const SEGMENT_OFF =
  'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300';

// ==========================================
// VAT
// ==========================================

type VatMode = 'add' | 'remove';

export const VatCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [mode, setMode] = useState<VatMode>('add');
  const [amount, setAmount] = useState('1000');
  const [rate, setRate] = useState('15');

  const result = useMemo(() => {
    const value = toNumber(amount);
    const vatRate = toNumber(rate);
    if (!Number.isFinite(value) || value < 0) {
      return { value: null, error: 'Enter an amount of zero or more.' };
    }
    if (!Number.isFinite(vatRate) || vatRate <= -100) {
      return { value: null, error: 'Enter a VAT rate greater than -100%.' };
    }

    const multiplier = 1 + vatRate / 100;
    const net = mode === 'add' ? value : value / multiplier;
    const gross = mode === 'add' ? value * multiplier : value;
    const vat = gross - net;

    return {
      value: {
        net,
        gross,
        vat,
        vatFraction: (vatRate / (100 + vatRate)) * 100,
        rate: vatRate,
      },
      error: '',
    };
  }, [amount, rate, mode]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Tax</Badge>
        <CardTitle>VAT Calculator</CardTitle>
        <CardDescription>Add VAT to a net price or strip VAT out of a gross price, using any rate you set.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Direction</Label>
            <div className="flex gap-2" role="group" aria-label="VAT direction">
              <button
                type="button"
                aria-pressed={mode === 'add'}
                onClick={() => setMode('add')}
                className={`${SEGMENT_BASE} ${mode === 'add' ? SEGMENT_ON : SEGMENT_OFF}`}
              >
                Add VAT to net
              </button>
              <button
                type="button"
                aria-pressed={mode === 'remove'}
                onClick={() => setMode('remove')}
                className={`${SEGMENT_BASE} ${mode === 'remove' ? SEGMENT_ON : SEGMENT_OFF}`}
              >
                Remove VAT from gross
              </button>
            </div>
          </div>

          <NumberField
            id="vat-amount"
            label={mode === 'add' ? 'Net amount (excluding VAT)' : 'Gross amount (including VAT)'}
            value={amount}
            onChange={setAmount}
            step="0.01"
            hint={mode === 'add' ? 'The price before tax is added.' : 'The price the customer actually pays.'}
          />

          <NumberField
            id="vat-rate"
            label="VAT rate"
            value={rate}
            onChange={setRate}
            step="0.1"
            suffix="%"
            hint="Common standard rates: 15% South Africa, 20% United Kingdom, 19% Germany, 25% Denmark. Reduced rates exist for some goods."
          />
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <ArrowRightLeft className="h-3.5 w-3.5" /> {mode === 'add' ? 'Net + VAT' : 'Gross − VAT'}
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.gross)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">Gross total including VAT</p>

              <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Net (excluding VAT)</dt>
                  <dd className="font-mono text-zinc-100">{format(value.net)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">VAT at {format(value.rate, 2)}%</dt>
                  <dd className="font-mono text-zinc-100">{format(value.vat)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">VAT as share of gross</dt>
                  <dd className="font-mono text-zinc-100">{format(value.vatFraction, 2)}%</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `VAT at ${format(value.rate, 2)}%: net ${format(value.net)}, VAT ${format(value.vat)}, gross ${format(value.gross)}.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// NPV
// ==========================================

const DEFAULT_NPV_FLOWS = '-10000, 3000, 3500, 4000, 4500';
const DEFAULT_IRR_FLOWS = '-10000, 3000, 3500, 4000, 4500';

export const NpvCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [flows, setFlows] = useState(DEFAULT_NPV_FLOWS);
  const [rate, setRate] = useState('10');

  const result = useMemo(() => {
    try {
      const cashFlows = parseCashFlowList(flows);
      const discountRate = toNumber(rate) / 100;
      const npv = calculateNpv(discountRate, cashFlows);
      const inflows = cashFlows.slice(1).reduce((sum, flow) => sum + Math.max(0, flow), 0);
      const discountedInflows = cashFlows
        .slice(1)
        .reduce((sum, flow, index) => sum + flow / (1 + discountRate) ** (index + 1), 0);
      const outlay = Math.abs(Math.min(0, cashFlows[0]));
      const schedule = cashFlows.map((flow, index) => ({
        period: index,
        flow,
        presentValue: flow / (1 + discountRate) ** index,
      }));

      return {
        value: {
          npv,
          discountedInflows,
          inflows,
          outlay,
          profitabilityIndex: outlay > 0 ? discountedInflows / outlay : Number.NaN,
          periods: cashFlows.length - 1,
          schedule,
        },
        error: '',
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a valid cash-flow series.' };
    }
  }, [flows, rate]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Investment</Badge>
        <CardTitle>NPV Calculator</CardTitle>
        <CardDescription>
          Discount a stream of future cash flows back to today and see whether the project adds value.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="npv-flows">Cash flows</Label>
            <textarea
              id="npv-flows"
              rows={4}
              value={flows}
              onChange={(event) => setFlows(event.target.value)}
              className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <p className="text-[11px] text-zinc-500">
              Period 0 first — normally the negative initial outlay. Separate values with commas, spaces, or semicolons.
              Parentheses are read as negatives.
            </p>
          </div>

          <NumberField
            id="npv-rate"
            label="Discount rate"
            value={rate}
            onChange={setRate}
            step="0.1"
            suffix="%"
            hint="Your cost of capital or the return you could earn elsewhere at similar risk."
          />
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            {value && value.npv >= 0 ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-amber-400" />
            )}
            Net present value
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p
                className={`mt-2 font-mono text-4xl font-bold tabular-nums ${
                  value.npv >= 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {value.npv >= 0 ? '+' : '−'}
                {format(Math.abs(value.npv))}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {value.npv >= 0
                  ? 'Positive at this discount rate — the project clears the hurdle.'
                  : 'Negative at this discount rate — the project destroys value on these assumptions.'}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">PV of future inflows</dt>
                  <dd className="font-mono text-zinc-100">{format(value.discountedInflows)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Initial outlay</dt>
                  <dd className="font-mono text-zinc-100">{format(value.outlay)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Profitability index</dt>
                  <dd className="font-mono text-zinc-100">
                    {Number.isFinite(value.profitabilityIndex) ? value.profitabilityIndex.toFixed(2) : '—'}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Periods</dt>
                  <dd className="font-mono text-zinc-100">{value.periods}</dd>
                </div>
              </dl>

              <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800">
                <table className="w-full text-[11px]">
                  <thead className="bg-zinc-900 text-zinc-400">
                    <tr>
                      <th className="px-2 py-1.5 text-left font-medium">Period</th>
                      <th className="px-2 py-1.5 text-right font-medium">Cash flow</th>
                      <th className="px-2 py-1.5 text-right font-medium">Present value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {value.schedule.map((row) => (
                      <tr key={row.period}>
                        <td className="px-2 py-1.5 text-zinc-400">{row.period}</td>
                        <td className="px-2 py-1.5 text-right font-mono text-zinc-200">{format(row.flow)}</td>
                        <td className="px-2 py-1.5 text-right font-mono text-zinc-200">{format(row.presentValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `NPV at ${format(toNumber(rate), 2)}% = ${format(value.npv)}. ` +
                      `PV of inflows ${format(value.discountedInflows)}, outlay ${format(value.outlay)}, ` +
                      `profitability index ${Number.isFinite(value.profitabilityIndex) ? value.profitabilityIndex.toFixed(2) : 'n/a'}.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// IRR
// ==========================================

export const IrrCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [flows, setFlows] = useState(DEFAULT_IRR_FLOWS);
  const [hurdle, setHurdle] = useState('10');

  const result = useMemo(() => {
    try {
      const cashFlows = parseCashFlowList(flows);
      const irr = calculateIrr(cashFlows);
      const hurdleRate = toNumber(hurdle);
      const npvAtIrr = calculateNpv(irr, cashFlows);
      const totalIn = cashFlows.filter((flow) => flow > 0).reduce((sum, flow) => sum + flow, 0);
      const totalOut = Math.abs(cashFlows.filter((flow) => flow < 0).reduce((sum, flow) => sum + flow, 0));

      return {
        value: {
          irr: irr * 100,
          npvAtIrr,
          totalIn,
          totalOut,
          multiple: totalOut > 0 ? totalIn / totalOut : Number.NaN,
          hurdleRate: Number.isFinite(hurdleRate) ? hurdleRate : Number.NaN,
          clearsHurdle: Number.isFinite(hurdleRate) ? irr * 100 >= hurdleRate : null,
          periods: cashFlows.length - 1,
        },
        error: '',
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a valid cash-flow series.' };
    }
  }, [flows, hurdle]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Investment</Badge>
        <CardTitle>IRR Calculator</CardTitle>
        <CardDescription>
          Find the annual rate at which a project breaks even in present-value terms, then compare it with your hurdle rate.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="irr-flows">Cash flows</Label>
            <textarea
              id="irr-flows"
              rows={4}
              value={flows}
              onChange={(event) => setFlows(event.target.value)}
              className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <p className="text-[11px] text-zinc-500">
              Needs at least one negative and one positive value. The first value is period 0, usually the initial
              investment.
            </p>
          </div>

          <NumberField
            id="irr-hurdle"
            label="Hurdle rate (optional)"
            value={hurdle}
            onChange={setHurdle}
            step="0.1"
            suffix="%"
            hint="The minimum return you require. Leave as is or clear it to hide the comparison."
          />
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> Internal rate of return
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.irr, 2)}%
              </p>
              <p className="mt-1 text-xs text-zinc-400">Per period, assuming annual periods</p>

              {value.clearsHurdle !== null && (
                <p
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    value.clearsHurdle
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'bg-amber-500/15 text-amber-300'
                  }`}
                >
                  {value.clearsHurdle ? 'Clears' : 'Below'} the {format(value.hurdleRate, 2)}% hurdle
                </p>
              )}

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">NPV at this rate</dt>
                  <dd className="font-mono text-zinc-100">{format(value.npvAtIrr, 4)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Total invested</dt>
                  <dd className="font-mono text-zinc-100">{format(value.totalOut)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Total returned</dt>
                  <dd className="font-mono text-zinc-100">{format(value.totalIn)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Money multiple</dt>
                  <dd className="font-mono text-zinc-100">
                    {Number.isFinite(value.multiple) ? `${value.multiple.toFixed(2)}×` : '—'}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-[11px] text-zinc-500">
                The money multiple ignores timing; the IRR is the rate that sets NPV to zero. If a project has more than
                one sign change, more than one IRR can exist — check the NPV profile before relying on the figure.
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `IRR = ${format(value.irr, 2)}% per period (NPV at IRR ${format(value.npvAtIrr, 4)}). ` +
                      `Invested ${format(value.totalOut)}, returned ${format(value.totalIn)}, ` +
                      `money multiple ${Number.isFinite(value.multiple) ? value.multiple.toFixed(2) : 'n/a'}×.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Inflation
// ==========================================

export const InflationCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");

  const result = useMemo(() => {
    try {
      return {
        value: calculateInflation(toNumber(amount), toNumber(rate), toNumber(years)),
        error: "",
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : "Enter valid inflation inputs." };
    }
  }, [amount, rate, years]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Economics</Badge>
        <CardTitle>Inflation Calculator</CardTitle>
        <CardDescription>
          Project what an amount will cost later, and what a future amount is worth in today's money.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <NumberField
            id="inflation-amount"
            label="Amount"
            value={amount}
            onChange={setAmount}
            step="1"
            hint="A price today, or a future sum you want to deflate."
          />
          <NumberField
            id="inflation-rate"
            label="Annual inflation rate"
            value={rate}
            onChange={setRate}
            step="0.1"
            suffix="%"
            hint="Central-bank targets are commonly 2-3%; use the long-run average you actually expect."
          />
          <NumberField
            id="inflation-years"
            label="Number of years"
            value={years}
            onChange={setYears}
            step="1"
            suffix="yrs"
            hint="Between 0 and 100."
          />
        </div>

        <ResultPanel>
          <p className="text-xs font-mono uppercase tracking-wide text-zinc-400">Future cost of the same basket</p>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.futureCost)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                After {format(toNumber(years), 0)} years at {format(toNumber(rate), 2)}% a year
              </p>

              <dl className="mt-4 space-y-2 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Purchasing power in today's money</dt>
                  <dd className="font-mono text-zinc-100">{format(value.purchasingPower)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Cumulative inflation</dt>
                  <dd className="font-mono text-zinc-100">{format(value.cumulativeInflationPercent, 2)}%</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Real change in buying power</dt>
                  <dd className="font-mono text-zinc-100">{format(value.realChangePercent, 2)}%</dd>
                </div>
              </dl>

              <p className="mt-3 text-[11px] text-zinc-500">
                Prices rising {format(value.cumulativeInflationPercent, 2)}% and money losing{" "}
                {format(Math.abs(value.realChangePercent), 2)}% of its buying power are the same change measured from
                opposite ends.
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `At ${format(toNumber(rate), 2)}% inflation for ${format(toNumber(years), 0)} years: ` +
                      `${format(toNumber(amount))} becomes ${format(value.futureCost)}; ` +
                      `the same sum is worth ${format(value.purchasingPower)} in today's money.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

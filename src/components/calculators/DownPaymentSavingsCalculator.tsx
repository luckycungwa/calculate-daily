import React, { useState, useMemo } from 'react';
import { RotateCcw, Share2, PiggyBank } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { ShareButton } from '../common/ShareButton';
import { AreaChart } from '../charts';
import { useCurrency } from '../../lib/currency';
import { useUrlState, parseParamNumber } from '../../lib/share';
import { useToast } from '../ui/toast';

interface DownPaymentSavingsProps {
  slug?: string;
  onSaveHistory?: (summary: string) => void;
}

export const DownPaymentSavingsCalculator: React.FC<DownPaymentSavingsProps> = ({
  slug = 'down-payment-savings-calculator',
  onSaveHistory,
}) => {
  const currency = useCurrency();
  const { toast } = useToast();

  const initial = {
    target: '80000',
    saved: '20000',
    monthly: '1000',
    rate: '4',
    years: '5',
  };
  const { values: urlValues, syncUrl } = useUrlState(initial, []);

  const [target, setTarget] = useState<string>(() => urlValues.target ?? initial.target);
  const [saved, setSaved] = useState<string>(() => urlValues.saved ?? initial.saved);
  const [monthly, setMonthly] = useState<string>(() => urlValues.monthly ?? initial.monthly);
  const [rate, setRate] = useState<string>(() => urlValues.rate ?? initial.rate);
  const [years, setYears] = useState<string>(() => urlValues.years ?? initial.years);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const values = () => ({ target, saved, monthly, rate, years });

  const results = useMemo(() => {
    const goal = Math.max(0, parseFloat(target) || 0);
    const have = Math.max(0, parseFloat(saved) || 0);
    const deposit = Math.max(0, parseFloat(monthly) || 0);
    const r = Math.max(0, parseFloat(rate) || 0) / 100 / 12;

    const remaining = Math.max(0, goal - have);

    // Find months to reach goal with monthly deposits compounding monthly.
    let balance = have;
    let months = 0;
    const cap = 12 * 60;
    while (balance < goal && months < cap) {
      balance = balance * (1 + r) + deposit;
      months += 1;
    }
    const yearsToGoal = months / 12;
    const daily = months > 0 ? remaining / (months * 30.44) : 0;
    const weekly = months > 0 ? remaining / (months * 4.345) : 0;

    const projectedAtHorizon = (horizonYears: number): number => {
      let b = have;
      for (let m = 0; m < horizonYears * 12; m++) {
        b = b * (1 + r) + deposit;
      }
      return b;
    };
    const projected = projectedAtHorizon(Math.max(1, parseFloat(years) || 5));
    const gapAtHorizon = Math.max(0, goal - projected);

    // Chart of balance growth over the chosen horizon
    const growthSeries: { label: string; value: number }[] = [];
    let b = have;
    for (let m = 0; m < Math.max(1, parseFloat(years) || 5) * 12; m++) {
      b = b * (1 + r) + deposit;
      if (m % 12 === 0) {
        const d = new Date();
        growthSeries.push({ label: `${d.getFullYear() + m / 12}`, value: Math.round(b) });
      }
    }

    return { goal, have, deposit, remaining, months, yearsToGoal, daily, weekly, projected, gapAtHorizon, growthSeries };
  }, [target, saved, monthly, rate, years]);

  const handleReset = () => {
    setTarget(initial.target);
    setSaved(initial.saved);
    setMonthly(initial.monthly);
    setRate(initial.rate);
    setYears(initial.years);
    syncUrl(initial);
  };

  const onChange = (setter: (v: string) => void, key: string, v: string) => {
    setter(v);
    syncUrl({ ...values(), [key]: v });
  };

  const timelineLabel =
    results.months >= 12 * 60
      ? '60+ years'
      : `${Math.floor(results.yearsToGoal)} yrs ${Math.round((results.yearsToGoal % 1) * 12)} mo`;

  const onTrack = results.projected >= results.goal;

  const exportData: Record<string, string> = {
    'Down Payment Target': `${currency}${(parseFloat(target) || 0).toLocaleString()}`,
    'Already Saved': `${currency}${(parseFloat(saved) || 0).toLocaleString()}`,
    'Monthly Deposit': `${currency}${(parseFloat(monthly) || 0).toLocaleString()}`,
    'Interest Rate': `${rate}%`,
    'Months to Goal': `${results.months}`,
    'Daily Savings Rate': `${currency}${results.daily.toFixed(2)}`,
    'Weekly Savings Rate': `${currency}${results.weekly.toFixed(2)}`,
    'Projected at Horizon': `${currency}${results.projected.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Home Buying
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Savings Plan</span>
          </div>
          <CardTitle className="text-xl">Down Payment Savings Plan</CardTitle>
          <CardDescription>
            Turn a down payment target into a daily, weekly, and monthly savings pace.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <ShareButton path={`/calculators/${slug}`} state={values()} label="Share" showPrint />
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="dps-target">Down Payment Target ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="dps-target"
                    type="number"
                    min="0"
                    step="5000"
                    value={target}
                    onChange={(e) => onChange(setTarget, 'target', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dps-saved">Already Saved ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="dps-saved"
                    type="number"
                    min="0"
                    step="1000"
                    value={saved}
                    onChange={(e) => onChange(setSaved, 'saved', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="dps-monthly">Monthly Deposit ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="dps-monthly"
                    type="number"
                    min="0"
                    step="100"
                    value={monthly}
                    onChange={(e) => onChange(setMonthly, 'monthly', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dps-rate">Savings Rate (%)</Label>
                <Input
                  id="dps-rate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={rate}
                  onChange={(e) => onChange(setRate, 'rate', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dps-years">Plan Horizon (yrs)</Label>
                <Input
                  id="dps-years"
                  type="number"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => onChange(setYears, 'years', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
              <PiggyBank className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                Small regular deposits beat occasional lump sums. A 20% down payment also avoids private
                mortgage insurance, which can save hundreds a month.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Remaining to Save</span>
                  <span className="text-primary-on-dark font-semibold tabular-nums">{currency}{results.remaining.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Time to Down Payment
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                    {timelineLabel}
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono mt-1 font-medium">
                    at {currency}{results.deposit.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Daily Pace:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{results.daily.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Weekly Pace:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{results.weekly.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Projected at {years} yrs:</span>
                    <span className={`font-bold tabular-nums ${onTrack ? 'text-brand-on-dark' : 'text-amber-400'}`}>
                      {currency}{results.projected.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {!onTrack && results.gapAtHorizon > 0 && (
                    <div className="flex justify-between text-zinc-300 text-[11px]">
                      <span className="text-zinc-400">Shortfall at horizon:</span>
                      <span className="font-mono tabular-nums font-semibold">{currency}{results.gapAtHorizon.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`Down Payment Plan:\nTarget: ${currency}${results.goal.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nDaily pace: ${currency}${results.daily.toFixed(2)}\nTime: ${timelineLabel}`);
                    toast('Result copied to clipboard');
                    if (onSaveHistory) onSaveHistory(`Down payment: ${currency}${results.daily.toFixed(0)}/day for ${timelineLabel}`);
                  }}
                  className="w-full text-xs"
                >
                  Copy Summary
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Growth chart */}
        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-3">
            Projected Savings Balance
          </h3>
          <AreaChart
            series={[{ name: 'Balance', points: results.growthSeries, type: 'area', color: '#059669' }]}
            xLabels={results.growthSeries.map((p) => p.label)}
            height={220}
            showLegend={false}
            unit={currency}
          />
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Down Payment Savings Plan"
        title="Down Payment Savings Summary"
        data={exportData}
        summaryText={`Down Payment Plan:\nTarget: ${currency}${results.goal.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nSaved: ${currency}${results.have.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nRemaining: ${currency}${results.remaining.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nTime: ${timelineLabel}`}
      />
    </Card>
  );
};
import React, { useState, useMemo } from 'react';
import { RotateCcw, Share2, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { ShareButton } from '../common/ShareButton';
import { LineChart } from '../charts';
import { useCurrency } from '../../lib/currency';
import { useUrlState, parseParamNumber } from '../../lib/share';
import { refinanceAnalysis } from '../../lib/mortgage';
import { useToast } from '../ui/toast';

interface RefinanceCalculatorProps {
  slug?: string;
  onSaveHistory?: (summary: string) => void;
}

export const RefinanceCalculator: React.FC<RefinanceCalculatorProps> = ({ slug = 'refinance-calculator', onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();

  const initial = {
    balance: '250000',
    currentRate: '6.5',
    newRate: '5.5',
    remainingYears: '25',
    closingCosts: '7000',
  };
  const { values: urlValues, syncUrl } = useUrlState(initial, []);

  const [balance, setBalance] = useState<string>(() => urlValues.balance ?? initial.balance);
  const [currentRate, setCurrentRate] = useState<string>(() => urlValues.currentRate ?? initial.currentRate);
  const [newRate, setNewRate] = useState<string>(() => urlValues.newRate ?? initial.newRate);
  const [remainingYears, setRemainingYears] = useState<string>(() => urlValues.remainingYears ?? initial.remainingYears);
  const [closingCosts, setClosingCosts] = useState<string>(() => urlValues.closingCosts ?? initial.closingCosts);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const results = useMemo(() => {
    const balanceNum = Math.max(0, parseFloat(balance) || 0);
    const currentRateNum = Math.max(0, parseFloat(currentRate) || 0);
    const newRateNum = Math.max(0, parseFloat(newRate) || 0);
    const yearsNum = Math.max(1, parseInt(remainingYears) || 25);
    const costsNum = Math.max(0, parseFloat(closingCosts) || 0);
    return refinanceAnalysis({
      currentBalance: balanceNum,
      currentRate: currentRateNum,
      newRate: newRateNum,
      remainingYears: yearsNum,
      closingCosts: costsNum,
    });
  }, [balance, currentRate, newRate, remainingYears, closingCosts]);

  const savingsData = useMemo(() => {
    const points = [];
    let cumulative = 0;
    for (let m = 1; m <= 120; m++) {
      cumulative += results.monthlySavings;
      points.push({ label: `M${m}`, value: Math.round(cumulative * 100) / 100 });
    }
    return points;
  }, [results.monthlySavings]);

  const costData = useMemo(
    () => savingsData.map((p) => ({ label: p.label, value: results.closingCosts })),
    [savingsData, results.closingCosts]
  );

  const handleReset = () => {
    setBalance(initial.balance);
    setCurrentRate(initial.currentRate);
    setNewRate(initial.newRate);
    setRemainingYears(initial.remainingYears);
    setClosingCosts(initial.closingCosts);
    syncUrl(initial);
  };

  const inputOnChange = (setter: (v: string) => void, key: string, v: string) => {
    setter(v);
    syncUrl({ ...values(), [key]: v });
  };
  const values = () => ({ balance, currentRate, newRate, remainingYears, closingCosts });

  const savingsPerYear = results.monthlySavings * 12;
  const breakEvenMonthsLabel =
    results.breakEvenMonths > 0
      ? `${Math.floor(results.breakEvenMonths / 12)} yrs ${results.breakEvenMonths % 12} mo`
      : 'Never';

  const exportData = {
    'Current Balance': `${currency}${parseFloat(balance).toLocaleString()}`,
    'Current Rate': `${currentRate}%`,
    'New Rate': `${newRate}%`,
    'Remaining Term': `${remainingYears} years`,
    'Closing Costs': `${currency}${parseFloat(closingCosts || '0').toLocaleString()}`,
    'Current Monthly Payment': `${currency}${results.currentPayment.toFixed(2)}`,
    'New Monthly Payment': `${currency}${results.newPayment.toFixed(2)}`,
    'Monthly Savings': `${currency}${results.monthlySavings.toFixed(2)}`,
    'Break-Even': breakEvenMonthsLabel,
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Refinancing
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Break-Even Analysis</span>
          </div>
          <CardTitle className="text-xl">Refinance Calculator</CardTitle>
          <CardDescription>
            Compare your current payment to a new rate and find the break-even point.
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
                <Label htmlFor="refi-balance">Current Loan Balance ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="refi-balance"
                    type="number"
                    min="0"
                    step="10000"
                    value={balance}
                    onChange={(e) => inputOnChange(setBalance, 'balance', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="refi-closing">Closing Costs ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="refi-closing"
                    type="number"
                    min="0"
                    step="500"
                    value={closingCosts}
                    onChange={(e) => inputOnChange(setClosingCosts, 'closingCosts', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="refi-current-rate">Current Rate (%)</Label>
                <Input
                  id="refi-current-rate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.05"
                  value={currentRate}
                  onChange={(e) => inputOnChange(setCurrentRate, 'currentRate', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="refi-new-rate">New Rate (%)</Label>
                <Input
                  id="refi-new-rate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.05"
                  value={newRate}
                  onChange={(e) => inputOnChange(setNewRate, 'newRate', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="refi-years">Remaining Term (yrs)</Label>
                <Input
                  id="refi-years"
                  type="number"
                  min="1"
                  max="40"
                  value={remainingYears}
                  onChange={(e) => inputOnChange(setRemainingYears, 'remainingYears', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              <div className="flex items-start gap-2.5">
                <RefreshCcw className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Break-even is the number of months it takes for your monthly savings to cover the closing costs.
                  If you plan to stay past that point, refinancing usually pays off.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Monthly Savings</span>
                  <span className="text-primary-on-dark font-semibold">
                    {currency}{results.monthlySavings.toFixed(2)}/mo
                  </span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Break-Even Point
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                    {breakEvenMonthsLabel}
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono mt-1 font-medium">
                    to recover {currency}{results.closingCosts.toFixed(0)} in fees
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Current Payment:</span>
                    <span className="font-bold text-zinc-100 tabular-nums">{currency}{results.currentPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">New Payment:</span>
                    <span className="font-bold text-primary-on-dark tabular-nums">{currency}{results.newPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Savings per Year:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{savingsPerYear.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Lifetime Interest Saved:</span>
                    <span className="font-bold text-primary-on-dark tabular-nums">{currency}{results.interestSavedTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`Refinance Summary:\nCurrent: ${currency}${results.currentPayment.toFixed(2)}/mo\nNew: ${currency}${results.newPayment.toFixed(2)}/mo\nSavings: ${currency}${results.monthlySavings.toFixed(2)}/mo\nBreak-even: ${breakEvenMonthsLabel}`);
                    toast('Result copied to clipboard');
                    if (onSaveHistory) onSaveHistory(`Refinance: saves ${currency}${results.monthlySavings.toFixed(0)}/mo, break-even ${breakEvenMonthsLabel}`);
                  }}
                  className="w-full text-xs"
                >
                  Copy Summary
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Break-even chart */}
        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-3">
            Cumulative Savings vs Closing Costs
          </h3>
          <LineChart
            series={[
              { name: 'Cumulative Savings', points: savingsData, color: '#059669' },
              { name: 'Closing Costs', points: costData, color: '#71717a' },
            ]}
            xLabels={savingsData.map((p) => p.label)}
            height={240}
            showLegend
            unit={currency}
          />
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Refinance Calculator"
        title="Refinance Analysis"
        data={exportData}
        summaryText={`Refinance Analysis:\nCurrent: ${currency}${results.currentPayment.toFixed(2)}/mo\nNew: ${currency}${results.newPayment.toFixed(2)}/mo\nMonthly savings: ${currency}${results.monthlySavings.toFixed(2)}\nBreak-even: ${breakEvenMonthsLabel}`}
      />
    </Card>
  );
};
import React, { useState, useMemo } from 'react';
import { TrendingUp, RotateCcw, Copy, Check, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';

interface CompoundInterestCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

export const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({ onSaveHistory }) => {
  const [principal, setPrincipal] = useState<string>('5000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('250');
  const [annualRate, setAnnualRate] = useState<string>('8');
  const [years, setYears] = useState<number>(10);
  const [frequency] = useState<number>(12);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const P = Math.max(0, parseFloat(principal) || 0);
    const PMT = Math.max(0, parseFloat(monthlyContribution) || 0);
    const r = Math.max(0, parseFloat(annualRate) || 0) / 100;
    const n = frequency;
    const t = Math.max(1, years || 1);

    const fvPrincipal = P * Math.pow(1 + r / n, n * t);

    const mRate = r / 12;
    const totalMonths = t * 12;
    let fvContributions = 0;
    if (mRate > 0) {
      fvContributions = PMT * ((Math.pow(1 + mRate, totalMonths) - 1) / mRate);
    } else {
      fvContributions = PMT * totalMonths;
    }

    const futureValue = fvPrincipal + fvContributions;
    const totalDeposited = P + PMT * totalMonths;
    const totalInterestEarned = Math.max(0, futureValue - totalDeposited);

    const interestRatio = futureValue > 0 ? (totalInterestEarned / futureValue) * 100 : 0;
    const principalRatio = 100 - interestRatio;

    return {
      P,
      PMT,
      futureValue,
      totalDeposited,
      totalInterestEarned,
      interestRatio,
      principalRatio,
    };
  }, [principal, monthlyContribution, annualRate, years, frequency]);

  const handleCopy = () => {
    const text = `Compound Growth Projector:\nStarting: $${results.P.toLocaleString()} + $${results.PMT}/mo\nIn ${years} years @ ${annualRate}%:\nEnding Balance: $${results.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nTotal Interest Earned: $${results.totalInterestEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) onSaveHistory(`Compound Growth: $${results.futureValue.toFixed(0)} in ${years} yrs`);
  };

  const handleReset = () => {
    setPrincipal('5000');
    setMonthlyContribution('250');
    setAnnualRate('8');
    setYears(10);
  };

  return (
    <Card id="compound-calculator-container" className="p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Wealth Projection
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Monthly Compounding</span>
          </div>
          <CardTitle className="text-xl">Compound Interest Calculator</CardTitle>
          <CardDescription>
            Simulate recurring monthly capital contributions and long-term exponential yield.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            className="text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button
            id="compound-reset-button"
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Inputs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Initial Principal ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">$</span>
                  <Input
                    type="number"
                    min="0"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Monthly Addition ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">$</span>
                  <Input
                    type="number"
                    min="0"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Annual Rate (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="60"
                    step="0.5"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="pr-7 font-mono font-bold text-sm tabular-nums"
                  />
                  <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Time Horizon: {years} Years</Label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[5, 10, 20, 30].map((yr) => (
                    <Button
                      key={yr}
                      type="button"
                      variant={years === yr ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setYears(yr)}
                      className="font-mono text-xs h-8"
                    >
                      {yr}y
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Output */}
          <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <span>Future Portfolio Value</span>
                <span>
                  {years} Yrs @ {annualRate}%
                </span>
              </div>

              <div className="my-4 text-center">
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Projected Balance
                </p>
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                  ${results.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {/* Split Bar */}
              <div className="my-3 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Deposits: ${results.totalDeposited.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  <span>Interest: +${results.totalInterestEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden flex">
                  <div
                    className="bg-zinc-300 h-full transition-all"
                    style={{ width: `${results.principalRatio}%` }}
                  />
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${results.interestRatio}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-3 border-t border-zinc-800">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Money Deposited:</span>
                  <span className="font-bold tabular-nums">${results.totalDeposited.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Compound Growth:</span>
                  <span className="font-bold text-emerald-400 tabular-nums">+${results.totalInterestEarned.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleCopy}
              className="w-full text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Forecast' : 'Copy Growth Forecast'}
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Compound Interest Calculator"
        title="Investment Compound Growth Projection"
        data={{
          'Initial Deposit': `$${results.P.toLocaleString()}`,
          'Monthly Contribution': `$${results.PMT}`,
          'Annual Rate': `${annualRate}%`,
          'Investment Period': `${years} Years`,
          'Total Principal Deposited': `$${results.totalDeposited.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
          'Total Interest Earned': `$${results.totalInterestEarned.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
          'Projected Future Value': `$${results.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        }}
        summaryText={`Compound Growth Projector:\nStarting: $${results.P.toLocaleString()} + $${results.PMT}/mo\nIn ${years} years @ ${annualRate}%:\nEnding Balance: $${results.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nTotal Interest Earned: $${results.totalInterestEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      />
    </Card>
  );
};

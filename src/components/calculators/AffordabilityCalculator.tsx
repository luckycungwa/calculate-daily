import React, { useState, useMemo } from 'react';
import { RotateCcw, Share2, Home as HomeIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { ShareButton } from '../common/ShareButton';
import { GaugeChart } from '../charts';
import { useCurrency } from '../../lib/currency';
import { useUrlState, parseParamNumber } from '../../lib/share';
import { affordability } from '../../lib/mortgage';

interface AffordabilityCalculatorProps {
  slug?: string;
  onSaveHistory?: (summary: string) => void;
}

export const AffordabilityCalculator: React.FC<AffordabilityCalculatorProps> = ({
  slug = 'mortgage-affordability-calculator',
  onSaveHistory,
}) => {
  const currency = useCurrency();

  const initial = {
    income: '85000',
    debts: '400',
    downPct: '20',
    rate: '6.5',
    years: '30',
    taxPct: '1.1',
    insurance: '1200',
  };
  const { values: urlValues, syncUrl } = useUrlState(initial, []);

  const [income, setIncome] = useState<string>(() => urlValues.income ?? initial.income);
  const [debts, setDebts] = useState<string>(() => urlValues.debts ?? initial.debts);
  const [downPct, setDownPct] = useState<string>(() => urlValues.downPct ?? initial.downPct);
  const [rate, setRate] = useState<string>(() => urlValues.rate ?? initial.rate);
  const [years, setYears] = useState<string>(() => urlValues.years ?? initial.years);
  const [taxPct, setTaxPct] = useState<string>(() => urlValues.taxPct ?? initial.taxPct);
  const [insurance, setInsurance] = useState<string>(() => urlValues.insurance ?? initial.insurance);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const values = () => ({ income, debts, downPct, rate, years, taxPct, insurance });

  const results = useMemo(() => {
    return affordability({
      annualIncome: Math.max(0, parseFloat(income) || 0),
      monthlyDebts: Math.max(0, parseFloat(debts) || 0),
      downPaymentPercent: Math.max(0, parseFloat(downPct) || 0),
      annualRate: Math.max(0, parseFloat(rate) || 0),
      years: Math.max(1, parseInt(years) || 30),
      annualTaxPercent: Math.max(0, parseFloat(taxPct) || 0),
      annualInsurance: Math.max(0, parseFloat(insurance) || 0),
      dtiLimit: 36,
    });
  }, [income, debts, downPct, rate, years, taxPct, insurance]);

  const handleReset = () => {
    setIncome(initial.income);
    setDebts(initial.debts);
    setDownPct(initial.downPct);
    setRate(initial.rate);
    setYears(initial.years);
    setTaxPct(initial.taxPct);
    setInsurance(initial.insurance);
    syncUrl(initial);
  };

  const onChange = (setter: (v: string) => void, key: string, v: string) => {
    setter(v);
    syncUrl({ ...values(), [key]: v });
  };

  const downPayment = results.maxHomePrice * (parseFloat(downPct) || 0) / 100;

  const exportData: Record<string, string> = {
    'Annual Income': `${currency}${(parseFloat(income) || 0).toLocaleString()}`,
    'Monthly Debt Payments': `${currency}${(parseFloat(debts) || 0).toLocaleString()}`,
    'Down Payment': `${downPct}%`,
    'Interest Rate': `${rate}%`,
    'Loan Term': `${years} years`,
    'Max Home Price': `${currency}${results.maxHomePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    'Required Down Payment': `${currency}${downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    'Estimated Monthly Payment': `${currency}${results.monthlyPayment.toFixed(2)}`,
    'Back-End DTI': `${results.dti.toFixed(1)}%`,
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Home Buying
            </Badge>
            <span className="text-xs font-mono text-zinc-500">DTI-Based Limit</span>
          </div>
          <CardTitle className="text-xl">How Much House Can I Afford?</CardTitle>
          <CardDescription>
            Size your maximum home price from income, debts, and down payment.
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
                <Label htmlFor="aff-income">Annual Gross Income ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="aff-income"
                    type="number"
                    min="0"
                    step="5000"
                    value={income}
                    onChange={(e) => onChange(setIncome, 'income', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="aff-debts">Monthly Debt Payments ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="aff-debts"
                    type="number"
                    min="0"
                    step="100"
                    value={debts}
                    onChange={(e) => onChange(setDebts, 'debts', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="aff-down">Down Payment (%)</Label>
                <Input
                  id="aff-down"
                  type="number"
                  min="0"
                  max="80"
                  value={downPct}
                  onChange={(e) => onChange(setDownPct, 'downPct', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="aff-rate">Interest Rate (%)</Label>
                <Input
                  id="aff-rate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.05"
                  value={rate}
                  onChange={(e) => onChange(setRate, 'rate', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="aff-years">Loan Term (yrs)</Label>
                <Input
                  id="aff-years"
                  type="number"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => onChange(setYears, 'years', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="aff-tax">Property Tax (%)</Label>
                <Input
                  id="aff-tax"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={taxPct}
                  onChange={(e) => onChange(setTaxPct, 'taxPct', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="aff-insurance">Annual Insurance ({currency})</Label>
                <Input
                  id="aff-insurance"
                  type="number"
                  min="0"
                  step="100"
                  value={insurance}
                  onChange={(e) => onChange(setInsurance, 'insurance', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
              <HomeIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                Uses the 36% back-end DTI guideline: housing payment plus other debts should stay under 36% of
                gross monthly income. Lenders also cap the front-end ratio around 28%.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Comfortably Affordable</span>
                  <span className="text-emerald-400 font-semibold">{results.dti.toFixed(0)}% DTI</span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Maximum Home Price
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                    {currency}{results.maxHomePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono mt-1 font-medium">
                    Est. payment {currency}{results.monthlyPayment.toFixed(0)}/mo
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Down Payment Needed:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Loan Amount:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">{currency}{results.maxLoanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Other Debts / mo:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{results.monthlyDebtPayment.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <GaugeChart
                  value={results.dti}
                  min={0}
                  max={50}
                  label="Back-End DTI"
                  unit="%"
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Mortgage Affordability"
        title="Affordability Summary"
        data={exportData}
        summaryText={`Affordability:\nIncome: ${currency}${(parseFloat(income) || 0).toLocaleString()}/yr\nMax home price: ${currency}${results.maxHomePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nEst payment: ${currency}${results.monthlyPayment.toFixed(2)}/mo\nDTI: ${results.dti.toFixed(1)}%`}
      />
    </Card>
  );
};
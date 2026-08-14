import React, { useState, useMemo } from 'react';
import { Home, RotateCcw, Copy, Check, Share2, Table as TableIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import { ExportModal } from '../common/ExportModal';

interface MortgageCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ onSaveHistory }) => {
  const [homePrice, setHomePrice] = useState<string>('400000');
  const [downPayment, setDownPayment] = useState<string>('80000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxYearly, setPropertyTaxYearly] = useState<string>('4000');
  const [homeInsuranceYearly, setHomeInsuranceYearly] = useState<string>('1200');
  const [includeTaxes, setIncludeTaxes] = useState<boolean>(true);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const results = useMemo(() => {
    const price = Math.max(0, parseFloat(homePrice) || 0);
    const down = Math.max(0, parseFloat(downPayment) || 0);
    const loanAmount = Math.max(0, price - down);
    const annualRate = Math.max(0, parseFloat(interestRate) || 0) / 100;
    const monthlyRate = annualRate / 12;
    const totalPaymentsCount = Math.max(1, (loanTermYears || 30) * 12);

    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0 && loanAmount > 0) {
      monthlyPrincipalInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPaymentsCount))) /
        (Math.pow(1 + monthlyRate, totalPaymentsCount) - 1);
    } else if (loanAmount > 0) {
      monthlyPrincipalInterest = loanAmount / totalPaymentsCount;
    }

    const totalPaidOverLoan = monthlyPrincipalInterest * totalPaymentsCount;
    const totalInterestPaid = Math.max(0, totalPaidOverLoan - loanAmount);

    const monthlyTax = includeTaxes ? Math.max(0, parseFloat(propertyTaxYearly) || 0) / 12 : 0;
    const monthlyInsurance = includeTaxes ? Math.max(0, parseFloat(homeInsuranceYearly) || 0) / 12 : 0;
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;

    const principalPct = totalPaidOverLoan > 0 ? (loanAmount / totalPaidOverLoan) * 100 : 50;
    const interestPct = totalPaidOverLoan > 0 ? (totalInterestPaid / totalPaidOverLoan) * 100 : 50;

    // Generate annual amortization schedule preview
    const schedule = [];
    let balance = loanAmount;
    for (let yr = 1; yr <= loanTermYears; yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const intPayment = balance * monthlyRate;
        const princPayment = Math.min(balance, monthlyPrincipalInterest - intPayment);
        yearlyInterest += intPayment;
        yearlyPrincipal += princPayment;
        balance = Math.max(0, balance - princPayment);
      }
      schedule.push({
        year: yr,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        remainingBalance: balance,
      });
    }

    return {
      price,
      down,
      loanAmount,
      monthlyPrincipalInterest,
      totalInterestPaid,
      totalPaidOverLoan,
      monthlyTax,
      monthlyInsurance,
      totalMonthlyPayment,
      principalPct,
      interestPct,
      totalPaymentsCount,
      schedule,
    };
  }, [homePrice, downPayment, interestRate, loanTermYears, propertyTaxYearly, homeInsuranceYearly, includeTaxes]);

  const handleCopy = () => {
    const text = `Mortgage Payment Estimate:\nHome Price: $${results.price.toLocaleString()} (Down: $${results.down.toLocaleString()})\nLoan Amount: $${results.loanAmount.toLocaleString()}\nMonthly P&I: $${results.monthlyPrincipalInterest.toFixed(2)}\nTotal Monthly (with tax/ins): $${results.totalMonthlyPayment.toFixed(2)}\nTotal Interest over ${loanTermYears} yrs: $${results.totalInterestPaid.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (onSaveHistory) {
      onSaveHistory(`Mortgage: $${results.totalMonthlyPayment.toFixed(0)}/mo for $${results.loanAmount.toLocaleString()} loan`);
    }
  };

  const handleReset = () => {
    setHomePrice('400000');
    setDownPayment('80000');
    setInterestRate('6.5');
    setLoanTermYears(30);
    setPropertyTaxYearly('4000');
    setHomeInsuranceYearly('1200');
    setIncludeTaxes(true);
  };

  return (
    <Card id="mortgage-calculator-container" className="p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Real Estate Loan
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Amortized Schedule</span>
          </div>
          <CardTitle className="text-xl">Mortgage & Loan Planner</CardTitle>
          <CardDescription>
            Estimate monthly payments, total interest costs, and amortization milestones.
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
            id="mortgage-reset-button"
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
          {/* Input Parameters */}
          <div className="lg:col-span-7 space-y-4">
            {/* Home Price & Down Payment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="mortgage-home-price">Home Price ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">$</span>
                  <Input
                    id="mortgage-home-price"
                    type="number"
                    min="0"
                    step="5000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="mortgage-down-payment">Down Payment ($)</Label>
                  <span className="text-xs text-zinc-500 font-mono">
                    {results.price > 0 ? ((results.down / results.price) * 100).toFixed(0) : 0}% down
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">$</span>
                  <Input
                    id="mortgage-down-payment"
                    type="number"
                    min="0"
                    step="5000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* Interest Rate & Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="mortgage-interest-rate">Interest Rate (Annual %)</Label>
                <div className="relative">
                  <Input
                    id="mortgage-interest-rate"
                    type="number"
                    min="0"
                    max="30"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pr-7 font-mono font-bold text-sm tabular-nums"
                  />
                  <span className="absolute right-3 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Loan Term</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[15, 20, 30].map((years) => (
                    <Button
                      key={years}
                      id={`mortgage-term-${years}`}
                      type="button"
                      variant={loanTermYears === years ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoanTermYears(years)}
                      className="font-mono text-xs h-8"
                    >
                      {years} Yrs
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Taxes & Insurance Options */}
            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  id="mortgage-include-taxes"
                  type="checkbox"
                  checked={includeTaxes}
                  onChange={(e) => setIncludeTaxes(e.target.checked)}
                  className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="mortgage-include-taxes" className="cursor-pointer text-xs">
                  Include Annual Property Taxes & Home Insurance
                </Label>
              </div>

              {includeTaxes && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <Label htmlFor="mortgage-property-tax" className="text-[11px] text-zinc-500 font-mono">
                      Annual Property Tax ($)
                    </Label>
                    <Input
                      id="mortgage-property-tax"
                      type="number"
                      value={propertyTaxYearly}
                      onChange={(e) => setPropertyTaxYearly(e.target.value)}
                      className="h-8 font-mono text-xs tabular-nums"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="mortgage-home-insurance" className="text-[11px] text-zinc-500 font-mono">
                      Annual Home Insurance ($)
                    </Label>
                    <Input
                      id="mortgage-home-insurance"
                      type="number"
                      value={homeInsuranceYearly}
                      onChange={(e) => setHomeInsuranceYearly(e.target.value)}
                      className="h-8 font-mono text-xs tabular-nums"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Estimated Monthly Cost</span>
                  <span className="text-zinc-200 font-semibold">
                    {loanTermYears}-yr Fixed @ {interestRate}%
                  </span>
                </div>

                {/* Monthly Payment */}
                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Total Monthly Payment
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                    ${results.totalMonthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono mt-1 font-medium">
                    Principal & Interest: ${results.monthlyPrincipalInterest.toFixed(2)}/mo
                  </p>
                </div>

                {/* Visual Breakdown Bar */}
                <div className="my-3 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono font-semibold text-zinc-300">
                    <span>Principal: ${results.loanAmount.toLocaleString()}</span>
                    <span className="text-emerald-400">Interest: ${results.totalInterestPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden flex">
                    <div
                      className="bg-zinc-300 h-full transition-all"
                      style={{ width: `${results.principalPct}%` }}
                    />
                    <div
                      className="bg-emerald-500 h-full transition-all"
                      style={{ width: `${results.interestPct}%` }}
                    />
                  </div>
                </div>

                {/* Lifetime stats */}
                <div className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Total Interest Paid:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">
                      ${results.totalInterestPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-100">
                    <span className="text-zinc-400">Total Paid Over {loanTermYears} Yrs:</span>
                    <span className="font-bold text-white tabular-nums">
                      ${results.totalPaidOverLoan.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  {includeTaxes && (
                    <div className="flex justify-between text-zinc-300 text-[11px]">
                      <span className="text-zinc-400">Taxes & Ins / mo:</span>
                      <span className="font-mono tabular-nums font-semibold">${(results.monthlyTax + results.monthlyInsurance).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <Button
                  id="mortgage-copy-button"
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleCopy}
                  className="w-full text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Summary' : 'Copy Loan Summary'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full text-xs border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  {showAmortization ? 'Hide Amortization Schedule' : 'View Amortization Schedule'}
                  {showAmortization ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Schedule Table */}
        {showAmortization && (
          <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold">
                Annual Amortization Breakdown ({loanTermYears} Years)
              </h3>
              <span className="text-xs font-mono text-zinc-500">Year-by-Year Schedule</span>
            </div>

            <div className="overflow-x-auto max-h-64 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <Table>
                <TableHeader>
                  <TableRow className="font-mono text-xs">
                    <TableHead>Year</TableHead>
                    <TableHead>Principal Paid</TableHead>
                    <TableHead>Interest Paid</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="font-mono text-xs">
                  {results.schedule.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-bold">Year {row.year}</TableCell>
                      <TableCell className="tabular-nums">
                        ${row.principalPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-emerald-600 dark:text-emerald-400 tabular-nums">
                        ${row.interestPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="font-bold tabular-nums">
                        ${row.remainingBalance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Mortgage & Loan Planner"
        title="Mortgage Repayment Summary"
        data={{
          'Home Price': `$${results.price.toLocaleString()}`,
          'Down Payment': `$${results.down.toLocaleString()}`,
          'Loan Amount': `$${results.loanAmount.toLocaleString()}`,
          'Loan Term': `${loanTermYears} Years`,
          'Interest Rate': `${interestRate}%`,
          'Monthly Principal & Interest': `$${results.monthlyPrincipalInterest.toFixed(2)}`,
          'Total Monthly Cost': `$${results.totalMonthlyPayment.toFixed(2)}`,
          'Total Interest Over Loan': `$${results.totalInterestPaid.toFixed(2)}`,
        }}
        summaryText={`Mortgage Payment Estimate:\nHome Price: $${results.price.toLocaleString()} (Down: $${results.down.toLocaleString()})\nLoan Amount: $${results.loanAmount.toLocaleString()}\nMonthly P&I: $${results.monthlyPrincipalInterest.toFixed(2)}\nTotal Monthly (with tax/ins): $${results.totalMonthlyPayment.toFixed(2)}\nTotal Interest over ${loanTermYears} yrs: $${results.totalInterestPaid.toFixed(2)}`}
      />
    </Card>
  );
};

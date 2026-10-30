import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { calculateGoldLoan, calculatePersonalLoan } from '../../lib/loanOpportunityCalculations';
import { useCurrency } from '../../lib/currency';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

type PersonalLoanFields = {
  loanAmount: string;
  originationFeePercent: string;
  annualRate: string;
  termMonths: string;
};

const PERSONAL_DEFAULTS: PersonalLoanFields = {
  loanAmount: '10000',
  originationFeePercent: '5',
  annualRate: '12.5',
  termMonths: '36',
};

type GoldLoanFields = {
  netGoldWeightGrams: string;
  purityCarats: string;
  goldPricePerGram: string;
  loanToValuePercent: string;
  annualRate: string;
  termMonths: string;
};

const GOLD_DEFAULTS: GoldLoanFields = {
  netGoldWeightGrams: '20',
  purityCarats: '22',
  goldPricePerGram: '80',
  loanToValuePercent: '75',
  annualRate: '12',
  termMonths: '12',
};

function parseField(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value);
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <section aria-live="polite" className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">{children}</section>;
}

function MoneyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-zinc-800 pb-2 text-sm last:border-0">
      <dt className="text-zinc-400">{label}</dt>
      <dd className="font-mono tabular-nums">{value}</dd>
    </div>
  );
}

export const PersonalLoanCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const [fields, setFields] = useState<PersonalLoanFields>({ ...PERSONAL_DEFAULTS });
  const inputs = {
    loanAmount: parseField(fields.loanAmount),
    originationFeePercent: parseField(fields.originationFeePercent),
    annualRate: parseField(fields.annualRate),
    termMonths: parseField(fields.termMonths),
  };
  let result: ReturnType<typeof calculatePersonalLoan> | null = null;
  let error = '';
  try {
    result = calculatePersonalLoan(inputs);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'Unable to calculate this loan estimate.';
  }
  const update = (field: keyof PersonalLoanFields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const money = (value: number) => `${currency}${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  const saveSummary = () => {
    if (!result) return;
    onSaveHistory?.(`Personal loan estimate: ${money(result.monthlyPayment)}/month; net proceeds ${money(result.netCashReceived)}; total cost ${money(result.totalCost)}.`);
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <CardTitle>Personal Loan EMI Calculator</CardTitle>
          <CardDescription>Compare estimated cash received, monthly installments, and total financing cost.</CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setFields({ ...PERSONAL_DEFAULTS })}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="personal-loan-amount">Loan amount ({currency})</Label>
            <Input id="personal-loan-amount" type="number" min="0.01" step="any" value={fields.loanAmount} onChange={(event) => update('loanAmount', event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="personal-loan-fee">Origination fee</Label>
            <div className="relative">
              <Input id="personal-loan-fee" type="number" min="0" max="99.99" step="any" value={fields.originationFeePercent} onChange={(event) => update('originationFeePercent', event.target.value)} className="pr-8" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">%</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="personal-loan-apr">Annual percentage rate</Label>
            <div className="relative">
              <Input id="personal-loan-apr" type="number" min="0" max="100" step="any" value={fields.annualRate} onChange={(event) => update('annualRate', event.target.value)} className="pr-8" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">%</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="personal-loan-term">Term</Label>
            <div className="relative">
              <Input id="personal-loan-term" type="number" min="1" max="120" step="1" value={fields.termMonths} onChange={(event) => update('termMonths', event.target.value)} className="pr-16" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">months</span>
            </div>
          </div>
        </div>
        <ResultPanel>
          <h3 className="mb-4 text-sm font-semibold">Estimated loan summary</h3>
          {error ? <p role="alert" className="text-sm text-amber-300">{error}</p> : result && (
            <>
              <p className="text-xs text-zinc-400">Estimated monthly installment</p>
              <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-primary-on-dark">{money(result.monthlyPayment)}</p>
              <dl className="mt-5 space-y-3">
                <MoneyRow label="Loan amount" value={money(result.loanAmount)} />
                <MoneyRow label="Origination fee" value={money(result.originationFee)} />
                <MoneyRow label="Estimated cash received" value={money(result.netCashReceived)} />
                <MoneyRow label="Total of payments" value={money(result.totalPayments)} />
                <MoneyRow label="Total cost above cash received" value={money(result.totalCost)} />
              </dl>
              <Button type="button" variant="outline" size="sm" onClick={saveSummary} className="mt-5 w-full">Save estimate to history</Button>
            </>
          )}
          <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">Illustrative fixed-rate estimate only. Actual offers may include other fees, different APR conventions, insurance, or lender-specific terms. Compare the full disclosures before borrowing.</p>
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

export const GoldLoanCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const [fields, setFields] = useState<GoldLoanFields>({ ...GOLD_DEFAULTS });
  const inputs = {
    netGoldWeightGrams: parseField(fields.netGoldWeightGrams),
    purityCarats: parseField(fields.purityCarats),
    goldPricePerGram: parseField(fields.goldPricePerGram),
    loanToValuePercent: parseField(fields.loanToValuePercent),
    annualRate: parseField(fields.annualRate),
    termMonths: parseField(fields.termMonths),
  };
  let result: ReturnType<typeof calculateGoldLoan> | null = null;
  let error = '';
  try {
    result = calculateGoldLoan(inputs);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'Unable to calculate this estimate.';
  }
  const update = (field: keyof GoldLoanFields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const money = (value: number) => `${currency}${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  const saveSummary = () => {
    if (!result) return;
    onSaveHistory?.(`Gold-loan estimate: up to ${money(result.estimatedMaximumLoan)} at ${inputs.loanToValuePercent}% of entered gold value; estimated monthly payment ${money(result.monthlyPayment)}.`);
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <CardTitle>Gold Loan Eligibility &amp; EMI Estimate</CardTitle>
          <CardDescription>Explore a scenario from your entered weight, purity, gold price, and lender LTV.</CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setFields({ ...GOLD_DEFAULTS })}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="gold-weight">Net gold weight (grams)</Label>
            <Input id="gold-weight" type="number" min="0.01" step="any" value={fields.netGoldWeightGrams} onChange={(event) => update('netGoldWeightGrams', event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gold-purity">Purity</Label>
            <div className="relative">
              <Input id="gold-purity" type="number" min="0.01" max="24" step="any" value={fields.purityCarats} onChange={(event) => update('purityCarats', event.target.value)} className="pr-12" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">carat</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gold-price">Entered gold price ({currency}/g)</Label>
            <Input id="gold-price" type="number" min="0.01" step="any" value={fields.goldPricePerGram} onChange={(event) => update('goldPricePerGram', event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gold-ltv">Loan-to-value cap</Label>
            <div className="relative">
              <Input id="gold-ltv" type="number" min="0" max="100" step="any" value={fields.loanToValuePercent} onChange={(event) => update('loanToValuePercent', event.target.value)} className="pr-8" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">%</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gold-apr">Annual percentage rate</Label>
            <div className="relative">
              <Input id="gold-apr" type="number" min="0" max="100" step="any" value={fields.annualRate} onChange={(event) => update('annualRate', event.target.value)} className="pr-8" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">%</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gold-term">Term</Label>
            <div className="relative">
              <Input id="gold-term" type="number" min="1" max="120" step="1" value={fields.termMonths} onChange={(event) => update('termMonths', event.target.value)} className="pr-16" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">months</span>
            </div>
          </div>
        </div>
        <ResultPanel>
          <h3 className="mb-4 text-sm font-semibold">Illustrative collateral estimate</h3>
          {error ? <p role="alert" className="text-sm text-amber-300">{error}</p> : result && (
            <>
              <p className="text-xs text-zinc-400">Estimated maximum loan using entered LTV</p>
              <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-primary-on-dark">{money(result.estimatedMaximumLoan)}</p>
              <dl className="mt-5 space-y-3">
                <MoneyRow label="Fine-gold equivalent" value={`${result.fineGoldEquivalentGrams.toFixed(2)} g`} />
                <MoneyRow label="Value at entered price" value={money(result.estimatedGoldValue)} />
                <MoneyRow label="Estimated monthly installment" value={money(result.monthlyPayment)} />
                <MoneyRow label="Estimated interest" value={money(result.totalInterest)} />
              </dl>
              <Button type="button" variant="outline" size="sm" onClick={saveSummary} className="mt-5 w-full">Save estimate to history</Button>
            </>
          )}
          <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">This does not appraise jewelry or establish eligibility. Lenders may exclude stones, use different purity tests, prices, caps, fees, and repayment methods. Confirm terms with a regulated lender; no market price is fetched.</p>
        </ResultPanel>
      </CardContent>
    </Card>
  );
};
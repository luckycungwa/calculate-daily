import React, { useState } from 'react';
import { Copy, RotateCcw } from 'lucide-react';
import { calculateCarLoan } from '../../lib/carLoanCalculations';
import { useCurrency } from '../../lib/currency';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../ui/toast';

type CarLoanFields = {
  vehiclePrice: string;
  taxesAndFees: string;
  downPayment: string;
  tradeInEquity: string;
  annualRate: string;
  termMonths: string;
};

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

const DEFAULT_FIELDS: CarLoanFields = {
  vehiclePrice: '30000',
  taxesAndFees: '1800',
  downPayment: '3000',
  tradeInEquity: '0',
  annualRate: '6.5',
  termMonths: '60',
};

function parseField(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value);
}

export const CarLoanCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();
  const [fields, setFields] = useState<CarLoanFields>({ ...DEFAULT_FIELDS });
  const inputs = {
    vehiclePrice: parseField(fields.vehiclePrice),
    taxesAndFees: parseField(fields.taxesAndFees),
    downPayment: parseField(fields.downPayment),
    tradeInEquity: parseField(fields.tradeInEquity),
    annualRate: parseField(fields.annualRate),
    termMonths: parseField(fields.termMonths),
  };

  let result: ReturnType<typeof calculateCarLoan> | null = null;
  let error = '';
  try {
    result = calculateCarLoan(inputs);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'Unable to calculate this loan.';
  }

  const updateField = (field: keyof CarLoanFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  const reset = () => setFields({ ...DEFAULT_FIELDS });
  const formatMoney = (value: number) => `${currency}${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  const copyResult = async () => {
    if (!result) return;
    const summary = `Estimated car-loan payment: ${formatMoney(result.monthlyPayment)}/month for ${inputs.termMonths} months at ${inputs.annualRate}% APR. Amount financed: ${formatMoney(result.amountFinanced)}; estimated interest: ${formatMoney(result.totalInterest)}.`;
    try {
      await navigator.clipboard.writeText(summary);
      toast('Loan estimate copied');
      onSaveHistory?.(summary);
    } catch {
      toast('Clipboard access is unavailable. Select and copy the estimate manually.', 'warning');
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <CardTitle>Car Loan Calculator</CardTitle>
          <CardDescription>Estimate the payment and interest for a fixed-rate vehicle loan.</CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="car-loan-price">Vehicle price ({currency})</Label>
            <Input id="car-loan-price" type="number" min="0.01" step="any" value={fields.vehiclePrice} onChange={(event) => updateField('vehiclePrice', event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="car-loan-fees">Taxes and fees ({currency})</Label>
            <Input id="car-loan-fees" type="number" min="0" step="any" value={fields.taxesAndFees} onChange={(event) => updateField('taxesAndFees', event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="car-loan-down-payment">Down payment ({currency})</Label>
            <Input id="car-loan-down-payment" type="number" min="0" step="any" value={fields.downPayment} onChange={(event) => updateField('downPayment', event.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="car-loan-trade-equity">Trade-in equity ({currency})</Label>
            <Input id="car-loan-trade-equity" type="number" step="any" value={fields.tradeInEquity} onChange={(event) => updateField('tradeInEquity', event.target.value)} />
            <p className="text-[11px] text-zinc-500">Enter a negative amount if the trade-in payoff exceeds its value.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="car-loan-apr">Annual percentage rate</Label>
            <div className="relative">
              <Input id="car-loan-apr" type="number" min="0" max="100" step="any" value={fields.annualRate} onChange={(event) => updateField('annualRate', event.target.value)} className="pr-8" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">%</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="car-loan-term">Loan term</Label>
            <div className="relative">
              <Input id="car-loan-term" type="number" min="1" max="120" step="1" value={fields.termMonths} onChange={(event) => updateField('termMonths', event.target.value)} className="pr-16" />
              <span className="absolute right-3 top-2 text-xs text-zinc-400">months</span>
            </div>
          </div>
        </div>

        <section aria-live="polite" className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
          <h3 className="mb-4 text-sm font-semibold">Estimated loan summary</h3>
          {error ? (
            <p role="alert" className="text-sm text-amber-300">{error}</p>
          ) : result && (
            <>
              <p className="text-xs font-medium text-zinc-400">Estimated monthly payment</p>
              <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-primary-on-dark">{formatMoney(result.monthlyPayment)}</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3 border-b border-zinc-800 pb-2">
                  <dt className="text-zinc-400">Amount financed</dt>
                  <dd className="font-mono tabular-nums">{formatMoney(result.amountFinanced)}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-zinc-800 pb-2">
                  <dt className="text-zinc-400">Total of payments</dt>
                  <dd className="font-mono tabular-nums">{formatMoney(result.totalPayments)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Estimated interest</dt>
                  <dd className="font-mono tabular-nums">{formatMoney(result.totalInterest)}</dd>
                </div>
              </dl>
              <Button type="button" variant="outline" size="sm" onClick={copyResult} className="mt-5 w-full">
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy estimate
              </Button>
            </>
          )}
          <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">
            Estimate assumes equal monthly payments at a fixed APR. Enter taxes and fees for your location; lender charges, insurance, add-ons, and local rules may change the actual offer.
          </p>
        </section>
      </CardContent>
    </Card>
  );
};
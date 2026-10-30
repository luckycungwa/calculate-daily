import React, { useState, useMemo } from 'react';
import { RotateCcw, Share2, CalendarRange } from 'lucide-react';
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
import { ShareButton } from '../common/ShareButton';
import { BarChart } from '../charts';
import { GaugeStack, GaugeTrack, LinearGauge } from '../gauge';
import { useCurrency } from '../../lib/currency';
import { useUrlState, parseParamNumber } from '../../lib/share';
import { buildAmortization } from '../../lib/mortgage';
import { useToast } from '../ui/toast';

interface AmortizationScheduleProps {
  slug?: string;
  onSaveHistory?: (summary: string) => void;
}

export const AmortizationScheduleCalculator: React.FC<AmortizationScheduleProps> = ({
  slug = 'amortization-schedule-calculator',
  onSaveHistory,
}) => {
  const currency = useCurrency();
  const { toast } = useToast();

  const initial = { principal: '300000', rate: '6.5', years: '30', extra: '0' };
  const { values: urlValues, syncUrl } = useUrlState(initial, []);

  const [principal, setPrincipal] = useState<string>(() => urlValues.principal ?? initial.principal);
  const [rate, setRate] = useState<string>(() => urlValues.rate ?? initial.rate);
  const [years, setYears] = useState<string>(() => urlValues.years ?? initial.years);
  const [extra, setExtra] = useState<string>(() => urlValues.extra ?? initial.extra);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const values = () => ({ principal, rate, years, extra });

  const results = useMemo(() => {
    const p = Math.max(0, parseFloat(principal) || 0);
    const r = Math.max(0, parseFloat(rate) || 0);
    const y = Math.max(1, parseInt(years) || 30);
    const e = Math.max(0, parseFloat(extra) || 0);
    return buildAmortization({ principal: p, annualRate: r, years: y, extraMonthly: e });
  }, [principal, rate, years, extra]);

  // Yearly aggregation for the chart
  const yearly = useMemo(() => {
    const arr: { label: string; principal: number; interest: number }[] = [];
    results.rows.forEach((row) => {
      const yearIdx = Math.floor((row.month - 1) / 12);
      if (!arr[yearIdx]) arr[yearIdx] = { label: `Year ${yearIdx + 1}`, principal: 0, interest: 0 };
      arr[yearIdx].principal += row.principal;
      arr[yearIdx].interest += row.interest;
    });
    return arr.map((a) => ({
      ...a,
      principal: Math.round(a.principal),
      interest: Math.round(a.interest),
    }));
  }, [results.rows]);

  // Split of everything paid: what went to the balance vs what went to the
  // lender. Both come from the schedule, so they always add up.
  const principalPaid = Math.max(0, results.totalPayment - results.totalInterest);
  const principalShare = results.totalPayment > 0 ? principalPaid / results.totalPayment : 0;

  const handleReset = () => {
    setPrincipal(initial.principal);
    setRate(initial.rate);
    setYears(initial.years);
    setExtra(initial.extra);
    syncUrl(initial);
  };

  const onChange = (setter: (v: string) => void, key: string, v: string) => {
    setter(v);
    syncUrl({ ...values(), [key]: v });
  };

  const exportData: Record<string, string> = {
    'Loan Amount': `${currency}${(parseFloat(principal) || 0).toLocaleString()}`,
    'Annual Rate': `${rate}%`,
    'Term': `${years} years`,
    'Extra Monthly': `${currency}${(parseFloat(extra) || 0).toLocaleString()}`,
    'Monthly Payment': `${currency}${results.monthlyPayment.toFixed(2)}`,
    'Total Payment': `${currency}${results.totalPayment.toFixed(2)}`,
    'Total Interest': `${currency}${results.totalInterest.toFixed(2)}`,
    'Payoff Time': `${Math.floor(results.payoffMonths / 12)} yrs ${results.payoffMonths % 12} mo`,
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Loan Detail
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Monthly Breakdown</span>
          </div>
          <CardTitle className="text-xl">Loan Prepayment &amp; Amortization Schedule</CardTitle>
          <CardDescription>
            Every monthly payment, principal, interest, and balance across the full loan term.
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
                <Label htmlFor="amort-principal">Loan Amount ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="amort-principal"
                    type="number"
                    min="0"
                    step="10000"
                    value={principal}
                    onChange={(e) => onChange(setPrincipal, 'principal', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="amort-rate">Annual Interest Rate (%)</Label>
                <Input
                  id="amort-rate"
                  type="number"
                  min="0"
                  max="25"
                  step="0.05"
                  value={rate}
                  onChange={(e) => onChange(setRate, 'rate', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="amort-years">Loan Term (years)</Label>
                <Input
                  id="amort-years"
                  type="number"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => onChange(setYears, 'years', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="amort-extra">Extra Monthly Payment ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="amort-extra"
                    type="number"
                    min="0"
                    step="50"
                    value={extra}
                    onChange={(e) => onChange(setExtra, 'extra', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
              <CalendarRange className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                An extra payment shortens the term and slashes total interest. The schedule below reflects
                every payment, month by month.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Monthly Payment</span>
                  <span className="text-brand-on-dark font-semibold tabular-nums">{currency}{results.monthlyPayment.toFixed(2)}</span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Payoff Time
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                    {Math.floor(results.payoffMonths / 12)} yrs {results.payoffMonths % 12} mo
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono mt-1 font-medium">
                    {results.rows.length > 0 ? results.firstPayment : ''} onward
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Total Payment:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{results.totalPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Total Interest:</span>
                    <span className="font-bold text-brand-on-dark tabular-nums">{currency}{results.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Every payment split into balance and interest */}
              {results.totalPayment > 0 && (
                <div className="pt-3 border-t border-zinc-800">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                    Where every payment goes
                  </p>
                  <LinearGauge
                    value={100}
                    min={0}
                    max={100}
                    length={600}
                    padding={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    transition={false}
                    className="text-white"
                    role="img"
                    aria-label={`Of the total paid, ${Math.round(principalShare * 100)} percent goes to the balance and ${Math.round((1 - principalShare) * 100)} percent to interest.`}
                  >
                    <GaugeTrack width={12} opacity={0.12} />
                    <GaugeStack
                      parts={[
                        { weight: principalShare, color: '#34d399' },
                        { weight: 1 - principalShare, color: '#fb7185' },
                      ]}
                      width={12}
                      cap="round"
                    />
                  </LinearGauge>
                  <div className="mt-2 flex items-center justify-between gap-3 text-[10px] font-mono font-medium">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
                      Principal {Math.round(principalShare * 100)}%
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      Interest {Math.round((1 - principalShare) * 100)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`Amortization Summary:\nPayment: ${currency}${results.monthlyPayment.toFixed(2)}/mo\nTotal interest: ${currency}${results.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nPayoff: ${Math.floor(results.payoffMonths / 12)} yrs ${results.payoffMonths % 12} mo`);
                    toast('Result copied to clipboard');
                    if (onSaveHistory) onSaveHistory(`Amortization: ${currency}${results.monthlyPayment.toFixed(0)}/mo, ${Math.floor(results.payoffMonths / 12)}yr payoff`);
                  }}
                  className="w-full text-xs"
                >
                  Copy Summary
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Principal vs interest chart */}
        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-3">
            Annual Principal vs Interest
          </h3>
          <BarChart
            series={[
              { name: 'Principal', points: yearly.map((y) => ({ label: y.label, value: y.principal })), color: '#6366f1' },
              { name: 'Interest', points: yearly.map((y) => ({ label: y.label, value: y.interest })), color: '#d4d4d8' },
            ]}
            xLabels={yearly.map((y) => y.label)}
            height={260}
            showLegend
            unit={currency}
          />
        </div>

        {/* Full monthly schedule */}
        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-3">
            Monthly Schedule ({results.rows.length} payments)
          </h3>
          <div className="overflow-x-auto max-h-[420px] rounded-lg border border-zinc-200 dark:border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="font-mono text-xs sticky top-0 bg-zinc-50 dark:bg-zinc-900">
                  <TableHead>#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Cum. Interest</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-mono text-xs">
                {results.rows.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="text-zinc-500">{row.month}</TableCell>
                    <TableCell className="tabular-nums">{(row as any).date}</TableCell>
                    <TableCell className="tabular-nums">{currency}{row.payment.toFixed(2)}</TableCell>
                    <TableCell className="tabular-nums">{currency}{row.principal.toFixed(2)}</TableCell>
                    <TableCell className="text-brand tabular-nums">{currency}{row.interest.toFixed(2)}</TableCell>
                    <TableCell className="tabular-nums text-zinc-500">{currency}{row.cumulativeInterest.toFixed(0)}</TableCell>
                    <TableCell className="font-bold tabular-nums">{currency}{row.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Amortization Schedule"
        title="Amortization Summary"
        data={exportData}
        summaryText={`Amortization:\nLoan: ${currency}${(parseFloat(principal) || 0).toLocaleString()} @ ${rate}% / ${years} yrs\nMonthly payment: ${currency}${results.monthlyPayment.toFixed(2)}\nTotal interest: ${currency}${results.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
      />
    </Card>
  );
};
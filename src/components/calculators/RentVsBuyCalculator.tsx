import React, { useState, useMemo } from 'react';
import { RotateCcw, Share2, Scale } from 'lucide-react';
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
import { rentVsBuy } from '../../lib/mortgage';
import { useToast } from '../ui/toast';

interface RentVsBuyCalculatorProps {
  slug?: string;
  onSaveHistory?: (summary: string) => void;
}

export const RentVsBuyCalculator: React.FC<RentVsBuyCalculatorProps> = ({
  slug = 'rent-vs-buy-calculator',
  onSaveHistory,
}) => {
  const currency = useCurrency();
  const { toast } = useToast();

  const initial = {
    price: '350000',
    downPct: '20',
    rate: '6.5',
    years: '30',
    taxPct: '1.1',
    insurance: '1200',
    rent: '1600',
    rentGrowth: '3',
    horizon: '10',
  };
  const { values: urlValues, syncUrl } = useUrlState(initial, []);

  const [price, setPrice] = useState<string>(() => urlValues.price ?? initial.price);
  const [downPct, setDownPct] = useState<string>(() => urlValues.downPct ?? initial.downPct);
  const [rate, setRate] = useState<string>(() => urlValues.rate ?? initial.rate);
  const [years, setYears] = useState<string>(() => urlValues.years ?? initial.years);
  const [taxPct, setTaxPct] = useState<string>(() => urlValues.taxPct ?? initial.taxPct);
  const [insurance, setInsurance] = useState<string>(() => urlValues.insurance ?? initial.insurance);
  const [rent, setRent] = useState<string>(() => urlValues.rent ?? initial.rent);
  const [rentGrowth, setRentGrowth] = useState<string>(() => urlValues.rentGrowth ?? initial.rentGrowth);
  const [horizon, setHorizon] = useState<string>(() => urlValues.horizon ?? initial.horizon);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const values = () => ({ price, downPct, rate, years, taxPct, insurance, rent, rentGrowth, horizon });

  const results = useMemo(() => {
    return rentVsBuy({
      homePrice: Math.max(0, parseFloat(price) || 0),
      downPaymentPercent: Math.max(0, parseFloat(downPct) || 0),
      annualRate: Math.max(0, parseFloat(rate) || 0),
      years: Math.max(1, parseInt(years) || 30),
      annualTaxPercent: Math.max(0, parseFloat(taxPct) || 0),
      annualInsurance: Math.max(0, parseFloat(insurance) || 0),
      monthlyRent: Math.max(0, parseFloat(rent) || 0),
      rentIncreasePercent: Math.max(0, parseFloat(rentGrowth) || 0),
      horizonYears: Math.max(1, parseInt(horizon) || 10),
    });
  }, [price, downPct, rate, years, taxPct, insurance, rent, rentGrowth, horizon]);

  const handleReset = () => {
    setPrice(initial.price);
    setDownPct(initial.downPct);
    setRate(initial.rate);
    setYears(initial.years);
    setTaxPct(initial.taxPct);
    setInsurance(initial.insurance);
    setRent(initial.rent);
    setRentGrowth(initial.rentGrowth);
    setHorizon(initial.horizon);
    syncUrl(initial);
  };

  const onChange = (setter: (v: string) => void, key: string, v: string) => {
    setter(v);
    syncUrl({ ...values(), [key]: v });
  };

  const lastIdx = results.buyCumulative.length - 1;
  const finalBuy = lastIdx >= 0 ? results.buyCumulative[lastIdx] : 0;
  const finalRent = lastIdx >= 0 ? results.rentCumulative[lastIdx] : 0;
  const finalEquity = lastIdx >= 0 ? results.buyEquity[lastIdx] : 0;
  const netBuyCost = Math.max(0, finalBuy - finalEquity);
  const winner = finalRent > netBuyCost ? 'Buy' : 'Rent';

  const buySeries = results.buyCumulative.map((v, i) => ({ label: results.labels[i], value: v }));
  const rentSeries = results.rentCumulative.map((v, i) => ({ label: results.labels[i], value: v }));
  const equitySeries = results.buyEquity.map((v, i) => ({ label: results.labels[i], value: v }));

  const exportData: Record<string, string> = {
    'Home Price': `${currency}${(parseFloat(price) || 0).toLocaleString()}`,
    'Down Payment': `${downPct}%`,
    'Interest Rate': `${rate}%`,
    'Monthly Rent': `${currency}${(parseFloat(rent) || 0).toLocaleString()}`,
    'Rent Growth': `${rentGrowth}%/yr`,
    'Horizon': `${horizon} years`,
    'Total Rent Cost': `${currency}${finalRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    'Total Buy Cost': `${currency}${finalBuy.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    'Equity at End': `${currency}${finalEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    'Winner': winner,
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Home Buying
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Cumulative Cost</span>
          </div>
          <CardTitle className="text-xl">Rent vs Buy Calculator</CardTitle>
          <CardDescription>
            Compare the total cost of renting against owning, including equity gained.
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
                <Label htmlFor="rvb-price">Home Price ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="rvb-price"
                    type="number"
                    min="0"
                    step="10000"
                    value={price}
                    onChange={(e) => onChange(setPrice, 'price', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rvb-rent">Monthly Rent ({currency})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                  <Input
                    id="rvb-rent"
                    type="number"
                    min="0"
                    step="100"
                    value={rent}
                    onChange={(e) => onChange(setRent, 'rent', e.target.value)}
                    className="pl-7 font-mono font-bold text-sm tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="rvb-down">Down (%)</Label>
                <Input
                  id="rvb-down"
                  type="number"
                  min="0"
                  max="80"
                  value={downPct}
                  onChange={(e) => onChange(setDownPct, 'downPct', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rvb-rate">Rate (%)</Label>
                <Input
                  id="rvb-rate"
                  type="number"
                  min="0"
                  max="20"
                  step="0.05"
                  value={rate}
                  onChange={(e) => onChange(setRate, 'rate', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rvb-years">Term (yrs)</Label>
                <Input
                  id="rvb-years"
                  type="number"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => onChange(setYears, 'years', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="rvb-tax">Property Tax (%)</Label>
                <Input
                  id="rvb-tax"
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
                <Label htmlFor="rvb-insurance">Annual Insurance ({currency})</Label>
                <Input
                  id="rvb-insurance"
                  type="number"
                  min="0"
                  step="100"
                  value={insurance}
                  onChange={(e) => onChange(setInsurance, 'insurance', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="rvb-growth">Rent Increase (%/yr)</Label>
                <Input
                  id="rvb-growth"
                  type="number"
                  min="0"
                  max="15"
                  step="0.5"
                  value={rentGrowth}
                  onChange={(e) => onChange(setRentGrowth, 'rentGrowth', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rvb-horizon">Time Horizon (yrs)</Label>
                <Input
                  id="rvb-horizon"
                  type="number"
                  min="1"
                  max="40"
                  value={horizon}
                  onChange={(e) => onChange(setHorizon, 'horizon', e.target.value)}
                  className="font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
              <Scale className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                Renting costs only what you pay monthly; buying requires a down payment up front but builds
                equity. This tool compares total cash spent over your horizon, subtracting equity from the
                buy side.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Over {horizon} Years</span>
                  <span className="text-emerald-400 font-semibold">{winner} wins</span>
                </div>

                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Net Cost of Buying
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                    {currency}{netBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono mt-1 font-medium">
                    vs {currency}{finalRent.toLocaleString('en-US', { maximumFractionDigits: 0 })} in rent
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Total Rent Cost:</span>
                    <span className="font-bold text-zinc-100 tabular-nums">{currency}{finalRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Total Buy Cost:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{finalBuy.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Equity Gained:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">{currency}{finalEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Buy-Payback Crossover:</span>
                    <span className="font-bold text-white tabular-nums">
                      {results.crossoverMonth > 0 ? `${Math.ceil(results.crossoverMonth / 12)} yrs` : 'After horizon'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`Rent vs Buy over ${horizon} years:\nRent total: ${currency}${finalRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nBuy net: ${currency}${netBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nWinner: ${winner}`);
                    toast('Result copied to clipboard');
                    if (onSaveHistory) onSaveHistory(`Rent vs Buy: ${winner} over ${horizon} yrs (rent ${currency}${finalRent.toLocaleString('en-US', { maximumFractionDigits: 0 })})`);
                  }}
                  className="w-full text-xs"
                >
                  Copy Summary
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cumulative cost chart */}
        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-3">
            Cumulative Cost: Rent vs Buy
          </h3>
          <AreaChart
            series={[
              { name: 'Rent (cumulative)', points: rentSeries, color: '#a1a1aa' },
              { name: 'Buy (cumulative)', points: buySeries, color: '#059669' },
              { name: 'Equity', points: equitySeries, color: '#10B981' },
            ]}
            xLabels={results.labels}
            height={260}
            showLegend
            unit={currency}
          />
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Rent vs Buy"
        title="Rent vs Buy Summary"
        data={exportData}
        summaryText={`Rent vs Buy (${horizon} yrs):\nRent: ${currency}${finalRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nBuy (net of equity): ${currency}${netBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}\nWinner: ${winner}`}
      />
    </Card>
  );
};
import React, { useState, useMemo } from 'react';
import { Users, DollarSign, Copy, Check, RotateCcw, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useCurrency } from '../../lib/currency';
import { useToast } from '../ui/toast';

interface TipCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

export const TipCalculator: React.FC<TipCalculatorProps> = ({ onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();
  const [billAmount, setBillAmount] = useState<string>('84.50');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [roundUp, setRoundUp] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const activeTipPercent = customTip !== '' ? Math.max(0, Number(customTip) || 0) : tipPercent;

  const results = useMemo(() => {
    const rawBill = parseFloat(billAmount);
    const bill = isNaN(rawBill) || rawBill < 0 ? 0 : rawBill;
    const people = Math.max(1, peopleCount || 1);

    let rawTip = bill * (activeTipPercent / 100);
    let total = bill + rawTip;

    if (roundUp && total > 0) {
      const roundedTotal = Math.ceil(total);
      rawTip = Math.max(0, roundedTotal - bill);
      total = roundedTotal;
    }

    const tipPerPerson = rawTip / people;
    const totalPerPerson = total / people;
    const billPerPerson = bill / people;

    return {
      bill,
      tipAmount: rawTip,
      total,
      people,
      tipPerPerson,
      totalPerPerson,
      billPerPerson,
      effectiveTipPercent: bill > 0 ? (rawTip / bill) * 100 : activeTipPercent,
    };
  }, [billAmount, activeTipPercent, peopleCount, roundUp]);

  const presetTips = [10, 15, 18, 20, 25];

  const handleCopySummary = () => {
    const text = `Tip & Bill Split:\nTotal Bill: ${currency}${results.total.toFixed(2)} (${currency}${results.bill.toFixed(2)} + ${currency}${results.tipAmount.toFixed(2)} tip)\nSplit (${results.people} people): ${currency}${results.totalPerPerson.toFixed(2)}/person (${currency}${results.tipPerPerson.toFixed(2)} tip each)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);

    if (onSaveHistory) {
      onSaveHistory(`Split ${currency}${results.total.toFixed(2)} bill between ${results.people} people (${currency}${results.totalPerPerson.toFixed(2)}/each)`);
    }
  };

  const handleReset = () => {
    setBillAmount('50.00');
    setTipPercent(18);
    setCustomTip('');
    setPeopleCount(2);
    setRoundUp(false);
  };

  return (
    <Card id="tip-calculator-container" className="p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Dining & Split
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Live Math</span>
          </div>
          <CardTitle className="text-xl">Tip & Bill Splitter</CardTitle>
          <CardDescription>
            Compute accurate gratuity rates and divide totals per person.
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
            Share / Export
          </Button>
          <Button
            id="tip-reset-button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Inputs Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Bill Amount */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="tip-bill-input">Bill Subtotal ({currency})</Label>
                <span className="text-xs text-zinc-400 font-mono">Base amount</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">{currency}</span>
                <Input
                  id="tip-bill-input"
                  type="number"
                  step="0.01"
                  min="0"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-7 font-mono font-bold text-sm tabular-nums"
                />
              </div>
            </div>

            {/* Tip Percentage Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Gratuity Rate ({activeTipPercent}%)</Label>
                <span className="text-xs text-primary dark:text-primary-tint font-mono font-bold">
                  Tip: {currency}{results.tipAmount.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {presetTips.map((pct) => (
                  <Button
                    key={pct}
                    id={`tip-preset-${pct}`}
                    type="button"
                    variant={customTip === '' && tipPercent === pct ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setTipPercent(pct);
                      setCustomTip('');
                    }}
                    className="font-mono text-xs h-8"
                  >
                    {pct}%
                  </Button>
                ))}
              </div>

              {/* Custom Tip Input */}
              <div className="pt-1 flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 font-semibold whitespace-nowrap">
                  Custom %:
                </span>
                <div className="relative flex-1">
                  <Input
                    id="tip-custom-input"
                    type="number"
                    min="0"
                    max="100"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    placeholder="e.g. 22"
                    className="font-mono font-bold text-xs h-8 pr-7"
                  />
                  <span className="absolute right-2.5 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
                </div>
              </div>
            </div>

            {/* Number of People Split */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tip-people-count">Split Count</Label>
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 font-semibold">
                  {peopleCount} {peopleCount === 1 ? 'person' : 'people'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  id="tip-people-decrease"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPeopleCount((p) => Math.max(1, p - 1))}
                  disabled={peopleCount <= 1}
                  className="w-9 h-9 font-bold"
                >
                  -
                </Button>
                <div className="relative flex-1">
                  <Input
                    id="tip-people-count"
                    type="number"
                    min="1"
                    max="100"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center font-mono font-bold text-sm h-9 tabular-nums"
                  />
                </div>
                <Button
                  id="tip-people-increase"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPeopleCount((p) => Math.min(100, p + 1))}
                  className="w-9 h-9 font-bold"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Round up checkbox */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <input
                  id="tip-round-up-toggle"
                  type="checkbox"
                  checked={roundUp}
                  onChange={(e) => setRoundUp(e.target.checked)}
                  className="rounded border-zinc-300 text-primary focus:ring-primary-tint"
                />
                <Label htmlFor="tip-round-up-toggle" className="cursor-pointer text-xs font-medium">
                  Round up grand total to next whole dollar
                </Label>
              </div>
              {roundUp && (
                <Badge variant="outline" className="text-[10px] font-mono font-semibold">
                  Active
                </Badge>
              )}
            </div>
          </div>

          {/* Right Output Panel */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                  <span>Per Person Breakdown</span>
                  <span className="inline-flex items-center gap-1 text-zinc-200 font-semibold">
                    <Users className="w-3.5 h-3.5 text-primary-on-dark" /> {results.people} {results.people === 1 ? 'diner' : 'diners'}
                  </span>
                </div>

                {/* Main Total Per Person */}
                <div className="my-4 text-center">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1 font-semibold">
                    Total Due Per Person
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                    {currency}{results.totalPerPerson.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-primary-on-dark font-mono mt-1 font-semibold">
                    Includes {currency}{results.tipPerPerson.toFixed(2)} tip share
                  </p>
                </div>

                {/* Summary Breakdown */}
                <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Bill Share:</span>
                    <span className="font-bold tabular-nums">{currency}{results.billPerPerson.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-200">
                    <span className="text-zinc-400">Tip Share ({results.effectiveTipPercent.toFixed(1)}%):</span>
                    <span className="font-bold text-primary-on-dark tabular-nums">{currency}{results.tipPerPerson.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-100 pt-2 border-t border-zinc-800">
                    <span className="font-semibold">Full Check Total:</span>
                    <span className="font-bold text-white tabular-nums">{currency}{results.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300 text-[11px]">
                    <span className="text-zinc-400">Total Tip Combined:</span>
                    <span className="font-mono tabular-nums text-primary-on-dark font-bold">{currency}{results.tipAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-zinc-800">
                <Button
                  id="tip-copy-button"
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleCopySummary}
                  className="w-full text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Split Result'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Tip & Bill Splitter"
        title="Restaurant Bill & Tip Summary"
        data={{
          'Subtotal Bill': `${currency}${results.bill.toFixed(2)}`,
          'Tip Rate': `${results.effectiveTipPercent.toFixed(1)}%`,
          'Total Tip Amount': `${currency}${results.tipAmount.toFixed(2)}`,
          'Grand Total': `${currency}${results.total.toFixed(2)}`,
          'Diners Split': results.people,
          'Total Per Diner': `${currency}${results.totalPerPerson.toFixed(2)}`,
          'Tip Per Diner': `${currency}${results.tipPerPerson.toFixed(2)}`,
        }}
        summaryText={`Tip & Bill Split:\nTotal Bill: ${currency}${results.total.toFixed(2)} (${currency}${results.bill.toFixed(2)} + ${currency}${results.tipAmount.toFixed(2)} tip)\nSplit (${results.people} people): ${currency}${results.totalPerPerson.toFixed(2)}/person (${currency}${results.tipPerPerson.toFixed(2)} tip each)`}
      />
    </Card>
  );
};

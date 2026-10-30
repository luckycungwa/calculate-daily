import React, { useState } from 'react';
import { Percent, RotateCcw, Copy, Check, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useToast } from '../ui/toast';

interface PercentageCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

export const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  // Mode 1: What is X% of Y?
  const [m1Pct, setM1Pct] = useState<string>('15');
  const [m1Val, setM1Val] = useState<string>('240');

  // Mode 2: X is what % of Y?
  const [m2Val1, setM2Val1] = useState<string>('45');
  const [m2Val2, setM2Val2] = useState<string>('180');

  // Mode 3: % Increase/Decrease from X to Y
  const [m3Val1, setM3Val1] = useState<string>('80');
  const [m3Val2, setM3Val2] = useState<string>('100');

  const [copiedMode, setCopiedMode] = useState<number | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Math 1
  const m1Result = ((parseFloat(m1Pct) || 0) / 100) * (parseFloat(m1Val) || 0);

  // Math 2
  const v2Denominator = parseFloat(m2Val2) || 0;
  const m2Result =
    v2Denominator !== 0
      ? ((parseFloat(m2Val1) || 0) / v2Denominator) * 100
      : 0;

  // Math 3
  const v1 = parseFloat(m3Val1) || 0;
  const v2 = parseFloat(m3Val2) || 0;
  const m3Diff = v2 - v1;
  const m3Pct = v1 !== 0 ? (m3Diff / Math.abs(v1)) * 100 : 0;
  const isIncrease = m3Diff >= 0;

  const handleCopy = (mode: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMode(mode);
    toast('Result copied to clipboard');
    setTimeout(() => setCopiedMode(null), 2000);
    if (onSaveHistory) onSaveHistory(text);
  };

  const handleReset = () => {
    setM1Pct('15');
    setM1Val('240');
    setM2Val1('45');
    setM2Val2('180');
    setM3Val1('80');
    setM3Val2('100');
  };

  return (
    <Card id="percentage-calculator-container" className="p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              3-in-1 Math Toolkit
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Ratios & Deltas</span>
          </div>
          <CardTitle className="text-xl">Percentage Calculator</CardTitle>
          <CardDescription>
            Compute portions, fractional shares, and relative delta fluctuations.
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
            id="percentage-reset-button"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: What is X% of Y? */}
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  1. Value Portion
                </span>
                <Badge variant="outline" className="text-[10px] font-mono font-semibold">X% of Y</Badge>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="pct-m1-rate" className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold">Percentage (%)</Label>
                  <div className="relative">
                    <Input
                      id="pct-m1-rate"
                      type="number"
                      value={m1Pct}
                      onChange={(e) => setM1Pct(e.target.value)}
                      className="h-8 font-mono font-bold text-xs pr-7 tabular-nums"
                    />
                    <span className="absolute right-2.5 top-2 text-xs font-mono font-bold text-zinc-400">%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pct-m1-base" className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold">Base Number</Label>
                  <Input
                    id="pct-m1-base"
                    type="number"
                    value={m1Val}
                    onChange={(e) => setM1Val(e.target.value)}
                    className="h-8 font-mono font-bold text-xs tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold uppercase">Calculated Portion</div>
              <div className="text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-50 my-1 tabular-nums">
                {m1Result.toFixed(2)}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleCopy(1, `${m1Pct}% of ${m1Val} = ${m1Result.toFixed(2)}`)}
                className="w-full text-xs h-7 mt-2"
              >
                {copiedMode === 1 ? <Check className="w-3 h-3 text-brand" /> : <Copy className="w-3 h-3" />}
                {copiedMode === 1 ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Card 2: X is what % of Y? */}
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  2. Share of Total
                </span>
                <Badge variant="outline" className="text-[10px] font-mono font-semibold">X is ?% of Y</Badge>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="pct-m2-part" className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold">Part (Numerator)</Label>
                  <Input
                    id="pct-m2-part"
                    type="number"
                    value={m2Val1}
                    onChange={(e) => setM2Val1(e.target.value)}
                    className="h-8 font-mono font-bold text-xs tabular-nums"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pct-m2-total" className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold">Total (Denominator)</Label>
                  <Input
                    id="pct-m2-total"
                    type="number"
                    value={m2Val2}
                    onChange={(e) => setM2Val2(e.target.value)}
                    className="h-8 font-mono font-bold text-xs tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold uppercase">Equivalent Share</div>
              <div className="text-2xl font-bold font-mono text-zinc-950 dark:text-zinc-50 my-1 tabular-nums">
                {m2Result.toFixed(2)}%
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleCopy(2, `${m2Val1} is ${m2Result.toFixed(2)}% of ${m2Val2}`)}
                className="w-full text-xs h-7 mt-2"
              >
                {copiedMode === 2 ? <Check className="w-3 h-3 text-brand" /> : <Copy className="w-3 h-3" />}
                {copiedMode === 2 ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Card 3: % Increase/Decrease */}
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  3. Delta Change
                </span>
                <Badge variant="outline" className="text-[10px] font-mono font-semibold">% From X to Y</Badge>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="pct-m3-from" className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold">Initial Value (From)</Label>
                  <Input
                    id="pct-m3-from"
                    type="number"
                    value={m3Val1}
                    onChange={(e) => setM3Val1(e.target.value)}
                    className="h-8 font-mono font-bold text-xs tabular-nums"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pct-m3-to" className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold">Final Value (To)</Label>
                  <Input
                    id="pct-m3-to"
                    type="number"
                    value={m3Val2}
                    onChange={(e) => setM3Val2(e.target.value)}
                    className="h-8 font-mono font-bold text-xs tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold uppercase flex items-center gap-1">
                {isIncrease ? <TrendingUp className="w-3.5 h-3.5 text-brand" /> : <TrendingDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
                <span className="font-bold">{isIncrease ? 'Increase' : 'Decrease'}</span>
              </div>
              <div className={`text-2xl font-bold font-mono my-1 tabular-nums ${isIncrease ? 'text-brand' : 'text-rose-700 dark:text-rose-400'}`}>
                {isIncrease ? '+' : ''}{m3Pct.toFixed(2)}%
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleCopy(3, `Change from ${m3Val1} to ${m3Val2} = ${m3Pct.toFixed(2)}%`)}
                className="w-full text-xs h-7 mt-2"
              >
                {copiedMode === 3 ? <Check className="w-3 h-3 text-brand" /> : <Copy className="w-3 h-3" />}
                {copiedMode === 3 ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Percentage Calculator"
        title="Percentage Calculations Overview"
        data={{
          'Portion Formula': `${m1Pct}% of ${m1Val} = ${m1Result.toFixed(2)}`,
          'Share Formula': `${m2Val1} is ${m2Result.toFixed(2)}% of ${m2Val2}`,
          'Delta Change': `${m3Val1} -> ${m3Val2} (${isIncrease ? '+' : ''}${m3Pct.toFixed(2)}%)`,
        }}
        summaryText={`Percentage Math Summary:\n1) ${m1Pct}% of ${m1Val} = ${m1Result.toFixed(2)}\n2) ${m2Val1} is ${m2Result.toFixed(2)}% of ${m2Val2}\n3) Change from ${m3Val1} to ${m3Val2} is ${isIncrease ? '+' : ''}${m3Pct.toFixed(2)}%`}
      />
    </Card>
  );
};

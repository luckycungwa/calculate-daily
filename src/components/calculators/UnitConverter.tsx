import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, ArrowDownUp, Share2 } from 'lucide-react';
import { UNIT_GROUPS } from '../../data/unitGroups';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useToast } from '../ui/toast';

interface UnitConverterProps {
  name: string;
  unitGroup: string;
  defaultFrom?: string;
  defaultTo?: string;
  onSaveHistory?: (summary: string) => void;
}

export const UnitConverter: React.FC<UnitConverterProps> = ({
  name,
  unitGroup,
  defaultFrom,
  defaultTo,
  onSaveHistory,
}) => {
  const { toast } = useToast();
  const group = UNIT_GROUPS[unitGroup];

  const [fromUnit, setFromUnit] = useState<string>(defaultFrom || group.units[0].value);
  const [toUnit, setToUnit] = useState<string>(defaultTo || group.units[1].value);
  const [value, setValue] = useState<string>('1');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const from = group.units.find((u) => u.value === fromUnit)!;
  const to = group.units.find((u) => u.value === toUnit)!;

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (!Number.isFinite(num)) return 0;
    const inBase = num * from.toBaseFactor + (from.toBaseOffset || 0);
    const out = (inBase - (to.toBaseOffset || 0)) / to.toBaseFactor;
    return Number.isFinite(out) ? out : 0;
  }, [value, from, to]);

  const formattedResult = result.toLocaleString('en-US', { maximumFractionDigits: 4 });

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setValue('1');
    setFromUnit(group.units[0].value);
    setToUnit(group.units[1].value);
  };

  const handleCopy = () => {
    const text = `${name}: ${value} ${from.label} = ${formattedResult} ${to.label}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) {
      onSaveHistory(`${name}: ${text}`);
    }
  };

  const exportData: Record<string, string | number> = {
    Value: `${value} ${from.label}`,
    'Converted To': `${formattedResult} ${to.label}`,
    Group: group.name,
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Unit Converter
            </Badge>
            <span className="text-xs font-mono text-zinc-500">{group.name}</span>
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>
            Convert between any two {group.name.toLowerCase()} units instantly.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={handleReset} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor={`uc-${unitGroup}-value`}>Value</Label>
              <Input
                id={`uc-${unitGroup}-value`}
                type="number"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="font-mono font-bold text-sm tabular-nums"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-3">
              <div className="space-y-1.5">
                <Label htmlFor={`uc-${unitGroup}-from`}>From</Label>
                <select
                  id={`uc-${unitGroup}-from`}
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary-tint shadow-xs cursor-pointer"
                >
                  {group.units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwap}
                aria-label="Swap units"
                className="h-9 w-9 shrink-0"
              >
                <ArrowDownUp className="w-4 h-4" />
              </Button>

              <div className="space-y-1.5">
                <Label htmlFor={`uc-${unitGroup}-to`}>To</Label>
                <select
                  id={`uc-${unitGroup}-to`}
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary-tint shadow-xs cursor-pointer"
                >
                  {group.units.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Converted Value
              </span>

              <div className="my-4 text-center">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {formattedResult}
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">
                  {to.label}
                </p>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center text-xs font-mono text-zinc-300">
                {value} {from.value} = {formattedResult} {to.value}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <Button
                id="uc-copy-button"
                type="button"
                variant="primary"
                size="sm"
                onClick={handleCopy}
                className="w-full text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Result' : 'Copy Result'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName={name}
        title={`${name} Breakdown`}
        data={exportData}
        summaryText={`${name}: ${value} ${from.label} = ${formattedResult} ${to.label}`}
      />
    </Card>
  );
};
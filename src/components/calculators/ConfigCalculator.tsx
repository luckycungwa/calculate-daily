import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Code2, Share2, Info } from 'lucide-react';
import { ConfigCalculatorSpec } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { ShareButton } from '../common/ShareButton';
import { ScenarioCompare } from '../common/ScenarioCompare';
import { useCurrency, applyCurrency } from '../../lib/currency';
import { useUrlState, parseParamNumber, buildShareUrl } from '../../lib/share';
import { useToast } from '../ui/toast';

interface ConfigCalculatorProps {
  name: string;
  slug: string;
  spec: ConfigCalculatorSpec;
  onSaveHistory?: (summary: string) => void;
}

export const ConfigCalculator: React.FC<ConfigCalculatorProps> = ({ name, slug, spec, onSaveHistory }) => {
  const currency = useCurrency();
  const { toast } = useToast();

  const initialParams = (): Record<string, string | number | boolean> => {
    const out: Record<string, string | number | boolean> = {};
    spec.fields.forEach((f) => {
      out[f.id] = f.defaultValue;
    });
    return out;
  };

  const { values: urlValues, syncUrl } = useUrlState(initialParams(), [spec]);

  const [formValues, setFormValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    spec.fields.forEach((f) => {
      const saved = urlValues[f.id];
      initial[f.id] = saved !== undefined ? parseParamNumber(saved, f.defaultValue) : f.defaultValue;
    });
    return initial;
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [showCompare, setShowCompare] = useState<boolean>(false);

  const evaluatedResults = useMemo(() => {
    const keys = Object.keys(formValues);
    const vals = Object.values(formValues);
    return spec.results.map((r) => {
      try {
        const evaluator = new Function(
          ...keys,
          `"use strict"; return (${r.formulaCode});`
        );
        const out = evaluator(...vals);
        return typeof out === 'number' ? out : NaN;
      } catch {
        return NaN;
      }
    });
  }, [formValues, spec.results]);

  const handleInputChange = (fieldId: string, val: string) => {
    const num = parseFloat(val) || 0;
    const next = {
      ...formValues,
      [fieldId]: num,
    };
    setFormValues(next);
    syncUrl(next);
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    spec.fields.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    setFormValues(initial);
    syncUrl(initial);
  };

  const formatResult = (num: number, r: { prefix?: string; suffix?: string }) => {
    if (!Number.isFinite(num)) return 'Not calculable';
    const formatted = num.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return `${applyCurrency(r.prefix, currency) || ''}${formatted}${r.suffix ? ` ${r.suffix}` : ''}`;
  };

  const primaryResult = spec.results[0];
  const formattedPrimary = formatResult(evaluatedResults[0] ?? 0, primaryResult);

  const handleCopy = () => {
    const text = `${name} Result: ${formattedPrimary}\nFormula: ${spec.formulaDescription}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Result copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) {
      onSaveHistory(`${name}: ${formattedPrimary}`);
    }
  };

  const exportData: Record<string, string | number> = {};
  spec.fields.forEach((f) => {
    exportData[f.label] = `${formValues[f.id] ?? f.defaultValue}${f.unit ? ` ${f.unit}` : ''}`;
  });
  spec.results.forEach((r, idx) => {
    exportData[r.label] = formatResult(evaluatedResults[idx] ?? 0, r);
  });

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              Interactive Tool
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Live Calculation</span>
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{spec.formulaDescription}</CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowCompare(!showCompare)} className="text-xs">
            <Code2 className="w-3.5 h-3.5" />
            {showCompare ? 'Hide Compare' : 'Compare'}
          </Button>
          <ShareButton
            path={`/calculators/${slug}`}
            state={formValues}
            className="text-xs"
            label="Share"
            showPrint
          />
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
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {spec.fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`config-${name}-${field.id}`}>{field.label}</Label>
                    {(field.unit || field.suffix) && (
                      <span className="text-xs text-zinc-400 font-mono">{field.unit || field.suffix}</span>
                    )}
                  </div>
                  <div className="relative">
                    {field.prefix && (
                      <span className="absolute left-3 top-2 text-xs font-mono font-bold text-zinc-400">
                        {applyCurrency(field.prefix, currency)}
                      </span>
                    )}
                    <Input
                      id={`config-${name}-${field.id}`}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step || 'any'}
                      value={formValues[field.id] ?? field.defaultValue}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className={`font-mono font-bold text-sm tabular-nums ${
                        field.prefix ? 'pl-7' : ''
                      }`}
                    />
                    {(field.unit || field.suffix) && (
                      <span className="absolute right-3 top-2 text-xs font-mono text-zinc-400">
                        {field.unit || field.suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
              <Code2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[11px] font-bold text-zinc-900 dark:text-white block">
                  Evaluated Formula:
                </span>
                <span className="font-mono text-[11px] text-zinc-500">{spec.formulaDescription}</span>
              </div>
            </div>

            {spec.tips && spec.tips.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Guidance:
                </span>
                {spec.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                {primaryResult.label}
              </span>

              <div className="my-4 text-center">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {formattedPrimary}
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">Calculated instantly</p>
              </div>

              {spec.results.length > 1 && (
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  {spec.results.slice(1).map((r, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">{r.label}</span>
                      <span className="text-white font-bold tabular-nums">
                        {formatResult(evaluatedResults[idx + 1] ?? 0, r)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <Button
                id="config-copy-button"
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
        summaryText={`${name} Result: ${formattedPrimary}\nFormula: ${spec.formulaDescription}`}
      />

      {showCompare && (
        <div className="border-t border-zinc-100 dark:border-zinc-800">
          <ScenarioCompare spec={spec} />
        </div>
      )}
    </Card>
  );
};
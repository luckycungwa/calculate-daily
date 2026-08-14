import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Code2, Share2, Info } from 'lucide-react';
import { DynamicAiCalculatorSpec } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';

interface DynamicAiCalculatorProps {
  spec: DynamicAiCalculatorSpec;
  onSaveHistory?: (summary: string) => void;
}

export const DynamicAiCalculator: React.FC<DynamicAiCalculatorProps> = ({ spec, onSaveHistory }) => {
  // Initialize input state from field definitions
  const [formValues, setFormValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    spec.fields.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    return initial;
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Safe evaluation of the formula
  const calculatedResult = useMemo(() => {
    try {
      const keys = Object.keys(formValues);
      const vals = Object.values(formValues);
      const evaluator = new Function(...keys, `
        try {
          const res = (${spec.formulaCode});
          return Number.isFinite(res) ? res : 0;
        } catch(e) {
          return 0;
        }
      `);
      return evaluator(...vals);
    } catch (err) {
      console.error('Calculation error:', err);
      return 0;
    }
  }, [formValues, spec.formulaCode]);

  const handleInputChange = (fieldId: string, val: string) => {
    const num = parseFloat(val) || 0;
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: num,
    }));
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    spec.fields.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    setFormValues(initial);
  };

  const formattedResultStr = `${spec.resultPrefix || ''}${
    typeof calculatedResult === 'number'
      ? calculatedResult.toLocaleString('en-US', { maximumFractionDigits: 2 })
      : calculatedResult
  }${spec.resultSuffix ? ` ${spec.resultSuffix}` : ''}`;

  const handleCopy = () => {
    const text = `${spec.title} Result: ${formattedResultStr}\nFormula: ${spec.formulaDescription}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onSaveHistory) {
      onSaveHistory(`${spec.title}: ${formattedResultStr}`);
    }
  };

  const exportData: Record<string, string | number> = {};
  spec.fields.forEach((f) => {
    exportData[f.label] = `${formValues[f.id] ?? f.defaultValue} ${f.unit || ''}`.trim();
  });
  exportData[spec.resultLabel] = formattedResultStr;

  return (
    <Card id="dynamic-ai-calculator-container" className="p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">
              AI Dynamic Synthesis
            </Badge>
            <span className="text-xs font-mono text-zinc-500">Auto Generated Schema</span>
          </div>
          <CardTitle className="text-xl">{spec.title}</CardTitle>
          <CardDescription>{spec.description}</CardDescription>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dynamic Fields List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {spec.fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                    {field.unit && <span className="text-xs text-zinc-400 font-mono">{field.unit}</span>}
                  </div>
                  <div className="relative">
                    <Input
                      id={`field-${field.id}`}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step || 'any'}
                      value={formValues[field.id] ?? field.defaultValue}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="font-mono font-bold text-sm tabular-nums pr-8"
                    />
                    {field.unit && (
                      <span className="absolute right-3 top-2 text-xs font-mono text-zinc-400">
                        {field.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Formula info banner */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
              <Code2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[11px] font-bold text-zinc-900 dark:text-white block">Evaluated Formula:</span>
                <span className="font-mono text-[11px] text-zinc-500">{spec.formulaDescription}</span>
              </div>
            </div>

            {/* Tips */}
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

          {/* Output Card */}
          <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                {spec.resultLabel}
              </span>

              <div className="my-4 text-center">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {formattedResultStr}
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">Calculated instantly</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <Button
                id="ai-calc-copy-button"
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

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName={spec.title}
        title={`${spec.title} Breakdown`}
        data={exportData}
        summaryText={`${spec.title} Result: ${formattedResultStr}\nFormula: ${spec.formulaDescription}`}
      />
    </Card>
  );
};

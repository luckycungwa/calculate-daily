import React, { useState, useMemo } from 'react';
import { Plus, Trash2, GitCompareArrows } from 'lucide-react';
import { ConfigCalculatorSpec, ConfigResult } from '../../types';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { BarChart } from '../charts';
import { useCurrency, applyCurrency } from '../../lib/currency';

export interface Scenario {
  name: string;
  values: Record<string, number>;
}

interface ScenarioCompareProps {
  spec: ConfigCalculatorSpec;
  className?: string;
}

function evaluate(spec: ConfigCalculatorSpec, values: Record<string, number>): number[] {
  const keys = Object.keys(values);
  const vals = Object.values(values);
  return spec.results.map((r) => {
    try {
      const evaluator = new Function(...keys, `"use strict"; return (${r.formulaCode});`);
      const out = evaluator(...vals);
      return typeof out === 'number' && Number.isFinite(out) ? out : 0;
    } catch {
      return 0;
    }
  });
}

function formatResult(num: number, r: ConfigResult, currency: string): string {
  const formatted = num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return `${applyCurrency(r.prefix, currency) || ''}${formatted}${r.suffix ? ` ${r.suffix}` : ''}`;
}

export const ScenarioCompare: React.FC<ScenarioCompareProps> = ({ spec, className }) => {
  const currency = useCurrency();

  const buildDefaultValues = (): Record<string, number> => {
    const initial: Record<string, number> = {};
    spec.fields.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    return initial;
  };

  const [scenarios, setScenarios] = useState<Scenario[]>([
    { name: 'Base Case', values: buildDefaultValues() },
  ]);
  const [editing, setEditing] = useState<Scenario>({
    name: 'Scenario',
    values: buildDefaultValues(),
  });
  const [draftName, setDraftName] = useState<string>('Scenario');

  const rows = useMemo(
    () =>
      scenarios.map((s) => ({
        scenario: s,
        results: evaluate(spec, s.values),
      })),
    [scenarios, spec]
  );

  const primaryLabel = spec.results[0]?.label ?? 'Primary';
  const chartData = rows.map((r) => ({
    label: r.scenario.name,
    value: r.results[0] ?? 0,
  }));

  const handleAdd = () => {
    if (draftName.trim() === '') return;
    setScenarios((prev) => [...prev, { name: draftName.trim(), values: { ...editing.values } }]);
    setDraftName(`Scenario ${scenarios.length + 1}`);
  };

  const handleRemove = (idx: number) => {
    setScenarios((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDraftField = (fieldId: string, val: string) => {
    const num = parseFloat(val) || 0;
    setEditing((prev) => ({ ...prev, values: { ...prev.values, [fieldId]: num } }));
  };

  const handleResetDraft = () => {
    setEditing({ name: draftName, values: buildDefaultValues() });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <GitCompareArrows className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
          <CardTitle className="text-base">Scenario Compare</CardTitle>
          <Badge variant="outline" className="text-[10px] font-mono">
            Side-by-Side
          </Badge>
        </div>
        <CardDescription>
          Model multiple sets of inputs and compare every result in one view.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Draft scenario editor */}
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Label>New Scenario</Label>
            <Input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="e.g. Higher rate, Longer term"
              className="h-8 max-w-[240px] text-xs font-mono"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {spec.fields.map((f) => (
              <div key={f.id} className="space-y-1">
                <Label className="text-[11px] font-mono text-zinc-500">{f.label}</Label>
                <Input
                  type="number"
                  min={f.min}
                  max={f.max}
                  step={f.step || 'any'}
                  value={editing.values[f.id] ?? f.defaultValue}
                  onChange={(e) => handleDraftField(f.id, e.target.value)}
                  className="h-8 font-mono text-xs tabular-nums"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleAdd} className="text-xs">
              <Plus className="w-3.5 h-3.5" />
              Add Scenario
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetDraft} className="text-xs">
              Reset Inputs
            </Button>
          </div>
        </div>

        {/* Comparison table */}
        {scenarios.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs font-mono">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left p-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Scenario
                  </th>
                  {spec.results.map((r) => (
                    <th key={r.label} className="text-right p-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                      {r.label}
                    </th>
                  ))}
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} className="border-b border-zinc-100 dark:border-zinc-800/60">
                    <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">{row.scenario.name}</td>
                    {row.results.map((v, ri) => (
                      <td
                        key={ri}
                        className={`text-right p-3 tabular-nums ${
                          ri === 0
                            ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                            : 'text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {formatResult(v, spec.results[ri], currency)}
                      </td>
                    ))}
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(idx)}
                        className="h-7 w-7"
                        aria-label={`Remove ${row.scenario.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-zinc-400 hover:text-rose-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Chart of the primary result */}
        {rows.length > 1 && (
          <div className="pt-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
              {primaryLabel} by Scenario
            </div>
            <BarChart
              series={[{ name: primaryLabel, points: chartData, type: 'bar' }]}
              xLabels={chartData.map((d) => d.label)}
              height={220}
              showLegend={false}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { countSignificantFigures, roundToSignificantFigures } from '../../lib/significantFigures';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

const RULES = [
  'Every non-zero digit is significant: 4.12 has three.',
  'Zeros between non-zero digits are significant: 4006 has four.',
  'Leading zeros are never significant: 0.0042 has two.',
  'Trailing zeros after a decimal point are significant: 2.500 has four.',
  'Trailing zeros in a whole number without a decimal point are ambiguous: 1500 could have two, three or four.',
];

export const SignificantFiguresCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [input, setInput] = useState('0.00450');
  const [targetFigures, setTargetFigures] = useState('3');

  const count = useMemo(() => {
    if (!input.trim()) return null;
    return countSignificantFigures(input);
  }, [input]);

  const rounding = useMemo(() => {
    if (!count || count.ambiguous || count.count === 0) {
      return { error: '', decimal: '', scientific: '', value: null as number | null };
    }
    const wanted = Number(targetFigures);
    if (!Number.isInteger(wanted) || wanted < 1 || wanted > 15) {
      return { error: 'Choose a whole number of significant figures from 1 to 15.', decimal: '', scientific: '', value: null };
    }
    const parsed = Number(input.replace(/,/g, '').trim());
    if (!Number.isFinite(parsed)) {
      return { error: 'Enter a plain number to round it.', decimal: '', scientific: '', value: null };
    }
    try {
      const result = roundToSignificantFigures(parsed, wanted);
      return { error: '', decimal: result.decimal, scientific: result.scientific, value: result.value };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unable to round this value.',
        decimal: '',
        scientific: '',
        value: null,
      };
    }
  }, [count, input, targetFigures]);

  const saveSummary = () => {
    if (!count) return;
    onSaveHistory?.(`Significant figures: ${input.trim()} has ${count.count}${count.ambiguous ? ' (ambiguous)' : ''}.`);
  };

  const invalid = input.trim().length > 0 && count === null;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">
          Precision
        </Badge>
        <CardTitle>Significant Figures Calculator</CardTitle>
        <CardDescription>
          Count the significant figures in a measurement and round it to a stated number of them.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="sigfig-input">Measured value</Label>
            <Input
              id="sigfig-input"
              type="text"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="0.00450"
            />
            <p className="text-[11px] text-zinc-500">
              Type the number exactly as it was written or measured, including trailing zeros and exponent notation.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sigfig-target">Round to</Label>
            <Input
              id="sigfig-target"
              type="number"
              min={1}
              max={15}
              step={1}
              value={targetFigures}
              onChange={(event) => setTargetFigures(event.target.value)}
            />
          </div>

          <Button variant="outline" size="sm" onClick={saveSummary} disabled={!count}>
            Save to history
          </Button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
          {invalid ? (
            <p role="alert" className="text-sm text-amber-700 dark:text-amber-300">
              That is not a number. Use digits with an optional decimal point and exponent, such as 0.00450 or 6.02e23.
            </p>
          ) : !count ? (
            <p className="text-sm text-zinc-500">Enter a value to count its significant figures.</p>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Significant figures</p>
                <p className="font-mono text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                  {count.count}
                </p>
              </div>

              {count.note && (
                <p
                  role={count.ambiguous ? 'alert' : undefined}
                  className="text-xs leading-relaxed text-amber-700 dark:text-amber-300"
                >
                  {count.note}
                </p>
              )}

              {count.count > 0 && (
                <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                  {rounding.error ? (
                    <p role="alert" className="text-xs text-amber-700 dark:text-amber-300">
                      {rounding.error}
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                        Rounded to {targetFigures} significant figure{Number(targetFigures) === 1 ? '' : 's'}
                      </p>
                      <p className="font-mono text-lg font-bold text-zinc-950 dark:text-zinc-50">
                        {rounding.scientific}
                      </p>
                      <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400">= {rounding.decimal}</p>
                      {rounding.value !== null && Number(targetFigures) > count.count && (
                        <p className="text-[11px] text-amber-700 dark:text-amber-300">
                          Rounding to more figures than were measured adds precision the input does not support.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xs font-bold text-zinc-950 dark:text-zinc-50">The rules this calculator applies</h3>
          <ul className="mt-2 space-y-1 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {RULES.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span aria-hidden="true" className="text-zinc-400">
                  •
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

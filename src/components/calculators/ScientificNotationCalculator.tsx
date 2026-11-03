import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  computeScientific,
  formatDecimal,
  formatENotation,
  formatEngineering,
  formatScientific,
  parseNumberInput,
  toScientificParts,
  type SciOp,
} from '../../lib/scientificNotation';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

const PRECISION_OPTIONS = [2, 3, 4, 5, 6, 8, 10];

function ResultRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 border-b border-zinc-100 last:border-b-0 dark:border-zinc-800">
      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">{label}</span>
      <span
        className={`font-mono break-all ${
          accent ? 'text-lg font-bold text-zinc-950 dark:text-zinc-50' : 'text-sm text-zinc-700 dark:text-zinc-300'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export const ScientificNotationCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const [rawValue, setRawValue] = useState('35000');
  const [precision, setPrecision] = useState(6);

  const [mantissaA, setMantissaA] = useState('3.5');
  const [exponentA, setExponentA] = useState('4');
  const [operation, setOperation] = useState<SciOp>('multiply');
  const [mantissaB, setMantissaB] = useState('2');
  const [exponentB, setExponentB] = useState('3');

  const conversion = useMemo(() => {
    if (!rawValue.trim()) return { error: '', value: null as number | null };
    const parsed = parseNumberInput(rawValue);
    if (parsed === null) {
      return {
        error: 'Enter a number such as 35000, 0.0045, 3.5e4, or 3.5 × 10^4.',
        value: null,
      };
    }
    return { error: '', value: parsed };
  }, [rawValue]);

  const arithmetic = useMemo(() => {
    const a = parseNumberInput(mantissaA);
    const b = parseNumberInput(mantissaB);
    const expA = parseNumberInput(exponentA);
    const expB = parseNumberInput(exponentB);

    if (a === null || b === null || expA === null || expB === null) {
      return { error: 'Each mantissa and exponent must be a number.', value: null as number | null };
    }
    if (!Number.isInteger(expA) || !Number.isInteger(expB)) {
      return { error: 'Exponents must be whole numbers.', value: null as number | null };
    }
    try {
      return { error: '', value: computeScientific(a, expA, operation, b, expB) };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unable to calculate.', value: null };
    }
  }, [mantissaA, mantissaB, exponentA, exponentB, operation]);

  const saveConversion = () => {
    if (conversion.value === null) return;
    onSaveHistory?.(`Scientific notation: ${formatDecimal(conversion.value)} = ${formatScientific(conversion.value, precision)}`);
  };

  const saveArithmetic = () => {
    if (arithmetic.value === null) return;
    onSaveHistory?.(`Scientific arithmetic: ${formatScientific(arithmetic.value, precision)}`);
  };

  const magnitude = conversion.value === null ? null : toScientificParts(conversion.value, precision);

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">
          Notation
        </Badge>
        <CardTitle>Scientific Notation Calculator</CardTitle>
        <CardDescription>
          Convert between decimal and scientific notation, or multiply, divide, add and subtract in scientific form.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-5">
        <section className="grid gap-5 md:grid-cols-2" aria-labelledby="convert-heading">
          <div className="space-y-4">
            <h3 id="convert-heading" className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
              1. Convert a number
            </h3>
            <div className="space-y-1.5">
              <Label htmlFor="sn-value">Number</Label>
              <Input
                id="sn-value"
                type="text"
                inputMode="text"
                autoComplete="off"
                spellCheck={false}
                value={rawValue}
                onChange={(event) => setRawValue(event.target.value)}
                placeholder="35000 or 3.5e4"
              />
              <p className="text-[11px] text-zinc-500">
                Accepts 35000, 0.0045, 3.5e4, 3.5E-4 or 3.5 × 10^4.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sn-precision">Mantissa precision</Label>
              <select
                id="sn-precision"
                value={precision}
                onChange={(event) => setPrecision(Number(event.target.value))}
                className="w-full h-9 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                {PRECISION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option} significant figures
                  </option>
                ))}
              </select>
            </div>
            <Button variant="outline" size="sm" onClick={saveConversion} disabled={conversion.value === null}>
              Save to history
            </Button>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
            {conversion.error ? (
              <p role="alert" className="text-sm text-amber-700 dark:text-amber-300">
                {conversion.error}
              </p>
            ) : (
              conversion.value !== null &&
              magnitude && (
                <div className="space-y-1">
                  <ResultRow label="Scientific notation" value={formatScientific(conversion.value, precision)} accent />
                  <ResultRow label="E-notation" value={formatENotation(conversion.value, precision)} />
                  <ResultRow label="Engineering notation" value={formatEngineering(conversion.value, precision)} />
                  <ResultRow label="Decimal" value={formatDecimal(conversion.value)} />
                  <ResultRow
                    label="Order of magnitude"
                    value={conversion.value === 0 ? '0' : `10^${magnitude.exponent}`}
                  />
                </div>
              )
            )}
          </div>
        </section>

        <section className="space-y-4 border-t border-zinc-100 pt-5 dark:border-zinc-800" aria-labelledby="arithmetic-heading">
          <h3 id="arithmetic-heading" className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
            2. Calculate with numbers in scientific notation
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="sn-a">First number</Label>
              <Input
                id="sn-a"
                value={mantissaA}
                onChange={(event) => setMantissaA(event.target.value)}
                inputMode="decimal"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sn-exp-a">× 10^</Label>
              <Input
                id="sn-exp-a"
                value={exponentA}
                onChange={(event) => setExponentA(event.target.value)}
                inputMode="numeric"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sn-op">Operation</Label>
              <select
                id="sn-op"
                value={operation}
                onChange={(event) => setOperation(event.target.value as SciOp)}
                className="w-full h-9 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="multiply">Multiply (×)</option>
                <option value="divide">Divide (÷)</option>
                <option value="add">Add (+)</option>
                <option value="subtract">Subtract (−)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sn-b">Second number</Label>
              <Input
                id="sn-b"
                value={mantissaB}
                onChange={(event) => setMantissaB(event.target.value)}
                inputMode="decimal"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sn-exp-b">× 10^</Label>
              <Input
                id="sn-exp-b"
                value={exponentB}
                onChange={(event) => setExponentB(event.target.value)}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
            {arithmetic.error ? (
              <p role="alert" className="text-sm text-amber-700 dark:text-amber-300">
                {arithmetic.error}
              </p>
            ) : (
              arithmetic.value !== null && (
                <div className="space-y-1">
                  <ResultRow label="Result" value={formatScientific(arithmetic.value, precision)} accent />
                  <ResultRow label="E-notation" value={formatENotation(arithmetic.value, precision)} />
                  <ResultRow label="Decimal" value={formatDecimal(arithmetic.value)} />
                </div>
              )
            )}
            <div className="pt-3">
              <Button variant="outline" size="sm" onClick={saveArithmetic} disabled={arithmetic.value === null}>
                Save to history
              </Button>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

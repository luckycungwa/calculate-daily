import React from 'react';
import { Table2 } from 'lucide-react';
import { UNIT_GROUPS } from '../../data/unitGroups';
import { Card, CardContent } from '../ui/card';

interface ConversionReferenceProps {
  unitGroup: string;
  from: string;
  to: string;
}

/**
 * A short unit label for the table and the quick answer ("kg", "ft", "C").
 * The full label from the unit group reads badly inside a table cell.
 */
function shortLabel(label: string): string {
  const match = label.match(/\(([^)]+)\)/);
  if (match) return match[1].replace(/\s+/g, '');
  const first = label.split(/[\s(/]/)[0];
  return first;
}

/**
 * Values worth showing for each source unit. The list is deliberately made of
 * numbers people actually look up - a person's weight, a road distance, a can
 * of beer - because a table of 1, 2, 3, 4 proves nothing to a reader.
 */
const COMMON_VALUES: Record<string, number[]> = {
  // Length
  m: [1, 2, 3, 5, 10, 20, 25, 50, 100, 200, 500, 1000],
  ft: [1, 2, 3, 6, 10, 20, 50, 100, 200, 500, 1000, 5280],
  in: [1, 2, 3, 4, 6, 12, 24, 36, 48, 60, 72],
  cm: [1, 2, 3, 5, 10, 30, 50, 100, 150, 200],
  mi: [1, 2, 5, 10, 20, 26.2, 50, 100, 200, 500],
  km: [1, 5, 10, 21.1, 42.2, 50, 100, 200, 500],
  yd: [1, 3, 5, 10, 30, 50, 100],
  mm: [1, 5, 10, 50, 100, 500],
  // Weight
  kg: [1, 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 200],
  lb: [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 100, 150, 200],
  oz: [1, 2, 4, 8, 12, 16, 32, 64],
  g: [1, 5, 10, 20, 50, 100, 250, 500, 1000],
  mg: [1, 10, 100, 500, 1000],
  st: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15],
  t: [1, 2, 5, 10, 20, 50, 100],
  // Volume
  gal: [1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50],
  l: [1, 2, 5, 10, 20, 25, 50, 100, 200],
  ml: [1, 5, 10, 30, 60, 100, 250, 500, 1000],
  cup: [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16],
  floz: [1, 2, 4, 8, 12, 16, 24, 32],
  tsp: [1, 2, 3, 4, 6, 8, 12],
  tbsp: [1, 2, 3, 4, 6, 8],
  pint: [1, 2, 3, 4, 5, 6, 8],
  quart: [1, 2, 3, 4, 5, 10],
  m3: [1, 2, 5, 10, 20, 50, 100],
  // Speed
  kmh: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130],
  mph: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100],
  kn: [1, 5, 10, 15, 20, 25, 30, 40, 50],
  mps: [1, 2, 5, 10, 15, 20, 25, 30, 40, 50],
  fps: [1, 5, 10, 20, 30, 40, 50],
  // Temperature
  C: [0, 10, 20, 25, 30, 37, 40, 50, 60, 70, 80, 90, 100, 150, 200],
  F: [-40, 0, 32, 40, 50, 60, 68, 70, 80, 90, 100, 120, 180, 212],
  K: [0, 100, 200, 273.15, 300, 350, 400],
  // Data storage
  mb: [1, 10, 50, 100, 500, 1000, 2000, 5000],
  gb: [1, 10, 50, 100, 200, 500, 1000, 2000],
  tb: [1, 10, 50, 100, 500],
  kb: [1, 10, 100, 500, 1000],
  pb: [1, 10, 100, 1000],
  // Area
  m2: [1, 10, 20, 50, 100, 200, 500, 1000],
  ft2: [10, 50, 100, 200, 500, 1000, 2000, 5000],
  ac: [1, 2, 5, 10, 20, 50, 100],
  ha: [1, 2, 5, 10, 20, 50, 100],
  yd2: [1, 5, 10, 50, 100, 200],
  km2: [1, 5, 10, 20, 50, 100],
  // Pressure
  psi: [1, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 100],
  bar: [1, 2, 5, 10, 20, 50, 100],
  kpa: [1, 5, 10, 20, 50, 100, 200, 500],
  mmhg: [1, 10, 20, 50, 100, 200, 500],
};

/**
 * Six significant digits, no trailing zeros. The exact factor is often a long
 * decimal (1 lb = 0.45359237 kg); showing all of it makes the table unreadable
 * and the difference it hides is below the precision anybody actually uses.
 */
function formatValue(n: number): string {
  if (!Number.isFinite(n)) return '-';
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  const rounded = parseFloat(n.toPrecision(6));
  if (Math.abs(rounded) >= 1000) return rounded.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 10 });
}

/**
 * The reference block on a converter page: the single conversion a reader
 * came for, stated as a number they can copy, plus a table of the values
 * people actually look up.
 *
 * Search data showed the top-ranking pages for "kg to lbs" style queries
 * answer the question in the snippet - "1 kg = 2.20462 lb", with the table
 * underneath - while a page that only opens a calculator leaves the reader
 * to work the answer out. This block puts the answer on the page, in the
 * HTML, where both the reader and the crawler can see it.
 */
export const ConversionReference: React.FC<ConversionReferenceProps> = ({ unitGroup, from, to }) => {
  const group = UNIT_GROUPS[unitGroup];
  if (!group) return null;

  const fromUnit = group.units.find((u) => u.value === from);
  const toUnit = group.units.find((u) => u.value === to);
  if (!fromUnit || !toUnit || fromUnit.value === toUnit.value) return null;

  const convert = (value: number): number => {
    const inBase = value * fromUnit.toBaseFactor + (fromUnit.toBaseOffset || 0);
    const out = (inBase - (toUnit.toBaseOffset || 0)) / toUnit.toBaseFactor;
    return Number.isFinite(out) ? out : NaN;
  };

  const convertReverse = (value: number): number => {
    const inBase = value * toUnit.toBaseFactor + (toUnit.toBaseOffset || 0);
    const out = (inBase - (fromUnit.toBaseOffset || 0)) / fromUnit.toBaseFactor;
    return Number.isFinite(out) ? out : NaN;
  };

  const fromShort = shortLabel(fromUnit.label);
  const toShort = shortLabel(toUnit.label);
  const one = convert(1);
  const oneReverse = convertReverse(1);
  const values = COMMON_VALUES[fromUnit.value] ?? [1, 2, 5, 10, 20, 50, 100];

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-primary dark:text-primary-tint">
            <Table2 className="w-4 h-4" />
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Quick Answer</h2>
          </div>
          <p className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100">
            1 {fromShort} = {formatValue(one)} {toShort}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Multiply {fromShort} by {formatValue(one)} to get {toShort}, and multiply {toShort} by{' '}
            {formatValue(oneReverse)} to get back to {fromShort}. The table below runs the same factor over the
            values people look up most often.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary dark:text-primary-tint">
            <Table2 className="w-4 h-4" />
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
              Common {fromShort} to {toShort} Conversions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left">
                  <th className="py-2 pr-4 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    {fromShort}
                  </th>
                  <th className="py-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    {toShort}
                  </th>
                </tr>
              </thead>
              <tbody>
                {values.map((v) => (
                  <tr key={v} className="border-b border-zinc-100 dark:border-zinc-800/60">
                    <td className="py-2 pr-4 font-mono text-zinc-900 dark:text-zinc-100">{formatValue(v)}</td>
                    <td className="py-2 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatValue(convert(v))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Every figure is calculated from the exact conversion factor, then rounded for display. Rounding the
            table and multiplying by hand can differ in the last digit.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

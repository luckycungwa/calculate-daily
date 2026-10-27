import React, { useMemo, useState } from 'react';
import { Atom, Copy, FlaskConical, RotateCcw, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  calculateResistorValue,
  formatResistance,
  RESISTOR_COLORS,
  solveOhmsLaw,
  type OhmsMode,
} from '../../lib/electrical';
import { parseChemicalFormula, phFromHydrogen, phFromValue } from '../../lib/chemistry';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

function format(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en', { maximumFractionDigits: digits }).format(value);
}

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '-': '⁻',
};

/** Scientific notation that stays readable in a sentence: 1.00 × 10⁻⁷. */
function formatScientific(value: number, digits = 2): string {
  if (!Number.isFinite(value) || value === 0) return '0';
  const [mantissa, exponent] = value.toExponential(digits).split('e');
  const power = exponent.replace('-', '−').replace(/\d/g, (digit) => SUPERSCRIPT[digit]);
  return `${mantissa} × 10${power}`;
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">{children}</div>;
}

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 'any',
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={suffix ? 'pr-14' : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-zinc-500">{hint}</p>}
    </div>
  );
}

function toNumber(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value);
}

function useCopy(onSaveHistory?: (summary: string) => void) {
  const { toast } = useToast();
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Result copied to clipboard');
    } catch {
      toast('Clipboard unavailable — select and copy manually.', 'warning');
    }
    onSaveHistory?.(text);
  };
}

const SELECT_CLASS =
  'h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

// ==========================================
// Molar mass / molecular weight
// ==========================================

const EXAMPLE_FORMULAS = ['H2O', 'C6H12O6', 'NaCl', 'Ca(OH)2', 'CuSO4·5H2O'];

export const MolecularWeightCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [formula, setFormula] = useState('C6H12O6');

  const result = useMemo(() => {
    try {
      return { value: parseChemicalFormula(formula), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid chemical formula.',
      };
    }
  }, [formula]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Stoichiometry</Badge>
        <CardTitle>Molecular Weight Calculator</CardTitle>
        <CardDescription>
          Read any molecular formula into its molar mass, atom count, and percentage composition by mass.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="formula-input">Chemical formula</Label>
            <Input
              id="formula-input"
              type="text"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              value={formula}
              onChange={(event) => setFormula(event.target.value)}
              className="font-mono"
              placeholder="C6H12O6"
            />
            <p className="text-[11px] text-zinc-500">
              Brackets and hydrates are supported: Ca(OH)2, CuSO4·5H2O. Capitalisation matters — Co is cobalt, CO is
              carbon monoxide.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">Common formulas</p>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_FORMULAS.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setFormula(example)}
                  className="rounded-md border border-zinc-300 bg-white px-2 py-1 font-mono text-[11px] text-zinc-700 transition-colors hover:border-emerald-600 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-emerald-400"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">
            Masses use IUPAC 2021 standard atomic weights. They are conventional values for stoichiometry, not
            isotope-specific masses, so a high-precision instrument may read slightly differently.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Atom className="h-3.5 w-3.5" /> Molar mass
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.molarMass, 3)}
                <span className="ml-1 text-base font-normal text-zinc-400">g/mol</span>
              </p>
              <p className="mt-1 font-mono text-xs text-zinc-400">
                {value.formula} · {value.totalAtoms} atoms
              </p>

              <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800">
                <table className="w-full text-[11px]">
                  <thead className="bg-zinc-900 text-zinc-400">
                    <tr>
                      <th className="px-2 py-1.5 text-left font-medium">Element</th>
                      <th className="px-2 py-1.5 text-right font-medium">Atoms</th>
                      <th className="px-2 py-1.5 text-right font-medium">Mass %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {Object.entries(value.counts).map(([element, count]) => (
                      <tr key={element}>
                        <td className="px-2 py-1.5 font-mono text-zinc-200">{element}</td>
                        <td className="px-2 py-1.5 text-right font-mono text-zinc-200">{count}</td>
                        <td className="px-2 py-1.5 text-right font-mono text-zinc-200">
                          {format(value.massPercent[element], 2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${value.formula}: molar mass ${format(value.molarMass, 3)} g/mol, ${value.totalAtoms} atoms. ` +
                      Object.entries(value.counts)
                        .map(([element, count]) => `${element}${count}`)
                        .join(' ')
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// pH
// ==========================================

type PhMode = 'ph' | 'hydrogen' | 'poh';

const PH_MODES: Array<{ value: PhMode; label: string; field: string; suffix: string; hint: string }> = [
  {
    value: 'ph',
    label: 'pH value',
    field: 'pH',
    suffix: 'pH',
    hint: 'A number from -1 to 15. 7 is neutral at 25 °C.',
  },
  {
    value: 'hydrogen',
    label: 'Hydrogen-ion concentration',
    field: 'H⁺ concentration',
    suffix: 'mol/L',
    hint: 'Decimal or scientific notation both work: 0.001 or 1e-3.',
  },
  {
    value: 'poh',
    label: 'pOH value',
    field: 'pOH',
    suffix: 'pOH',
    hint: 'pH is 14 minus pOH in water at 25 °C.',
  },
];

export const PhCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [mode, setMode] = useState<PhMode>('ph');
  const [input, setInput] = useState('7');

  const activeMode = PH_MODES.find((option) => option.value === mode) ?? PH_MODES[0];

  const result = useMemo(() => {
    try {
      const raw = toNumber(input);
      if (mode === 'hydrogen') {
        return { value: phFromHydrogen(raw), error: '' };
      }
      if (mode === 'poh') {
        return { value: phFromValue(14 - raw), error: '' };
      }
      return { value: phFromValue(raw), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter a valid pH or concentration.',
      };
    }
  }, [input, mode]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Acids &amp; Bases</Badge>
        <CardTitle>pH Calculator</CardTitle>
        <CardDescription>
          Convert between pH, pOH, hydrogen-ion, and hydroxide-ion concentration, with the acidity clearly labelled.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ph-mode">What do you know?</Label>
            <select
              id="ph-mode"
              value={mode}
              onChange={(event) => {
                const next = event.target.value as PhMode;
                setMode(next);
                setInput(next === 'hydrogen' ? '1e-7' : '7');
              }}
              className={SELECT_CLASS}
            >
              {PH_MODES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <NumberField
            id="ph-input"
            label={activeMode.field}
            value={input}
            onChange={setInput}
            step="any"
            suffix={activeMode.suffix}
            hint={activeMode.hint}
          />

          <p className="text-[11px] text-zinc-500">
            The conversion assumes 25 °C, where the ion product of water is 1.0 × 10⁻¹⁴. At other temperatures, neutral
            pH is not exactly 7.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <FlaskConical className="h-3.5 w-3.5" /> Result
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.ph, 2)}
                <span className="ml-1 text-base font-normal text-zinc-400">pH</span>
              </p>
              <p
                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  value.classification === 'acidic'
                    ? 'bg-amber-500/15 text-amber-300'
                    : value.classification === 'basic'
                      ? 'bg-sky-500/15 text-sky-300'
                      : 'bg-emerald-500/15 text-emerald-300'
                }`}
              >
                {value.classification === 'acidic'
                  ? 'Acidic'
                  : value.classification === 'basic'
                    ? 'Basic'
                    : 'Neutral'}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">pOH</dt>
                  <dd className="font-mono text-zinc-100">{format(value.poh, 2)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">[H⁺]</dt>
                  <dd className="font-mono text-zinc-100">{formatScientific(value.hydrogen)} mol/L</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">[OH⁻]</dt>
                  <dd className="font-mono text-zinc-100">{formatScientific(value.hydroxide)} mol/L</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `pH ${format(value.ph, 2)} (${value.classification}), pOH ${format(value.poh, 2)}. ` +
                      `[H+] = ${formatScientific(value.hydrogen)} mol/L, [OH-] = ${formatScientific(value.hydroxide)} mol/L.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Ohm's law
// ==========================================

const OHMS_MODES: Array<{
  value: OhmsMode;
  label: string;
  first: string;
  firstUnit: string;
  second: string;
  secondUnit: string;
}> = [
  { value: 'vi', label: 'Voltage and current', first: 'Voltage', firstUnit: 'V', second: 'Current', secondUnit: 'A' },
  {
    value: 'vr',
    label: 'Voltage and resistance',
    first: 'Voltage',
    firstUnit: 'V',
    second: 'Resistance',
    secondUnit: 'Ω',
  },
  {
    value: 'ir',
    label: 'Current and resistance',
    first: 'Current',
    firstUnit: 'A',
    second: 'Resistance',
    secondUnit: 'Ω',
  },
  { value: 'vp', label: 'Voltage and power', first: 'Voltage', firstUnit: 'V', second: 'Power', secondUnit: 'W' },
  { value: 'ip', label: 'Current and power', first: 'Current', firstUnit: 'A', second: 'Power', secondUnit: 'W' },
  {
    value: 'rp',
    label: 'Resistance and power',
    first: 'Resistance',
    firstUnit: 'Ω',
    second: 'Power',
    secondUnit: 'W',
  },
];

export const OhmsLawCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [mode, setMode] = useState<OhmsMode>('vi');
  const [first, setFirst] = useState('12');
  const [second, setSecond] = useState('2');

  const activeMode = OHMS_MODES.find((option) => option.value === mode) ?? OHMS_MODES[0];

  const result = useMemo(() => {
    try {
      return { value: solveOhmsLaw(mode, toNumber(first), toNumber(second)), error: '' };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Enter two known values.',
      };
    }
  }, [mode, first, second]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Electronics</Badge>
        <CardTitle>Ohm&rsquo;s Law Calculator</CardTitle>
        <CardDescription>
          Enter any two of voltage, current, resistance, or power and solve the rest for a resistive circuit.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ohms-mode">Known pair</Label>
            <select
              id="ohms-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as OhmsMode)}
              className={SELECT_CLASS}
            >
              {OHMS_MODES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              id="ohms-first"
              label={activeMode.first}
              value={first}
              onChange={setFirst}
              step="any"
              suffix={activeMode.firstUnit}
            />
            <NumberField
              id="ohms-second"
              label={activeMode.second}
              value={second}
              onChange={setSecond}
              step="any"
              suffix={activeMode.secondUnit}
            />
          </div>

          <p className="text-[11px] text-zinc-500">
            Assumes direct current and a purely resistive load. Alternating current with motors or capacitors needs
            impedance and power factor, which this does not model.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Zap className="h-3.5 w-3.5" /> Solved circuit
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.voltage, 3)}
                <span className="ml-1 text-base font-normal text-zinc-400">V</span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">Voltage across the circuit</p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Current</dt>
                  <dd className="font-mono text-zinc-100">{format(value.current, 4)} A</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Resistance</dt>
                  <dd className="font-mono text-zinc-100">{formatResistance(value.resistance)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Power</dt>
                  <dd className="font-mono text-zinc-100">{format(value.power, 3)} W</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${format(value.voltage, 3)} V, ${format(value.current, 4)} A, ` +
                      `${formatResistance(value.resistance)}, ${format(value.power, 3)} W.`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Resistor colour code
// ==========================================

const DIGIT_COLORS = RESISTOR_COLORS.filter((color) => color.digit !== undefined);
const MULTIPLIER_COLORS = RESISTOR_COLORS.filter((color) => color.multiplier !== undefined);
const TOLERANCE_COLORS = RESISTOR_COLORS.filter((color) => color.tolerance !== undefined);

function BandSelect({
  id,
  label,
  options,
  value,
  onChange,
  describe,
}: {
  id: string;
  label: string;
  options: typeof RESISTOR_COLORS;
  value: string;
  onChange: (value: string) => void;
  describe: (name: string) => string;
}) {
  const selected = options.find((color) => color.name === value) ?? options[0];
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="h-6 w-6 shrink-0 rounded-full border border-zinc-400 dark:border-zinc-600"
          style={{ backgroundColor: selected.hex }}
        />
        <select id={id} value={selected.name} onChange={(event) => onChange(event.target.value)} className={SELECT_CLASS}>
          {options.map((color) => (
            <option key={color.name} value={color.name}>
              {color.name} — {describe(color.name)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export const ResistorColorCodeCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [band1, setBand1] = useState('Brown');
  const [band2, setBand2] = useState('Black');
  const [multiplierBand, setMultiplierBand] = useState('Red');
  const [toleranceBand, setToleranceBand] = useState('Gold');

  const result = useMemo(() => {
    try {
      const first = DIGIT_COLORS.find((color) => color.name === band1) ?? DIGIT_COLORS[0];
      const second = DIGIT_COLORS.find((color) => color.name === band2) ?? DIGIT_COLORS[0];
      const multiplier = MULTIPLIER_COLORS.find((color) => color.name === multiplierBand) ?? MULTIPLIER_COLORS[0];
      const tolerance = TOLERANCE_COLORS.find((color) => color.name === toleranceBand) ?? TOLERANCE_COLORS[0];

      return {
        value: calculateResistorValue(
          first.digit ?? 0,
          second.digit ?? 0,
          multiplier.multiplier ?? 1,
          tolerance.tolerance ?? 0
        ),
        error: '',
      };
    } catch (error) {
      return {
        value: null,
        error: error instanceof Error ? error.message : 'Choose four valid bands.',
      };
    }
  }, [band1, band2, multiplierBand, toleranceBand]);

  const value = result.value;
  const activeBands = [band1, band2, multiplierBand, toleranceBand]
    .map((name) => RESISTOR_COLORS.find((color) => color.name === name))
    .filter((color): color is (typeof RESISTOR_COLORS)[number] => Boolean(color));

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Electronics</Badge>
        <CardTitle>Resistor Color Code Calculator</CardTitle>
        <CardDescription>
          Decode a four-band resistor from its colours, with the tolerance range shown in ohms.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <BandSelect
              id="band-1"
              label="Band 1 — first digit"
              options={DIGIT_COLORS}
              value={band1}
              onChange={setBand1}
              describe={(name) => String(DIGIT_COLORS.find((color) => color.name === name)?.digit ?? 0)}
            />
            <BandSelect
              id="band-2"
              label="Band 2 — second digit"
              options={DIGIT_COLORS}
              value={band2}
              onChange={setBand2}
              describe={(name) => String(DIGIT_COLORS.find((color) => color.name === name)?.digit ?? 0)}
            />
            <BandSelect
              id="band-3"
              label="Band 3 — multiplier"
              options={MULTIPLIER_COLORS}
              value={multiplierBand}
              onChange={setMultiplierBand}
              describe={(name) => `×${MULTIPLIER_COLORS.find((color) => color.name === name)?.multiplier ?? 1}`}
            />
            <BandSelect
              id="band-4"
              label="Band 4 — tolerance"
              options={TOLERANCE_COLORS}
              value={toleranceBand}
              onChange={setToleranceBand}
              describe={(name) => `±${TOLERANCE_COLORS.find((color) => color.name === name)?.tolerance ?? 0}%`}
            />
          </div>

          <div
            className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
            aria-label="Resistor band preview"
          >
            <div className="h-1.5 flex-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            {activeBands.map((color, index) => (
              <span
                key={`${color.name}-${index}`}
                className="h-7 w-3 rounded-sm border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <div className="h-1.5 flex-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          </div>

          <p className="text-[11px] text-zinc-500">
            Four-band resistors read digit, digit, multiplier, tolerance. A fifth band, when present, is a temperature
            coefficient and is not read here.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <RotateCcw className="h-3.5 w-3.5" /> Resistance
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {formatResistance(value.ohms)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                ±{format(value.tolerance, 2)}% tolerance
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Exact value</dt>
                  <dd className="font-mono text-zinc-100">{format(value.ohms, 4)} Ω</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Minimum</dt>
                  <dd className="font-mono text-zinc-100">{formatResistance(value.minimumOhms)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Maximum</dt>
                  <dd className="font-mono text-zinc-100">{formatResistance(value.maximumOhms)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Bands</dt>
                  <dd className="font-mono text-zinc-100">{activeBands.map((color) => color.name).join(' · ')}</dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${activeBands.map((color) => color.name).join('-')}: ${formatResistance(value.ohms)} ` +
                      `±${format(value.tolerance, 2)}% (${formatResistance(value.minimumOhms)} to ` +
                      `${formatResistance(value.maximumOhms)}).`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy summary
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

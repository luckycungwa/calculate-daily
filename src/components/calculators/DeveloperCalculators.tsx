import React, { useMemo, useState } from 'react';
import { Binary, Check, Code, Contrast, Copy, KeyRound, Link2, Palette, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  calculatePasswordEntropy,
  calculateSubnet,
  contrastRatio,
  convertNumberBases,
  decodeUrlComponent,
  encodeUrlComponent,
  parseColor,
  rgbToHex,
  rgbToHsl,
  type NumberBase,
} from '../../lib/devTools';
import { useToast } from '../ui/toast';

type CalculatorProps = { onSaveHistory?: (summary: string) => void };

function format(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en', { maximumFractionDigits: digits }).format(value);
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
          inputMode="numeric"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={suffix ? 'pr-12' : undefined}
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

const MONO_TEXTAREA =
  'w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

const SELECT_CLASS =
  'h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-xs text-zinc-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50';

// ==========================================
// IPv4 subnet
// ==========================================

export const IpSubnetCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [ip, setIp] = useState('192.168.1.10');
  const [prefix, setPrefix] = useState('24');

  const result = useMemo(() => {
    try {
      return { value: calculateSubnet(ip, toNumber(prefix)), error: '' };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a valid IPv4 address and prefix.' };
    }
  }, [ip, prefix]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Networking</Badge>
        <CardTitle>IP Subnet Calculator</CardTitle>
        <CardDescription>
          Turn an IPv4 address and prefix into its network, broadcast, usable range, and subnet mask.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="subnet-ip">IPv4 address</Label>
            <Input
              id="subnet-ip"
              type="text"
              inputMode="numeric"
              spellCheck={false}
              value={ip}
              onChange={(event) => setIp(event.target.value)}
              placeholder="192.168.1.10"
            />
            <p className="text-[11px] text-zinc-500">Four octets, 0–255. Host bits can be set; the tool masks them off.</p>
          </div>

          <NumberField
            id="subnet-prefix"
            label="Prefix length"
            value={prefix}
            onChange={setPrefix}
            step="1"
            suffix="/"
            hint="24 is a typical LAN, 30 a point-to-point link, 32 a single host."
          />
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Code className="h-3.5 w-3.5" /> Network address
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-emerald-400">
                {value.network}/{value.prefix}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Subnet mask</dt>
                  <dd className="font-mono text-zinc-100">{value.mask}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Wildcard mask</dt>
                  <dd className="font-mono text-zinc-100">{value.wildcard}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Usable host range</dt>
                  <dd className="font-mono text-zinc-100">
                    {value.firstHost} – {value.lastHost}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Broadcast</dt>
                  <dd className="font-mono text-zinc-100">{value.broadcast}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Usable hosts</dt>
                  <dd className="font-mono text-zinc-100">{format(value.usableHosts, 0)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Total addresses</dt>
                  <dd className="font-mono text-zinc-100">{format(value.totalAddresses, 0)}</dd>
                </div>
              </dl>

              <p className="mt-3 text-[11px] text-zinc-500">
                A /31 is treated as a point-to-point link with two usable addresses; a /32 is a single host. This tool
                handles IPv4 only.
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${value.network}/${value.prefix}: mask ${value.mask}, wildcard ${value.wildcard}, ` +
                      `hosts ${value.firstHost}–${value.lastHost}, broadcast ${value.broadcast}, ` +
                      `${format(value.usableHosts, 0)} usable of ${format(value.totalAddresses, 0)} addresses.`
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
// Number bases
// ==========================================

const BASE_OPTIONS: Array<{ value: NumberBase; label: string }> = [
  { value: 10, label: 'Decimal (base 10)' },
  { value: 2, label: 'Binary (base 2)' },
  { value: 8, label: 'Octal (base 8)' },
  { value: 16, label: 'Hexadecimal (base 16)' },
];

export const NumberBaseConverter: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [input, setInput] = useState('255');
  const [base, setBase] = useState<NumberBase>(10);

  const result = useMemo(() => {
    try {
      return { value: convertNumberBases(input, base), error: '' };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a value to convert.' };
    }
  }, [input, base]);

  const value = result.value;

  const rows = value
    ? [
        { label: 'Decimal', value: String(value.decimal) },
        { label: 'Binary', value: value.binary },
        { label: 'Octal', value: value.octal },
        { label: 'Hexadecimal', value: value.hexadecimal },
      ]
    : [];

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Programming</Badge>
        <CardTitle>Binary to Decimal Calculator</CardTitle>
        <CardDescription>
          Convert between binary, octal, decimal, and hexadecimal at the same time, without losing leading bits.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="base-input">Value</Label>
            <Input
              id="base-input"
              type="text"
              spellCheck={false}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="font-mono"
              placeholder="255"
            />
            <p className="text-[11px] text-zinc-500">
              Spaces and underscores are ignored. A 0b, 0o, or 0x prefix is accepted and stripped.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="base-select">Input base</Label>
            <select
              id="base-select"
              value={base}
              onChange={(event) => setBase(Number(event.target.value) as NumberBase)}
              className={SELECT_CLASS}
            >
              {BASE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Binary className="h-3.5 w-3.5" /> Converted value
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 break-all font-mono text-3xl font-bold tabular-nums text-emerald-400">
                {value.decimal}
              </p>
              <p className="mt-1 text-xs text-zinc-400">Decimal value</p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-3">
                    <dt className="shrink-0 text-zinc-400">{row.label}</dt>
                    <dd className="break-all text-right font-mono text-zinc-100">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(`${value.decimal} = 0b${value.binary} = 0o${value.octal} = 0x${value.hexadecimal}`)
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy all bases
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Password entropy
// ==========================================

const POOL_TOGGLES = [
  { key: 'lowercase', label: 'a–z', detail: '26 characters' },
  { key: 'uppercase', label: 'A–Z', detail: '26 characters' },
  { key: 'digits', label: '0–9', detail: '10 characters' },
  { key: 'symbols', label: '!@#$', detail: '32 characters' },
] as const;

function formatCrackTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return 'effectively forever';
  if (seconds < 1) return 'under a second';
  if (seconds < 60) return `${format(seconds, 0)} seconds`;
  if (seconds < 3600) return `${format(seconds / 60, 0)} minutes`;
  if (seconds < 86400) return `${format(seconds / 3600, 1)} hours`;
  if (seconds < 3.156e7) return `${format(seconds / 86400, 0)} days`;
  if (seconds < 3.156e10) return `${format(seconds / 3.156e7, 0)} years`;
  if (seconds < 3.156e100) return `${format(seconds / 3.156e7, 0)} years`;
  return `${(seconds / 3.156e7).toExponential(1)} years`;
}

function strengthLabel(bits: number): { label: string; tone: string } {
  if (bits < 28) return { label: 'Very weak', tone: 'bg-red-500/15 text-red-300' };
  if (bits < 40) return { label: 'Weak', tone: 'bg-amber-500/15 text-amber-300' };
  if (bits < 60) return { label: 'Reasonable', tone: 'bg-yellow-500/15 text-yellow-200' };
  if (bits < 80) return { label: 'Strong', tone: 'bg-emerald-500/15 text-emerald-300' };
  return { label: 'Very strong', tone: 'bg-emerald-500/20 text-emerald-200' };
}

export const PasswordEntropyCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [length, setLength] = useState('16');
  const [sets, setSets] = useState({ lowercase: true, uppercase: true, digits: true, symbols: true });

  const result = useMemo(() => {
    try {
      return {
        value: calculatePasswordEntropy({ length: toNumber(length), ...sets }),
        error: '',
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a valid password length.' };
    }
  }, [length, sets]);

  const value = result.value;
  const strength = value ? strengthLabel(value.entropyBits) : null;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Security</Badge>
        <CardTitle>Password Entropy Calculator</CardTitle>
        <CardDescription>
          Estimate the search space of a randomly generated password and how long an offline attacker would need.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <NumberField
            id="entropy-length"
            label="Password length"
            value={length}
            onChange={setLength}
            step="1"
            suffix="chars"
            hint="Length matters more than complexity: every extra character multiplies the search space."
          />

          <div className="space-y-2">
            <Label>Character sets</Label>
            <div className="grid grid-cols-2 gap-2">
              {POOL_TOGGLES.map((toggle) => {
                const active = sets[toggle.key];
                return (
                  <button
                    key={toggle.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSets((current) => ({ ...current, [toggle.key]: !current[toggle.key] }))}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                      active
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
                        : 'border-zinc-300 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
                    }`}
                  >
                    <span className="font-mono">{toggle.label}</span>
                    <span className="text-[10px] opacity-70">{toggle.detail}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">
            This measures entropy, not whether a password is guessable. Human-chosen patterns, reused passwords, and
            dictionary words collapse the real search space far below the number shown.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <KeyRound className="h-3.5 w-3.5" /> Entropy
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && strength && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {format(value.entropyBits, 1)}
                <span className="ml-1 text-base font-normal text-zinc-400">bits</span>
              </p>
              <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${strength.tone}`}>
                {strength.label}
              </p>

              <dl className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Character pool</dt>
                  <dd className="font-mono text-zinc-100">{value.poolSize}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Possible combinations</dt>
                  <dd className="font-mono text-zinc-100">10^{format(value.combinationsLog10, 1)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">Crack time (10¹² guesses/s)</dt>
                  <dd className="font-mono text-zinc-100">{formatCrackTime(value.secondsToCrack)}</dd>
                </div>
              </dl>

              <p className="mt-3 text-[11px] text-zinc-500">
                Assumes a random password and a fast offline attack against a poorly stored hash. Rate-limited online
                logins are far slower, and a breached hash is often cracked much faster than the arithmetic suggests.
              </p>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${length}-character password from a ${value.poolSize}-character pool: ` +
                      `${format(value.entropyBits, 1)} bits of entropy (${strength.label}). ` +
                      `Offline crack time about ${formatCrackTime(value.secondsToCrack)} at 10^12 guesses/second.`
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
// URL encoder / decoder
// ==========================================

export const UrlEncoderDecoder: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [text, setText] = useState('search=hello world&page=1');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const result = useMemo(() => {
    try {
      return {
        value: mode === 'encode' ? encodeUrlComponent(text) : decodeUrlComponent(text),
        error: '',
      };
    } catch (error) {
      return { value: '', error: error instanceof Error ? error.message : 'That input cannot be decoded.' };
    }
  }, [text, mode]);

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Web</Badge>
        <CardTitle>URL Encoder / Decoder</CardTitle>
        <CardDescription>
          Percent-encode text for a query string or path, or turn an encoded URL back into readable text.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Direction</Label>
            <div className="flex gap-2">
              <button
                type="button"
                aria-pressed={mode === 'encode'}
                onClick={() => setMode('encode')}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium ${
                  mode === 'encode'
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-zinc-300 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                Encode
              </button>
              <button
                type="button"
                aria-pressed={mode === 'decode'}
                onClick={() => setMode('decode')}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium ${
                  mode === 'decode'
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-zinc-300 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                Decode
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="url-input">{mode === 'encode' ? 'Text to encode' : 'Encoded text'}</Label>
            <textarea
              id="url-input"
              rows={5}
              value={text}
              onChange={(event) => setText(event.target.value)}
              className={MONO_TEXTAREA}
              spellCheck={false}
            />
            <p className="text-[11px] text-zinc-500">
              Encoding uses encodeURIComponent, which is the correct choice for a query parameter value. Decoding also
              converts + to a space, as form submissions do.
            </p>
          </div>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Link2 className="h-3.5 w-3.5" /> Output
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : (
            <>
              <textarea
                readOnly
                rows={6}
                value={result.value}
                className="mt-2 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-xs text-emerald-300"
              />
              <p className="mt-2 text-[11px] text-zinc-500">{result.value.length} characters</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() => copy(result.value)}
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy output
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Colour converter
// ==========================================

export const ColorConverter: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [input, setInput] = useState('#1a2b3c');

  const result = useMemo(() => {
    try {
      const rgb = parseColor(input);
      return {
        value: {
          rgb,
          hex: rgbToHex(rgb),
          hsl: rgbToHsl(rgb),
        },
        error: '',
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter a colour value.' };
    }
  }, [input]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Design</Badge>
        <CardTitle>Hex to RGB Converter</CardTitle>
        <CardDescription>
          Convert a hex colour to RGB and HSL, with the equivalent values in every notation a stylesheet needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="color-input">Colour</Label>
            <div className="flex gap-2">
              <Input
                id="color-input"
                type="text"
                spellCheck={false}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="font-mono"
                placeholder="#1a2b3c"
              />
              <input
                type="color"
                aria-label="Pick a colour"
                value={value ? value.hex : '#000000'}
                onChange={(event) => setInput(event.target.value)}
                className="h-9 w-14 cursor-pointer rounded-lg border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <p className="text-[11px] text-zinc-500">Accepts #abc, #aabbcc, or rgb(26, 43, 60).</p>
          </div>

          {value && (
            <div
              className="h-28 rounded-xl border border-zinc-200 dark:border-zinc-800"
              style={{ backgroundColor: value.hex }}
              aria-label={`Colour preview ${value.hex}`}
            />
          )}
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Palette className="h-3.5 w-3.5" /> Equivalent values
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">HEX</dt>
                  <dd className="font-mono text-zinc-100">{value.hex}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">RGB</dt>
                  <dd className="font-mono text-zinc-100">
                    rgb({value.rgb.r}, {value.rgb.g}, {value.rgb.b})
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-400">HSL</dt>
                  <dd className="font-mono text-zinc-100">
                    hsl({format(value.hsl.h, 0)}, {format(value.hsl.s, 0)}%, {format(value.hsl.l, 0)}%)
                  </dd>
                </div>
              </dl>

              <div className="mt-4 space-y-1.5 border-t border-zinc-800 pt-3 text-[11px] text-zinc-500">
                <p>Channels: R {value.rgb.r} · G {value.rgb.g} · B {value.rgb.b}</p>
                <p>Hue {format(value.hsl.h, 0)}° · saturation {format(value.hsl.s, 0)}% · lightness {format(value.hsl.l, 0)}%</p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${value.hex} = rgb(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}) = ` +
                      `hsl(${format(value.hsl.h, 0)}, ${format(value.hsl.s, 0)}%, ${format(value.hsl.l, 0)}%)`
                  )
                }
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy values
              </Button>
            </>
          )}
        </ResultPanel>
      </CardContent>
    </Card>
  );
};

// ==========================================
// WCAG contrast
// ==========================================

function ThresholdRow({
  label,
  requirement,
  ratio,
}: {
  label: string;
  requirement: number;
  ratio: number;
}) {
  const passes = ratio >= requirement;
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div>
        <p className="text-xs text-zinc-200">{label}</p>
        <p className="text-[10px] text-zinc-500">Requires {requirement}:1</p>
      </div>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          passes ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'
        }`}
      >
        {passes ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
        {passes ? 'Pass' : 'Fail'}
      </span>
    </div>
  );
}

export const ContrastRatioCalculator: React.FC<CalculatorProps> = ({ onSaveHistory }) => {
  const copy = useCopy(onSaveHistory);
  const [foreground, setForeground] = useState('#111827');
  const [background, setBackground] = useState('#ffffff');

  const result = useMemo(() => {
    try {
      const fg = parseColor(foreground);
      const bg = parseColor(background);
      return {
        value: {
          fg,
          bg,
          fgHex: rgbToHex(fg),
          bgHex: rgbToHex(bg),
          ratio: contrastRatio(fg, bg),
        },
        error: '',
      };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : 'Enter two colour values.' };
    }
  }, [foreground, background]);

  const value = result.value;

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <Badge variant="outline" className="mb-2 w-fit text-[11px] font-mono">Accessibility</Badge>
        <CardTitle>Contrast Ratio Calculator</CardTitle>
        <CardDescription>
          Check text and background colours against the WCAG 2.1 AA and AAA contrast thresholds.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 p-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="contrast-fg">Text colour</Label>
              <div className="flex gap-1.5">
                <Input
                  id="contrast-fg"
                  type="text"
                  spellCheck={false}
                  value={foreground}
                  onChange={(event) => setForeground(event.target.value)}
                  className="font-mono text-xs"
                />
                <input
                  type="color"
                  aria-label="Pick text colour"
                  value={value ? value.fgHex : '#000000'}
                  onChange={(event) => setForeground(event.target.value)}
                  className="h-9 w-10 shrink-0 cursor-pointer rounded-lg border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contrast-bg">Background</Label>
              <div className="flex gap-1.5">
                <Input
                  id="contrast-bg"
                  type="text"
                  spellCheck={false}
                  value={background}
                  onChange={(event) => setBackground(event.target.value)}
                  className="font-mono text-xs"
                />
                <input
                  type="color"
                  aria-label="Pick background colour"
                  value={value ? value.bgHex : '#ffffff'}
                  onChange={(event) => setBackground(event.target.value)}
                  className="h-9 w-10 shrink-0 cursor-pointer rounded-lg border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>
            </div>
          </div>

          {value && (
            <div
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
              style={{ backgroundColor: value.bgHex, color: value.fgHex }}
            >
              <p className="text-lg font-semibold">Large heading text</p>
              <p className="mt-1 text-sm">
                Body copy at 14–16px is judged against the stricter AA threshold of 4.5:1.
              </p>
            </div>
          )}

          <p className="text-[11px] text-zinc-500">
            WCAG large text means 18pt (24px) regular or 14pt (18.66px) bold. Use the large-text threshold only when
            the text really is that size.
          </p>
        </div>

        <ResultPanel>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400">
            <Contrast className="h-3.5 w-3.5" /> Contrast ratio
          </div>
          {result.error ? (
            <p role="alert" className="mt-3 text-sm text-amber-300">{result.error}</p>
          ) : value && (
            <>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                {value.ratio.toFixed(2)}
                <span className="ml-1 text-base font-normal text-zinc-400">:1</span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {value.ratio >= 7
                  ? 'Passes AAA for normal text.'
                  : value.ratio >= 4.5
                    ? 'Passes AA but not AAA for normal text.'
                    : value.ratio >= 3
                      ? 'Large text only — below the AA body-text threshold.'
                      : 'Below every WCAG text threshold.'}
              </p>

              <div className="mt-4 divide-y divide-zinc-800 border-t border-zinc-800 pt-2 text-xs">
                <ThresholdRow label="AA — normal text" requirement={4.5} ratio={value.ratio} />
                <ThresholdRow label="AA — large text" requirement={3} ratio={value.ratio} />
                <ThresholdRow label="AAA — normal text" requirement={7} ratio={value.ratio} />
                <ThresholdRow label="AAA — large text" requirement={4.5} ratio={value.ratio} />
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  copy(
                    `${value.fgHex} on ${value.bgHex} has a contrast ratio of ${value.ratio.toFixed(2)}:1. ` +
                      `WCAG AA normal text: ${value.ratio >= 4.5 ? 'pass' : 'fail'}; ` +
                      `AAA normal text: ${value.ratio >= 7 ? 'pass' : 'fail'}.`
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

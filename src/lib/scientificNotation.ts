/**
 * Scientific-notation conversion and arithmetic.
 *
 * Kept in `lib` so the page's answers are unit-tested rather than asserted in
 * prose. `toScientificParts` normalises after rounding, because rounding the
 * mantissa can carry it to 10 (99999 at 3 significant figures is 1.00 × 10^5,
 * not 10.0 × 10^4).
 */

export type SciOp = 'multiply' | 'divide' | 'add' | 'subtract';

export interface ScientificParts {
  /** Signed mantissa with |mantissa| in [1, 10), or 0 for zero. */
  mantissa: number;
  /** Power of ten applied to the mantissa. */
  exponent: number;
}

/** Rounds a value and returns its normalised mantissa/exponent form. */
export function toScientificParts(value: number, significantFigures = 6): ScientificParts {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  if (value === 0) return { mantissa: 0, exponent: 0 };

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = Number((value / Math.pow(10, exponent)).toPrecision(significantFigures));

  // 9.999 at 3 s.f. rounds to 10.0, which is 1.00 × 10^1 rather than 10.0 × 10^0.
  if (Math.abs(mantissa) >= 10) {
    return {
      mantissa: Number((mantissa / 10).toPrecision(significantFigures)),
      exponent: exponent + 1,
    };
  }
  return { mantissa, exponent };
}

/** Engineering notation: exponent forced to a multiple of three. */
export function toEngineeringParts(value: number, significantFigures = 6): ScientificParts {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  if (value === 0) return { mantissa: 0, exponent: 0 };

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const engineeringExponent = Math.floor(exponent / 3) * 3;
  const mantissa = Number(
    (value / Math.pow(10, engineeringExponent)).toPrecision(significantFigures)
  );

  if (Math.abs(mantissa) >= 1000) {
    return {
      mantissa: Number((mantissa / 1000).toPrecision(significantFigures)),
      exponent: engineeringExponent + 3,
    };
  }
  return { mantissa, exponent: engineeringExponent };
}

/** `3.5 × 10^4` — the form textbooks and exam papers use. */
export function formatScientific(value: number, significantFigures = 6): string {
  const { mantissa, exponent } = toScientificParts(value, significantFigures);
  if (mantissa === 0) return '0';
  return `${trimMantissa(mantissa)} × 10^${exponent}`;
}

/** `3.5e4` — the form calculators and programming languages accept. */
export function formatENotation(value: number, significantFigures = 6): string {
  if (value === 0) return '0';
  const { mantissa, exponent } = toScientificParts(value, significantFigures);
  return `${trimMantissa(mantissa)}e${exponent}`;
}

export function formatEngineering(value: number, significantFigures = 6): string {
  const { mantissa, exponent } = toEngineeringParts(value, significantFigures);
  if (mantissa === 0) return '0';
  return `${trimMantissa(mantissa)} × 10^${exponent}`;
}

/**
 * Plain decimal expansion, without exponent form, for reasonable magnitudes.
 *
 * `String(value)` is the shortest representation that round-trips, so it is used
 * verbatim when it is already plain. Expanding "1e-7" is done by shifting the
 * digits as text — multiplying by a power of ten would reintroduce binary
 * rounding (0.0025 would print as 0.00250000000000000005).
 */
export function formatDecimal(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '0';

  const text = String(value);
  if (!/[eE]/.test(text)) return text;

  const [mantissa, exponent] = text.toLowerCase().split('e');
  const power = Number(exponent);
  const negative = mantissa.startsWith('-');
  const digits = mantissa.replace('-', '').replace('.', '');
  const sign = negative ? '-' : '';

  if (power >= 0) {
    const wholeLength = digits.length;
    if (power + 1 <= wholeLength) {
      return `${sign}${digits.slice(0, power + 1)}.${digits.slice(power + 1)}`;
    }
    return `${sign}${digits}${'0'.repeat(power + 1 - wholeLength)}`;
  }

  return `${sign}0.${'0'.repeat(-power - 1)}${digits}`;
}

/** Order of magnitude, i.e. the exponent when written in scientific notation. */
export function orderOfMagnitude(value: number): number {
  if (value === 0) return 0;
  return toScientificParts(value).exponent;
}

function trimMantissa(mantissa: number): string {
  return String(mantissa);
}

/**
 * Accepts the ways a person might type a number for this tool: plain decimals,
 * E-notation, and the textbook "4.5 × 10^3" form. Returns null for anything else.
 */
export function parseNumberInput(input: string): number | null {
  const cleaned = input.trim().replace(/−/g, '-').replace(/,/g, '');
  if (!cleaned) return null;

  const textbook = cleaned.match(/^([+-]?(?:\d+\.?\d*|\.\d+))\s*[×x*]\s*10\s*\^?\s*([+-]?\d+)$/i);
  if (textbook) {
    // Compose as E-notation so the parser, not a float multiply, does the scaling:
    // 4.5 * 10^-3 is 0.0045000000000000005, while Number("4.5e-3") is 0.0045.
    const value = Number(`${textbook[1]}e${textbook[2]}`);
    return Number.isFinite(value) ? value : null;
  }

  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

/**
 * Arithmetic on two numbers written in scientific notation. The operands are
 * multiplied out rather than computed mantissa-by-mantissa, so the result carries
 * full double precision and only the display is normalised.
 */
export function computeScientific(
  mantissaA: number,
  exponentA: number,
  op: SciOp,
  mantissaB: number,
  exponentB: number
): number {
  const a = mantissaA * Math.pow(10, exponentA);
  const b = mantissaB * Math.pow(10, exponentB);

  switch (op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Cannot divide by zero');
      return a / b;
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

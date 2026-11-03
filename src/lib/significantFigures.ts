/**
 * Significant-figures counting and rounding.
 *
 * The rules implemented here are the standard ones taught in chemistry and
 * physics courses; where the rules genuinely disagree (a trailing zero with no
 * decimal point, and zero itself) the result is flagged as ambiguous instead of
 * being presented as fact.
 */

export interface SigFigCount {
  /** Number of significant figures, counting the coefficient only. */
  count: number;
  /**
   * True when the written value does not fix the count — "1200" could be two,
   * three or four significant figures depending on the measurement's precision.
   */
  ambiguous: boolean;
  note: string;
}

const NUMERIC = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;

/**
 * Counts significant figures in a written number. Returns null when the input is
 * not a number at all.
 */
export function countSignificantFigures(input: string): SigFigCount | null {
  const raw = input.trim().replace(/−/g, '-').replace(/,/g, '');
  if (!raw || !NUMERIC.test(raw)) return null;

  const unsigned = raw.replace(/^[+-]/, '');
  const [coefficient, exponent] = unsigned.split(/[eE]/);
  const hasExponent = exponent !== undefined;
  const hasDecimalPoint = coefficient.includes('.');
  const digits = coefficient.replace('.', '').replace(/^0+/, '');

  if (digits.length === 0) {
    return {
      count: 0,
      ambiguous: true,
      note: 'Zero has no non-zero digits, so a significant-figure count does not describe it.',
    };
  }

  // Significant digits: leading zeros never count, trailing zeros always count
  // after a decimal point, and in exponent form the coefficient is written in full.
  if (hasDecimalPoint || hasExponent) {
    return { count: digits.length, ambiguous: false, note: '' };
  }

  const trailingZeros = digits.length - digits.replace(/0+$/, '').length;
  if (trailingZeros === 0) {
    return { count: digits.length, ambiguous: false, note: '' };
  }

  return {
    count: digits.length - trailingZeros,
    ambiguous: true,
    note:
      `"${raw}" ends in ${trailingZeros} zero${trailingZeros === 1 ? '' : 's'} with no decimal point, ` +
      'so those zeros may be placeholders rather than measured digits. Write it in scientific notation ' +
      'to state the precision you mean.',
  };
}

export interface SigFigRounding {
  /** Rounded numeric value. */
  value: number;
  /** Rounded value in flat decimal form. */
  decimal: string;
  /** Same value in scientific notation, which states the precision explicitly. */
  scientific: string;
}

/** Rounds a number to a fixed number of significant figures. */
export function roundToSignificantFigures(value: number, significantFigures: number): SigFigRounding {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  if (!Number.isInteger(significantFigures) || significantFigures < 1 || significantFigures > 15) {
    throw new Error('Significant figures must be a whole number from 1 to 15');
  }
  if (value === 0) return { value: 0, decimal: '0', scientific: '0' };

  const precise = value.toPrecision(significantFigures);
  const rounded = Number(precise);
  const exhibition = precise.includes('e');

  return {
    value: rounded,
    decimal: exhibition ? expandExponent(rounded, significantFigures) : precise,
    scientific: toScientificText(rounded, significantFigures),
  };
}

/** Rewrites `toPrecision` output as `1.23 × 10^-4`. */
function toScientificText(value: number, significantFigures: number): string {
  const precise = value.toPrecision(significantFigures);
  if (!precise.includes('e')) {
    return precise;
  }
  const [mantissa, exponent] = precise.split('e');
  return `${mantissa} × 10^${Number(exponent)}`;
}

/** Flat decimal string for a value that `toPrecision` rendered in exponent form. */
function expandExponent(value: number, significantFigures: number): string {
  const [mantissa, exponent] = value.toPrecision(significantFigures).split('e');
  if (exponent === undefined) return mantissa;
  const power = Number(exponent);
  const digits = mantissa.replace('.', '').replace(/^-/, '');
  const sign = mantissa.startsWith('-') ? '-' : '';

  if (power >= 0) {
    const wholeLength = digits.length;
    if (power + 1 <= wholeLength) {
      return sign + digits.slice(0, power + 1) + '.' + digits.slice(power + 1);
    }
    return sign + digits + '0'.repeat(power + 1 - wholeLength);
  }
  return `${sign}0.${'0'.repeat(-power - 1)}${digits}`;
}

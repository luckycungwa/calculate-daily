/**
 * Bounded number input for calculator fields.
 *
 * `min` / `max` on an `<input type="number">` are advisory: they constrain the
 * spinner and are checked on form submission, but a typed value outside the range
 * still reaches React's `onChange`. Before this module, a field declaring
 * `min: 0` happily passed `-50` into the formula and the calculator then printed
 * a confident, wrong answer.
 *
 * The rule here is: the number that reaches a formula is always inside its
 * declared range, and any correction is returned as a message the UI announces.
 * Nothing is silently repaired.
 */

export interface NumericBounds {
  min?: number;
  max?: number;
}

export interface BoundedNumber {
  /** The value to calculate with. Always within the declared bounds. */
  value: number;
  /** Message to announce when the typed text was rejected or clamped. */
  error?: string;
}

/** Move a value into range, tolerating an absent bound. */
export function clampToBounds(value: number, bounds: NumericBounds): number {
  let next = value;
  if (bounds.min !== undefined && next < bounds.min) next = bounds.min;
  if (bounds.max !== undefined && next > bounds.max) next = bounds.max;
  return next;
}

/** What an empty field falls back to: the lowest sensible value in range. */
function fallbackValue(bounds: NumericBounds): number {
  const base = bounds.min !== undefined && bounds.min > 0 ? bounds.min : 0;
  return clampToBounds(base, bounds);
}

/**
 * Parse one field's raw text into a usable number plus an optional message.
 *
 * Clamping rather than blocking is deliberate: a calculator should keep showing
 * a result while the visitor is mid-edit ("1" before "150"), and the message tells
 * them the figure is being computed from the nearest valid value.
 */
export function parseBoundedNumber(
  raw: string,
  bounds: NumericBounds = {}
): BoundedNumber {
  const text = raw.trim();

  if (text === '') {
    return { value: fallbackValue(bounds), error: 'Enter a value.' };
  }

  const parsed = Number(text);

  if (!Number.isFinite(parsed)) {
    return { value: fallbackValue(bounds), error: 'Enter a valid number.' };
  }

  if (bounds.min !== undefined && parsed < bounds.min) {
    return { value: bounds.min, error: `Must be at least ${bounds.min}.` };
  }

  if (bounds.max !== undefined && parsed > bounds.max) {
    return { value: bounds.max, error: `Must be at most ${bounds.max}.` };
  }

  return { value: parsed };
}

/** True when a value already sits inside its declared range. */
export function isWithinBounds(value: number, bounds: NumericBounds): boolean {
  if (!Number.isFinite(value)) return false;
  if (bounds.min !== undefined && value < bounds.min) return false;
  if (bounds.max !== undefined && value > bounds.max) return false;
  return true;
}

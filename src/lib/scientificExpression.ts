/**
 * Expression evaluator for the scientific calculator.
 *
 * Extracted from the calculator component so the arithmetic the page promises is
 * covered by tests instead of being verified by eye. Three behaviours matter here
 * because they are what people actually type:
 *
 *   1. Scientific-notation input (`2.5e-3`, `6.02E23`). A negative exponent used
 *      to be parsed as `2.5e` minus `3`, which silently returned the wrong number.
 *   2. Implicit multiplication (`2(3+1)`, `2pi`, `3sin(30)`). Previously the
 *      parser stopped at the `(` and threw away the rest of the expression.
 *   3. Rejecting leftover input. `2(3)` used to evaluate to 2 because trailing
 *      tokens were ignored; an expression is now only accepted if every token is
 *      consumed.
 */

export type AngleMode = 'deg' | 'rad';

type Token =
  | { type: 'number'; value: number }
  | { type: 'identifier'; value: string }
  | { type: 'operator'; value: string };

const FUNCTIONS = new Set([
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'sinh',
  'cosh',
  'tanh',
  'ln',
  'log',
  'sqrt',
  'cbrt',
  'abs',
  'exp',
]);

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
};

/** Longest input we will tokenise; guards against pathological paste. */
const MAX_SOURCE_LENGTH = 240;

export class ExpressionError extends Error {}

const NUMBER = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/;

function normalise(source: string): string {
  return source
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt');
}

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const text = normalise(source);
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    const numberMatch = text.slice(i).match(NUMBER);
    if (numberMatch) {
      tokens.push({ type: 'number', value: Number(numberMatch[0]) });
      i += numberMatch[0].length;
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let identifier = '';
      while (i < text.length && /[a-zA-Z0-9]/.test(text[i])) {
        identifier += text[i];
        i++;
      }
      tokens.push({ type: 'identifier', value: identifier });
      continue;
    }

    if ('+-*/^!%()'.includes(char)) {
      tokens.push({ type: 'operator', value: char });
      i++;
      continue;
    }

    throw new ExpressionError(`Unexpected character "${char}"`);
  }

  return tokens;
}

function factorial(value: number): number {
  if (!Number.isFinite(value) || value < 0) return NaN;
  const n = Math.round(value);
  if (n > 170) return Infinity;
  let result = 1;
  for (let k = 2; k <= n; k++) result *= k;
  return result;
}

/**
 * Recursive-descent evaluation with the conventional precedence ladder:
 * addition → multiplication → unary sign → postfix (! and %) → power → primary.
 * `^` binds tighter than unary minus on its left (`-2^2 = -4`) and is
 * right-associative (`2^3^2 = 512`).
 */
function parse(tokens: Token[], mode: AngleMode): number {
  let position = 0;

  const peek = (): Token | undefined => tokens[position];
  const peekOperator = (): string | undefined => {
    const token = tokens[position];
    return token && token.type === 'operator' ? token.value : undefined;
  };

  const toRadians = (v: number) => (mode === 'deg' ? (v * Math.PI) / 180 : v);
  const fromRadians = (v: number) => (mode === 'deg' ? (v * 180) / Math.PI : v);

  function parseExpression(): number {
    let left = parseTerm();
    while (peekOperator() === '+' || peekOperator() === '-') {
      const op = (tokens[position++] as { value: string }).value;
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  /** True when the next token can begin a primary without an operator. */
  function startsImplicitFactor(): boolean {
    const token = peek();
    if (!token) return false;
    if (token.type === 'operator') return token.value === '(';
    // `2 3` is a typo, not implicit multiplication; only names and ( are implicit.
    return token.type === 'identifier';
  }

  function parseTerm(): number {
    let left = parseUnary();
    for (;;) {
      const op = peekOperator();
      if (op === '*' || op === '/') {
        position++;
        const right = parseUnary();
        left = op === '*' ? left * right : left / right;
        continue;
      }
      if (startsImplicitFactor()) {
        left *= parseUnary();
        continue;
      }
      return left;
    }
  }

  function parseUnary(): number {
    if (peekOperator() === '-') {
      position++;
      return -parseUnary();
    }
    if (peekOperator() === '+') {
      position++;
      return parseUnary();
    }
    return parsePostfix();
  }

  function parsePostfix(): number {
    let value = parsePower();
    for (;;) {
      const op = peekOperator();
      if (op === '!') {
        position++;
        value = factorial(value);
        continue;
      }
      if (op === '%') {
        position++;
        value = value / 100;
        continue;
      }
      return value;
    }
  }

  function parsePower(): number {
    const base = parsePrimary();
    if (peekOperator() === '^') {
      position++;
      // Right-associative, and the exponent may itself be signed.
      return Math.pow(base, parseUnary());
    }
    return base;
  }

  function parsePrimary(): number {
    const token = peek();
    if (!token) throw new ExpressionError('Expression ended unexpectedly');

    if (token.type === 'operator' && token.value === '(') {
      position++;
      const value = parseExpression();
      if (peekOperator() !== ')') throw new ExpressionError('Missing closing parenthesis');
      position++;
      return value;
    }

    if (token.type === 'number') {
      position++;
      return token.value;
    }

    if (token.type === 'identifier') {
      position++;
      const name = token.value.toLowerCase();

      if (name in CONSTANTS) return CONSTANTS[name];

      if (!FUNCTIONS.has(name)) throw new ExpressionError(`Unknown name "${token.value}"`);

      let argument: number;
      if (peekOperator() === '(') {
        position++;
        argument = parseExpression();
        if (peekOperator() !== ')') throw new ExpressionError('Missing closing parenthesis');
        position++;
      } else {
        // `sqrt 9` and `sin30` both evaluate the next factor.
        argument = parseUnary();
      }

      switch (name) {
        case 'sin':
          return Math.sin(toRadians(argument));
        case 'cos':
          return Math.cos(toRadians(argument));
        case 'tan':
          return Math.tan(toRadians(argument));
        case 'asin':
          return fromRadians(Math.asin(argument));
        case 'acos':
          return fromRadians(Math.acos(argument));
        case 'atan':
          return fromRadians(Math.atan(argument));
        case 'sinh':
          return Math.sinh(argument);
        case 'cosh':
          return Math.cosh(argument);
        case 'tanh':
          return Math.tanh(argument);
        case 'ln':
          return Math.log(argument);
        case 'log':
          return Math.log10(argument);
        case 'sqrt':
          return Math.sqrt(argument);
        case 'cbrt':
          return Math.cbrt(argument);
        case 'abs':
          return Math.abs(argument);
        case 'exp':
          return Math.exp(argument);
        default:
          throw new ExpressionError(`Unknown function "${name}"`);
      }
    }

    throw new ExpressionError(`Unexpected token "${String((token as { value: unknown }).value)}"`);
  }

  const result = parseExpression();
  if (position < tokens.length) {
    throw new ExpressionError('Unexpected trailing input');
  }
  return result;
}

/**
 * Evaluates a typed expression. Throws `ExpressionError` for input that is
 * incomplete (which is normal while the user is still typing) or invalid.
 */
export function evaluateExpression(source: string, mode: AngleMode = 'deg'): number {
  const trimmed = source.trim();
  if (!trimmed) throw new ExpressionError('Empty expression');
  if (trimmed.length > MAX_SOURCE_LENGTH) throw new ExpressionError('Expression too long');

  let depth = 0;
  for (const char of trimmed) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (depth < 0) throw new ExpressionError('Unbalanced parenthesis');
  }
  if (depth !== 0) throw new ExpressionError('Unbalanced parenthesis');

  return parse(tokenize(trimmed), mode);
}

/**
 * Display formatting: integers stay integers, everything else is rounded to 12
 * significant figures (the limit of double precision worth showing) and very
 * large/small values fall back to exponent form.
 */
export function formatResult(value: number): string {
  if (!Number.isFinite(value)) return 'Undefined';
  if (Object.is(value, -0)) return '0';
  if (Number.isInteger(value) && Math.abs(value) < 1e15) return value.toString();
  const magnitude = Math.abs(value);
  if (magnitude !== 0 && (magnitude >= 1e12 || magnitude < 1e-6)) {
    return value.toExponential(6).replace(/\.?0+e/, 'e');
  }
  return Number.parseFloat(value.toPrecision(12)).toString();
}

/** Convenience wrapper used by the calculator UI: returns '' for partial input. */
export function tryEvaluate(source: string, mode: AngleMode): string {
  if (!source.trim()) return '';
  try {
    return formatResult(evaluateExpression(source, mode));
  } catch {
    return '';
  }
}

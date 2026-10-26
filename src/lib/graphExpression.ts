export type AngleMode = 'radians' | 'degrees';

export interface GraphRange {
  min: number;
  max: number;
}

export interface GraphSample {
  x: number;
  y: number | null;
}

type Token =
  | { type: 'number'; value: number }
  | { type: 'identifier'; value: string }
  | { type: 'operator'; value: string }
  | { type: 'eof' };

type ExpressionNode =
  | { type: 'number'; value: number }
  | { type: 'variable'; name: 'x' | 'a' }
  | { type: 'unary'; operator: '+' | '-'; operand: ExpressionNode }
  | {
      type: 'binary';
      operator: '+' | '-' | '*' | '/' | '%' | '^';
      left: ExpressionNode;
      right: ExpressionNode;
    }
  | { type: 'call'; name: string; args: ExpressionNode[] };

export type GraphFunction = (x: number, parameter?: number) => number;

const FUNCTIONS = new Set([
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'sqrt',
  'abs',
  'ln',
  'log',
  'exp',
  'floor',
  'ceil',
  'round',
  'min',
  'max',
]);

const MAX_EXPRESSION_LENGTH = 160;
const MAX_TOKENS = 100;

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let position = 0;

  while (position < source.length) {
    const rest = source.slice(position);
    const whitespace = rest.match(/^\s+/);
    if (whitespace) {
      position += whitespace[0].length;
      continue;
    }

    const number = rest.match(/^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/);
    if (number) {
      const value = Number(number[0]);
      if (!Number.isFinite(value)) throw new Error('Numbers must be finite.');
      tokens.push({ type: 'number', value });
      position += number[0].length;
      continue;
    }

    const identifier = rest.match(/^[a-zA-Z]+/);
    if (identifier) {
      tokens.push({ type: 'identifier', value: identifier[0].toLowerCase() });
      position += identifier[0].length;
      continue;
    }

    const character = source[position];
    if ('+-*/%^(),'.includes(character)) {
      tokens.push({ type: 'operator', value: character });
      position += 1;
      continue;
    }

    throw new Error(`Unsupported character "${character}".`);
  }

  if (tokens.length > MAX_TOKENS) throw new Error('Expression is too complex.');
  tokens.push({ type: 'eof' });
  return tokens;
}

class ExpressionParser {
  private position = 0;

  constructor(private readonly tokens: Token[]) {}

  parse(): ExpressionNode {
    const expression = this.parseAdditive();
    if (this.peek().type !== 'eof') throw new Error('Unexpected input after the expression.');
    return expression;
  }

  private peek(): Token {
    return this.tokens[this.position];
  }

  private take(): Token {
    const token = this.peek();
    this.position += 1;
    return token;
  }

  private isOperator(value: string): boolean {
    const token = this.peek();
    return token.type === 'operator' && token.value === value;
  }

  private parseAdditive(): ExpressionNode {
    let node = this.parseMultiplicative();
    while (this.isOperator('+') || this.isOperator('-')) {
      const operator = this.take();
      if (operator.type !== 'operator') break;
      node = {
        type: 'binary',
        operator: operator.value as '+' | '-',
        left: node,
        right: this.parseMultiplicative(),
      };
    }
    return node;
  }

  private parseMultiplicative(): ExpressionNode {
    let node = this.parseUnary();
    while (true) {
      if (this.isOperator('*') || this.isOperator('/') || this.isOperator('%')) {
        const operator = this.take();
        if (operator.type !== 'operator') break;
        node = {
          type: 'binary',
          operator: operator.value as '*' | '/' | '%',
          left: node,
          right: this.parseUnary(),
        };
        continue;
      }

      const next = this.peek();
      if (
        next.type === 'number' ||
        next.type === 'identifier' ||
        (next.type === 'operator' && next.value === '(')
      ) {
        node = {
          type: 'binary',
          operator: '*',
          left: node,
          right: this.parseUnary(),
        };
        continue;
      }
      return node;
    }
  }

  private parseUnary(): ExpressionNode {
    if (this.isOperator('+') || this.isOperator('-')) {
      const operator = this.take();
      if (operator.type !== 'operator') throw new Error('Expected a unary operator.');
      return {
        type: 'unary',
        operator: operator.value as '+' | '-',
        operand: this.parseUnary(),
      };
    }
    return this.parsePower();
  }

  private parsePower(): ExpressionNode {
    const left = this.parsePrimary();
    if (!this.isOperator('^')) return left;
    this.take();
    return { type: 'binary', operator: '^', left, right: this.parseUnary() };
  }

  private parsePrimary(): ExpressionNode {
    const token = this.take();
    if (token.type === 'number') return { type: 'number', value: token.value };

    if (token.type === 'identifier') {
      if (token.value === 'pi') return { type: 'number', value: Math.PI };
      if (token.value === 'e') return { type: 'number', value: Math.E };
      if (token.value === 'x' || token.value === 'a') {
        return { type: 'variable', name: token.value };
      }

      if (!FUNCTIONS.has(token.value) || !this.isOperator('(')) {
        throw new Error(`Unknown name "${token.value}". Use x, a, pi, e, or a supported function.`);
      }
      this.take();

      const args: ExpressionNode[] = [];
      if (!this.isOperator(')')) {
        do {
          args.push(this.parseAdditive());
          if (!this.isOperator(',')) break;
          this.take();
        } while (true);
      }
      if (!this.isOperator(')')) throw new Error(`Expected ")" after ${token.value}.`);
      this.take();

      if (args.length === 0) throw new Error(`${token.value} needs an argument.`);
      if (!['min', 'max'].includes(token.value) && args.length !== 1) {
        throw new Error(`${token.value} accepts one argument.`);
      }
      return { type: 'call', name: token.value, args };
    }

    if (token.type === 'operator' && token.value === '(') {
      const node = this.parseAdditive();
      if (!this.isOperator(')')) throw new Error('Expected ")".');
      this.take();
      return node;
    }

    throw new Error('Expected a number, x, a, or a parenthesized expression.');
  }
}

function evaluateNode(
  node: ExpressionNode,
  x: number,
  parameter: number,
  angleMode: AngleMode,
): number {
  if (node.type === 'number') return node.value;
  if (node.type === 'variable') return node.name === 'x' ? x : parameter;
  if (node.type === 'unary') {
    const value = evaluateNode(node.operand, x, parameter, angleMode);
    return node.operator === '-' ? -value : value;
  }
  if (node.type === 'binary') {
    const left = evaluateNode(node.left, x, parameter, angleMode);
    const right = evaluateNode(node.right, x, parameter, angleMode);
    switch (node.operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '%':
        return left % right;
      case '^':
        return left ** right;
    }
  }

  const values = node.args.map((arg) => evaluateNode(arg, x, parameter, angleMode));
  const toRadians = (value: number) => (angleMode === 'degrees' ? (value * Math.PI) / 180 : value);
  const fromRadians = (value: number) => (angleMode === 'degrees' ? (value * 180) / Math.PI : value);
  switch (node.name) {
    case 'sin':
      return Math.sin(toRadians(values[0]));
    case 'cos':
      return Math.cos(toRadians(values[0]));
    case 'tan':
      return Math.tan(toRadians(values[0]));
    case 'asin':
      return fromRadians(Math.asin(values[0]));
    case 'acos':
      return fromRadians(Math.acos(values[0]));
    case 'atan':
      return fromRadians(Math.atan(values[0]));
    case 'sqrt':
      return Math.sqrt(values[0]);
    case 'abs':
      return Math.abs(values[0]);
    case 'ln':
      return Math.log(values[0]);
    case 'log':
      return Math.log10(values[0]);
    case 'exp':
      return Math.exp(values[0]);
    case 'floor':
      return Math.floor(values[0]);
    case 'ceil':
      return Math.ceil(values[0]);
    case 'round':
      return Math.round(values[0]);
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    default:
      throw new Error(`Unsupported function "${node.name}".`);
  }
}

export function compileGraphExpression(
  source: string,
  angleMode: AngleMode = 'radians',
): GraphFunction {
  if (source.length > MAX_EXPRESSION_LENGTH) throw new Error('Expression is too long.');
  const normalized = source.trim().replace(/^y\s*=\s*/i, '');
  if (!normalized) throw new Error('Enter an expression after y =.');
  const ast = new ExpressionParser(tokenize(normalized)).parse();

  return (x: number, parameter = 1) => {
    if (!Number.isFinite(x) || !Number.isFinite(parameter)) {
      throw new RangeError('x and a must be finite numbers.');
    }
    const result = evaluateNode(ast, x, parameter, angleMode);
    if (!Number.isFinite(result)) throw new RangeError('The expression is undefined at this x-value.');
    return result;
  };
}

export function isValidGraphRange(min: number, max: number): boolean {
  return (
    Number.isFinite(min) &&
    Number.isFinite(max) &&
    Math.abs(min) <= 1e9 &&
    Math.abs(max) <= 1e9 &&
    max - min >= 1e-9 &&
    max - min <= 1e6
  );
}

export function sampleGraphFunction(
  fn: GraphFunction,
  min: number,
  max: number,
  steps = 500,
  parameter = 1,
): GraphSample[] {
  if (!isValidGraphRange(min, max)) throw new RangeError('The x-range must be finite and increasing.');
  if (!Number.isInteger(steps) || steps < 2 || steps > 5000) {
    throw new RangeError('Sample count must be an integer between 2 and 5000.');
  }

  return Array.from({ length: steps + 1 }, (_, index) => {
    const x = min + ((max - min) * index) / steps;
    try {
      return { x, y: fn(x, parameter) };
    } catch (error) {
      if (error instanceof RangeError) return { x, y: null };
      throw error;
    }
  });
}

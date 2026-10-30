import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Copy, Check, RotateCcw, Share2, Delete } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ExportModal } from '../common/ExportModal';
import { useToast } from '../ui/toast';

interface ScientificCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

type HistoryItem = { expr: string; result: string };

function tokenize(src: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const s = src.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/π/g, 'pi');
  while (i < s.length) {
    if (/\s/.test(s[i])) { i++; continue; }
    if (/[0-9.]/.test(s[i])) {
      let num = '';
      while (i < s.length && /[0-9.eE]/.test(s[i])) {
        num += s[i]; i++;
      }
      tokens.push(num);
      continue;
    }
    if (/[a-zA-Z]/.test(s[i])) {
      let id = '';
      while (i < s.length && /[a-zA-Z0-9]/.test(s[i])) { id += s[i]; i++; }
      tokens.push(id);
      continue;
    }
    if ('+-*/^!%()'.includes(s[i])) { tokens.push(s[i]); i++; continue; }
    i++;
  }
  return tokens;
}

function parseExpression(tokens: string[], pos: { i: number }, mode: 'deg' | 'rad'): number {
  const eat = () => tokens[pos.i++];
  const peek = () => tokens[pos.i];

  const toRad = (v: number) => mode === 'deg' ? (v * Math.PI) / 180 : v;
  const fromRad = (v: number) => mode === 'deg' ? (v * 180) / Math.PI : v;

  function parseExpr(): number {
    let left = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = eat();
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  function parseTerm(): number {
    let left = parseUnary();
    while (peek() === '*' || peek() === '/' || (pos.i < tokens.length && /^[0-9.e(]$/.test(peek() as string) && !['('].includes(peek() as string) === false)) {
      if (peek() === '*' || peek() === '/') {
        const op = eat();
        const right = parseUnary();
        left = op === '*' ? left * right : left / right;
      } else if (pos.i < tokens.length && !isNaN(parseFloat(peek() as string)) && peek() !== '(') {
        const right = parseUnary();
        left = left * right;
      } else {
        break;
      }
    }
    return left;
  }

  function parseUnary(): number {
    if (peek() === '-') { eat(); return -parsePostfix(); }
    if (peek() === '+') { eat(); }
    return parsePostfix();
  }

  function parsePostfix(): number {
    let val = parsePower();
    while (peek() === '!' || peek() === '%') {
      if (peek() === '!') {
        eat();
        val = factorial(val);
      } else if (peek() === '%') {
        eat();
        val = val / 100;
      }
    }
    return val;
  }

  function parsePower(): number {
    let base = parsePrimary();
    if (peek() === '^') {
      eat();
      const exp = parseUnary();
      base = Math.pow(base, exp);
    }
    return base;
  }

  function parsePrimary(): number {
    const t = peek();
    if (!t) throw new Error('Unexpected end');

    if (t === '(') {
      eat();
      const val = parseExpr();
      if (peek() === ')') eat();
      return val;
    }

    if (t === 'pi') { eat(); return Math.PI; }
    if (t === 'e') { eat(); return Math.E; }

    if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log', 'sqrt', 'cbrt', 'abs', 'exp'].includes(t as string)) {
      const fn = eat();
      let arg: number;
      if (peek() === '(') {
        eat();
        arg = parseExpr();
        if (peek() === ')') eat();
      } else {
        arg = parseUnary();
      }
      switch (fn) {
        case 'sin': return Math.sin(toRad(arg));
        case 'cos': return Math.cos(toRad(arg));
        case 'tan': return Math.tan(toRad(arg));
        case 'asin': return fromRad(Math.asin(arg));
        case 'acos': return fromRad(Math.acos(arg));
        case 'atan': return fromRad(Math.atan(arg));
        case 'ln': return Math.log(arg);
        case 'log': return Math.log10(arg);
        case 'sqrt': return Math.sqrt(arg);
        case 'cbrt': return Math.cbrt(arg);
        case 'abs': return Math.abs(arg);
        case 'exp': return Math.exp(arg);
        default: return 0;
      }
    }

    const num = parseFloat(t);
    if (!isNaN(num)) { eat(); return num; }

    throw new Error(`Unknown: ${t}`);
  }

  function factorial(n: number): number {
    if (n < 0 || !Number.isFinite(n)) return NaN;
    n = Math.round(n);
    if (n > 170) return Infinity;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  return parseExpr();
}

function evaluate(expr: string, mode: 'deg' | 'rad'): string {
  if (!expr.trim()) return '';
  try {
    const tokens = tokenize(expr);
    const result = parseExpression(tokens, { i: 0 }, mode);
    if (!Number.isFinite(result)) return 'Undefined';
    return Number.isInteger(result) ? result.toString() : parseFloat(result.toPrecision(12)).toString();
  } catch {
    return '';
  }
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ onSaveHistory }) => {
  const { toast } = useToast();
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => evaluate(expression, angleMode), [expression, angleMode]);

  const handleEvaluate = () => {
    if (!result) return;
    setHistory(prev => [{ expr: expression, result }, ...prev].slice(0, 5));
    if (onSaveHistory) onSaveHistory(`Scientific: ${expression} = ${result}`);
    setExpression(result);
  };

  const handleClear = () => { setExpression(''); };

  const handleBackspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const handleInsert = (val: string) => {
    setExpression(prev => prev + val);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast('Result copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHistoryClick = (item: HistoryItem) => {
    setExpression(item.result);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key;
      if (key >= '0' && key <= '9') { handleInsert(key); return; }
      if (key === '.') { handleInsert('.'); return; }
      if (key === '+') { handleInsert('+'); return; }
      if (key === '-') { handleInsert('-'); return; }
      if (key === '*') { handleInsert('*'); return; }
      if (key === '/') { e.preventDefault(); handleInsert('/'); return; }
      if (key === '(' || key === ')') { handleInsert(key); return; }
      if (key === '^') { handleInsert('^'); return; }
      if (key === 'Enter' || key === '=') { e.preventDefault(); handleEvaluate(); return; }
      if (key === 'Escape') { handleClear(); return; }
      if (key === 'Backspace') { handleBackspace(); return; }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [expression, result]);

  const keypad = [
    ['sin', 'cos', 'tan', 'π', 'e'],
    ['asin', 'acos', 'atan', '(', ')'],
    ['ln', 'log', '√', 'x²', 'xʸ'],
    ['n!', '1/x', '%', 'AC', '⌫'],
    ['7', '8', '9', '÷', ''],
    ['4', '5', '6', '×', ''],
    ['1', '2', '3', '-', ''],
    ['0', '.', '=', '+', ''],
  ];

  const renderBtn = (val: string, idx: number) => {
    if (val === '') return <div key={`empty-${idx}`} />;
    const isAction = val === '=';
    const isClear = val === 'AC';
    const isBackspace = val === '⌫';
    const isFunc = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log', '√', 'n!', '1/x', '%'].includes(val);
    const isConst = val === 'π' || val === 'e';
    const isOp = ['+', '-', '×', '÷', 'x²', 'xʸ'].includes(val);

    let cls = 'h-11 sm:h-12 rounded-lg font-mono text-sm font-semibold transition-colors active:scale-95 ';
    if (isAction) cls += 'bg-primary hover:bg-primary/90 text-white col-span-1';
    else if (isClear) cls += 'bg-red-900/30 hover:bg-red-900/50 text-red-400';
    else if (isBackspace) cls += 'bg-red-900/30 hover:bg-red-900/50 text-red-400';
    else if (isFunc || isConst) cls += 'bg-primary-on-dark/10 hover:bg-primary-on-dark/20 text-primary-on-dark text-xs';
    else if (isOp) cls += 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200';
    else cls += 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100';

    const handleClick = () => {
      if (val === 'AC') { handleClear(); return; }
      if (val === '⌫') { handleBackspace(); return; }
      if (val === '=') { handleEvaluate(); return; }
      if (val === 'π') { handleInsert('pi'); return; }
      if (val === 'x²') { handleInsert('^2'); return; }
      if (val === 'xʸ') { handleInsert('^'); return; }
      if (val === '√') { handleInsert('sqrt('); return; }
      if (val === 'ln') { handleInsert('ln('); return; }
      if (val === 'log') { handleInsert('log('); return; }
      if (val === '1/x') { handleInsert('1/('); return; }
      if (val === '×') { handleInsert('*'); return; }
      if (val === '÷') { handleInsert('/'); return; }
      handleInsert(val);
    };

    return (
      <button
        key={`${val}-${idx}`}
        onClick={handleClick}
        className={cls}
      >
        {val === 'x²' ? 'x²' : val === 'xʸ' ? 'xʸ' : val === '⌫' ? '⌫' : val}
      </button>
    );
  };

  const summaryText = expression ? `${expression} = ${result || '?'}` : result || '';

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-mono">Science</Badge>
            <span className="text-xs font-mono text-zinc-500">Keyboard OK</span>
          </div>
          <CardTitle className="text-xl">Scientific Calculator</CardTitle>
          <CardDescription>Full scientific functions with expression input.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} className="text-xs">
            <Share2 className="w-3.5 h-3.5" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setExpression(''); setHistory([]); }} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" ref={containerRef} tabIndex={0}>
          <div className="lg:col-span-7 space-y-4">
            {history.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handleHistoryClick(h)}
                    className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    {h.expr} = {h.result}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[70%]">
                  {expression || '0'}
                </span>
                <button
                  onClick={() => setAngleMode(m => m === 'deg' ? 'rad' : 'deg')}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded ${angleMode === 'deg' ? 'bg-primary-on-dark/20 text-primary-on-dark' : 'bg-zinc-800 text-zinc-400'}`}
                >
                  {angleMode.toUpperCase()}
                </button>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight tabular-nums">
                  {result || '—'}
                </span>
              </div>
              {result && (
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs text-zinc-400 hover:text-white h-7 px-2">
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {keypad.flat().map((val, i) => renderBtn(val, i))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800 flex-1 space-y-4">
              <div className="text-xs font-mono text-zinc-300 border-b border-zinc-800 pb-2">
                Quick Reference
              </div>
              <div className="space-y-1.5 text-[11px] font-mono text-zinc-400">
                <p>sin(30) → 0.5 <span className="text-zinc-600">in DEG mode</span></p>
                <p>log(100) → 2</p>
                <p>ln(e) → 1</p>
                <p>sqrt(144) → 12</p>
                <p>2^10 → 1024</p>
                <p>5! → 120</p>
                <p>pi → 3.14159…</p>
              </div>
              <div className="pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
                <p>Keyboard: 0-9, +, -, *, /</p>
                <p>Enter = evaluate</p>
                <p>Esc = clear</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        calculatorName="Scientific Calculator"
        title="Scientific Calculation"
        data={{ Expression: expression, Result: result || '—', Mode: angleMode.toUpperCase() }}
        summaryText={summaryText}
      />
    </Card>
  );
};

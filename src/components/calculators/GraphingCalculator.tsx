import React, { useMemo, useRef, useState } from 'react';
import {
  AngleMode,
  compileGraphExpression,
  GraphFunction,
  isValidGraphRange,
  sampleGraphFunction,
} from '../../lib/graphExpression';

interface GraphExpression {
  id: number;
  value: string;
  visible: boolean;
}

interface GraphingCalculatorProps {
  onSaveHistory?: (summary: string) => void;
}

interface ViewRange {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const WIDTH = 760;
const HEIGHT = 440;
const MAX_EXPRESSIONS = 8;
const PLOT = { left: 58, right: 18, top: 18, bottom: 34 };
const PLOT_WIDTH = WIDTH - PLOT.left - PLOT.right;
const PLOT_HEIGHT = HEIGHT - PLOT.top - PLOT.bottom;
const COLORS = ['#059669', '#2563eb', '#e11d48', '#d97706', '#7c3aed'];
const DEFAULT_RANGE: ViewRange = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const EXAMPLES: Array<{ label: string; expressions: string[] }> = [
  { label: 'Line and parabola', expressions: ['y = 2x + 1', 'y = x^2'] },
  { label: 'Trigonometry', expressions: ['y = sin(x)', 'y = cos(x)'] },
  { label: 'Parameter slider', expressions: ['y = a*x^2', 'y = x'] },
];

function niceStep(min: number, max: number): number {
  const rough = (max - min) / 8;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const normalized = rough / magnitude;
  return (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude;
}

function getTicks(min: number, max: number): number[] {
  const step = niceStep(min, max);
  const first = Math.ceil(min / step) * step;
  const count = Math.min(100, Math.floor((max - first) / step) + 1);
  return Array.from({ length: Math.max(0, count) }, (_, index) => {
    const value = first + index * step;
    return Number(value.toPrecision(8));
  });
}

function formatNumber(value: number): string {
  if (Math.abs(value) < 1e-10) return '0';
  return Number(value.toPrecision(6)).toString();
}

function toPath(fn: GraphFunction, range: ViewRange, parameter: number): string {
  const samples = sampleGraphFunction(fn, range.xMin, range.xMax, 600, parameter);
  let drawing = false;
  let previousY = 0;
  const commands: string[] = [];

  for (const sample of samples) {
    if (sample.y === null) {
      drawing = false;
      continue;
    }
    const x = PLOT.left + ((sample.x - range.xMin) / (range.xMax - range.xMin)) * PLOT_WIDTH;
    const y = PLOT.top + ((range.yMax - sample.y) / (range.yMax - range.yMin)) * PLOT_HEIGHT;
    if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(y) > 1e7) {
      drawing = false;
      continue;
    }
    const continues = drawing && Math.abs(y - previousY) <= PLOT_HEIGHT * 2;
    commands.push(`${continues ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`);
    drawing = true;
    previousY = y;
  }
  return commands.join(' ');
}

function evaluate(fn: GraphFunction, x: number, parameter: number): number | null {
  try {
    return fn(x, parameter);
  } catch (error) {
    if (error instanceof RangeError) return null;
    throw error;
  }
}

export const GraphingCalculator: React.FC<GraphingCalculatorProps> = ({ onSaveHistory }) => {
  const [expressions, setExpressions] = useState<GraphExpression[]>([
    { id: 1, value: 'y = 2x + 1', visible: true },
    { id: 2, value: 'y = x^2', visible: true },
  ]);
  const [nextId, setNextId] = useState(3);
  const [range, setRange] = useState<ViewRange>(DEFAULT_RANGE);
  const [parameter, setParameter] = useState(1);
  const [angleMode, setAngleMode] = useState<AngleMode>('radians');
  const [evaluationX, setEvaluationX] = useState(2);
  const [tableStart, setTableStart] = useState(-2);
  const [tableStep, setTableStep] = useState(1);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ clientX: number; clientY: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const compiledExpressions = useMemo(
    () =>
      expressions.map((expression) => {
        try {
          return {
            ...expression,
            fn: compileGraphExpression(expression.value, angleMode),
            error: '',
          };
        } catch (error) {
          return {
            ...expression,
            fn: null,
            error: error instanceof Error ? error.message : 'Could not parse this expression.',
          };
        }
      }),
    [angleMode, expressions],
  );

  const rangeValid =
    isValidGraphRange(range.xMin, range.xMax) &&
    isValidGraphRange(range.yMin, range.yMax);
  const xTicks = rangeValid ? getTicks(range.xMin, range.xMax) : [];
  const yTicks = rangeValid ? getTicks(range.yMin, range.yMax) : [];

  const updateExpression = (id: number, value: string) => {
    setExpressions((current) =>
      current.map((expression) => (expression.id === id ? { ...expression, value } : expression)),
    );
  };

  const addExpression = () => {
    setExpressions((current) => [...current, { id: nextId, value: 'y = ', visible: true }]);
    setNextId((current) => current + 1);
  };

  const loadExample = (values: string[]) => {
    setExpressions(values.map((value, index) => ({ id: index + 1, value, visible: true })));
    setNextId(values.length + 1);
  };

  const updateRange = (key: keyof ViewRange, rawValue: string) => {
    const value = rawValue === '' ? Number.NaN : Number(rawValue);
    setRange((current) => ({ ...current, [key]: value }));
  };

  const coordinateAt = (clientX: number, clientY: number) => {
    const bounds = svgRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width === 0 || bounds.height === 0) return null;
    const svgX = ((clientX - bounds.left) / bounds.width) * WIDTH;
    const svgY = ((clientY - bounds.top) / bounds.height) * HEIGHT;
    if (
      svgX < PLOT.left ||
      svgX > WIDTH - PLOT.right ||
      svgY < PLOT.top ||
      svgY > HEIGHT - PLOT.bottom
    ) {
      return null;
    }
    return {
      svgX,
      svgY,
      x: range.xMin + ((svgX - PLOT.left) / PLOT_WIDTH) * (range.xMax - range.xMin),
      y: range.yMax - ((svgY - PLOT.top) / PLOT_HEIGHT) * (range.yMax - range.yMin),
    };
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const point = coordinateAt(event.clientX, event.clientY);
    setCursor(point ? { x: point.x, y: point.y } : null);
    if (!drag.current) return;

    const previous = drag.current;
    const deltaX = event.clientX - previous.clientX;
    const deltaY = event.clientY - previous.clientY;
    const bounds = svgRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width === 0 || bounds.height === 0) return;
    const shiftX = -(deltaX / bounds.width) * WIDTH * ((range.xMax - range.xMin) / PLOT_WIDTH);
    const shiftY = (deltaY / bounds.height) * HEIGHT * ((range.yMax - range.yMin) / PLOT_HEIGHT);
    setRange((current) => ({
      ...current,
      xMin: current.xMin + shiftX,
      xMax: current.xMax + shiftX,
      yMin: current.yMin + shiftY,
      yMax: current.yMax + shiftY,
    }));
    drag.current = { clientX: event.clientX, clientY: event.clientY };
  };

  const zoom = (factor: number, centerX = (range.xMin + range.xMax) / 2, centerY = (range.yMin + range.yMax) / 2) => {
    setRange((current) => ({
      xMin: centerX + (current.xMin - centerX) * factor,
      xMax: centerX + (current.xMax - centerX) * factor,
      yMin: centerY + (current.yMin - centerY) * factor,
      yMax: centerY + (current.yMax - centerY) * factor,
    }));
  };

  const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const point = coordinateAt(event.clientX, event.clientY);
    zoom(event.deltaY < 0 ? 0.8 : 1.25, point?.x, point?.y);
  };

  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      zoom(0.8);
    } else if (event.key === '-') {
      event.preventDefault();
      zoom(1.25);
    } else if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      const xShift = (range.xMax - range.xMin) * 0.05 * (event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0);
      const yShift = (range.yMax - range.yMin) * 0.05 * (event.key === 'ArrowUp' ? 1 : event.key === 'ArrowDown' ? -1 : 0);
      setRange((current) => ({
        ...current,
        xMin: current.xMin + xShift,
        xMax: current.xMax + xShift,
        yMin: current.yMin + yShift,
        yMax: current.yMax + yShift,
      }));
    }
  };

  const tableExpressions = compiledExpressions.filter(
    (expression): expression is typeof expression & { fn: GraphFunction } =>
      expression.visible && expression.fn !== null,
  );
  const tableRowsValid = Number.isFinite(tableStart) && Number.isFinite(tableStep) && tableStep !== 0;
  const evaluationValid = Number.isFinite(evaluationX);

  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Graph expressions</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Plot explicit functions of x. Expressions are evaluated locally in your browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onSaveHistory?.(`Graphing expressions: ${expressions.map(({ value }) => value).join('; ')}`)} className="min-h-11 rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 text-sm hover:border-emerald-600">
            Save expressions
          </button>
          <button type="button" onClick={() => setExpressions([])} className="min-h-11 rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 text-sm hover:border-rose-600">
            Clear all
          </button>
          <button type="button" onClick={addExpression} disabled={expressions.length >= MAX_EXPRESSIONS} className="min-h-11 rounded-lg bg-emerald-700 px-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">
            Add expression
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.6fr)]">
        <div className="space-y-4">
          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-semibold">Expressions</legend>
            {expressions.length === 0 && (
              <p className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-3 text-sm text-zinc-500">
                No expressions yet. Add one or load an example.
              </p>
            )}
            {expressions.length >= MAX_EXPRESSIONS && (
              <p className="text-xs text-zinc-500">Up to {MAX_EXPRESSIONS} expressions can be plotted at once.</p>
            )}
            {compiledExpressions.map((expression, index) => (
              <div key={expression.id} className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <label htmlFor={`graph-expression-${expression.id}`} className="sr-only">Expression {index + 1}</label>
                  <input
                    id={`graph-expression-${expression.id}`}
                    value={expression.value}
                    onChange={(event) => updateExpression(expression.id, event.target.value)}
                    className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    spellCheck={false}
                    autoComplete="off"
                    aria-invalid={Boolean(expression.error)}
                  />
                  <button
                    type="button"
                    onClick={() => setExpressions((current) => current.map((item) => item.id === expression.id ? { ...item, visible: !item.visible } : item))}
                    className="min-h-11 min-w-11 rounded-md border border-zinc-300 dark:border-zinc-700 px-2 text-xs"
                    aria-label={`${expression.visible ? 'Hide' : 'Show'} expression ${index + 1}`}
                    aria-pressed={expression.visible}
                  >
                    {expression.visible ? 'Hide' : 'Show'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpressions((current) => current.filter((item) => item.id !== expression.id))}
                    className="min-h-11 min-w-11 rounded-md border border-zinc-300 dark:border-zinc-700 px-2 text-xs hover:border-rose-600"
                    aria-label={`Remove expression ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
                {expression.error && <p role="alert" className="text-xs text-rose-700 dark:text-rose-400">{expression.error}</p>}
              </div>
            ))}
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="graph-example" className="block text-sm font-semibold">Load an example</label>
            <select
              id="graph-example"
              defaultValue=""
              onChange={(event) => {
                const example = EXAMPLES[Number(event.target.value)];
                if (example) loadExample(example.expressions);
                event.currentTarget.value = '';
              }}
              className="min-h-11 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm"
            >
              <option value="" disabled>Choose a graph</option>
              {EXAMPLES.map((example, index) => <option key={example.label} value={index}>{example.label}</option>)}
            </select>
          </div>

          <label className="block space-y-2 text-sm font-semibold" htmlFor="graph-parameter">
            Parameter a <output className="font-mono font-normal">{parameter.toFixed(1)}</output>
            <input
              id="graph-parameter"
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={parameter}
              onChange={(event) => setParameter(Number(event.target.value))}
              className="w-full accent-emerald-700"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            {([
              ['xMin', 'x minimum'],
              ['xMax', 'x maximum'],
              ['yMin', 'y minimum'],
              ['yMax', 'y maximum'],
            ] as Array<[keyof ViewRange, string]>).map(([key, label]) => (
              <label key={key} className="space-y-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {label}
                <input
                  type="number"
                  value={Number.isFinite(range[key]) ? range[key] : ''}
                  onChange={(event) => updateRange(key, event.target.value)}
                  className="min-h-11 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 font-mono text-sm text-zinc-950 dark:text-zinc-50"
                  aria-label={label}
                />
              </label>
            ))}
          </div>
          {!rangeValid && (
            <p role="alert" className="text-sm text-rose-700 dark:text-rose-400">
              Each range needs finite, increasing bounds no wider than 1,000,000 units.
            </p>
          )}
          <label className="flex items-center justify-between gap-3 text-sm">
            Angle mode
            <select
              value={angleMode}
              onChange={(event) => setAngleMode(event.target.value as AngleMode)}
              className="min-h-11 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2"
            >
              <option value="radians">Radians</option>
              <option value="degrees">Degrees</option>
            </select>
          </label>
        </div>

        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">Coordinate plane</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => zoom(0.8)} className="min-h-11 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-sm" aria-label="Zoom in">Zoom in</button>
              <button type="button" onClick={() => zoom(1.25)} className="min-h-11 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-sm" aria-label="Zoom out">Zoom out</button>
              <button type="button" onClick={() => setRange(DEFAULT_RANGE)} className="min-h-11 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 text-sm">Reset view</button>
            </div>
          </div>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950"
            style={{ touchAction: 'none' }}
            role="img"
            aria-label="Interactive graph. Drag to pan, use the mouse wheel to zoom, or use arrow keys and plus or minus."
            tabIndex={0}
            onPointerDown={(event) => {
              if (!rangeValid || event.button !== 0) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              drag.current = { clientX: event.clientX, clientY: event.clientY };
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={() => { drag.current = null; }}
            onPointerCancel={() => { drag.current = null; }}
            onPointerLeave={() => { if (!drag.current) setCursor(null); }}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
          >
            <title>Graph of the entered explicit functions</title>
            <defs>
              <clipPath id="graph-plot-area">
                <rect x={PLOT.left} y={PLOT.top} width={PLOT_WIDTH} height={PLOT_HEIGHT} />
              </clipPath>
            </defs>
            {rangeValid && (
              <>
                {xTicks.map((tick) => {
                  const x = PLOT.left + ((tick - range.xMin) / (range.xMax - range.xMin)) * PLOT_WIDTH;
                  return (
                    <g key={`x-${tick}`}>
                      <line x1={x} x2={x} y1={PLOT.top} y2={HEIGHT - PLOT.bottom} stroke="#d4d4d8" strokeWidth="1" />
                      {tick !== 0 && <text x={x} y={HEIGHT - 12} textAnchor="middle" fontSize="11" fill="#71717a">{formatNumber(tick)}</text>}
                    </g>
                  );
                })}
                {yTicks.map((tick) => {
                  const y = PLOT.top + ((range.yMax - tick) / (range.yMax - range.yMin)) * PLOT_HEIGHT;
                  return (
                    <g key={`y-${tick}`}>
                      <line x1={PLOT.left} x2={WIDTH - PLOT.right} y1={y} y2={y} stroke="#d4d4d8" strokeWidth="1" />
                      {tick !== 0 && <text x={PLOT.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#71717a">{formatNumber(tick)}</text>}
                    </g>
                  );
                })}
                {range.xMin <= 0 && range.xMax >= 0 && (
                  <line x1={PLOT.left + ((0 - range.xMin) / (range.xMax - range.xMin)) * PLOT_WIDTH} x2={PLOT.left + ((0 - range.xMin) / (range.xMax - range.xMin)) * PLOT_WIDTH} y1={PLOT.top} y2={HEIGHT - PLOT.bottom} stroke="#52525b" strokeWidth="1.5" />
                )}
                {range.yMin <= 0 && range.yMax >= 0 && (
                  <line x1={PLOT.left} x2={WIDTH - PLOT.right} y1={PLOT.top + ((range.yMax - 0) / (range.yMax - range.yMin)) * PLOT_HEIGHT} y2={PLOT.top + ((range.yMax - 0) / (range.yMax - range.yMin)) * PLOT_HEIGHT} stroke="#52525b" strokeWidth="1.5" />
                )}
                <g clipPath="url(#graph-plot-area)" pointerEvents="none">
                  {compiledExpressions.map((expression, index) => {
                    if (!expression.visible || !expression.fn) return null;
                    return (
                      <g key={expression.id}>
                        <path d={toPath(expression.fn, range, parameter)} fill="none" stroke={COLORS[index % COLORS.length]} strokeWidth="2.5" />
                        {evaluationValid && (() => {
                          const y = evaluate(expression.fn, evaluationX, parameter);
                          if (y === null || evaluationX < range.xMin || evaluationX > range.xMax || y < range.yMin || y > range.yMax) return null;
                          const cx = PLOT.left + ((evaluationX - range.xMin) / (range.xMax - range.xMin)) * PLOT_WIDTH;
                          const cy = PLOT.top + ((range.yMax - y) / (range.yMax - range.yMin)) * PLOT_HEIGHT;
                          return <circle cx={cx} cy={cy} r="4" fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth="1.5" />;
                        })()}
                      </g>
                    );
                  })}
                </g>
                {cursor && (
                  <g pointerEvents="none">
                    <line x1={PLOT.left} x2={WIDTH - PLOT.right} y1={PLOT.top + ((range.yMax - cursor.y) / (range.yMax - range.yMin)) * PLOT_HEIGHT} y2={PLOT.top + ((range.yMax - cursor.y) / (range.yMax - range.yMin)) * PLOT_HEIGHT} stroke="#71717a" strokeDasharray="4 4" />
                    <line x1={PLOT.left + ((cursor.x - range.xMin) / (range.xMax - range.xMin)) * PLOT_WIDTH} x2={PLOT.left + ((cursor.x - range.xMin) / (range.xMax - range.xMin)) * PLOT_WIDTH} y1={PLOT.top} y2={HEIGHT - PLOT.bottom} stroke="#71717a" strokeDasharray="4 4" />
                  </g>
                )}
              </>
            )}
          </svg>
          <p aria-live="polite" className="min-h-5 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            {cursor ? `Pointer: (${formatNumber(cursor.x)}, ${formatNumber(cursor.y)})` : 'Drag to pan · wheel or buttons to zoom · arrow keys pan · +/− zoom'}
          </p>
        </div>
      </div>

      <div className="grid gap-5 border-t border-zinc-200 dark:border-zinc-800 pt-5 lg:grid-cols-2">
        <section aria-labelledby="graph-evaluation-heading" className="space-y-3">
          <h3 id="graph-evaluation-heading" className="text-sm font-semibold">Evaluate functions at x</h3>
          <label className="flex max-w-xs items-center gap-3 text-sm">
            x =
            <input type="number" value={evaluationValid ? evaluationX : ''} onChange={(event) => setEvaluationX(event.target.value === '' ? Number.NaN : Number(event.target.value))} className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 font-mono" aria-label="x-value for evaluation" />
          </label>
          {evaluationValid && (
            <ul className="space-y-1 text-sm font-mono">
              {compiledExpressions.filter((item) => item.visible).map((expression, index) => (
                <li key={expression.id} style={{ color: COLORS[index % COLORS.length] }}>
                  {expression.value}: {expression.fn ? (evaluate(expression.fn, evaluationX, parameter) === null ? 'undefined' : formatNumber(evaluate(expression.fn, evaluationX, parameter)!)) : 'invalid expression'}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="graph-table-heading" className="space-y-3">
          <h3 id="graph-table-heading" className="text-sm font-semibold">Table of values</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <label className="flex items-center gap-2">Start x
              <input type="number" value={Number.isFinite(tableStart) ? tableStart : ''} onChange={(event) => setTableStart(event.target.value === '' ? Number.NaN : Number(event.target.value))} className="min-h-11 w-24 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 font-mono" />
            </label>
            <label className="flex items-center gap-2">Step
              <input type="number" value={Number.isFinite(tableStep) ? tableStep : ''} onChange={(event) => setTableStep(event.target.value === '' ? Number.NaN : Number(event.target.value))} className="min-h-11 w-24 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-2 font-mono" />
            </label>
          </div>
          {!tableRowsValid ? (
            <p role="alert" className="text-sm text-rose-700 dark:text-rose-400">Enter a finite start and a non-zero step.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th scope="col" className="p-2 font-semibold">x</th>
                    {tableExpressions.map((expression, index) => <th scope="col" key={expression.id} className="p-2 font-mono font-semibold" style={{ color: COLORS[compiledExpressions.findIndex((item) => item.id === expression.id) % COLORS.length] }}>y{index + 1}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 7 }, (_, row) => {
                    const x = tableStart + row * tableStep;
                    return (
                      <tr key={row} className="border-b border-zinc-100 dark:border-zinc-800">
                        <th scope="row" className="p-2 font-mono font-normal">{formatNumber(x)}</th>
                        {tableExpressions.map((expression) => {
                          const y = evaluate(expression.fn, x, parameter);
                          return <td key={expression.id} className="p-2 font-mono">{y === null ? 'undefined' : formatNumber(y)}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <p className="border-t border-zinc-200 dark:border-zinc-800 pt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        Syntax: numbers, x, a, pi, e, parentheses, + − × ÷ %, powers (^), and sin, cos, tan, asin, acos, atan, sqrt, abs, ln, log, exp, floor, ceil, round, min, and max. Trigonometric inputs follow the selected angle mode. This tool graphs explicit y = f(x) expressions only; it does not provide symbolic algebra, implicit equations, inequalities, derivatives, integrals, regression, or equation solving.
      </p>
    </section>
  );
};

import React from 'react';
import { CoordinatePlot } from '../charts/CoordinatePlot';
import { CompositionBar, ProportionPie, DeltaBars } from '../charts/IndicatorBar';
import { DialGauge } from '../common/DialGauge';

/**
 * Visualisations for config-driven calculators.
 *
 * `ConfigCalculator` renders one of these under the inputs when a slug is
 * registered here. The registry is keyed by slug rather than declared in the
 * catalogue because a good plot is geometry-specific: a slope needs a rise/run
 * triangle, a quadratic needs its roots and vertex marked, a right triangle needs
 * to look like a triangle. A shared declarative schema for those cases would be a
 * mini-language that still could not express them well.
 *
 * Rule for adding one: only when a picture answers a question the numbers cannot
 * answer on their own. A bar chart of ten unrelated figures is noise, not a
 * visualisation.
 */

export interface ConfigVisualProps {
  /** Live field values, keyed by field id. */
  values: Record<string, number>;
  /** Evaluated result values, in `spec.results` order. */
  results: number[];
  /** Number formatting used by the result panel (locale and currency aware). */
  format: (value: number) => string;
}

type ConfigVisual = React.FC<ConfigVisualProps>;

const num = (value: number): string =>
  new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(value);

const isNum = (value: number | undefined): value is number => Number.isFinite(value);

/** Slope between two points, plus the human description of steepness. */
const SlopeVisual: ConfigVisual = ({ values }) => {
  const { x1, y1, x2, y2 } = values;
  if (![x1, y1, x2, y2].every(isNum)) return null;

  const run = x2 - x1;
  const rise = y2 - y1;
  const vertical = run === 0;
  const slope = vertical ? Number.POSITIVE_INFINITY : rise / run;

  const direction = vertical
    ? 'a vertical line, whose slope is undefined'
    : slope === 0
      ? 'a horizontal line, so the slope is 0'
      : slope > 0
        ? `a line that rises left to right, so the slope is positive (${num(slope)})`
        : `a line that falls left to right, so the slope is negative (${num(slope)})`;

  const summary = vertical
    ? `Both points sit at x = ${num(x1)}, so the line is vertical and the slope is undefined. The rise is ${num(rise)} and the run is 0.`
    : `From (${num(x1)}, ${num(y1)}) to (${num(x2)}, ${num(y2)}) the run is ${num(run)} and the rise is ${num(rise)}. Rise divided by run gives ${direction}.`;

  return (
    <CoordinatePlot
      title="The line through your two points"
      summary={summary}
      points={[
        { x: x1, y: y1, label: `(${num(x1)}, ${num(y1)})` },
        { x: x2, y: y2, label: `(${num(x2)}, ${num(y2)})` },
      ]}
      line
      showRiseRun
      xLabel="x"
      yLabel="y"
      height={340}
    />
  );
};

/** Two points joined by the measured segment, with the Δx / Δy legs shown. */
const DistanceVisual: ConfigVisual = ({ values }) => {
  const { x1, y1, x2, y2 } = values;
  if (![x1, y1, x2, y2].every(isNum)) return null;

  const run = Math.abs(x2 - x1);
  const rise = Math.abs(y2 - y1);
  const distance = Math.sqrt(run * run + rise * rise);

  const summary = `The gap between the points is ${num(run)} horizontally and ${num(rise)} vertically. Those two legs form a right triangle whose hypotenuse is the distance, ${num(distance)}.`;

  return (
    <CoordinatePlot
      title="Distance as the hypotenuse of a right triangle"
      summary={summary}
      points={[
        { x: x1, y: y1, label: `(${num(x1)}, ${num(y1)})` },
        { x: x2, y: y2, label: `(${num(x2)}, ${num(y2)})` },
      ]}
      segment
      showRiseRun
      xLabel="x"
      yLabel="y"
      height={340}
    />
  );
};

/** A parabola with its roots and turning point marked. */
const QuadraticVisual: ConfigVisual = ({ values }) => {
  const { a, b, c } = values;
  if (![a, b, c].every(isNum)) return null;

  if (a === 0) {
    // Not a parabola — show the straight line it actually is rather than a curve
    // that implies a shape the equation does not have.
    const xAt = (y: number) => (b === 0 ? Number.NaN : (y - c) / b);
    const xs = b === 0 ? [c - 1, c + 1] : [xAt(0) - 2, xAt(0) + 2];
    const summary =
      b === 0
        ? `With a = 0 and b = 0 the equation is just y = ${num(c)}, a horizontal line.`
        : `With a = 0 the equation is not quadratic: y = ${num(b)}x + ${num(c)} is a straight line.`;
    return (
      <CoordinatePlot
        title="Your equation is a straight line"
        summary={summary}
        points={xs.map((x) => ({ x, y: b * x + c }))}
        line
        xLabel="x"
        yLabel="y"
        height={320}
      />
    );
  }

  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  let rootA: number | undefined;
  let rootB: number | undefined;
  if (discriminant >= 0) {
    const root = Math.sqrt(discriminant);
    rootA = (-b + root) / (2 * a);
    rootB = (-b - root) / (2 * a);
  }
  const hasRoots = typeof rootA === 'number' && typeof rootB === 'number';
  const lowRoot = hasRoots ? Math.min(rootA as number, rootB as number) : Number.NaN;
  const highRoot = hasRoots ? Math.max(rootA as number, rootB as number) : Number.NaN;

  // Frame the interesting part of the curve: the roots when they exist, the vertex
  // otherwise, with a span wide enough that the shape reads as a parabola.
  const span = hasRoots
    ? Math.max(2, Math.abs(highRoot - lowRoot) * 1.6)
    : Math.max(4, Math.abs(vertexX) * 1.2 + 2);

  const start = vertexX - span;
  const end = vertexX + span;
  const samples = 120;
  const curve = Array.from({ length: samples + 1 }, (_, i) => {
    const x = start + ((end - start) * i) / samples;
    return { x, y: a * x * x + b * x + c };
  });

  /**
   * Labels are pushed away from the body of the parabola, because that is the
   * only region guaranteed to be empty. With `a > 0` the curve sits above the
   * x-axis so labels hang below their markers; with `a < 0` it is the reverse.
   */
  const labelSide = a > 0 ? 1 : -1;

  const points = [
    ...(hasRoots
      ? [
          {
            x: lowRoot,
            y: 0,
            label: `root ${num(lowRoot)}`,
            labelDx: 0,
            labelDy: labelSide * 19,
            labelAnchor: 'middle' as const,
          },
        ]
      : []),
    ...(hasRoots && highRoot !== lowRoot
      ? [
          {
            x: highRoot,
            y: 0,
            label: `root ${num(highRoot)}`,
            labelDx: 0,
            labelDy: labelSide * 19,
            labelAnchor: 'middle' as const,
          },
        ]
      : []),
    {
      x: vertexX,
      y: vertexY,
      label: `vertex (${num(vertexX)}, ${num(vertexY)})`,
      labelDx: 0,
      // Deeper than the root labels so the two rows never share a band, even for
      // a very flat parabola whose turning point sits almost on the axis.
      labelDy: labelSide * 38,
      labelAnchor: 'middle' as const,
    },
  ];

  const summary = hasRoots
    ? highRoot !== lowRoot
      ? `The parabola crosses the x-axis twice, at ${num(lowRoot)} and ${num(highRoot)}. Its turning point is (${num(vertexX)}, ${num(vertexY)}) and it opens ${a > 0 ? 'upwards' : 'downwards'}.`
      : `The parabola touches the x-axis once, at ${num(lowRoot)} — a repeated root. It opens ${a > 0 ? 'upwards' : 'downwards'}.`
    : `The parabola never crosses the x-axis: the discriminant is ${num(discriminant)}, so both roots are complex. Its turning point is (${num(vertexX)}, ${num(vertexY)}) and it opens ${a > 0 ? 'upwards' : 'downwards'}.`;

  return (
    <CoordinatePlot
      title="Your parabola"
      summary={summary}
      points={points}
      curves={[{ points: curve }]}
      xLabel="x"
      yLabel="y"
      height={360}
    />
  );
};

/**
 * A right triangle drawn to scale for the Pythagorean theorem.
 *
 * Drawn as its own small SVG rather than on a coordinate plane: the visitor is
 * checking a shape, not reading coordinates, so axes would only add clutter.
 */
const RightTriangleVisual: ConfigVisual = ({ values }) => {
  const { a, b } = values;
  if (!isNum(a) || !isNum(b) || a <= 0 || b <= 0) return null;

  const c = Math.sqrt(a * a + b * b);

  // Fit the legs into a fixed box while keeping the drawn shape proportional.
  const boxWidth = 320;
  const boxHeight = 200;
  const scale = Math.min(boxWidth / a, boxHeight / b);
  const legA = a * scale;
  const legB = b * scale;

  const originX = 40;
  const originY = 40 + legB;
  const cornerX = originX + legA;

  const summary = `Legs of ${num(a)} and ${num(b)} meet at a right angle, so the hypotenuse is √(${num(a)}² + ${num(b)}²) = ${num(c)}.`;

  return (
    <figure>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        Your right triangle
      </figcaption>
      <svg
        viewBox="0 0 400 280"
        width="100%"
        height={280}
        role="img"
        aria-labelledby="right-triangle-title"
        className="overflow-visible rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <title id="right-triangle-title">Right triangle with legs {num(a)} and {num(b)} and hypotenuse {num(c)}</title>
        <desc>{summary}</desc>

        <polygon
          points={`${originX},${originY} ${cornerX},${originY} ${cornerX},${originY - legB}`}
          className="fill-indigo-500/10 stroke-indigo-500 dark:fill-indigo-400/10 dark:stroke-indigo-400"
          strokeWidth={2}
        />

        {/* right-angle marker */}
        <polyline
          points={`${cornerX - 12},${originY} ${cornerX - 12},${originY - 12} ${cornerX},${originY - 12}`}
          fill="none"
          className="stroke-zinc-400 dark:stroke-zinc-500"
          strokeWidth={1.5}
        />

        {/* leg labels */}
        <text
          x={originX + legA / 2}
          y={originY + 20}
          textAnchor="middle"
          className="fill-zinc-700 font-mono text-[12px] font-bold dark:fill-zinc-200"
        >
          {`a = ${num(a)}`}
        </text>
        <text
          x={cornerX + 10}
          y={originY - legB / 2}
          textAnchor="start"
          className="fill-zinc-700 font-mono text-[12px] font-bold dark:fill-zinc-200"
        >
          {`b = ${num(b)}`}
        </text>
        <text
          x={originX + legA / 2 - 18}
          y={originY - legB / 2 - 8}
          textAnchor="middle"
          className="fill-indigo-700 font-mono text-[12px] font-bold dark:fill-indigo-300"
        >
          {`c = ${num(c)}`}
        </text>
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
    </figure>
  );
};

/**
 * A circle drawn to scale, with the radius and diameter marked.
 *
 * Area and circumference are abstract squares and lengths; seeing the circle with
 * its radius labelled is what connects "radius 7" to "154 units squared".
 */
const CircleVisual: ConfigVisual = ({ values }) => {
  const { radius } = values;
  if (!isNum(radius) || radius <= 0) return null;

  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;

  const size = 240;
  const centre = size / 2;
  // A single circle has nothing to compare against, so it is drawn at a
  // comfortable fixed size; only the labels carry the real magnitude.
  const drawnRadius = centre - 18;

  const summary = `A circle with radius ${num(radius)} has a diameter of ${num(radius * 2)}, an area of ${num(area)} square units (πr²) and a circumference of ${num(circumference)} units (2πr).`;

  return (
    <figure>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        Your circle
      </figcaption>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height={size}
        role="img"
        aria-labelledby="circle-visual-title"
        className="max-w-[280px] overflow-visible rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <title id="circle-visual-title">
          Circle with radius {num(radius)}, area {num(area)} and circumference {num(circumference)}
        </title>
        <desc>{summary}</desc>
        <circle
          cx={centre}
          cy={centre}
          r={drawnRadius}
          className="fill-indigo-500/10 stroke-indigo-500 dark:fill-indigo-400/10 dark:stroke-indigo-400"
          strokeWidth={2}
        />
        <line
          x1={centre}
          y1={centre}
          x2={centre + drawnRadius}
          y2={centre}
          className="stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <circle cx={centre} cy={centre} r={2.5} className="fill-indigo-500 dark:fill-indigo-400" />
        <text
          x={centre + drawnRadius / 2}
          y={centre - 8}
          textAnchor="middle"
          className="fill-zinc-800 font-mono text-[11px] font-bold dark:fill-zinc-100"
        >
          {`r = ${num(radius)}`}
        </text>
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
    </figure>
  );
};

/** The growth (or decay) curve up to the requested time, with the end marked. */
const ExponentialGrowthVisual: ConfigVisual = ({ values }) => {
  const { y0, r, t } = values;
  if (![y0, r, t].every(isNum)) return null;
  if (t <= 0) return null;

  const final = y0 * Math.exp(r * t);
  const samples = 120;
  const curve = Array.from({ length: samples + 1 }, (_, i) => {
    const time = (t * i) / samples;
    return { x: time, y: y0 * Math.exp(r * time) };
  });

  const summary =
    r === 0
      ? `With a growth rate of 0 the value stays at ${num(y0)} for the whole ${num(t)} periods.`
      : `Starting from ${num(y0)}, the value ${r > 0 ? 'grows' : 'decays'} at ${num(r * 100)}% per period and reaches ${num(final)} after ${num(t)} periods. The curve is steepest at the end, which is what "exponential" means.`;

  return (
    <CoordinatePlot
      title="Growth over time"
      summary={summary}
      points={[
        { x: 0, y: y0, label: `start ${num(y0)}` },
        { x: t, y: final, label: `end ${num(final)}` },
      ]}
      curves={[{ points: curve }]}
      xLabel="time"
      yLabel="value"
      height={320}
    />
  );
};

/**
 * Correct vs wrong answers as one bar.
 *
 * The percentage alone hides how much room for error was left: 90% of 10 is not
 * the same test as 90% of 200, and "4 wrong" reads instantly.
 */
const TestScoreVisual: ConfigVisual = ({ values }) => {
  const { correct, total } = values;
  if (!isNum(correct) || !isNum(total) || total <= 0) return null;

  const percent = (correct / total) * 100;
  const wrong = Math.max(0, total - correct);

  return (
    <CompositionBar
      segments={[
        { label: `${num(clamp(correct, 0, total))} correct`, value: clamp(correct, 0, total), tone: 'primary' },
        { label: `${num(wrong)} wrong`, value: wrong, tone: 'warning' },
      ]}
      totalLabel={`${num(total)} questions`}
      summary={`${num(correct)} of ${num(total)} answers correct is ${num(percent)}%. The bar splits the test into ${num(clamp(correct, 0, total))} correct and ${num(wrong)} wrong.`}
    />
  );
};

/** Local clamp so the visual can never draw more than a whole. */
function clamp(value: number, low: number, high: number): number {
  return Math.min(high, Math.max(low, value));
}

/**
 * The two ratios drawn on one shared scale, so the scaling is visible.
 *
 * A proportion question is really "how much bigger is the second pair", and a
 * row of four bars on one axis answers that at a glance.
 */
const RatioVisual: ConfigVisual = ({ values }) => {
  const { a, b, c } = values;
  if (![a, b, c].every(isNum)) return null;
  if (a === 0) return null;

  const d = (c * b) / a;
  const scale = c / a;
  if (!Number.isFinite(d)) return null;

  const largest = Math.max(a, b, c, d, 1);

  const row = (label: string, first: number, second: number, firstLabel: string, secondLabel: string) => (
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <div className="flex flex-1 items-center gap-1">
        <div className="flex h-3 items-center" style={{ width: `${(Math.abs(first) / largest) * 100}%` }}>
          <div className="h-full w-full rounded-full bg-indigo-500 dark:bg-indigo-400" />
        </div>
        <span className="font-mono text-[10px] tabular-nums text-zinc-700 dark:text-zinc-300">{firstLabel}</span>
        <div className="flex h-3 items-center" style={{ width: `${(Math.abs(second) / largest) * 100}%` }}>
          <div className="h-full w-full rounded-full bg-zinc-400 dark:bg-zinc-600" />
        </div>
        <span className="font-mono text-[10px] tabular-nums text-zinc-700 dark:text-zinc-300">{secondLabel}</span>
      </div>
    </div>
  );

  return (
    <figure
      role="img"
      aria-label={`The ratio ${num(a)} to ${num(b)} scales by ${num(scale)} to become ${num(c)} to ${num(d)}.`}
    >
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        Both ratios on one scale
      </figcaption>
      <div className="space-y-2 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        {row('a : b', a, b, num(a), num(b))}
        {row('c : d', c, d, num(c), num(d))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        {`The second pair is the first pair multiplied by ${num(scale)}, so c : d = ${num(c)} : ${num(d)}.`}
      </p>
    </figure>
  );
};

/**
 * Cost and profit stacked into the selling price.
 *
 * Markup and margin are two views of the same split, and seeing the split makes
 * the difference between them obvious in a way two percentages do not.
 */
const MarkupVisual: ConfigVisual = ({ values, format }) => {
  const { cost, markupPct } = values;
  if (!isNum(cost) || !isNum(markupPct)) return null;

  const profit = cost * (markupPct / 100);
  const price = cost + profit;
  const margin = price > 0 ? (profit / price) * 100 : 0;

  return (
    <CompositionBar
      segments={[
        { label: 'Cost', value: cost, tone: 'muted' },
        { label: 'Profit', value: profit, tone: 'positive' },
      ]}
      totalLabel={`Price ${format(price)}`}
      summary={`The selling price of ${format(price)} is made of ${format(cost)} cost and ${format(profit)} profit. Profit is ${num(markupPct)}% of cost but ${num(margin)}% of the price, which is the difference between markup and margin.`}
    />
  );
};

/** A dial for the GPA, on the 4.0 scale it is normally read against. */
const GpaVisual: ConfigVisual = ({ values }) => {
  const { totalPoints, totalCredits } = values;
  if (!isNum(totalPoints) || !isNum(totalCredits) || totalCredits <= 0) return null;

  const gpa = totalPoints / totalCredits;
  // Some institutions run a 5.0 scale; widen the dial rather than clamp a real
  // result into the top of a 4.0 arc, which would read as "perfect".
  const max = Math.max(4, Math.ceil(gpa * 2) / 2);

  return (
    <div className="max-w-[320px]">
      <DialGauge
        value={gpa}
        min={0}
        max={max}
        // One tick per whole grade point, so the labels read 0, 1, 2, 3, 4 rather
        // than rounding fractional stops into duplicates.
        ticks={Math.max(2, Math.round(max))}
        caption="GPA"
        formatValue={(reading) => reading.toFixed(2)}
        ariaLabel={`Grade point average ${gpa.toFixed(2)} on a 0 to ${max} scale.`}
      />
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        {`${num(totalPoints)} grade points over ${num(totalCredits)} credit hours gives a GPA of ${gpa.toFixed(2)} on a 0 to ${max} scale.`}
      </p>
    </div>
  );
};

/** A fraction drawn as its share of a full circle. */
const FractionVisual: ConfigVisual = ({ values }) => {
  const { numerator, denominator } = values;
  if (!isNum(numerator) || !isNum(denominator) || denominator === 0) return null;

  const ratio = numerator / denominator;
  const percent = ratio * 100;

  return (
    <figure className="flex flex-wrap items-center gap-5">
      <ProportionPie
        numerator={numerator}
        denominator={denominator}
        centerLabel={`${num(percent)}%`}
        centerSub="of the whole"
        summary={`${num(numerator)} out of ${num(denominator)} is ${num(percent)}% of the whole, shown as a filled ${num(clamp(ratio * 100, 0, 100))}% slice.`}
      />
      <figcaption className="max-w-xs text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        {ratio > 1
          ? `${num(numerator)} ÷ ${num(denominator)} is ${num(ratio)} — more than one whole, so the circle is filled and the value is ${num(percent)}%.`
          : `${num(numerator)} ÷ ${num(denominator)} is ${num(ratio)}, so the fraction fills ${num(clamp(percent, 0, 100))}% of the circle.`}
      </figcaption>
    </figure>
  );
};

/**
 * A roof cross-section: the rise/run triangle with the pitch angle marked.
 *
 * "6/12" is meaningless until you see how shallow it is, and the angle is the
 * number a roofer actually works to.
 */
const RoofPitchVisual: ConfigVisual = ({ values }) => {
  const { rise, run } = values;
  if (!isNum(rise) || !isNum(run) || run <= 0) return null;

  const pitch = (rise / run) * 12;
  const angle = (Math.atan2(rise, run) * 180) / Math.PI;
  const grade = (rise / run) * 100;

  const boxW = 300;
  const boxH = 170;
  const scale = Math.min(boxW / run, boxH / Math.max(rise, 0.001));
  const w = run * scale;
  const h = rise * scale;

  const originX = 50;
  const originY = 200;
  const rightX = originX + w;
  const topY = originY - h;

  const summary = `A rise of ${num(rise)} over a run of ${num(run)} is a ${num(pitch)}:12 pitch, an angle of ${num(angle)}° and a ${num(grade)}% grade. The steeper the line, the more roofing material each square of floor area needs.`;

  return (
    <figure>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        Your roof pitch
      </figcaption>
      <svg
        viewBox="0 0 420 240"
        width="100%"
        height={240}
        role="img"
        aria-labelledby="roof-pitch-title"
        className="overflow-visible rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <title id="roof-pitch-title">{summary}</title>
        <desc>{summary}</desc>

        <polygon
          points={`${originX},${originY} ${rightX},${originY} ${rightX},${topY}`}
          className="fill-indigo-500/10 stroke-indigo-500 dark:fill-indigo-400/10 dark:stroke-indigo-400"
          strokeWidth={2}
        />

        {/* angle arc at the shallow corner */}
        <path
          d={`M ${originX + 28} ${originY} A 28 28 0 0 0 ${originX + 28 * Math.cos((angle * Math.PI) / 180)} ${
            originY - 28 * Math.sin((angle * Math.PI) / 180)
          }`}
          fill="none"
          className="stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth={2}
        />
        <text
          x={originX + 34}
          y={originY - 10}
          className="fill-emerald-700 font-mono text-[11px] font-bold dark:fill-emerald-300"
        >
          {`${num(angle)}°`}
        </text>

        <text
          x={originX + w / 2}
          y={originY + 18}
          textAnchor="middle"
          className="fill-zinc-700 font-mono text-[11px] font-bold dark:fill-zinc-200"
        >
          {`run ${num(run)}`}
        </text>
        <text
          x={rightX + 10}
          y={originY - h / 2}
          className="fill-zinc-700 font-mono text-[11px] font-bold dark:fill-zinc-200"
        >
          {`rise ${num(rise)}`}
        </text>
        <text
          x={rightX - 6}
          y={topY - 10}
          textAnchor="end"
          className="fill-indigo-700 font-mono text-[12px] font-bold dark:fill-indigo-300"
        >
          {`${num(pitch)}:12`}
        </text>
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
    </figure>
  );
};

/**
 * A side profile of the staircase.
 *
 * Riser count, tread count and stringer length are three numbers describing one
 * shape; drawing the shape is how a builder checks it will fit.
 */
const StairVisual: ConfigVisual = ({ values }) => {
  const { totalRise, targetRiser, treadDepth } = values;
  if (![totalRise, targetRiser, treadDepth].every(isNum) || targetRiser <= 0) return null;

  const risers = Math.max(1, Math.round(totalRise / targetRiser));
  const treads = Math.max(0, risers - 1);
  const riserHeight = totalRise / risers;

  const boxW = 340;
  const boxH = 180;
  const totalWidth = treads * treadDepth;
  const scale = Math.min(boxW / Math.max(totalWidth, 1), boxH / Math.max(totalRise, 1));

  const stepW = treadDepth * scale;
  const stepH = riserHeight * scale;

  const startX = 40;
  const startY = 215;

  // Walk up the stairs: riser, tread, riser, tread … last riser has no tread.
  const points: string[] = [`${startX},${startY}`];
  let x = startX;
  let y = startY;
  for (let i = 0; i < risers; i += 1) {
    y -= stepH;
    points.push(`${x},${y}`);
    if (i < treads) {
      x += stepW;
      points.push(`${x},${y}`);
    }
  }

  const summary = `${num(totalRise)} of total rise split into ${risers} risers gives ${num(
    riserHeight
  )} per step. With ${num(treadDepth)} treads there are ${treads} going surfaces and a total run of ${num(
    treads * treadDepth
  )}.`;

  return (
    <figure>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        Your staircase, side on
      </figcaption>
      <svg
        viewBox="0 0 430 250"
        width="100%"
        height={250}
        role="img"
        aria-labelledby="stair-visual-title"
        className="overflow-visible rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <title id="stair-visual-title">{summary}</title>
        <desc>{summary}</desc>

        <polyline
          points={points.join(' ')}
          fill="none"
          className="stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {/* total rise and total run reference lines */}
        <line
          x1={startX}
          y1={startY}
          x2={startX + (treads * stepW) + stepW}
          y2={startY}
          className="stroke-zinc-300 dark:stroke-zinc-700"
          strokeDasharray="4 3"
        />
        <line
          x1={startX + (treads * stepW) + stepW}
          y1={startY}
          x2={startX + (treads * stepW) + stepW}
          y2={startY - totalRise * scale}
          className="stroke-zinc-300 dark:stroke-zinc-700"
          strokeDasharray="4 3"
        />

        <text
          x={startX + (treads * stepW) / 2}
          y={startY + 16}
          textAnchor="middle"
          className="fill-zinc-700 font-mono text-[10px] font-bold dark:fill-zinc-200"
        >
          {`run ${num(treads * treadDepth)}`}
        </text>
        <text
          x={startX + (treads * stepW) + stepW + 8}
          y={startY - (totalRise * scale) / 2}
          className="fill-zinc-700 font-mono text-[10px] font-bold dark:fill-zinc-200"
        >
          {`rise ${num(totalRise)}`}
        </text>
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
    </figure>
  );
};

/** The frame drawn at the requested ratio, so the proportion is visible. */
const AspectRatioVisual: ConfigVisual = ({ values }) => {
  const { ratioW, ratioH, width, height } = values;
  if (![ratioW, ratioH].every(isNum) || ratioW <= 0 || ratioH <= 0) return null;

  const ratio = ratioW / ratioH;
  const boxW = 260;
  const boxH = 150;
  const drawnW = ratio >= boxW / boxH ? boxW : boxH * ratio;
  const drawnH = ratio >= boxW / boxH ? boxW / ratio : boxH;

  const w = isNum(width) ? width : ratio * (height ?? 0);
  const h = isNum(height) ? height : width / ratio;

  const summary = `A ${num(ratioW)}:${num(ratioH)} frame keeps the same shape at any size. At ${num(
    w
  )} wide the height is ${num(h)} — the outline beside it is that proportion.`;

  return (
    <figure>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        Your aspect ratio
      </figcaption>
      <div className="flex items-center gap-4">
        <svg
          viewBox="0 0 300 180"
          width="100%"
          height={180}
          role="img"
          aria-labelledby="aspect-ratio-title"
          className="max-w-[300px] overflow-visible rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        >
          <title id="aspect-ratio-title">{summary}</title>
          <desc>{summary}</desc>
          <rect
            x={(300 - drawnW) / 2}
            y={(180 - drawnH) / 2}
            width={drawnW}
            height={drawnH}
            className="fill-indigo-500/10 stroke-indigo-500 dark:fill-indigo-400/10 dark:stroke-indigo-400"
            strokeWidth={2}
          />
          <text
            x={150}
            y={180 / 2 - drawnH / 2 - 8}
            textAnchor="middle"
            className="fill-zinc-700 font-mono text-[10px] font-bold dark:fill-zinc-200"
          >
            {`${num(ratioW)} : ${num(ratioH)}`}
          </text>
        </svg>
        <figcaption className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</figcaption>
      </div>
    </figure>
  );
};

/**
 * Value lost to depreciation over the ownership period.
 *
 * The point of the tool is the shape of the loss — steepest in year one — and a
 * single "value after 5 years" figure hides that entirely.
 */
const CarDepreciationVisual: ConfigVisual = ({ values, format }) => {
  const { price, annualRate, years } = values;
  if (![price, annualRate, years].every(isNum) || price <= 0 || years <= 0) return null;

  const rate = annualRate / 100;
  const samples = 120;
  const curve = Array.from({ length: samples + 1 }, (_, i) => {
    const t = (years * i) / samples;
    return { x: t, y: price * Math.pow(1 - rate, t) };
  });

  const final = price * Math.pow(1 - rate, years);
  const lost = price - final;
  const lostPercent = (lost / price) * 100;

  const summary = `At ${num(annualRate)}% a year, ${format(price)} becomes ${format(
    final
  )} after ${num(years)} years — ${format(lost)} of value gone (${num(
    lostPercent
  )}%). The curve is steepest early, which is why the first years cost the most.`;

  return (
    <CoordinatePlot
      title="Value over time"
      summary={summary}
      points={[
        { x: 0, y: price, label: format(price) },
        { x: years, y: final, label: format(final), labelDy: -18 },
      ]}
      curves={[{ points: curve }]}
      xLabel="years"
      yLabel="value"
      xFloor={0}
      yFloor={0}
      height={330}
    />
  );
};

/** Before and after pay, on one scale. */
const SalaryIncreaseVisual: ConfigVisual = ({ values, format }) => {
  const { currentSalary, increasePercent } = values;
  if (![currentSalary, increasePercent].every(isNum)) return null;

  const newSalary = currentSalary * (1 + increasePercent / 100);

  return (
    <DeltaBars
      from={currentSalary}
      to={newSalary}
      percent={increasePercent}
      fromLabel="Now"
      toLabel="New"
      formatValue={format}
      summary={`A ${num(increasePercent)}% raise moves annual pay from ${format(
        currentSalary
      )} to ${format(newSalary)}. Both bars share one scale, so the gap is the real size of the raise.`}
    />
  );
};

const VISUALS: Record<string, ConfigVisual> = {
  'slope-calculator': SlopeVisual,
  'distance-formula-calculator': DistanceVisual,
  'quadratic-formula-calculator': QuadraticVisual,
  'pythagorean-theorem-calculator': RightTriangleVisual,
  'circle-area-calculator': CircleVisual,
  'exponential-growth-calculator': ExponentialGrowthVisual,
  'test-score-percentage-calculator': TestScoreVisual,
  'ratio-proportion-calculator': RatioVisual,
  'markup-margin-calculator': MarkupVisual,
  'gpa-calculator': GpaVisual,
  'fraction-to-percent-calculator': FractionVisual,
  'roof-pitch-calculator': RoofPitchVisual,
  'stair-calculator': StairVisual,
  'aspect-ratio-calculator': AspectRatioVisual,
  'car-depreciation-calculator': CarDepreciationVisual,
  'salary-increase-calculator': SalaryIncreaseVisual,
};

/** The visual for a calculator, or undefined when a picture would add nothing. */
export function getConfigVisual(slug: string): ConfigVisual | undefined {
  return VISUALS[slug];
}

/** Slugs that currently have a visual — used by the audit script. */
export function configVisualSlugs(): string[] {
  return Object.keys(VISUALS);
}

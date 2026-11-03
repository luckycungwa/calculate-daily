import React from 'react';

/**
 * A cartesian plot for geometry and algebra calculators.
 *
 * Why hand-rolled SVG rather than the ECharts wrappers in `./index`:
 *  - it renders completely on the server, so the chart is in the prerendered HTML
 *    and paints before any JavaScript loads (ECharts only draws after the lazy
 *    import resolves, which is why the other charts show "Loading chart…" first);
 *  - a school-style coordinate plane with labelled points, a rise/run triangle and
 *    exact axis ticks is the thing visitors are taught to recognise, and ECharts'
 *    category axis cannot express it;
 *  - theme colours come from Tailwind classes, so a theme toggle repaints without
 *    a re-render or a `MutationObserver`.
 *
 * Nothing here is decorative: every mark corresponds to a value the calculator
 * produced, and the caller always supplies the text summary and table alternative.
 */

export interface PlotPoint {
  x: number;
  y: number;
  /** Short label drawn beside the marker, e.g. "(2, 3)". */
  label?: string;
  /**
   * Per-point nudge for the label, in pixels. When two marked points sit close
   * together (a vertex near a root) their labels otherwise overlap into an
   * unreadable smear, and no single default offset suits every geometry.
   */
  labelDx?: number;
  labelDy?: number;
  /** Label alignment relative to the marker. Defaults to start. */
  labelAnchor?: 'start' | 'middle' | 'end';
}

export interface PlotCurve {
  points: Array<{ x: number; y: number }>;
  /** Solid by default; dashed for a construction line. */
  dashed?: boolean;
  /** Close the curve to the y = 0 baseline and shade the area beneath it. */
  fill?: boolean;
  /** Tailwind stroke colour class. Defaults to the indigo data series. */
  className?: string;
  /** Tailwind fill class used when `fill` is set. */
  fillClassName?: string;
}

export interface CoordinatePlotProps {
  /** Marked points, in the order they should be joined. */
  points: PlotPoint[];
  /** Draw the straight line through the first two points across the whole domain. */
  line?: boolean;
  /** Draw only the segment joining the first two points, with no extension. */
  segment?: boolean;
  /** Draw and label the horizontal Δx / vertical Δy legs between the first two points. */
  showRiseRun?: boolean;
  /** Sampled curves, e.g. a parabola. */
  curves?: PlotCurve[];
  xLabel?: string;
  yLabel?: string;
  /** Smallest value the x-axis may show. Use 0 where negatives are meaningless. */
  xFloor?: number;
  /** Smallest value the y-axis may show. */
  yFloor?: number;
  height?: number;
  /** Accessible name for the figure. Required. */
  title: string;
  /** Text equivalent of what the plot shows. Required. */
  summary: string;
  className?: string;
}

/** Viewbox width. Height is the prop so vertical aspect stays stable. */
const VIEW_WIDTH = 640;
const PAD = { left: 44, right: 20, top: 18, bottom: 34 };

const NUM = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 });

function formatTick(value: number): string {
  if (Math.abs(value) < 1e-9) return '0';
  return NUM.format(value);
}

/**
 * Pick a human tick step (1, 2, 5, 10 × 10^n) covering the range in roughly
 * `target` intervals. Returns 1 for a zero-width range so the axis still draws.
 */
export function niceStep(range: number, target = 6): number {
  if (!Number.isFinite(range) || range <= 0) return 1;
  const rough = range / target;
  const power = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalised = rough / power;
  const multiplier = normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 5 ? 5 : 10;
  return multiplier * power;
}

interface Domain {
  min: number;
  max: number;
  step: number;
}

/**
 * Build a padded, tick-aligned domain for one axis.
 *
 * Padding keeps markers off the frame; aligning to the tick step stops labels
 * showing values like `3.0000000000000004`. A flat series (all points equal) is
 * widened by one unit so the axis still has something to show.
 */
export function buildDomain(values: number[], padRatio = 0.18): Domain {
  const finite = values.filter((v) => Number.isFinite(v));
  if (finite.length === 0) return { min: -1, max: 1, step: 1 };

  let min = Math.min(...finite);
  let max = Math.max(...finite);

  if (min === max) {
    const bump = Math.max(1, Math.abs(min) * 0.5);
    min -= bump;
    max += bump;
  }

  const pad = (max - min) * padRatio;
  min -= pad;
  max += pad;

  const step = niceStep(max - min);
  return {
    min: Math.floor(min / step) * step,
    max: Math.ceil(max / step) * step,
    step,
  };
}

function ticks(domain: Domain): number[] {
  const out: number[] = [];
  // Guard against a pathological step/domain combination producing a huge loop.
  const count = Math.min(40, Math.round((domain.max - domain.min) / domain.step));
  for (let i = 0; i <= count; i += 1) {
    out.push(Number((domain.min + i * domain.step).toFixed(10)));
  }
  return out;
}

export const CoordinatePlot: React.FC<CoordinatePlotProps> = ({
  points,
  line = false,
  segment = false,
  showRiseRun = false,
  curves = [],
  xLabel = 'x',
  yLabel = 'y',
  xFloor,
  yFloor,
  height = 320,
  title,
  summary,
  className,
}) => {
  const validPoints = points.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
  const validCurves = curves
    .map((c) => ({
      ...c,
      points: c.points.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y)),
    }))
    .filter((c) => c.points.length > 1);

  const allX = [...validPoints.map((p) => p.x), ...validCurves.flatMap((c) => c.points.map((p) => p.x))];
  const allY = [...validPoints.map((p) => p.y), ...validCurves.flatMap((c) => c.points.map((p) => p.y))];

  // A shaded area is read against the baseline, so the axis must include it even
  // when every sampled value sits well above zero (a probability density does).
  if (validCurves.some((c) => c.fill)) allY.push(0);

  if (allX.length === 0) return null;

  const xDomain = buildDomain(allX);
  const yDomain = buildDomain(allY);

  // Some axes describe quantities that cannot be negative — years of ownership,
  // an amount of money. Padding them below zero would print a meaningless tick.
  if (xFloor !== undefined && Number.isFinite(xFloor)) {
    xDomain.min = Math.max(xDomain.min, xFloor);
    if (xDomain.max <= xDomain.min) xDomain.max = xDomain.min + xDomain.step;
  }
  if (yFloor !== undefined && Number.isFinite(yFloor)) {
    yDomain.min = Math.max(yDomain.min, yFloor);
    if (yDomain.max <= yDomain.min) yDomain.max = yDomain.min + yDomain.step;
  }

  const plotWidth = VIEW_WIDTH - PAD.left - PAD.right;
  const plotHeight = height - PAD.top - PAD.bottom;

  const toX = (x: number) => PAD.left + ((x - xDomain.min) / (xDomain.max - xDomain.min)) * plotWidth;
  const toY = (y: number) => PAD.top + (1 - (y - yDomain.min) / (yDomain.max - yDomain.min)) * plotHeight;

  const xTicks = ticks(xDomain);
  const yTicks = ticks(yDomain);

  // Axes are drawn at zero when it is in view, otherwise pinned to the nearest edge.
  const axisY = yDomain.min <= 0 && yDomain.max >= 0 ? toY(0) : toY(yDomain.min);
  const axisX = xDomain.min <= 0 && xDomain.max >= 0 ? toX(0) : toX(xDomain.min);
  const xTickLabelY = Math.min(height - PAD.bottom + 16, Math.max(PAD.top + 12, axisY + 14));

  const first = validPoints[0];
  const second = validPoints[1];

  // The rise/run legs are only meaningful for two distinct plotted points.
  const canShowRiseRun = showRiseRun && first && second;
  const isVertical = canShowRiseRun && first.x === second.x;
  const rise = canShowRiseRun ? second.y - first.y : 0;
  const run = canShowRiseRun ? second.x - first.x : 0;

  // A straight line through the first two points, clipped to the plot rect.
  let lineSegment: { x1: number; y1: number; x2: number; y2: number } | null = null;
  if (line && first && second && first.x !== second.x) {
    const m = (second.y - first.y) / (second.x - first.x);
    const b = first.y - m * first.x;
    const yAtMin = m * xDomain.min + b;
    const yAtMax = m * xDomain.max + b;
    lineSegment = {
      x1: toX(xDomain.min),
      y1: toY(yAtMin),
      x2: toX(xDomain.max),
      y2: toY(yAtMax),
    };
  } else if (line && first && second && first.x === second.x) {
    lineSegment = { x1: toX(first.x), y1: PAD.top, x2: toX(first.x), y2: PAD.top + plotHeight };
  }

  const gridClass = 'stroke-zinc-200 dark:stroke-zinc-800';
  const axisClass = 'stroke-zinc-400 dark:stroke-zinc-600';
  const tickTextClass = 'fill-zinc-500 dark:fill-zinc-400';
  const seriesClass = 'stroke-indigo-500 dark:stroke-indigo-400';
  const seriesFill = 'fill-indigo-500 dark:fill-indigo-400';
  const constructClass = 'stroke-zinc-400 dark:stroke-zinc-500';

  return (
    <figure className={className}>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        {title}
      </figcaption>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-labelledby="coordinate-plot-title"
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <title id="coordinate-plot-title">{title}</title>
        <desc>{summary}</desc>

        <defs>
          {/* Keeps the extended line inside the frame even for a big slope. */}
          <clipPath id="coordinate-plot-clip">
            <rect x={PAD.left} y={PAD.top} width={plotWidth} height={plotHeight} />
          </clipPath>
        </defs>

        {/* grid */}
        <g aria-hidden="true">
          {xTicks.map((t) => (
            <line
              key={`gx-${t}`}
              x1={toX(t)}
              y1={PAD.top}
              x2={toX(t)}
              y2={PAD.top + plotHeight}
              className={gridClass}
              strokeWidth={1}
            />
          ))}
          {yTicks.map((t) => (
            <line
              key={`gy-${t}`}
              x1={PAD.left}
              y1={toY(t)}
              x2={PAD.left + plotWidth}
              y2={toY(t)}
              className={gridClass}
              strokeWidth={1}
            />
          ))}
          {/* axes */}
          <line x1={PAD.left} y1={axisY} x2={PAD.left + plotWidth} y2={axisY} className={axisClass} strokeWidth={1.5} />
          <line x1={axisX} y1={PAD.top} x2={axisX} y2={PAD.top + plotHeight} className={axisClass} strokeWidth={1.5} />
        </g>

        {/* tick labels */}
        <g aria-hidden="true" className={`font-mono text-[10px] ${tickTextClass}`}>
          {xTicks.map((t) => (
            <text key={`tx-${t}`} x={toX(t)} y={xTickLabelY} textAnchor="middle">
              {formatTick(t)}
            </text>
          ))}
          {yTicks.map((t) => (
            <text key={`ty-${t}`} x={PAD.left - 8} y={toY(t) + 3.5} textAnchor="end">
              {formatTick(t)}
            </text>
          ))}
        </g>

        {/* axis names */}
        <g aria-hidden="true" className={`font-mono text-[11px] ${tickTextClass}`}>
          <text x={PAD.left + plotWidth} y={axisY - 6} textAnchor="end">
            {xLabel}
          </text>
          <text x={axisX + 6} y={PAD.top + 10}>
            {yLabel}
          </text>
        </g>

        {/* sampled curves */}
        <g clipPath="url(#coordinate-plot-clip)">
          {validCurves.map((curve, index) => {
            const coordinates = curve.points.map((p) => `${toX(p.x)},${toY(p.y)}`).join(' ');
            return (
              <g key={`curve-${index}`}>
                {curve.fill && (
                  <polygon
                    points={`${toX(curve.points[0].x)},${toY(0)} ${coordinates} ${toX(
                      curve.points[curve.points.length - 1].x
                    )},${toY(0)}`}
                    className={curve.fillClassName ?? 'fill-indigo-500/25 dark:fill-indigo-400/25'}
                    stroke="none"
                  />
                )}
                <polyline
                  points={coordinates}
                  fill="none"
                  className={curve.className ?? seriesClass}
                  strokeWidth={2}
                  strokeDasharray={curve.dashed ? '5 4' : undefined}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {lineSegment && (
            <line
              x1={lineSegment.x1}
              y1={lineSegment.y1}
              x2={lineSegment.x2}
              y2={lineSegment.y2}
              className={seriesClass}
              strokeWidth={2}
            />
          )}

          {segment && first && second && (
            <line
              x1={toX(first.x)}
              y1={toY(first.y)}
              x2={toX(second.x)}
              y2={toY(second.y)}
              className={seriesClass}
              strokeWidth={2}
            />
          )}
        </g>

        {/* rise / run construction */}
        {canShowRiseRun && (
          <g aria-hidden="true" className={constructClass}>
            {!isVertical && (
              <>
                <line
                  x1={toX(first.x)}
                  y1={toY(first.y)}
                  x2={toX(second.x)}
                  y2={toY(first.y)}
                  strokeDasharray="4 3"
                  strokeWidth={1.5}
                />
                <text
                  x={(toX(first.x) + toX(second.x)) / 2}
                  y={toY(first.y) + (rise >= 0 ? 14 : -6)}
                  textAnchor="middle"
                  className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-300"
                >
                  {`run = ${formatTick(run)}`}
                </text>
                <line
                  x1={toX(second.x)}
                  y1={toY(first.y)}
                  x2={toX(second.x)}
                  y2={toY(second.y)}
                  strokeDasharray="4 3"
                  strokeWidth={1.5}
                />
                <text
                  x={toX(second.x) + 6}
                  y={(toY(first.y) + toY(second.y)) / 2 + 3}
                  textAnchor="start"
                  className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-300"
                >
                  {`rise = ${formatTick(rise)}`}
                </text>
              </>
            )}
            {isVertical && (
              <text
                x={toX(first.x) + 8}
                y={PAD.top + plotHeight / 2}
                className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-300"
              >
                vertical line — run = 0
              </text>
            )}
          </g>
        )}

        {/* plotted points last so they sit above the line */}
        <g>
          {validPoints.map((point, index) => (
            <g key={`point-${index}`}>
              <circle
                cx={toX(point.x)}
                cy={toY(point.y)}
                r={5}
                className={`${seriesFill} stroke-white dark:stroke-zinc-950`}
                strokeWidth={2}
              />
              {point.label && (
                <text
                  x={toX(point.x) + (point.labelDx ?? 8)}
                  y={toY(point.y) - 8 + (point.labelDy ?? 0)}
                  textAnchor={point.labelAnchor ?? 'start'}
                  className="fill-zinc-900 font-mono text-[11px] font-bold dark:fill-zinc-100"
                >
                  {point.label}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>

      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
    </figure>
  );
};

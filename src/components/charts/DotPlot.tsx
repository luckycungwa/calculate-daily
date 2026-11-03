import React from 'react';

/**
 * A stem/dot plot of a dataset on a number line.
 *
 * Mean, median and standard deviation are the answer to "where is the middle and
 * how spread out is it", and a row of summary numbers cannot show either. On a
 * dot plot the shape is immediate: a tight cluster, a long tail, two clumps, or a
 * single outlier sitting far from everything else.
 *
 * Rendered as plain SVG so it is present in the prerendered HTML and readable
 * before any JavaScript runs.
 */

export interface DotPlotMarker {
  value: number;
  label: string;
  /** Solid markers are the measured values; dashed ones are derived positions. */
  dashed?: boolean;
}

export interface DotPlotBand {
  from: number;
  to: number;
  label: string;
}

export interface DotPlotProps {
  values: number[];
  /** Derived positions, e.g. the mean and median. */
  markers?: DotPlotMarker[];
  /** A shaded interval, e.g. mean ± one standard deviation. */
  band?: DotPlotBand;
  title: string;
  summary: string;
  height?: number;
  className?: string;
}

const VIEW_WIDTH = 640;
const PAD = { left: 26, right: 26, top: 18, bottom: 44 };
const NUM = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 });

/** 1, 2, 5 × 10^n steps, matching the coordinate plot. */
function niceStep(range: number, target = 8): number {
  if (!Number.isFinite(range) || range <= 0) return 1;
  const rough = range / target;
  const power = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalised = rough / power;
  const multiplier = normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 5 ? 5 : 10;
  return multiplier * power;
}

const formatTick = (value: number): string =>
  Math.abs(value) < 1e-9 ? '0' : NUM.format(value);

export const DotPlot: React.FC<DotPlotProps> = ({
  values,
  markers = [],
  band,
  title,
  summary,
  height = 210,
  className,
}) => {
  const finite = values.filter((v) => Number.isFinite(v));
  if (finite.length === 0) return null;

  let min = Math.min(...finite);
  let max = Math.max(...finite);
  if (band) {
    min = Math.min(min, band.from, band.to);
    max = Math.max(max, band.from, band.to);
  }
  markers.forEach((m) => {
    if (Number.isFinite(m.value)) {
      min = Math.min(min, m.value);
      max = Math.max(max, m.value);
    }
  });

  if (min === max) {
    const bump = Math.max(1, Math.abs(min) * 0.5);
    min -= bump;
    max += bump;
  }

  const pad = (max - min) * 0.06;
  const domainMin = min - pad;
  const domainMax = max + pad;

  const plotWidth = VIEW_WIDTH - PAD.left - PAD.right;
  const baseline = height - PAD.bottom;
  const plotHeight = baseline - PAD.top;

  const toX = (v: number) => PAD.left + ((v - domainMin) / (domainMax - domainMin)) * plotWidth;

  // One column per distinct value, so repeats stack instead of hiding each other.
  const columns = new Map<string, { value: number; count: number }>();
  finite.forEach((v) => {
    const key = v.toFixed(6);
    const existing = columns.get(key);
    if (existing) existing.count += 1;
    else columns.set(key, { value: v, count: 1 });
  });

  const rows = Math.max(1, ...Array.from(columns.values()).map((c) => c.count));
  const dotGap = Math.min(14, plotHeight / Math.max(rows, 3));
  const dotRadius = Math.min(5, dotGap / 2.6);

  const step = niceStep(domainMax - domainMin);
  const tickStart = Math.ceil(domainMin / step) * step;
  const ticks: number[] = [];
  for (let t = tickStart; t <= domainMax + 1e-9 && ticks.length < 40; t += step) {
    ticks.push(Number(t.toFixed(10)));
  }

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
        aria-label={summary}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <title>{title}</title>
        <desc>{summary}</desc>

        {/* shaded interval */}
        {band && band.to > band.from && (
          <g aria-hidden="true">
            <rect
              x={toX(band.from)}
              y={PAD.top}
              width={Math.max(1, toX(band.to) - toX(band.from))}
              height={plotHeight}
              className="fill-indigo-500/10 dark:fill-indigo-400/10"
            />
            <text
              x={(toX(band.from) + toX(band.to)) / 2}
              y={PAD.top + 11}
              textAnchor="middle"
              className="fill-indigo-700 font-mono text-[9px] font-bold uppercase tracking-wider dark:fill-indigo-300"
            >
              {band.label}
            </text>
          </g>
        )}

        {/* axis */}
        <line
          x1={PAD.left}
          y1={baseline}
          x2={PAD.left + plotWidth}
          y2={baseline}
          className="stroke-zinc-400 dark:stroke-zinc-600"
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <g aria-hidden="true" className="fill-zinc-500 font-mono text-[10px] dark:fill-zinc-400">
          {ticks.map((t) => (
            <g key={`tick-${t}`}>
              <line
                x1={toX(t)}
                y1={baseline}
                x2={toX(t)}
                y2={baseline + 4}
                className="stroke-zinc-400 dark:stroke-zinc-600"
              />
              <text x={toX(t)} y={baseline + 17} textAnchor="middle">
                {formatTick(t)}
              </text>
            </g>
          ))}
        </g>

        {/* dots */}
        <g aria-hidden="true">
          {Array.from(columns.values()).map((column) =>
            Array.from({ length: column.count }, (_, index) => (
              <circle
                key={`dot-${column.value}-${index}`}
                cx={toX(column.value)}
                cy={baseline - dotRadius - index * dotGap}
                r={dotRadius}
                className="fill-indigo-500 dark:fill-indigo-400"
              />
            ))
          )}
        </g>

        {/* derived markers */}
        <g aria-hidden="true">
          {markers.map((marker, index) => {
            if (!Number.isFinite(marker.value)) return null;
            const x = toX(marker.value);
            // Keep the label inside the frame when the marker sits near an edge.
            const anchor = x < PAD.left + 60 ? 'start' : x > VIEW_WIDTH - PAD.right - 60 ? 'end' : 'middle';
            return (
              <g key={`marker-${marker.label}-${index}`}>
                <line
                  x1={x}
                  y1={PAD.top + 26}
                  x2={x}
                  y2={baseline}
                  className={
                    marker.dashed
                      ? 'stroke-zinc-500 dark:stroke-zinc-400'
                      : 'stroke-emerald-600 dark:stroke-emerald-400'
                  }
                  strokeWidth={1.5}
                  strokeDasharray={marker.dashed ? '4 3' : undefined}
                />
                <text
                  x={x}
                  y={PAD.top + 22}
                  textAnchor={anchor}
                  className={
                    marker.dashed
                      ? 'fill-zinc-600 font-mono text-[9px] font-bold dark:fill-zinc-300'
                      : 'fill-emerald-700 font-mono text-[9px] font-bold dark:fill-emerald-300'
                  }
                >
                  {marker.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
    </figure>
  );
};

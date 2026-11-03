import React from 'react';

/**
 * Small, single-value indicators.
 *
 * These exist because a lot of the catalogue answers a "how much of the whole?"
 * question, and two numbers stacked in a card do not communicate a proportion.
 * Each indicator renders pure markup (no chart library) so it appears in the
 * prerendered HTML and is readable on first paint.
 */

const clampPercent = (value: number): number =>
  Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

const fmt = (value: number, digits = 2): string =>
  Number.isFinite(value)
    ? new Intl.NumberFormat('en-GB', { maximumFractionDigits: digits }).format(value)
    : '—';

export interface ProportionBarProps {
  /** Share of the whole, 0-100. Values outside the range are clamped for the bar. */
  percent: number;
  /** Left caption, e.g. "15% of 240". */
  label: string;
  /** Right caption, e.g. the absolute amount. */
  valueLabel: string;
  /** Text alternative describing the proportion. */
  summary: string;
  className?: string;
}

export const ProportionBar: React.FC<ProportionBarProps> = ({
  percent,
  label,
  valueLabel,
  summary,
  className,
}) => {
  const filled = clampPercent(percent);
  const overflow = percent > 100;

  return (
    <figure className={className}>
      <div className="flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        <span className="truncate">{label}</span>
        <span className="shrink-0 font-bold text-zinc-900 dark:text-zinc-100">{valueLabel}</span>
      </div>

      <div
        role="img"
        aria-label={summary}
        className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
      >
        <div
          className={`h-full rounded-full ${overflow ? 'bg-amber-500 dark:bg-amber-400' : 'bg-indigo-500 dark:bg-indigo-400'}`}
          style={{ width: `${filled}%` }}
        />
      </div>

      <div className="mt-1 flex items-center justify-between font-mono text-[10px] tabular-nums text-zinc-500 dark:text-zinc-400">
        <span>{fmt(percent)}%</span>
        <span>{overflow ? 'over 100%' : 'of the whole'}</span>
      </div>
    </figure>
  );
};

export interface CompositionSegment {
  label: string;
  value: number;
  /**
   * `primary` is the part you asked about, `muted` the remainder, `positive`
   * profit/gain, `warning` loss/fee. Colour carries meaning, so it is never
   * chosen for decoration.
   */
  tone?: 'primary' | 'muted' | 'positive' | 'warning';
}

export interface CompositionBarProps {
  segments: CompositionSegment[];
  /** Caption under the bar, e.g. "Selling price $60". */
  totalLabel?: string;
  summary: string;
  className?: string;
}

const TONE_CLASS: Record<NonNullable<CompositionSegment['tone']>, string> = {
  primary: 'bg-indigo-500 dark:bg-indigo-400',
  muted: 'bg-zinc-300 dark:bg-zinc-700',
  positive: 'bg-emerald-500 dark:bg-emerald-400',
  warning: 'bg-amber-500 dark:bg-amber-400',
};

/**
 * A single stacked bar showing how a total breaks into named parts.
 *
 * This is the right primitive whenever the interesting fact is "how much of the
 * whole is each piece" — cost vs profit, right vs wrong answers, discount vs
 * tax vs price. Segments with zero or negative values are dropped rather than
 * drawn as invisible slivers that still consume legend space.
 */
export const CompositionBar: React.FC<CompositionBarProps> = ({
  segments,
  totalLabel,
  summary,
  className,
}) => {
  const drawable = segments.filter((s) => Number.isFinite(s.value) && s.value > 0);
  const total = drawable.reduce((sum, s) => sum + s.value, 0);

  if (drawable.length === 0 || total <= 0) return null;

  return (
    <figure className={className}>
      <div role="img" aria-label={summary} className="flex h-4 w-full overflow-hidden rounded-full">
        {drawable.map((segment, index) => (
          <div
            key={`${segment.label}-${index}`}
            className={`h-full ${TONE_CLASS[segment.tone ?? 'primary']} ${
              index === drawable.length - 1 ? '' : 'border-r border-white dark:border-zinc-950'
            }`}
            style={{ width: `${(segment.value / total) * 100}%` }}
          />
        ))}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        {drawable.map((segment, index) => (
          <span
            key={`legend-${segment.label}-${index}`}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
          >
            <span className={`h-2 w-2 rounded-sm ${TONE_CLASS[segment.tone ?? 'primary']}`} />
            {segment.label}
            <span className="font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
              {fmt((segment.value / total) * 100, 1)}%
            </span>
          </span>
        ))}
        {totalLabel && (
          <span className="ml-auto font-mono text-[10px] font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
            {totalLabel}
          </span>
        )}
      </div>
    </figure>
  );
};

export interface ProportionPieProps {
  /** Numerator and denominator of the fraction being shown. */
  numerator: number;
  denominator: number;
  /** Caption inside the ring, e.g. "75%". */
  centerLabel: string;
  /** Small caption under the centre label. */
  centerSub?: string;
  summary: string;
  className?: string;
}

/**
 * A part-of-a-whole pie for fractions and simple shares.
 *
 * Drawn as an SVG arc rather than a CSS conic-gradient so it renders identically
 * in the prerendered HTML and in every browser, and so the accessible name can
 * state the actual fraction instead of relying on colour.
 */
export const ProportionPie: React.FC<ProportionPieProps> = ({
  numerator,
  denominator,
  centerLabel,
  centerSub,
  summary,
  className,
}) => {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return null;

  const ratio = numerator / denominator;
  const shown = Math.min(1, Math.max(0, ratio));
  const size = 168;
  const centre = size / 2;
  const radius = centre - 14;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={summary}
        className="overflow-visible"
      >
        <title>{summary}</title>
        {/* Drawn as a ring rather than a filled wedge so the text in the middle
            sits on the page background and stays legible in both themes. */}
        <circle
          cx={centre}
          cy={centre}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-zinc-200 dark:stroke-zinc-800"
        />
        {shown > 0 && (
          <circle
            cx={centre}
            cy={centre}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={`${shown * circumference} ${circumference}`}
            transform={`rotate(-90 ${centre} ${centre})`}
            className="stroke-indigo-500 dark:stroke-indigo-400"
          />
        )}
        <text
          x={centre}
          y={centre + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-zinc-900 font-mono text-[22px] font-bold dark:fill-zinc-50"
        >
          {centerLabel}
        </text>
        {centerSub && (
          <text
            x={centre}
            y={centre + 20}
            textAnchor="middle"
            className="fill-zinc-500 font-mono text-[8px] uppercase tracking-wider dark:fill-zinc-400"
          >
            {centerSub}
          </text>
        )}
      </svg>
    </figure>
  );
};

export interface DeltaBarsProps {
  from: number;
  to: number;
  /** Signed percentage change. */
  percent: number;
  /** Caption for the first bar. */
  fromLabel?: string;
  /** Caption for the second bar. */
  toLabel?: string;
  /** Formats each value; use the calculator's own formatter so currency shows. */
  formatValue?: (value: number) => string;
  summary: string;
  className?: string;
}

/**
 * Two bars on a shared scale for a before/after comparison.
 *
 * The bars are scaled to the larger of the two values, so the visual gap matches
 * the real gap. Negative values are shown as a bar in the opposite direction.
 */
export const DeltaBars: React.FC<DeltaBarsProps> = ({
  from,
  to,
  percent,
  fromLabel = 'From',
  toLabel = 'To',
  formatValue,
  summary,
  className,
}) => {
  const magnitude = Math.max(Math.abs(from), Math.abs(to), 1);
  const up = to >= from;
  const fromWidth = (Math.abs(from) / magnitude) * 100;
  const toWidth = (Math.abs(to) / magnitude) * 100;

  const row = (label: string, value: number, width: number, tone: 'muted' | 'strong') => (
    <div className="flex items-center gap-2">
      <span className="w-10 shrink-0 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className={`h-full rounded-full ${
            tone === 'muted'
              ? 'bg-zinc-400 dark:bg-zinc-600'
              : up
                ? 'bg-emerald-500 dark:bg-emerald-400'
                : 'bg-rose-500 dark:bg-rose-400'
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-20 shrink-0 truncate text-right font-mono text-[10px] font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
        {formatValue ? formatValue(value) : fmt(value)}
      </span>
    </div>
  );

  return (
    <figure className={className} role="img" aria-label={summary}>
      <div className="space-y-1.5">
        {row(fromLabel, from, fromWidth, 'muted')}
        {row(toLabel, to, toWidth, 'strong')}
      </div>
      <p className="mt-1.5 font-mono text-[10px] tabular-nums text-zinc-500 dark:text-zinc-400">
        {percent >= 0 ? '+' : ''}
        {fmt(percent)}% {up ? 'increase' : 'decrease'}
      </p>
    </figure>
  );
};

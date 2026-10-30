import React from 'react';
import { Table2 } from 'lucide-react';
import { BarChart, DonutChart, LineChart, type SeriesData } from '../charts';
import { useChartThemeColors } from '../charts/EChart';
import { DialGauge, type DialGaugeProps } from '../common/DialGauge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

/**
 * Shared result-experience components. Every visual here takes its numbers as
 * props — the calling calculator computes them with its engine — and every
 * visual ships a plain-text summary plus a data-table alternative inside a
 * <details> block, so the chart is never the only way to read the answer.
 */

const MONO = 'font-mono';

/* ------------------------------------------------------------------ */
/* Level 1 — the main answer                                            */
/* ------------------------------------------------------------------ */

export type MetricTone = 'default' | 'positive' | 'warning';

const toneClass: Record<MetricTone, string> = {
  default: 'text-white',
  positive: 'text-emerald-400',
  warning: 'text-amber-400',
};

export interface ResultMetric {
  label: string;
  value: string;
  tone?: MetricTone;
  hint?: string;
}

export const ResultMetricCard: React.FC<ResultMetric & { className?: string }> = ({
  label,
  value,
  tone = 'default',
  hint,
  className,
}) => (
  <div
    className={`rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 ${className ?? ''}`}
  >
    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{label}</p>
    <p className={`mt-1 text-lg font-bold tabular-nums ${toneClass[tone]}`}>{value}</p>
    {hint ? <p className="mt-0.5 text-[10px] font-mono text-zinc-500">{hint}</p> : null}
  </div>
);

export interface ResultSummaryProps {
  /** What the number is, e.g. "Estimated Monthly Payment". */
  label: string;
  /** Preformatted main value — the caller owns formatting and units. */
  value: string;
  /** One supporting line under the headline value. */
  detail?: string;
  /** Secondary figures that explain the headline. */
  metrics?: ResultMetric[];
  /** Extra content, e.g. a comparison strip. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * The always-dark answer panel used by the finance-style calculators. It
 * carries the hierarchy rule: the main answer first, then supporting metrics,
 * and it stays legible without hydration because it is plain markup.
 */
export const ResultSummary: React.FC<ResultSummaryProps> = ({
  label,
  value,
  detail,
  metrics,
  children,
  className,
}) => (
  <div className={`rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white ${className ?? ''}`}>
    <p className="pb-3 text-xs font-semibold text-zinc-300">{label}</p>
    <p aria-live="polite" className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
      {value}
    </p>
    {detail ? <p className={`mt-1 text-xs text-zinc-300`}>{detail}</p> : null}
    {metrics && metrics.length > 0 ? (
      <div className="mt-4 grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <ResultMetricCard key={m.label} {...m} />
        ))}
      </div>
    ) : null}
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* The shared table alternative                                         */
/* ------------------------------------------------------------------ */

export interface ResultDataTableProps {
  columns: string[];
  rows: Array<Array<string | number>>;
  caption?: string;
  className?: string;
}

export const ResultDataTable: React.FC<ResultDataTableProps> = ({ columns, rows, caption, className }) => (
  <Table className={className}>
    {caption ? <caption className="sr-only">{caption}</caption> : null}
    <TableHeader>
      <TableRow className={MONO}>
        {columns.map((c) => (
          <TableHead key={c}>{c}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody className={MONO}>
      {rows.map((row, i) => (
        <TableRow key={i}>
          {row.map((cell, j) => (
            <TableCell key={j} className="tabular-nums">
              {cell}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

/** A collapsible, focusable data-table alternative for one visual. */
export const ResultTableToggle: React.FC<{ label?: string; children: React.ReactNode }> = ({
  label = 'View as table',
  children,
}) => (
  <details className="group mt-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
    <summary className="flex cursor-pointer select-none items-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary hover:underline dark:text-primary-tint">
      <Table2 className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </summary>
    <div className="max-h-72 overflow-auto p-1">{children}</div>
  </details>
);

/* ------------------------------------------------------------------ */
/* Level 3 — visual breakdowns                                          */
/* ------------------------------------------------------------------ */

export interface ResultBreakdownChartProps {
  title: string;
  data: Array<{ label: string; value: number; color?: string }>;
  unit?: string;
  /** Text explanation of what the distribution means; the a11y alternative. */
  summary: string;
  centerLabel?: string;
  centerSub?: string;
  tableLabel?: string;
  className?: string;
}

export const ResultBreakdownChart: React.FC<ResultBreakdownChartProps> = ({
  title,
  data,
  unit,
  summary,
  centerLabel,
  centerSub,
  tableLabel,
  className,
}) => {
  const colors = useChartThemeColors();
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <figure className={className}>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        {title}
      </figcaption>
      <DonutChart data={data} unit={unit} showLegend centerLabel={centerLabel} centerSub={centerSub} />
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
      <ResultTableToggle label={tableLabel}>
        <ResultDataTable
          columns={['Item', unit ? `Value (${unit})` : 'Value', 'Share']}
          rows={data.map((d) => [
            d.label,
            unit ? `${d.value.toLocaleString()} ${unit}` : d.value.toLocaleString(),
            total > 0 ? `${((d.value / total) * 100).toFixed(1)}%` : '—',
          ])}
          caption={summary}
        />
      </ResultTableToggle>
      {/* palette note keeps the legend colours traceable in text form */}
      <span className="sr-only">
        Chart colours in order: {data.map((d, i) => `${d.label} ${i + 1}`).join(', ')} on {colors.accent} foundation.
      </span>
    </figure>
  );
};

/* ------------------------------------------------------------------ */
/* Trend (time projection)                                              */
/* ------------------------------------------------------------------ */

export interface ResultTrendChartProps {
  title: string;
  series: SeriesData[];
  xLabels: string[];
  unit?: string;
  summary: string;
  stacked?: boolean;
  /** Explicit table rows when the auto series→table mapping is not enough. */
  table?: { columns: string[]; rows: Array<Array<string | number>> };
  tableLabel?: string;
  className?: string;
}

export const ResultTrendChart: React.FC<ResultTrendChartProps> = ({
  title,
  series,
  xLabels,
  unit,
  summary,
  stacked,
  table,
  tableLabel,
  className,
}) => (
  <figure className={className}>
    <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
      {title}
    </figcaption>
    <LineChart series={series} xLabels={xLabels} unit={unit} stacked={stacked} showLegend={series.length > 1} />
    <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
    <ResultTableToggle label={tableLabel}>
      <ResultDataTable
        columns={table?.columns ?? ['Period', ...series.map((s) => s.name)]}
        rows={table?.rows ?? xLabels.map((l, i) => [l, ...series.map((s) => s.points[i].value.toLocaleString())])}
        caption={summary}
      />
    </ResultTableToggle>
  </figure>
);

/* ------------------------------------------------------------------ */
/* Comparison (scenarios / options)                                     */
/* ------------------------------------------------------------------ */

export interface ResultComparisonProps {
  title: string;
  items: Array<{ label: string; value: number; format: (n: number) => string }>;
  /** Index of the currently-selected scenario, highlighted as the answer. */
  highlightIndex?: number;
  summary: string;
  tableLabel?: string;
  className?: string;
}

export const ResultComparison: React.FC<ResultComparisonProps> = ({
  title,
  items,
  highlightIndex,
  summary,
  tableLabel,
  className,
}) => {
  const colors = useChartThemeColors();
  return (
    <figure className={className}>
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        {title}
      </figcaption>
      <BarChart
        series={[
          {
            name: title,
            type: 'bar',
            points: items.map((it, i) => ({
              label: it.label,
              value: it.value,
              color: i === highlightIndex ? undefined : colors.axisLine,
            })),
          },
        ]}
        xLabels={items.map((it) => it.label)}
        showLegend={false}
      />
      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
      <ResultTableToggle label={tableLabel}>
        <ResultDataTable
          columns={['Option', 'Value', 'Difference']}
          rows={items.map((it, i) => [
            i === highlightIndex ? `${it.label} (selected)` : it.label,
            it.format(it.value),
            i > 0 ? it.format(it.value - items[0].value) : '—',
          ])}
          caption={summary}
        />
      </ResultTableToggle>
    </figure>
  );
};

/* ------------------------------------------------------------------ */
/* Gauge                                                                */
/* ------------------------------------------------------------------ */

export interface ResultGaugeProps extends Pick<
  DialGaugeProps,
  'value' | 'min' | 'max' | 'zones' | 'accent' | 'formatValue' | 'caption' | 'ticks' | 'ariaLabel'
> {
  title?: string;
  /** Legend rows matching the zones: label + human range + colour dot. */
  legend: Array<{ label: string; range: string; color: string }>;
  activeZoneId?: string;
  /** Engine-connected text equivalent of the reading (always rendered). */
  summary: string;
  /** Non-diagnostic / limitations note under the gauge. */
  note?: string;
  className?: string;
}

export const ResultGauge: React.FC<ResultGaugeProps> = ({
  value,
  min,
  max,
  zones,
  accent,
  formatValue,
  caption,
  ticks,
  ariaLabel,
  title,
  legend,
  activeZoneId,
  summary,
  note,
  className,
}) => (
  <figure className={className}>
    {title ? (
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
        {title}
      </figcaption>
    ) : null}
    <DialGauge
      value={value}
      min={min}
      max={max}
      zones={zones}
      accent={accent}
      formatValue={formatValue}
      caption={caption}
      ticks={ticks}
      ariaLabel={ariaLabel}
    />
    <ul className="mt-3 grid w-full grid-cols-2 gap-x-3 gap-y-2 text-left">
      {legend.map((band) => {
        const active = activeZoneId !== undefined && band.label === activeZoneId;
        return (
          <li key={band.label} className={`flex items-center gap-2 ${active ? '' : 'opacity-60'}`}>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: band.color }}
            />
            <span className="min-w-0">
              <span
                className={`block text-[11px] leading-tight ${
                  active
                    ? 'font-bold text-zinc-900 dark:text-zinc-50'
                    : 'font-medium text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {band.label}
              </span>
              <span className="block font-mono text-[10px] leading-tight text-zinc-500">{band.range}</span>
            </span>
          </li>
        );
      })}
    </ul>
    <figcaption className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
      {summary}
      {note ? <span className="mt-1 block text-[11px] text-zinc-500">{note}</span> : null}
    </figcaption>
  </figure>
);

/* ------------------------------------------------------------------ */
/* Level 4 — scenario controls and assumptions                          */
/* ------------------------------------------------------------------ */

export const ScenarioControls: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, description, children, className }) => (
  <div
    role="group"
    aria-label={title}
    className={`rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 p-4 space-y-3 ${className ?? ''}`}
  >
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">{title}</p>
      {description ? (
        <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">{description}</p>
      ) : null}
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
  </div>
);

/** Provenance badge shown next to an assumption row. */
export type AssumptionBadge = 'published' | 'assumption' | 'formula';

const badgeStyle: Record<AssumptionBadge, string> = {
  published:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
  assumption:
    'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
  formula:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
};

const badgeLabel: Record<AssumptionBadge, string> = {
  published: 'Published data',
  assumption: 'Your input',
  formula: 'Formula',
};

export interface CalculationAssumptionsProps {
  items: Array<{
    label: string;
    detail: string;
    badge?: AssumptionBadge;
    source?: { label: string; href: string };
  }>;
  /** One-line caveat rendered last (limitations, not a diagnosis, etc.). */
  caveat?: string;
  className?: string;
}

export const CalculationAssumptions: React.FC<CalculationAssumptionsProps> = ({ items, caveat, className }) => (
  <div className={`rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-xs space-y-2 ${className ?? ''}`}>
    <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
      Formula &amp; assumptions
    </p>
    <dl className="space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <dt className="font-semibold text-zinc-800 dark:text-zinc-200">{item.label}</dt>
          {item.badge ? (
            <span
              className={`inline-block rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${badgeStyle[item.badge]}`}
            >
              {badgeLabel[item.badge]}
            </span>
          ) : null}
          <dd className="basis-full text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {item.detail}
            {item.source ? (
              <>
                {' '}
                <a
                  href={item.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline dark:text-primary-tint"
                >
                  {item.source.label}
                </a>
              </>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
    {caveat ? <p className="pt-1 leading-relaxed text-zinc-500 dark:text-zinc-400">{caveat}</p> : null}
  </div>
);

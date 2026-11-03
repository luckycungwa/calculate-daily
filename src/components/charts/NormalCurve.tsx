import React from 'react';
import { CoordinatePlot } from './CoordinatePlot';

/**
 * The bell curve for a normal distribution, with the requested interval shaded.
 *
 * A probability between two bounds is almost impossible to judge from a
 * percentage alone — 34% looks the same whether it is one narrow spike or two
 * tails. Drawing the density and shading the interval is what makes the answer
 * legible, and it is the picture a textbook uses.
 */

export interface NormalCurveProps {
  mean: number;
  standardDeviation: number;
  lower: number;
  upper: number;
  /** Probability between the bounds, as a percentage, for the summary text. */
  probabilityPercent: number;
  className?: string;
}

const NUM = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 });

const pdf = (x: number, mean: number, sd: number): number => {
  const z = (x - mean) / sd;
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
};

export const NormalCurve: React.FC<NormalCurveProps> = ({
  mean,
  standardDeviation,
  lower,
  upper,
  probabilityPercent,
  className,
}) => {
  if (![mean, standardDeviation, lower, upper].every(Number.isFinite) || standardDeviation <= 0) {
    return null;
  }

  // Four standard deviations each side covers 99.99% of the area and keeps the
  // curve clear of the frame edges.
  const start = mean - 4 * standardDeviation;
  const end = mean + 4 * standardDeviation;
  const samples = 240;

  const curve = Array.from({ length: samples + 1 }, (_, i) => {
    const x = start + ((end - start) * i) / samples;
    return { x, y: pdf(x, mean, standardDeviation) };
  });

  // Sample the shaded interval on its own so the fill follows the curve exactly
  // rather than approximating it from whichever whole-curve samples fall inside.
  const shadeStart = Math.max(start, Math.min(lower, upper));
  const shadeEnd = Math.min(end, Math.max(lower, upper));
  const shaded =
    shadeEnd > shadeStart
      ? Array.from({ length: samples + 1 }, (_, i) => {
          const x = shadeStart + ((shadeEnd - shadeStart) * i) / samples;
          return { x, y: pdf(x, mean, standardDeviation) };
        })
      : [];

  const points = [
    ...(lower >= start && lower <= end
      ? [{ x: lower, y: pdf(lower, mean, standardDeviation), label: NUM.format(lower) }]
      : []),
    ...(upper >= start && upper <= end && upper !== lower
      ? [{ x: upper, y: pdf(upper, mean, standardDeviation), label: NUM.format(upper) }]
      : []),
  ];

  const summary = `A normal curve centred on ${NUM.format(mean)} with a standard deviation of ${NUM.format(standardDeviation)}. The shaded band from ${NUM.format(Math.min(lower, upper))} to ${NUM.format(Math.max(lower, upper))} holds ${NUM.format(probabilityPercent)}% of the total probability.`;

  return (
    <CoordinatePlot
      className={className}
      title="Where your range sits on the curve"
      summary={summary}
      points={points}
      curves={[
        { points: curve },
        ...(shaded.length > 1
          ? [
              {
                points: shaded,
                fill: true,
                fillClassName: 'fill-indigo-500/35 dark:fill-indigo-400/35',
                className: 'stroke-indigo-500 dark:stroke-indigo-400',
              },
            ]
          : []),
      ]}
      xLabel="x"
      yLabel="density"
      height={340}
    />
  );
};

import React from 'react';
import {
  Gauge,
  GaugeArc,
  GaugeNeedle,
  GaugeText,
  GaugeTickLabels,
  GaugeTrack,
  GaugeValue,
  GaugeZones,
  zoneColor,
  type Zone,
} from '../gauge';
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion';

export interface DialGaugeProps {
  /** Reading to point at; clamped into [min, max]. */
  value: number;
  min?: number;
  max: number;
  /** Colour bands drawn outside the track, in ascending `to` order. The last
   * zone always runs to `max`. */
  zones?: Zone[];
  /** Colour of the value arc and hub. Defaults to the brand emerald. */
  accent?: string;
  /** Big number in the middle. Defaults to one decimal place. */
  formatValue?: (value: number) => string;
  /** Small caption under the number, for example the unit or what is read. */
  caption?: string;
  /** Tick labels, as a count of equal steps across the domain. */
  ticks?: number;
  /** Spoken description; the SVG is exposed as a single image. */
  ariaLabel: string;
  className?: string;
}

/** Standard dial geometry: a 280 degree sweep with the gap at the bottom. */
const START_ANGLE = 40;
const END_ANGLE = 320;
const RADIUS = 200;

/**
 * A single-reading dial built from the Gauge UI primitives: a quiet track, the
 * coloured zone band, the value arc, a needle, tick labels and the number in
 * the middle. Layout-neutral, so it can stand in for a text readout without
 * shifting the page around it.
 */
export const DialGauge: React.FC<DialGaugeProps> = ({
  value,
  min = 0,
  max,
  zones,
  accent = '#059669',
  formatValue = (reading) => reading.toFixed(1),
  caption,
  ticks,
  ariaLabel,
  className,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const reading = Math.min(hi, Math.max(lo, Number.isFinite(value) ? value : lo));
  const activeColor = zones && zones.length > 0 ? zoneColor(zones, reading, accent) : accent;

  return (
    <Gauge
      value={reading}
      min={lo}
      max={hi}
      startAngle={START_ANGLE}
      endAngle={END_ANGLE}
      radius={RADIUS}
      padding={64}
      fit="content"
      transition={!reducedMotion}
      role="img"
      aria-label={ariaLabel}
      className={`w-full text-zinc-900 dark:text-zinc-50 ${className ?? ''}`}
    >
      <GaugeTrack width={14} opacity={0.12} />
      {zones && zones.length > 0 && (
        <GaugeZones zones={zones} width={4} offset={18} gap={2} endCap="round" />
      )}
      <GaugeArc width={14} color={activeColor} />
      {ticks ? (
        <GaugeTickLabels
          count={ticks}
          offset={26}
          fontSize={16}
          weight="medium"
          color="#71717a"
        />
      ) : null}
      <GaugeNeedle style="pointer" length={0.88} width={8} gap={70} tail={26} />
      <GaugeValue
        y={0}
        fontSize={54}
        weight="semibold"
        format={formatValue}
        className="fill-current"
      />
      {caption ? (
        <GaugeText
          y={38}
          fontSize={15}
          weight="semibold"
          className="fill-zinc-400 uppercase tracking-[0.18em] dark:fill-zinc-500"
        >
          {caption}
        </GaugeText>
      ) : null}
    </Gauge>
  );
};

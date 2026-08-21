import React, { useMemo } from 'react';
import { EChart, useChartThemeColors } from './EChart';
import type { EChartsCoreOption } from 'echarts/core';

export interface SeriesPoint {
  label: string;
  value: number;
}

export interface SeriesData {
  name: string;
  points: SeriesPoint[];
  color?: string;
  type?: 'line' | 'area' | 'bar';
}

const MONO_FONT = "ui-monospace, 'JetBrains Mono', monospace";

function buildTooltip(colors: ReturnType<typeof useChartThemeColors>) {
  return {
    trigger: 'axis' as const,
    backgroundColor: colors.tooltipBg,
    borderColor: colors.tooltipBorder,
    borderWidth: 1,
    textStyle: { color: colors.tooltipText, fontFamily: MONO_FONT, fontSize: 11 },
    axisPointer: { lineStyle: { color: colors.axisLine } },
  };
}

interface AxisChartProps {
  series: SeriesData[];
  xLabels?: string[];
  height?: number;
  className?: string;
  yAxisLabel?: string;
  unit?: string;
  stacked?: boolean;
  showLegend?: boolean;
}

function AxisChart({ series, xLabels, height, className, yAxisLabel, unit, stacked, showLegend }: AxisChartProps) {
  const colors = useChartThemeColors();

  const option = useMemo<EChartsCoreOption>(() => {
    const commonLabel = { color: colors.text, fontFamily: MONO_FONT, fontSize: 10 };
    return {
      animationDuration: 200,
      grid: { left: 8, right: 8, top: showLegend ? 32 : 16, bottom: 4, containLabel: true },
      tooltip: {
        ...buildTooltip(colors),
        valueFormatter: (v: unknown) => `${v}${unit ? ` ${unit}` : ''}`,
      },
      legend: showLegend
        ? {
            top: 0,
            textStyle: commonLabel,
            icon: 'roundRect',
            itemWidth: 10,
            itemHeight: 6,
          }
        : undefined,
      xAxis: {
        type: 'category',
        data: xLabels,
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisLabel: commonLabel,
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        nameTextStyle: commonLabel,
        axisLabel: commonLabel,
        splitLine: { lineStyle: { color: colors.splitLine } },
      },
      series: series.map((s) => {
        const st = s.type ?? 'line';
        const isArea = st === 'area';
        return {
          name: s.name,
          type: st === 'bar' ? 'bar' : 'line',
          data: s.points.map((p) => p.value),
          smooth: false,
          showSymbol: false,
          symbolSize: 5,
          lineStyle: { width: 2, color: s.color ?? colors.accent },
          itemStyle: { color: s.color ?? colors.accent },
          areaStyle: isArea
            ? { color: s.color ? undefined : colors.accentLight, opacity: s.color ? 0.18 : 1 }
            : undefined,
          stack: stacked ? 'total' : undefined,
          barMaxWidth: 18,
        };
      }),
    };
  }, [series, xLabels, unit, yAxisLabel, stacked, showLegend, colors]);

  return <EChart option={option} height={height} className={className} />;
}

interface LineChartProps extends AxisChartProps {}

export const LineChart: React.FC<LineChartProps> = (props) => <AxisChart {...props} />;

export const AreaChart: React.FC<LineChartProps> = (props) => (
  <AxisChart {...props} series={props.series.map((s) => ({ ...s, type: 'area' as const }))} />
);

export const BarChart: React.FC<LineChartProps> = (props) => (
  <AxisChart {...props} series={props.series.map((s) => ({ ...s, type: 'bar' as const }))} />
);

interface DonutChartProps {
  data: SeriesPoint[];
  height?: number;
  className?: string;
  unit?: string;
  showLegend?: boolean;
  centerLabel?: string;
  centerSub?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  height,
  className,
  unit,
  showLegend,
  centerLabel,
  centerSub,
}) => {
  const colors = useChartThemeColors();

  const option = useMemo<EChartsCoreOption>(() => {
    const palette = [colors.accent, colors.grid, colors.charcoal, colors.axisLine, '#f59e0b', '#0ea5e9'];
    return {
      animationDuration: 200,
      tooltip: {
        trigger: 'item' as const,
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        textStyle: { color: colors.tooltipText, fontFamily: MONO_FONT, fontSize: 11 },
        valueFormatter: (v: unknown) => `${v}${unit ? ` ${unit}` : ''}`,
      },
      legend: showLegend
        ? {
            bottom: 0,
            textStyle: { color: colors.text, fontFamily: MONO_FONT, fontSize: 10 },
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
          }
        : undefined,
      series: [
        {
          type: 'pie',
          radius: ['52%', '74%'],
          center: ['50%', '46%'],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: colors.tooltipBg, borderWidth: 2 },
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            color: colors.text,
            fontFamily: MONO_FONT,
            fontSize: 10,
            lineHeight: 14,
          },
          labelLine: { lineStyle: { color: colors.axisLine } },
          emphasis: { scaleSize: 4 },
          data: data.map((d, i) => ({
            name: d.label,
            value: d.value,
            itemStyle: { color: palette[i % palette.length] },
          })),
        },
      ],
      graphic:
        centerLabel || centerSub
          ? [
              {
                type: 'text',
                left: 'center',
                top: '40%',
                style: {
                  text: centerLabel ?? '',
                  textAlign: 'center',
                  fill: colors.charcoal,
                  fontFamily: MONO_FONT,
                  fontSize: 18,
                  fontWeight: 'bold',
                },
              },
              centerSub
                ? {
                    type: 'text',
                    left: 'center',
                    top: '54%',
                    style: {
                      text: centerSub,
                      textAlign: 'center',
                      fill: colors.subtext,
                      fontFamily: MONO_FONT,
                      fontSize: 10,
                    },
                  }
                : null,
            ].filter(Boolean)
          : undefined,
    };
  }, [data, unit, showLegend, centerLabel, centerSub, colors]);

  return <EChart option={option} height={height} className={className} />;
};

interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit?: string;
  height?: number;
  className?: string;
  color?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ value, min = 0, max = 100, label, unit, height, className, color }) => {
  const colors = useChartThemeColors();

  const option = useMemo<EChartsCoreOption>(() => {
    return {
      animationDuration: 250,
      series: [
        {
          type: 'gauge',
          min,
          max,
          startAngle: 220,
          endAngle: -40,
          radius: '92%',
          center: ['50%', '58%'],
          progress: {
            show: true,
            width: 10,
            itemStyle: { color: color ?? colors.accent },
          },
          axisLine: {
            lineStyle: { width: 10, color: [[1, colors.splitLine]] },
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          pointer: { show: false },
          anchor: { show: false },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, '8%'],
            formatter: (v: number) => `${v}${unit ? ` ${unit}` : ''}`,
            color: colors.charcoal,
            fontFamily: MONO_FONT,
            fontSize: 22,
            fontWeight: 'bold',
          },
          title: {
            offsetCenter: [0, '32%'],
            color: colors.subtext,
            fontFamily: MONO_FONT,
            fontSize: 10,
          },
          data: [{ value, name: label }],
        },
      ],
    };
  }, [value, min, max, label, unit, color, colors]);

  return <EChart option={option} height={height} className={className} />;
};

// LineChart passthrough for TS simplicity (AxisChart handles both line + area).
import React, { useEffect, useRef, useState } from 'react';
import type { EChartsCoreOption, EChartsType } from 'echarts/core';

export type EChartOption = EChartsCoreOption;

interface EChartProps {
  option: EChartsCoreOption;
  className?: string;
  style?: React.CSSProperties;
  onReady?: (chart: EChartsType) => void;
}

export const EChart: React.FC<EChartProps> = ({ option, className, style, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prevDark, setPrevDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    let disposed = false;
    let chart: EChartsType | null = null;
    let started = false;
    let recheck: ReturnType<typeof setTimeout> | undefined;
    const observers: { disconnect: () => void }[] = [];
    const container = containerRef.current;
    if (!container) return;

    // echarts is ~640 kB minified. Load it lazily *and* only once the chart is
    // near the viewport: guide pages embed several calculators, and downloading
    // every chart module for charts the visitor never scrolls to is wasted work.
    const start = () => {
      if (started || disposed) return;
      started = true;

      import('../../lib/charts/core')
        .then(({ echarts }) => {
          if (disposed || !containerRef.current) return;
          chart = echarts.init(containerRef.current);
          chartRef.current = chart;
          chart.setOption(option);
          setIsLoading(false);

          const observer = new ResizeObserver(() => chart!.resize());
          observer.observe(containerRef.current);
          observers.push(observer);

          const onThemeChange = () => {
            const dark = document.documentElement.classList.contains('dark');
            if (dark !== prevDark) {
              setPrevDark(dark);
              requestAnimationFrame(() => chart!.resize());
            }
          };
          const observer2 = new MutationObserver(onThemeChange);
          observer2.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
          observers.push(observer2);
        })
        .catch((err) => {
          console.error('Failed to load chart module', err);
        });
    };

    // A chart is worth loading echarts only when it is about to be seen. The
    // 600 px margin starts the download shortly before the chart scrolls into
    // view, so it is ready when it arrives without paying 640 kB up front for
    // charts further down a long guide.
    const nearViewport = () => {
      const rect = container.getBoundingClientRect();
      const margin = 600;
      return rect.top < window.innerHeight + margin && rect.bottom > -margin;
    };

    const reevaluate = () => {
      if (!started && !disposed && nearViewport()) start();
    };

    let removeListeners = () => {};

    if (nearViewport()) {
      start();
    } else {
      // Layout can shift after mount (results, fonts, images), and a nested
      // scroll container may be what actually moves the chart, so listen on the
      // window in the capture phase and re-check after a beat. The scroll handler
      // is throttled by time rather than requestAnimationFrame so it still works
      // while the tab is backgrounded.
      let lastCheck = 0;
      const onScroll = () => {
        if (started || disposed) return;
        const now = Date.now();
        if (now - lastCheck < 100) return;
        lastCheck = now;
        reevaluate();
      };

      window.addEventListener('scroll', onScroll, { passive: true, capture: true });
      window.addEventListener('resize', onScroll, { passive: true });
      window.addEventListener('load', reevaluate);
      removeListeners = () => {
        window.removeEventListener('scroll', onScroll, true);
        window.removeEventListener('resize', onScroll);
        window.removeEventListener('load', reevaluate);
      };

      recheck = setTimeout(reevaluate, 1000);
    }

    return () => {
      disposed = true;
      if (recheck !== undefined) clearTimeout(recheck);
      removeListeners();
      observers.forEach((o) => o.disconnect());
      chart?.dispose();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, { notMerge: true });
  }, [option]);

  return (
    <div className={className} style={{ width: '100%', height: 260, ...style }}>
      {isLoading && (
        <div className="flex items-center justify-center h-full text-[11px] font-mono text-zinc-400 dark:text-zinc-500 animate-pulse">
          Loading chart…
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};

export function useChartThemeColors(dark?: boolean) {
  const isDark = dark ?? (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  return {
    isDark,
    text: isDark ? '#d4d4d8' : '#52525b',
    subtext: isDark ? '#a1a1aa' : '#71717a',
    axisLine: isDark ? '#3f3f46' : '#d4d4d8',
    splitLine: isDark ? '#27272a' : '#e4e4e7',
    tooltipBg: isDark ? '#18181b' : '#ffffff',
    tooltipBorder: isDark ? '#27272a' : '#e4e4e7',
    tooltipText: isDark ? '#fafafa' : '#18181b',
    accent: isDark ? '#10b981' : '#059669',
    accentLight: isDark ? 'rgba(16,185,129,0.22)' : 'rgba(5,150,105,0.14)',
    grid: isDark ? '#3f3f46' : '#d4d4d8',
    charcoal: isDark ? '#e4e4e7' : '#18181b',
  };
}
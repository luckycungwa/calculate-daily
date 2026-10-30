import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCalculatorEntry } from '../lib/useCalculatorEntry';
import { usePageMeta } from '../lib/seo';
import { CalculatorRenderer } from '../components/calculators/CalculatorRenderer';

interface EmbedPageProps {
  slug: string;
}

/**
 * The embeddable view of a calculator.
 *
 * A host site drops `/embed/:slug` into an iframe and gets the tool without the
 * site header, navigation, or footer. The page is deliberately `noindex`: it
 * repeats the canonical calculator and exists to be framed, not ranked. The
 * attribution link is rendered inside this document, so it cannot be removed
 * from the host page without editing our own markup.
 *
 * The page also reports its own height to the parent so the snippet can resize
 * the frame instead of clipping the result panel. Content is public, so posting
 * the height with a wildcard target reveals nothing.
 */
export const EmbedPage: React.FC<EmbedPageProps> = ({ slug }) => {
  const { entry, known, loading } = useCalculatorEntry(slug);
  const containerRef = useRef<HTMLDivElement>(null);

  usePageMeta({
    title: entry ? `${entry.name} (Embed)` : 'Calculator Embed',
    description: entry
      ? `Embeddable ${entry.name}: ${entry.shortDesc}`
      : 'This calculator is not available for embedding.',
    noindex: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || window.parent === window) return;

    let frame = 0;
    const post = () => {
      const height = Math.ceil(
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          containerRef.current?.scrollHeight ?? 0
        )
      );
      // Legacy wire protocol, intentionally unchanged: already-published
      // third-party embeds listen for this exact type. Renaming it would
      // silently break height sync on every live embed. Accept both names
      // so a future totalcalculation:height can be introduced without breaking.
      if (height > 0) window.parent.postMessage({ type: 'calculatedaily:height', height }, '*');
    };

    // Debounce resize storms while a visitor drags a slider or types.
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        post();
      });
    };

    post();
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    if (observer && document.body) observer.observe(document.body);
    window.addEventListener('load', schedule);
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('load', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [entry]);

  // An in-frame SPA link would replace the calculator with the full site inside
  // a small frame. Open those destinations in a new tab instead.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!href || !href.startsWith('/')) return;
    event.preventDefault();
    window.open(`${window.location.origin}${href}`, '_blank', 'noopener');
  };

  return (
    <div ref={containerRef} onClick={handleClick} className="min-h-screen bg-background text-foreground p-3 sm:p-4">
      {entry ? (
        <>
          <CalculatorRenderer meta={entry} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 pt-2 text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <span>Free calculator by Total Calculation</span>
            <a
              href={`/calculators/${entry.slug}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline dark:text-primary-tint"
            >
              {entry.name}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </>
      ) : loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-40 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900" />
        </div>
      ) : (
        <div className="py-10 text-center">
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Calculator not available
          </h1>
          <p className="mt-2 text-xs text-zinc-500">
            {known
              ? 'This calculator is still loading. Refresh the page to try again.'
              : 'That slug does not match a calculator on Total Calculation.'}
          </p>
        </div>
      )}
    </div>
  );
};

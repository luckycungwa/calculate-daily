import React from 'react';
import { ChevronRight } from 'lucide-react';
import { getCategoryById } from '../data/categories';
import { getCalculatorLink } from '../data/catalogLinks';
import { useCalculatorEntry } from '../lib/useCalculatorEntry';
import { usePageMeta } from '../lib/seo';
import { Link } from '../lib/router';
import { getIcon } from '../components/common/iconMap';
import { CalculatorRenderer } from '../components/calculators/CalculatorRenderer';
import { ToolInfoSection } from '../components/common/ToolInfoSection';
import { EmbedCard } from '../components/common/EmbedCard';
import { Badge } from '../components/ui/badge';

interface CalculatorPageProps {
  slug: string;
  onSaveHistory?: (summary: string) => void;
}

/**
 * The content chunk carries only the entry for the requested calculator, so the
 * page can paint its header, breadcrumb, and SEO metadata from the compact link
 * map while the formula spec and prose arrive.
 */
const ToolSkeleton: React.FC = () => (
  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 animate-pulse">
    <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-10 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
    <div className="h-10 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
    <div className="h-24 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
  </div>
);

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ slug, onSaveHistory }) => {
  const link = getCalculatorLink(slug);
  const { entry, loading } = useCalculatorEntry(slug);

  const name = entry?.name ?? link?.name;
  const iconName = entry?.iconName ?? link?.iconName;

  usePageMeta({
    title: name ?? 'Calculator Not Found',
    description:
      entry?.shortDesc ??
      'The calculator page you requested does not exist. Browse all calculators.',
    keywords: entry?.keywords,
    canonicalPath: `/calculators/${slug}`,
    noindex: !entry || entry.seo?.status !== 'index' || entry.seo?.reviewStatus !== 'reviewed',
  });

  if (!link) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Calculator Not Found</h1>
        <p className="text-sm text-zinc-500">We could not find the tool you are looking for.</p>
        <Link
          to="/calculators"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
        >
          Browse All Calculators
        </Link>
      </div>
    );
  }

  const Icon = getIcon(iconName);
  const category = entry ? getCategoryById(entry.category) : undefined;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
        <Link to="/" className="hover:text-emerald-600">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/calculators" className="hover:text-emerald-600">
          Calculators
        </Link>
        {category && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/categories/${category.id}`} className="hover:text-emerald-600">
              {category.label}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                {name}
              </h1>
              {entry?.badge && (
                <Badge variant="outline" className="text-[10px] font-mono">
                  {entry.badge}
                </Badge>
              )}
            </div>
            {entry?.tagline && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{entry.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {entry ? (
        <>
          <CalculatorRenderer meta={entry} onSaveHistory={onSaveHistory} />
          {entry.seo?.status === 'index' && entry.seo?.reviewStatus === 'reviewed' && (
            <EmbedCard slug={entry.slug} name={entry.name} />
          )}
          <ToolInfoSection content={entry.content} currentSlug={entry.slug} />
        </>
      ) : loading ? (
        <ToolSkeleton />
      ) : null}
    </div>
  );
};

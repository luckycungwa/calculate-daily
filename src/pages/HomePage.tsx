import React from 'react';
import { Search, ArrowRight, Target, Layers, ShieldCheck, BookOpen, Sigma } from 'lucide-react';
import {
  HOME_CALCULATOR_COUNT,
  HOME_FEATURED,
  HOME_POPULAR,
} from '../data/homeIndex.generated';
import { CATEGORIES } from '../data/categories';
import { usePageMeta } from '../lib/seo';
import { Link, navigate } from '../lib/router';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  math: <Sigma className="w-4 h-4" />,
  finance: <Layers className="w-4 h-4" />,
  health: <Target className="w-4 h-4" />,
};

/**
 * Reference homepage for the Total Calculation experience.
 *
 * Visual language comes from the Genesis design system: General Sans display
 * headlines, generous spacing, flat 1px-bordered card surfaces, indigo only on
 * interactive elements, and the brand-green highlight reserved for the
 * homepage "Tap" moment. The only decorative element is the CSS dot grid. No
 * usage statistics, testimonials or invented claims — every number on this
 * page comes from the generated catalogue index.
 */
export const HomePage: React.FC = () => {
  usePageMeta({
    description:
      'Free online calculators and unit converters for math, finance, health, construction, cooking, and everyday life. Split bills, check BMI, compare mortgages, convert units, plan savings, and more. Fast browser-based tools with clear examples.',
    canonicalPath: '/',
  });

  const featured = HOME_FEATURED;
  const popular = HOME_POPULAR;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem('q') as HTMLInputElement).value.trim();
    navigate(`/calculators${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <div className="space-y-14">
      {/* Hero — editorial display type over the dot grid */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card px-4 pb-10 pt-12 text-center sm:px-8 sm:pt-16">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-[#f4f4f5] px-3 py-1 font-mono text-[11px] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            <ShieldCheck className="h-3 w-3" />
            Browser-based &bull; {HOME_CALCULATOR_COUNT} free calculators
          </div>

          <h1 className="font-display-heading text-4xl font-bold leading-[1.05] text-zinc-950 dark:text-zinc-50 sm:text-6xl">
            Tap the formula.
            <br />
            <span className="text-brand">See the answer.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Free online calculators and unit converters for money, health,
            construction, cooking, and everyday math. Every calculation runs in
            your browser — no account, no uploads, no waiting.
          </p>

          <form onSubmit={handleSearch} className="mx-auto mt-7 max-w-md">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-zinc-400" />
              <Input
                name="q"
                type="text"
                aria-label="Search calculators"
                placeholder="Search: tip, bmi, mortgage, oz to cups…"
                className="h-11 pl-10 pr-24 text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {featured.slice(0, 5).map((c) => (
              <Link key={c.id} to={`/calculators/${c.slug}`}>
                <Button variant="outline" size="sm" className="h-7 rounded-full px-3 text-xs">
                  {c.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What Total Calculation is — verifiable specifics only */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            icon: <ShieldCheck className="h-4 w-4" />,
            title: 'Private by design',
            body: 'Calculations run locally in your browser. Values you enter never leave your device.',
          },
          {
            icon: <BookOpen className="h-4 w-4" />,
            title: 'Formulas in the open',
            body: 'Every tool documents its method, assumptions, and a worked example you can check.',
          },
          {
            icon: <Sigma className="h-4 w-4" />,
            title: 'A real library',
            body: `${HOME_CALCULATOR_COUNT} calculators and converters across ${CATEGORIES.length} categories, with a searchable directory.`,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-[#f4f4f5] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {item.icon}
            </div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{item.title}</div>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{item.body}</p>
          </div>
        ))}
      </section>

      {/* Category browse */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Browse by category
          </h2>
          <Link
            to="/calculators"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline dark:text-primary-tint"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="hover-lift block h-full rounded-xl border border-border bg-card p-4 hover:border-ring/60"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-[#f4f4f5] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {CATEGORY_ICONS[cat.id] ?? <Layers className="h-4 w-4" />}
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cat.label}</div>
              <div className="mt-0.5 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                {cat.description}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Curated featured tools */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          Featured calculators
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((calc) => (
            <CalculatorCard key={calc.id} calc={calc} />
          ))}
        </div>
      </section>

      {/* CTA banners */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link to="/savings-goal">
          <div className="hover-lift h-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-white">
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary-on-dark" />
              <Badge variant="outline" className="border-zinc-700 bg-transparent font-mono text-[10px] text-zinc-300">
                Challenge
              </Badge>
            </div>
            <h3 className="font-display text-lg font-semibold">Daily Savings Goal Challenge</h3>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              Break any big target into a daily deposit rate and see the weekly and monthly pace.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-on-dark">
              Start planning <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>

        <Link to="/calculators">
          <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6">
            <div className="mb-2 flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary dark:text-primary-tint" />
              <Badge variant="outline" className="font-mono text-[10px]">
                {HOME_CALCULATOR_COUNT} tools
              </Badge>
            </div>
            <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">Browse all calculators</h3>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Explore the full directory of free calculators and unit converters across every category.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary dark:text-primary-tint">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      </section>

      {/* Popular tools */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Popular tools
          </h2>
          <Link
            to="/calculators"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline dark:text-primary-tint"
          >
            All tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popular.map((calc) => (
            <CalculatorCard key={calc.id} calc={calc} />
          ))}
        </div>
      </section>
    </div>
  );
};

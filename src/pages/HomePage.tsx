import React from 'react';
import { Search, Zap, ArrowRight, Target, Layers } from 'lucide-react';
import {
  getFeaturedCalculators,
  CATEGORIES,
  CALCULATOR_CATALOG,
} from '../data/calculators';
import { usePageMeta } from '../lib/seo';
import { Link, navigate } from '../lib/router';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const HomePage: React.FC = () => {
  usePageMeta({
    description:
      'Free online calculators and unit converters for math, finance, health, construction, cooking, and everyday life. Fast, private, and accurate.',
  });

  const featured = getFeaturedCalculators();
  const popular = [...CALCULATOR_CATALOG].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0)).slice(0, 12);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem('q') as HTMLInputElement).value.trim();
    navigate(`/calculators${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="pt-4 pb-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 mb-5">
          <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-500" />
          Zero Latency • Local Execution • {CALCULATOR_CATALOG.length} Free Tools
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-[1.15]">
          Everyday Precision <span className="text-emerald-600 dark:text-emerald-500">Calculators.</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Split bills, check BMI, compare mortgages, convert units, plan savings, and more.
          Everything runs in your browser. No account, no wait.
        </p>

        <form onSubmit={handleSearch} className="mt-6 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <Input
              name="q"
              type="text"
              placeholder="Search calculators (tip, bmi, mortgage, oz to cups...)"
              className="pl-9 pr-14 h-10 text-xs font-medium bg-white dark:bg-zinc-900"
            />
            <button
              type="submit"
              className="absolute right-3 text-xs text-emerald-600 font-semibold cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {featured.slice(0, 5).map((c) => (
            <Link key={c.id} to={`/calculators/${c.slug}`}>
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs rounded-md">
                {c.name}
              </Button>
            </Link>
          ))}
        </div>
      </section>

      {/* Category quick links */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Browse by Category
          </h2>
          <Link to="/calculators" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/categories/${cat.id}`}>
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors h-full">
                <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-2">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{cat.label}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{cat.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured tools */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Featured Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((calc) => (
            <CalculatorCard key={calc.id} calc={calc} />
          ))}
        </div>
      </section>

      {/* CTA banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/savings-goal">
          <div className="p-6 rounded-xl bg-zinc-950 text-white border border-zinc-800 hover:border-emerald-500 transition-colors h-full">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Target className="w-4 h-4" />
              <Badge variant="outline" className="text-[10px] font-mono border-emerald-700 text-emerald-300">
                Challenge
              </Badge>
            </div>
            <h3 className="text-base font-bold">Daily Savings Goal Challenge</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Break any big target into a daily deposit rate and see the weekly and monthly pace.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 mt-3">
              Start Planning <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        <Link to="/calculators">
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-colors h-full">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <Layers className="w-4 h-4" />
              <Badge variant="outline" className="text-[10px] font-mono">
                {CALCULATOR_CATALOG.length} Tools
              </Badge>
            </div>
            <h3 className="text-base font-bold">Browse All Calculators</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Explore the full directory of free calculators and unit converters across every category.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-3">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </section>

      {/* Popular tools */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Popular Tools
          </h2>
          <Link to="/calculators" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            All Tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((calc) => (
            <CalculatorCard key={calc.id} calc={calc} />
          ))}
        </div>
      </section>
    </div>
  );
};
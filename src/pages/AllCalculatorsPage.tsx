import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import {
  CALCULATOR_CATALOG,
  CATEGORIES,
  getCalculatorsByCategory,
} from '../data/calculators';
import { CalculatorCategory } from '../types';
import { usePageMeta } from '../lib/seo';
import { useSearchParams, navigate } from '../lib/router';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export const AllCalculatorsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('cat') as CalculatorCategory) || 'all';

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>(initialCategory);

  usePageMeta({
    title: 'All Calculators',
    description:
      'Browse every free online calculator and unit converter on CalculateDaily, including percentage, BMI, mortgage, savings, temperature, length, weight, and more.',
    canonicalPath: '/calculators',
  });

  const filtered = useMemo(() => {
    const byCat = getCalculatorsByCategory(selectedCategory);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byCat;
    return byCat.filter((c) => {
      const haystack = [c.name, c.shortDesc, c.tagline, ...(c.keywords || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (cat: CalculatorCategory) => {
    setSelectedCategory(cat);
    navigate(cat === 'all' ? '/calculators' : `/categories/${cat}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/calculators?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Calculator Directory
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {CALCULATOR_CATALOG.length} free calculators and converters. Pick one and start instantly.
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or keyword..."
            className="pl-9 h-10 text-xs font-medium"
          />
        </div>
      </form>

      {/* Category tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleCategoryChange('all')}
            className="text-xs h-8"
          >
            All Calculators
          </Button>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleCategoryChange(cat.id)}
              className="text-xs h-8"
            >
              {cat.label}
            </Button>
          ))}
        </div>
        <span className="text-xs font-mono text-zinc-500">{filtered.length} tools</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((calc) => (
          <CalculatorCard key={calc.id} calc={calc} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm text-zinc-500">No calculators match your search.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};
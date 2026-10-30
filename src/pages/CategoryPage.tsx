import React from 'react';
import { ChevronRight } from 'lucide-react';
import { getCalculatorsByCategory, getCategoryById, CATEGORIES } from '../data/catalogIndex';
import { usePageMeta } from '../lib/seo';
import { Link } from '../lib/router';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { Button } from '../components/ui/button';

interface CategoryPageProps {
  categoryId: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId }) => {
  const category = getCategoryById(categoryId);
  const tools = category ? getCalculatorsByCategory(category.id) : [];

  usePageMeta({
    title: category ? `${category.label} Calculators` : 'Category Not Found',
    description:
      category?.description ?? 'The calculator category you requested does not exist.',
    canonicalPath: `/categories/${categoryId}`,
    noindex: !category,
  });

  if (!category) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-zinc-950 dark:text-zinc-50">Category Not Found</h1>
        <Link
          to="/calculators"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold"
        >
          Browse All Calculators
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
        <Link to="/" className="hover:text-primary dark:hover:text-primary-tint">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/calculators" className="hover:text-primary dark:hover:text-primary-tint">
          Calculators
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{category.label}</span>
      </nav>

      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          {category.label} Calculators
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((calc) => (
          <CalculatorCard key={calc.id} calc={calc} />
        ))}
      </div>

      {/* Other categories */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Explore Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.id !== category.id).map((c) => (
            <Link key={c.id} to={`/categories/${c.id}`}>
              <Button variant="outline" size="sm" className="text-xs h-8">
                {c.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
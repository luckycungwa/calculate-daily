import React from 'react';
import {
  Receipt,
  Activity,
  Home,
  Target,
  Percent,
  TrendingUp,
  Tag,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { CALCULATOR_CATALOG } from '../data/calculators';
import { CalculatorCategory, CalculatorId } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface CalculatorDirectoryProps {
  onSelectCalculator: (id: CalculatorId) => void;
  selectedCategory: CalculatorCategory;
  onSelectCategory: (cat: CalculatorCategory) => void;
  searchFilter: string;
}

const iconMap: Record<string, any> = {
  Receipt,
  Activity,
  Home,
  Target,
  Percent,
  TrendingUp,
  Tag,
  Sparkles,
};

export const CalculatorDirectory: React.FC<CalculatorDirectoryProps> = ({
  onSelectCalculator,
  selectedCategory,
  onSelectCategory,
  searchFilter,
}) => {
  const categories: { id: CalculatorCategory; label: string }[] = [
    { id: 'all', label: 'All Calculators' },
    { id: 'daily', label: 'Daily & Dining' },
    { id: 'health', label: 'Health & Fitness' },
    { id: 'finance', label: 'Loans & Savings' },
    { id: 'math', label: 'Percentages & Math' },
  ];

  const filteredCalculators = CALCULATOR_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchFilter ||
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="calculator-directory-section" className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              id={`cat-tab-${cat.id}`}
              variant={selectedCategory === cat.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSelectCategory(cat.id)}
              className="text-xs h-8"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {filteredCalculators.length} items
        </span>
      </div>

      {/* Grid of calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCalculators.map((calc) => {
          const Icon = iconMap[calc.iconName] || Layers;
          return (
            <Card
              key={calc.id}
              id={`calc-card-${calc.id}`}
              onClick={() => onSelectCalculator(calc.id)}
              className="hover:border-zinc-400 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  {calc.badge && (
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {calc.badge}
                    </Badge>
                  )}
                </div>

                <CardTitle className="text-sm font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {calc.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  {calc.shortDesc}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

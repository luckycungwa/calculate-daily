import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { CalculatorCardModel } from '../../types';
import { CATEGORY_LABELS } from '../../data/categories';
import { getIcon } from './iconMap';
import { Link } from '../../lib/router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface CalculatorCardProps {
  calc: CalculatorCardModel;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calc }) => {
  const Icon = getIcon(calc.iconName);
  const href = `/calculators/${calc.slug}`;

  return (
    <Card className="hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group h-full">
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

        <Link to={href} className="block">
          <CardTitle className="text-sm font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {calc.name}
          </CardTitle>
        </Link>
        <CardDescription className="text-xs">{calc.shortDesc}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            {(CATEGORY_LABELS as Record<string, string>)[calc.category] || calc.category}
          </span>
          <Link
            to={href}
            className="inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400"
            onClick={() => undefined}
          >
            Open Tool <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
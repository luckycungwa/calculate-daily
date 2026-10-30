import React from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from '../lib/router';
import { getAllGuides } from '../data/guides';
import { CATEGORY_LABELS } from '../data/categories';
import { usePageMeta } from '../lib/seo';

export const GuideListingPage: React.FC = () => {
  usePageMeta({
    title: 'Guides & Articles',
    description: 'In-depth guides for using calculators effectively. Learn about mortgages, BMI, unit conversions, and everyday math with practical examples.',
    canonicalPath: '/guides',
  });

  const guides = getAllGuides();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 dark:bg-primary-tint/10 border border-primary/20 dark:border-primary/30">
          <BookOpen className="w-3.5 h-3.5 text-primary dark:text-primary-tint" />
          <span className="text-[11px] font-mono font-semibold text-primary dark:text-primary-tint uppercase tracking-wide">
            Guides & Articles
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50">
          Learn the Math Behind the Tools
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Practical guides with examples, formulas, and embedded calculators.
          Each guide covers a topic end-to-end so you understand what the numbers mean.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <Link key={guide.id} to={`/guides/${guide.slug}`}>
            <Card className="hover:border-primary/40 dark:hover:border-primary/40 transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {CATEGORY_LABELS[guide.category] || guide.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                    <Clock className="w-3 h-3" />
                    {guide.embeddedCalculators.length} tools
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{guide.name}</CardTitle>
                <CardDescription className="line-clamp-2">{guide.shortDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3">
                  {guide.content.hook}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {guide.embeddedCalculators.slice(0, 3).map(slug => (
                    <span key={slug} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {slug.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

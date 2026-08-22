import React from 'react';
import { BookOpen, ChevronRight, ArrowLeft, Share2, Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link, navigate } from '../lib/router';
import { getGuideBySlug, getAllGuides } from '../data/guides';
import { getCalculatorBySlug, CATEGORY_LABELS } from '../data/calculators';
import { CalculatorRenderer } from '../components/calculators/CalculatorRenderer';
import { usePageMeta } from '../lib/seo';
import { useToast } from '../components/ui/toast';
import { getIcon } from '../components/common/iconMap';

interface GuideDetailPageProps {
  slug: string;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug }) => {
  const guide = getGuideBySlug(slug);
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  usePageMeta(
    guide
      ? {
          title: guide.name,
          description: guide.shortDesc,
          canonicalPath: `/guides/${guide.slug}`,
        }
      : {
          title: 'Guide Not Found',
          canonicalPath: `/guides/${slug}`,
          noindex: true,
        }
  );

  if (!guide) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Guide Not Found</h1>
        <p className="text-sm text-zinc-500">The guide you are looking for does not exist.</p>
        <Button onClick={() => navigate('/guides')} variant="outline" size="sm">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Guides
        </Button>
      </div>
    );
  }

  const Icon = getIcon(guide.iconName);
  const allGuides = getAllGuides();
  const relatedGuides = allGuides.filter(
    (g) => g.id !== guide.id && (g.category === guide.category || guide.relatedGuides?.includes(g.slug))
  );

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast('Link copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <button onClick={() => navigate('/guides')} className="text-xs font-mono text-zinc-400 hover:text-emerald-600 transition-colors">
          ← All Guides
        </button>
      </div>

      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono">
                {CATEGORY_LABELS[guide.category] || guide.category}
              </Badge>
              <Badge variant="secondary" className="text-[10px] font-mono">
                Guide
              </Badge>
            </div>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50 leading-tight">
          {guide.name}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{guide.shortDesc}</p>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleShare} className="text-xs">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Share'}
          </Button>
        </div>
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
          {guide.content.hook}
        </p>

        {guide.content.sections.map((section, i) => (
          <section key={i} className="mt-8">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-3">
              {section.heading}
            </h2>
            {section.body.map((para, j) => (
              <p key={j} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                {para}
              </p>
            ))}
            {section.list && (
              <ul className="space-y-1.5 my-3">
                {section.list.map((item, k) => (
                  <li key={k} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.callout && (
              <div className="my-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-800 dark:text-emerald-300">
                {section.callout}
              </div>
            )}
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-3">In Summary</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {guide.content.conclusion}
          </p>
        </section>
      </div>

      {guide.faqs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Frequently Asked Questions
          </h2>
          {guide.faqs.map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mb-2">{faq.q}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {guide.embeddedCalculators.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Try the Calculators</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Use these tools to apply what you learned. All calculations run in your browser.
          </p>
          {guide.embeddedCalculators.map((calcSlug) => {
            const calc = getCalculatorBySlug(calcSlug);
            if (!calc) return null;
            return (
              <div key={calc.slug} id={calc.slug}>
                <CalculatorRenderer meta={calc} />
              </div>
            );
          })}
        </section>
      )}

      {guide.relatedCalculators.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Related Calculators</h3>
          <div className="flex flex-wrap gap-2">
            {guide.relatedCalculators.map((calcSlug) => {
              const calc = getCalculatorBySlug(calcSlug);
              if (!calc) return null;
              return (
                <Link key={calc.slug} to={`/calculators/${calc.slug}`}>
                  <Badge variant="outline" className="text-[11px] font-mono hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer">
                    {calc.name}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {relatedGuides.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">More Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedGuides.slice(0, 2).map((rg) => (
              <Link key={rg.id} to={`/guides/${rg.slug}`}>
                <Card className="hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors cursor-pointer">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">{rg.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

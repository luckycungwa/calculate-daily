import React from 'react';
import {
  BookOpen,
  HelpCircle,
  Lightbulb,
  PlayCircle,
  ArrowRight,
  FunctionSquare,
  GitBranch,
  Info,
} from 'lucide-react';
import { ToolContent, CalculatorMeta } from '../../types';
import { getCalculatorBySlug } from '../../data/calculators';
import { getIcon } from './iconMap';
import { Link } from '../../lib/router';
import { Card, CardContent } from '../ui/card';

interface ToolInfoSectionProps {
  content: ToolContent;
  currentSlug: string;
}

export const ToolInfoSection: React.FC<ToolInfoSectionProps> = ({ content, currentSlug }) => {
  const related = (content.related || [])
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is CalculatorMeta => Boolean(c))
    .filter((c) => c.slug !== currentSlug);

  const workflow = (content.workflowLinks || [])
    .map((w) => ({ ...w, meta: getCalculatorBySlug(w.slug) }))
    .filter((w) => w.meta && w.meta.slug !== currentSlug);

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
            <BookOpen className="w-4 h-4" />
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">What This Calculator Does</h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{content.intro}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
            <Lightbulb className="w-4 h-4" />
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">How It Works</h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{content.howItWorks}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
            <PlayCircle className="w-4 h-4" />
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Example</h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{content.example}</p>
        </CardContent>
      </Card>

      {content.formulas && content.formulas.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
              <FunctionSquare className="w-4 h-4" />
              <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Formula</h2>
            </div>
            <div className="space-y-3">
              {content.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    {f.label}
                  </div>
                  <code className="block font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {f.expression}
                  </code>
                  {f.note && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">{f.note}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {content.resultExplanations && content.resultExplanations.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
              <Info className="w-4 h-4" />
              <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Reading the Results</h2>
            </div>
            <div className="space-y-3">
              {content.resultExplanations.map((r, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{r.resultLabel}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1.5">{r.explanation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {workflow.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
              <GitBranch className="w-4 h-4" />
              <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Continue the Workflow</h2>
            </div>
            <div className="space-y-3">
              {workflow.map((w, idx) => {
                const Icon = getIcon(w.meta!.iconName);
                return (
                  <Link
                    key={idx}
                    to={`/calculators/${w.meta!.slug}`}
                    className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {w.meta!.name}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{w.step}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
            <HelpCircle className="w-4 h-4" />
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {content.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
              >
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{faq.q}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1.5">{faq.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {related.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Related Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((c) => {
                const Icon = getIcon(c.iconName);
                return (
                  <Link
                    key={c.id}
                    to={`/calculators/${c.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">{c.shortDesc}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
import React from 'react';
import { ScrollText } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/badge';

export const TermsPage: React.FC = () => {
  usePageMeta({
    title: 'Terms of Service',
    description:
      'The terms governing your use of CalculateDaily free online calculators and unit converters.',
    canonicalPath: '/terms',
  });

  const sections = [
    {
      title: 'Free Use',
      body: 'CalculateDaily provides its calculators and unit converters free of charge for personal and professional use. You may use, link to, and share the tools without permission, provided you do not misrepresent the site.',
    },
    {
      title: 'Results Are Estimates',
      body: 'Calculator outputs are mathematical estimates for general informational purposes. They are not professional financial, legal, medical, or construction advice. Always consult a qualified professional before making decisions based on these results.',
    },
    {
      title: 'No Warranty',
      body: 'The tools are provided "as is" without warranty of any kind. While we work to keep formulas accurate, we do not guarantee that results are error-free or suitable for your specific situation.',
    },
    {
      title: 'Acceptable Use',
      body: 'You agree not to scrape, reverse-engineer, or use the site in any way that disrupts its operation. Do not submit illegal, defamatory, or infringing content to the site.',
    },
    {
      title: 'Intellectual Property',
      body: 'The site design, text, and original content belong to CalculateDaily. Formulas are common mathematical knowledge and remain freely usable by everyone.',
    },
    {
      title: 'Changes',
      body: 'We may update these terms from time to time. Continued use of the site after changes are published constitutes acceptance of the updated terms.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Badge variant="outline" className="text-[11px] font-mono">
          <ScrollText className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
          Legal
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Terms of Service
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last updated: August 15, 2026
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.title} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">{s.title}</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
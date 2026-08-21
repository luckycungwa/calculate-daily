import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/badge';

export const PrivacyPage: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'How CalculateDaily handles your data: all calculations run locally in your browser, with no account, tracking, or data sharing.',
    canonicalPath: '/privacy',
  });

  const sections = [
    {
      title: 'Calculations Stay on Your Device',
      body: 'All calculator formulas execute entirely in your browser. Financial figures, health measurements, and any numbers you enter never leave your device and are not transmitted to our servers.',
    },
    {
      title: 'Local Storage Only',
      body: 'Your theme preference and calculation history are saved in your browser local storage solely to restore your settings on your next visit. You can clear them at any time through your browser settings.',
    },
    {
      title: 'No Personal Data Collection',
      body: 'We do not require an account, do not ask for your name or email, and do not collect personal information to use the calculators. We do not sell or share data with third parties.',
    },
    {
      title: 'Third-Party Data',
      body: 'The currency converter fetches live exchange rates from a third-party API (open.er-api.com) when you open that tool. No personal data is sent in that request. Only the base currency code needed to return rates.',
    },
    {
      title: 'Cookies and Advertising',
      body: 'This site currently uses no advertising cookies. If advertising is added in the future, we will update this policy and provide a consent notice before any tracking takes place.',
    },
    {
      title: 'Contact',
      body: 'For any privacy questions, use the contact page. We respond promptly to requests about this policy or your data.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Badge variant="outline" className="text-[11px] font-mono">
          <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
          Legal
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Privacy Policy
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
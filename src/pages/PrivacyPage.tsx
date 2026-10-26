import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/badge';

export const PrivacyPage: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'How CalculateDaily handles calculator inputs, browser storage, optional analytics, and third-party services.',
    canonicalPath: '/privacy',
  });

  const sections = [
    {
      title: 'Calculator Inputs',
      body: 'The built-in calculator formulas run in your browser. The calculation logic does not send the values you enter to CalculateDaily servers. If you choose to save a result, its summary is stored in your browser; copying or sharing a result uses your device clipboard.',
    },
    {
      title: 'Browser Storage',
      body: 'CalculateDaily stores your theme and currency preferences and the calculation summaries you choose to save in browser local storage. These entries remain on your device unless your browser or an extension synchronizes them. Clear them through the site controls where available or your browser settings.',
    },
    {
      title: 'Optional Analytics',
      body: 'If a Google Analytics measurement ID is configured for a deployment, the site loads Google Analytics and sends page-view events containing the page path, page title, and page URL without its query string. No analytics events are sent when the measurement ID is absent. The application does not currently provide an analytics-consent prompt; do not enable analytics in places where prior consent is required until an appropriate consent flow is in place.',
    },
    {
      title: 'Third-Party Services',
      body: 'The site loads fonts from Google Fonts, which means your browser requests font files from Google. The currency converter also requests reference exchange rates from open.er-api.com; the request uses a fixed USD base and does not include the amount or currencies you select. These providers receive ordinary connection information needed to serve the request. Their handling of that information is governed by their own policies.',
    },
    {
      title: 'Accounts, Advertising, and Hosting',
      body: 'An account is not required. No advertising scripts are currently included in the application. Analytics, when enabled, may use cookies or similar identifiers according to the Google tag configuration. The hosting provider may process standard request and security logs when pages are served. If advertising or additional tracking is introduced, this policy and any required consent controls must be updated before enabling it.',
    },
    {
      title: 'Contact',
      body: 'For privacy questions, use the contact details on the Contact page.',
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
          Last updated: October 24, 2026
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
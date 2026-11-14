import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/badge';

export const PrivacyPage: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'How Total Calculation handles calculator inputs, browser storage, analytics, advertising cookies, and third-party services.',
    canonicalPath: '/privacy',
  });

  const sections = [
    {
      title: 'Calculator Inputs',
      body: 'The built-in calculator formulas run in your browser. The calculation logic does not send the values you enter to Total Calculation servers. If you choose to save a result, its summary is stored in your browser; copying or sharing a result uses your device clipboard.',
    },
    {
      title: 'Browser Storage',
      body: 'Total Calculation stores your theme and currency preferences and the calculation summaries you choose to save in browser local storage. These entries remain on your device unless your browser or an extension synchronizes them. Clear them through the site controls where available or your browser settings.',
    },
    {
      title: 'Optional Analytics',
      body: 'Analytics is optional and off unless a measurement ID is configured for the deployment. When it is enabled, the site sends page-view events containing the page path, page title, and page URL without its query string. Analytics is only enabled in deployments that already handle any consent the law requires before those events are collected; when the measurement ID is absent, nothing is sent.',
    },
    {
      title: 'Advertising and Cookies',
      body: 'This site is supported by advertising, and ads are labelled as advertising. When advertising is enabled on a deployment, ad units are served by Google AdSense (publisher ID pub-8180440849942257) and by Google-certified partners. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this website and other websites. Google\'s use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and other sites on the internet. These cookies are set and read by Google and its partners, not by Total Calculation, and the values you type into a calculator are never sent to an advertiser or used to target an ad.',
    },
    {
      title: 'Your Advertising Choices',
      body: 'You can turn off personalised advertising in Google Ads Settings at google.com/settings/ads, and you can opt out of third-party vendors\' use of cookies for personalised advertising at aboutads.info/choices or, in Europe, youronlinechoices.eu. Where the law requires prior consent for advertising cookies, such as in the European Economic Area, the United Kingdom, and Switzerland, a Google-certified consent management platform asks for your choice before those cookies are set, and you can change or withdraw that choice at any time from the consent control shown on the page.',
    },
    {
      title: 'Third-Party Services',
      body: 'The site loads fonts from Google Fonts, which means your browser requests font files from Google. The currency converter also requests reference exchange rates from open.er-api.com; the request uses a fixed USD base and does not include the amount or currencies you select. These providers receive ordinary connection information needed to serve the request. Their handling of that information is governed by their own policies.',
    },
    {
      title: 'Who operates this site',
      body: 'Total Calculation is built and operated by 44Tag Studios, a web design studio in Johannesburg, South Africa. The studio is the data controller for the information described here and answers privacy questions at 44tagstudios@gmail.com.',
    },
    {
      title: 'Accounts, Logs, and Hosting',
      body: 'An account is not required and no profile is created for you. The hosting provider processes standard request and security logs when pages are served, which typically include your IP address, user agent, and the requested path. Advertising and analytics identifiers are covered in the sections above. If new tracking or advertising technology is introduced, this policy is updated before it is enabled.',
    },
    {
      title: 'Contact',
      body: 'For privacy questions, use the contact details on the Contact page. Data handling questions are answered by 44Tag Studios at 44tagstudios@gmail.com.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Badge variant="outline" className="text-[11px] font-mono">
          <ShieldCheck className="w-3 h-3 mr-1 text-primary dark:text-primary-tint" />
          Legal
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last updated: November 13, 2026
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
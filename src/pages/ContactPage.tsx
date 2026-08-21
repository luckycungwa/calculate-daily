import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

export const ContactPage: React.FC = () => {
  usePageMeta({
    title: 'Contact Us',
    description:
      'Get in touch with the CalculateDaily team about our calculators, converters, or partnership opportunities.',
    canonicalPath: '/contact',
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Badge variant="outline" className="text-[11px] font-mono">
          <MessageSquare className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
          Contact
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Contact Us
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Send a question about a calculator, a suggestion for a new tool, or a partnership inquiry. We read every message.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <div className="w-9 h-9 rounded-md bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Email Us</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                For corrections, feedback, or business inquiries, email the team at:
              </p>
              <a
                href="mailto:hello@calculatedaily.com"
                className="inline-block mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                hello@calculatedaily.com
              </a>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-950 dark:text-zinc-50 uppercase tracking-wider">
              What to Include
            </h3>
            <ul className="mt-2 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>- The specific calculator or page you are referring to.</li>
              <li>- A description of the issue or suggestion.</li>
              <li>- The numbers you entered and the result you expected, for bug reports.</li>
            </ul>
          </div>

          <p className="text-[11px] font-mono text-zinc-400 text-center">
            Average response time: 1-3 business days
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
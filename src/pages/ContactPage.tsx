import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { PUBLISHER } from '../lib/brand';

export const ContactPage: React.FC = () => {
  usePageMeta({
    title: 'Contact Us',
    description:
      'Get in touch with the Total Calculation team about our calculators, converters, or partnership opportunities.',
    canonicalPath: '/contact',
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2 pb-4 border-b border-border">
        <Badge variant="outline" className="text-[11px] font-mono">
          <MessageSquare className="w-3 h-3 mr-1 text-primary dark:text-primary-tint" />
          Contact
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Contact Us
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Send a question about a calculator, a suggestion for a new tool, or a partnership inquiry. We read every message.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-[#f4f4f5]/60 dark:bg-zinc-950">
            <div className="w-9 h-9 rounded-md bg-[#eef0fe] dark:bg-primary/15 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-primary dark:text-primary-tint" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Email Us</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                For corrections, feedback, or business inquiries, email the team at:
              </p>
              {/* The studio's published mailbox. A totalcalculation.com
                  address would bounce until mail is configured for the new
                  domain, so the site points at a mailbox that works today. */}
              <a
                href={`mailto:${PUBLISHER.email}`}
                className="inline-block mt-2 text-sm font-semibold text-primary dark:text-primary-tint hover:underline"
              >
                {PUBLISHER.email}
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

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
            Messages are read by the site operator. No response time is guaranteed, and this inbox is not a support
            channel for a bank, lender, employer, or clinician. Reports that a published calculation is wrong are
            prioritised and fixed in the calculator and its worked example together.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
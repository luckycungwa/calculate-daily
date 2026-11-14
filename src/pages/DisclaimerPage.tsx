import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/badge';
import { Link } from '../lib/router';

/**
 * The disclaimer is deliberately a first-class page rather than a paragraph in
 * the terms. AdSense reviewers, health and finance readers, and anyone acting on
 * a result all need to find the limits of a calculation without hunting through
 * legal boilerplate. Every claim here must stay true to how the calculators
 * actually work: nothing is described as "advice", no reviewer or credential is
 * invented, and dated figures are only mentioned where the site really dates
 * them (fuel prices and exchange rates).
 */
export const DisclaimerPage: React.FC = () => {
  usePageMeta({
    title: 'Disclaimer',
    description:
      'What Total Calculation results mean: estimates for general information, the assumptions behind them, and the limits of financial, health and legal advice.',
    canonicalPath: '/disclaimer',
  });

  const sections = [
    {
      title: 'Estimates, not professional advice',
      body: 'Every number Total Calculation produces is a mathematical estimate. The calculators apply a formula to the values you type and show the result; they do not know your circumstances, your contract, your medical history, or your local rules. A result is a starting point for a conversation with a qualified professional, not a decision, a diagnosis, a quote, a valuation, or an approval. Using this site does not create any professional relationship - not with a financial adviser, lender, broker, accountant, doctor, dietitian, lawyer, engineer, or contractor.',
    },
    {
      title: 'Financial and money calculators',
      body: 'Loan, mortgage, refinance, amortisation, savings, investment, retirement, tax, tip, discount, and debt calculators model the inputs you supply. Interest rates, fees, compounding frequency, and payment timing change the outcome, and lenders calculate payments, escrow, and payoff figures with their own conventions, so a result here can differ from an official statement by a few dollars or more. Market figures such as exchange rates and fuel prices are dated on the page and can move after the date shown. Nothing on this site is a loan offer, an investment recommendation, a tax return, or a projection of what an account will actually earn.',
    },
    {
      title: 'Health and fitness calculators',
      body: 'BMI, body fat, BMR and TDEE, protein targets, pace and race predictions, pregnancy dates, and similar tools apply population-level formulas. They describe an average person with your inputs, not you. They cannot detect or rule out any condition, they are not a diagnosis or a treatment plan, and they should not replace a clinician who can examine you. Pregnancy and due-date estimates in particular are statistical windows, not appointments. If a result concerns you, or if you are pregnant, managing a condition, under 18, or training for a medical reason, speak to a qualified health professional before acting on it.',
    },
    {
      title: 'Construction, materials and home estimates',
      body: 'Paint, flooring, tile, concrete, lumber, roofing, insulation, and similar calculators estimate quantities from the dimensions you enter plus a waste allowance you choose. Real jobs lose material to cuts, breakage, site conditions, and product packaging, and building codes, permits, and structural requirements vary by jurisdiction and are not modelled here. Treat the output as a purchasing estimate to confirm with a supplier or a licensed contractor, not as an engineering specification or a substitute for a site inspection.',
    },
    {
      title: 'Legal, tax and education calculators',
      body: 'Nothing on this site is legal or tax advice. Tax rates, brackets, contribution limits, and thresholds differ by country, state, and year, and several tools let you type the rate that applies to you rather than assuming one. Grade, GPA, and test-score tools follow a general weighting scheme; your institution may round, weight, or exclude differently, and its official transcript or result is the only authoritative figure.',
    },
    {
      title: 'Assumptions, sources and effective dates',
      body: 'Where a calculator depends on a figure that changes outside this site, the page names the figure, its effective date, and the date it was last checked, and links to the publishing source. Fuel prices and currency exchange rates work this way. Where a formula is a simplified model, the page says so and describes where the model stops being a reasonable guide. If a page does not state an assumption, the assumption is that the formula is applied exactly as written to the values you entered.',
    },
    {
      title: 'Accuracy, corrections and how to report a problem',
      body: 'The catalogue audit, the formula test suite, and the strict TypeScript check run before every change ships, and the prerender audit validates each generated page. That catches broken formulas and structural errors; it cannot catch a formula that is internally consistent but wrong for your situation. If a published calculation is wrong, the calculator and its worked example are fixed together. Email the address on the Contact page with the page, the numbers you entered, the result you expected, and why - reports that a calculation is incorrect are prioritised.',
    },
    {
      title: 'Currency, jurisdiction and rounding',
      body: 'The site is published from South Africa and written in US English. The currency picker and the worked examples are illustrative; changing the symbol does not convert the underlying amount or apply another country\'s tax rules. Results are rounded for display, usually to two decimal places, so recomputing a rounded figure by hand can differ by a cent or a unit. Unit converters convert exactly where the definition is exact and to a stated number of significant figures where it is not.',
    },
    {
      title: 'External links and embedded copies',
      body: 'Links to government, standards, and data sources are provided so you can check a figure yourself. Those sites are outside our control and may change or disappear. The same calculators can be embedded on other websites; an embedded copy runs the same formula, but the surrounding page, its advertising, and its claims belong to whoever published it, not to Total Calculation.',
    },
    {
      title: 'Advertising',
      body: 'This site is supported by advertising. Ads are served by third parties, are labelled as advertising, and are selected by those third parties - not by us. An ad appearing next to a calculator is not an endorsement of the advertised product, and no advertiser has reviewed or approved any result on this site. Advertising technology and the choices available to you are described in the Privacy Policy.',
    },
    {
      title: 'Changes to this disclaimer',
      body: 'This page is updated when the calculators, the sources behind a dated figure, or the way the site is funded change. The date below is the date of the last substantive edit. Continued use of the site after a change means you accept the version published here.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Badge variant="outline" className="text-[11px] font-mono">
          <AlertTriangle className="w-3 h-3 mr-1 text-primary dark:text-primary-tint" />
          Legal
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Disclaimer
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last updated: November 13, 2026
        </p>
      </div>

      <div className="p-5 rounded-xl border border-primary/25 bg-primary-tint/40 dark:border-primary/30 dark:bg-primary/10">
        <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
          The short version
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
          The calculators are free, they run in your browser, and they are honest
          about their formulas - but a calculated result is an estimate for general
          information. It is not financial, medical, legal, tax, or construction
          advice, and it cannot account for your circumstances. Check anything that
          matters with a qualified professional before you act on it.
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

      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Found a calculation that is wrong, or a source that has moved? Send the
        details through the{' '}
        <Link to="/contact" className="text-primary dark:text-primary-tint hover:underline">
          Contact page
        </Link>
        . How the site is built, tested, and sourced is documented on the{' '}
        <Link to="/about" className="text-primary dark:text-primary-tint hover:underline">
          About &amp; Methodology
        </Link>{' '}
        page, and the{' '}
        <Link to="/terms" className="text-primary dark:text-primary-tint hover:underline">
          Terms of Service
        </Link>{' '}
        cover acceptable use and warranty.
      </p>
    </div>
  );
};

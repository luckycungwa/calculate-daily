import React from 'react';
import {
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  Database,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CALCULATOR_COUNT, CATEGORIES } from '../data/catalogIndex';
import { PUBLISHER } from '../lib/brand';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">{title}</h2>
    <div className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
      {children}
    </div>
  </section>
);

const Factor: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({
  icon,
  title,
  children,
}) => (
  <Card>
    <CardContent className="p-5 space-y-2">
      <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
        {icon}
      </div>
      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{title}</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{children}</p>
    </CardContent>
  </Card>
);

export const AboutSection: React.FC = () => {
  return (
    <div id="about-section" className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="outline" className="text-[11px] font-mono">
          About &amp; Methodology
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
          Calculators you can check, not just read
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Total Calculation is a free, browser-based calculator library: {CALCULATOR_COUNT} tools across{' '}
          {CATEGORIES.length} categories for loans and savings, health and fitness, unit conversion, construction
          estimating, time, food, science, and everyday arithmetic. Each page explains the method behind its result —
          the formula where one applies, the assumptions either way — so you can check the arithmetic yourself.
        </p>
        <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          No account required · Free to use · No result is a personalised recommendation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Factor
          icon={<Calculator className="w-4 h-4 text-primary dark:text-primary-tint" />}
          title="The maths runs in your browser"
        >
          Formula inputs are evaluated locally, so results appear without a round trip. Values you type are not
          sent to Total Calculation to be calculated. Optional analytics and the live currency-rate request are the
          only outbound network activity, and both are described in the{' '}
          <a href="/privacy" className="text-primary dark:text-primary-tint hover:underline">
            Privacy Policy
          </a>
          .
        </Factor>

        <Factor
          icon={<Database className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />}
          title="Dated figures, with sources"
        >
          Where a calculator depends on a figure that changes outside this site, the page shows the figure&apos;s
          effective date, the date it was last checked, and a link to the publishing source. Fuel prices and
          exchange rates work this way.
        </Factor>

        <Factor
          icon={<ClipboardCheck className="w-4 h-4 text-primary dark:text-primary-tint" />}
          title="Checked by automated audits"
        >
          The catalogue audit and prerender audit run on every build; the formula test suite and strict TypeScript
          check run before a change ships. Together they validate content completeness and every generated page&apos;s
          title, description, canonical, and sitemap entry.
        </Factor>

        <Factor
          icon={<ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />}
          title="Scope is stated up front"
        >
          Results are estimates for general information. Where a result depends on a rate, a jurisdiction, or a waste
          allowance, the page names the assumption instead of hiding it, and says where a simplified model stops
          being a reasonable guide.
        </Factor>
      </div>

      <Section title="What this site offers">
        <p>
          Each calculator is a single page with three parts: the inputs, a worked example with real numbers, and a
          short explanation of the method. Category pages group the tools by subject, and the{' '}
          <a href="/calculators" className="text-primary dark:text-primary-tint hover:underline">
            full calculator index
          </a>{' '}
          lists everything with a one-line description. Calculators can also be embedded on other sites; embedded
          copies are marked noindex and are not treated as separate pages in search.
        </p>
        <p>
          There is no paywall, no sign-up, and no advertising script on the site today. Saving a result writes a
          summary to your own browser storage, not to a server.
        </p>
      </Section>

      <Section title="Who publishes this site">
        <p>
          Total Calculation is built and operated by{' '}
          <a
            href={PUBLISHER.url}
            className="text-primary dark:text-primary-tint hover:underline"
            rel="noopener"
          >
            {PUBLISHER.name}
          </a>
          , a graphic and web design studio in {PUBLISHER.locality}, {PUBLISHER.country}. The studio designs,
          builds, and maintains this site, so there is no bank, brokerage, clinic, or software vendor behind the
          results and nothing is being sold through them.
        </p>
        <p>
          The publisher is accountable for corrections, complaints, and legal notices at{' '}
          <a href={`mailto:${PUBLISHER.email}`} className="text-primary dark:text-primary-tint hover:underline">
            {PUBLISHER.email}
          </a>{' '}
          or {PUBLISHER.phone}. Studio work and client references live at{' '}
          <a
            href={PUBLISHER.url}
            className="text-primary dark:text-primary-tint hover:underline"
            rel="noopener"
          >
            44tagstudios.co.za
          </a>
          .
        </p>
      </Section>

      <Section title="How results are calculated">
        <p>
          Calculators use closed-form formulas or published equations rather than fitted guesses, and each page
          documents the one it applies. Representative examples:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Compound growth: FV = P × (1 + r/n)^(n×t), plus the standard annuity term for recurring contributions.</li>
          <li>Fixed-rate loans: the amortisation payment M = P × r × (1 + r)^n / ((1 + r)^n − 1), with a separate schedule for principal and interest.</li>
          <li>Basal metabolism: the Mifflin-St Jeor equation (10 × kg + 6.25 × cm − 5 × age ± adjustment).</li>
          <li>Body composition: the U.S. Navy tape method using waist, neck, hip, and height.</li>
          <li>Strength estimates: the Epley formula 1RM = weight × (1 + reps / 30).</li>
          <li>Unit conversions: exact defined factors, e.g. 1 inch = 2.54 cm and 1 US gallon = 3.785411784 L.</li>
        </ul>
        <p>
          Where a model is inherently approximate — body-fat tape methods, calorie burn estimates, material waste
          allowances, or fuel consumption on a real route — the page says so and shows the assumed inputs instead of
          presenting a single number as certainty.
        </p>
      </Section>

      <Section title="How the work is tested">
        <p>
          Four checks run against the repository. The catalogue audit and the prerender audit are wired into the build
          itself; the formula tests and the TypeScript check are run before a change is published. A change is only
          considered done when all four pass:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Catalogue audit</strong> — rejects entries missing an
            introduction, method explanation, worked example, at least three FAQs, valid related links, or SEO
            metadata.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Formula tests</strong> — unit tests assert known
            results for the shared calculation modules (loans and amortisation, compound interest, mortgage payments,
            fuel-cost data, unit and health formulas, and catalogue config formulas).
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Type check</strong> — the whole project compiles
            under TypeScript with no errors.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Prerender audit</strong> — inspects every generated
            HTML page for a unique title and description, a self-referencing canonical, matching Open Graph URLs,
            correct robots directives, and a sitemap entry.
          </li>
        </ul>
        <p>
          Coverage is uneven by design at this stage: shared libraries and high-traffic finance calculators have
          dedicated tests, while some simpler converters are covered only by the catalogue audit and manual checks.
          A passing build means the checked properties hold — it does not mean every number on every page has been
          independently reviewed.
        </p>
      </Section>

      <Section title="Where external data comes from">
        <p>
          Most calculators need no external data. The exceptions are handled explicitly:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">South African fuel prices</strong> — taken from the
            Department of Mineral and Petroleum Resources monthly schedule, shown with the schedule&apos;s effective
            date and the date the figures were last checked. Diesel is labelled as a wholesale baseline because it is
            not a regulated pump price. Until a new schedule is published, the next adjustment date is shown as
            pending rather than filled in with an estimate.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Currency rates</strong> — reference rates from
            open.er-api.com, timestamped on the page. They are indicative mid-market rates, not the rate a bank or
            card issuer will apply.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Conversion factors</strong> — defined constants
            (SI and customary definitions) rather than measured values, so they do not go stale.
          </li>
        </ul>
        <p>
          Figures that change on a schedule are stored in a versioned data module with their effective date, the date
          they were verified, and their source, so an outdated figure can be identified and replaced in one place
          instead of being retyped across pages.
        </p>
      </Section>

      <Section title="Reporting an error">
        <p>
          If a result looks wrong, email the address on the{' '}
          <a href="/contact" className="text-primary dark:text-primary-tint hover:underline">
            Contact page
          </a>{' '}
          with the calculator name, the inputs you used, the result you saw, and the result you expected. A worked
          correction is more useful than a description, and it is the fastest way to get a fix verified.
        </p>
        <p>
          Reports are read, but this site does not promise a response time or a service-level agreement, and it is
          not a support channel for a bank, lender, employer, or clinician. Corrections that change a published
          result are made in the calculator and its worked example together, so the page never contradicts itself.
        </p>
      </Section>

      <Section title="Limitations">
        <div className="flex items-start gap-3 rounded-lg border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 p-4">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Results are general estimates, not financial, medical, legal, tax, or engineering advice. No result is
              tailored to your circumstances, and none creates a professional relationship.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>Tax, levy, and fee rules differ by country, province, and year; a page states the jurisdiction it assumes.</li>
              <li>Loan results exclude lender-specific fees, insurance, and rate changes unless the page says otherwise.</li>
              <li>Health outputs are population formulas and cannot diagnose or rule out a condition.</li>
              <li>Material estimators assume the stated waste allowance and unit sizes; site conditions vary.</li>
              <li>Rounding is shown at the page level, so totals may differ from an unrounded internal value by a cent or a unit.</li>
            </ul>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Before a decision with money, health, or safety consequences, confirm the numbers with a qualified
              professional or the primary source.
            </p>
          </div>
        </div>
      </Section>

      <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 pt-2">
        <Mail className="w-3.5 h-3.5" />
        <a href="/contact" className="hover:text-primary dark:hover:text-primary-tint">
          Corrections and questions
        </a>
      </div>
    </div>
  );
};

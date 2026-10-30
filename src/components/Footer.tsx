import React from 'react';
import { ArrowUp, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '../lib/router';
import { CATEGORIES } from '../data/categories';
import { PUBLISHER, BRAND_NAME } from '../lib/brand';

/**
 * The footer wordmark is derived from BRAND_NAME so a rename can never leave an
 * old brand on every page. The last word takes the emerald accent; everything
 * before it stays neutral. "Total Calculation" → "Total " + accented "Calculation".
 */
const wordmarkWords = BRAND_NAME.split(' ');
const wordmarkAccent = wordmarkWords.length > 1 ? wordmarkWords[wordmarkWords.length - 1] : '';
const wordmarkLead = wordmarkWords.length > 1 ? `${wordmarkWords.slice(0, -1).join(' ')} ` : BRAND_NAME;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topTools = [
    { slug: 'tip-calculator', label: 'Tip & Bill Splitter' },
    { slug: 'bmi-calculator', label: 'BMI Health Index' },
    { slug: 'mortgage-calculator', label: 'Mortgage & Loan Planner' },
    { slug: 'percentage-calculator', label: 'Percentage Calculator' },
    { slug: 'compound-interest-calculator', label: 'Compound Interest' },
    { slug: 'oz-to-cups-calculator', label: 'Oz to Cups Converter' },
  ];

  return (
    <footer id="app-footer" className="bg-zinc-950 text-zinc-400 mt-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#f4f4f5" />
                <path d="M9 12.4h14" stroke="#09090b" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M9 19.6h8.5" stroke="#09090b" strokeWidth="2.6" strokeLinecap="round" />
                <circle cx="22.5" cy="19.6" r="2.9" fill="#6366f1" />
              </svg>
              <span>{wordmarkLead}<span className="text-brand-on-dark">{wordmarkAccent}</span></span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deterministic, fast calculators for finance, health, construction, cooking, and everyday planning.
            </p>
          </div>

          {/* Col 2: Top Tools */}
          <div>
            <h2 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              Top Tools
            </h2>
            <ul className="space-y-1.5 text-xs">
              {topTools.map((tool) => (
                <li key={tool.slug}>
                  <Link to={`/calculators/${tool.slug}`} className="inline-block py-1 hover:text-zinc-100 transition-colors">
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h2 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              Categories
            </h2>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.id}`} className="inline-block py-1 hover:text-zinc-100 transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Navigation & Info */}
          <div>
            <h2 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              System
            </h2>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="inline-block py-1 hover:text-zinc-100">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="inline-flex py-1 hover:text-zinc-100 items-center gap-1">
                  <Layers className="w-3 h-3" /> Directory
                </Link>
              </li>
              <li>
                <Link to="/savings-goal" className="inline-block py-1 hover:text-zinc-100">
                  Savings Challenge
                </Link>
              </li>
              <li>
                <Link to="/about" className="inline-block py-1 hover:text-zinc-100">
                  Documentation
                </Link>
              </li>
              <li className="pt-2 mt-2 border-t border-zinc-800">
                <Link to="/privacy" className="inline-block py-1 hover:text-zinc-100">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="inline-block py-1 hover:text-zinc-100">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-block py-1 hover:text-zinc-100">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-zinc-400 font-mono space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {BRAND_NAME} • All calculations performed locally
              <span className="mt-1 block">
                Built and published by{' '}
                <a
                  href={PUBLISHER.url}
                  rel="noopener"
                  className="inline-block py-1 text-zinc-300 underline-offset-2 hover:text-white hover:underline"
                >
                  {PUBLISHER.name}
                </a>
                , {PUBLISHER.locality}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="h-7 text-xs border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <ArrowUp className="w-3 h-3" /> Top
            </Button>
          </div>
          <p className="text-zinc-400 leading-relaxed max-w-3xl">
            Results are estimates for general informational purposes and are not professional financial, medical, legal, or construction advice. Consult a qualified professional before making decisions based on these calculations.
          </p>
        </div>
      </div>
    </footer>
  );
};
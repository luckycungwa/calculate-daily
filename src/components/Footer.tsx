import React from 'react';
import { Calculator, ArrowUp, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '../lib/router';
import { CATEGORIES } from '../data/calculators';

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
              <div className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                <Calculator className="w-3.5 h-3.5" />
              </div>
              <span>Calculate<span className="text-emerald-500">Daily</span></span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deterministic, fast calculators for finance, health, construction, cooking, and everyday planning.
            </p>
          </div>

          {/* Col 2: Top Tools */}
          <div>
            <h4 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              Top Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              {topTools.map((tool) => (
                <li key={tool.slug}>
                  <Link to={`/calculators/${tool.slug}`} className="hover:text-zinc-100 transition-colors">
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.id}`} className="hover:text-zinc-100 transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Navigation & Info */}
          <div>
            <h4 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              System
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-zinc-100">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-zinc-100 inline-flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Directory
                </Link>
              </li>
              <li>
                <Link to="/savings-goal" className="hover:text-zinc-100">
                  Savings Challenge
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-zinc-100">
                  Documentation
                </Link>
              </li>
              <li className="pt-2 mt-2 border-t border-zinc-800">
                <Link to="/privacy" className="hover:text-zinc-100">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-zinc-100">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-zinc-100">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-zinc-500 font-mono space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              Calculate Daily • All calculations performed locally
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
          <p className="text-zinc-600 leading-relaxed max-w-3xl">
            Results are estimates for general informational purposes and are not professional financial, medical, legal, or construction advice. Consult a qualified professional before making decisions based on these calculations.
          </p>
        </div>
      </div>
    </footer>
  );
};
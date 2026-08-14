import React from 'react';
import { Calculator, ArrowUp } from 'lucide-react';
import { CalculatorId } from '../types';
import { Button } from './ui/button';

interface FooterProps {
  onSelectCalculator: (id: CalculatorId) => void;
  onNavigate: (view: 'home' | 'calculators' | 'daily-challenge' | 'ai-builder' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCalculator, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              Deterministic, fast calculations for finance, health, and everyday planning.
            </p>
          </div>

          {/* Col 2: Featured Calculators */}
          <div>
            <h4 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              Standard Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCalculator('tip')}
                  className="hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Tip & Bill Splitter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCalculator('bmi')}
                  className="hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  BMI Health Index
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCalculator('mortgage')}
                  className="hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Mortgage Amortization
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCalculator('daily-challenge')}
                  className="hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Daily Savings Goal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: More Math & Finance */}
          <div>
            <h4 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              Math & Finance
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCalculator('percentage')}
                  className="hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Percentage Calculations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCalculator('compound')}
                  className="hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Compound Growth
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCalculator('discount')}
                  className="hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  Discount & Tax Analysis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('ai-builder')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                >
                  AI Custom Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Navigation & Info */}
          <div>
            <h4 className="text-zinc-200 text-xs font-mono uppercase tracking-wider mb-3">
              System
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-zinc-100 cursor-pointer">
                  Overview
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('calculators')} className="hover:text-zinc-100 cursor-pointer">
                  Directory
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('daily-challenge')} className="hover:text-zinc-100 cursor-pointer">
                  Savings Challenge
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('about')} className="hover:text-zinc-100 cursor-pointer">
                  Documentation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
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
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Calculator, Menu, X, Home, Layers, BookOpen, Target, Info, CarFront, Landmark, TrendingUp, Percent, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '../lib/router';
import { useCurrency, setCurrencySymbol, CURRENCY_SYMBOLS } from '../lib/currency';
import { CATEGORIES } from '../data/categories';

interface HeaderProps {
  activePath: string;
  onOpenHistory: () => void;
  historyCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenShortcuts: () => void;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  activePath,
  onOpenHistory,
  historyCount,
  isDarkMode,
  onToggleDarkMode,
  onOpenShortcuts,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const currency = useCurrency();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { id: 'calculators', label: 'All Calculators', path: '/calculators', icon: <Layers className="w-4 h-4" /> },
    { id: 'guides', label: 'Guides', path: '/guides', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'savings-goal', label: 'Savings Goal', path: '/savings-goal', icon: <Target className="w-4 h-4" /> },
    { id: 'about', label: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
  ];
  const popularCalculators: NavItem[] = [
    { id: 'home-loan', label: 'Home Loan EMI', path: '/calculators/mortgage-calculator', icon: <Home className="w-4 h-4" /> },
    { id: 'car-loan', label: 'Car Loan EMI', path: '/calculators/car-loan-calculator', icon: <CarFront className="w-4 h-4" /> },
    { id: 'loan-emi', label: 'Loan EMI', path: '/calculators/loan-payment-calculator', icon: <Landmark className="w-4 h-4" /> },
    { id: 'compound-interest', label: 'Compound Interest & SIP', path: '/calculators/compound-interest-calculator', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'percentage', label: 'Percentage', path: '/calculators/percentage-calculator', icon: <Percent className="w-4 h-4" /> },
    { id: 'bmi', label: 'BMI', path: '/calculators/bmi-calculator', icon: <Activity className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return activePath === '/';
    return activePath.startsWith(path);
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer group" id="brand-logo">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Calculate<span className="text-emerald-600 dark:text-emerald-500">Daily</span>
            </span>
          </Link>

          {/* Right: Currency + Burger */}
          <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <select
              id="currency-selector"
              value={currency}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              title="Currency symbol"
              className="h-8 px-2 rounded-lg text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer hover:border-emerald-500 focus:outline-none focus:border-emerald-500"
            >
              {CURRENCY_SYMBOLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Burger Menu */}
            <Button
              id="mobile-menu-btn"
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="site-navigation-menu"
              className="h-8 w-8"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            id="site-navigation-menu"
            aria-label="Main navigation"
            className="absolute left-0 right-0 top-full z-50 mx-4 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border border-zinc-200 dark:border-zinc-800 py-2 px-2 space-y-0.5 bg-white dark:bg-zinc-950 shadow-lg md:left-auto md:right-4 md:w-80 md:rounded-lg"
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg flex items-center gap-3 transition-colors ${
                  isActive(item.path)
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <p className="px-3 pb-1 pt-3 text-[10px] font-mono uppercase text-zinc-400">Calculator categories</p>
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-3 transition-colors ${
                  isActive(`/categories/${category.id}`)
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                {category.label}
              </Link>
            ))}

            <p className="px-3 pb-1 pt-3 text-[10px] font-mono uppercase text-zinc-400">Popular calculators</p>
            {popularCalculators.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-3 transition-colors ${
                  isActive(item.path)
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* History in mobile menu */}
            <button
              type="button"
              onClick={() => { onOpenHistory(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="w-4 h-4 flex items-center justify-center text-xs">ðŸ•</span>
              History
              {historyCount > 0 && (
                <span className="ml-auto text-[10px] font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded-full">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

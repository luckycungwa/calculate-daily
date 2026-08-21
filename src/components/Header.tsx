import React, { useState } from 'react';
import { Calculator, Target, Layers, Info, History, Moon, Sun, Keyboard, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link, navigate } from '../lib/router';
import { useCurrency, setCurrencySymbol, CURRENCY_SYMBOLS } from '../lib/currency';
import { useRegion } from '../lib/region';
import { REGIONS } from '../data/regions';

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
  const { regionCode, setRegion } = useRegion();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', path: '/', icon: null },
    { id: 'calculators', label: 'Calculators', path: '/calculators', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'savings-goal', label: 'Savings Goal', path: '/savings-goal', icon: <Target className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'About', path: '/about', icon: <Info className="w-3.5 h-3.5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return activePath === '/';
    if (path === '/calculators') {
      return activePath.startsWith('/calculators') || activePath.startsWith('/categories');
    }
    return activePath.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group" id="brand-logo">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  Calculate<span className="text-emerald-600 dark:text-emerald-500">Daily</span>
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 -mt-0.5 hidden sm:block">
                Daily Dose of Numbers
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
            {navItems.map((item) => (
              <Button
                key={item.id}
                id={`nav-${item.id}`}
                variant={isActive(item.path) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.path)}
                className="text-xs h-7.5"
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5">
            {/* Region Selector */}
            <select
              id="region-selector"
              value={regionCode}
              onChange={(e) => setRegion(e.target.value as typeof regionCode)}
              title="Region"
              className="h-8 px-1.5 rounded-lg text-xs font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer hover:border-emerald-500 focus:outline-none"
            >
              {REGIONS.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.code}
                </option>
              ))}
            </select>

            {/* Currency Selector */}
            <select
              id="currency-selector"
              value={currency}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              title="Currency symbol"
              className="h-8 px-1.5 rounded-lg text-xs font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer hover:border-emerald-500 focus:outline-none"
            >
              {CURRENCY_SYMBOLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Dark Mode Toggle */}
            <Button
              id="theme-toggle-btn"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-zinc-200" /> : <Moon className="w-3.5 h-3.5 text-zinc-700" />}
            </Button>

            {/* Keyboard Shortcuts button */}
            <Button
              id="shortcuts-btn"
              variant="outline"
              size="icon"
              className="hidden lg:inline-flex h-8 w-8 rounded-lg"
              onClick={onOpenShortcuts}
              title="Keyboard shortcuts (Press ?)"
            >
              <Keyboard className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
            </Button>

            {/* History Log */}
            <Button
              id="header-history-button"
              variant="outline"
              size="sm"
              onClick={onOpenHistory}
              className="h-8 px-2.5 text-xs font-semibold gap-1.5"
              title="Recent calculations"
            >
              <History className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">History</span>
              {historyCount > 0 && (
                <Badge variant="default" className="h-4 min-w-4 px-1 rounded-full text-[10px] font-mono leading-none bg-emerald-600 text-white">
                  {historyCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Trigger */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-8 w-8"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1 bg-white dark:bg-zinc-950">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-emerald-600 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
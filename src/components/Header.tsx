import React, { useState } from 'react';
import { Calculator, Sparkles, Target, Layers, Info, History, Moon, Sun, Keyboard, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: 'home' | 'calculators' | 'daily-challenge' | 'ai-builder' | 'about') => void;
  onOpenHistory: () => void;
  historyCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onOpenHistory,
  historyCount,
  isDarkMode,
  onToggleDarkMode,
  onOpenShortcuts,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (view: 'home' | 'calculators' | 'daily-challenge' | 'ai-builder' | 'about') => {
    onNavigate(view);
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
          <div
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  Calculate<span className="text-emerald-600 dark:text-emerald-500">Daily</span>
                </span>
                <Badge variant="outline" className="hidden sm:inline-flex text-[10px] py-0 px-1.5 font-mono">
                  PRO
                </Badge>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 -mt-0.5 hidden sm:block">
                Daily Dose of Numbers
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <Button
              id="nav-home"
              variant={activeView === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick('home')}
              className="text-xs h-7.5"
            >
              Home
            </Button>
            <Button
              id="nav-calculators"
              variant={activeView === 'calculators' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick('calculators')}
              className="text-xs h-7.5"
            >
              <Layers className="w-3.5 h-3.5" />
              Calculators
            </Button>
            <Button
              id="nav-daily-challenge"
              variant={activeView === 'daily-challenge' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick('daily-challenge')}
              className="text-xs h-7.5"
            >
              <Target className="w-3.5 h-3.5" />
              Savings Goal
            </Button>
            <Button
              id="nav-ai-builder"
              variant={activeView === 'ai-builder' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick('ai-builder')}
              className="text-xs h-7.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Builder
            </Button>
            <Button
              id="nav-about"
              variant={activeView === 'about' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick('about')}
              className="text-xs h-7.5"
            >
              <Info className="w-3.5 h-3.5" />
              About
            </Button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5">
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
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md ${
                activeView === 'home' ? 'bg-zinc-100 dark:bg-zinc-800 text-emerald-600 font-bold' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('calculators')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 ${
                activeView === 'calculators' ? 'bg-zinc-100 dark:bg-zinc-800 text-emerald-600 font-bold' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Calculators Directory
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('daily-challenge')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 ${
                activeView === 'daily-challenge' ? 'bg-zinc-100 dark:bg-zinc-800 text-emerald-600 font-bold' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-zinc-500" />
              Daily Savings Goal
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('ai-builder')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 ${
                activeView === 'ai-builder' ? 'bg-zinc-100 dark:bg-zinc-800 text-emerald-600 font-bold' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              AI Custom Builder
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 ${
                activeView === 'about' ? 'bg-zinc-100 dark:bg-zinc-800 text-emerald-600 font-bold' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-zinc-500" />
              About & Methodology
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

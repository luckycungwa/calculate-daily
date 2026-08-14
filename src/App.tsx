import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DailySavingsChallenge } from './components/DailySavingsChallenge';
import { AiBuilderSection } from './components/AiBuilderSection';
import { TipCalculator } from './components/calculators/TipCalculator';
import { BmiCalculator } from './components/calculators/BmiCalculator';
import { MortgageCalculator } from './components/calculators/MortgageCalculator';
import { PercentageCalculator } from './components/calculators/PercentageCalculator';
import { CompoundInterestCalculator } from './components/calculators/CompoundInterestCalculator';
import { DiscountCalculator } from './components/calculators/DiscountCalculator';
import { DynamicAiCalculator } from './components/calculators/DynamicAiCalculator';
import { CalculatorDirectory } from './components/CalculatorDirectory';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CalculationHistoryModal } from './components/CalculationHistoryModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import {
  CalculatorId,
  CalculatorCategory,
  DynamicAiCalculatorSpec,
  CalculationHistoryItem,
} from './types';
import {
  Sparkles,
  Receipt,
  Activity,
  Home as HomeIcon,
  Percent,
  TrendingUp,
  Tag,
  Target,
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<
    'home' | 'calculators' | 'daily-challenge' | 'ai-builder' | 'about'
  >('home');
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId>('tip');
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dynamicAiSpec, setDynamicAiSpec] = useState<DynamicAiCalculatorSpec | null>(null);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('calculate_daily_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // History Log
  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calculate_daily_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);

  const calculatorWorkspaceRef = useRef<HTMLDivElement>(null);
  const aiBuilderRef = useRef<HTMLDivElement>(null);
  const dailyChallengeRef = useRef<HTMLDivElement>(null);

  // Sync theme with DOM
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('calculate_daily_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('calculate_daily_theme', 'light');
      }
    } catch (e) {
      console.warn('Could not set dark mode', e);
    }
  }, [isDarkMode]);

  // Sync history with storage
  useEffect(() => {
    try {
      localStorage.setItem('calculate_daily_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not persist calculation history', e);
    }
  }, [history]);

  // Global Keyboard shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setIsHistoryModalOpen((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setIsDarkMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSaveHistory = (summary: string, customCalcName?: string) => {
    const calcNames: Record<CalculatorId, string> = {
      tip: 'Tip & Bill Splitter',
      bmi: 'BMI Calculator',
      mortgage: 'Mortgage Calculator',
      'daily-challenge': 'Daily Savings Goal',
      percentage: 'Percentage Calculator',
      compound: 'Compound Growth',
      discount: 'Discount Calculator',
      'ai-custom': dynamicAiSpec?.title || 'AI Generated Calculator',
    };

    const newItem: CalculationHistoryItem = {
      id: `calc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      calculatorName: customCalcName || calcNames[activeCalculator] || 'Calculation',
      summary,
      timestamp: Date.now(),
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 49)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleSelectCalculator = (id: CalculatorId) => {
    setActiveCalculator(id);
    if (activeView !== 'home' && activeView !== 'calculators') {
      setActiveView('home');
    }
    setTimeout(() => {
      calculatorWorkspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDynamicAiGenerated = (spec: DynamicAiCalculatorSpec) => {
    setDynamicAiSpec(spec);
    setActiveCalculator('ai-custom');
    setTimeout(() => {
      calculatorWorkspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleNavigate = (view: 'home' | 'calculators' | 'daily-challenge' | 'ai-builder' | 'about') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculatorTabs: { id: CalculatorId; label: string; icon: any }[] = [
    { id: 'tip', label: 'Tip & Split', icon: Receipt },
    { id: 'bmi', label: 'BMI Health', icon: Activity },
    { id: 'mortgage', label: 'Mortgage', icon: HomeIcon },
    { id: 'daily-challenge', label: 'Daily Savings', icon: Target },
    { id: 'percentage', label: 'Percentage', icon: Percent },
    { id: 'compound', label: 'Compound', icon: TrendingUp },
    { id: 'discount', label: 'Discount', icon: Tag },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Global Header */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        historyCount={history.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* VIEW: HOME */}
        {activeView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onSelectCalculator={handleSelectCalculator}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigateToAi={() => {
                aiBuilderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            />

            {/* Featured Daily Savings Challenge */}
            <div ref={dailyChallengeRef}>
              <DailySavingsChallenge onSaveHistory={handleSaveHistory} />
            </div>

            {/* Prominent AI Calculator Builder Section */}
            <div ref={aiBuilderRef}>
              <AiBuilderSection
                onSelectCalculator={handleSelectCalculator}
                onDynamicAiGenerated={handleDynamicAiGenerated}
              />
            </div>

            {/* Active Calculator Workspace */}
            <section ref={calculatorWorkspaceRef} id="calculator-workspace" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-zinc-500">
                    Active Tool:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    {calculatorTabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <Button
                          key={tab.id}
                          id={`workspace-tab-${tab.id}`}
                          type="button"
                          variant={activeCalculator === tab.id ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setActiveCalculator(tab.id)}
                          className="h-7 text-xs font-mono gap-1 px-2.5"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {tab.label}
                        </Button>
                      );
                    })}
                    {dynamicAiSpec && (
                      <Button
                        type="button"
                        variant={activeCalculator === 'ai-custom' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveCalculator('ai-custom')}
                        className="h-7 text-xs font-mono gap-1 px-2.5 border-emerald-600/50"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        {dynamicAiSpec.title}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Render Active Component */}
              <div className="transition-all duration-200">
                {activeCalculator === 'tip' && (
                  <TipCalculator onSaveHistory={handleSaveHistory} />
                )}
                {activeCalculator === 'bmi' && (
                  <BmiCalculator onSaveHistory={handleSaveHistory} />
                )}
                {activeCalculator === 'mortgage' && (
                  <MortgageCalculator onSaveHistory={handleSaveHistory} />
                )}
                {activeCalculator === 'daily-challenge' && (
                  <DailySavingsChallenge onSaveHistory={handleSaveHistory} />
                )}
                {activeCalculator === 'percentage' && (
                  <PercentageCalculator onSaveHistory={handleSaveHistory} />
                )}
                {activeCalculator === 'compound' && (
                  <CompoundInterestCalculator onSaveHistory={handleSaveHistory} />
                )}
                {activeCalculator === 'discount' && (
                  <DiscountCalculator onSaveHistory={handleSaveHistory} />
                )}
                {activeCalculator === 'ai-custom' && dynamicAiSpec && (
                  <DynamicAiCalculator
                    spec={dynamicAiSpec}
                    onSaveHistory={handleSaveHistory}
                  />
                )}
              </div>
            </section>

            {/* Calculator Directory & Catalog */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Tool Catalog
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono">
                    Direct access to mathematical, clinical, and financial instruments.
                  </p>
                </div>
              </div>

              <CalculatorDirectory
                onSelectCalculator={handleSelectCalculator}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchFilter={searchQuery}
              />
            </div>
          </>
        )}

        {/* VIEW: CALCULATORS DIRECTORY */}
        {activeView === 'calculators' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Tool Directory
              </h1>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Select any instrument below to begin immediate execution.
              </p>
            </div>

            {/* Active Calculator Box */}
            <div ref={calculatorWorkspaceRef}>
              {activeCalculator === 'tip' && <TipCalculator onSaveHistory={handleSaveHistory} />}
              {activeCalculator === 'bmi' && <BmiCalculator onSaveHistory={handleSaveHistory} />}
              {activeCalculator === 'mortgage' && <MortgageCalculator onSaveHistory={handleSaveHistory} />}
              {activeCalculator === 'daily-challenge' && <DailySavingsChallenge onSaveHistory={handleSaveHistory} />}
              {activeCalculator === 'percentage' && <PercentageCalculator onSaveHistory={handleSaveHistory} />}
              {activeCalculator === 'compound' && <CompoundInterestCalculator onSaveHistory={handleSaveHistory} />}
              {activeCalculator === 'discount' && <DiscountCalculator onSaveHistory={handleSaveHistory} />}
              {activeCalculator === 'ai-custom' && dynamicAiSpec && (
                <DynamicAiCalculator spec={dynamicAiSpec} onSaveHistory={handleSaveHistory} />
              )}
            </div>

            <CalculatorDirectory
              onSelectCalculator={handleSelectCalculator}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchFilter={searchQuery}
            />
          </div>
        )}

        {/* VIEW: DAILY CHALLENGE */}
        {activeView === 'daily-challenge' && (
          <div className="space-y-6">
            <DailySavingsChallenge onSaveHistory={handleSaveHistory} />
          </div>
        )}

        {/* VIEW: AI BUILDER */}
        {activeView === 'ai-builder' && (
          <div className="space-y-6">
            <AiBuilderSection
              onSelectCalculator={handleSelectCalculator}
              onDynamicAiGenerated={handleDynamicAiGenerated}
            />
            {dynamicAiSpec && (
              <DynamicAiCalculator
                spec={dynamicAiSpec}
                onSaveHistory={handleSaveHistory}
              />
            )}
            {activeCalculator !== 'ai-custom' && (
              <div>
                <h3 className="text-sm font-mono uppercase text-zinc-500 mb-2">
                  Active Preset Tool
                </h3>
                {activeCalculator === 'tip' && <TipCalculator onSaveHistory={handleSaveHistory} />}
                {activeCalculator === 'bmi' && <BmiCalculator onSaveHistory={handleSaveHistory} />}
                {activeCalculator === 'mortgage' && <MortgageCalculator onSaveHistory={handleSaveHistory} />}
                {activeCalculator === 'daily-challenge' && <DailySavingsChallenge onSaveHistory={handleSaveHistory} />}
                {activeCalculator === 'percentage' && <PercentageCalculator onSaveHistory={handleSaveHistory} />}
                {activeCalculator === 'compound' && <CompoundInterestCalculator onSaveHistory={handleSaveHistory} />}
                {activeCalculator === 'discount' && <DiscountCalculator onSaveHistory={handleSaveHistory} />}
              </div>
            )}
          </div>
        )}

        {/* VIEW: ABOUT */}
        {activeView === 'about' && (
          <div className="space-y-6">
            <AboutSection />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCalculator={handleSelectCalculator}
        onNavigate={handleNavigate}
      />

      {/* History Modal */}
      <CalculationHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
}

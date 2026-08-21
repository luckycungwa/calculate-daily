import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CalculationHistoryModal } from './components/CalculationHistoryModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { HomePage } from './pages/HomePage';
import { AllCalculatorsPage } from './pages/AllCalculatorsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CategoryPage } from './pages/CategoryPage';
import { SavingsGoalPage } from './pages/SavingsGoalPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { useRoute } from './lib/router';
import { useTheme } from './lib/theme';
import { useToast } from './components/ui/toast';
import { CalculationHistoryItem } from './types';
import { Link } from './lib/router';

export default function App() {
  const route = useRoute();
  const { isDark: isDarkMode, toggle: toggleDarkMode } = useTheme();
  const { toast } = useToast();

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
        toggleDarkMode();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveHistory = (summary: string) => {
    const newItem: CalculationHistoryItem = {
      id: `calc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      calculatorName: 'Calculation',
      summary,
      timestamp: Date.now(),
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 49)]);
    toast('Result saved to history');
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast('History cleared', 'info');
  };

  const renderPage = () => {
    switch (route.name) {
      case 'home':
        return <HomePage />;
      case 'calculators':
        return <AllCalculatorsPage />;
      case 'calculator':
        return <CalculatorPage slug={route.slug} onSaveHistory={handleSaveHistory} />;
      case 'category':
        return <CategoryPage categoryId={route.category} />;
      case 'savings-goal':
        return <SavingsGoalPage onSaveHistory={handleSaveHistory} />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
            <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">Page Not Found</h1>
            <p className="text-sm text-zinc-500">The page you requested does not exist.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
            >
              Back to Home
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Global Header */}
      <Header
        activePath={window.location.pathname}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        historyCount={history.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer />

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
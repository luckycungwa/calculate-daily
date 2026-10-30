import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CalculationHistoryModal } from './components/CalculationHistoryModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { useRoute } from './lib/router';
import { getPage, loadPage, type PageRouteName } from './lib/pageRegistry';
import { usePageMeta } from './lib/seo';
import { useTheme } from './lib/theme';
import { useToast } from './components/ui/toast';
import { CalculationHistoryItem } from './types';
import { Link } from './lib/router';

/** Shown for the one chunk request after in-app navigation to a cold route. */
const PageSkeleton: React.FC = () => (
  <div className="max-w-3xl mx-auto py-16 space-y-4 animate-pulse">
    <div className="h-7 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
    <div className="h-4 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
    <div className="h-40 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800" />
  </div>
);

// Unknown routes must never inherit the previous page's title or canonical URL.
const NotFoundPage: React.FC = () => {
  usePageMeta({
    title: 'Page Not Found',
    description:
      'The page you requested does not exist. Browse free calculators and unit converters on Total Calculation.',
    noindex: true,
  });
  return (
    <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
      <h1 className="font-display text-2xl font-bold text-zinc-950 dark:text-zinc-50">Page Not Found</h1>
      <p className="text-sm text-zinc-500">The page you requested does not exist.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default function App() {
  const route = useRoute();
  const activePath = typeof window !== 'undefined' ? window.location.pathname : '/';
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

  // Page modules are route chunks. Initial navigation is preloaded before
  // hydration; here we cover in-app navigation to a route not yet in memory.
  const pageName: PageRouteName | null = route.name === 'not-found' ? null : route.name;
  const Page = pageName ? getPage(pageName) : undefined;
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!pageName || Page) return;
    let active = true;
    loadPage(pageName).then(() => {
      if (active) setTick((t) => t + 1);
    });
    return () => {
      active = false;
    };
  }, [pageName, Page]);

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
    if (route.name === 'not-found') return <NotFoundPage />;
    if (!Page) return <PageSkeleton />;

    switch (route.name) {
      case 'home':
        return <Page />;
      case 'calculators':
        return <Page />;
      case 'calculator':
        return <Page slug={route.slug} onSaveHistory={handleSaveHistory} />;
      case 'embed':
        return <Page slug={route.slug} />;
      case 'category':
        return <Page categoryId={route.category} />;
      case 'savings-goal':
        return <Page onSaveHistory={handleSaveHistory} />;
      case 'about':
        return <Page />;
      case 'privacy':
        return <Page />;
      case 'terms':
        return <Page />;
      case 'contact':
        return <Page />;
      case 'guides':
        return <Page />;
      case 'guide':
        return <Page slug={route.slug} />;
      default:
        return <NotFoundPage />;
    }
  };

  // An embed is framed on a third-party page, so it must not carry the site
  // header, footer, history UI, or page padding. Direct loads have the page
  // chunk preloaded in main.tsx, so this branch renders the real calculator.
  if (route.name === 'embed' && Page) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Page slug={route.slug} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Global Header */}
      <Header
        activePath={activePath}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        historyCount={history.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 scroll-mt-20 outline-none"
      >
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
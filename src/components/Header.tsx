import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Calculator,
  CarFront,
  ChevronDown,
  Cpu,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  History,
  Home,
  Info,
  Keyboard,
  Landmark,
  Layers,
  Menu,
  Moon,
  Percent,
  Ruler,
  Sparkles,
  Sun,
  Target,
  Timer,
  TrendingUp,
  Utensils,
  Wallet,
  Wrench,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '../lib/router';
import { useCurrency, setCurrencySymbol, CURRENCY_SYMBOLS } from '../lib/currency';
import { CATEGORIES } from '../data/categories';
import { HeaderSearch } from './HeaderSearch';
import { HOME_CALCULATOR_COUNT, HOME_CATEGORY_COUNTS } from '../data/homeIndex.generated';

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

/** Icons are decorative; the label next to each one carries the meaning. */
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  math: Percent,
  finance: Wallet,
  health: HeartPulse,
  conversion: Ruler,
  time: Timer,
  construction: Wrench,
  food: Utensils,
  fitness: Dumbbell,
  tech: Cpu,
  science: FlaskConical,
  daily: Sparkles,
  misc: CarFront,
};

const POPULAR: NavItem[] = [
  {
    id: 'home-loan',
    label: 'Mortgage / Home Loan EMI',
    path: '/calculators/mortgage-calculator',
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: 'percentage',
    label: 'Percentage Calculator',
    path: '/calculators/percentage-calculator',
    icon: <Percent className="h-4 w-4" />,
  },
  {
    id: 'bmi',
    label: 'BMI Calculator',
    path: '/calculators/bmi-calculator',
    icon: <Activity className="h-4 w-4" />,
  },
  {
    id: 'compound-interest',
    label: 'Compound Interest & SIP',
    path: '/calculators/compound-interest-calculator',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    id: 'car-loan',
    label: 'Car Loan EMI',
    path: '/calculators/car-loan-calculator',
    icon: <CarFront className="h-4 w-4" />,
  },
  {
    id: 'loan-payment',
    label: 'Loan Payment',
    path: '/calculators/loan-payment-calculator',
    icon: <Landmark className="h-4 w-4" />,
  },
];

const PRIMARY_LINKS: NavItem[] = [
  { id: 'guides', label: 'Guides', path: '/guides', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'savings-goal', label: 'Savings Goal', path: '/savings-goal', icon: <Target className="h-4 w-4" /> },
  { id: 'about', label: 'About', path: '/about', icon: <Info className="h-4 w-4" /> },
];

const SECTION_LABEL =
  'font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500';

const categoryCount = (id: string): number => HOME_CATEGORY_COUNTS[id] ?? 0;

/**
 * Site header.
 *
 * Desktop gets a real navigation bar with a mega menu of all twelve categories
 * (with live tool counts), instant search and utility actions. Below `lg` the
 * same content moves into a focus-trapped drawer. Every category and popular
 * tool is one click away at every breakpoint, which is the main navigation gap
 * this header closes against directory-style competitors.
 */
export const Header: React.FC<HeaderProps> = ({
  activePath,
  onOpenHistory,
  historyCount,
  isDarkMode,
  onToggleDarkMode,
  onOpenShortcuts,
}) => {
  const [megaOpen, setMegaOpen] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const currency = useCurrency();

  const megaRef = useRef<HTMLDivElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | null>(null);

  const isActive = (path: string) => {
    if (path === '/') return activePath === '/';
    if (path === '/calculators') return activePath.startsWith('/calculators');
    return activePath === path || activePath.startsWith(`${path}/`);
  };

  const clearHoverTimer = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  // Close any open surface after navigation.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [activePath]);

  // Escape closes the mega menu and returns focus to its trigger.
  useEffect(() => {
    if (!megaOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMegaOpen(false);
      megaButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!megaRef.current?.contains(event.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [megaOpen]);

  // Drawer: lock the page, trap focus, restore focus on close.
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = drawerRef.current;
    panel?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const items: HTMLElement[] = [];
      panel
        .querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        .forEach((node) => {
          const element = node as HTMLElement;
          if (element.offsetParent !== null) items.push(element);
        });
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => clearHoverTimer, []);

  const openMega = () => {
    clearHoverTimer();
    setMegaOpen(true);
  };

  const scheduleMegaClose = () => {
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const closeAll = () => {
    setMegaOpen(false);
    setMobileOpen(false);
  };

  const themeLabel = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';
  const ThemeIcon = isDarkMode ? Sun : Moon;

  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-xs focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center gap-2">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" id="brand-logo">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <Calculator className="h-4 w-4 text-white" />
            </span>
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Calculate<span className="text-emerald-600 dark:text-emerald-500">Daily</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="ml-2 hidden items-center gap-0.5 lg:flex">
            <div ref={megaRef} onMouseEnter={openMega} onMouseLeave={scheduleMegaClose}>
              <button
                ref={megaButtonRef}
                type="button"
                id="mega-menu-trigger"
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                aria-haspopup="true"
                onClick={() => setMegaOpen((open) => !open)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setMegaOpen(true);
                    window.setTimeout(() => {
                      megaRef.current?.querySelector<HTMLElement>('#mega-menu a')?.focus();
                    }, 0);
                  }
                }}
                className={`flex h-8 items-center gap-1 rounded-md px-2.5 text-sm font-medium transition-colors ${
                  megaOpen || isActive('/calculators')
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'
                }`}
              >
                <Layers className="h-4 w-4" />
                Calculators
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {megaOpen && (
                <div
                  id="mega-menu"
                  className="absolute left-4 right-4 top-full z-50 overflow-hidden rounded-b-xl border-x border-b border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="grid grid-cols-[1fr_16rem] xl:grid-cols-[1fr_18rem]">
                    <div className="p-3">
                      <p className={`px-2 pb-2 pt-1 ${SECTION_LABEL}`}>Browse by category</p>
                      <ul className="grid grid-cols-2 gap-0.5 xl:grid-cols-3">
                        {CATEGORIES.map((category) => {
                          const Icon = CATEGORY_ICONS[category.id] ?? Layers;
                          return (
                            <li key={category.id}>
                              <Link
                                to={`/categories/${category.id}`}
                                onClick={closeAll}
                                className="group flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                              >
                                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
                                <span className="min-w-0">
                                  <span className="flex items-baseline gap-1.5">
                                    <span className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                      {category.label}
                                    </span>
                                    <span className="font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-500">
                                      {categoryCount(category.id)}
                                    </span>
                                  </span>
                                  <span className="mt-0.5 block text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                                    {category.description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="border-l border-zinc-200 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
                      <p className={`px-2 pb-2 pt-1 ${SECTION_LABEL}`}>Most used</p>
                      <ul className="space-y-0.5">
                        {POPULAR.map((item) => (
                          <li key={item.id}>
                            <Link
                              to={item.path}
                              onClick={closeAll}
                              className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-white hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                            >
                              <span className="text-zinc-400 dark:text-zinc-500">{item.icon}</span>
                              <span className="truncate">{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/calculators"
                        onClick={closeAll}
                        className="mt-3 flex items-center justify-between gap-2 rounded-md bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                      >
                        All {HOME_CALCULATOR_COUNT} calculators
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        <Link
                          to="/guides"
                          onClick={closeAll}
                          className="rounded-md px-2 py-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                        >
                          Guides
                        </Link>
                        <Link
                          to="/calculators?cat=conversion"
                          onClick={closeAll}
                          className="rounded-md px-2 py-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                        >
                          Unit converters
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {PRIMARY_LINKS.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex h-8 items-center gap-1 rounded-md px-2.5 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <HeaderSearch className="hidden w-60 md:block xl:w-80" />

            <select
              id="currency-selector"
              value={currency}
              onChange={(event) => setCurrencySymbol(event.target.value)}
              title="Currency symbol"
              aria-label="Currency symbol"
              className="hidden h-8 cursor-pointer rounded-md border border-zinc-200 bg-zinc-100 px-1.5 font-mono text-xs font-bold text-zinc-700 transition-colors hover:border-emerald-500 focus:border-emerald-500 focus:outline-none sm:block dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {CURRENCY_SYMBOLS.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onOpenHistory}
              aria-label={historyCount > 0 ? `Calculation history, ${historyCount} saved` : 'Calculation history'}
              title="Calculation history (H)"
              className="relative h-8 w-8"
            >
              <History className="h-4 w-4" />
              {historyCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 font-mono text-[9px] font-bold leading-none text-white">
                  {historyCount > 99 ? '99+' : historyCount}
                </span>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onToggleDarkMode}
              aria-label={themeLabel}
              title={`${themeLabel} (T)`}
              className="h-8 w-8"
            >
              <ThemeIcon className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onOpenShortcuts}
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts (?)"
              className="hidden h-8 w-8 md:inline-flex"
            >
              <Keyboard className="h-4 w-4" />
            </Button>

            <Button
              ref={burgerRef}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="site-navigation-menu"
              className="h-8 w-8 lg:hidden"
              id="mobile-menu-btn"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer. Portalled to <body> because the header's
          backdrop-filter would otherwise become the containing block for
          position: fixed and trap the drawer inside the 56px bar. */}
      {mobileOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-zinc-950/40 backdrop-blur-sm"
            tabIndex={-1}
          />
          <div
            ref={drawerRef}
            id="site-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            className="absolute right-0 top-0 flex h-full w-[min(22rem,calc(100vw-2.5rem))] flex-col border-l border-zinc-200 bg-white shadow-2xl outline-none dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
              <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Menu
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
              <HeaderSearch inline onNavigate={() => setMobileOpen(false)} />

              <nav aria-label="Site sections" className="space-y-0.5">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                    activePath === '/'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  to="/calculators"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                    isActive('/calculators')
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  All calculators
                  <span className="ml-auto font-mono text-[10px] tabular-nums text-zinc-400">
                    {HOME_CALCULATOR_COUNT}
                  </span>
                </Link>
                {PRIMARY_LINKS.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div>
                <p className={`px-2.5 pb-2 ${SECTION_LABEL}`}>Categories</p>
                <div className="grid grid-cols-2 gap-0.5">
                  {CATEGORIES.map((category) => {
                    const Icon = CATEGORY_ICONS[category.id] ?? Layers;
                    return (
                      <Link
                        key={category.id}
                        to={`/categories/${category.id}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium leading-tight transition-colors ${
                          isActive(`/categories/${category.id}`)
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-500" />
                        <span className="min-w-0">{category.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className={`px-2.5 pb-2 ${SECTION_LABEL}`}>Most used</p>
                <div className="space-y-0.5">
                  {POPULAR.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                      <span className="text-zinc-400 dark:text-zinc-500">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onToggleDarkMode}
                  className="flex-1 justify-start gap-2"
                  aria-label={themeLabel}
                >
                  <ThemeIcon className="h-3.5 w-3.5" />
                  {isDarkMode ? 'Light mode' : 'Dark mode'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenHistory();
                  }}
                  className="flex-1 justify-start gap-2"
                  aria-label={historyCount > 0 ? `History, ${historyCount} saved` : 'History'}
                >
                  <History className="h-3.5 w-3.5" />
                  History
                  {historyCount > 0 && (
                    <span className="ml-auto rounded-full bg-emerald-600 px-1.5 font-mono text-[9px] font-bold leading-4 text-white">
                      {historyCount > 99 ? '99+' : historyCount}
                    </span>
                  )}
                </Button>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenShortcuts();
                  }}
                  className="flex-1 justify-start gap-2"
                >
                  <Keyboard className="h-3.5 w-3.5" />
                  Shortcuts
                </Button>
                <select
                  value={currency}
                  onChange={(event) => setCurrencySymbol(event.target.value)}
                  title="Currency symbol"
                  aria-label="Currency symbol"
                  className="h-8 flex-1 cursor-pointer rounded-md border border-zinc-300 bg-white px-2 font-mono text-xs font-bold text-zinc-800 focus:border-emerald-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  {CURRENCY_SYMBOLS.map((symbol) => (
                    <option key={symbol} value={symbol}>
                      {symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          </div>,
          document.body
        )}
    </header>
  );
};

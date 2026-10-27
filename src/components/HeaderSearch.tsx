import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { CornerDownLeft, Loader2, Search } from 'lucide-react';
import { navigate } from '../lib/router';
import { getCategoryById } from '../data/categories';
import { HOME_CALCULATOR_COUNT } from '../data/homeIndex.generated';
import type { CalculatorSummary } from '../types';

interface HeaderSearchProps {
  /** Rendered inside the mobile drawer, where results flow with the page. */
  inline?: boolean;
  autoFocus?: boolean;
  onNavigate?: () => void;
  className?: string;
}

interface QuickLink {
  slug: string;
  name: string;
  category: string;
}

// Instant suggestions before a query is typed. Kept here rather than imported
// from the catalogue so the header never pulls the full index into the shell.
const QUICK_LINKS: QuickLink[] = [
  { slug: 'mortgage-calculator', name: 'Mortgage / Home Loan EMI', category: 'finance' },
  { slug: 'percentage-calculator', name: 'Percentage Calculator', category: 'math' },
  { slug: 'bmi-calculator', name: 'BMI Calculator', category: 'health' },
  { slug: 'compound-interest-calculator', name: 'Compound Interest & SIP', category: 'finance' },
  { slug: 'car-loan-calculator', name: 'Car Loan EMI', category: 'finance' },
  { slug: 'tip-calculator', name: 'Tip Calculator', category: 'daily' },
];

interface ResultRow {
  slug: string;
  name: string;
  category: string;
  hint?: string;
}

const MAX_RESULTS = 7;

const categoryLabel = (id: string): string => getCategoryById(id)?.label ?? id;

/**
 * Header search: lazy-loads the catalogue index the first time it is opened, so
 * the shell bundle stays small, then filters locally as you type. Supports
 * keyboard selection and falls back to the full directory for longer queries.
 */
export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  inline = false,
  autoFocus = false,
  onNavigate,
  className,
}) => {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<CalculatorSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [shortcutHint, setShortcutHint] = useState('Ctrl K');

  const loadIndex = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setLoading(true);
    import('../data/catalogIndex')
      .then((mod) => setIndex(mod.CALCULATOR_INDEX))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, []);

  const query = value.trim().toLowerCase();

  const results = useMemo<ResultRow[]>(() => {
    if (!query) return QUICK_LINKS;
    if (!index) return [];
    const terms = query.split(/\s+/).filter(Boolean);

    const scored: { row: ResultRow; score: number }[] = [];
    for (const calc of index) {
      const name = calc.name.toLowerCase();
      const haystack = `${name} ${calc.shortDesc} ${calc.tagline ?? ''} ${(calc.keywords ?? []).join(' ')}`
        .toLowerCase();
      if (!terms.every((term) => haystack.includes(term))) continue;

      let score = 0;
      if (name === query) score += 100;
      else if (name.startsWith(query)) score += 60;
      else if (name.includes(query)) score += 30;
      if (calc.slug === query) score += 50;
      scored.push({
        row: { slug: calc.slug, name: calc.name, category: calc.category },
        score,
      });
    }

    scored.sort((a, b) => b.score - a.score || a.row.name.localeCompare(b.row.name));
    return scored.slice(0, MAX_RESULTS).map((entry) => entry.row);
  }, [index, query]);

  // Reset the highlighted row whenever the visible list changes.
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Cmd/Ctrl+K focuses the desktop search field from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      const input = inputRef.current;
      if (!input || input.offsetParent === null) return;
      event.preventDefault();
      input.focus();
      input.select();
      setOpen(true);
      loadIndex();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [loadIndex]);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform)) {
      setShortcutHint('⌘K');
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const openSearch = () => {
    setOpen(true);
    loadIndex();
  };

  const go = (slug: string) => {
    setOpen(false);
    setValue('');
    inputRef.current?.blur();
    navigate(`/calculators/${slug}`);
    onNavigate?.();
  };

  const searchEverything = (term: string) => {
    const cleaned = term.trim();
    setOpen(false);
    setValue('');
    navigate(cleaned ? `/calculators?q=${encodeURIComponent(cleaned)}` : '/calculators');
    onNavigate?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!open) {
        openSearch();
        return;
      }
      if (results.length === 0) return;
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      setActive((current) => (current + delta + results.length) % results.length);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (open && results[active]) go(results[active].slug);
      else searchEverything(value);
    }
  };

  const showPanel = open && (results.length > 0 || query.length > 0 || loading);
  const activeId = showPanel && results[active] ? `${listId}-option-${active}` : undefined;

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ''}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          id={inline ? 'mobile-calculator-search' : 'header-calculator-search'}
          type="text"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={showPanel ? `${listId}-list` : undefined}
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          aria-label="Search calculators"
          autoComplete="off"
          autoFocus={autoFocus}
          value={value}
          placeholder={`Search ${HOME_CALCULATOR_COUNT} calculators`}
          onFocus={openSearch}
          onClick={openSearch}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
            loadIndex();
          }}
          onKeyDown={handleKeyDown}
          className="h-9 w-full rounded-md border border-border bg-card pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring lg:pr-14"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground lg:flex">
          {shortcutHint}
        </kbd>
      </div>

      {showPanel && (
        <div
          className={
            inline
              ? 'mt-2 overflow-hidden rounded-lg border border-border bg-popover shadow-sm'
              : 'absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-popover shadow-lg'
          }
        >
          {!query && (
            <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Popular calculators
            </p>
          )}

          {loading && !index && query && (
            <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading calculators
            </div>
          )}

          {results.length > 0 && (
            <ul id={`${listId}-list`} role="listbox" aria-label="Calculator results" className="max-h-80 overflow-y-auto p-1">
              {results.map((row, i) => (
                <li key={row.slug} role="option" aria-selected={i === active} id={`${listId}-option-${i}`}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(row.slug)}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors ${
                      i === active ? 'bg-accent' : ''
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">{row.name}</span>
                      <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {categoryLabel(row.category)}
                      </span>
                    </span>
                    <CornerDownLeft
                      className={`h-3.5 w-3.5 shrink-0 text-muted-foreground ${i === active ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {query && !loading && results.length === 0 && (
            <p className="px-3 py-3 text-xs text-muted-foreground">
              No calculator matches “{value.trim()}”.
            </p>
          )}

          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => searchEverything(value)}
            className="flex w-full items-center justify-between gap-2 border-t border-border px-3 py-2 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <span>{query ? `See all results for “${value.trim()}”` : 'Browse the full directory'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'calculate_daily_theme';

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ isDark: false, toggle: () => {} });

function getInitialDark(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => getInitialDark());

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark } }));
    } catch {
      /* ignore */
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
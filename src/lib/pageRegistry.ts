import type { ComponentType } from 'react';
import type { Route } from './router';

/**
 * Route-level page registry.
 *
 * Every page is its own chunk. The app shell only knows how to load a page, not
 * what a page imports, so the directory index, guide prose, and calculator UI
 * stop riding along on every route.
 *
 * Prerendering is synchronous (`renderToStaticMarkup`), so it calls
 * `preloadAllPages()` before rendering. The browser preloads just the current
 * route in `main.tsx`, which keeps the first client render identical to the
 * prerendered HTML. In-app navigation to a cold route renders a skeleton for the
 * length of one chunk request.
 */
export type PageRouteName = Exclude<Route['name'], 'not-found'>;

type AnyPage = ComponentType<any>;

const LOADERS: Record<PageRouteName, () => Promise<AnyPage>> = {
  home: async () => (await import('../pages/HomePage')).HomePage,
  calculators: async () => (await import('../pages/AllCalculatorsPage')).AllCalculatorsPage,
  calculator: async () => (await import('../pages/CalculatorPage')).CalculatorPage,
  embed: async () => (await import('../pages/EmbedPage')).EmbedPage,
  category: async () => (await import('../pages/CategoryPage')).CategoryPage,
  'savings-goal': async () => (await import('../pages/SavingsGoalPage')).SavingsGoalPage,
  about: async () => (await import('../pages/AboutPage')).AboutPage,
  privacy: async () => (await import('../pages/PrivacyPage')).PrivacyPage,
  terms: async () => (await import('../pages/TermsPage')).TermsPage,
  contact: async () => (await import('../pages/ContactPage')).ContactPage,
  guides: async () => (await import('../pages/GuideListingPage')).GuideListingPage,
  guide: async () => (await import('../pages/GuideDetailPage')).GuideDetailPage,
};

const cache = new Map<PageRouteName, AnyPage>();
const pending = new Map<PageRouteName, Promise<AnyPage>>();

/**
 * Source paths for the prerenderer, which uses Vite's manifest to emit a
 * `<link rel="modulepreload">` for the current route's page chunk.
 */
export const PAGE_SOURCES: Record<PageRouteName, string> = {
  home: 'src/pages/HomePage.tsx',
  calculators: 'src/pages/AllCalculatorsPage.tsx',
  calculator: 'src/pages/CalculatorPage.tsx',
  embed: 'src/pages/EmbedPage.tsx',
  category: 'src/pages/CategoryPage.tsx',
  'savings-goal': 'src/pages/SavingsGoalPage.tsx',
  about: 'src/pages/AboutPage.tsx',
  privacy: 'src/pages/PrivacyPage.tsx',
  terms: 'src/pages/TermsPage.tsx',
  contact: 'src/pages/ContactPage.tsx',
  guides: 'src/pages/GuideListingPage.tsx',
  guide: 'src/pages/GuideDetailPage.tsx',
};

export function getPage(name: PageRouteName): AnyPage | undefined {
  return cache.get(name);
}

export function loadPage(name: PageRouteName): Promise<AnyPage> {
  const loaded = cache.get(name);
  if (loaded) return Promise.resolve(loaded);

  let request = pending.get(name);
  if (!request) {
    request = LOADERS[name]().then((page) => {
      cache.set(name, page);
      pending.delete(name);
      return page;
    });
    pending.set(name, request);
  }
  return request;
}

/** Prerender entry point: resolve every page module before rendering. */
export async function preloadAllPages(): Promise<void> {
  await Promise.all((Object.keys(LOADERS) as PageRouteName[]).map((name) => loadPage(name)));
}

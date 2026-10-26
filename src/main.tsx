import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './lib/theme';
import { RegionProvider } from './lib/region';
import { ToastProvider } from './components/ui/toast';
import { initAnalytics } from './lib/analytics';
import { parsePath } from './lib/router';
import { loadPage } from './lib/pageRegistry';
import { ensureCalculatorData } from './data/catalogRuntime';
import './index.css';

initAnalytics();

/**
 * Fetch the current route's page chunk (and any catalogue entry it needs)
 * before the first render.
 *
 * The page registry splits every route into its own chunk. Loading it here keeps
 * the first client render identical to the prerendered HTML, which is emitted
 * synchronously from Node with every module resolved.
 */
async function preloadRouteData(): Promise<void> {
  const route = parsePath(window.location.pathname);
  if (route.name === 'not-found') return;

  await loadPage(route.name);

  if (route.name === 'calculator' || route.name === 'embed') {
    const entry = await ensureCalculatorData(route.slug);
    if (entry) {
      const { preloadCalculatorComponent } = await import('./components/calculators/CalculatorRenderer');
      await preloadCalculatorComponent(entry);
    }
    return;
  }

  if (route.name === 'guide') {
    // The guide module lives in the guide page chunk, so it is already loaded.
    const { getGuideBySlug } = await import('./data/guides');
    const guide = getGuideBySlug(route.slug);
    if (guide) {
      const entries = await Promise.all(
        guide.embeddedCalculators.map((slug) => ensureCalculatorData(slug))
      );
      const { preloadCalculatorComponent } = await import('./components/calculators/CalculatorRenderer');
      await Promise.all(
        entries.filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)).map((entry) =>
          preloadCalculatorComponent(entry)
        )
      );
    }
  }
}

function mount(): void {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <RegionProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </RegionProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}

preloadRouteData().then(mount, mount);

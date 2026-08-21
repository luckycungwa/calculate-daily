import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './lib/theme';
import { RegionProvider } from './lib/region';
import { ToastProvider } from './components/ui/toast';
import { initAnalytics } from './lib/analytics';
import './index.css';

initAnalytics();

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

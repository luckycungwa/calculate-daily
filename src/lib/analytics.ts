const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined) || '';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (initialized || !GA4_ID || typeof window === 'undefined') return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, { send_page_view: false });

  sendPageView();
  window.addEventListener('popstate', sendPageView);
}

function sendPageView(): void {
  if (!window.gtag) return;
  const pageLocation = `${window.location.origin}${window.location.pathname}`;
  window.gtag('event', 'page_view', {
    page_path: window.location.pathname,
    page_title: document.title,
    page_location: pageLocation,
  });
}

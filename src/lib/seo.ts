import { useEffect } from 'react';

interface PageMetaOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  noindex?: boolean;
}

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setRobots(noindex: boolean) {
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (noindex) {
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex');
  } else if (el) {
    el.remove();
  }
}

export function usePageMeta({
  title,
  description,
  keywords,
  canonicalPath,
  noindex = false,
}: PageMetaOptions) {
  useEffect(() => {
    document.title = title
      ? `${title} | CalculateDaily`
      : 'CalculateDaily - Free Online Calculators & Unit Converters';

    if (description) {
      setMeta('description', description);
    }
    if (keywords && keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }
    setRobots(noindex);
    if (canonicalPath && !noindex) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${window.location.origin}${canonicalPath}`);
    }
  }, [title, description, canonicalPath, noindex, keywords?.join(',')]);
}
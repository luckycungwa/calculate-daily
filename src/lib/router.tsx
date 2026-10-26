import React, { useSyncExternalStore, useEffect } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'calculators'; category?: string }
  | { name: 'calculator'; slug: string }
  | { name: 'embed'; slug: string }
  | { name: 'category'; category: string }
  | { name: 'savings-goal' }
  | { name: 'about' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | { name: 'contact' }
  | { name: 'guides' }
  | { name: 'guide'; slug: string }
  | { name: 'not-found' };

export function parsePath(path: string): Route {
  if (path !== '/' && (path.endsWith('/') || path.includes('//'))) {
    return { name: 'not-found' };
  }

  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return { name: 'home' };

  if (segments[0] === 'calculators') {
    if (segments.length === 1) return { name: 'calculators' };
    if (segments.length === 2) return { name: 'calculator', slug: segments[1] };
  }

  // Embeddable calculator shell: the same tool, no site chrome, noindex, with
  // an attribution link back to the canonical page.
  if (segments[0] === 'embed' && segments.length === 2) {
    return { name: 'embed', slug: segments[1] };
  }

  if (segments[0] === 'categories' && segments.length === 2) {
    return { name: 'category', category: segments[1] };
  }

  if (segments.length === 1 && segments[0] === 'savings-goal') return { name: 'savings-goal' };
  if (segments.length === 1 && segments[0] === 'about') return { name: 'about' };
  if (segments.length === 1 && segments[0] === 'privacy') return { name: 'privacy' };
  if (segments.length === 1 && segments[0] === 'terms') return { name: 'terms' };
  if (segments.length === 1 && segments[0] === 'contact') return { name: 'contact' };

  if (segments[0] === 'guides') {
    if (segments.length === 1) return { name: 'guides' };
    if (segments.length === 2) return { name: 'guide', slug: segments[1] };
  }

  return { name: 'not-found' };
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

function getServerPath() {
  return typeof window !== 'undefined' ? window.location.pathname : '/';
}

function getServerSearch() {
  return typeof window !== 'undefined' ? window.location.search : '';
}

export function useRoute(): Route {
  const path = useSyncExternalStore(
    subscribe,
    () => (typeof window !== 'undefined' ? window.location.pathname : '/'),
    getServerPath
  );
  return parsePath(path);
}

export function useSearchParams(): URLSearchParams {
  const search = useSyncExternalStore(
    subscribe,
    () => (typeof window !== 'undefined' ? window.location.search : ''),
    getServerSearch
  );
  return new URLSearchParams(search);
}

export function navigate(path: string) {
  const target = path.split('?')[0];
  if (window.location.pathname === target) {
    const url = new URL(window.location.href);
    url.search = path.includes('?') ? path.slice(path.indexOf('?') + 1) : '';
    window.history.pushState({}, '', url.pathname + url.search);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  id?: string;
}

export const Link: React.FC<LinkProps> = ({ to, className, children, onClick, title, id }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
    onClick?.();
  };
  return (
    <a href={to} className={className} onClick={handleClick} title={title} id={id}>
      {children}
    </a>
  );
};

export function scrollToTop() {
  window.scrollTo({ top: 0 });
}

export function useEffectOnce(cb: () => void) {
  useEffect(cb, []);
}
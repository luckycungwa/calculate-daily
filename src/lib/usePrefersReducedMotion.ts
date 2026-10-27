import { useEffect, useState } from 'react';

/**
 * Tracks `prefers-reduced-motion` so animated gauges can settle instantly for
 * people who have asked the OS to reduce motion. Starts false so server-rendered
 * markup and the first client frame agree.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

import { useEffect, useState } from 'react';

/**
 * Returns true when the element is intersecting the viewport AND
 * the document is visible. Used to pause expensive animations
 * when off-screen or in a backgrounded tab.
 */
export function useActive(
  ref: React.RefObject<HTMLElement>,
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const [inView, setInView] = useState(true);
  const [docVisible, setDocVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        setInView(entries[0].isIntersecting);
      },
      {
        threshold: options.threshold ?? 0,
        rootMargin: options.rootMargin ?? '120px',
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options.threshold, options.rootMargin]);

  useEffect(() => {
    const onVis = () => setDocVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return inView && docVisible;
}

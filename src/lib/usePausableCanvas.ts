import { useEffect, useRef, useState } from 'react';

/**
 * Pauses a React Three Fiber canvas when it scrolls out of view.
 * Returns a ref for the wrapper div and the frameloop mode for the Canvas.
 */
export function usePausableCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, paused };
}
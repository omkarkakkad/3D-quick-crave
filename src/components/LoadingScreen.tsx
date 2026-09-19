import { useEffect, useRef, useState, startTransition } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const setLoaded = useStore((s) => s.setLoaded);
  const fishRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let progress = 0;
    const start = performance.now();
    const minDuration = reduce ? 300 : 2600;

    const interval = setInterval(() => {
      const elapsed = performance.now() - start;
      // ease out progress
      const t = Math.min(elapsed / minDuration, 1);
      progress = Math.round(Math.min(100, 94 * (1 - Math.pow(1 - t, 3))));
      useStore.getState().setLoadingProgress(progress);
      if (t >= 1) {
        clearInterval(interval);
        progress = 100;
        useStore.getState().setLoadingProgress(100);
        setTimeout(() => {
          setDone(true);
          startTransition(() => useStore.getState().setLoaded(true));
        }, 350);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setHidden(true), 1100);
      return () => clearTimeout(t);
    }
  }, [done]);

  const progress = useStore((s) => s.loadingProgress);
  const lang = useStore((s) => s.lang);

  if (hidden) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden grain"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #081a36 0%, #020b1a 55%, #010512 100%)',
        opacity: done ? 0 : 1,
        transition: 'opacity 1s'
      }}
      aria-hidden={done}
    >
      {/* ambient bubbles */}
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-aqua/25"
          style={{
            width: 6 + (i % 4) * 5,
            height: 6 + (i % 4) * 5,
            left: `${(i * 7.3) % 100}%`,
            bottom: '-20px',
            animation: `float-slow ${6 + (i % 5) * 2}s ease-in ${i * 0.4}s infinite`,
            animationName: 'bubbleRise'
          }}
        />
      ))}

      {/* swimming fish silhouette */}
      <div className="absolute inset-x-0 top-1/3">
        <motion.div
          ref={fishRef}
          initial={{ x: '-105vw', opacity: 1 }}
          animate={{ x: '105vw', opacity: done ? 0 : 1 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 0.4 }}
          className="relative w-16 h-8"
        >
          <svg viewBox="0 0 64 32" className="w-16 h-8 opacity-50">
            <path d="M4 16 Q20 4 44 10 Q56 14 60 16 Q56 18 44 22 Q20 28 4 16Z" fill="#7fe8dc" />
            <path d="M44 16 L60 6 L60 26 Z" fill="#35d6c4" />
            <circle cx="16" cy="14" r="2" fill="#020b1a" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="overflow-hidden mb-5">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl tracking-[0.25em] text-cream"
          >
            QUICK <span className="text-shimmer">CRAVE</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-seafoam/70 text-sm md:text-base tracking-[0.3em] uppercase"
        >
          {t['loading.text'][lang]}
        </motion.p>
      </div>

      {/* ocean ripple loading */}
      <div className="mt-12 relative flex items-center justify-center" style={{ width: 90, height: 90 }}>
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full border border-aqua/40"
            style={{ animation: `ripple 2.4s ease-out ${i * 0.8}s infinite` }}
          />
        ))}
        <div className="relative w-12 h-12">
          <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#123a5e" strokeWidth="3" />
            <circle cx="24" cy="24" r="20" fill="none" stroke="#35d6c4" strokeWidth="3" strokeLinecap="round" strokeDasharray={2 * Math.PI * 20} strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)} style={{ transition: 'stroke-dashoffset 0.12s linear' }} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-aqua-soft text-sm">{progress}%</span>
        </div>
      </div>

      <style>{`
        @keyframes bubbleRise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-75vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
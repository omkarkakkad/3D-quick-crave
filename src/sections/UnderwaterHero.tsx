import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { UnderwaterScene } from '../three/underwater/UnderwaterScene';
import { fishSpecies } from '../data/menu';
import { MagneticButton } from '../components/ui/MagneticButton';
import { GlGuard } from '../components/ui/GlGuard';
import { usePausableCanvas } from '../lib/usePausableCanvas';

export default function UnderwaterHero() {
  const ref = useRef<HTMLElement>(null);
  const { ref: canvasWrap, paused } = usePausableCanvas();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const activeFish = useStore((s) => s.activeFish);
  const setCursor = useStore((s) => s.setCursor);
  const lang = useStore((s) => s.lang);

  useEffect(() => {
    if (activeFish) setCursor('explore');
    else setCursor('default', null);
  }, [activeFish, setCursor]);

  const active = activeFish ? fishSpecies[activeFish as keyof typeof fishSpecies] : null;

  return (
    <section ref={ref} id="the-catch" className="relative h-[140vh] overflow-hidden">
      {/* sticky 3D viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" data-explore>
        <div ref={canvasWrap} className="absolute inset-0">
          <GlGuard>
            <UnderwaterScene paused={paused} />
          </GlGuard>
        </div>

        {/* vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(1,5,18,0.55) 100%)' }} />
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(1,5,18,0.6), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(0deg, #020b1a, transparent)' }} />

        {/* hero copy */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.55em' }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="text-[10px] md:text-xs text-aqua-soft uppercase tracking-[0.55em] mb-6"
          >
            {t['hero.kicker'][lang]}
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight text-cream"
            >
              {t['hero.title1'][lang]}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-seafoam via-aqua to-ocean-light text-glow">
                {t['hero.title2'][lang]}
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="max-w-xl mt-7 text-sm md:text-base text-seafoam/70 leading-relaxed"
          >
            {t['hero.desc'][lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35 }}
            className="mt-9 pointer-events-auto"
          >
            <MagneticButton variant="outline" onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}>
              {t['hero.explore'][lang]}
            </MagneticButton>
          </motion.div>

          {/* scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-seafoam/50">{t['hero.dive'][lang]}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full border border-aqua/40 flex items-start justify-center p-1.5"
            >
              <span className="w-1 h-2 rounded-full bg-aqua/70" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* meet the catch label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16 }}
          transition={{ duration: 0.45 }}
          className="absolute bottom-28 md:bottom-24 left-6 md:left-14 z-10 pointer-events-none"
        >
          {active && (
            <div className="glass rounded-2xl px-6 py-4 border-l-2" style={{ borderLeftColor: active.accent }}>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full" style={{ background: active.accent, boxShadow: `0 0 12px ${active.accent}` }} />
                <span className="text-[10px] tracking-[0.3em] uppercase text-seafoam/60">{t['hero.meet'][lang]}</span>
              </div>
              <p className="font-display text-2xl text-cream mt-1.5">{active.name}</p>
              <p className="text-sm text-seafoam/80 mt-0.5">{t[`species.${activeFish}.tagline`][lang] ?? active.tagline}</p>
            </div>
          )}
        </motion.div>

        {/* species legend */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center gap-2 md:gap-3 z-10 pointer-events-none">
          {Object.entries(fishSpecies).map(([key, s]) => (
            <div
              key={key}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] text-seafoam/50 transition-opacity"
              style={{ opacity: activeFish === key ? 1 : 0.55 }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
              {s.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
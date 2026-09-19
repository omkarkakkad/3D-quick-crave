import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

const stages = [
  { n: '01', titleKey: 'journey.01.title', bodyKey: 'journey.01.body' },
  { n: '02', titleKey: 'journey.02.title', bodyKey: 'journey.02.body' },
  { n: '03', titleKey: 'journey.03.title', bodyKey: 'journey.03.body' },
  { n: '04', titleKey: 'journey.04.title', bodyKey: 'journey.04.body' },
  { n: '05', titleKey: 'journey.05.title', bodyKey: 'journey.05.body' }
];

export default function CookingJourney() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lang = useStore((s) => s.lang);

  return (
    <section ref={ref} id="journey" className="section-anchor relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 section-bg" style={{ background: 'linear-gradient(180deg, #020b1a, #061829 30%, #020b1a)' }} />
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 15% 80%, rgba(53,214,196,0.07), transparent 50%)' }} />
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 85% 20%, rgba(255,122,69,0.06), transparent 50%)' }} />

      {/* parallax floating ingredients */}
      <motion.div
        className="absolute top-20 left-[6%] text-3xl opacity-25 pointer-events-none select-none"
        animate={{ y: [0, -20, 0], rotate: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      >
        🌶️
      </motion.div>
      <motion.div
        className="absolute bottom-24 right-[8%] text-3xl opacity-25 pointer-events-none select-none"
        animate={{ y: [0, -16, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 9 }}
      >
        🌿
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-[4%] text-2xl opacity-20 pointer-events-none select-none"
        animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ repeat: Infinity, duration: 11 }}
      >
        🥥
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle
          kicker={t['journey.kicker'][lang]}
          title={t['journey.title'][lang]}
        />

        {/* desktop timeline */}
        <div className="hidden md:block mt-20">
          <div className="relative">
            {/* track */}
            <div className="absolute top-6 left-0 right-0 h-px bg-white/10" />
            <motion.div
              className="absolute top-6 left-0 right-0 h-px origin-left bg-gradient-to-r from-aqua to-ember"
              style={{ scaleX: lineScale }}
            />
            {/* travelling fish */}
            <TravelingFish total={stages.length} />

            <div className="grid grid-cols-5 gap-6">
              {stages.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.12, duration: 0.7 }}
                  className="group"
                >
                  <div className="relative mb-8">
                    <span className="absolute top-[9px] -translate-y-1/2 left-6 w-3.5 h-3.5 rounded-full bg-abyss border-2 border-aqua/70 group-hover:border-aqua group-hover:shadow-glow transition-all" />
                  </div>
                  <span className="font-display text-5xl text-white/20">{s.n}</span>
                  <h3 className="text-base tracking-[0.15em] uppercase text-cream mt-3 font-semibold">{t[s.titleKey][lang]}</h3>
                  <p className="text-sm text-seafoam/60 mt-2 leading-relaxed">{t[s.bodyKey][lang]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* mobile vertical timeline */}
        <div className="md:hidden mt-16 relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
          {stages.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative pb-10 group"
            >
              <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-abyss border-2 border-aqua/70 group-hover:border-aqua" />
              <span className="font-display text-4xl text-white/15">{s.n}</span>
              <h3 className="text-base tracking-[0.15em] uppercase text-cream mt-1.5 font-semibold">{t[s.titleKey][lang]}</h3>
              <p className="text-sm text-seafoam/60 mt-1.5">{t[s.bodyKey][lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TravelingFish({ total }: { total: number }) {
  return (
    <motion.div
      className="absolute top-6 -translate-y-1/2 left-6 -translate-x-1/2"
      animate={{ left: ['6%', '95%'] }}
      transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      style={{ zIndex: 10 }}
    >
      <svg viewBox="0 0 32 32" className="w-5 h-5">
        <path d="M6 16 Q16 8 26 16 Q16 24 6 16Z" fill="#35d6c4" />
        <path d="M26 16 L31 12 L31 20 Z" fill="#7fe8dc" />
      </svg>
    </motion.div>
  );
}
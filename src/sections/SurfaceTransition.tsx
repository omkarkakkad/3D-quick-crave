import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

export default function SurfaceTransition() {
  const ref = useRef<HTMLElement>(null);
  const lang = useStore((s) => s.lang);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const bgDark = useTransform(scrollYProgress, [0, 0.4], ['#020b1a', '#0b2745']);
  const horizonWarm = useTransform(scrollYProgress, [0.35, 0.75], ['#0b2745', '#ffd9a3']);
  const brightTop = useTransform(scrollYProgress, [0.55, 1], ['rgba(255,217,163,0)', 'rgba(255,240,210,0.8)']);
  const surfY = useTransform(scrollYProgress, [0.35, 0.6], ['115%', '-10%']);
  const surfOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.85], [0, 1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.62, 0.85], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.65], [60, 0]);
  const dashOpacity = useTransform(scrollYProgress, [0.68, 0.8, 0.95], [0, 1, 0]);
  const dropletsOpacity = useTransform(scrollYProgress, [0.78, 0.88, 1], [0, 1, 0.2]);
  const shoreOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 0.85]);
  const shoreY = useTransform(scrollYProgress, [0.5, 0.8], [60, 0]);

  return (
    <section ref={ref} id="surface" className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* layered background */}
        <motion.div className="absolute inset-0" style={{ background: bgDark }} />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% -10%, rgba(255,190,120,0.55), transparent 55%)',
            opacity: horizonWarm
          }}
        />
        <motion.div className="absolute inset-0" style={{ background: brightTop }} />

        {/* light rays from above */}
        <motion.div
          className="absolute -top-10 inset-x-0 h-[60vh]"
          style={{ opacity: surfOpacity }}
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-24 md:w-40 h-full skew-x-[-12deg]"
              style={{
                left: `${5 + i * 11}%`,
                background: 'linear-gradient(180deg, rgba(255,250,235,0.35), rgba(255,240,210,0) 75%)',
                filter: 'blur(10px)'
              }}
            />
          ))}
        </motion.div>

        {/* water surface */}
        <motion.div className="absolute inset-x-0 top-0 h-[65%]" style={{ y: surfY, opacity: surfOpacity }}>
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fillOpacity="0.9"
              d="M0,192 C240,120 480,280 720,224 C960,168 1200,96 1440,160 L1440,0 L0,0 Z"
              fill="#9fd6e8"
            />
            <path
              fillOpacity="0.7"
              d="M0,224 C200,160 520,240 760,192 C1020,140 1280,200 1440,160 L1440,0 L0,0 Z"
              fill="#cfeef2"
            />
          </svg>
        </motion.div>

        {/* central statement */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-ember mb-6">
            {t['surface.kicker'][lang]}
          </p>
          <h2 className="font-display text-5xl md:text-8xl font-light leading-[1.02] text-coconut">
            {t['surface.title1'][lang]}
            <span className="block mt-1 text-gradient-ember">{t['surface.title2'][lang]}</span>
          </h2>
          <p className="max-w-md mt-6 text-sm md:text-base text-cream/70 leading-relaxed">
            {t['surface.desc'][lang]}
          </p>
        </motion.div>

        {/* droplets */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: dropletsOpacity }}
        >
          {[...Array(26)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + (i % 5) * 6,
                height: 4 + (i % 5) * 6,
                left: `${(i * 17) % 98}%`,
                top: `${(i * 13) % 92}%`,
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(160,220,240,0.35) 60%, transparent 75%)',
                filter: 'blur(0.4px)',
                transform: `rotate(${i * 37}deg)`,
                boxShadow: '0 4px 14px rgba(120,180,200,0.25)'
              }}
            />
          ))}
        </motion.div>

        {/* konkan shore — palms, boat, birds surfacing */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: shoreOpacity, y: shoreY }}
        >
          {/* warm shoreline haze */}
          <div className="absolute inset-x-0 bottom-0 h-[46%]" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,208,150,0.18) 60%, rgba(255,190,120,0.28))' }} />
          <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,240,210,0.7), transparent)' }} />

          {/* birds */}
          <svg viewBox="0 0 400 120" className="absolute left-[6%] top-[16%] w-40 md:w-64 opacity-70">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${i * 90} 40 Q${i * 90 + 14} ${30 - i * 4} ${i * 90 + 30} 38 Q${i * 90 + 48} ${28 - i * 5} ${i * 90 + 66} 40`} stroke="#2e1a08" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>

          {/* fishing boat */}
          <svg viewBox="0 0 320 90" className="absolute left-[8%] md:left-[14%] bottom-[46%] w-32 md:w-56 opacity-90">
            <path d="M16 74 C26 62 64 56 104 56 L176 56 C224 58 268 64 296 56 C308 52 312 44 302 40 C288 34 268 32 258 42 C252 52 224 62 200 64 C150 70 110 62 80 56 C54 52 30 60 16 74 Z" fill="#261508" />
            <path d="M96 56 L92 20 L108 20 L104 56 Z" fill="#261508" />
            <path d="M128 56 L126 30 L146 30 L144 56 Z" fill="#1c0f05" />
            <path d="M196 56 L198 26 L214 26 L210 56 Z" fill="#261508" />
            <path d="M84 82 L250 86" stroke="#261508" strokeWidth="5" strokeLinecap="round" />
          </svg>

          {/* palm silhouettes — left */}
          <svg viewBox="0 0 200 160" className="absolute -bottom-16 -left-4 hidden md:block w-[38vw] max-w-[420px]">
            <path d="M96 170 C92 130 100 96 106 62 C110 40 106 26 110 14 L124 14 C128 28 126 44 130 62 C138 100 142 138 138 170 Z" fill="#1c1006" />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M118 ${28 - i * 6} Q${76 + i * 10} ${10 + i * 8} ${52 + i * 16} ${-2 + i * 10} Q${90 + i * 6} ${14 + i * 6} ${124} ${34 - i * 6} Z`} fill="#1c1006" />
            ))}
            <path d="M118 26 Q150 8 178 0 Q150 14 124 30 Z" fill="#1c1006" />
            <path d="M120 30 Q158 24 190 34 Q150 36 120 36 Z" fill="#1c1006" />
            <circle cx="120" cy="26" r="4" fill="#120a03" />
            <circle cx="126" cy="30" r="3.4" fill="#120a03" />
          </svg>

          {/* palm silhouettes — right */}
          <svg viewBox="0 0 200 160" className="absolute -bottom-16 -right-4 hidden md:block w-[28vw] max-w-[320px] opacity-95">
            <g transform="scale(-1,1) translate(-200,0)">
              <path d="M96 170 C92 130 100 96 106 62 C110 40 106 26 110 14 L124 14 C128 28 126 44 130 62 C138 100 142 138 138 170 Z" fill="#1c1006" />
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M118 ${28 - i * 6} Q${76 + i * 10} ${10 + i * 8} ${52 + i * 16} ${-2 + i * 10} Q${90 + i * 6} ${14 + i * 6} ${124} ${34 - i * 6} Z`} fill="#1c1006" />
              ))}
              <path d="M118 26 Q150 8 178 0 Q150 14 124 30 Z" fill="#1c1006" />
              <path d="M120 30 Q158 24 190 34 Q150 36 120 36 Z" fill="#1c1006" />
              <circle cx="120" cy="26" r="4" fill="#120a03" />
              <circle cx="126" cy="30" r="3.4" fill="#120a03" />
            </g>
          </svg>

          {/* small coconut cluster bottom center */}
          <svg viewBox="0 0 120 60" className="absolute -bottom-6 left-[16%] md:left-[22%] w-28 md:w-40">
            <path d="M60 64 C56 52 62 44 64 36 C66 30 64 26 66 22 L74 22 C76 27 74 31 76 36 C80 46 78 56 76 64 Z" fill="#1c1006" />
            <path d="M68 26 Q48 20 30 26 Q52 26 70 30 Z" fill="#1c1006" />
            <path d="M70 24 Q78 16 96 14 Q80 22 72 28 Z" fill="#1c1006" />
          </svg>
        </motion.div>

        {/* sparkle streak */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: dashOpacity }}
        >
          <motion.div
            animate={{ scaleX: [0.2, 1.2], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="h-px w-72 bg-gradient-to-r from-transparent via-coconut to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
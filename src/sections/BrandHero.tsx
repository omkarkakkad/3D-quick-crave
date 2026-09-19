import { motion } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

const easing = [0.22, 1, 0.36, 1] as const;

export default function BrandHero() {
  const setMenuFilter = useStore((s) => s.setMenuFilter);
  const lang = useStore((s) => s.lang);

  return (
    <section id="brand" className="relative py-32 md:py-44 overflow-hidden grain">
      {/* warm kitchen ambience */}
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 50% 100%, #2b1408 0%, #1a0c06 38%, #060a16 78%, #020b1a 100%)' }} />
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(255,122,69,0.14), transparent 50%)' }} />
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 85% 35%, rgba(53,214,196,0.1), transparent 50%)' }} />

      {/* floating ingredients */}
      <FloatingIngredient className="top-16 left-[8%] rotate-[-12deg]" emoji="🥥" speed={7} />
      <FloatingIngredient className="top-1/3 right-[10%] rotate-[14deg]" emoji="🌶️" speed={9} />
      <FloatingIngredient className="bottom-24 left-[16%] rotate-[8deg]" emoji="🍋" speed={6} />
      <FloatingIngredient className="bottom-40 right-[20%] rotate-[-6deg]" emoji="🌿" speed={8} />
      <FloatingIngredient className="top-24 right-[28%] rotate-[20deg]" emoji="✨" speed={10} dim />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2.5 mb-10"
        >
          <span className="w-10 h-10 rounded-full border border-aqua/50 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-6 h-6">
              <path d="M6 16 Q16 8 26 16 Q16 24 6 16Z" fill="#35d6c4" />
              <path d="M22 16 L28 12 L28 20 Z" fill="#7fe8dc" />
            </svg>
          </span>
          <span className="font-display text-2xl tracking-[0.25em] text-cream">QUICK CRAVE</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: easing }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.02] text-cream"
          >
            <span className="block">{t['brand.title1'][lang]} <span className="text-gradient-aqua italic">{t['brand.title1b'][lang]}</span></span>
            <span className="block mt-2">{t['brand.title2'][lang]} <span className="text-gradient-ember italic">{t['brand.title2b'][lang]}</span></span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="max-w-xl mx-auto mt-8 text-base md:text-lg text-seafoam/75 leading-relaxed"
        >
          {t['brand.desc'][lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton onClick={() => { setMenuFilter('ALL'); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t['brand.menu'][lang]}
          </MagneticButton>
          <MagneticButton variant="outline" onClick={() => document.querySelector('#build-plate')?.scrollIntoView({ behavior: 'smooth' })}>
            {t['brand.order'][lang]}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingIngredient({
  className,
  emoji,
  speed,
  dim
}: {
  className: string;
  emoji: string;
  speed: number;
  dim?: boolean;
}) {
  return (
    <motion.div
      className={`absolute hidden md:block pointer-events-none select-none ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: speed, ease: 'easeInOut' }}
      style={{ fontSize: 34, opacity: dim ? 0.3 : 0.5, filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))' }}
    >
      {emoji}
    </motion.div>
  );
}
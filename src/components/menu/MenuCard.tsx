import { useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame } from 'lucide-react';
import type { MenuItem } from '../../data/menu';
import { useStore } from '../../store/useStore';
import { t } from '../../i18n/translations';

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const addToCart = useStore((s) => s.addToCart);
  const setCursor = useStore((s) => s.setCursor);
  const lang = useStore((s) => s.lang);

  const onMove = (e: MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-6px)`;
  };

  const reset = () => {
    const el = cardRef.current;
    if (el) el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
  };

  const isHot = item.category === "CHEF'S SPECIAL";

  const categoryLabel =
    item.category === "CHEF'S SPECIAL"
      ? t['menu.chefSpecial'][lang]
      : item.category === 'DRINKS'
        ? t['menu.drinks'][lang]
        : t['menu.mainCourse'][lang];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }}
      layout
      className="group h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onMouseEnter={() => setCursor('taste')}
        onMouseOut={() => setCursor('default')}
        data-taste
        className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a1c38] via-[#061428] to-[#030c1d] border border-white/8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-aqua/35 hover:shadow-glow will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* photo */}
        <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden shine">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061428] via-[#061428]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-aqua/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* category badge */}
          <span
            className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md border ${
              isHot
                ? 'bg-ember/20 border-ember/40 text-ember'
                : item.category === 'DRINKS'
                  ? 'bg-rose-500/15 border-rose-400/40 text-rose-200'
                  : 'bg-aqua/15 border-aqua/40 text-aqua-soft'
            }`}
          >
            {isHot && <Flame size={12} />}
            {categoryLabel}
          </span>

          {/* price chip */}
          <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-abyss/70 backdrop-blur-md border border-white/10 text-cream font-display text-2xl leading-none">
            <span className="text-sm align-top text-aqua-soft mr-0.5">₹</span>
            {item.price}
          </span>

          {/* vibes */}
          <div className="absolute bottom-3.5 left-4 flex flex-wrap gap-1.5">
            {item.vibes.map((v) => (
              <span key={v} className="px-2.5 py-1 rounded-full bg-abyss/60 backdrop-blur-sm border border-white/8 text-[10px] uppercase tracking-[0.12em] text-cream/70">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="relative p-5 md:p-6">
          <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight text-cream transition-colors duration-300 group-hover:text-aqua-soft">
            {item.name}
          </h3>

          <p className="mt-2.5 text-[15px] md:text-base text-seafoam/70 leading-relaxed">{item.description}</p>

          <button
            onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, category: item.category })}
            onMouseEnter={() => setCursor('open')}
            onMouseOut={() => setCursor('taste')}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-ember-deep to-ember text-coconut text-sm font-bold tracking-widest uppercase hover:brightness-110 hover:shadow-ember hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            <Plus size={16} className="transition-transform group-hover:rotate-90" />
            {t['card.addToPlate'][lang]}
          </button>
        </div>

        {/* bottom accent */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-aqua/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.article>
  );
}
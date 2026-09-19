import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { menu } from '../data/menu';
import { useStore, type MenuFilter } from '../store/useStore';
import { MenuCard } from '../components/menu/MenuCard';
import { SectionTitle } from '../components/ui/SectionTitle';
import { t } from '../i18n/translations';

const filters: Array<{ value: 'ALL' | "CHEF'S SPECIAL" | 'MAIN COURSE' | 'DRINKS' }> = [
  { value: 'ALL' },
  { value: "CHEF'S SPECIAL" },
  { value: 'MAIN COURSE' },
  { value: 'DRINKS' }
];

export default function CoastalMenu() {
  const filter = useStore((s) => s.menuFilter);
  const setFilter = useStore((s) => s.setMenuFilter);
  const lang = useStore((s) => s.lang);

  const items = useMemo(() => {
    if (filter === 'ALL') return menu;
    return menu.filter((m) => m.category === filter);
  }, [filter]);

  return (
    <section id="menu" className="section-anchor relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 section-bg" style={{ background: 'linear-gradient(180deg, #020b1a 0%, #051226 30%, #020b1a 100%)' }} />
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(53,214,196,0.08), transparent 50%)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          kicker={t['menu.kicker'][lang]}
          title={t['menu.title'][lang]}
        />

        {/* category filter */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-10">
          {filters.map((f) => {
            const filterLabel: Record<string, string> = {
              ALL: t['menu.all'][lang],
              "CHEF'S SPECIAL": t['menu.chefSpecial'][lang],
              'MAIN COURSE': t['menu.mainCourse'][lang],
              'DRINKS': t['menu.drinks'][lang],
            };
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as MenuFilter)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-300 border active:scale-95 ${
                  filter === f.value
                    ? 'bg-aqua/15 border-aqua/60 text-aqua-soft shadow-glow'
                    : 'border-white/10 text-cream/60 hover:border-aqua/30 hover:text-cream hover:bg-aqua/5'
                }`}
              >
                {filterLabel[f.value]}
              </button>
            );
          })}
        </div>

        {/* cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>

        <p className="text-center text-xs md:text-sm tracking-[0.3em] uppercase text-seafoam/40 mt-14">
          {t['menu.prices'][lang]}
        </p>
      </div>
    </section>
  );
}
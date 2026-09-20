import { Plus, Check, Flame, ExternalLink, Sparkles, Box } from 'lucide-react';
import { useState } from 'react';
import { menu, zomatoUrl } from '../data/menu';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';

export function CombosHighlight() {
  const combos = menu.filter((item) => item.isCombo);
  const addToCart = useStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const { tr, isMr } = useT();

  const handleAdd = (item: (typeof combos)[0]) => {
    addToCart({
      id: item.id,
      name: isMr ? item.nameMr : item.name,
      price: item.price,
      category: item.category
    });
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="combos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Container in Sweetgreen warm neutral stone */}
      <div className="rounded-[2.5rem] bg-[#F5F1E9] border border-[#E5DFD3] p-8 sm:p-12 lg:p-16 shadow-sm">
        {/* Section Title */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F0EB] text-[#2E6641] text-xs font-bold tracking-widest uppercase mb-3">
            <Box size={13} />
            <span>{tr('combos.kicker')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#12382C] font-bold tracking-tight">
            {tr('combos.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5568] mt-2 leading-relaxed">
            {tr('combos.desc')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {combos.map((combo) => {
            const isAdded = addedIds[combo.id];

            return (
              <div
                key={combo.id}
                className="group rounded-3xl bg-white border border-[#E8E2D5] p-5 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#EFE9DF] mb-4">
                    <img
                      src={combo.image}
                      alt={isMr ? combo.nameMr : combo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[#12382C] text-[10px] font-bold tracking-wider uppercase shadow-sm">
                      {tr('combos.fullFeast')}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-serif text-2xl font-bold text-[#12382C]">
                      ₹{combo.price}
                    </span>
                    <span className="text-[10px] font-bold text-[#2E6641] bg-[#E9F0EB] px-2 py-0.5 rounded-full">
                      {tr('combos.bestValue')}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#12382C] group-hover:text-[#2E6641] transition-colors mb-2">
                    {isMr ? combo.nameMr : combo.name}
                  </h3>

                  <p className="text-xs text-[#718096] leading-relaxed line-clamp-3 mb-6">
                    {isMr ? combo.descriptionMr : combo.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#F0EBE0]">
                  <button
                    onClick={() => handleAdd(combo)}
                    className={`w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-[#2E6641] text-white'
                        : 'bg-[#12382C] text-[#FAF8F5] hover:bg-[#1E4D3D]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>{tr('combos.added')}</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>{tr('combos.addBox')}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={zomatoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-full bg-[#FAF8F5] hover:bg-[#F4F0E8] border border-[#E8E2D5] text-[#12382C] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{tr('combos.orderZomato')}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

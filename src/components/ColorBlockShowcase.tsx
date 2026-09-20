import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import gsap from 'gsap';
import { useStore, SIGNATURE_FLAVORS } from '../store/useStore';
import {
  BlueDancerDoodle,
  RedMonsterDoodle,
  BotanicalLeavesFlower,
  SliceCitrusDoodle,
  HibiscusDoodle,
  ArchCloudWindow,
  BlackberryDoodle,
  RocketShipDoodle,
  SparkleStar,
  BubbleRing,
} from './ManaDoodles';
import { useT } from '../i18n/useT';

function ShowcaseColumn({
  index,
  productId,
  children,
  doodles,
  bgClassName,
  bgColor,
  borderClass,
  onClick,
  onHover,
  onLeave,
}: {
  index: number;
  productId: string;
  children: React.ReactNode;
  doodles: React.ReactNode;
  bgClassName?: string;
  bgColor?: string;
  borderClass?: string;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const doodleRefs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = colRef.current;
    const doodleContainer = doodleRefs.current;
    if (!el || !doodleContainer) return;

    const doodleEls = doodleContainer.querySelectorAll<HTMLElement>('[data-doodle]');
    if (doodleEls.length === 0) return;

    // Set initial state
    gsap.set(doodleEls, { opacity: 0, scale: 0.6, y: 30 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          gsap.to(doodleEls, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'back.out(1.6)',
            stagger: 0.12,
            delay: index * 0.08,
          });
          // Continuous gentle float after entrance
          doodleEls.forEach((d, i) => {
            gsap.to(d, {
              y: `+=${6 + i * 3}`,
              duration: 2.5 + i * 0.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.3,
            });
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={colRef}
      onClick={onClick}
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
      className={`relative p-6 sm:p-10 flex flex-col items-center justify-between cursor-pointer group overflow-hidden transition-transform duration-300 ${bgClassName || ''} ${borderClass || ''}`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {/* GSAP-animated doodle overlay */}
      <div ref={doodleRefs} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {doodles}
      </div>

      {children}
    </div>
  );
}

export function ColorBlockShowcase() {
  const navigate = useNavigate();
  const activeIndex = useStore((s) => s.activeFlavorIndex);
  const setActiveFlavorIndex = useStore((s) => s.setActiveFlavorIndex);

  const { tr, isMr } = useT();
  const setCursor = useStore((s) => s.setCursor);

  const SHOWCASE_PRODUCTS = ['surmai-fry', 'pomfret-fry', 'sol-kadi', 'kokum-sarbat'];
  const SHOWCASE_INDICES = [0, 1, 2, 3];

  const currentShowcaseIdx = SHOWCASE_INDICES.indexOf(activeIndex) >= 0 ? SHOWCASE_INDICES.indexOf(activeIndex) : 0;

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIdx = direction === 'next'
      ? (currentShowcaseIdx + 1) % SHOWCASE_PRODUCTS.length
      : (currentShowcaseIdx - 1 + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length;
    const flavorIdx = SHOWCASE_INDICES[newIdx];
    const productId = SHOWCASE_PRODUCTS[newIdx];
    setActiveFlavorIndex(flavorIdx);
    navigate(`/products/${productId}`);
  };

  const handleSelectFlavor = (index: number, productId: string) => {
    setActiveFlavorIndex(index);
    navigate(`/products/${productId}`);
  };

  const solKadi = SIGNATURE_FLAVORS[2];
  const kokum = SIGNATURE_FLAVORS[3];

  return (
    <section id="showcase" className="relative w-full overflow-hidden select-none">
      <div className="grid grid-cols-2 md:grid-cols-4 min-h-[750px] w-full">
        {/* ── COLUMN 1: Surmai Fry (Yellow) ── */}
        <ShowcaseColumn
          index={0}
          productId="surmai-fry"
          bgClassName="bg-[#FBC743]"
          borderClass="border-r border-black/5"
          onClick={() => handleSelectFlavor(0, 'surmai-fry')}
          onHover={() => setCursor('explore', isMr ? 'सुरमई फ्राय' : 'SURMAI FRY')}
          onLeave={() => setCursor('default', null)}
          doodles={
            <>
              <div data-doodle className="absolute -left-6 bottom-10 w-44 sm:w-56 opacity-80">
                <BlueDancerDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute right-2 bottom-14 w-20 sm:w-28 rotate-12 opacity-80">
                <SliceCitrusDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute right-1 top-16 w-28 sm:w-36 opacity-70">
                <RedMonsterDoodle className="w-full scale-75 rotate-180" />
              </div>
              <div data-doodle className="absolute left-1/2 -top-2 w-6 h-6">
                <SparkleStar className="w-full" />
              </div>
            </>
          }
        >
          <div className="text-center z-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#78350F] block mb-1">
              {tr('showcase.chefsSpecialTag')}
            </span>
            <h3 className="font-bubble text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111827] leading-tight">
              {isMr ? 'सुरमई फ्राय' : 'SURMAI FRY'}
            </h3>
          </div>
          <div className="relative my-6 w-44 sm:w-56 h-56 sm:h-72 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <img src="/images/surmai.jpg" alt="Surmai Fry" className="w-full h-full object-cover rounded-2xl shadow-2xl drop-shadow-2xl" />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleSelectFlavor(0, 'surmai-fry'); }}
            onPointerEnter={() => setCursor('open', `${tr('showcase.viewDishOrder')} · ${isMr ? 'सुरमई फ्राय' : 'SURMAI FRY'}`)}
            onPointerLeave={() => setCursor('explore', isMr ? 'सुरमई फ्राय' : 'SURMAI FRY')}
            className="z-10 py-3 px-6 rounded-full bg-white text-[#111827] text-xs sm:text-sm font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 group-hover:scale-105 transition-all"
          >
            <span>{tr('showcase.viewDishOrder')} · ₹399</span>
            <Plus size={14} />
          </button>
        </ShowcaseColumn>

        {/* ── COLUMN 2: Pomfret Fry (Blue) ── */}
        <ShowcaseColumn
          index={1}
          productId="pomfret-fry"
          bgClassName="bg-[#5E9CE4]"
          borderClass="border-r border-black/5"
          onClick={() => handleSelectFlavor(1, 'pomfret-fry')}
          onHover={() => setCursor('explore', isMr ? 'पापलेट फ्राय' : 'POMFRET FRY')}
          onLeave={() => setCursor('default', null)}
          doodles={
            <>
              <div data-doodle className="absolute -right-4 bottom-8 w-40 sm:w-52 opacity-80">
                <BlackberryDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute left-2 top-20 w-36 sm:w-48 opacity-70 -rotate-12">
                <HibiscusDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute left-1/3 -bottom-4 w-24 sm:w-32 opacity-75">
                <BotanicalLeavesFlower className="w-full rotate-45" />
              </div>
              <div data-doodle className="absolute right-1/4 top-12 w-5 h-5">
                <SparkleStar className="w-full" />
              </div>
            </>
          }
        >
          <div className="text-center z-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#1E3A8A] block mb-1">
              {tr('showcase.chefsSpecialTag')}
            </span>
            <h3 className="font-bubble text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111827] leading-tight">
              {isMr ? 'पापलेट फ्राय' : 'POMFRET FRY'}
            </h3>
          </div>
          <div className="relative my-6 w-44 sm:w-56 h-56 sm:h-72 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <img src="/images/pomfret-fry.jpg" alt="Pomfret Fry" className="w-full h-full object-cover rounded-2xl shadow-2xl drop-shadow-2xl" />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleSelectFlavor(1, 'pomfret-fry'); }}
            onPointerEnter={() => setCursor('open', `${tr('showcase.viewDishOrder')} · ${isMr ? 'पापलेट फ्राय' : 'POMFRET FRY'}`)}
            onPointerLeave={() => setCursor('explore', isMr ? 'पापलेट फ्राय' : 'POMFRET FRY')}
            className="z-10 py-3 px-6 rounded-full bg-white text-[#111827] text-xs sm:text-sm font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 group-hover:scale-105 transition-all"
          >
            <span>{tr('showcase.viewDishOrder')} · ₹399</span>
            <Plus size={14} />
          </button>
        </ShowcaseColumn>

        {/* ── COLUMN 3: Sol Kadi (Green) ── */}
        <ShowcaseColumn
          index={2}
          productId="sol-kadi"
          bgColor={solKadi.bgColor}
          borderClass="border-r border-black/5"
          onClick={() => handleSelectFlavor(2, 'sol-kadi')}
          onHover={() => setCursor('explore', isMr ? 'सोलकढी' : 'SOL KADI')}
          onLeave={() => setCursor('default', null)}
          doodles={
            <>
              <div data-doodle className="absolute -left-4 bottom-12 w-36 sm:w-48 opacity-75">
                <RedMonsterDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute right-1 bottom-6 w-28 sm:w-36 opacity-80">
                <SliceCitrusDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute left-1/4 top-16 w-8 h-8 opacity-50">
                <BubbleRing className="w-full" />
              </div>
              <div data-doodle className="absolute right-1/3 top-10 w-6 h-6">
                <SparkleStar className="w-full" />
              </div>
            </>
          }
        >
          <div className="text-center z-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest block mb-1" style={{ color: solKadi.darkColor }}>
              {tr('showcase.drinkTag')}
            </span>
            <h3 className="font-bubble text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111827] leading-tight">
              {isMr ? 'सोलकढी' : 'SOL KADI'}
            </h3>
          </div>
          <div className="relative my-6 w-44 sm:w-56 h-56 sm:h-72 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <img src="/images/solkadi.jpg" alt="Sol Kadi" className="w-full h-full object-cover rounded-2xl shadow-2xl drop-shadow-2xl" />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleSelectFlavor(2, 'sol-kadi'); }}
            onPointerEnter={() => setCursor('open', `${tr('showcase.viewDishOrder')} · ${isMr ? 'सोलकढी' : 'SOL KADI'}`)}
            onPointerLeave={() => setCursor('explore', isMr ? 'सोलकढी' : 'SOL KADI')}
            className="z-10 py-3 px-6 rounded-full bg-white text-[#111827] text-xs sm:text-sm font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 group-hover:scale-105 transition-all"
          >
            <span>{tr('showcase.viewDishOrder')} · ₹99</span>
            <Plus size={14} />
          </button>
        </ShowcaseColumn>

        {/* ── COLUMN 4: Kokum Sherbet (Pink/Magenta) ── */}
        <ShowcaseColumn
          index={3}
          productId="kokum-sarbat"
          bgColor={kokum.bgColor}
          onClick={() => handleSelectFlavor(3, 'kokum-sarbat')}
          onHover={() => setCursor('explore', isMr ? 'कोकम शर्बत' : 'KOKUM SARBAT')}
          onLeave={() => setCursor('default', null)}
          doodles={
            <>
              <div data-doodle className="absolute -left-4 bottom-10 w-32 sm:w-44 opacity-80">
                <HibiscusDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute right-2 top-20 w-28 sm:w-40 opacity-75">
                <ArchCloudWindow className="w-full" />
              </div>
              <div data-doodle className="absolute right-1 bottom-8 w-24 sm:w-32 rotate-[-15deg] opacity-80">
                <SliceCitrusDoodle className="w-full" />
              </div>
              <div data-doodle className="absolute left-1/3 top-14 w-8 h-8 opacity-50">
                <BubbleRing className="w-full" />
              </div>
              <div data-doodle className="absolute right-1/4 bottom-20 w-5 h-5">
                <SparkleStar className="w-full" />
              </div>
            </>
          }
        >
          <div className="text-center z-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest block mb-1" style={{ color: kokum.darkColor }}>
              {tr('showcase.drinkTag')}
            </span>
            <h3 className="font-bubble text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111827] leading-tight">
              {isMr ? 'कोकम शर्बत' : 'KOKUM SARBAT'}
            </h3>
          </div>
          <div className="relative my-6 w-44 sm:w-56 h-56 sm:h-72 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <img src="/images/kokum-drink.jpg" alt="Kokum Sherbet" className="w-full h-full object-cover rounded-2xl shadow-2xl drop-shadow-2xl" />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleSelectFlavor(3, 'kokum-sarbat'); }}
            onPointerEnter={() => setCursor('open', `${tr('showcase.viewDishOrder')} · ${isMr ? 'कोकम शर्बत' : 'KOKUM SARBAT'}`)}
            onPointerLeave={() => setCursor('explore', isMr ? 'कोकम शर्बत' : 'KOKUM SARBAT')}
            className="z-10 py-3 px-6 rounded-full bg-white text-[#111827] text-xs sm:text-sm font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 group-hover:scale-105 transition-all"
          >
            <span>{tr('showcase.viewDishOrder')} · ₹79</span>
            <Plus size={14} />
          </button>
        </ShowcaseColumn>
      </div>

      {/* Floating Circular Navigation Arrows */}
      <button
        onClick={() => handleNavigate('prev')}
        onPointerEnter={() => setCursor('open', tr('hero.prevDish'))}
        onPointerLeave={() => setCursor('default', null)}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl border border-black/10 z-20"
        aria-label={tr('hero.prevDish')}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => handleNavigate('next')}
        onPointerEnter={() => setCursor('open', tr('hero.nextDish'))}
        onPointerLeave={() => setCursor('default', null)}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl border border-black/10 z-20"
        aria-label={tr('hero.nextDish')}
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}

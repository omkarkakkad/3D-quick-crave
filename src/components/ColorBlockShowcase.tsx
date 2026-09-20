import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import {
  BlueDancerDoodle,
  RedMonsterDoodle,
  BotanicalLeavesFlower,
  SliceCitrusDoodle,
  HibiscusDoodle,
  ArchCloudWindow,
  BlackberryDoodle,
  SparkleStar,
  BubbleRing,
} from './ManaDoodles';
import { useT } from '../i18n/useT';

interface ShowcaseItem {
  id: string;
  name: string;
  nameMr: string;
  tag: string;
  tagMr: string;
  price: number;
  bgHex: string;
  darkHex: string;
  image: string;
  flavorIndex: number;
  doodles: React.ReactNode;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'surmai-fry',
    name: 'SURMAI FRY',
    nameMr: 'सुरमई फ्राय',
    tag: "CHEF'S SPECIAL",
    tagMr: 'शेफ्स स्पेशल',
    price: 399,
    bgHex: '#FBC743',
    darkHex: '#78350F',
    image: '/images/surmai.jpg',
    flavorIndex: 0,
    doodles: (
      <>
        <div data-doodle className="absolute -left-6 bottom-10 w-36 sm:w-56 opacity-80">
          <BlueDancerDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute right-2 bottom-14 w-20 sm:w-28 rotate-12 opacity-80">
          <SliceCitrusDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute right-1 top-16 w-24 sm:w-36 opacity-70">
          <RedMonsterDoodle className="w-full scale-75 rotate-180" />
        </div>
        <div data-doodle className="absolute left-1/2 -top-2 w-6 h-6">
          <SparkleStar className="w-full" />
        </div>
      </>
    ),
  },
  {
    id: 'pomfret-fry',
    name: 'POMFRET FRY',
    nameMr: 'पापलेट फ्राय',
    tag: "CHEF'S SPECIAL",
    tagMr: 'शेफ्स स्पेशल',
    price: 399,
    bgHex: '#5E9CE4',
    darkHex: '#1E3A8A',
    image: '/images/pomfret-fry.jpg',
    flavorIndex: 1,
    doodles: (
      <>
        <div data-doodle className="absolute -right-4 bottom-8 w-36 sm:w-52 opacity-80">
          <BlackberryDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute left-2 top-20 w-28 sm:w-48 opacity-70 -rotate-12">
          <HibiscusDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute left-1/3 -bottom-4 w-24 sm:w-32 opacity-75">
          <BotanicalLeavesFlower className="w-full rotate-45" />
        </div>
        <div data-doodle className="absolute right-1/4 top-12 w-5 h-5">
          <SparkleStar className="w-full" />
        </div>
      </>
    ),
  },
  {
    id: 'sol-kadi',
    name: 'SOL KADI',
    nameMr: 'सोलकढी',
    tag: 'COASTAL DRINK',
    tagMr: 'किनारपट्टी पेय',
    price: 99,
    bgHex: '#86EFAC',
    darkHex: '#166534',
    image: '/images/solkadi.jpg',
    flavorIndex: 2,
    doodles: (
      <>
        <div data-doodle className="absolute -left-4 bottom-12 w-32 sm:w-48 opacity-75">
          <RedMonsterDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute right-1 bottom-6 w-24 sm:w-36 opacity-80">
          <SliceCitrusDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute left-1/4 top-16 w-8 h-8 opacity-50">
          <BubbleRing className="w-full" />
        </div>
        <div data-doodle className="absolute right-1/3 top-10 w-6 h-6">
          <SparkleStar className="w-full" />
        </div>
      </>
    ),
  },
  {
    id: 'kokum-sarbat',
    name: 'KOKUM SARBAT',
    nameMr: 'कोकम शर्बत',
    tag: 'REFRESHING DRINK',
    tagMr: 'रिफ्रेशिंग पेय',
    price: 79,
    bgHex: '#F472B6',
    darkHex: '#9D174D',
    image: '/images/kokum-drink.jpg',
    flavorIndex: 3,
    doodles: (
      <>
        <div data-doodle className="absolute -left-4 bottom-10 w-28 sm:w-44 opacity-80">
          <HibiscusDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute right-2 top-20 w-24 sm:w-40 opacity-75">
          <ArchCloudWindow className="w-full" />
        </div>
        <div data-doodle className="absolute right-1 bottom-8 w-20 sm:w-32 rotate-[-15deg] opacity-80">
          <SliceCitrusDoodle className="w-full" />
        </div>
        <div data-doodle className="absolute left-1/3 top-14 w-8 h-8 opacity-50">
          <BubbleRing className="w-full" />
        </div>
        <div data-doodle className="absolute right-1/4 bottom-20 w-5 h-5">
          <SparkleStar className="w-full" />
        </div>
      </>
    ),
  },
];

function ShowcaseColumn({
  index,
  children,
  doodles,
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
      className={`relative p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-between cursor-pointer group overflow-hidden transition-transform duration-300 min-h-[460px] sm:min-h-[560px] lg:min-h-[750px] ${borderClass || ''}`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div ref={doodleRefs} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {doodles}
      </div>
      {children}
    </div>
  );
}

export function ColorBlockShowcase() {
  const navigate = useNavigate();
  const activeFlavorIndex = useStore((s) => s.activeFlavorIndex);
  const setActiveFlavorIndex = useStore((s) => s.setActiveFlavorIndex);

  const { tr, isMr } = useT();
  const setCursor = useStore((s) => s.setCursor);

  // Map activeFlavorIndex to showcase index (0 to 3)
  const [selectedIdx, setSelectedIdx] = useState(() => {
    const idx = SHOWCASE_ITEMS.findIndex((it) => it.flavorIndex === activeFlavorIndex);
    return idx >= 0 ? idx : 0;
  });

  // Keep selectedIdx in sync when store changes
  useEffect(() => {
    const idx = SHOWCASE_ITEMS.findIndex((it) => it.flavorIndex === activeFlavorIndex);
    if (idx >= 0 && idx !== selectedIdx) {
      setSelectedIdx(idx);
    }
  }, [activeFlavorIndex]);

  const activeItem = SHOWCASE_ITEMS[selectedIdx];

  const handleNavigate = (direction: 'prev' | 'next') => {
    const nextIndex =
      direction === 'next'
        ? (selectedIdx + 1) % SHOWCASE_ITEMS.length
        : (selectedIdx - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length;

    setSelectedIdx(nextIndex);
    setActiveFlavorIndex(SHOWCASE_ITEMS[nextIndex].flavorIndex);
  };

  const handleSelectFlavor = (flavorIdx: number, productId: string) => {
    setActiveFlavorIndex(flavorIdx);
    navigate(`/products/${productId}`);
  };

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 40) {
      handleNavigate('next');
    } else if (deltaX < -40) {
      handleNavigate('prev');
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="showcase" className="relative w-full overflow-hidden select-none">
      {/* ── MOBILE & TABLET VIEW (< 1024px): MANA-Style Interactive Card Carousel with Visible Controls ── */}
      <div
        className="lg:hidden relative w-full overflow-hidden transition-colors duration-500 py-10 sm:py-14 px-4 sm:px-8 flex flex-col items-center justify-between min-h-[500px] sm:min-h-[580px]"
        style={{ backgroundColor: activeItem.bgHex }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Animated Doodles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {activeItem.doodles}
        </div>

        {/* Dish Category Tag & Title */}
        <div className="text-center z-10 px-10">
          <span
            className="text-[11px] sm:text-xs font-black uppercase tracking-widest block mb-1 font-sans"
            style={{ color: activeItem.darkHex }}
          >
            {isMr ? activeItem.tagMr : activeItem.tag}
          </span>
          <h3 className="font-bubble text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#111827] leading-tight drop-shadow-sm">
            {isMr ? activeItem.nameMr : activeItem.name}
          </h3>
        </div>

        {/* Centered Food Image */}
        <div
          onClick={() => handleSelectFlavor(activeItem.flavorIndex, activeItem.id)}
          className="relative my-6 sm:my-8 w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center z-10 cursor-pointer active:scale-95 transition-transform"
        >
          <img
            src={activeItem.image}
            alt={isMr ? activeItem.nameMr : activeItem.name}
            className="w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl drop-shadow-2xl border-2 border-white/20"
          />
        </div>

        {/* MANA White Pill CTA Button + Indicator Dots */}
        <div className="w-full flex flex-col items-center gap-3.5 z-10 px-8">
          <button
            onClick={() => handleSelectFlavor(activeItem.flavorIndex, activeItem.id)}
            className="w-full max-w-xs py-3 sm:py-3.5 px-6 rounded-full bg-white text-[#111827] text-xs sm:text-sm font-bold font-sans shadow-xl hover:bg-gray-50 flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 border border-black/5 truncate"
          >
            <span className="truncate">{tr('showcase.discoverProduct')} · ₹{activeItem.price}</span>
            <ArrowRight size={15} className="shrink-0" />
          </button>

          {/* 4 Interactive Indicator Pills */}
          <div className="flex items-center gap-2 pt-1">
            {SHOWCASE_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedIdx(i);
                  setActiveFlavorIndex(item.flavorIndex);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === selectedIdx
                    ? 'w-7 h-2 bg-[#111827]'
                    : 'w-2 h-2 bg-black/25 hover:bg-black/40'
                }`}
                aria-label={`Select ${item.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP VIEW (>= 1024px): 4-Column Spectrum Layout Matching Reference ── */}
      <div className="hidden lg:grid grid-cols-4 min-h-[720px] w-full">
        {SHOWCASE_ITEMS.map((item, i) => {
          const isSelected = selectedIdx === i;
          return (
            <ShowcaseColumn
              key={item.id}
              index={i}
              productId={item.id}
              bgColor={item.bgHex}
              borderClass={i < SHOWCASE_ITEMS.length - 1 ? 'border-r border-black/5' : ''}
              onClick={() => {
                setSelectedIdx(i);
                setActiveFlavorIndex(item.flavorIndex);
              }}
              onHover={() => setCursor('explore', isMr ? item.nameMr : item.name)}
              onLeave={() => setCursor('default', null)}
              doodles={item.doodles}
            >
              <div className="text-center z-10">
                <span
                  className="text-[10px] sm:text-xs font-black uppercase tracking-widest block mb-1"
                  style={{ color: item.darkHex }}
                >
                  {isMr ? item.tagMr : item.tag}
                </span>
                <h3 className="font-bubble text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111827] leading-tight">
                  {isMr ? item.nameMr : item.name}
                </h3>
              </div>

              <div className="relative my-5 sm:my-6 w-44 lg:w-56 h-56 lg:h-72 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={item.image}
                  alt={isMr ? item.nameMr : item.name}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl drop-shadow-2xl"
                />
              </div>

              {/* In MANA reference, focused item has expanded 'Discover this product' pill, others have '+' */}
              {isSelected ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectFlavor(item.flavorIndex, item.id);
                  }}
                  onPointerEnter={() => setCursor('open', `${tr('showcase.discoverProduct')} · ${isMr ? item.nameMr : item.name}`)}
                  onPointerLeave={() => setCursor('explore', isMr ? item.nameMr : item.name)}
                  className="z-10 py-3 px-6 rounded-full bg-white text-[#111827] text-xs sm:text-sm font-bold shadow-xl hover:bg-gray-50 flex items-center justify-center gap-2 hover:scale-105 transition-all max-w-[90%] truncate border border-black/5"
                >
                  <span className="truncate">{tr('showcase.discoverProduct')} · ₹{item.price}</span>
                  <ArrowRight size={15} className="shrink-0" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx(i);
                    setActiveFlavorIndex(item.flavorIndex);
                  }}
                  onPointerEnter={() => setCursor('open', isMr ? item.nameMr : item.name)}
                  onPointerLeave={() => setCursor('default', null)}
                  className="z-10 w-11 h-11 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all border border-black/5"
                  aria-label={`Select ${item.name}`}
                >
                  <Plus size={18} />
                </button>
              )}
            </ShowcaseColumn>
          );
        })}
      </div>

      {/* ── FLOATING CIRCULAR NAVIGATION CONTROL BUTTONS: VISIBLE ON BOTH MOBILE & DESKTOP ── */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate('prev');
        }}
        onPointerEnter={() => setCursor('open', tr('hero.prevDish'))}
        onPointerLeave={() => setCursor('default', null)}
        className="absolute left-2.5 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-xl lg:shadow-2xl border border-black/10 z-30 transition-transform duration-150 cursor-pointer"
        aria-label={tr('hero.prevDish')}
      >
        <ChevronLeft size={22} className="sm:w-6 sm:h-6" strokeWidth={2.4} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate('next');
        }}
        onPointerEnter={() => setCursor('open', tr('hero.nextDish'))}
        onPointerLeave={() => setCursor('default', null)}
        className="absolute right-2.5 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-xl lg:shadow-2xl border border-black/10 z-30 transition-transform duration-150 cursor-pointer"
        aria-label={tr('hero.nextDish')}
      >
        <ChevronRight size={22} className="sm:w-6 sm:h-6" strokeWidth={2.4} />
      </button>
    </section>
  );
}

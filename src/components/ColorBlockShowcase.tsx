import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BlueDancerDoodle } from './ManaDoodles';
import { useT } from '../i18n/useT';

export function ColorBlockShowcase() {
  const navigate = useNavigate();
  const setActiveFlavorIndex = useStore((s) => s.setActiveFlavorIndex);
  const nextFlavor = useStore((s) => s.nextFlavor);
  const prevFlavor = useStore((s) => s.prevFlavor);

  const { tr, isMr } = useT();

  const handleSelectFlavor = (index: number, productId: string) => {
    setActiveFlavorIndex(index);
    navigate(`/products/${productId}`);
  };

  return (
    <section id="showcase" className="relative w-full overflow-hidden select-none">
      {/* 3 Full-Bleed Vertical Colored Columns (Screenshot 8) */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[750px] w-full">
        {/* COLUMN 1: Green Column (Sol Kadi) */}
        <div
          onClick={() => handleSelectFlavor(2, 'sol-kadi')}
          className="relative bg-[#74B749] p-8 sm:p-12 flex flex-col items-center justify-between cursor-pointer group overflow-hidden transition-transform duration-300"
        >
          {/* Top Title */}
          <div className="text-center z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#1E2B58] block mb-1">
              {tr('showcase.drinkTag')}
            </span>
            <h3 className="font-bubble text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111827]">
              {isMr ? 'सोलकढी' : 'SOL KADI'}
            </h3>
          </div>

          {/* Center Product Image */}
          <div className="relative my-8 w-60 sm:w-72 h-80 sm:h-96 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <img
              src="/images/solkadi.jpg"
              alt="Sol Kadi"
              className="w-4/5 h-4/5 object-cover rounded-3xl shadow-2xl drop-shadow-2xl"
            />
          </div>

          {/* Bottom Discover Pill */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectFlavor(2, 'sol-kadi');
            }}
            className="z-10 py-3.5 px-7 rounded-full bg-white text-[#111827] text-sm sm:text-base font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 group-hover:scale-105 transition-all"
          >
            <span>{tr('showcase.viewDishOrder')} · ₹99</span>
            <Plus size={16} />
          </button>
        </div>

        {/* COLUMN 2: Yellow Column (Surmai Fry - Chef's Special) */}
        <div
          onClick={() => handleSelectFlavor(0, 'surmai-fry')}
          className="relative bg-[#FBC743] p-8 sm:p-12 flex flex-col items-center justify-between cursor-pointer group overflow-hidden transition-transform duration-300 border-y md:border-y-0 md:border-x border-black/10"
        >
          {/* Background Playful Characters (Screenshot 8) */}
          <div className="absolute inset-0 pointer-events-none opacity-85 z-0 flex items-center justify-center">
            <div className="w-full max-w-[480px] -rotate-6">
              <BlueDancerDoodle className="w-full" />
            </div>
          </div>

          {/* Top Title */}
          <div className="text-center z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#78350F] block mb-1">
              {tr('showcase.chefsSpecialTag')}
            </span>
            <h3 className="font-bubble text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111827]">
              {isMr ? 'सुरमई फ्राय' : 'SURMAI FRY'}
            </h3>
          </div>

          {/* Center Product Image */}
          <div className="relative my-8 w-60 sm:w-72 h-80 sm:h-96 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <img
              src="/images/surmai.jpg"
              alt="Surmai Fry"
              className="w-4/5 h-4/5 object-cover rounded-3xl shadow-2xl drop-shadow-2xl"
            />
          </div>

          {/* Bottom Discover Pill */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectFlavor(0, 'surmai-fry');
            }}
            className="z-10 py-3.5 px-7 rounded-full bg-white text-[#111827] text-sm sm:text-base font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 group-hover:scale-105 transition-all"
          >
            <span>{tr('showcase.viewDishOrder')} · ₹399</span>
            <Plus size={16} />
          </button>
        </div>

        {/* COLUMN 3: Sky Blue Column (Pomfret Fry - Chef's Special) */}
        <div
          onClick={() => handleSelectFlavor(1, 'pomfret-fry')}
          className="relative bg-[#5E9CE4] p-8 sm:p-12 flex flex-col items-center justify-between cursor-pointer group overflow-hidden transition-transform duration-300"
        >
          {/* Top Title */}
          <div className="text-center z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#1E3A8A] block mb-1">
              {tr('showcase.chefsSpecialTag')}
            </span>
            <h3 className="font-bubble text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111827]">
              {isMr ? 'पापलेट फ्राय' : 'POMFRET FRY'}
            </h3>
          </div>

          {/* Center Product Image */}
          <div className="relative my-8 w-60 sm:w-72 h-80 sm:h-96 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <img
              src="/images/pomfret-fry.jpg"
              alt="Pomfret Fry"
              className="w-4/5 h-4/5 object-cover rounded-3xl shadow-2xl drop-shadow-2xl"
            />
          </div>

          {/* Bottom Discover Pill */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectFlavor(1, 'pomfret-fry');
            }}
            className="z-10 py-3.5 px-7 rounded-full bg-white text-[#111827] text-sm sm:text-base font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 group-hover:scale-105 transition-all"
          >
            <span>{tr('showcase.viewDishOrder')} · ₹399</span>
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Floating Circular Navigation Arrows (Screenshot 8) */}
      <button
        onClick={prevFlavor}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl border border-black/10 z-20"
        aria-label={tr('hero.prevDish')}
      >
        <ChevronLeft size={26} />
      </button>
      <button
        onClick={nextFlavor}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl border border-black/10 z-20"
        aria-label={tr('hero.nextDish')}
      >
        <ChevronRight size={26} />
      </button>
    </section>
  );
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, Check, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useStore, SIGNATURE_FLAVORS } from '../store/useStore';
import { zomatoUrl } from '../data/menu';
import { useT } from '../i18n/useT';

export function ProductDetailSection() {
  const activeIndex = useStore((s) => s.activeFlavorIndex);
  const nextFlavor = useStore((s) => s.nextFlavor);
  const prevFlavor = useStore((s) => s.prevFlavor);
  const addToCart = useStore((s) => s.addToCart);

  const { tr, isMr } = useT();

  const currentFlavor = SIGNATURE_FLAVORS[activeIndex];
  const [qty, setQty] = useState(1);
  const [portion, setPortion] = useState('Standard Portion');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: currentFlavor.id,
      name: `${isMr ? currentFlavor.nameMr : currentFlavor.name} (${portion})`,
      price: currentFlavor.price,
      category: "CHEF'S SPECIAL"
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section id="details" className="w-full bg-[#FDF9F3] text-[#1E293B] py-20 px-4 sm:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        {/* TOP SPLIT: Product Card on Left & Order Details on Right (Screenshot 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24">
          {/* Left Column: Large Square Product Card with Flavor Background */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              style={{ backgroundColor: currentFlavor.bgColor }}
              className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-xl flex items-center justify-center p-8 transition-colors duration-500"
            >
              {/* Product Visual Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={currentFlavor.image}
                  alt={isMr ? currentFlavor.nameMr : currentFlavor.name}
                  className="w-4/5 h-4/5 object-cover rounded-2xl shadow-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Circular Navigation Arrows on Product Card */}
              <button
                onClick={prevFlavor}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#1E293B] hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg transition-transform border border-black/5"
                aria-label={tr('hero.prevDish')}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextFlavor}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#1E293B] hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg transition-transform border border-black/5"
                aria-label={tr('hero.nextDish')}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Right Column: MANA Styled Product Detail Column (Screenshot 5) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Bold Display Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-bubble uppercase tracking-tight text-[#111827] mb-3">
              {isMr ? currentFlavor.nameMr : currentFlavor.name}
            </h2>

            {/* Price & Subtitle */}
            <div className="flex items-baseline gap-6 mb-6">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                ₹{currentFlavor.price}
              </span>
              <span className="text-base sm:text-lg font-medium text-gray-500">
                {isMr ? currentFlavor.subtitleMr : currentFlavor.subtitle}
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl font-normal">
              {isMr ? currentFlavor.descriptionMr : currentFlavor.description}
            </p>

            {/* Combined Portion Dropdown & Stepper Pill (Screenshot 5) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-full border border-gray-300 bg-white mb-5 overflow-hidden shadow-sm">
              {/* Portion Dropdown */}
              <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-gray-300">
                <select
                  value={portion}
                  onChange={(e) => setPortion(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3.5 pl-6 pr-10 text-sm font-bold text-[#111827] focus:outline-none cursor-pointer"
                >
                  <option value="Standard Portion">{tr('details.standardPortion')}</option>
                  <option value="Executive Feast">{tr('details.executiveFeast')}</option>
                  <option value="Family Box">{tr('details.familyBox')}</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                />
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between px-6 py-3.5 sm:w-40">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="text-base font-extrabold text-[#111827]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Full-Width Add To Cart Button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={handleAddToCart}
                style={{ backgroundColor: currentFlavor.bgColor }}
                className="flex-1 py-4 px-8 rounded-full text-[#111827] hover:brightness-95 active:scale-[0.98] font-bold text-base sm:text-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check size={20} className="text-[#111827]" />
                    <span>{tr('details.addedToOrder')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>
                      {tr('details.addToOrder')} · ₹{currentFlavor.price * qty}
                    </span>
                  </>
                )}
              </button>

              <a
                href={zomatoUrl}
                target="_blank"
                rel="noreferrer"
                className="py-4 px-6 rounded-full bg-[#E23744] hover:bg-[#CB202D] text-white font-bold text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>{tr('details.zomato')}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* 4 Line-Art Icon Badges (Screenshot 5) */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              {/* Badge 1: 100% WILD CATCH */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#111827] fill-none stroke-[2.5]">
                    <path d="M5 25 C15 15 25 15 35 25" strokeLinecap="round" />
                    <path d="M10 20 C18 12 28 12 36 20" strokeLinecap="round" opacity="0.6" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#111827] leading-tight">
                  {tr('details.badgeWildCatch')}
                </span>
              </div>

              {/* Badge 2: STONE GROUND MASALA */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#111827] fill-none stroke-[2.5]">
                    <circle cx="20" cy="14" r="5" />
                    <circle cx="26" cy="20" r="5" />
                    <circle cx="20" cy="26" r="5" />
                    <circle cx="14" cy="20" r="5" />
                    <circle cx="20" cy="20" r="2" fill="#111827" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#111827] leading-tight">
                  {tr('details.badgeStoneGround')}
                </span>
              </div>

              {/* Badge 3: CRISPY RAVA CRUST */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#111827] fill-none stroke-[2.5]">
                    <circle cx="20" cy="8" r="3" fill="#111827" />
                    <circle cx="28" cy="12" r="3" fill="#111827" />
                    <circle cx="32" cy="20" r="3" fill="#111827" />
                    <circle cx="28" cy="28" r="3" fill="#111827" />
                    <circle cx="20" cy="32" r="3" fill="#111827" />
                    <circle cx="12" cy="28" r="3" fill="#111827" />
                    <circle cx="8" cy="20" r="3" fill="#111827" />
                    <circle cx="12" cy="12" r="3" fill="#111827" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#111827] leading-tight">
                  {tr('details.badgeCrispyRava')}
                </span>
              </div>

              {/* Badge 4: ZERO PRESERVATIVES */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#111827] fill-none stroke-[2.5]">
                    <path
                      d="M20 6 C10 14 10 26 20 34 C30 26 30 14 20 6 Z"
                      strokeLinejoin="round"
                    />
                    <path d="M20 12 L20 28" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#111827] leading-tight">
                  {tr('details.badgeZeroPreservatives')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Lifestyle Imagery & Daily Value Nutrition Table (Screenshot 6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-16 border-t border-gray-200">
          {/* Left Column: Authentic Lifestyle Photography */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] relative group">
              <img
                src={currentFlavor.image}
                alt="Coastal Kitchen Preparation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-widest font-bold block text-amber-300 mb-1">
                    {tr('details.lifestyleKicker')}
                  </span>
                  <p className="text-lg font-bold">
                    {tr('details.lifestyleDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Nutrition & Sourcing Table (Screenshot 6) */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#111827] mb-6">
              {tr('details.tableTitle')}
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-sm sm:text-base">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-3 pr-4 font-bold text-[#111827]">{tr('details.tableContent')}</th>
                    <th className="py-3 px-4 font-bold text-[#111827] text-right sm:text-left">
                      {tr('details.tableAmount')}
                    </th>
                    <th className="py-3 pl-4 font-bold text-[#111827] text-right">{tr('details.tableDailyValue')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-gray-700">
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.calories')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">{currentFlavor.calories} kcal</td>
                    <td className="py-3.5 pl-4 text-right">—</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.omega3')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">{currentFlavor.omega3}</td>
                    <td className="py-3.5 pl-4 text-right font-bold text-[#111827]">14%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.protein')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">{currentFlavor.protein}</td>
                    <td className="py-3.5 pl-4 text-right font-bold text-[#111827]">56%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.carbs')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">{currentFlavor.carbs}</td>
                    <td className="py-3.5 pl-4 text-right">2%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.sodium')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">{currentFlavor.sodium}</td>
                    <td className="py-3.5 pl-4 text-right">6%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.sourcingTime')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {isMr ? currentFlavor.catchTimeMr : currentFlavor.catchTime}
                    </td>
                    <td className="py-3.5 pl-4 text-right font-bold text-[#16A34A]">{tr('details.freshDaily')}</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.preservatives')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">0 mg</td>
                    <td className="py-3.5 pl-4 text-right font-bold text-[#16A34A]">0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

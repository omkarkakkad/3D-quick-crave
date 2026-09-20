import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, Check, ShoppingBag, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { menu, type MenuItem, zomatoUrl, PHONE_1 } from '../data/menu';
import { useStore, SIGNATURE_FLAVORS } from '../store/useStore';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { ArchedBanner } from '../components/ArchedBanner';
import { ColorBlockShowcase } from '../components/ColorBlockShowcase';
import { useT } from '../i18n/useT';

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const addToCart = useStore((s) => s.addToCart);

  const { tr, isMr } = useT();

  // Find product from menu or signature flavors
  const allProducts = menu;
  const currentProduct =
    allProducts.find((p) => p.id === productId) ||
    allProducts[0]; // fallback

  const currentIndex = allProducts.findIndex((p) => p.id === currentProduct.id);

  // Derive theme colors and nutrition based on category / flavor
  const signatureMatch = SIGNATURE_FLAVORS.find(
    (f) => f.id === currentProduct.id || currentProduct.name.toLowerCase().includes(f.name.toLowerCase().split(' ')[0])
  );

  const themeColor = signatureMatch
    ? signatureMatch.bgColor
    : currentProduct.category === 'DRINKS'
    ? '#9BC57D'
    : currentProduct.category === 'MAIN COURSE'
    ? '#FF7F66'
    : currentProduct.category === "CHEF'S SPECIAL"
    ? '#F9D36A'
    : '#82BCF5';

  const [qty, setQty] = useState(1);
  const [portion, setPortion] = useState('Standard Portion');
  const [added, setAdded] = useState(false);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const goToPrev = () => {
    const prevIdx = (currentIndex - 1 + allProducts.length) % allProducts.length;
    navigate(`/products/${allProducts[prevIdx].id}`);
  };

  const goToNext = () => {
    const nextIdx = (currentIndex + 1) % allProducts.length;
    navigate(`/products/${allProducts[nextIdx].id}`);
  };

  const handleAddToCart = () => {
    addToCart({
      id: currentProduct.id,
      name: `${isMr ? currentProduct.nameMr : currentProduct.name} (${portion})`,
      price: currentProduct.price,
      category: currentProduct.category
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const displayName = isMr ? currentProduct.nameMr : currentProduct.name;
  const displayCategory = isMr ? currentProduct.categoryMr : currentProduct.category;
  const displayVibes = isMr ? currentProduct.vibesMr.join(' · ') : currentProduct.vibes.join(' · ');
  const displayDescription = isMr ? currentProduct.descriptionMr : currentProduct.description;

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#111827] font-sans selection:bg-[#1E2B58] selection:text-white">
      <Navbar />
      <CartDrawer />

      {/* Spacer for fixed navbar */}
      <div className="pt-28 sm:pt-32" />

      {/* Breadcrumb / Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E2B58] hover:text-[#E23744] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{tr('prod.back')}</span>
        </Link>
      </div>

      {/* PRODUCT HERO SPLIT SECTION (Screenshot 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Color-Matched Square Product Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              style={{ backgroundColor: themeColor }}
              className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-8 transition-colors duration-500"
            >
              {/* Product Visual Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={currentProduct.image}
                  alt={displayName}
                  className="w-4/5 h-4/5 object-cover rounded-2xl shadow-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Circular Navigation Arrows on Product Card */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg transition-transform border border-black/5 z-20"
                aria-label={tr('hero.prevDish')}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#111827] hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg transition-transform border border-black/5 z-20"
                aria-label={tr('hero.nextDish')}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Right Column: MANA Product Detail Column (Screenshot 5) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Bold Display Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-bubble uppercase tracking-tight text-[#111827] mb-3">
              {displayName}
            </h1>

            {/* Price & Subtitle */}
            <div className="flex items-baseline gap-6 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
                ₹{currentProduct.price}
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-500">
                {displayCategory} · {displayVibes}
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl font-normal">
              {displayDescription}
            </p>

            {/* Combined Portion Dropdown & Stepper Pill (Screenshot 5) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl sm:rounded-full border border-gray-300 bg-white mb-5 overflow-hidden shadow-sm">
              {/* Portion Dropdown */}
              <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-gray-300">
                <select
                  value={portion}
                  onChange={(e) => setPortion(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3.5 pl-6 pr-10 text-sm font-bold text-[#111827] focus:outline-none cursor-pointer"
                >
                  <option value="Standard Portion">{tr('prod.chefPortion')}</option>
                  <option value="Executive Feast">{tr('prod.execPlatter')}</option>
                  <option value="Family Box">{tr('prod.famBox')}</option>
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
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors font-bold"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-extrabold text-[#111827]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Full-Width Add To Cart Button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={handleAddToCart}
                style={{ backgroundColor: themeColor }}
                className="flex-1 py-3.5 sm:py-4 px-6 sm:px-8 rounded-full text-[#111827] hover:brightness-95 active:scale-[0.98] font-bold text-sm sm:text-lg shadow-md transition-all flex items-center justify-center gap-2"
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
                      {tr('details.addToOrder')} · ₹{currentProduct.price * qty}
                    </span>
                  </>
                )}
              </button>

              <a
                href={zomatoUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 sm:py-4 px-6 rounded-full bg-[#E23744] hover:bg-[#CB202D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>{tr('order.zomatoBtn')}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* 4 Line-Art Icon Badges (Screenshot 5) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/70 sm:bg-transparent">
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

              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/70 sm:bg-transparent">
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

              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/70 sm:bg-transparent">
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

              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/70 sm:bg-transparent">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg viewBox="0 0 40 40" className="w-9 h-9 stroke-[#111827] fill-none stroke-[2.5]">
                    <path d="M20 6 C10 14 10 26 20 34 C30 26 30 14 20 6 Z" strokeLinejoin="round" />
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
      </section>

      {/* DAILY VALUE & NUTRITION TABLE (Screenshot 6) */}
      <section className="w-full bg-[#FAF5EE] py-14 sm:py-20 px-4 sm:px-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Authentic Lifestyle Photography */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] relative group">
              <img
                src={currentProduct.image}
                alt={displayName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-widest font-bold block text-amber-300 mb-1">
                    {tr('prod.heritageKicker')}
                  </span>
                  <p className="text-base sm:text-lg font-bold">
                    {tr('prod.heritageDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Nutrition & Sourcing Table (Screenshot 6) */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#111827] mb-6">
              {tr('details.tableTitle')}
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs sm:text-base">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-3 pr-2 sm:pr-4 font-bold text-[#111827]">{tr('details.tableContent')}</th>
                    <th className="py-3 px-2 sm:px-4 font-bold text-[#111827] text-right sm:text-left">
                      {tr('details.tableAmount')}
                    </th>
                    <th className="py-3 pl-2 sm:pl-4 font-bold text-[#111827] text-right">
                      {tr('details.tableDailyValue')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-gray-700">
                  <tr>
                    <td className="py-3 sm:py-3.5 pr-2 sm:pr-4 font-semibold text-[#111827]">{tr('details.calories')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {signatureMatch ? signatureMatch.calories : 260} kcal
                    </td>
                    <td className="py-3.5 pl-4 text-right">—</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.omega3')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {signatureMatch ? signatureMatch.omega3 : '1.9g'}
                    </td>
                    <td className="py-3.5 pl-4 text-right font-bold text-[#111827]">14%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.protein')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {signatureMatch ? signatureMatch.protein : '26g'}
                    </td>
                    <td className="py-3.5 pl-4 text-right font-bold text-[#111827]">54%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.carbs')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {signatureMatch ? signatureMatch.carbs : '4g'}
                    </td>
                    <td className="py-3.5 pl-4 text-right">2%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.sodium')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {signatureMatch ? signatureMatch.sodium : '130mg'}
                    </td>
                    <td className="py-3.5 pl-4 text-right">5%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#111827]">{tr('details.sourcingTime')}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {isMr ? 'सकाळी ५:३० मुंबई डॉक्स' : '5:30 AM Mumbai Docks'}
                    </td>
                    <td className="py-3.5 pl-4 text-right font-bold text-[#16A34A]">{tr('details.wild')}</td>
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
      </section>

      {/* CURVED ARCHED BANNER (Screenshot 7) */}
      <ArchedBanner />

      {/* 3-COLUMN COLOR BLOCK SHOWCASE (Screenshot 8) */}
      <ColorBlockShowcase />

      <Footer />
    </div>
  );
}

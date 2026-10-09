import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Search, Plus, Check, ArrowUpRight, Flame } from 'lucide-react';
import { menu, type MenuItem, zomatoUrl } from '../data/menu';
import { useStore, type MenuFilter } from '../store/useStore';
import { useT } from '../i18n/useT';

export function MenuSection() {
  const menuFilter = useStore((s) => s.menuFilter);
  const setMenuFilter = useStore((s) => s.setMenuFilter);
  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);
  const addToCart = useStore((s) => s.addToCart);
  const setCursor = useStore((s) => s.setCursor);
  const menuItems = useStore((s) => s.menuItems);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const gridRef = useRef<HTMLDivElement>(null);

  const { tr, isMr } = useT();

  const handleAdd = (item: MenuItem) => {
    if (item.inStock === false) return;
    const effectivePrice = item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price;
    addToCart({
      id: item.id,
      name: isMr ? item.nameMr : item.name,
      price: effectivePrice,
      category: item.category
    });
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  // Filter items
  const filtered = menuItems.filter((item) => {
    if (menuFilter === "CHEF'S SPECIAL" && item.category !== "CHEF'S SPECIAL") return false;
    if (menuFilter === 'MAIN COURSE' && item.category !== 'MAIN COURSE') return false;
    if (menuFilter === 'COMBOS' && !item.isCombo) return false;
    if (menuFilter === 'DRINKS' && item.category !== 'DRINKS') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.nameMr.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.descriptionMr.toLowerCase().includes(q) ||
        item.vibes.some((v) => v.toLowerCase().includes(q)) ||
        item.vibesMr.some((v) => v.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // GSAP animation on filter/search change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [menuFilter, searchQuery]);

  const categories: { label: string; value: MenuFilter; count: number }[] = [
    { label: tr('menu.all'), value: 'ALL', count: menuItems.length },
    {
      label: tr('menu.chefSpecials'),
      value: "CHEF'S SPECIAL",
      count: menuItems.filter((m) => m.category === "CHEF'S SPECIAL").length
    },
    {
      label: tr('menu.coastalCurries'),
      value: 'MAIN COURSE',
      count: menuItems.filter((m) => m.category === 'MAIN COURSE' && !m.isCombo).length
    },
    {
      label: tr('menu.feastBoxes'),
      value: 'COMBOS',
      count: menuItems.filter((m) => m.isCombo).length
    },
    {
      label: tr('menu.drinks'),
      value: 'DRINKS',
      count: menuItems.filter((m) => m.category === 'DRINKS').length
    }
  ];

  return (
    <section id="menu" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 select-none">
      {/* MANA-style Clean Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-6 border-b border-gray-200 gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#233876] block mb-2 font-sans">
            {tr('menu.kicker')}
          </span>
          <h2 className="font-bubble text-3xl sm:text-5xl lg:text-6xl text-[#111827] font-black tracking-tight">
            {tr('menu.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-lg">
            {tr('menu.desc')}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tr('menu.searchPlaceholder')}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-gray-300 text-[#111827] placeholder:text-gray-400 text-sm focus:outline-none focus:border-[#233876] focus:ring-1 focus:ring-[#233876] transition-all shadow-sm font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-black"
            >
              {tr('menu.clear')}
            </button>
          )}
        </div>
      </div>

      {/* MANA Horizontal Rounded Category Pill Rail */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isActive = menuFilter === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setMenuFilter(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-[#1E2B58] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-[#1E293B] hover:bg-gray-50'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* MANA-style Cards Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white border border-gray-200 p-8 shadow-sm">
          <p className="text-lg text-gray-600 mb-2 font-medium">
            {tr('menu.noResults')} "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setMenuFilter('ALL');
            }}
            className="text-[#233876] font-bold text-sm underline hover:text-black"
          >
            {tr('menu.resetFilters')}
          </button>
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filtered.map((item) => {
            const isAdded = addedIds[item.id];
            const isOutOfStock = item.inStock === false;
            const hasDiscount = item.discountPrice && item.discountPrice < item.price;
            const discountPct = hasDiscount
              ? Math.round(((item.price - item.discountPrice!) / item.price) * 100)
              : 0;

            const displayName = isMr ? item.nameMr : item.name;
            const displayCategory = isMr ? item.categoryMr : item.category;
            const displayDescription = isMr ? item.descriptionMr : item.description;
            const displayVibes = isMr ? item.vibesMr : item.vibes;

            return (
              <div
                key={item.id}
                onPointerEnter={() => setCursor(item.spiceLevel === 3 ? 'taste' : 'explore', displayName)}
                onPointerLeave={() => setCursor('default', null)}
                className={`group rounded-2xl sm:rounded-3xl bg-white border border-gray-200 hover:border-gray-300 p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  isOutOfStock ? 'opacity-75' : ''
                }`}
              >
                <div>
                  {/* Photo Container */}
                  <Link
                    to={`/products/${item.id}`}
                    className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 mb-4 block cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={displayName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#111827] text-[10px] font-black tracking-wider uppercase shadow-sm">
                          {displayCategory}
                        </span>
                        {hasDiscount && (
                          <span className="px-2 py-1 rounded-full bg-[#15803D] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                            {discountPct}% OFF
                          </span>
                        )}
                      </div>

                      {item.isBestseller && (
                        <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Flame size={11} className="text-[#D97706]" />
                          <span>{tr('menu.bestseller')}</span>
                        </span>
                      )}
                    </div>

                    {/* Out of Stock Overlay */}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                        <span className="px-4 py-1.5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-widest shadow-lg">
                          {isMr ? 'विक्री समाप्त' : 'Sold Out'}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Flavor Tags & Spice Info */}
                  <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                    {displayVibes.map((v) => (
                      <span
                        key={v}
                        className="text-[10px] font-bold text-[#1E2B58] bg-[#E0EFFF] px-2.5 py-0.5 rounded-full"
                      >
                        {v}
                      </span>
                    ))}
                    {item.spiceLevel && (
                      <span className="text-[11px] ml-1" title={`Spice level: ${item.spiceLevel}/3`}>
                        {'🌶️'.repeat(item.spiceLevel)}
                      </span>
                    )}
                  </div>

                  {/* Title linked to product page */}
                  <Link to={`/products/${item.id}`} className="block">
                    <h3 className="font-bubble text-2xl text-[#111827] font-black group-hover:text-[#233876] transition-colors mb-2">
                      {displayName}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {displayDescription}
                  </p>
                </div>

                {/* Bottom Action Row (Price & MANA Pill Buttons) */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-gray-400 block leading-none mb-1">
                      {tr('menu.price')}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bubble text-2xl font-black text-[#111827]">
                        ₹{hasDiscount ? item.discountPrice : item.price}
                      </span>
                      {hasDiscount && (
                        <span className="font-mono text-xs text-gray-400 line-through">
                          ₹{item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Add to Bag Pill */}
                    <button
                      disabled={isOutOfStock}
                      onClick={() => handleAdd(item)}
                      onPointerEnter={() => !isOutOfStock && setCursor('open', `${tr('menu.add')} · ${displayName}`)}
                      onPointerLeave={() => setCursor('explore', displayName)}
                      className={`py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm ${
                        isOutOfStock
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                          : isAdded
                          ? 'bg-[#15803D] text-white'
                          : 'bg-[#1E2B58] text-white hover:bg-[#253B80]'
                      }`}
                    >
                      {isOutOfStock ? (
                        <span>{isMr ? 'विक्री समाप्त' : 'Sold Out'}</span>
                      ) : isAdded ? (
                        <>
                          <Check size={14} />
                          <span>{tr('menu.added')}</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          <span>{tr('menu.add')}</span>
                        </>
                      )}
                    </button>

                    {/* Zomato Quick Order Link */}
                    <a
                      href={zomatoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onPointerEnter={() => setCursor('open', tr('order.zomatoBtn'))}
                      onPointerLeave={() => setCursor('explore', displayName)}
                      className="p-2.5 rounded-full bg-[#E23744]/10 hover:bg-[#E23744] text-[#E23744] hover:text-white transition-colors"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

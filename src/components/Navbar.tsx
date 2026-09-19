import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, X, Phone, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { LanguageSwitch } from './LanguageSwitch';
import { PHONE_1, whatsappUrl } from '../data/menu';

const navLinks = [
  { labelKey: 'nav.catch', id: 'the-catch', icon: '🐟' },
  { labelKey: 'nav.menu', id: 'menu', icon: '🍽️' },
  { labelKey: 'nav.plate', id: 'build-plate', icon: '🥘' },
  { labelKey: 'nav.kitchen', id: 'kitchen', icon: '👨‍🍳' },
  { labelKey: 'nav.journey', id: 'journey', icon: '🚢' },
  { labelKey: 'nav.gallery', id: 'gallery', icon: '📸' },
  { labelKey: 'nav.order', id: 'order', icon: '🔥' }
];

function FishMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M6 16 Q16 8 26 16 Q16 24 6 16Z" fill="currentColor" />
      <path d="M24 16 L30 12 L30 20 Z" fill="currentColor" opacity="0.7" />
      <circle cx="14" cy="15" r="1.6" fill="#020b1a" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('the-catch');
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useStore((s) => s.cart);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const lang = useStore((s) => s.lang);
  const count = cart.reduce((a, c) => a + c.qty, 0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActiveId(vis[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.15, 0.3, 0.5] }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* scroll progress — a fine tide line with a fish riding the tip */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-[72] pointer-events-none">
        <motion.div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, rgba(255,122,69,0.25), #35d6c4 60%, #7fe8dc)',
            boxShadow: '0 0 10px rgba(53,214,196,0.45)',
          }}
        />
        <motion.span
          className="absolute -top-[5px] text-aqua/80"
          style={{ left: `calc(${progress}% - 7px)`, opacity: progress > 0.4 ? 1 : 0, transition: 'opacity 0.3s' }}
          animate={{ y: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <FishMark className="w-4 h-4 drop-shadow-[0_0_4px_rgba(53,214,196,0.8)]" />
        </motion.span>
      </div>

      <header
        className={`fixed top-[3px] inset-x-0 z-[70] transition-all duration-500 ${
          scrolled
            ? 'bg-abyss/85 backdrop-blur-2xl border-b border-white/6'
            : 'bg-gradient-to-b from-abyss/55 via-abyss/20 to-transparent border-b border-transparent'
        }`}
      >
        {/* top accent line */}
        <div
          className={`absolute top-0 inset-x-0 h-px transition-opacity duration-700 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(53,214,196,0.35), transparent)' }}
        />
        {/* bottom ornamental hairline */}
        <div
          className={`absolute bottom-0 inset-x-0 h-px transition-opacity duration-700 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(53,214,196,0.4), transparent)' }}
        />

        <nav className="max-w-[88rem] mx-auto px-5 md:px-8 lg:px-10">
          <div
            className={`flex items-center justify-between gap-6 xl:gap-8 transition-all duration-500 ${
              scrolled ? 'h-16 md:h-16' : 'h-20 md:h-[4.5rem]'
            }`}
          >
            {/* brand lockup */}
            <a href="#top" className="relative z-10 flex items-center gap-3.5 shrink-0 group">
              <span
                className={`relative rounded-full border border-aqua/30 bg-aqua/[0.06] flex items-center justify-center transition-all duration-500 group-hover:border-aqua/70 group-hover:shadow-glow ${
                  scrolled ? 'w-10 h-10' : 'w-12 h-12'
                }`}
              >
                {/* slow compass ring */}
                <span
                  className={`absolute rounded-full border border-dashed border-aqua/25 transition-transform duration-[5000ms] ease-linear group-hover:rotate-180 ${
                    scrolled ? 'inset-[3px]' : 'inset-1'
                  }`}
                />
                <FishMark className={`text-aqua transition-all duration-500 ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
              </span>

              <span className="leading-none text-left">
                <span
                  className={`font-display tracking-[0.2em] text-cream block whitespace-nowrap transition-all duration-500 ${
                    scrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'
                  }`}
                >
                  QUICK <span className="text-gradient-aqua italic">Crave</span>
                </span>
                <span
                  className={`hidden sm:flex items-center gap-1.5 uppercase tracking-[0.26em] text-seafoam/50 transition-all duration-500 ${
                    scrolled ? 'text-[8px] mt-[3px]' : 'text-[9px] mt-1'
                  }`}
                >
                  <span className="w-1 h-1 rounded-full bg-ember/70" />
                  Coastal Seafood · Est Malvan
                </span>
              </span>
            </a>

            {/* ornamental divider */}
            <div className="hidden xl:flex items-center">
              <span className="relative w-px h-9 mx-3 overflow-visible" style={{ background: 'linear-gradient(180deg, transparent, rgba(247,241,228,0.16), transparent)' }}>
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-[3px] h-[3px] rotate-45 bg-aqua/60" />
                <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-[3px] h-[3px] rotate-45 bg-aqua/60" />
              </span>
            </div>

            {/* desktop nav — numbered editorial list */}
            <div className="hidden xl:flex items-center">
              <ul className="flex items-center">
                {navLinks.map((l, i) => {
                  const active = activeId === l.id;
                  return (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        className={`group relative flex flex-col items-center px-[15px] 2xl:px-[18px] py-2 transition-colors duration-300 ${
                          active ? 'text-aqua-soft' : 'text-cream/55 hover:text-cream'
                        }`}
                      >
                        <span
                          className={`text-[8px] font-bold tracking-[0.28em] mb-[3px] transition-colors duration-300 ${
                            active ? 'text-aqua' : 'text-aqua/40 group-hover:text-aqua/80'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[12px] font-semibold tracking-[0.16em] uppercase relative z-10">
                          {t[l.labelKey][lang]}
                        </span>
                        {/* baseline rule */}
                        <span
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px rounded-full transition-all duration-400 ease-out origin-center ${
                            active
                              ? 'w-8 bg-gradient-to-r from-aqua to-aqua-soft'
                              : 'w-0 bg-aqua/40 group-hover:w-6'
                          }`}
                        />
                        {active && (
                          <motion.span
                            layoutId="nav-fish"
                            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                            className="absolute -top-2 left-1/2 -translate-x-1/2 text-aqua"
                          >
                            <FishMark className="w-3.5 h-3.5" />
                          </motion.span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* right controls */}
            <div className="relative z-10 flex items-center gap-2.5 md:gap-3">
              {/* language switch */}
              <LanguageSwitch className="hidden lg:flex" />
              {/* phone — desktop */}
              <a
                href={`tel:+91${PHONE_1}`}
                className="hidden lg:inline-flex items-center gap-2.5 pl-2.5 pr-4 py-1.5 rounded-full border border-white/12 bg-white/[0.03] text-cream/70 text-[13px] font-medium tracking-[0.06em] hover:border-aqua/35 hover:text-aqua-soft hover:bg-aqua/[0.06] transition-all duration-300 group/phone"
              >
                <span className="w-7 h-7 rounded-full bg-aqua/10 flex items-center justify-center group-hover/phone:bg-aqua/20 transition-colors">
                  <Phone size={13} className="text-aqua" />
                </span>
                <span className="hidden min-[1500px]:inline">{PHONE_1}</span>
                <span className="min-[1500px]:hidden">{t['nav.call'][lang]}</span>
              </a>

              {/* order now */}
              <a
                href="#order"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-ember-deep to-ember text-coconut text-[12px] font-bold tracking-[0.14em] uppercase hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,122,69,0.45)] hover:-translate-y-px active:scale-95 transition-all duration-300 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                {t['nav.orderNow'][lang]}
                <ChevronRight size={14} className="opacity-70" />
              </a>

              {/* cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={`relative flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-cream hover:text-aqua-soft hover:border-aqua/30 hover:bg-aqua/[0.06] transition-all duration-300 ${
                  scrolled ? 'w-11 h-11' : 'w-12 h-12'
                }`}
                aria-label="Open cart"
              >
                <ShoppingBasket size={19} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-ember text-coconut text-[10px] font-bold flex items-center justify-center shadow-[0_0_12px_rgba(255,122,69,0.5)]"
                  >
                    {count}
                  </motion.span>
                )}
              </button>

              {/* hamburger */}
              <button
                className={`xl:hidden flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-cream hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 ${
                  scrolled ? 'w-11 h-11' : 'w-12 h-12'
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <div className="flex flex-col gap-[5px] items-center justify-center w-5">
                  <span className={`block h-[1.5px] bg-cream rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? 'rotate-45 translate-y-[3.25px] w-5' : 'w-5'
                  }`} />
                  <span className={`block h-[1.5px] bg-cream rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? '-rotate-45 -translate-y-[3.25px] w-5' : 'w-3.5 ml-[-3px]'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[69] xl:hidden"
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-abyss/95 backdrop-blur-3xl" />

            {/* decorative gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-aqua/[0.06] blur-[100px]" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-ember/[0.05] blur-[120px]" />
            </div>

            <div className="relative flex flex-col h-full px-7 sm:px-10 pt-28 pb-10">
              {/* close */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 w-[52px] h-[52px] rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-cream hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              {/* nav links */}
              <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
                {navLinks.map((l, i) => {
                  const active = activeId === l.id;
                  return (
                    <motion.a
                      key={l.id}
                      href={`#${l.id}`}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setMenuOpen(false)}
                      className={`group/link relative flex items-center gap-4 py-4 sm:py-[18px] px-5 rounded-2xl transition-all duration-300 ${
                        active
                          ? 'bg-aqua/10 border border-aqua/20'
                          : 'border border-transparent hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="text-[9px] font-bold tracking-[0.25em] text-aqua/50 w-7 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-2xl w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0 group-hover/link:bg-white/[0.08] transition-colors">
                        {l.icon}
                      </span>
                      <div className="flex-1">
                        <span className={`font-display text-2xl sm:text-3xl tracking-wide block transition-colors ${
                          active ? 'text-aqua-soft' : 'text-cream/85 group-hover/link:text-cream'
                        }`}>
                          {t[l.labelKey][lang]}
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className={`transition-all duration-300 ${
                          active ? 'text-aqua-soft opacity-100' : 'text-cream/20 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1'
                        }`}
                      />
                      {active && (
                        <motion.div
                          layoutId="mobile-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-full bg-aqua"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* bottom CTA area */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-auto space-y-3"
              >
                {/* divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* language switch */}
                <LanguageSwitch className="justify-center" />

                {/* phone */}
                <a
                  href={`tel:+91${PHONE_1}`}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border border-white/12 text-cream/80 text-base font-medium tracking-[0.08em] hover:border-aqua/30 hover:text-aqua-soft hover:bg-aqua/[0.04] transition-all duration-300"
                >
                  <Phone size={18} />
                  {t['nav.call'][lang]} {PHONE_1}
                </a>

                {/* whatsapp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-base font-medium tracking-[0.08em] hover:bg-[#25D366]/25 hover:border-[#25D366]/50 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp {t['nav.orderNow'][lang]}
                </a>

                {/* order now */}
                <a
                  href="#order"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-ember-deep to-ember text-coconut text-lg font-bold tracking-widest uppercase hover:brightness-110 hover:shadow-[0_0_40px_rgba(255,122,69,0.35)] active:scale-[0.98] transition-all duration-300"
                >
                  {t['nav.orderNow'][lang]}
                  <ChevronRight size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
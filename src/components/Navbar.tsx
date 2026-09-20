import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, ChevronDown, User, X, Menu, ArrowUpRight, Globe, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PHONE_1, zomatoUrl } from '../data/menu';
import { useT } from '../i18n/useT';

export function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 30);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cart = useStore((s) => s.cart);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const setCursor = useStore((s) => s.setCursor);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const { tr, lang, setLang, isMr } = useT();

  const whatsappMessage = isMr
    ? encodeURIComponent('नमस्कार QUICK CRAVE! मला अस्सल मालवणी जेवणाची ऑर्डर करायची आहे.')
    : encodeURIComponent("Hi QUICK CRAVE! I'd like to place an order for fresh coastal food.");
  const whatsappUrl = `https://wa.me/91${PHONE_1}?text=${whatsappMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 select-none">
      {/* MANA Royal Blue Announcement Top Bar */}
      {announcementVisible && (
        <div className="bg-[#233876] text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase py-2 px-4 flex items-center justify-between transition-all duration-300">
          <div className="flex-1 text-center font-sans truncate px-2">
            {tr('nav.announcement')}
          </div>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="text-white/80 hover:text-white p-0.5 rounded transition-colors ml-2"
            aria-label="Close announcement"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Header Container */}
      <header
        className={`w-full transition-all duration-300 px-3 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        {/* Left: Playful MANA-style Chunky White/Dark Logo */}
        <Link to="/" className="flex items-center gap-2 group focus:outline-none">
          <div className="font-bubble font-black text-xl sm:text-2xl lg:text-3xl tracking-tight flex items-center drop-shadow-sm">
            <span className="text-[#1E2B58]">QUICK</span>
            <span className="ml-1 -rotate-2 text-[#E05A36]">
              CRAVE
            </span>
          </div>
        </Link>

        {/* Right Navigation: White Pill Buttons (MANA Signature Style) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Shop / Menu Pill */}
          <div className="relative group hidden md:block">
            <a
              href="#menu"
              onPointerEnter={() => setCursor('explore', tr('nav.shop'))}
              onPointerLeave={() => setCursor('default', null)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-[#1E293B] hover:bg-gray-50 text-xs sm:text-sm font-bold tracking-wide shadow-sm transition-all duration-200 border border-black/5 active:scale-95"
            >
              <span>{tr('nav.shop')}</span>
              <ChevronDown size={14} className="text-gray-500 group-hover:rotate-180 transition-transform duration-200" />
            </a>
          </div>

          {/* Learn / Story Pill */}
          <a
            href="#story"
            onPointerEnter={() => setCursor('explore', tr('nav.learn'))}
            onPointerLeave={() => setCursor('default', null)}
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-[#1E293B] hover:bg-gray-50 text-xs sm:text-sm font-bold tracking-wide shadow-sm transition-all duration-200 border border-black/5 active:scale-95"
          >
            <span>{tr('nav.learn')}</span>
            <ChevronDown size={14} className="text-gray-500" />
          </a>

          {/* Feast Boxes Pill linking to dedicated Feast page */}
          <Link
            to="/products/pomfret-feast"
            onPointerEnter={() => setCursor('explore', tr('nav.feastBoxes'))}
            onPointerLeave={() => setCursor('default', null)}
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-white text-[#1E293B] hover:bg-gray-50 text-xs sm:text-sm font-bold tracking-wide shadow-sm transition-all duration-200 border border-black/5 active:scale-95"
          >
            <span>{tr('nav.feastBoxes')}</span>
          </Link>

          {/* Phone Call Pill */}
          <a
            href={`tel:+91${PHONE_1}`}
            onPointerEnter={() => setCursor('open', `Call ${PHONE_1}`)}
            onPointerLeave={() => setCursor('default', null)}
            className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-[#1E293B] hover:bg-gray-50 text-xs font-bold shadow-sm border border-black/5 transition-all"
            title={`${tr('nav.callKitchen')}: ${PHONE_1}`}
          >
            <Phone size={13} className="text-[#233876]" />
            <span>{PHONE_1}</span>
          </a>

          {/* Dual Language Switcher Pill (EN | MR) - Always Accessible */}
          <button
            onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
            onPointerEnter={() => setCursor('open', lang === 'en' ? 'Switch to मराठी' : 'Switch to English')}
            onPointerLeave={() => setCursor('default', null)}
            className="inline-flex items-center gap-0.5 sm:gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-white text-[#1E293B] hover:bg-gray-50 text-[11px] sm:text-xs font-black tracking-wider shadow-sm border border-black/5 transition-all active:scale-95"
            title={lang === 'en' ? 'मराठी मध्ये बदला (Switch to Marathi)' : 'Switch to English'}
            aria-label="Toggle language between English and Marathi"
          >
            <span
              className={`px-1.5 py-0.5 sm:px-2 rounded-full transition-all ${
                lang === 'en' ? 'bg-[#1E2B58] text-white shadow-xs' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              EN
            </span>
            <span className="text-gray-300 text-[10px]">/</span>
            <span
              className={`px-1.5 py-0.5 sm:px-2 rounded-full transition-all ${
                lang === 'mr' ? 'bg-[#E05A36] text-white shadow-xs' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              MR
            </span>
          </button>

          {/* Zomato Express Link Pill */}
          <a
            href={zomatoUrl}
            target="_blank"
            rel="noreferrer"
            onPointerEnter={() => setCursor('open', tr('nav.orderZomato'))}
            onPointerLeave={() => setCursor('default', null)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#E23744] hover:bg-[#CB202D] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            <span>{tr('nav.orderZomato')}</span>
            <ArrowUpRight size={13} />
          </a>

          {/* User Profile Pill Icon - Hidden on small mobile to give room to Logo & Cart */}
          <a
            href="#about"
            className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#1E293B] hover:bg-gray-50 items-center justify-center shadow-sm border border-black/5 transition-all active:scale-95"
            aria-label="About Quick Crave"
          >
            <User size={16} />
          </a>

          {/* Shopping Bag Pill Icon with Counter Badge */}
          <button
            onClick={() => setCartOpen(true)}
            onPointerEnter={() => setCursor('open', tr('nav.viewCart'))}
            onPointerLeave={() => setCursor('default', null)}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#1E293B] hover:bg-gray-50 flex items-center justify-center shadow-sm border border-black/5 transition-all active:scale-95"
            aria-label={tr('nav.viewCart')}
          >
            <ShoppingBag size={16} />
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E05A36] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {totalQty}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#1E293B] flex items-center justify-center shadow-sm border border-black/5 active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-gray-200 px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 font-sans font-bold text-base text-[#1E293B]">
            {/* Mobile Language Switcher Row */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} />
                <span>भाषा / Language</span>
              </span>
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-full text-xs">
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full font-extrabold transition-all ${
                    lang === 'en' ? 'bg-[#1E2B58] text-white' : 'text-gray-500'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang('mr')}
                  className={`px-3 py-1 rounded-full font-extrabold transition-all ${
                    lang === 'mr' ? 'bg-[#E05A36] text-white' : 'text-gray-500'
                  }`}
                >
                  मराठी (MR)
                </button>
              </div>
            </div>

            <a
              href="#top"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#233876] transition-colors"
            >
              {tr('nav.featured')}
            </a>
            <a
              href="#details"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#233876] transition-colors"
            >
              {tr('nav.nutrition')}
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#233876] transition-colors"
            >
              {tr('nav.spectrum')}
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#233876] transition-colors"
            >
              {tr('nav.menu')}
            </a>
            <Link
              to="/products/pomfret-feast"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#233876] transition-colors"
            >
              {tr('nav.feastBoxes')}
            </Link>
            {/* Mobile Quick Action Buttons: Quick Dial & WhatsApp */}
            <div className="pt-2 flex flex-col gap-2.5 border-t border-gray-100">
              {/* Quick Dial Card */}
              <a
                href={`tel:+91${PHONE_1}`}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] active:scale-98 transition-all"
                aria-label={tr('mobile.quickDial')}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone size={14} className="fill-current" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black">{tr('mobile.quickDial')}</div>
                    <div className="text-[11px] font-semibold text-gray-500 font-mono">+91 {PHONE_1}</div>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#16A34A] text-white tracking-wide uppercase">
                  {tr('mobile.call')}
                </span>
              </a>

              {/* WhatsApp Direct Chat Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] active:scale-98 transition-all"
                aria-label={tr('mobile.chatWhatsApp')}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle size={15} className="fill-current" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black">{tr('mobile.chatWhatsApp')}</div>
                    <div className="text-[11px] font-medium text-gray-500">
                      {isMr ? 'थेट व्हॉट्सॲपवर ऑर्डर द्या' : 'Instant orders & kitchen queries'}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-[#059669]" />
              </a>

              {/* Zomato Delivery Button */}
              <a
                href={zomatoUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-2xl bg-[#E23744] text-white flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-extrabold active:scale-98 transition-all shadow-md"
              >
                <span>{tr('order.zomatoBtn')}</span>
                <ArrowUpRight size={14} />
              </a>

              {/* Kitchen info note */}
              <div className="pt-1 text-center text-[10px] text-gray-400 font-medium leading-relaxed">
                {tr('mobile.kitchenHours')} · {tr('mobile.freshDockCatch')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
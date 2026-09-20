import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PHONE_1 } from '../data/menu';
import { useT } from '../i18n/useT';

export function MobileActionDock() {
  const [minimized, setMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cart = useStore((s) => s.cart);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const { tr, isMr } = useT();

  // Show dock only after user scrolls past the top 3D hero area
  // This leaves the 3D model & hero bottom controls 100% clean and unobstructed on initial view!
  useEffect(() => {
    const handleScroll = () => {
      // Appear when scrolled past the hero top viewport (~160px)
      setIsVisible(window.scrollY > 160);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMessage = isMr
    ? encodeURIComponent('नमस्कार QUICK CRAVE! मला अस्सल मालवणी जेवणाची ऑर्डर करायची आहे.')
    : encodeURIComponent("Hi QUICK CRAVE! I'd like to place an order for fresh coastal food.");

  const whatsappUrl = `https://wa.me/91${PHONE_1}?text=${whatsappMessage}`;
  const callUrl = `tel:+91${PHONE_1}`;

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile quick actions"
      /* Anchored in the BOTTOM-RIGHT corner — NEVER covers centered showcase/hero controls! */
      className="md:hidden fixed bottom-4 right-3 sm:right-5 z-40 select-none pointer-events-auto transition-all duration-300 ease-out"
    >
      {minimized ? (
        /* Minimized circular FAB trigger in the bottom-right corner */
        <button
          onClick={() => setMinimized(false)}
          className="w-12 h-12 rounded-full bg-[#1E2B58]/95 backdrop-blur-xl text-white flex items-center justify-center shadow-2xl border border-white/20 active:scale-90 transition-transform"
          aria-label="Open quick actions"
          title="Open Quick Dial & WhatsApp"
        >
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] absolute -top-1 -right-1 animate-pulse" />
            <Phone size={18} />
          </div>
        </button>
      ) : (
        /* Compact Corner Capsule Dock: Call + WhatsApp + Cart + Minimize Toggle */
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#1E2B58]/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/40">
          {/* Quick Call Button */}
          <a
            href={callUrl}
            className="w-9 h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md active:scale-90 hover:brightness-105 transition-all"
            title={`${tr('mobile.quickDial')}: ${PHONE_1}`}
            aria-label={tr('mobile.quickDial')}
          >
            <Phone size={15} className="fill-current" />
          </a>

          {/* Direct WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md active:scale-90 hover:brightness-105 transition-all"
            title={tr('mobile.chatWhatsApp')}
            aria-label={tr('mobile.chatWhatsApp')}
          >
            <MessageCircle size={16} className="fill-current" />
          </a>

          {/* Quick Cart Pill (if items in cart) */}
          <button
            onClick={() => setCartOpen(true)}
            className={`h-9 px-2.5 rounded-full flex items-center gap-1 text-xs font-black transition-all active:scale-90 ${
              totalQty > 0
                ? 'bg-[#E05A36] text-white shadow-md'
                : 'bg-white/15 text-white/80 hover:bg-white/25'
            }`}
            title={tr('cart.title')}
            aria-label={tr('cart.title')}
          >
            <ShoppingBag size={14} />
            {totalQty > 0 && <span className="text-[11px] font-bold">{totalQty}</span>}
          </button>

          {/* Minimize / Dock Button */}
          <button
            onClick={() => setMinimized(true)}
            className="w-7 h-7 rounded-full text-white/60 hover:text-white flex items-center justify-center transition-colors"
            title="Minimize"
            aria-label="Minimize dock"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      )}
    </aside>
  );
}

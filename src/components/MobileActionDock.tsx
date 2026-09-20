import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ShoppingBag, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PHONE_1, zomatoUrl } from '../data/menu';
import { useT } from '../i18n/useT';

export function MobileActionDock() {
  const [minimized, setMinimized] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const cart = useStore((s) => s.cart);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const { tr, isMr } = useT();

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMessage = isMr
    ? encodeURIComponent('नमस्कार QUICK CRAVE! मला अस्सल मालवणी जेवणाची ऑर्डर करायची आहे.')
    : encodeURIComponent("Hi QUICK CRAVE! I'd like to place an order for fresh coastal food.");

  const whatsappUrl = `https://wa.me/91${PHONE_1}?text=${whatsappMessage}`;
  const callUrl = `tel:+91${PHONE_1}`;

  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 max-w-sm mx-auto select-none pointer-events-auto transition-all duration-300 ease-out"
    >
      {minimized ? (
        /* Minimized quick trigger pill */
        <div className="flex justify-end">
          <button
            onClick={() => setMinimized(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1E2B58]/95 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-white/20 active:scale-95 transition-all"
            aria-label="Expand mobile quick actions"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>{isMr ? 'क्विक ॲक्शन' : 'Quick Actions'}</span>
            <ChevronUp size={14} />
          </button>
        </div>
      ) : (
        /* Expanded Floating Capsule Dock */
        <div className="bg-[#1E2B58]/95 backdrop-blur-xl text-white shadow-2xl rounded-full p-1.5 border border-white/20 flex items-center justify-between gap-1 shadow-black/30">
          {/* Quick Dial Button */}
          <a
            href={callUrl}
            className="flex-1 py-2 px-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center gap-1.5 transition-all text-xs font-bold text-white group"
            title={`${tr('mobile.quickDial')}: ${PHONE_1}`}
            aria-label={tr('mobile.quickDial')}
          >
            <span className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Phone size={11} className="fill-current" />
            </span>
            <span className="truncate">{tr('mobile.call')}</span>
          </a>

          {/* Open WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 px-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center gap-1.5 transition-all text-xs font-bold text-white group"
            title={tr('mobile.chatWhatsApp')}
            aria-label={tr('mobile.chatWhatsApp')}
          >
            <span className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MessageCircle size={12} className="fill-current" />
            </span>
            <span className="truncate">{tr('mobile.whatsapp')}</span>
          </a>

          {/* Cart & Quick Order Pill */}
          <button
            onClick={() => setCartOpen(true)}
            className={`py-2 px-3 rounded-full active:scale-95 flex items-center justify-center gap-1.5 transition-all text-xs font-black shrink-0 ${
              totalQty > 0
                ? 'bg-[#E05A36] text-white shadow-md hover:bg-[#D04A26]'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            aria-label={tr('cart.title')}
          >
            <ShoppingBag size={13} />
            {totalQty > 0 ? (
              <span>
                {totalQty} · ₹{totalPrice}
              </span>
            ) : (
              <span>{tr('mobile.cart')}</span>
            )}
          </button>

          {/* Zomato Fast Delivery Link */}
          <a
            href={zomatoUrl}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#E23744] hover:bg-[#CB202D] text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-all"
            title="Zomato Express"
            aria-label="Order on Zomato"
          >
            <ArrowUpRight size={14} strokeWidth={2.4} />
          </a>

          {/* Minimize Button */}
          <button
            onClick={() => setMinimized(true)}
            className="w-6 h-6 rounded-full hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center shrink-0 transition-colors"
            title="Minimize dock"
            aria-label="Minimize actions dock"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      )}
    </aside>
  );
}

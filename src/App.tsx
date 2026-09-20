import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Phone } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { GsapLoader } from './components/GsapLoader';
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { PHONE_1, zomatoUrl } from './data/menu';
import { useStore } from './store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const setCursor = useStore((s) => s.setCursor);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const onScroll = () => {
      if (window.scrollY > 450) {
        setShowFloatingPill(true);
      } else {
        setShowFloatingPill(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP animation for floating order pill
  useEffect(() => {
    if (pillRef.current) {
      if (showFloatingPill) {
        gsap.to(pillRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power3.out'
        });
      } else {
        gsap.to(pillRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.9,
          duration: 0.25,
          ease: 'power3.in'
        });
      }
    }
  }, [showFloatingPill]);

  return (
    <BrowserRouter>
      <div id="top" className="min-h-screen bg-[#FDF9F3] text-[#111827] font-sans selection:bg-[#1E2B58] selection:text-white overflow-x-clip">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* GSAP Preloader Animation */}
        {showLoader && <GsapLoader onComplete={() => setShowLoader(false)} />}

        <Navbar />
        <CartDrawer />

        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Individual Product Pages (MANA Yerba Maté Reference Style) */}
          <Route path="/products/:productId" element={<ProductPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Floating Sticky Quick Order Pill (GSAP Animated) */}
        <div
          ref={pillRef}
          className="fixed bottom-4 sm:bottom-6 right-3 sm:right-8 z-40 flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl opacity-0 translate-y-10 pointer-events-auto"
        >
          <a
            href={zomatoUrl}
            target="_blank"
            rel="noreferrer"
            onPointerEnter={() => setCursor('open', 'Order on Zomato')}
            onPointerLeave={() => setCursor('default', null)}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#E23744] hover:bg-[#CB202D] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <span>Order on Zomato</span>
            <ArrowUpRight size={13} />
          </a>

          <a
            href={`tel:+91${PHONE_1}`}
            onPointerEnter={() => setCursor('open', `Call ${PHONE_1}`)}
            onPointerLeave={() => setCursor('default', null)}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold text-[#1E2B58] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Phone size={13} className="text-[#1E2B58]" />
            <span className="hidden sm:inline">{PHONE_1}</span>
          </a>
        </div>
      </div>
    </BrowserRouter>
  );
}
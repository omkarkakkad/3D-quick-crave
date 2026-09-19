import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

const galleryItems = [
  { image: '/images/surmai.jpg', title: 'Surmai Fry', tag: 'King of the Coast' },
  { image: '/images/pomfret-fry.jpg', title: 'Pomfret Fry', tag: 'A coastal classic' },
  { image: '/images/goan-fish-curry.jpg', title: 'Pomfret Malvani Curry', tag: 'Coconut · roasted masala' },
  { image: '/images/malvani-thali.jpg', title: 'The Pomfret Coastal Feast', tag: 'A whole celebration' },
  { image: '/images/prawns.jpg', title: 'Prawns Fry', tag: 'Small catch, big flavour' },
  { image: '/images/goan-thali.jpg', title: 'The King Surmai Combo', tag: 'Fry · curry · kokum sarbat' },
  { image: '/images/crab.jpg', title: 'Crab Gravy', tag: 'Rich coastal indulgence' },
  { image: '/images/kokum-drink.jpg', title: 'Kokum Sarbat', tag: 'Tart, sweet, chilled' },
  { image: '/images/solkadi.jpg', title: 'Sol Kadi', tag: 'The classic digestive' },
  { image: '/images/bangda-fry.jpg', title: 'Bangda Fry', tag: 'Bold. Local. Authentic.' },
  { image: '/images/bombil.jpg', title: 'Bombil Fry', tag: 'Crisp, iconic, crunch' },
  { image: '/images/ravvas.jpg', title: 'Ravas Fry', tag: 'Delicate · flaky' }
];

export default function FoodGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lang = useStore((s) => s.lang);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section id="gallery" className="section-anchor relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 50% 100%, #081a36 0%, #020b1a 65%)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          kicker={t['gallery.kicker'][lang]}
          title={t['gallery.title'][lang]}
        />
        <p className="text-center text-seafoam/70 text-base md:text-lg mt-5">{t['gallery.desc'][lang]}</p>
      </div>

      {/* horizontal drag track */}
      <div
        ref={trackRef}
        className="relative mt-12 flex gap-6 overflow-x-auto px-6 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] pb-8 snap-x snap-mandatory scrollbar-none gallery-track"
      >
        {galleryItems.map((item, i) => (
          <motion.figure
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
            className="group relative w-[78vw] sm:w-[46vw] md:w-[38vw] lg:w-[30vw] shrink-0 snap-center"
            data-taste
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#030d1e] shine transition-all duration-500 group-hover:border-aqua/35 group-hover:shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent z-10" />
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <figcaption className="absolute bottom-0 inset-x-0 z-20 p-5 md:p-6 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-aqua-soft/80">{item.tag}</p>
                  <h3 className="font-display text-2xl md:text-[1.75rem] text-cream mt-2 leading-tight">{item.title}</h3>
                </div>
                <span className="w-11 h-11 shrink-0 rounded-full border border-aqua/40 flex items-center justify-center text-aqua-soft opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mt-4 flex justify-between text-[11px] md:text-xs uppercase tracking-[0.3em] text-seafoam/40">
        <span>{t['gallery.fresh'][lang]}</span>
        <span>{t['gallery.drag'][lang]}</span>
      </div>
      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
        .gallery-track { -webkit-overflow-scrolling: touch; }
      `}</style>
    </section>
  );
}
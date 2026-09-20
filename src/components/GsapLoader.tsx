import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

interface GsapLoaderProps {
  onComplete: () => void;
}

const STORY_PHRASES_EN = [
  'AT 5:00 AM, BOATS REACH THE DOCKS WITH THE MORNING’S WILD CATCH...',
  'STONE-GROUND MALVANI SPICES MARINATED WITH PURE WILD KOKUM...',
  'PAN-SEARED IN CRISP GOLDEN RAVA ON A SMOKING CAST-IRON TAWA...',
  'FRESH, HOT & CRAVEABLE — WELCOME TO QUICK CRAVE COASTAL KITCHEN.'
];

const STORY_PHRASES_MR = [
  'पहाटे ५:०० वाजता बंदरावर बोटी सकाळची ताजी मासळी घेऊन येतात...',
  'दगडी पाट्यावर वाटलेले मालवणी मसाले आणि शुद्ध रानटी कोकम...',
  'गरम लोखंडी तव्यावर कुरकुरीत रव्यामध्ये भाजलेला मासा...',
  'ताजे, गरमागरम आणि रुचकर — क्विक क्रेव्ह किनारपट्टी किचनमध्ये आपले स्वागत आहे.'
];

export function GsapLoader({ onComplete }: GsapLoaderProps) {
  const lang = useStore((s) => s.lang);
  const phrases = lang === 'mr' ? STORY_PHRASES_MR : STORY_PHRASES_EN;
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  useEffect(() => {
    const progressObj = { value: 0 };

    const ctx = gsap.context(() => {
      // Infinite kinetic marquee animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 18,
          ease: 'none',
          repeat: -1
        });
      }

      // Timeline for loading sequence
      const tl = gsap.timeline({
        onComplete: () => {
          // Dual curtain split reveal with high-impact power4 ease
          const exitTl = gsap.timeline({
            onComplete: () => {
              onComplete();
            }
          });

          exitTl
            .to([storyTextRef.current, brandRef.current, counterRef.current?.parentElement], {
              opacity: 0,
              y: -30,
              duration: 0.45,
              stagger: 0.06,
              ease: 'power3.in'
            })
            .to(
              curtainTopRef.current,
              {
                yPercent: -100,
                duration: 0.9,
                ease: 'power4.inOut'
              },
              '-=0.1'
            )
            .to(
              curtainBottomRef.current,
              {
                yPercent: 100,
                duration: 0.9,
                ease: 'power4.inOut'
              },
              '<'
            );
        }
      });

      // Reveal Brand Header & Story Box
      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      ).fromTo(
        storyTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Story phrase cycling during load
      const cycleInterval = setInterval(() => {
        setActivePhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 700);

      // Counter Scrub from 0 to 100
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 2.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            const current = Math.round(progressObj.value);
            if (counterRef.current) {
              counterRef.current.innerText = current < 10 ? `0${current}` : `${current}`;
            }
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${current}%`;
            }
          }
        },
        '-=0.2'
      );

      return () => {
        clearInterval(cycleInterval);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, phrases.length]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden select-none pointer-events-auto flex flex-col justify-between"
    >
      {/* Top Half Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 inset-x-0 h-1/2 bg-[#1E2B58] border-b border-white/10 z-10"
      />

      {/* Bottom Half Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-[#1E2B58] border-t border-white/10 z-10"
      />

      {/* Foreground Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-4 sm:p-12 text-white">
        {/* Top Header Information Row */}
        <div ref={brandRef} className="flex items-center justify-between border-b border-white/15 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#9BC57D] animate-ping" />
            <span className="font-bubble text-lg sm:text-2xl font-black uppercase tracking-wider text-white">
              QUICK<span className="text-[#F9D36A] ml-1">CRAVE</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-widest text-gray-300 font-mono">
            <span>MUMBAI DOCKSIDE</span>
            <span>•</span>
            <span>18.9220° N, 72.8347° E</span>
            <span>•</span>
            <span className="text-[#9BC57D]">{lang === 'mr' ? 'ताजी मासळी लाइव्ह' : 'FRESH CATCH LIVE'}</span>
          </div>
        </div>

        {/* Center: Long Story Text Reveal & Ambient Kinetic Stream */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto max-w-4xl mx-auto px-2 sm:px-4">
          {/* Subtle Background Kinetic Marquee */}
          <div className="w-full overflow-hidden whitespace-nowrap opacity-15 mb-4 sm:mb-6 pointer-events-none">
            <div ref={marqueeRef} className="inline-block font-black text-3xl sm:text-6xl tracking-tight uppercase font-bubble">
              {lang === 'mr'
                ? 'सुरमई रवा फ्राय • पापलेट तवा फ्राय • मालवणी खोबरे कढी • सोलकढी • ताजी मासळी • दगडी पाटा मसाला • सुरमई रवा फ्राय • पापलेट तवा फ्राय • मालवणी खोबरे कढी • सोलकढी • ताजी मासळी • दगडी पाटा मसाला • '
                : 'SURMAI RAVA FRY • POMFRET TAVA FRY • MALVANI COCONUT CURRY • SOL KADI • WILD CATCH • CRISPY CRUST • STONE GROUND MASALA • SURMAI RAVA FRY • POMFRET TAVA FRY • MALVANI COCONUT CURRY • SOL KADI • WILD CATCH • CRISPY CRUST • STONE GROUND MASALA • '}
            </div>
          </div>

          {/* Dynamic Long Running Story Phrase */}
          <div ref={storyTextRef} className="min-h-[110px] sm:min-h-[90px] flex items-center justify-center">
            <h2 className="font-bubble text-lg sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight max-w-3xl transition-all duration-300 px-2">
              "{phrases[activePhraseIndex]}"
            </h2>
          </div>

          <div className="mt-3 sm:mt-4 flex items-center gap-2">
            {phrases.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activePhraseIndex ? 'w-6 sm:w-8 bg-[#F9D36A]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Loading Progress & Counter Bar */}
        <div className="flex flex-col gap-2.5 sm:gap-3 max-w-xl mx-auto w-full pt-3 sm:pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-300 font-bold truncate pr-2">
              {lang === 'mr' ? 'किनारपट्टी अनुभव तयार करत आहोत' : 'Preparing Coastal Kitchen'}
            </span>
            <div className="font-mono text-2xl sm:text-4xl font-extrabold text-[#F9D36A]">
              <span ref={counterRef}>00</span>
              <span className="text-xs sm:text-sm ml-1 text-white/70">%</span>
            </div>
          </div>

          {/* Clean Rounded Progress Track */}
          <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden p-0.5 backdrop-blur-sm">
            <div
              ref={progressLineRef}
              className="h-full rounded-full bg-gradient-to-r from-[#9BC57D] via-[#F9D36A] to-[#82BCF5] transition-all duration-75 shadow-glow"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

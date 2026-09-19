import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { useT } from '../i18n/useT';

gsap.registerPlugin(ScrollTrigger);

export function SourcingStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { tr } = useT();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%'
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: <Leaf className="w-5 h-5 text-[#2E6641]" />,
      title: tr('story.p1Title'),
      desc: tr('story.p1Desc'),
      badge: tr('story.p1Badge')
    },
    {
      icon: <Flame className="w-5 h-5 text-[#C2410C]" />,
      title: tr('story.p2Title'),
      desc: tr('story.p2Desc'),
      badge: tr('story.p2Badge')
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#12382C]" />,
      title: tr('story.p3Title'),
      desc: tr('story.p3Desc'),
      badge: tr('story.p3Badge')
    }
  ];

  return (
    <section id="about" ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="max-w-2xl mb-12 text-left">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E6641] block mb-2">
          {tr('story.kicker')}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#12382C] font-bold tracking-tight">
          {tr('story.title')}
        </h2>
        <p className="text-sm sm:text-base text-[#4A5568] mt-3 leading-relaxed">
          {tr('story.desc')}
        </p>
      </div>

      {/* 3 Pillars Grid (Sweetgreen warm card style) */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E9F0EB] flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#2E6641] bg-[#E9F0EB] px-2.5 py-1 rounded-full mb-3">
                {p.badge}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#12382C] mb-2">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F0EBE0] flex items-center gap-2 text-xs font-semibold text-[#12382C]">
              <CheckCircle2 size={14} className="text-[#2E6641]" />
              <span>{tr('story.scratch')}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

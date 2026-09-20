import React from 'react';
import { useT } from '../i18n/useT';

export function ArchedBanner() {
  const { tr, isMr } = useT();

  return (
    <section className="relative w-full bg-[#FDF9F3] pt-16 pb-24 px-4 sm:px-6 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Curved Arched SVG Headline (Screenshot 7) */}
        <div className="relative w-full max-w-4xl h-44 sm:h-56 md:h-64 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 320"
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Upward Arch Path */}
              <path
                id="archHeadlinePath"
                d="M 50,280 Q 500,10 950,280"
                fill="none"
              />
            </defs>

            {/* Floating Bubble Circles around the headline */}
            <circle cx="160" cy="180" r="10" stroke="#111827" strokeWidth="2.5" fill="none" />
            <circle cx="230" cy="190" r="7" stroke="#111827" strokeWidth="2" fill="none" />
            <circle cx="390" cy="120" r="9" stroke="#111827" strokeWidth="2" fill="none" />
            <circle cx="440" cy="220" r="10" stroke="#111827" strokeWidth="2.5" fill="none" />
            <circle cx="520" cy="170" r="8" stroke="#111827" strokeWidth="2" fill="none" />
            <circle cx="630" cy="120" r="11" stroke="#111827" strokeWidth="2.5" fill="none" />
            <circle cx="820" cy="210" r="8" stroke="#111827" strokeWidth="2" fill="none" />

            {/* Arched Big Uppercase Text */}
            <text
              className={`font-black tracking-[0.16em] fill-[#111827] ${
                isMr ? 'text-[64px] font-sans' : 'text-[78px] font-sans'
              }`}
            >
              <textPath
                href="#archHeadlinePath"
                startOffset="50%"
                textAnchor="middle"
              >
                {isMr ? 'फक्त सर्वोत्तम' : 'ONLY THE BEST'}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Navy Pill Banner (Screenshot 7) */}
        <div className="mt-4 sm:mt-6 px-2">
          <div className="inline-block px-5 sm:px-10 py-2.5 sm:py-3.5 rounded-full bg-[#1E2B58] text-white text-xs sm:text-lg font-bold font-bubble tracking-wider uppercase shadow-md max-w-full">
            {tr('arch.badge')}
          </div>
        </div>

        {/* Editorial Clean Card Box */}
        <div className="mt-6 max-w-xl bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-200 mx-2">
          <p className="text-sm sm:text-lg text-gray-700 leading-relaxed font-normal">
            {tr('arch.desc')}
          </p>
        </div>
      </div>
    </section>
  );
}

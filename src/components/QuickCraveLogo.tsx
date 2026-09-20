import React from 'react';

export function QuickCraveLogo({
  className = 'h-10 sm:h-12',
  color = 'currentColor'
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`inline-flex items-center select-none font-bubble font-extrabold tracking-tight ${className}`}>
      {/* Playful chunky bubble text styled like MANA logo */}
      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
        QUICK<span className="ml-2 inline-block -rotate-3 text-white">CRAVE</span>
      </span>
    </div>
  );
}

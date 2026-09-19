import React from 'react';

// Sunny Radiant Rays bursting from the top
export function SunburstRays({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M250 0 L210 180 L250 0 L150 160 L250 0 L90 120 L250 0 L290 180 L250 0 L350 160 L250 0 L410 120 Z"
        fill="#FDE68A"
        opacity="0.85"
      />
      <polygon points="250,0 230,220 250,0 270,220" fill="#FCD34D" opacity="0.9" />
      <polygon points="250,0 170,190 250,0 330,190" fill="#FCD34D" opacity="0.9" />
    </svg>
  );
}

// Quirky Red Friendly Doodle Creature (from Screenshot 2)
export function RedMonsterDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Monster Main Body */}
      <path
        d="M60 440 C40 350 30 260 70 200 C90 170 120 160 140 120 C150 100 155 70 170 60 C180 55 195 70 200 90 C205 60 220 50 230 60 C240 70 240 100 250 120 C270 150 290 160 305 190 C330 240 330 360 300 440 Z"
        fill="#EE4734"
      />
      {/* Monster Face Details */}
      <circle cx="155" cy="220" r="16" fill="#FDE047" />
      <circle cx="152" cy="218" r="6" fill="#1E293B" />
      <circle cx="210" cy="215" r="16" fill="#FDE047" />
      <circle cx="207" cy="213" r="6" fill="#1E293B" />
      {/* Cute smile */}
      <path d="M165 245 Q182 265 200 245" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      {/* Rosy cheeks */}
      <ellipse cx="140" cy="245" rx="10" ry="7" fill="#F472B6" opacity="0.7" />
      <ellipse cx="225" cy="240" rx="10" ry="7" fill="#F472B6" opacity="0.7" />

      {/* Decorative Chest Doodles (Heart, florals, squiggles) */}
      <path
        d="M200 290 C180 260 140 270 140 305 C140 340 200 380 200 380 C200 380 260 340 260 305 C260 270 220 260 200 290 Z"
        fill="#F87171"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      {/* Squiggles & Stars on creature body */}
      <path
        d="M100 320 Q115 300 130 320 T160 320"
        stroke="#FEF08A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M90 380 Q105 360 120 380 T150 380"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Sparkle star */}
      <path
        d="M270 270 Q280 270 280 260 Q280 270 290 270 Q280 270 280 280 Q280 270 270 270 Z"
        fill="#FEF08A"
      />
      <path
        d="M80 260 Q90 260 90 250 Q90 260 100 260 Q90 260 90 270 Q90 260 80 260 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// Blue Dancing Cartoon Figure (from Screenshot 3)
export function BlueDancerDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 450 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Dancer Head and Body */}
      <circle cx="160" cy="120" r="55" fill="#60A5FA" />
      <path d="M125 125 C125 155 195 155 195 125 Z" fill="#F472B6" stroke="#1E293B" strokeWidth="4" />
      {/* Eyes */}
      <circle cx="140" cy="105" r="7" fill="#1E293B" />
      <circle cx="175" cy="105" r="7" fill="#1E293B" />
      <circle cx="142" cy="102" r="2.5" fill="#FFFFFF" />
      <circle cx="177" cy="102" r="2.5" fill="#FFFFFF" />

      {/* Upstretched Joyful Arms */}
      <path
        d="M110 120 C70 90 40 40 30 10"
        stroke="#60A5FA"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <path
        d="M205 110 C230 70 260 30 280 10"
        stroke="#60A5FA"
        strokeWidth="32"
        strokeLinecap="round"
      />

      {/* Navy Shirt */}
      <path d="M110 160 C110 230 210 230 210 160 Z" fill="#1E3A8A" />

      {/* Dynamic Red Kicking Legs */}
      <path
        d="M130 220 C120 280 60 340 30 420"
        stroke="#EF4444"
        strokeWidth="36"
        strokeLinecap="round"
      />
      {/* Kicking Leg forward */}
      <path
        d="M185 220 C230 280 270 320 290 380"
        stroke="#EF4444"
        strokeWidth="36"
        strokeLinecap="round"
      />

      {/* Dark Navy Shoes */}
      <ellipse cx="25" cy="435" rx="28" ry="14" fill="#1E293B" />
      <ellipse cx="305" cy="390" rx="28" ry="14" fill="#1E293B" />
    </svg>
  );
}

// Giant Pink Hibiscus Flower with Sparkles (from Screenshot 4)
export function HibiscusDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 350 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Outer Soft Pink Petals */}
      <path
        d="M175 30 C200 30 225 65 210 105 C245 90 285 105 285 140 C285 175 250 195 230 220 C250 250 230 295 195 290 C160 285 150 255 125 265 C95 280 60 250 70 215 C40 195 40 150 70 130 C65 95 105 70 135 90 C150 50 160 30 175 30 Z"
        fill="#F472B6"
      />
      {/* Specular White Highlights on Petals */}
      <ellipse cx="265" cy="125" rx="6" ry="14" transform="rotate(30 265 125)" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="90" cy="150" rx="6" ry="14" transform="rotate(-30 90 150)" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="175" cy="45" rx="14" ry="6" fill="#FFFFFF" opacity="0.9" />

      {/* Inner Magenta Floral Core */}
      <path
        d="M175 90 C195 90 210 115 200 140 C220 135 240 150 235 170 C230 190 210 195 200 210 C210 230 195 250 175 245 C155 245 145 225 135 225 C115 235 95 215 105 195 C85 180 90 155 110 145 C105 125 130 110 145 120 C155 100 165 90 175 90 Z"
        fill="#DB2777"
      />

      {/* Yellow Stamen */}
      <path d="M175 175 Q210 150 225 120" stroke="#FDE047" strokeWidth="6" strokeLinecap="round" />
      <circle cx="225" cy="120" r="8" fill="#F59E0B" />
      <circle cx="210" cy="135" r="5" fill="#FDE047" />
      <circle cx="195" cy="155" r="5" fill="#FDE047" />
    </svg>
  );
}

// Cartoon Blackberry Cluster (from Screenshot 4)
export function BlackberryDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Green Stem & Leaves */}
      <path d="M120 40 C115 15 135 10 140 5" stroke="#166534" strokeWidth="6" strokeLinecap="round" />
      <path d="M120 35 C100 25 80 30 75 40 C85 50 105 45 120 35 Z" fill="#22C55E" />
      <path d="M120 35 C140 25 160 30 165 40 C155 50 135 45 120 35 Z" fill="#22C55E" />

      {/* Juicy Blackberry Bubbles */}
      <g stroke="#1E293B" strokeWidth="4">
        <circle cx="95" cy="80" r="28" fill="#3B82F6" />
        <circle cx="145" cy="80" r="28" fill="#2563EB" />
        <circle cx="70" cy="125" r="26" fill="#2563EB" />
        <circle cx="120" cy="125" r="28" fill="#1D4ED8" />
        <circle cx="170" cy="125" r="26" fill="#3B82F6" />
        <circle cx="80" cy="175" r="26" fill="#1D4ED8" />
        <circle cx="130" cy="175" r="28" fill="#2563EB" />
        <circle cx="165" cy="175" r="24" fill="#1E40AF" />
        <circle cx="105" cy="220" r="24" fill="#1E3A8A" />
        <circle cx="140" cy="220" r="22" fill="#1D4ED8" />
      </g>
      {/* Bubble Highlights */}
      <circle cx="90" cy="72" r="5" fill="#93C5FD" />
      <circle cx="140" cy="72" r="5" fill="#93C5FD" />
      <circle cx="115" cy="115" r="6" fill="#BFDBFE" />
      <circle cx="65" cy="118" r="5" fill="#93C5FD" />
      <circle cx="75" cy="168" r="5" fill="#93C5FD" />
    </svg>
  );
}

// Rocket Ship Blasting Off (from Screenshot 4)
export function RocketShipDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 350 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Fiery Blast Plume Trail */}
      <path
        d="M160 260 C140 320 110 380 80 410 C130 400 170 370 190 320 C220 380 260 400 310 410 C270 350 230 310 200 260 Z"
        fill="#FBBF24"
      />
      <path
        d="M170 270 C155 310 130 360 110 380 C145 370 175 350 185 310 C205 350 235 370 270 380 C240 340 215 310 195 270 Z"
        fill="#F43F5E"
      />

      {/* Yellow Wing Fins */}
      <path d="M120 180 L50 240 L110 260 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="4" />
      <path d="M240 180 L310 240 L250 260 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="4" />

      {/* Dark Navy Rocket Hull */}
      <path
        d="M180 30 C150 80 120 160 120 250 L240 250 C240 160 210 80 180 30 Z"
        fill="#1E2B58"
        stroke="#1E293B"
        strokeWidth="5"
      />

      {/* Rocket Specular Shine Line */}
      <rect x="135" y="120" width="8" height="30" rx="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="139" cy="165" r="4" fill="#FFFFFF" opacity="0.9" />

      {/* Round Window with Vapor Swirl */}
      <circle cx="180" cy="130" r="32" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />
      <path
        d="M170 115 C190 120 170 140 190 145"
        stroke="#0284C7"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Sunburst Citrus / Watermelon Slice (from Screenshot 2 & 3)
export function SliceCitrusDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Background Yellow Star Rays */}
      <polygon
        points="130,20 145,90 210,50 165,110 230,130 165,150 210,210 145,170 130,240 115,170 50,210 95,150 30,130 95,110 50,50 115,90"
        fill="#FDE047"
      />

      {/* Citrus Slice Dark Green Rind */}
      <path
        d="M70 70 C150 20 220 90 200 170 L80 160 Z"
        fill="#15803D"
        stroke="#1E293B"
        strokeWidth="4"
      />
      {/* Lighter Green Inner Rind */}
      <path
        d="M78 78 C145 35 205 95 190 162 L90 154 Z"
        fill="#86EFAC"
      />
      {/* Juicy Center Flesh (Pink or Citrus) */}
      <path
        d="M86 86 C140 50 192 102 178 155 L98 148 Z"
        fill="#F472B6"
      />
      {/* Citrus Segments / Seeds */}
      <ellipse cx="120" cy="110" rx="3" ry="5" fill="#1E293B" />
      <ellipse cx="140" cy="120" rx="3" ry="5" fill="#1E293B" />
      <ellipse cx="130" cy="135" rx="3" ry="5" fill="#1E293B" />
      <ellipse cx="150" cy="135" rx="3" ry="5" fill="#1E293B" />
    </svg>
  );
}

// Arch Window with Blue Sky & Puffy White Clouds (from Screenshot 2)
export function ArchCloudWindow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <defs>
        <clipPath id="archClip">
          <path d="M20 100 C20 40 80 0 100 0 C120 0 180 40 180 100 L180 320 L20 320 Z" />
        </clipPath>
      </defs>

      {/* Blue Sky Base in Arch */}
      <g clipPath="url(#archClip)">
        <rect width="200" height="320" fill="#7BB5F0" />
        {/* Puffy Cloud 1 */}
        <ellipse cx="80" cy="140" rx="45" ry="24" fill="#FFFFFF" />
        <ellipse cx="110" cy="130" rx="30" ry="20" fill="#FFFFFF" />
        <ellipse cx="60" cy="145" rx="25" ry="18" fill="#FFFFFF" />

        {/* Puffy Cloud 2 */}
        <ellipse cx="130" cy="220" rx="55" ry="28" fill="#FFFFFF" />
        <ellipse cx="90" cy="230" rx="35" ry="20" fill="#FFFFFF" />
        <ellipse cx="155" cy="210" rx="35" ry="22" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

// Tropical Botanical Leaves & Orange Blossom Flower (from Screenshot 1 & 2)
export function BotanicalLeavesFlower({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Stalk */}
      <path d="M40 300 Q120 220 180 80" stroke="#166534" strokeWidth="12" strokeLinecap="round" />

      {/* Leaves branching off */}
      <path d="M120 220 C80 190 60 140 80 110 C110 130 130 180 120 220 Z" fill="#22C55E" />
      <path d="M140 180 C180 150 200 100 180 70 C150 90 130 140 140 180 Z" fill="#15803D" />
      <path d="M165 130 C135 100 125 50 145 20 C175 40 185 90 165 130 Z" fill="#22C55E" />

      {/* Large Warm Orange Flower with White Center */}
      <g transform="translate(100, 160)">
        {/* Flower Petals */}
        <circle cx="50" cy="50" r="30" fill="#FB923C" />
        <circle cx="85" cy="40" r="30" fill="#F97316" />
        <circle cx="100" cy="75" r="30" fill="#FB923C" />
        <circle cx="70" cy="100" r="30" fill="#F97316" />
        <circle cx="35" cy="85" r="30" fill="#FB923C" />
        {/* White Center Eye */}
        <circle cx="68" cy="70" r="16" fill="#FFFFFF" />
      </g>

      {/* Small Yellow Flower */}
      <g transform="translate(20, 210) scale(0.65)">
        <circle cx="50" cy="50" r="28" fill="#FBBF24" />
        <circle cx="85" cy="40" r="28" fill="#F59E0B" />
        <circle cx="95" cy="75" r="28" fill="#FBBF24" />
        <circle cx="65" cy="95" r="28" fill="#F59E0B" />
        <circle cx="35" cy="80" r="28" fill="#FBBF24" />
        <circle cx="66" cy="68" r="15" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

// 4-Point Sparkle Star
export function SparkleStar({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M40 5 C40 25 25 40 5 40 C25 40 40 55 40 75 C40 55 55 40 75 40 C55 40 40 25 40 5 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
      />
    </svg>
  );
}

// Open Circle Bubble Ring
export function BubbleRing({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="30" cy="30" r="22" stroke="#1E293B" strokeWidth="4" strokeDasharray="none" />
    </svg>
  );
}

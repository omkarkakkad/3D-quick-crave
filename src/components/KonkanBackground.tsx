export function KonkanBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 konkan-scene">
        <div className="absolute inset-0 konkan-sky" />

        <div className="absolute inset-x-0 bottom-0 h-[46%] konkan-sea-base" />

        <div className="absolute left-1/2 top-[13%] -translate-x-1/2 w-[46vmin] h-[46vmin]">
          <svg className="konkan-sun w-full h-full" viewBox="0 0 200 200">
            <defs>
              <radialGradient id="konkan-sun-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffd9a3" stopOpacity="0.9" />
                <stop offset="38%" stopColor="#ffab6b" stopOpacity="0.42" />
                <stop offset="70%" stopColor="#ff7a45" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#ff7a45" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="konkan-sun-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff3dc" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#ffd9a3" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffb47a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="100" fill="url(#konkan-sun-glow)" />
            <circle cx="100" cy="100" r="54" fill="url(#konkan-sun-core)" />
          </svg>
        </div>

        <div
          className="absolute inset-x-0 top-[48%] h-[22%]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(255,122,69,0.16), rgba(53,214,196,0.07) 45%, transparent 72%)',
            filter: 'blur(8px)'
          }}
        />

        <div className="absolute inset-x-0 top-[52%] text-center">
          <span className="text-[7px] tracking-[0.6em] uppercase text-seafoam/25">Konkan coast · dusk</span>
        </div>

        <span
          className="konkan-bird absolute"
          style={{ left: '94%', top: '13%', width: 38, animationDuration: '46s', animationDelay: '-6s' }}
        >
          <svg className="w-full" viewBox="0 0 30 12">
            <path
              d="M2 8 Q9 0 16 5 Q22 0 28 9"
              fill="none"
              stroke="#04121f"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className="konkan-bird absolute"
          style={{ left: '89%', top: '23%', width: 27, animationDuration: '58s', animationDelay: '-20s' }}
        >
          <svg className="w-full" viewBox="0 0 30 12">
            <path
              d="M2 8 Q9 0 16 5 Q22 0 28 9"
              fill="none"
              stroke="#04121f"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className="konkan-bird absolute"
          style={{ left: '97%', top: '27%', width: 44, animationDuration: '70s', animationDelay: '-38s' }}
        >
          <svg className="w-full" viewBox="0 0 30 12">
            <path
              d="M2 8 Q9 0 16 5 Q22 0 28 9"
              fill="none"
              stroke="#04121f"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="absolute left-0 top-[52%]" style={{ width: 'min(34vw, 380px)' }}>
          <svg className="konkan-boat w-full" viewBox="0 0 280 150">
            <path
              d="M16 100 C22 92 40 86 66 86 L96 86 C128 88 168 96 202 92 C228 88 246 70 252 46 C244 36 230 34 224 44 C224 58 214 70 196 76 C170 86 150 82 122 80 C90 78 60 72 44 78 C28 82 18 92 16 100 Z"
              fill="#04121f"
            />
            <circle cx="123" cy="65" r="5" fill="#04121f" />
            <path
              d="M112 86 C114 74 117 68 123 68 C129 68 132 74 134 86 L128 86 L128 97 L118 97 L118 86 Z"
              fill="#04121f"
            />
            <path d="M20 122 L118 128" stroke="#04121f" strokeWidth="7" strokeLinecap="round" />
            <path d="M62 92 L54 121" stroke="#04121f" strokeWidth="4" strokeLinecap="round" />
            <path d="M100 94 L106 125" stroke="#04121f" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute" style={{ bottom: -64, left: -70, width: 350 }}>
          <svg className="konkan-palm w-full" viewBox="0 0 220 320">
            <path
              d="M108 320 C104 286 112 258 118 220 C124 186 118 154 120 140 L134 140 C136 156 132 188 136 220 C142 258 148 288 146 320 Z"
              fill="#04121f"
            />
            <g className="konkan-palm-canopy" style={{ transformOrigin: '50% 44%' }}>
              <path d="M126 144 Q92 150 64 178 Q98 168 124 152 Z" fill="#04121f" />
              <path d="M124 142 Q86 128 58 140 Q92 138 122 148 Z" fill="#04121f" />
              <path d="M122 138 Q90 104 66 100 Q94 112 120 142 Z" fill="#04121f" />
              <path d="M120 134 Q98 82 112 54 Q112 88 122 138 Z" fill="#04121f" />
              <path d="M126 142 Q162 148 190 170 Q156 162 128 150 Z" fill="#04121f" />
              <path d="M128 138 Q166 124 192 132 Q160 132 130 146 Z" fill="#04121f" />
              <path d="M130 134 Q160 100 184 94 Q156 108 132 140 Z" fill="#04121f" />
              <path d="M132 144 Q146 174 152 200 Q140 168 130 152 Z" fill="#04121f" />
              <path d="M132 130 Q150 84 168 70 Q152 100 134 136 Z" fill="#04121f" />
              <circle cx="122" cy="140" r="5" fill="#04121f" />
              <circle cx="132" cy="142" r="5" fill="#04121f" />
            </g>
          </svg>
        </div>

        <div className="absolute" style={{ bottom: -52, left: -30, width: 240 }}>
          <svg className="konkan-palm w-full" viewBox="0 0 220 320">
            <path
              d="M108 320 C104 286 112 258 118 220 C124 186 118 154 120 140 L134 140 C136 156 132 188 136 220 C142 258 148 288 146 320 Z"
              fill="#04121f"
            />
            <g className="konkan-palm-canopy" style={{ transformOrigin: '50% 44%' }}>
              <path d="M126 144 Q92 150 64 178 Q98 168 124 152 Z" fill="#04121f" />
              <path d="M124 142 Q86 128 58 140 Q92 138 122 148 Z" fill="#04121f" />
              <path d="M122 138 Q90 104 66 100 Q94 112 120 142 Z" fill="#04121f" />
              <path d="M120 134 Q98 82 112 54 Q112 88 122 138 Z" fill="#04121f" />
              <path d="M126 142 Q162 148 190 170 Q156 162 128 150 Z" fill="#04121f" />
              <path d="M128 138 Q166 124 192 132 Q160 132 130 146 Z" fill="#04121f" />
              <path d="M130 134 Q160 100 184 94 Q156 108 132 140 Z" fill="#04121f" />
              <circle cx="122" cy="140" r="5" fill="#04121f" />
              <circle cx="132" cy="142" r="5" fill="#04121f" />
            </g>
          </svg>
        </div>

        <div className="absolute" style={{ bottom: -58, right: -80, width: 330, transform: 'scaleX(-1)' }}>
          <svg className="konkan-palm w-full" viewBox="0 0 220 320">
            <path
              d="M108 320 C104 286 112 258 118 220 C124 186 118 154 120 140 L134 140 C136 156 132 188 136 220 C142 258 148 288 146 320 Z"
              fill="#04121f"
            />
            <g className="konkan-palm-canopy" style={{ transformOrigin: '50% 44%' }}>
              <path d="M126 144 Q92 150 64 178 Q98 168 124 152 Z" fill="#04121f" />
              <path d="M124 142 Q86 128 58 140 Q92 138 122 148 Z" fill="#04121f" />
              <path d="M122 138 Q90 104 66 100 Q94 112 120 142 Z" fill="#04121f" />
              <path d="M120 134 Q98 82 112 54 Q112 88 122 138 Z" fill="#04121f" />
              <path d="M126 142 Q162 148 190 170 Q156 162 128 150 Z" fill="#04121f" />
              <path d="M128 138 Q166 124 192 132 Q160 132 130 146 Z" fill="#04121f" />
              <path d="M130 134 Q160 100 184 94 Q156 108 132 140 Z" fill="#04121f" />
              <path d="M132 144 Q146 174 152 200 Q140 168 130 152 Z" fill="#04121f" />
              <circle cx="122" cy="140" r="5" fill="#04121f" />
              <circle cx="132" cy="142" r="5" fill="#04121f" />
            </g>
          </svg>
        </div>

        <div
          className="konkan-wave-row absolute inset-x-0"
          style={{ top: 0, height: '55%', animationDuration: '34s' }}
        >
          <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 96 C120 60 240 132 400 96 C560 60 680 132 800 96 C920 60 1040 132 1200 96 C1360 60 1480 132 1600 96 L1600 200 L0 200 Z"
              fill="#113044"
            />
            <path
              d="M0 96 C120 60 240 132 400 96 C560 60 680 132 800 96 C920 60 1040 132 1200 96 C1360 60 1480 132 1600 96 L1600 200 L0 200 Z"
              fill="none"
              stroke="rgba(53,214,196,0.13)"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div
          className="konkan-wave-row absolute inset-x-0"
          style={{ top: '28%', height: '55%', animationDuration: '27s', animationDirection: 'reverse' }}
        >
          <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 74 C140 118 260 40 400 74 C540 118 660 40 800 74 C940 118 1060 40 1200 74 C1340 118 1460 40 1600 74 L1600 200 L0 200 Z"
              fill="#12394d"
            />
            <path
              d="M0 74 C140 118 260 40 400 74 C540 118 660 40 800 74 C940 118 1060 40 1200 74 C1340 118 1460 40 1600 74 L1600 200 L0 200 Z"
              fill="none"
              stroke="rgba(53,214,196,0.09)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div
          className="konkan-wave-row absolute inset-x-0"
          style={{ top: '52%', height: '55%', animationDuration: '21s' }}
        >
          <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 58 C110 20 250 122 400 84 C520 40 640 120 800 92 C940 44 1060 120 1200 96 C1340 54 1460 118 1600 84 L1600 200 L0 200 Z"
              fill="#0e2b3a"
            />
            <path
              d="M0 58 C110 20 250 122 400 84 C520 40 640 120 800 92 C940 44 1060 120 1200 96 C1340 54 1460 118 1600 84 L1600 200 L0 200 Z"
              fill="none"
              stroke="rgba(53,214,196,0.14)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[46%]">
          <span
            className="konkan-bubble absolute rounded-full"
            style={{ left: '13%', bottom: '5%', width: 6, height: 6, animationDuration: '9s', animationDelay: '-4s', background: 'rgba(183,237,228,0.5)', boxShadow: '0 0 6px rgba(53,214,196,0.4)' }}
          />
          <span
            className="konkan-bubble absolute rounded-full"
            style={{ left: '27%', bottom: '3%', width: 10, height: 10, animationDuration: '12s', animationDelay: '-8s', background: 'rgba(183,237,228,0.42)', boxShadow: '0 0 8px rgba(53,214,196,0.35)' }}
          />
          <span
            className="konkan-bubble absolute rounded-full"
            style={{ left: '39%', bottom: '8%', width: 5, height: 5, animationDuration: '8s', animationDelay: '-2s', background: 'rgba(183,237,228,0.55)', boxShadow: '0 0 6px rgba(53,214,196,0.45)' }}
          />
          <span
            className="konkan-bubble absolute rounded-full"
            style={{ left: '51%', bottom: '4%', width: 8, height: 8, animationDuration: '11s', animationDelay: '-6s', background: 'rgba(183,237,228,0.45)', boxShadow: '0 0 7px rgba(53,214,196,0.4)' }}
          />
          <span
            className="konkan-bubble absolute rounded-full"
            style={{ left: '64%', bottom: '7%', width: 6, height: 6, animationDuration: '9.5s', animationDelay: '-11s', background: 'rgba(183,237,228,0.5)', boxShadow: '0 0 6px rgba(53,214,196,0.4)' }}
          />
          <span
            className="konkan-bubble absolute rounded-full"
            style={{ left: '77%', bottom: '3%', width: 9, height: 9, animationDuration: '13s', animationDelay: '-5s', background: 'rgba(183,237,228,0.4)', boxShadow: '0 0 8px rgba(53,214,196,0.35)' }}
          />
          <span
            className="konkan-bubble absolute rounded-full"
            style={{ left: '89%', bottom: '6%', width: 7, height: 7, animationDuration: '10s', animationDelay: '-9s', background: 'rgba(183,237,228,0.48)', boxShadow: '0 0 6px rgba(53,214,196,0.4)' }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 18%, transparent 42%, rgba(2,11,26,0.55) 100%)'
          }}
        />
      </div>

      <style>{`
        .konkan-scene {
          opacity: 0.78;
        }

        .konkan-sky {
          background: linear-gradient(
            180deg,
            rgba(255, 217, 163, 0.5) 0%,
            rgba(255, 171, 107, 0.3) 22%,
            rgba(58, 95, 110, 0.26) 48%,
            rgba(14, 43, 58, 0.08) 72%,
            transparent 100%
          );
        }

        .konkan-sea-base {
          background: linear-gradient(
            180deg,
            rgba(18, 57, 77, 0.9),
            rgba(14, 43, 58, 0.82) 48%,
            rgba(5, 15, 32, 0.62)
          );
        }

        .konkan-sun {
          animation: konkan-pulse 9s ease-in-out infinite;
          transform-origin: 50% 50%;
        }

        .konkan-bird {
          animation: konkan-bird 56s linear infinite;
          will-change: transform;
        }

        .konkan-boat {
          animation: konkan-boat 20s ease-in-out infinite alternate;
          will-change: transform;
        }

        .konkan-palm {
          animation: konkan-sway 9s ease-in-out infinite alternate;
          transform-origin: 50% 100%;
          will-change: transform;
        }

        .konkan-palm-canopy {
          animation: konkan-sway 5.5s ease-in-out infinite alternate;
          will-change: transform;
        }

        .konkan-wave-row {
          animation: konkan-wave 28s linear infinite;
          will-change: transform;
        }

        .konkan-bubble {
          animation: konkan-bubble 10s linear infinite;
          will-change: transform, opacity;
        }

        @keyframes konkan-sway {
          from { transform: rotate(-1.4deg); }
          to { transform: rotate(1.4deg); }
        }

        @keyframes konkan-wave {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes konkan-pulse {
          0%, 100% { opacity: 0.72; transform: scale(0.97); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        @keyframes konkan-bird {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-30vw) translateY(-1.4vh); }
          50% { transform: translateX(-60vw) translateY(0.6vh); }
          75% { transform: translateX(-90vw) translateY(-1.2vh); }
          100% { transform: translateX(-118vw) translateY(0); }
        }

        @keyframes konkan-bubble {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          12% { opacity: 0.75; }
          100% { transform: translateY(-42vh) scale(1.05); opacity: 0; }
        }

        @keyframes konkan-boat {
          0% { transform: translate(104vw, 0) rotate(0.4deg); }
          50% { transform: translate(28vw, -1.2vh) rotate(-1.1deg); }
          100% { transform: translate(-22vw, 0.6vh) rotate(0.5deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .konkan-scene * {
            animation-duration: 0.01s !important;
            animation-iteration-count: 1 !important;
            animation-direction: normal !important;
          }
        }
      `}</style>
    </div>
  );
}
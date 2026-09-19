interface FoodVisualProps {
  kind: string;
  className?: string;
  animated?: boolean;
}

const plateBG = (
  <defs>
    <radialGradient id="plateGrad" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stopColor="#16304f" />
      <stop offset="55%" stopColor="#0d2240" />
      <stop offset="100%" stopColor="#051226" />
    </radialGradient>
    <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
      <stop offset="82%" stopColor="transparent" />
      <stop offset="88%" stopColor="#35d6c4" stopOpacity="0.18" />
      <stop offset="96%" stopColor="#35d6c4" stopOpacity="0.45" />
      <stop offset="100%" stopColor="#35d6c4" stopOpacity="0.1" />
    </radialGradient>
    <radialGradient id="sheen" cx="35%" cy="25%" r="60%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="fishgold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ffc86b" />
      <stop offset="100%" stopColor="#e8943c" />
    </linearGradient>
    <linearGradient id="fishred" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ff6a4d" />
      <stop offset="100%" stopColor="#c73e28" />
    </linearGradient>
    <linearGradient id="prawnGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ff9a6b" />
      <stop offset="100%" stopColor="#e05a2e" />
    </linearGradient>
    <linearGradient id="curveGrad" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stopColor="#8a3a1e" />
      <stop offset="55%" stopColor="#b0562a" />
      <stop offset="100%" stopColor="#7a2f18" />
    </linearGradient>
    <radialGradient id="curryPool" cx="50%" cy="55%" r="55%">
      <stop offset="0%" stopColor="#b35a26" />
      <stop offset="70%" stopColor="#8a3f1d" />
      <stop offset="100%" stopColor="#5e2b13" />
    </radialGradient>
    <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="6" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="smoke">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>
);

function Plate({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-hidden="true">
      {plateBG}
      <circle cx="200" cy="200" r="190" fill="url(#plateGrad)" />
      <circle cx="200" cy="200" r="188" fill="url(#rimGrad)" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#35d6c4" strokeOpacity="0.08" strokeWidth="1" />
      <circle cx="200" cy="200" r="178" fill="url(#sheen)" />
      {children}
    </svg>
  );
}

function WholeFish({ type }: { type: 'surmai' | 'pomfret' | 'bangda' | 'halva' }) {
  const body =
    type === 'pomfret' ? (
      <ellipse cx="200" cy="215" rx="95" ry="58" fill="url(#fishgold)" />
    ) : (
      <path
        d="M105 215 Q200 140 295 215 Q200 290 105 215Z"
        fill={type === 'bangda' ? 'url(#fishred)' : 'url(#fishgold)'}
      />
    );
  return (
    <g filter="url(#softGlow)">
      {body}
      {/* tail */}
      <path d="M283 200 L330 175 L320 215 L330 255 L283 230Z" fill={type === 'bangda' ? '#ff8a5c' : '#e8943c'} />
      {/* dorsal fins */}
      <path d="M140 168 Q200 120 260 168 Z" fill="none" stroke={type === 'bangda' ? '#ff9d77' : '#f5b45c'} strokeWidth="5" strokeLinecap="round" />
      {/* head region */}
      <circle cx="118" cy="208" r="5" fill="#16304f" />
      {/* gill arc */}
      <path d="M145 180 Q165 215 145 250" fill="none" stroke="#16304f" strokeOpacity="0.5" strokeWidth="3" />
      {/* scales */}
      {[170, 195, 220, 245].map((y) => (
        <path key={y} d={`M175 ${y} Q210 ${y - 8} 245 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
      ))}
      {/* char marks for bangda */}
      {type === 'bangda' &&
        [160, 180, 200, 220, 240].map((x) => (
          <path key={x} d={`M${x} 175 Q${x + 6} 215 ${x} 255`} fill="none" stroke="#8a2016" strokeOpacity="0.35" strokeWidth="3" />
        ))}
      {/* lemon + peppercorn garnish */}
      <g transform="translate(250 150) rotate(25)">
        <circle r="16" fill="#e9d878" />
        <circle r="12" fill="#e9c74e" />
        <path d="M0 -10 L0 10 M-9 0 L9 0 M-6 -6 L6 6 M-6 6 L6 -6" stroke="#d9ac2f" strokeWidth="1.5" />
      </g>
      <circle cx="288" cy="150" r="3.5" fill="#1c3b2a" />
      <circle cx="296" cy="158" r="3.5" fill="#2a4a35" />
      <path d="M186 128 q4 -18 14 -22 M240 130 q-3 -16 8 -24" fill="none" stroke="#4d7a4a" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function FriedBombil() {
  return (
    <g filter="url(#softGlow)">
      <g transform="translate(200 215) rotate(-6)">
        <ellipse rx="72" ry="26" fill="#d8a94f" />
        <polygon points="-62,0 -92,-26 -84,0 -92,26" fill="#c8943c" />
        <circle cx="-92" cy="-2" r="3" fill="#16304f" />
        <path d="M-30 0 L40 0" stroke="#b47f2c" strokeWidth="2" strokeLinecap="round" />
        <path d="M-70 -8 Q-40 -16 -10 -8 M0 8 Q30 14 56 4" fill="none" stroke="#c8943c" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="52" cy="-4" r="2" fill="#835a1c" />
        <path d="M-86 -8 C-60 -20 -10 -22 30 -12" fill="none" stroke="#8a6a1c" strokeWidth="0.8" opacity="0.5" />
      </g>
    </g>
  );
}

function Prawns({ many }: { many?: boolean }) {
  return (
    <g filter="url(#softGlow)">
      {([0, 40, 80].slice(0, many ? 3 : 1) as number[]).map((r) => (
        <g key={r} transform={`rotate(${r - 40} 200 215)`}>
          {/* tail */}
          <path d="M150 215 L120 188 L128 215 L120 242 Z" fill="#ff8a5c" />
          <path d="M150 215 L175 205 Q200 215 175 225 Z" fill="#e05a2e" />
          {/* body segments */}
          <path d="M175 198 Q205 208 200 222 Q205 232 175 232 Q160 215 175 198Z" fill="url(#prawnGrad)" opacity="0.95" />
          <ellipse cx="212" cy="215" rx="14" ry="10" fill="#ff9a6b" />
          {/* head/eyes */}
          <circle cx="226" cy="212" r="3.2" fill="#16304f" />
          <circle cx="226" cy="218" r="3.2" fill="#16304f" />
          <path d="M230 205 Q238 210 232 218" fill="none" stroke="#ffb98f" strokeWidth="2" />
        </g>
      ))}
      {([180, 210, 260].slice(0, many ? 3 : 1) as number[]).map((x, i) => (
        <ellipse key={x} cx={x} cy={255 + i * 4} rx="3" ry="5" fill="#e9d878" />
      ))}
      <circle cx="150" cy="265" r="4" fill="#4d7a4a" />
      <circle cx="165" cy="270" r="4" fill="#49906e" />
    </g>
  );
}

function CrabArt() {
  return (
    <g filter="url(#softGlow)">
      {/* legs */}
      {[-1, 1].map((s) =>
        [0, 1, 2].map((i) => (
          <path
            key={`${s}-${i}`}
            d={`M120 230 Q${120 - 38 - i * 16} ${225 + i * 14} ${112 - i * 26 - 10 * s} ${262 + i * 10}`}
            fill="none"
            stroke="#c44422"
            strokeWidth="7"
            strokeLinecap="round"
          />
        ))
      )}
      {[-1, 1].map((s) => (
        <path key={s} d={`M280 230 Q${280 + 38} 225 ${288 + 26} 262`} fill="none" stroke="#c44422" strokeWidth="7" strokeLinecap="round" />
      ))}
      {/* body */}
      <ellipse cx="200" cy="220" rx="82" ry="52" fill="#d04a26" />
      <ellipse cx="200" cy="222" rx="62" ry="36" fill="#e0622f" opacity="0.8" />
      {/* claws */}
      <path d="M128 205 Q80 190 66 160 Q70 175 92 182 Q90 168 120 192Z" fill="#c0391a" />
      <path d="M272 205 Q320 190 334 160 Q330 175 308 182 Q310 168 280 192Z" fill="#c0391a" />
      {/* eyes */}
      <rect x="160" y="172" width="18" height="12" rx="5" fill="#e0622f" />
      <rect x="222" y="172" width="18" height="12" rx="5" fill="#e0622f" />
      <circle cx="169" cy="174" r="4" fill="#16304f" />
      <circle cx="231" cy="174" r="4" fill="#16304f" />
      {/* curry leaves & chilli */}
      <path d="M100 260 q10 -16 26 -12 q-14 14 -26 12z" fill="#3f7a3a" />
      <path d="M300 258 q-10 -16 -26 -12 q14 14 26 12z" fill="#3f7a3a" />
    </g>
  );
}

function CurryBowl({ type }: { type: 'curry' | 'handi' }) {
  return (
    <g>
      <ellipse cx="200" cy="270" rx="120" ry="30" fill="#12466e" opacity="0.35" />
      <path d={type === 'handi' ? 'M70 300 Q70 210 200 210 Q330 210 330 300 Z' : 'M85 295 Q85 225 200 225 Q315 225 315 295 Z'} fill="url(#curveGrad)" />
      <ellipse
        cx="200"
        cy={type === 'handi' ? 222 : 232}
        rx="120"
        ry="30"
        fill="url(#curryPool)"
        stroke="#ffc86b"
        strokeOpacity="0.15"
        strokeWidth="2"
      >
        <animate attributeName="rx" values="120;124;120" dur="4s" repeatCount="indefinite" />
      </ellipse>
      {type === 'handi' && (
        <g fill="#6e2410">
          <path d="M200 205 l2 -38 M170 208 l-3 -40 M230 208 l3 -40" stroke="#6e2410" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {/* fish pieces */}
      {[[150, 208], [238, 205], [195, 236], [260, 238], [130, 238]].map(([cx, cy], i) => (
        <path key={i} d={`M${cx - 22} ${cy} Q${cx} ${cy - 12} ${cx + 22} ${cy} Q${cx} ${cy + 12} ${cx - 22} ${cy}Z`} fill="#f2b25c" opacity="0.92">
          <animate attributeName="cy" values={`${cy};${cy + 2};${cy}`} dur={`${3 + i * 0.6}s`} repeatCount="indefinite" />
        </path>
      ))}
      {/* spices & garnishes */}
      <g fill="#c73e28">
        <circle cx="120" cy="230" r="3" />
        <circle cx="160" cy="252" r="3" />
        <circle cx="280" cy="238" r="3" />
      </g>
      <g fill="#3f7a3a">
        <circle cx="205" cy="250" r="4" />
        <circle cx="248" cy="230" r="4" />
        <circle cx="142" cy="252" r="4" />
      </g>
    </g>
  );
}

function KokumGlass() {
  return (
    <g>
      <ellipse cx="200" cy="150" rx="70" ry="12" fill="#35d6c4" opacity="0.25" />
      <path d="M160 120 L180 285 Q200 296 220 285 L240 120 Z" fill="#5b1c2c" opacity="0.9" />
      <path d="M160 120 L240 120 Q252 137 258 160 L142 160 Q148 137 160 120 Z" fill="#7a2438" />
      <ellipse cx="200" cy="120" rx="40" ry="8" fill="#a03448" stroke="#e9d878" strokeWidth="1" />
      {/* liquid */}
      <path d="M165 150 Q200 160 235 150 L240 120 Q200 128 160 120 Z" fill="#8e2740" opacity="0.85" />
      <path d="M215 130 Q232 155 224 182 L200 182 Z" fill="#ffffff" opacity="0.12" />
      {/* ice */}
      <rect x="176" y="144" width="18" height="18" rx="3" fill="#ffffff" opacity="0.35" transform="rotate(20 185 153)" />
      <rect x="200" y="140" width="14" height="14" rx="3" fill="#ffffff" opacity="0.28" transform="rotate(-16 207 147)" />
      <path d="M178 232 q10 6 20 0" stroke="#ffffff" opacity="0.25" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M168 248 q10 6 20 0" stroke="#ffffff" opacity="0.2" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function SolKadiGlass() {
  return (
    <g>
      <ellipse cx="200" cy="150" rx="70" ry="12" fill="#efe3c8" opacity="0.2" />
      <path d="M160 120 L182 285 Q200 296 218 285 L240 120 Z" fill="#efe3c8" opacity="0.75" />
      <ellipse cx="200" cy="120" rx="40" ry="8" fill="#f7f1e4" stroke="#e9d878" strokeWidth="1.5" />
      {/* kokum at bottom */}
      <g fill="#6e1630">
        <circle cx="185" cy="262" r="6" />
        <circle cx="200" cy="268" r="7" />
        <circle cx="214" cy="260" r="5" />
      </g>
      <path d="M215 130 Q232 155 224 182 L200 182 Z" fill="#ffffff" opacity="0.25" />
      <path d="M176 152 Q200 140 228 150 Q218 170 196 172 Q184 164 176 152 Z" fill="#d9b98a" opacity="0.55" />
      {/* mini spices */}
      <circle cx="172" cy="210" r="2.5" fill="#9a3a1e" />
      <circle cx="228" cy="222" r="2.5" fill="#9a3a1e" />
    </g>
  );
}

function ComboSpread({ style }: { style: 'combo' | 'feast' }) {
  return (
    <g>
      <Plate>
        <g transform={`translate(${style === 'feast' ? -40 : -20} 20) scale(0.55)`}>
          <FriedBombil />
        </g>
        <g transform={`translate(${style === 'feast' ? 110 : 130} 30) scale(0.6)`}>
          <WholeFish type="surmai" />
        </g>
        <ForeignBowl />
        <ForeignRice />
      </Plate>
    </g>
  );
}

function ForeignBowl() {
  return (
    <g transform="translate(60 30) scale(0.62)">
      <path d="M85 295 Q85 225 200 225 Q315 225 315 295 Z" fill="#8a3f1d" />
      <ellipse cx="200" cy="232" rx="110" ry="28" fill="#b35a26" />
      {[[150, 218], [230, 220], [200, 242], [265, 230]].map(([cx, cy], i) => (
        <path key={i} d={`M${cx - 20} ${cy} Q${cx} ${cy - 11} ${cx + 20} ${cy} Q${cx} ${cy + 11} ${cx - 20} ${cy}Z`} fill="#f2b25c" opacity="0.9" />
      ))}
    </g>
  );
}

export function FoodVisual({ kind, className = '', animated = true }: FoodVisualProps) {
  if (kind === 'surmai' || kind === 'halva') return <Plate className={className}><WholeFish type="surmai" /></Plate>;
  if (kind === 'pomfret') return <Plate className={className}><WholeFish type="pomfret" /></Plate>;
  if (kind === 'bangda') return <Plate className={className}><WholeFish type="bangda" /></Plate>;
  if (kind === 'bombil') return <Plate className={className}><FriedBombil /></Plate>;
  if (kind === 'prawns') return <Plate className={className}><Prawns many /></Plate>;
  if (kind === 'crab') return <Plate className={className}><CrabArt /></Plate>;
  if (kind === 'curry') return <Plate className={className}><CurryBowl type="curry" /></Plate>;
  if (kind === 'handi') return <Plate className={className}><CurryBowl type="handi" /></Plate>;
  if (kind === 'kokum') return <KokumGlass />;
  if (kind === 'sol') return <SolKadiGlass />;
  if (kind === 'feast') return <ComboSpread style="feast" />;
  if (kind === 'combo') return <ComboSpread style="combo" />;
  return <Plate className={className} />;
}

function ForeignRice() {
  return (
    <g transform="translate(-40 150) scale(0.4)" opacity="0.96">
      <path d="M50 140 L82 120 L114 140 L114 150 L50 150 Z" fill="#f5ead0" />
      <ellipse cx="82" cy="120" rx="32" ry="8" fill="#fff7e0" />
    </g>
  );
}
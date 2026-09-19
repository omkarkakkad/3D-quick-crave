import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useStore } from '../store/useStore';
import { langLabels, type Lang } from '../i18n/translations';

const langs: Lang[] = ['en', 'hi', 'mr'];

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const lang = useStore((s) => s.lang);
  const setLang = useStore((s) => s.setLang);

  return (
    <div className={`flex items-center gap-1.5 ${className}`} data-cursor>
      <Languages size={14} className="text-seafoam/50 shrink-0" />
      <div className="flex items-center rounded-full border border-white/12 bg-white/[0.03] p-1">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-label={l}
            className={`relative px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-300 ${
              lang === l ? 'text-coconut' : 'text-cream/50 hover:text-cream hover:bg-white/[0.06]'
            }`}
          >
            {lang === l && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-aqua/80"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{langLabels[l]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
import { Instagram, MessageCircle } from 'lucide-react';
import { PHONE_1, whatsappUrl, zomatoUrl } from '../data/menu';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

export function Footer() {
  const lang = useStore((s) => s.lang);
  const links = [
    { labelKey: 'footer.menu', href: '#menu' },
    { labelKey: 'footer.order', href: '#order' },
    { labelKey: 'footer.contact', href: `tel:+91${PHONE_1}` },
    { labelKey: 'footer.gallery', href: '#gallery' },
    { labelKey: 'footer.kitchen', href: '#kitchen' },
    { labelKey: 'footer.find', href: '#order' }
  ];

  return (
    <footer className="relative pt-16 pb-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 section-bg" style={{ background: 'linear-gradient(180deg, #010512, #020b1a)' }} />
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 130%, rgba(53,214,196,0.08), transparent 60%)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <a href="#top" className="flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-full border border-aqua/40 flex items-center justify-center group-hover:shadow-glow group-hover:border-aqua/60 transition-all duration-300">
                <svg viewBox="0 0 32 32" className="w-6 h-6">
                  <path d="M6 16 Q16 8 26 16 Q16 24 6 16Z" fill="#35d6c4" />
                  <path d="M22 16 L28 12 L28 20 Z" fill="#7fe8dc" />
                </svg>
              </span>
              <span className="font-display text-2xl tracking-[0.2em] text-cream group-hover:text-aqua-soft transition-colors duration-300">
                QUICK <span className="text-gradient-aqua">CRAVE</span>
              </span>
            </a>
            <p className="mt-3 text-[10px] tracking-[0.4em] uppercase text-seafoam/50">
              {t['footer.from'][lang]}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3 text-sm">
            {links.map((l) => (
              <a key={l.labelKey} href={l.href} className="relative text-cream/70 hover:text-aqua-soft transition-colors py-1 group/link">
                {t[l.labelKey][lang]}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-aqua group-hover/link:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={zomatoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Zomato"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-sm font-black text-cream/80 hover:border-[#e23744]/60 hover:text-white hover:bg-[#e23744]/10 hover:scale-110 active:scale-95 transition-all duration-300"
            >
              Z
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-cream/80 hover:border-aqua/50 hover:text-aqua-soft hover:bg-aqua/5 hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <Instagram size={16} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-cream/80 hover:border-ember/50 hover:text-ember hover:bg-ember/5 hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-cream/35">
          <span>© {new Date().getFullYear()} QUICK CRAVE · {t['footer.tagline'][lang]}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua/60" />
            {t['footer.catch'][lang]}
            <span className="w-1.5 h-1.5 rounded-full bg-ember/60" />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
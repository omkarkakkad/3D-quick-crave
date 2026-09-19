import { motion } from 'framer-motion';
import { Phone, MessageCircle, ExternalLink, Flame } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { PHONE_1, PHONE_2, whatsappUrl, callUrl, zomatoUrl } from '../data/menu';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

export default function OrderSection() {
  const setCartOpen = useStore((s) => s.setCartOpen);
  const lang = useStore((s) => s.lang);

  return (
    <section id="order" className="section-anchor relative py-32 md:py-44 overflow-hidden grain">
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 50% 120%, #2b1408 0%, #120805 45%, #020b1a 100%)' }} />
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,178,106,0.14), transparent 55%)' }} />

      {/* embers */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${(i * 53) % 100}%`,
            bottom: '-6px',
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            background: i % 2 ? '#ff7a45' : '#ffab6a',
            boxShadow: '0 0 8px rgba(255,122,69,0.6)'
          }}
          animate={{ y: [0, -(180 + (i % 5) * 60)], opacity: [0, 0.7, 0] }}
          transition={{ repeat: Infinity, duration: 5 + (i % 5) * 1.6, delay: i * 0.5, ease: 'linear' }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-ember mb-8"
        >
          <Flame size={14} /> {t['order.kicker'][lang]}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="font-display text-4xl md:text-7xl font-light leading-[1.05] text-cream"
        >
          {t['order.title1'][lang]}
          <span className="block text-gradient-ember italic">{t['order.title2'][lang]}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg mx-auto mt-6 text-base text-seafoam/70"
        >
          {t['order.desc'][lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton onClick={() => setCartOpen(true)}>{t['order.orderNow'][lang]}</MagneticButton>
          <MagneticButton variant="outline" href={callUrl}>
            <Phone size={15} /> {t['order.callUs'][lang]}
          </MagneticButton>
          <MagneticButton variant="outline" href={whatsappUrl}>
            <MessageCircle size={15} /> {t['order.whatsappUs'][lang]}
          </MagneticButton>
        </motion.div>

        {/* phone numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-sm"
        >
          {[PHONE_1, PHONE_2].map((p, i) => (
            <a
              key={p}
              href={`tel:+91${p}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-cream/80 hover:border-aqua/40 hover:text-aqua-soft hover:bg-aqua/5 active:scale-95 transition-all duration-300"
            >
              <Phone size={12} />
              {p}
            </a>
          ))}
        </motion.div>

        {/* zomato */}
        <motion.a
          href={zomatoUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 inline-flex items-center gap-4 group px-7 py-4 rounded-2xl border border-ember/30 bg-gradient-to-b from-[#e23744]/10 to-transparent hover:border-ember/60 hover:shadow-ember hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
        >
          <span className="w-10 h-10 rounded-xl bg-[#e23744] flex items-center justify-center text-white font-black text-sm">
            Z
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold text-cream group-hover:text-white">{t['order.zomato'][lang]}</span>
            <span className="block text-xs text-seafoam/60 mt-0.5">{t['order.zomatoSub'][lang]}</span>
          </span>
          <ExternalLink size={15} className="text-cream/50 group-hover:text-ember transition-colors" />
        </motion.a>
      </div>
    </section>
  );
}
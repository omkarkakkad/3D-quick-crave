import { motion } from 'framer-motion';
import { EASE_OUT } from '../../lib/motion';

interface SectionTitleProps {
  kicker?: string;
  title: React.ReactNode;
  accent?: string;
  center?: boolean;
  className?: string;
}

export function SectionTitle({ kicker, title, accent = '#35d6c4', center = true, className = '' }: SectionTitleProps) {
  const align = center ? 'text-center mx-auto' : '';
  return (
    <div className={`${align} max-w-3xl ${className}`}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.35em] uppercase mb-5"
          style={{ color: accent }}
        >
          <motion.span
            className="relative w-10 h-px overflow-visible"
            style={{ background: accent }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
          >
            <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-1 rotate-45" style={{ background: accent }} />
          </motion.span>
          {kicker}
          <motion.span
            className="relative w-10 h-px overflow-visible"
            style={{ background: accent }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
          >
            <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-1 rotate-45" style={{ background: accent }} />
          </motion.span>
        </motion.div>
      )}
      <div className="overflow-hidden pb-1">
        <motion.h2
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
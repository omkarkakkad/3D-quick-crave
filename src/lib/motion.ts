import type { Variants } from 'framer-motion';

/** Signature "liquid" easing used across the site. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
export const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 26 } as const;
export const SPRING_SNAPPY = { type: 'spring', stiffness: 380, damping: 24 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT, delay: i * 0.09 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut', delay: i * 0.08 },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.9, ease: EASE_OUT, delay: i * 0.1 },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
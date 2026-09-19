import { useRef, type ReactNode, type MouseEvent } from 'react';
import { useStore } from '../../store/useStore';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

export function MagneticButton({ children, onClick, variant = 'solid', size = 'md', className = '', href }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const setCursor = useStore((s) => s.setCursor);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 select-none will-change-transform active:scale-95';
  const sizes = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-base'
  };
  const variants = {
    solid:
      'bg-gradient-to-r from-ember-deep to-ember text-coconut shadow-ember hover:shadow-[0_0_60px_rgba(255,122,69,0.5)] hover:brightness-110',
    outline:
      'border border-aqua/50 text-aqua-soft hover:bg-aqua/10 hover:border-aqua hover:shadow-glow',
    ghost: 'text-cream/80 hover:text-aqua-soft hover:bg-aqua/5'
  };

  const inner = (
    <>
      <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      </span>
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        onMouseEnter={() => setCursor('open')}
        onMouseLeave={() => setCursor('default')}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className} group`}
        style={{ display: 'inline-flex' }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseEnter={() => setCursor('open')}
      onMouseOut={() => setCursor('default')}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className} group`}
    >
      {inner}
    </button>
  );
}
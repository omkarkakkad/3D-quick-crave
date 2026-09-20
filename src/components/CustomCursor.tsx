import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const CURSOR_EMOJIS: Record<string, string> = {
  default: '🍽️',
  taste: '🌶️',
  open: '🐟',
  explore: '🦐',
  drag: '🦀',
};

const CURSOR_COLORS: Record<string, string> = {
  default: '#1E2B58',
  taste: '#EF4444',
  open: '#15803D',
  explore: '#1E2B58',
  drag: '#1E2B58',
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const cursorMode = useStore((s) => s.cursorMode);
  const cursorLabel = useStore((s) => s.cursorLabel);
  const setCursor = useStore((s) => s.setCursor);

  useEffect(() => {
    const isTouchDevice = () =>
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice()) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (dotRef.current) dotRef.current.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onClick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform += ' scale(0.8)';
        setTimeout(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = cursorRef.current.style.transform.replace(' scale(0.8)', '');
          }
        }, 150);
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('click', onClick);

    let raf: number;
    const animate = () => {
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.14;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.14;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${smoothPos.current.x - 20}px, ${smoothPos.current.y - 20}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${smoothPos.current.x + 28}px, ${smoothPos.current.y - 14}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const onTouchStart = () => {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (labelRef.current) labelRef.current.style.display = 'none';
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('click', onClick);
      document.removeEventListener('touchstart', onTouchStart);
    };
  }, [setCursor]);

  const emoji = CURSOR_EMOJIS[cursorMode] || CURSOR_EMOJIS.default;
  const color = CURSOR_COLORS[cursorMode] || CURSOR_COLORS.default;

  return (
    <>
      {/* Trailing emoji cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-[opacity] duration-200 ease-out will-change-transform flex items-center justify-center"
        style={{ opacity: 0, fontSize: '36px', lineHeight: 1 }}
      >
        {emoji}
      </div>

      {/* Small dot at exact mouse position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ backgroundColor: color, opacity: 0.8 }}
      />

      {/* Label tooltip */}
      {cursorLabel && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] whitespace-nowrap will-change-transform"
        >
          <div
            className="px-4 py-2 rounded-full text-xs font-bold tracking-wide shadow-xl border"
            style={{
              backgroundColor: color,
              color: '#FFFFFF',
              borderColor: `${color}33`,
            }}
          >
            {cursorLabel}
          </div>
        </div>
      )}
    </>
  );
}

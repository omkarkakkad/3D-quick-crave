import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import { t, type Lang } from '../i18n/translations';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const modeRef = useRef<{ mode: string; label: string | null }>({ mode: 'default', label: null });
  const langRef = useRef<Lang>('en');

  const cursorMode = useStore((s) => s.cursorMode);
  const cursorLabel = useStore((s) => s.cursorLabel);
  const lang = useStore((s) => s.lang);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let dotX = tx;
    let dotY = ty;
    let ringX = tx;
    let ringY = ty;
    let hover = false;
    let modeAccent = '#35d6c4';

    const accentFor = (m: string) =>
      m === 'open' ? '#ff7a45' : m === 'taste' ? '#ffb47a' : m === 'explore' ? '#b8ede4' : '#35d6c4';

    const loop = () => {
      const accel = 0.42;
      dotX += (tx - dotX) * accel;
      dotY += (ty - dotY) * accel;
      const ringAccel = 0.28 + (hover ? 0.1 : 0);
      ringX += (tx - ringX) * ringAccel;
      ringY += (ty - ringY) * ringAccel;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      }
      if (ringRef.current) {
        const size = hover ? 56 : 38;
        const scale = size / 38;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = `${modeAccent}66`;
        ringRef.current.style.background = `${modeAccent}0d`;
      }
      if (labelRef.current) {
        const m = modeRef.current;
        const lbl = m.label ?? (m.mode !== 'default' ? (t[`cursor.${m.mode}`] ? t[`cursor.${m.mode}`][langRef.current] : m.mode.toUpperCase()) : null);
        labelRef.current.textContent = lbl ?? '';
        labelRef.current.style.opacity = lbl && hover ? '1' : '0';
        labelRef.current.style.color = modeAccent;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = !!el.closest('button, a, [data-cursor]');
      const fish = !!el.closest('[data-explore]');
      const food = !!el.closest('[data-taste]');
      if (fish) modeRef.current = { mode: 'explore', label: null };
      else if (food) modeRef.current = { mode: 'taste', label: null };
      else if (interactive) modeRef.current = { mode: 'open', label: null };
      else modeRef.current = { mode: 'default', label: null };
      hover = interactive || fish || food;
      modeAccent = accentFor(modeRef.current.mode);
    };

    const onLeaveDoc = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeaveDoc);
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeaveDoc);
      cancelAnimationFrame(raf);
    };
  }, []);

  // keep store-driven mode in sync for the ring accent
  useEffect(() => {
    modeRef.current = { mode: cursorMode, label: cursorLabel };
  }, [cursorMode, cursorLabel]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[200] pointer-events-none" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.15s' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: '#35d6c4', boxShadow: '0 0 14px #35d6c4', transition: 'background 0.2s' }} />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[199] pointer-events-none flex items-center justify-center rounded-full border transition-[border-color,background,width,height] duration-200"
        style={{ opacity: visible ? 1 : 0, width: 38, height: 38, transition: 'opacity 0.2s, border-color 0.2s, background 0.2s, width 0.15s, height 0.15s' }}
      >
        <span ref={labelRef} className="absolute text-[9px] font-semibold tracking-[0.25em] whitespace-nowrap transition-opacity duration-200" style={{ marginTop: 46, opacity: 0 }} />
      </div>
    </>
  );
}
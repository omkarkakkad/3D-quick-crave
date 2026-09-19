import { Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';

export function SoundToggle() {
  const soundOn = useStore((s) => s.soundOn);
  const toggle = useStore((s) => s.toggleSound);

  return (
    <button
      onClick={toggle}
      aria-label={soundOn ? 'Mute ambient sound' : 'Play ambient sound'}
      className="fixed bottom-6 right-6 z-[80] w-12 h-12 rounded-full glass flex items-center justify-center text-aqua-soft hover:text-aqua hover:bg-aqua/10 hover:shadow-glow hover:scale-110 active:scale-90 transition-all duration-300"
      data-cursor
    >
      {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
      {soundOn && <span className="absolute inset-0 rounded-full border border-aqua/40 animate-ping" />}
    </button>
  );
}
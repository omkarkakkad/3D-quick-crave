import { useStore } from '../store/useStore';
import { t, type Lang } from './translations';

export function useT() {
  const lang = useStore((s) => s.lang);
  const setLang = useStore((s) => s.setLang);
  const isMr = lang === 'mr';

  return {
    lang,
    isMr,
    setLang,
    toggleLang: () => setLang(lang === 'en' ? 'mr' : 'en'),
    tr: (key: string, fallback?: string): string => {
      const entry = t[key];
      if (!entry) return fallback ?? key;
      return entry[lang as Lang] ?? entry.en ?? fallback ?? key;
    }
  };
}
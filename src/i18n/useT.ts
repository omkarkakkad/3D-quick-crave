import { useStore } from '../store/useStore';
import { t, type Lang } from './translations';

export function useT() {
  const lang = useStore((s) => s.lang);
  const setLang = useStore((s) => s.setLang);
  return {
    lang,
    setLang,
    tr: (key: string): string => {
      const entry = t[key];
      if (!entry) return key;
      return entry[lang as Lang] ?? entry.en;
    }
  };
}
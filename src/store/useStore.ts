import { create } from 'zustand';
import type { Lang } from '../i18n/translations';

export type Seafood = 'Pomfret' | 'Surmai' | 'Bangda' | 'Prawns' | 'Crab';
export type Style = 'Fry' | 'Malvani Curry' | 'Tandoori';
export type Drink = 'Kokum Sarbat' | 'Sol Kadi';

export interface PlateConfig {
  seafood: Seafood;
  style: Style;
  drink: Drink;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category: string;
}

type CursorMode = 'default' | 'explore' | 'taste' | 'open' | 'drag';

export type MenuFilter = 'ALL' | "CHEF'S SPECIAL" | 'MAIN COURSE' | 'DRINKS';

interface AppState {
  loaded: boolean;
  loadingProgress: number;
  soundOn: boolean;
  activeFish: string | null;
  cursorMode: CursorMode;
  cursorLabel: string | null;
  plate: PlateConfig;
  cart: CartItem[];
  cartOpen: boolean;
  menuFilter: MenuFilter;
  lang: Lang;

  setLoaded: (v: boolean) => void;
  setLoadingProgress: (v: number) => void;
  toggleSound: () => void;
  setActiveFish: (f: string | null) => void;
  setCursor: (m: CursorMode, label?: string | null) => void;
  setSeafood: (s: Seafood) => void;
  setStyle: (s: Style) => void;
  setDrink: (d: Drink) => void;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: string) => void;
  setCartOpen: (v: boolean) => void;
  setMenuFilter: (f: MenuFilter) => void;
  setLang: (l: Lang) => void;
}

export const useStore = create<AppState>((set) => ({
  loaded: false,
  loadingProgress: 0,
  soundOn: false,
  activeFish: null,
  cursorMode: 'default',
  cursorLabel: null,
  plate: { seafood: 'Pomfret', style: 'Fry', drink: 'Kokum Sarbat' },
  cart: [],
  cartOpen: false,
  menuFilter: 'ALL',
  lang: 'en',

  setLoaded: (v) => set({ loaded: v }),
  setLoadingProgress: (v) => set({ loadingProgress: v }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  setActiveFish: (f) => set({ activeFish: f }),
  setCursor: (m, label) => set({ cursorMode: m, cursorLabel: label ?? null }),
  setSeafood: (s) => set((st) => ({ plate: { ...st.plate, seafood: s } })),
  setStyle: (s) => set((st) => ({ plate: { ...st.plate, style: s } })),
  setDrink: (d) => set((st) => ({ plate: { ...st.plate, drink: d } })),
  addToCart: (item) =>
    set((s) => {
      const exists = s.cart.find((c) => c.id === item.id);
      if (exists) {
        return { cart: s.cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)) };
      }
      return { cart: [...s.cart, { ...item, qty: 1 }] };
    }),
  removeFromCart: (id) =>
    set((s) => ({
      cart: s.cart
        .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    })),
  setCartOpen: (v) => set({ cartOpen: v }),
  setMenuFilter: (f) => set({ menuFilter: f }),
  setLang: (l) => set({ lang: l })
}));

export function plateTotal(plate: PlateConfig): number {
  const base: Record<Seafood, number> = { Pomfret: 399, Surmai: 399, Bangda: 240, Prawns: 399, Crab: 399 };
  const drink: Record<Drink, number> = { 'Kokum Sarbat': 99, 'Sol Kadi': 99 };
  return base[plate.seafood] + drink[plate.drink];
}
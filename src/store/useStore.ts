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

export interface SignatureFlavor {
  id: string;
  key: string;
  name: string;
  nameMr: string;
  subtitle: string;
  subtitleMr: string;
  tagline: string;
  taglineMr: string;
  price: number;
  bgColor: string;
  darkColor: string;
  buttonBg: string;
  accentColor: string;
  image: string;
  description: string;
  descriptionMr: string;
  calories: number;
  omega3: string;
  protein: string;
  carbs: string;
  sodium: string;
  catchTime: string;
  catchTimeMr: string;
  doodleSet: 'green' | 'yellow' | 'blue' | 'coral' | 'pink';
}

export const SIGNATURE_FLAVORS: SignatureFlavor[] = [
  {
    id: 'surmai-fry',
    key: 'surmai',
    name: 'Surmai Fry',
    nameMr: 'सुरमई फ्राय',
    subtitle: 'Kingfish Steak · Crispy Golden Rava',
    subtitleMr: 'सुरमई तुकडा · कुरकुरीत सुवर्ण रवा',
    tagline: "Chef's Special · 100% Wild Catch",
    taglineMr: 'शेफ स्पेशल · १००% ताजी मासळी',
    price: 399,
    bgColor: '#F9D36A',
    darkColor: '#78350F',
    buttonBg: '#E05A36',
    accentColor: '#FEF3C7',
    image: '/images/surmai.jpg',
    description:
      'Fresh Kingfish cutlet marinated in Malvani masala & sour tamarind, pan-seared in golden semolina rava on a hot iron tawa.',
    descriptionMr:
      'मालवणी मसाला आणि आंबट चिंचेमध्ये मॅरीनेट केलेला, गरम लोखंडी तव्यावर कुरकुरीत रव्यामध्ये भाजलेला सुरमईचा तुकडा.',
    calories: 240,
    omega3: '1.8g',
    protein: '28g',
    carbs: '4g',
    sodium: '140mg',
    catchTime: '5:30 AM Mumbai Docks',
    catchTimeMr: 'सकाळी ५:३० मुंबई डॉक्स',
    doodleSet: 'yellow'
  },
  {
    id: 'pomfret-fry',
    key: 'pomfret',
    name: 'Pomfret Fry',
    nameMr: 'पापलेट फ्राय',
    subtitle: 'Whole Silver Pomfret · Golden Crisp',
    subtitleMr: 'अक्खा रुपेरी पापलेट · सोनेरी कुरकुरीत',
    tagline: 'Coastal Classic · Flaky Flesh',
    taglineMr: 'किनारपट्टी क्लासिक · मऊ लुसलुशीत',
    price: 399,
    bgColor: '#82BCF5',
    darkColor: '#1E3A8A',
    buttonBg: '#233876',
    accentColor: '#E0EFFF',
    image: '/images/pomfret-fry.jpg',
    description:
      'Whole silver pomfret scored, coated in fiery coastal masala, and shallow-fried in semolina rava until golden and crisp.',
    descriptionMr:
      'अक्खा रुपेरी पापलेट, झणझणीत किनारपट्टी मसाल्यात घोळवून कुरकुरीत रव्यामध्ये सुवर्ण रंग येईपर्यंत तळलेला.',
    calories: 260,
    omega3: '2.1g',
    protein: '26g',
    carbs: '3g',
    sodium: '130mg',
    catchTime: '6:00 AM Dockside',
    catchTimeMr: 'सकाळी ६:०० बंदरकिनारा',
    doodleSet: 'blue'
  },
  {
    id: 'sol-kadi',
    key: 'sol-kadi',
    name: 'Sol Kadi',
    nameMr: 'सोलकढी',
    subtitle: 'Pink Coconut & Wild Kokum Cooler',
    subtitleMr: 'गुलाबी नारळ आणि रानटी कोकम',
    tagline: 'Digestive Nectar · Fresh Press',
    taglineMr: 'पाचक अमृत · दररोज ताजे',
    price: 99,
    bgColor: '#9BC57D',
    darkColor: '#224B27',
    buttonBg: '#2E5F34',
    accentColor: '#D4EAC4',
    image: '/images/solkadi.jpg',
    description:
      'The soul of Malvan. Freshly pressed coconut milk blended with pure wild kokum agal, fresh garlic, rock salt and green chillies.',
    descriptionMr:
      'मालवणचा प्राण. ताज्या नारळाचे दूध, शुद्ध कोकम आगळ, लसूण, सैंधव मीठ आणि हिरवी मिरची घालून तयार केलेली पाचक सोलकढी.',
    calories: 85,
    omega3: '0.4g',
    protein: '2g',
    carbs: '6g',
    sodium: '80mg',
    catchTime: 'Fresh Pressed Daily',
    catchTimeMr: 'दररोज सकाळी ताजे तयार',
    doodleSet: 'green'
  },
  {
    id: 'pomfret-feast',
    key: 'feast',
    name: 'The Pomfret Coastal Feast',
    nameMr: 'द पापलेट कोस्टल दावत',
    subtitle: 'Grand Royal Malvani Thali Spread',
    subtitleMr: 'शाही मालवणी थाळी मेजवानी',
    tagline: 'Complete Meal · Fry, Curry, Rice & Sol Kadi',
    taglineMr: 'संपूर्ण जेवण · फ्राय, करी, भात आणि सोलकढी',
    price: 550,
    bgColor: '#FF7F66',
    darkColor: '#7F1D1D',
    buttonBg: '#991B1B',
    accentColor: '#FFE3DC',
    image: '/images/malvani-thali.jpg',
    description:
      'The ultimate royal coastal thali: Crispy Pomfret Fry, Malvani Coconut Curry, fragrant Steamed Rice & chilled Sol Kadi.',
    descriptionMr:
      'अस्सल शाही कोकणी थाळी: कुरकुरीत पापलेट फ्राय, दगडी पाटा नारळ करी, सुवासिक गरम भात आणि थंडगार सोलकढी.',
    calories: 520,
    omega3: '2.8g',
    protein: '38g',
    carbs: '55g',
    sodium: '320mg',
    catchTime: 'Chef Curated Daily',
    catchTimeMr: 'दररोज सकाळी ताजी मासळी',
    doodleSet: 'coral'
  },
  {
    id: 'kokum-sarbat',
    key: 'kokum',
    name: 'Kokum Sherbet',
    nameMr: 'कोकम शर्बत',
    subtitle: 'Wild Kokum · Chilled Coastal Cooler',
    subtitleMr: 'रानटी कोकम · थंडगार किनारपट्टी कुलर',
    tagline: 'Tangy Refresher · Pure Kokum Agal',
    taglineMr: 'आंबट ताजेपणा · शुद्ध कोकम आगळ',
    price: 79,
    bgColor: '#C2185B',
    darkColor: '#880E4F',
    buttonBg: '#AD1457',
    accentColor: '#F8BBD0',
    image: '/images/kokum-drink.jpg',
    description:
      'Chilled wild kokum sherbet blended with jaggery, roasted cumin and a hint of black salt — the ultimate coastal thirst quencher.',
    descriptionMr:
      'रानटी कोकमाचा थंड शर्बत, गूळ, भुनलेला जिरा आणि काळे मीठाचा स्पर्श असलेला — अंतिम किनारपट्टी प्याऊ.',
    calories: 65,
    omega3: '0.1g',
    protein: '0.5g',
    carbs: '15g',
    sodium: '45mg',
    catchTime: 'Fresh Pressed Daily',
    catchTimeMr: 'दररोज सकाळी ताजे तयार',
    doodleSet: 'pink'
  }
];

type CursorMode = 'default' | 'explore' | 'taste' | 'open' | 'drag';

export type MenuFilter = 'ALL' | "CHEF'S SPECIAL" | 'MAIN COURSE' | 'COMBOS' | 'DRINKS';

interface AppState {
  loaded: boolean;
  loadingProgress: number;
  soundOn: boolean;
  activeFish: string | null;
  activeFlavorIndex: number;
  cursorMode: CursorMode;
  cursorLabel: string | null;
  plate: PlateConfig;
  cart: CartItem[];
  cartOpen: boolean;
  menuFilter: MenuFilter;
  searchQuery: string;
  lang: Lang;

  setLoaded: (v: boolean) => void;
  setLoadingProgress: (v: number) => void;
  toggleSound: () => void;
  setActiveFish: (f: string | null) => void;
  setActiveFlavorIndex: (i: number) => void;
  nextFlavor: () => void;
  prevFlavor: () => void;
  setCursor: (m: CursorMode, label?: string | null) => void;
  setSeafood: (s: Seafood) => void;
  setStyle: (s: Style) => void;
  setDrink: (d: Drink) => void;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: string) => void;
  setCartOpen: (v: boolean) => void;
  setMenuFilter: (f: MenuFilter) => void;
  setSearchQuery: (q: string) => void;
  setLang: (l: Lang) => void;
}

export const useStore = create<AppState>((set) => ({
  loaded: true,
  loadingProgress: 100,
  soundOn: false,
  activeFish: null,
  activeFlavorIndex: 0,
  cursorMode: 'default',
  cursorLabel: null,
  plate: { seafood: 'Pomfret', style: 'Fry', drink: 'Kokum Sarbat' },
  cart: [],
  cartOpen: false,
  menuFilter: 'ALL',
  searchQuery: '',
  lang: 'en',

  setLoaded: (v) => set({ loaded: v }),
  setLoadingProgress: (v) => set({ loadingProgress: v }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  setActiveFish: (f) => set({ activeFish: f }),
  setActiveFlavorIndex: (i) => set({ activeFlavorIndex: (i + SIGNATURE_FLAVORS.length) % SIGNATURE_FLAVORS.length }),
  nextFlavor: () => set((s) => ({ activeFlavorIndex: (s.activeFlavorIndex + 1) % SIGNATURE_FLAVORS.length })),
  prevFlavor: () =>
    set((s) => ({
      activeFlavorIndex: (s.activeFlavorIndex - 1 + SIGNATURE_FLAVORS.length) % SIGNATURE_FLAVORS.length
    })),
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
  setSearchQuery: (q) => set({ searchQuery: q }),
  setLang: (l) => set({ lang: l })
}));

export function plateTotal(plate: PlateConfig): number {
  const base: Record<Seafood, number> = { Pomfret: 399, Surmai: 399, Bangda: 240, Prawns: 399, Crab: 399 };
  const drink: Record<Drink, number> = { 'Kokum Sarbat': 99, 'Sol Kadi': 99 };
  return base[plate.seafood] + drink[plate.drink];
}
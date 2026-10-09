import { create } from 'zustand';
import type { Lang } from '../i18n/translations';
import { menu, type MenuItem, type MenuCategory } from '../data/menu';

export type { MenuItem, MenuCategory };

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

// Admin & Coupons Types
export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt?: string;
  isActive: boolean;
  usageCount: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedPrepMinutes: number;
  paymentMethod: 'Cash on Delivery' | 'UPI / Online' | 'Zomato Direct';
  notes?: string;
}

export type KitchenStatus = 'open' | 'busy' | 'closed';

type CursorMode = 'default' | 'explore' | 'taste' | 'open' | 'drag';

export type MenuFilter = 'ALL' | "CHEF'S SPECIAL" | 'MAIN COURSE' | 'COMBOS' | 'DRINKS';

// LocalStorage Persistence Keys
const STORAGE_KEYS = {
  MENU: 'quickcrave_menu_items_v2',
  COUPONS: 'quickcrave_coupons_v2',
  ORDERS: 'quickcrave_orders_v2',
  KITCHEN: 'quickcrave_kitchen_status_v2',
  ADMIN_AUTH: 'quickcrave_admin_auth_v2',
  ADMIN_PASS: 'quickcrave_admin_passcode_v2'
};

const DEFAULT_PASSCODE = 'quickcrave2024';

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'MALVANI20',
    description: '20% off on all coastal favorites up to ₹150',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 499,
    maxDiscount: 150,
    expiresAt: '2026-12-31',
    isActive: true,
    usageCount: 48
  },
  {
    id: 'c-2',
    code: 'COASTAL100',
    description: 'Flat ₹100 off on Grand Thali & Feast orders',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 699,
    expiresAt: '2026-12-31',
    isActive: true,
    usageCount: 82
  },
  {
    id: 'c-3',
    code: 'SOLKADI50',
    description: 'Flat ₹50 off on fresh coolers & starters',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 299,
    expiresAt: '2026-11-30',
    isActive: true,
    usageCount: 35
  },
  {
    id: 'c-4',
    code: 'FESTIVE15',
    description: 'Special 15% discount for weekend feasts',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 550,
    maxDiscount: 200,
    expiresAt: '2026-12-31',
    isActive: true,
    usageCount: 21
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'QC-1084',
    customerName: 'Amit Deshmukh',
    customerPhone: '+91 97690 44556',
    deliveryAddress: '14B, Samudra Mahal, Worli Sea Face, Mumbai',
    items: [
      { id: 'pomfret-feast', name: 'The Pomfret Coastal Feast', price: 499, qty: 1, category: 'COMBOS' },
      { id: 'sol-kadi', name: 'Sol Kadi', price: 99, qty: 2, category: 'DRINKS' }
    ],
    subtotal: 697,
    discount: 100,
    couponCode: 'COASTAL100',
    total: 597,
    status: 'pending',
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    estimatedPrepMinutes: 25,
    paymentMethod: 'UPI / Online',
    notes: 'Extra spicy curry please. Ring bell once.'
  },
  {
    id: 'ord-2',
    orderNumber: 'QC-1083',
    customerName: 'Sneha Patil',
    customerPhone: '+91 98192 67890',
    deliveryAddress: 'Plot 12, Perry Cross Rd, Bandra West, Mumbai',
    items: [
      { id: 'surmai-fry', name: 'Surmai Fry', price: 349, qty: 2, category: "CHEF'S SPECIAL" },
      { id: 'kokum-sarbat', name: 'Kokum Sherbet', price: 79, qty: 2, category: 'DRINKS' }
    ],
    subtotal: 856,
    discount: 150,
    couponCode: 'MALVANI20',
    total: 706,
    status: 'preparing',
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    estimatedPrepMinutes: 20,
    paymentMethod: 'Cash on Delivery',
    notes: 'Please pack green chutney separately.'
  },
  {
    id: 'ord-3',
    orderNumber: 'QC-1082',
    customerName: 'Rahul Kulkarni',
    customerPhone: '+91 98201 12345',
    deliveryAddress: 'Flat 402, Sea View Apts, Ranade Rd, Dadar West, Mumbai',
    items: [
      { id: 'pomfret-fry', name: 'Pomfret Fry', price: 399, qty: 1, category: "CHEF'S SPECIAL" },
      { id: 'fish-curry-thali', name: 'Fish Curry Thali', price: 420, qty: 1, category: 'COMBOS' },
      { id: 'sol-kadi', name: 'Sol Kadi', price: 99, qty: 1, category: 'DRINKS' }
    ],
    subtotal: 918,
    discount: 0,
    total: 918,
    status: 'out_for_delivery',
    createdAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
    estimatedPrepMinutes: 15,
    paymentMethod: 'UPI / Online'
  },
  {
    id: 'ord-4',
    orderNumber: 'QC-1081',
    customerName: 'Ananya Rao',
    customerPhone: '+91 98210 99887',
    deliveryAddress: '804, Ocean Heights, Prabhadevi, Mumbai',
    items: [
      { id: 'prawns-sukka', name: 'Prawns Sukka', price: 399, qty: 1, category: 'MAIN COURSE' },
      { id: 'surmai-curry', name: 'Surmai Curry', price: 399, qty: 1, category: 'MAIN COURSE' }
    ],
    subtotal: 798,
    discount: 100,
    couponCode: 'COASTAL100',
    total: 698,
    status: 'delivered',
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    estimatedPrepMinutes: 0,
    paymentMethod: 'Cash on Delivery'
  }
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

// Prepare initial menu with inStock and discounts
const initialMenuItems: MenuItem[] = menu.map((m) => {
  if (m.id === 'surmai-fry') {
    return { ...m, inStock: true, discountPrice: 349, ordersCount: 142 };
  }
  if (m.id === 'pomfret-feast') {
    return { ...m, inStock: true, discountPrice: 499, ordersCount: 88 };
  }
  if (m.id === 'crab-masala') {
    return { ...m, inStock: true, discountPrice: 420, ordersCount: 54 };
  }
  return { ...m, inStock: true, ordersCount: Math.floor(Math.random() * 40) + 15 };
});

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

  // Admin & Kitchen State
  menuItems: MenuItem[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  orders: Order[];
  kitchenStatus: KitchenStatus;
  isAdminAuthenticated: boolean;
  adminPasscode: string;

  // Actions
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
  clearCart: () => void;
  setCartOpen: (v: boolean) => void;
  setMenuFilter: (f: MenuFilter) => void;
  setSearchQuery: (q: string) => void;
  setLang: (l: Lang) => void;

  // Admin actions
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleStock: (id: string) => void;
  resetMenuToDefault: () => void;

  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  toggleCoupon: (id: string) => void;
  applyCoupon: (code: string, subtotal: number) => { success: boolean; message: string; discount: number };
  removeCoupon: () => void;

  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  simulateOrder: () => Order;

  setKitchenStatus: (status: KitchenStatus) => void;
  authenticateAdmin: (pwd: string, remember?: boolean) => boolean;
  logoutAdmin: () => void;
  updatePasscode: (newPwd: string) => void;
  resetAllDemoData: () => void;
}

export const useStore = create<AppState>((set, get) => {
  // Read initial states from storage or fallback
  const storedMenu = loadFromStorage<MenuItem[]>(STORAGE_KEYS.MENU, initialMenuItems);
  const storedCoupons = loadFromStorage<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  const storedOrders = loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const storedKitchen = loadFromStorage<KitchenStatus>(STORAGE_KEYS.KITCHEN, 'open');
  const storedAuth = loadFromStorage<boolean>(STORAGE_KEYS.ADMIN_AUTH, false);
  const storedPasscode = loadFromStorage<string>(STORAGE_KEYS.ADMIN_PASS, DEFAULT_PASSCODE);

  return {
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

    menuItems: storedMenu,
    coupons: storedCoupons,
    appliedCoupon: null,
    couponDiscount: 0,
    orders: storedOrders,
    kitchenStatus: storedKitchen,
    isAdminAuthenticated: storedAuth,
    adminPasscode: storedPasscode,

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
        const newCart = exists
          ? s.cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
          : [...s.cart, { ...item, qty: 1 }];

        // Re-calculate coupon discount if applied
        let discount = 0;
        const subtotal = newCart.reduce((sum, it) => sum + it.price * it.qty, 0);
        if (s.appliedCoupon) {
          if (subtotal >= s.appliedCoupon.minOrderValue) {
            discount =
              s.appliedCoupon.discountType === 'percentage'
                ? Math.round((subtotal * s.appliedCoupon.discountValue) / 100)
                : s.appliedCoupon.discountValue;
            if (s.appliedCoupon.maxDiscount && discount > s.appliedCoupon.maxDiscount) {
              discount = s.appliedCoupon.maxDiscount;
            }
          } else {
            // Cart dropped below min order value
            return { cart: newCart, appliedCoupon: null, couponDiscount: 0 };
          }
        }
        return { cart: newCart, couponDiscount: discount };
      }),
    removeFromCart: (id) =>
      set((s) => {
        const newCart = s.cart
          .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
          .filter((c) => c.qty > 0);

        let discount = 0;
        let coupon = s.appliedCoupon;
        const subtotal = newCart.reduce((sum, it) => sum + it.price * it.qty, 0);
        if (coupon) {
          if (subtotal >= coupon.minOrderValue) {
            discount =
              coupon.discountType === 'percentage'
                ? Math.round((subtotal * coupon.discountValue) / 100)
                : coupon.discountValue;
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
              discount = coupon.maxDiscount;
            }
          } else {
            coupon = null;
            discount = 0;
          }
        }
        return { cart: newCart, appliedCoupon: coupon, couponDiscount: discount };
      }),
    clearCart: () => set({ cart: [], appliedCoupon: null, couponDiscount: 0 }),
    setCartOpen: (v) => set({ cartOpen: v }),
    setMenuFilter: (f) => set({ menuFilter: f }),
    setSearchQuery: (q) => set({ searchQuery: q }),
    setLang: (l) => set({ lang: l }),

    // Admin Menu CRUD
    addMenuItem: (itemData) =>
      set((s) => {
        const id = itemData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
        const newItem: MenuItem = {
          ...itemData,
          id,
          inStock: itemData.inStock ?? true,
          ordersCount: 0
        };
        const updated = [newItem, ...s.menuItems];
        saveToStorage(STORAGE_KEYS.MENU, updated);
        return { menuItems: updated };
      }),

    updateMenuItem: (id, updates) =>
      set((s) => {
        const updated = s.menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item));
        saveToStorage(STORAGE_KEYS.MENU, updated);
        return { menuItems: updated };
      }),

    deleteMenuItem: (id) =>
      set((s) => {
        const updated = s.menuItems.filter((item) => item.id !== id);
        saveToStorage(STORAGE_KEYS.MENU, updated);
        return { menuItems: updated };
      }),

    toggleStock: (id) =>
      set((s) => {
        const updated = s.menuItems.map((item) =>
          item.id === id ? { ...item, inStock: !(item.inStock ?? true) } : item
        );
        saveToStorage(STORAGE_KEYS.MENU, updated);
        return { menuItems: updated };
      }),

    resetMenuToDefault: () => {
      saveToStorage(STORAGE_KEYS.MENU, initialMenuItems);
      set({ menuItems: initialMenuItems });
    },

    // Coupons CRUD & Engine
    addCoupon: (couponData) =>
      set((s) => {
        const id = 'c-' + Date.now().toString().slice(-5);
        const newCoupon: Coupon = {
          ...couponData,
          id,
          code: couponData.code.toUpperCase().trim(),
          usageCount: 0,
          isActive: couponData.isActive ?? true
        };
        const updated = [newCoupon, ...s.coupons];
        saveToStorage(STORAGE_KEYS.COUPONS, updated);
        return { coupons: updated };
      }),

    updateCoupon: (id, updates) =>
      set((s) => {
        const updated = s.coupons.map((c) =>
          c.id === id
            ? { ...c, ...updates, code: updates.code ? updates.code.toUpperCase().trim() : c.code }
            : c
        );
        saveToStorage(STORAGE_KEYS.COUPONS, updated);
        return { coupons: updated };
      }),

    deleteCoupon: (id) =>
      set((s) => {
        const updated = s.coupons.filter((c) => c.id !== id);
        saveToStorage(STORAGE_KEYS.COUPONS, updated);
        return { coupons: updated };
      }),

    toggleCoupon: (id) =>
      set((s) => {
        const updated = s.coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
        saveToStorage(STORAGE_KEYS.COUPONS, updated);
        return { coupons: updated };
      }),

    applyCoupon: (code, subtotal) => {
      const state = get();
      const cleanCode = code.toUpperCase().trim();
      const match = state.coupons.find((c) => c.code === cleanCode && c.isActive);

      if (!match) {
        return { success: false, message: 'Invalid or inactive coupon code.', discount: 0 };
      }

      if (match.expiresAt && new Date(match.expiresAt).getTime() < Date.now()) {
        return { success: false, message: 'This coupon has expired.', discount: 0 };
      }

      if (subtotal < match.minOrderValue) {
        return {
          success: false,
          message: `Minimum order value of ₹${match.minOrderValue} required for this coupon.`,
          discount: 0
        };
      }

      let discount =
        match.discountType === 'percentage'
          ? Math.round((subtotal * match.discountValue) / 100)
          : match.discountValue;

      if (match.maxDiscount && discount > match.maxDiscount) {
        discount = match.maxDiscount;
      }

      // Increment usage count in state & storage
      const updatedCoupons = state.coupons.map((c) =>
        c.id === match.id ? { ...c, usageCount: c.usageCount + 1 } : c
      );
      saveToStorage(STORAGE_KEYS.COUPONS, updatedCoupons);

      set({
        coupons: updatedCoupons,
        appliedCoupon: match,
        couponDiscount: discount
      });

      return {
        success: true,
        message: `Coupon ${match.code} applied! Saved ₹${discount}.`,
        discount
      };
    },

    removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0 }),

    // Orders Management
    addOrder: (newOrder) =>
      set((s) => {
        const updated = [newOrder, ...s.orders];
        saveToStorage(STORAGE_KEYS.ORDERS, updated);
        return { orders: updated };
      }),

    updateOrderStatus: (id, status) =>
      set((s) => {
        const updated = s.orders.map((ord) => (ord.id === id ? { ...ord, status } : ord));
        saveToStorage(STORAGE_KEYS.ORDERS, updated);
        return { orders: updated };
      }),

    deleteOrder: (id) =>
      set((s) => {
        const updated = s.orders.filter((ord) => ord.id !== id);
        saveToStorage(STORAGE_KEYS.ORDERS, updated);
        return { orders: updated };
      }),

    simulateOrder: () => {
      const state = get();
      const randomNames = [
        'Kavita Jadhav',
        'Sachin Tendulkar',
        'Tanvi Sawant',
        'Rohan Mhatre',
        'Prathamesh Parab',
        'Aditi Salunkhe',
        'Mahesh Bane'
      ];
      const randomAreas = [
        'Shivaji Park, Dadar West, Mumbai',
        'Carter Road, Bandra West, Mumbai',
        'Chowpatty, Marine Drive, Mumbai',
        'Seven Bungalows, Andheri West, Mumbai',
        'Portuguese Church, Dadar West, Mumbai',
        'Hindu Colony, Dadar East, Mumbai'
      ];

      const availableItems = state.menuItems.length > 0 ? state.menuItems : initialMenuItems;
      const randomItem1 = availableItems[Math.floor(Math.random() * availableItems.length)];
      const randomItem2 = availableItems[Math.floor(Math.random() * availableItems.length)];

      const item1Price = randomItem1.discountPrice || randomItem1.price;
      const item2Price = randomItem2.discountPrice || randomItem2.price;

      const orderItems: OrderItem[] = [
        {
          id: randomItem1.id,
          name: randomItem1.name,
          price: item1Price,
          qty: 1,
          category: randomItem1.category
        }
      ];

      if (randomItem2.id !== randomItem1.id) {
        orderItems.push({
          id: randomItem2.id,
          name: randomItem2.name,
          price: item2Price,
          qty: Math.random() > 0.5 ? 2 : 1,
          category: randomItem2.category
        });
      }

      const subtotal = orderItems.reduce((acc, it) => acc + it.price * it.qty, 0);
      const discount = subtotal > 600 ? 100 : 0;
      const total = subtotal - discount;

      const newOrder: Order = {
        id: 'ord-' + Date.now().toString(),
        orderNumber: 'QC-' + Math.floor(1000 + Math.random() * 9000),
        customerName: randomNames[Math.floor(Math.random() * randomNames.length)],
        customerPhone: '+91 9' + Math.floor(100000000 + Math.random() * 900000000),
        deliveryAddress: randomAreas[Math.floor(Math.random() * randomAreas.length)],
        items: orderItems,
        subtotal,
        discount,
        couponCode: discount > 0 ? 'COASTAL100' : undefined,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedPrepMinutes: 20,
        paymentMethod: Math.random() > 0.5 ? 'UPI / Online' : 'Cash on Delivery',
        notes: Math.random() > 0.6 ? 'Pack sol kadi chilled with extra lime.' : undefined
      };

      const updated = [newOrder, ...state.orders];
      saveToStorage(STORAGE_KEYS.ORDERS, updated);
      set({ orders: updated });
      return newOrder;
    },

    setKitchenStatus: (status) => {
      saveToStorage(STORAGE_KEYS.KITCHEN, status);
      set({ kitchenStatus: status });
    },

    authenticateAdmin: (pwd, remember = true) => {
      const state = get();
      if (pwd === state.adminPasscode) {
        if (remember) {
          saveToStorage(STORAGE_KEYS.ADMIN_AUTH, true);
        }
        set({ isAdminAuthenticated: true });
        return true;
      }
      return false;
    },

    logoutAdmin: () => {
      saveToStorage(STORAGE_KEYS.ADMIN_AUTH, false);
      set({ isAdminAuthenticated: false });
    },

    updatePasscode: (newPwd) => {
      saveToStorage(STORAGE_KEYS.ADMIN_PASS, newPwd);
      set({ adminPasscode: newPwd });
    },

    resetAllDemoData: () => {
      saveToStorage(STORAGE_KEYS.MENU, initialMenuItems);
      saveToStorage(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
      saveToStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      saveToStorage(STORAGE_KEYS.KITCHEN, 'open');
      set({
        menuItems: initialMenuItems,
        coupons: INITIAL_COUPONS,
        orders: INITIAL_ORDERS,
        kitchenStatus: 'open'
      });
    }
  };
});

export function plateTotal(plate: PlateConfig): number {
  const base: Record<Seafood, number> = { Pomfret: 399, Surmai: 399, Bangda: 240, Prawns: 399, Crab: 399 };
  const drink: Record<Drink, number> = { 'Kokum Sarbat': 99, 'Sol Kadi': 99 };
  return base[plate.seafood] + drink[plate.drink];
}
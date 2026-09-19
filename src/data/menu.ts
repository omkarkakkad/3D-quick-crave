export type MenuCategory = "CHEF'S SPECIAL" | 'MAIN COURSE' | 'DRINKS';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  description: string;
  visual: string;
  vibes: string[];
  image: string;
}

export const menu: MenuItem[] = [
  // CHEF'S SPECIAL
  { id: 'surmai-fry', name: 'Surmai Fry', price: 399, category: "CHEF'S SPECIAL", description: 'Kingfish marinated in tamarind, chilli & malvani masala — seared crisp on a live flame.', visual: 'surmai', vibes: ['Bold', 'Coastal'], image: '/images/surmai.jpg' },
  { id: 'pomfret-fry', name: 'Pomfret Fry', price: 399, category: "CHEF'S SPECIAL", description: 'The coastal classic. Silver pomfret in a fiery red masala, pan-fried to golden perfection.', visual: 'pomfret', vibes: ['Classic', 'Buttery'], image: '/images/pomfret-fry.jpg' },
  { id: 'ravas-fry', name: 'Ravas Fry', price: 399, category: "CHEF'S SPECIAL", description: 'Delicate ravas fillets, lightly spiced and fried until the edges crisp up beautifully.', visual: 'pomfret', vibes: ['Delicate', 'Flaky'], image: '/images/ravvas.jpg' },
  { id: 'bangda-fry', name: 'Bangda Fry', price: 250, category: "CHEF'S SPECIAL", description: 'Bold. Local. Authentic. Mackerel scored, marinated, and pan-roasted the Konkan way.', visual: 'bangda', vibes: ['Bold', 'Local'], image: '/images/bangda-fry.jpg' },
  { id: 'bombil-fry', name: 'Bombil Fry', price: 280, category: "CHEF'S SPECIAL", description: 'Bombil — dried to concentrate flavour, dusted in rava and fried for that signature crunch.', visual: 'bombil', vibes: ['Crunchy', 'Iconic'], image: '/images/bombil.jpg' },
  { id: 'halva-fry', name: 'Halva Fry', price: 399, category: "CHEF'S SPECIAL", description: 'Halwa — rich, meaty slices of coastal delight, spiced and sealed on a hot tawa.', visual: 'surmai', vibes: ['Rich', 'Meaty'], image: '/images/basa-halva.jpg' },
  { id: 'prawns-fry', name: 'Prawns Fry', price: 399, category: "CHEF'S SPECIAL", description: 'Small catch. Big flavour. Plump prawns tossed in konkani spices and pan-fried.', visual: 'prawns', vibes: ['Juicy', 'Smoky'], image: '/images/prawns.jpg' },
  { id: 'prawns-tandoori', name: 'Prawns Tandoori', price: 399, category: "CHEF'S SPECIAL", description: 'Charred in a clay oven, kissed with smoked spice and a squeeze of lime.', visual: 'prawns', vibes: ['Smoky', 'Charred'], image: '/images/prawns.jpg' },
  // MAIN COURSE
  { id: 'pomfret-malvani', name: 'Pomfret Malvani Curry', price: 399, category: 'MAIN COURSE', description: 'Pomfret simmered in a deep, roasted coconut & malvani masala curry.', visual: 'curry', vibes: ['Coconut', 'Sol-kadi pair'], image: '/images/goan-fish-curry.jpg' },
  { id: 'pomfret-feast', name: 'The Pomfret Coastal Feast', price: 550, category: 'MAIN COURSE', description: 'A whole celebration — pomfret fry, malvani curry, rice and sol kadi.', visual: 'feast', vibes: ['Share', 'Feast'], image: '/images/malvani-thali.jpg' },
  { id: 'bangda-malvani', name: 'Bangda Malvani Curry', price: 240, category: 'MAIN COURSE', description: 'Mackerel in a tangy, tamarind-led malvani curry. Bold and honest.', visual: 'curry', vibes: ['Tangy', 'Bold'], image: '/images/fish-curry-thali.jpg' },
  { id: 'basa-malvani', name: 'Basa Malvani Curry', price: 280, category: 'MAIN COURSE', description: 'Silky basa in a smooth, aromatic coconut-malvani gravy.', visual: 'curry', vibes: ['Silky', 'Mild'], image: '/images/pangasius.jpg' },
  { id: 'prawns-handi', name: 'Prawns Malvani Handi', price: 450, category: 'MAIN COURSE', description: 'Prawns slow-cooked in a handi with roasted spices and coconut milk.', visual: 'handi', vibes: ['Rich', 'Slow-cooked'], image: '/images/prawns.jpg' },
  { id: 'surmai-combo', name: 'The King Surmai Combo', price: 520, category: 'MAIN COURSE', description: 'Surmai in every form — fry, curry, rice and kokum sarbat to cool the fire.', visual: 'combo', vibes: ['King', 'Complete'], image: '/images/goan-thali.jpg' },
  { id: 'basa-box', name: 'The Budget Basa Box', price: 340, category: 'MAIN COURSE', description: 'Smart money, big flavour. Basa curry with rice, done the coastal way.', visual: 'combo', vibes: ['Value', 'Hearty'], image: '/images/pomplet-thali.jpg' },
  { id: 'bangda-exe', name: 'The Bangda Executive Combo', price: 320, category: 'MAIN COURSE', description: 'Bangda fry, curry and rice — a working person\'s coastal power lunch.', visual: 'combo', vibes: ['Power', 'Lunch'], image: '/images/bangda-fry.jpg' },
  { id: 'crab-gravy', name: 'Crab Gravy (Dry)', price: 399, category: 'MAIN COURSE', description: 'Rich coastal indulgence — crab tossed dry in roasted malvani masala.', visual: 'crab', vibes: ['Rich', 'Indulgent'], image: '/images/crab.jpg' },
  // DRINKS
  { id: 'kokum-sarbat', name: 'Kokum Sarbat', price: 99, category: 'DRINKS', description: 'Tart-sweet kokum steeped in jaggery and spices. The coast in a glass.', visual: 'kokum', vibes: ['Cool', 'Tart'], image: '/images/kokum-drink.jpg' },
  { id: 'sol-kadi', name: 'Sol Kadi', price: 99, category: 'DRINKS', description: 'Coconut milk, kokum and garlic — the legendary digestive after a fiery curry.', visual: 'sol', vibes: ['Cooling', 'Classic'], image: '/images/solkadi.jpg' }
];

export const fishSpecies = {
  surmai: { name: 'SURMAI', tagline: 'King of the Coast', accent: '#35d6c4' },
  pomfret: { name: 'POMFRET', tagline: 'A coastal classic', accent: '#efe3c8' },
  bangda: { name: 'BANGDA', tagline: 'Bold. Local. Authentic.', accent: '#7fb2ff' },
  prawns: { name: 'PRAWNS', tagline: 'Small catch. Big flavour.', accent: '#ff7a45' },
  crab: { name: 'CRAB', tagline: 'Rich coastal indulgence', accent: '#ff5e5b' }
};

export const PHONE_1 = '9920404233';
export const PHONE_2 = '2231520888';

export const zomatoUrl = 'https://www.zomato.com/';
export const whatsappUrl = `https://wa.me/91${PHONE_1}?text=Hi%20QUICK%20CRAVE!%20I%27d%20love%20to%20order%20coastal%20seafood.`;
export const callUrl = `tel:+91${PHONE_1}`;
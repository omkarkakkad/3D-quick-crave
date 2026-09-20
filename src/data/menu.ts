export type MenuCategory = "CHEF'S SPECIAL" | 'MAIN COURSE' | 'DRINKS';

export interface MenuItem {
  id: string;
  name: string;
  nameMr: string;
  price: number;
  category: MenuCategory;
  categoryMr: string;
  description: string;
  descriptionMr: string;
  visual: string;
  vibes: string[];
  vibesMr: string[];
  image: string;
  isCombo?: boolean;
  isBestseller?: boolean;
  spiceLevel?: 1 | 2 | 3;
}

export const menu: MenuItem[] = [
  // CHEFS SPECIAL (8 items)
  {
    id: 'surmai-fry',
    name: 'Surmai Fry',
    nameMr: 'सुरमई फ्राय',
    price: 399,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Fresh Kingfish cutlet marinated in Malvani masala & sour tamarind, pan-seared in semolina rava.',
    descriptionMr: 'मालवणी मसाला आणि आंबट चिंचेमध्ये मॅरीनेट केलेला, गरम लोखंडी तव्यावर कुरकुरीत रव्यामध्ये भाजलेला सुरमईचा तुकडा.',
    visual: 'surmai',
    vibes: ['Crispy Rava', 'Chef Pick'],
    vibesMr: ['कुरकुरीत रवा', 'शेफची पसंती'],
    image: '/images/surmai.jpg',
    isBestseller: true,
    spiceLevel: 3
  },
  {
    id: 'pomfret-fry',
    name: 'Pomfret Fry',
    nameMr: 'पापलेट फ्राय',
    price: 399,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Whole silver pomfret scored, coated in fiery coastal masala, and shallow fried until golden.',
    descriptionMr: 'अक्खा रुपेरी पापलेट, झणझणीत किनारपट्टी मसाल्यात घोळवून कुरकुरीत रव्यामध्ये सुवर्ण रंग येईपर्यंत तळलेला.',
    visual: 'pomfret',
    vibes: ['Coastal Classic', 'Golden Crisp'],
    vibesMr: ['किनारपट्टी क्लासिक', 'सोनेरी कुरकुरीत'],
    image: '/images/pomfret-fry.jpg',
    isBestseller: true,
    spiceLevel: 2
  },
  {
    id: 'ravas-fry',
    name: 'Ravas Fry',
    nameMr: 'रावस फ्राय',
    price: 399,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Delicate Indian salmon fillets rubbed with freshly ground spices and crisped on a hot iron tawa.',
    descriptionMr: 'ताजा इंडियन साल्मन (रावस) तुकडा, ताज्या मसाल्यात घोळवून गरम तव्यावर खरपूस भाजलेला.',
    visual: 'pomfret',
    vibes: ['Delicate', 'Flaky Flesh'],
    vibesMr: ['मऊ लुसलुशीत', 'अस्सल चव'],
    image: '/images/ravvas.jpg',
    spiceLevel: 2
  },
  {
    id: 'bangda-fry',
    name: 'Bangda Fry',
    nameMr: 'बांगडा फ्राय',
    price: 250,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Local coastal mackerel stuffed with spicy recheado-style green masala and rava fried.',
    descriptionMr: 'कोकणी पद्धतीचा ताजा बांगडा, झणझणीत हिरव्या मसाल्याने भरलेला आणि कुरकुरीत रव्यात तळलेला.',
    visual: 'bangda',
    vibes: ['Konkan Local', 'Bold Crunch'],
    vibesMr: ['कोकणी लोकल', 'कुरकुरीत बांगडा'],
    image: '/images/bangda-fry.jpg',
    isBestseller: true,
    spiceLevel: 3
  },
  {
    id: 'bombil-fry',
    name: 'Bombil Fry',
    nameMr: 'बोंबील फ्राय',
    price: 280,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Iconic Bombay Duck, gently flattened, spiced, and fried ultra-crispy outside with tender fish inside.',
    descriptionMr: 'मुंबईचा प्रसिद्ध बोंबील, बाहेरून अतिशय कुरकुरीत आणि आतून लोण्यासारखा मऊ व रसरशीत.',
    visual: 'bombil',
    vibes: ['Crispy Outside', 'Melts Inside'],
    vibesMr: ['बाहेरून कुरकुरीत', 'आतून मऊ'],
    image: '/images/bombil.jpg',
    isBestseller: true,
    spiceLevel: 2
  },
  {
    id: 'halva-fry',
    name: 'Halva Fry',
    nameMr: 'हलवा फ्राय',
    price: 399,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Thick black pomfret / halwa steak marinated with kashmiri red chilli, lemon and coastal garlic.',
    descriptionMr: 'काळा पापलेट (हलवा), काश्मिरी मिरची, लिंबू आणि लसूण मसाल्यात घोळवून तव्यावर फ्राय केलेला.',
    visual: 'surmai',
    vibes: ['Meaty Texture', 'Rich Spices'],
    vibesMr: ['घट्ट मासळी', 'खमंग मसाला'],
    image: '/images/basa-halva.jpg',
    spiceLevel: 2
  },
  {
    id: 'prawns-fry',
    name: 'Prawns Fry',
    nameMr: 'कोळंबी फ्राय',
    price: 399,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Sweet Arabian Sea prawns tossed in freshly roasted spices and crisped to juicy perfection.',
    descriptionMr: 'अरबी समुद्रातील गोड ताज्या कोळंबी, भाजलेल्या मसाल्यात आणि रव्यात खरपूस तळलेल्या.',
    visual: 'prawns',
    vibes: ['Juicy', 'Coastal Garlic'],
    vibesMr: ['रसरशीत कोळंबी', 'किनारपट्टी लसूण'],
    image: '/images/prawns.jpg',
    isBestseller: true,
    spiceLevel: 2
  },
  {
    id: 'prawns-tandoori',
    name: 'Prawns Tandoori',
    nameMr: 'तंदुरी कोळंबी',
    price: 399,
    category: "CHEF'S SPECIAL",
    categoryMr: 'शेफ स्पेशल',
    description: 'Jumbo prawns cured in hung curd and red Malvani masala, charcoal-smoked on skewers.',
    descriptionMr: 'मोठ्या जंबो कोळंबी, घट्ट दही आणि लाल मालवणी मसाल्यात मॅरीनेट करून निखाऱ्यावर भाजलेल्या.',
    visual: 'prawns',
    vibes: ['Charcoal Smoked', 'Spicy Dip'],
    vibesMr: ['कोळशावर भाजलेली', 'झणझणीत चटणी'],
    image: '/images/prawns.jpg',
    spiceLevel: 3
  },

  // MAIN COURSE (9 items)
  {
    id: 'pomfret-malwani',
    name: 'Pomfret Malvani Curry',
    nameMr: 'पापलेट मालवणी कढी',
    price: 399,
    category: 'MAIN COURSE',
    categoryMr: 'किनारपट्टी करी',
    description: 'Tender pomfret simmered in stone-ground roasted coconut and signature Malvani masala broth.',
    descriptionMr: 'दगडी पाट्यावर वाटलेला भाजलेला नारळ आणि खास मालवणी मसाल्यात शिजवलेला ताजा पापलेट.',
    visual: 'curry',
    vibes: ['Roasted Coconut', 'Aromatic'],
    vibesMr: ['भाजलेला नारळ', 'सुवासिक रस्सा'],
    image: '/images/goan-fish-curry.jpg',
    isBestseller: true,
    spiceLevel: 2
  },
  {
    id: 'pomfret-feast',
    name: 'The Pomfret Coastal Feast',
    nameMr: 'द पापलेट कोस्टल दावत',
    price: 550,
    category: 'MAIN COURSE',
    categoryMr: 'थाळी बॉक्स',
    description: 'The ultimate royal coastal thali: Pomfret Fry, Malvani Curry, fragrant Steamed Rice & Sol Kadi.',
    descriptionMr: 'शाही कोकणी थाळी: कुरकुरीत पापलेट फ्राय, मालवणी खोबऱ्याची करी, सुवासिक इंद्रायणी भात आणि पाचक सोलकढी.',
    visual: 'feast',
    vibes: ['Complete Thali', 'Shareable'],
    vibesMr: ['संपूर्ण थाळी', 'मनसोक्त जेवण'],
    image: '/images/malvani-thali.jpg',
    isCombo: true,
    isBestseller: true,
    spiceLevel: 2
  },
  {
    id: 'bangda-malwani',
    name: 'Bangda Malvani Curry',
    nameMr: 'बांगडा मालवणी कढी',
    price: 240,
    category: 'MAIN COURSE',
    categoryMr: 'किनारपट्टी करी',
    description: 'Spicy and tangy mackerel curry cooked with dried kokum petals, fresh coconut milk and coriander.',
    descriptionMr: 'कोकम, ताजा नारळाचा रस आणि कोथिंबीर घालून तयार केलेली आंबट-तिखट मालवणी बांगडा कढी.',
    visual: 'curry',
    vibes: ['Kokum Tang', 'Coastal Soul'],
    vibesMr: ['आंबट-तिखट कोकम', 'अस्सल कोकणी'],
    image: '/images/fish-curry-thali.jpg',
    spiceLevel: 3
  },
  {
    id: 'basa-malwani',
    name: 'Basa Malvani Curry',
    nameMr: 'बासा मालवणी कढी',
    price: 280,
    category: 'MAIN COURSE',
    categoryMr: 'किनारपट्टी करी',
    description: 'Boneless tender basa fillet gently cooked in rich velvety coconut gravy with mild aromatic spices.',
    descriptionMr: 'काटे नसलेला मऊ बासा मासा, नारळाच्या रेशमी रश्श्यामध्ये मंद आचेवर शिजवलेला.',
    visual: 'curry',
    vibes: ['Boneless', 'Silky Coconut'],
    vibesMr: ['बिनकाट्याचा मासा', 'रेशमी नारळ करी'],
    image: '/images/pangasius.jpg',
    spiceLevel: 1
  },
  {
    id: 'prawns-handi',
    name: 'Prawns Malvani Handi',
    nameMr: 'कोळंबी मालवणी हंडी',
    price: 450,
    category: 'MAIN COURSE',
    categoryMr: 'किनारपट्टी करी',
    description: 'Clay pot slow-cooked prawns with whole spices, roasted coconut, onion paste, and fresh curry leaves.',
    descriptionMr: 'मातीच्या हंडीत मंद आचेवर शिजवलेली कोळंबी, खडे मसाले, भाजलेले खोबरे आणि ताजी कढीपत्ता फोडणी.',
    visual: 'handi',
    vibes: ['Clay Pot', 'Rich Gravy'],
    vibesMr: ['मातीची हंडी', 'घट्ट रस्सा'],
    image: '/images/prawns.jpg',
    isBestseller: true,
    spiceLevel: 2
  },
  {
    id: 'surmai-combo',
    name: 'The King Surmai Combo',
    nameMr: 'द किंग सुरमई कॉम्बो',
    price: 520,
    category: 'MAIN COURSE',
    categoryMr: 'थाळी बॉक्स',
    description: 'Crispy Surmai Fry + Rich Surmai Malvani Curry + Indrayani Steamed Rice + Chilled Kokum Sarbat.',
    descriptionMr: 'कुरकुरीत सुरमई फ्राय + सुरमई मालवणी करी + इंद्रायणी भात + थंडगार कोकम सरबत.',
    visual: 'combo',
    vibes: ['Kingfish Combo', 'Feast Box'],
    vibesMr: ['सुरमई कॉम्बो', 'दावत बॉक्स'],
    image: '/images/goan-thali.jpg',
    isCombo: true,
    isBestseller: true,
    spiceLevel: 2
  },
  {
    id: 'basa-box',
    name: 'The Budget Basa Box',
    nameMr: 'द बजेट बासा बॉक्स',
    price: 340,
    category: 'MAIN COURSE',
    categoryMr: 'थाळी बॉक्स',
    description: 'Smart coastal meal: Boneless Basa curry, steamed white rice, salad garnish and Sol Kadi.',
    descriptionMr: 'रोजच्या दुपारच्या जेवणासाठी: बिनकाट्याची बासा करी, गरम भात, कोशिंबीर आणि सोलकढी.',
    visual: 'combo',
    vibes: ['Value Meal', 'Daily Lunch'],
    vibesMr: ['किफायतशीर जेवण', 'रोजचा लंच'],
    image: '/images/pomplet-thali.jpg',
    isCombo: true,
    spiceLevel: 1
  },
  {
    id: 'bangda-exe',
    name: 'The Bangda Executive Combo',
    nameMr: 'द बांगडा एक्झिक्युटिव्ह कॉम्बो',
    price: 320,
    category: 'MAIN COURSE',
    categoryMr: 'थाळी बॉक्स',
    description: 'Crisp Tawa Bangda Fry + Hearty Bangda Malvani Curry + Rice & Kokum accompaniment.',
    descriptionMr: 'कुरकुरीत तवा बांगडा फ्राय + चवदार बांगडा करी + गरम भात आणि पाचक कोकम.',
    visual: 'combo',
    vibes: ['Power Lunch', 'Local Special'],
    vibesMr: ['भरपेट जेवण', 'लोकल स्पेशल'],
    image: '/images/bangda-fry.jpg',
    isCombo: true,
    spiceLevel: 3
  },
  {
    id: 'crab-gravy',
    name: 'Crab Gravy (Dry)',
    nameMr: 'खेकडा मसाला (सुका)',
    price: 399,
    category: 'MAIN COURSE',
    categoryMr: 'किनारपट्टी करी',
    description: 'Fresh mud crab tossed semi-dry in fiery roasted Malvani masala with dark onions and garlic cloves.',
    descriptionMr: 'ताजा खाडीचा खेकडा, कांदा-लसूण आणि भाजलेल्या मालवणी मसाल्यात तव्यावर सुका फ्राय केलेला.',
    visual: 'crab',
    vibes: ['Mud Crab', 'Semi-Dry Sizzle'],
    vibesMr: ['ताजा खेकडा', 'सुका मसाला'],
    image: '/images/crab.jpg',
    isBestseller: true,
    spiceLevel: 3
  },

  // DRINKS (2 items)
  {
    id: 'kokum-sarbat',
    name: 'Kokum Sarbat',
    nameMr: 'कोकम सरबत',
    price: 99,
    category: 'DRINKS',
    categoryMr: 'पाचक पेये',
    description: 'Pure sun-dried wild kokum steeped with roasted cumin, rock salt, and organic jaggery. Refreshing & cooling.',
    descriptionMr: 'रानटी कोकम, भाजलेले जिरे, सैंधव मीठ आणि सेंद्रिय गुळापासून बनवलेले थंडगार पाचक पेय.',
    visual: 'kokum',
    vibes: ['Digestive', 'Wild Kokum'],
    vibesMr: ['पाचक पेय', 'रानटी कोकम'],
    image: '/images/kokum-drink.jpg',
    isBestseller: true,
    spiceLevel: 1
  },
  {
    id: 'sol-kadi',
    name: 'Sol Kadi',
    nameMr: 'सोलकढी',
    price: 99,
    category: 'DRINKS',
    categoryMr: 'पाचक पेये',
    description: 'The soul of Malvan. Freshly pressed coconut milk blended with pure kokum agal, fresh garlic & chillies.',
    descriptionMr: 'मालवणचा प्राण. ताज्या नारळाचे दूध, शुद्ध कोकम आगळ, लसूण आणि हिरवी मिरची घालून तयार केलेली गुलाबी अमृत सोलकढी.',
    visual: 'sol',
    vibes: ['Pink Nectar', 'Cooling Coconut'],
    vibesMr: ['गुलाबी अमृत', 'थंडगार नारळ'],
    image: '/images/solkadi.jpg',
    isBestseller: true,
    spiceLevel: 1
  }
];

export const fishSpecies = {
  surmai: { name: 'SURMAI', nameMr: 'सुरमई', tagline: 'King of the Coast', accent: '#3b82f6' },
  pomfret: { name: 'POMFRET', nameMr: 'पापलेट', tagline: 'A coastal classic', accent: '#60a5fa' },
  bangda: { name: 'BANGDA', nameMr: 'बांगडा', tagline: 'Bold. Local. Authentic.', accent: '#93c5fd' },
  prawns: { name: 'PRAWNS', nameMr: 'कोळंबी', tagline: 'Small catch. Big flavour.', accent: '#f97316' },
  crab: { name: 'CRAB', nameMr: 'खेकडा', tagline: 'Rich coastal indulgence', accent: '#ef4444' }
};

export const PHONE_1 = '9920404232';
export const PHONE_2 = '2231520888';

export const zomatoUrl = 'https://www.zomato.com/';
export const whatsappUrl = `https://wa.me/91${PHONE_1}?text=Hi%20QUICK%20CRAVE!%20I%27d%20love%20to%20order%20from%20your%20menu.`;
export const callUrl = `tel:+91${PHONE_1}`;
export const callUrl2 = `tel:02231520888`;
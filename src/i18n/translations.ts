export type Lang = 'en' | 'hi' | 'mr';

export const langLabels: Record<Lang, string> = {
  en: 'EN',
  hi: 'हिं',
  mr: 'MR (मराठी)',
};

interface Translations {
  [key: string]: Record<Lang, string>;
}

export const t: Translations = {
  // ─── NAVBAR ───
  'nav.announcement': {
    en: 'FREE EXPRESS DELIVERY ON ALL ORDERS VIA ZOMATO · OPEN DAILY 11:30 AM – 11:30 PM',
    hi: 'ज़ोमैटो पर सभी ऑर्डर्स पर मुफ़्त एक्सप्रेस डिलीवरी · रोज़ाना 11:30 AM – 11:30 PM',
    mr: 'झोमॅटोवर सर्व ऑर्डर्सवर मोफत जलद वितरण · दररोज सकाळी ११:३० ते रात्री ११:३०'
  },
  'nav.shop': { en: 'Shop', hi: 'शॉप', mr: 'दुकान' },
  'nav.learn': { en: 'Learn', hi: 'कहानी', mr: 'माहिती' },
  'nav.feastBoxes': { en: 'Feast Boxes', hi: 'थाली बॉक्स', mr: 'थाळी बॉक्स' },
  'nav.callKitchen': { en: 'Call Kitchen', hi: 'रसोई को कॉल करें', mr: 'किचनला कॉल करा' },
  'nav.orderZomato': { en: 'Zomato', hi: 'ज़ोमैटो', mr: 'झोमॅटो' },
  'nav.viewCart': { en: 'View Cart', hi: 'कार्ट देखें', mr: 'ऑर्डर पहा' },
  'nav.items': { en: 'items', hi: 'आइटम', mr: 'पदार्थ' },
  'nav.menu': { en: 'Full Menu', hi: 'पूरा मेनू', mr: 'संपूर्ण मेनू' },
  'nav.featured': { en: 'Featured Flavors & 3D', hi: 'स्पेशल डिश व 3D', mr: 'खास डिश व 3D' },
  'nav.nutrition': { en: 'Catch & Nutrition Facts', hi: 'पोषण व ताज़गी', mr: 'पोषण आणि ताजेपणा तथ्य' },
  'nav.spectrum': { en: 'Flavor Spectrum', hi: 'स्वाद की दुनिया', mr: 'चवींची दुनिया' },

  // ─── HERO 3D ───
  'hero.3dCan': { en: '3D Can', hi: '3D कैन', mr: '3D कॅन' },
  'hero.3dPlatter': { en: '3D Catch Platter', hi: '3D सीज़लिंग थाली', mr: '3D ताजी मासळी थाळी' },
  'hero.prevDish': { en: 'Previous Dish', hi: 'पिछला व्यंजन', mr: 'मागील पदार्थ' },
  'hero.nextDish': { en: 'Next Dish', hi: 'अगला व्यंजन', mr: 'पुढील पदार्थ' },
  'hero.orderOnZomato': { en: 'ORDER ON ZOMATO', hi: 'ज़ोमैटो पर ऑर्डर करें', mr: 'झोमॅटो वरून मागवा' },
  'hero.wildCatchTag': {
    en: '100% WILD CATCH · STONE GROUND MASALAS',
    hi: '100% ताज़ी मछली · सिलबट्टा मसाला',
    mr: '१००% ताजी मासळी · दगडी पाटा मसाला'
  },
  'hero.scrollForMenu': {
    en: 'Scroll for Menu & Ordering',
    hi: 'मेनू और ऑर्डर के लिए नीचे स्क्रॉल करें',
    mr: 'संपूर्ण मेनू व ऑर्डर खाली पहा'
  },

  // ─── PRODUCT DETAILS SECTION ───
  'details.standardPortion': {
    en: "Standard Pack · Chef's Fresh Portion",
    hi: 'स्टैंडर्ड पैक · 2 पीस / 355 मिली',
    mr: 'स्टँडर्ड पॅक · २ तुकडे / ३५५ मिली'
  },
  'details.executiveFeast': {
    en: 'Executive Platter · Double Catch (+₹180)',
    hi: 'एग्जीक्यूटिव थाली · डबल फिश (+₹180)',
    mr: 'एक्झिक्युटिव्ह थाळी · दुप्पट मासा (+₹१८०)'
  },
  'details.familyBox': {
    en: 'Family Box · 4 Pcs Combo (+₹340)',
    hi: 'फैमिली बॉक्स · 4 पीस कॉम्बो (+₹340)',
    mr: 'फॅमिली दावत बॉक्स · ४ तुकडे कॉम्बो (+₹३४०)'
  },
  'details.addToOrder': { en: 'Add to Order', hi: 'ऑर्डर में जोड़ें', mr: 'ऑर्डर मध्ये जोडा' },
  'details.addedToOrder': { en: 'Added to Order!', hi: 'ऑर्डर में जोड़ दिया!', mr: 'ऑर्डर मध्ये जोडले!' },
  'details.zomato': { en: 'Zomato', hi: 'ज़ोमैटो', mr: 'झोमॅटो' },
  'details.badgeWildCatch': { en: '100% WILD CATCH', hi: '100% ताज़ी मछली', mr: '१००% ताजी मासळी' },
  'details.badgeStoneGround': { en: 'STONE GROUND MASALA', hi: 'सिलबट्टा मसाला', mr: 'दगडी पाटा मसाला' },
  'details.badgeCrispyRava': { en: 'CRISPY RAVA CRUST', hi: 'कुरकुरा रवा फ्राई', mr: 'कुरकुरीत रवा फ्राय' },
  'details.badgeZeroPreservatives': { en: 'ZERO PRESERVATIVES', hi: 'शून्य रसायन', mr: 'कोणतीही रसायने नाहीत' },
  'details.lifestyleKicker': {
    en: 'Authentic Malvan Coastal Tradition',
    hi: 'प्रामाणिक मालवणी तटीय परंपरा',
    mr: 'अस्सल मालवणी किनारपट्टी परंपरा'
  },
  'details.lifestyleDesc': {
    en: 'Morning catch from Mumbai Docks, slow cooked with roasted coconut & kokum.',
    hi: 'सुबह 5:30 बजे मुंबई डॉक्स की ताज़ी मछली, भुने नारियल और कोकम के साथ तैयार।',
    mr: 'सकाळच्या ५:३० ची मुंबई बंदरावरील ताजी मासळी, भाजलेला नारळ आणि कोकम घालून तयार.'
  },
  'details.tableTitle': {
    en: 'DAILY VALUE & FRESHNESS FACTS',
    hi: 'दैनिक मूल्य एवं ताज़गी तथ्य',
    mr: 'दैनिक मूल्य आणि ताजेपणा तथ्य'
  },
  'details.tableContent': { en: 'Content', hi: 'घटक', mr: 'घटक' },
  'details.tableAmount': { en: 'Amount', hi: 'मात्रा', mr: 'प्रमाण' },
  'details.tableDailyValue': { en: 'Daily Value', hi: 'दैनिक मूल्य', mr: 'दैनिक मूल्य' },
  'details.calories': { en: 'Calories', hi: 'कैलोरी', mr: 'कॅलरी' },
  'details.omega3': { en: 'Omega-3 Fatty Acids', hi: 'ओमेगा-3 फैटी एसिड', mr: 'ओमेगा-३ फॅटी ऍसिड' },
  'details.protein': { en: 'Protein', hi: 'प्रोटीन', mr: 'प्रथिने (प्रोटीन)' },
  'details.carbs': { en: 'Carbohydrates', hi: 'कार्बोहाइड्रेट्स', mr: 'कर्बोदके (कार्ब्स)' },
  'details.sodium': { en: 'Sodium (Sea Salt)', hi: 'सोडियम (समुद्री नमक)', mr: 'सोडियम (समुद्री मीठ)' },
  'details.sourcingTime': { en: 'Dockside Sourcing Time', hi: 'बंदरगाह से आने का समय', mr: 'बंदरकिनारी निवड वेळ' },
  'details.preservatives': { en: 'Preservatives / Additives', hi: 'प्रिज़र्वेटिव्स / रसायन', mr: 'प्रिझर्व्हेटिव्ह्ज / रसायने' },
  'details.freshDaily': { en: '100% Fresh', hi: '100% ताज़ा', mr: '१००% ताजे' },
  'details.wild': { en: '100% Wild', hi: '100% प्राकृतिक', mr: '१००% नैसर्गिक' },

  // ─── COLOR BLOCK SHOWCASE ───
  'showcase.drinkTag': { en: 'COASTAL DRINK', hi: 'तटीय पेय', mr: 'किनारपट्टी पेय' },
  'showcase.chefsSpecialTag': { en: "CHEF'S SPECIAL · ₹399", hi: 'शेफ स्पेशल · ₹399', mr: 'शेफ स्पेशल · ₹३९९' },
  'showcase.viewDishOrder': { en: 'View Dish & Order', hi: 'डिश देखें और ऑर्डर करें', mr: 'डिश पहा आणि ऑर्डर करा' },
  'showcase.discoverProduct': { en: 'Discover this product', hi: 'डिश एक्सप्लोर करें', mr: 'डीश पहा आणि मागवा' },

  // ─── COMBOS HIGHLIGHT ───
  'combos.kicker': { en: 'Complete Meal Boxes', hi: 'संपूर्ण थाली बॉक्स', mr: 'संपूर्ण थाळी बॉक्स' },
  'combos.title': { en: 'Coastal Feasts & Combos', hi: 'तटीय दावत और कॉम्बो', mr: 'किनारपट्टी दावत आणि कॉम्बो' },
  'combos.desc': {
    en: 'The full Malvani dining experience packed in sealed, spill-proof meal boxes. Pan-fried catch, homestyle coconut curry, Indrayani rice, and cooling Sol Kadi.',
    hi: 'सुरक्षित, सीलबंद बॉक्स में पूरा मालवणी भोजन। तवा फ्राई मछली, नारियल की करी, इंद्रायणी चावल और पाचक सोलकढ़ी।',
    mr: 'अस्सल मालवणी जेवणाचा अनुभव सुरक्षित, सीलबंद बॉक्समध्ये. तवा फ्राय मासा, घरगुती नारळ करी, इंद्रायणी भात आणि पाचक सोलकढी.'
  },
  'combos.fullFeast': { en: 'Full Feast', hi: 'पूरी थाली', mr: 'संपूर्ण थाळी' },
  'combos.bestValue': { en: 'Best Value', hi: 'सर्वोत्तम डील', mr: 'उत्कृष्ट मूल्य' },
  'combos.addBox': { en: 'Add Feast Box', hi: 'थाली बॉक्स जोड़ें', mr: 'थाळी बॉक्स जोडा' },
  'combos.added': { en: 'Added', hi: 'जोड़ दिया', mr: 'जोडले' },
  'combos.orderZomato': { en: 'Order on Zomato', hi: 'ज़ोमैटो पर मंगाएं', mr: 'झोमॅटोवर मागवा' },

  // ─── SOURCING STORY ───
  'story.kicker': { en: 'The Malvani Standard', hi: 'मालवणी मानक', mr: 'अस्सल मालवणी मानके' },
  'story.title': { en: 'Food that connects you to the coast.', hi: 'भोजन जो आपको समुद्र से जोड़े।', mr: 'सागराशी जोडणारे अस्सल अन्न.' },
  'story.desc': {
    en: 'We believe in whole ingredients, transparency, and honoring centuries of Konkan coastal heritage in every pan-fried fillet and clay pot curry.',
    hi: 'हम शुद्ध सामग्री, पारदर्शिता और कोंकण तट की सदियों पुरानी विरासत का सम्मान करते हैं।',
    mr: 'आम्ही शुद्ध घटकांवर, पारदर्शकतेवर आणि कोकण किनारपट्टीच्या शतकानुशतके जुन्या वारशावर विश्वास ठेवतो.'
  },
  'story.p1Title': { en: 'Harbor-to-Kitchen Catch', hi: 'बंदरगाह से सीधे रसोई', mr: 'बंदर ते स्वयंपाकघर' },
  'story.p1Desc': {
    en: 'Silver pomfret, king surmai, and sweet Arabian prawns selected at dawn directly from coastal docks.',
    hi: 'चांदी सा पोम्फ्रेट, किंग सुरमई और मीठे झींगे सुबह-सुबह सीधे तट से चुने जाते हैं।',
    mr: 'रुपरी पापलेट, सुरमई आणि अरबी समुद्रातील कोळंबी पहाटे थेट बंदरावरून निवडली जाते.'
  },
  'story.p1Badge': { en: 'Daily Morning Catch', hi: 'रोज सुबह की ताज़ी मछली', mr: 'दररोज सकाळची ताजी मासळी' },
  'story.p2Title': { en: 'Stone-Ground Malvani Masala', hi: 'सिलबट्टे पर पिसा मालवणी मसाला', mr: 'दगडी पाटा मालवणी मसाला' },
  'story.p2Desc': {
    en: 'Whole spices slow-roasted over firewood, ground by hand with roasted coconut and dried tamarind.',
    hi: 'धीमी आंच पर भुने खड़े मसाले, भुना नारियल और इमली सिलबट्टे पर हाथ से पीसे जाते हैं।',
    mr: 'लाकडाच्या चुलीवर भाजलेले खडे मसाले, भाजलेला नारळ आणि चिंच हाताने दगडी पाट्यावर वाटून तयार.'
  },
  'story.p2Badge': { en: 'Authentic Konkan Recipe', hi: 'प्रामाणिक कोंकणी विधि', mr: 'अस्सल कोकणी पाककृती' },
  'story.p3Title': { en: 'Wild Kokum & Pressed Coconut', hi: 'जंगली कोकम और ताज़ा नारियल दूध', mr: 'रानटी कोकम आणि नारळाचे दूध' },
  'story.p3Desc': {
    en: 'Natural souring through wild red kokum agal and fresh coconut milk pressed in-house every morning.',
    hi: 'लाल कोकम आगळ की प्राकृतिक खटास और रोज़ सुबह रसोई में निकाला गया नारियल का दूध।',
    mr: 'रानटी लाल कोकम आगळ आणि स्वयंपाकघरात दररोज सकाळी ताजे काढलेले नारळाचे दूध.'
  },
  'story.p3Badge': { en: 'Zero Artificial Preservatives', hi: 'कोई कृत्रिम रसायन नहीं', mr: 'कोणतीही कृत्रिम रसायने नाहीत' },
  'story.scratch': { en: 'Made from Scratch', hi: 'घर जैसा ताज़ा', mr: 'ताजे तयार' },

  // ─── ARCHED BANNER ───
  'arch.title': { en: 'ONLY THE BEST', hi: 'सिर्फ सर्वोत्तम', mr: 'फक्त सर्वोत्तम' },
  'arch.badge': { en: 'WITHOUT THE COMPROMISE', hi: 'बिना किसी समझौते के', mr: 'कोणतीही तडजोड नाही' },
  'arch.desc': {
    en: 'A gentle wave of pure coastal flavor. Sourced daily from local Mumbai docks at dawn, hand-marinated in stone-ground Malvani spices and crisp golden semolina rava. Zero preservatives, zero shortcuts.',
    hi: 'शुद्ध तटीय स्वाद की एक सुंदर लहर। सुबह-सुबह मुंबई डॉक्स से ताज़ी मछली, सिलबट्टे के मालवणी मसाले और कुरकुरा सूजी रवा। कोई रसायन नहीं, कोई शॉर्टकट नहीं।',
    mr: 'अस्सल किनारपट्टी चवीची एक सुंदर लाट. पहाटे मुंबई बंदरावरून ताजी आणलेली मासळी, दगडी पाट्यावरील मालवणी मसाले आणि कुरकुरीत सुवर्ण रवा. कोणतीही रसायने नाहीत, कोणताही शॉर्टकट नाही.'
  },

  // ─── MENU SECTION ───
  'menu.kicker': {
    en: 'DISCOVER THE FULL SPREAD · PREPPED DAILY',
    hi: 'पूरा मेनू देखें · रोज़ ताज़ा तैयार',
    mr: 'संपूर्ण मेनू पहा · दररोज ताजे तयार'
  },
  'menu.title': { en: 'Our Coastal Menu', hi: 'हमारा तटीय मेनू', mr: 'आमचा किनारपट्टी मेनू' },
  'menu.desc': {
    en: 'Whole wild catch pan-seared in golden rava, slow-cooked coconut broths, and cooling kokum infusions.',
    hi: 'तवे पर कुरकुरी भुनी मछली, धीमी आंच पर पकी नारियल करी और ताज़ा कोकम शरबत।',
    mr: 'तव्यावर कुरकुरीत भाजलेली ताजी मासळी, मंद आचेवर शिजवलेली नारळाची करी आणि थंडगार कोकम सरबत.'
  },
  'menu.searchPlaceholder': {
    en: 'Search dish, fish, curry...',
    hi: 'डिश, मछली, करी खोजें...',
    mr: 'डिश, मासा, करी शोधा...'
  },
  'menu.clear': { en: 'Clear', hi: 'हटाएं', mr: 'साफ करा' },
  'menu.all': { en: 'All Items', hi: 'सभी व्यंजन', mr: 'सर्व पदार्थ' },
  'menu.chefSpecials': { en: "Chef's Specials", hi: 'शेफ स्पेशल', mr: 'शेफ स्पेशल' },
  'menu.coastalCurries': { en: 'Coastal Curries', hi: 'तटीय करी', mr: 'किनारपट्टी करी' },
  'menu.feastBoxes': { en: 'Feast Boxes', hi: 'थाली बॉक्स', mr: 'थाळी बॉक्स' },
  'menu.drinks': { en: 'Digestives & Drinks', hi: 'पाचक पेय', mr: 'पाचक पेये' },
  'menu.bestseller': { en: 'Bestseller', hi: 'लोकप्रिय', mr: 'लोकप्रिय' },
  'menu.price': { en: 'Price', hi: 'कीमत', mr: 'किंमत' },
  'menu.add': { en: 'Add', hi: 'जोड़ें', mr: 'जोडा' },
  'menu.added': { en: 'Added', hi: 'जोड़ दिया', mr: 'जोडले' },
  'menu.noResults': { en: 'No dishes match', hi: 'कोई व्यंजन नहीं मिला', mr: 'कोणतेही पदार्थ सापडले नाहीत' },
  'menu.resetFilters': { en: 'Reset Filters', hi: 'फ़िल्टर रीसेट करें', mr: 'फिल्टर रीसेट करा' },

  // ─── ZOMATO ORDER BANNER ───
  'order.badge': {
    en: 'DIRECT ORDERING & EXPRESS DELIVERY',
    hi: 'सीधा ऑर्डर एवं एक्सप्रेस डिलीवरी',
    mr: 'थेट ऑर्डर आणि जलद वितरण'
  },
  'order.title': {
    en: 'Hot, fresh coastal seafood delivered to your table.',
    hi: 'गरमागरम, ताज़ा समुद्री भोजन सीधे आपकी मेज़ तक।',
    mr: 'गरमागरम, ताजे सागरी अन्न थेट तुमच्या दारापर्यंत.'
  },
  'order.desc': {
    en: 'Available daily on Zomato with sealed thermal packaging. Or call our kitchen hotline directly for custom spice levels, bulk thalis, or self-pickup.',
    hi: 'ज़ोमैटो पर सुरक्षित थर्मल पैकिंग में रोज़ उपलब्ध। या खास तीखेपन, बड़ी थाली और पिकअप के लिए सीधे रसोई पर कॉल करें।',
    mr: 'झोमॅटोवर सुरक्षित सीलबंद पॅकिंगमध्ये दररोज उपलब्ध. किंवा तिखटपणा ठरवण्यासाठी, थाळी आणि सेल्फ-पिकअपसाठी थेट किचनशी संपर्क साधा.'
  },
  'order.zomatoBtn': { en: 'Order on Zomato', hi: 'ज़ोमैटो पर ऑर्डर करें', mr: 'झोमॅटो वरून ऑर्डर करा' },
  'order.whatsappBtn': { en: 'WhatsApp Kitchen', hi: 'व्हाट्सएप रसोई', mr: 'व्हॉट्सॲप किचन' },
  'order.hotline': { en: 'Cloud Kitchen Hotline', hi: 'क्लाउड किचन हेल्पलाइन', mr: 'क्लाउड किचन हेल्पलाइन' },
  'order.openDaily': { en: 'Open Daily', hi: 'रोज़ाना खुला', mr: 'दररोज सुरू' },
  'order.mobileDirect': { en: 'Mobile Direct', hi: 'मोबाइल डायरेक्ट', mr: 'थेट मोबाईल' },
  'order.landline': { en: 'Landline', hi: 'लैंडलाइन', mr: 'लँडलाईन' },
  'order.call': { en: 'Call →', hi: 'कॉल करें →', mr: 'कॉल करा →' },
  'order.timings': {
    en: '11:30 AM – 4:00 PM & 6:30 PM – 11:30 PM Daily',
    hi: 'दोपहर 11:30 – 4:00 एवं शाम 6:30 – 11:30 रोज़ाना',
    mr: 'दररोज दु. ११:३० ते ४:०० व सायं. ६:३० ते ११:३०'
  },
  'order.kitchenNote': {
    en: 'Fresh dockside fish prepped in cloud kitchen',
    hi: 'बंदरगाह से ताज़ी मछली क्लाउड किचन में तैयार',
    mr: 'बंदरावरील ताजी मासळी किचनमध्ये स्वच्छ तयार केली जाते'
  },

  // ─── FOOTER ───
  'footer.desc': {
    en: 'Authentic Malvani coastal seafood. Whole wild catch, stone-ground Konkan masalas, and freshly pressed coconut milk prepared fresh daily.',
    hi: 'प्रामाणिक मालवणी समुद्री भोजन। ताज़ी मछली, सिलबट्टा मसाले और रोज़ सुबह ताज़ा निकाला गया नारियल दूध।',
    mr: 'अस्सल मालवणी सागरी अन्न. ताजी मासळी, दगडी पाटा मसाले आणि दररोज सकाळी ताजे काढलेले नारळाचे दूध.'
  },
  'footer.orderZomato': { en: 'Order on Zomato', hi: 'ज़ोमैटो पर ऑर्डर करें', mr: 'झोमॅटोवर ऑर्डर करा' },
  'footer.whatsappKitchen': { en: 'WhatsApp Kitchen', hi: 'व्हाट्सएप रसोई', mr: 'व्हॉट्सॲप किचन' },
  'footer.menuTitle': { en: 'Coastal Menu', hi: 'तटीय मेनू', mr: 'किनारपट्टी मेनू' },
  'footer.hotlineTitle': { en: 'Kitchen Hotline & Delivery', hi: 'रसोई हेल्पलाइन एवं डिलीवरी', mr: 'किचन हेल्पलाइन आणि डिलिव्हरी' },
  'footer.lunchDinner': {
    en: 'Daily Lunch: 11:30 AM – 4:00 PM\nDaily Dinner: 6:30 PM – 11:30 PM',
    hi: 'दुपहर लंच: 11:30 AM – 4:00 PM\nरात का डिनर: 6:30 PM – 11:30 PM',
    mr: 'दुपारचे जेवण: ११:३० ते ४:००\nरात्रीचे जेवण: ६:३० ते ११:३०'
  },
  'footer.deliveryNote': {
    en: 'Sealed express delivery across Mumbai via Zomato.',
    hi: 'ज़ोमैटो द्वारा पूरे मुंबई में सुरक्षित एक्सप्रेस डिलीवरी।',
    mr: 'झोमॅटो द्वारे संपूर्ण मुंबईमध्ये सुरक्षित जलद वितरण.'
  },
  'footer.tagWild': { en: 'Wild Catch', hi: 'ताज़ी मछली', mr: 'ताजी मासळी' },
  'footer.tagStone': { en: 'Stone Ground', hi: 'सिलबट्टा मसाला', mr: 'दगडी पाटा मसाला' },
  'footer.tagZero': { en: 'Zero Preservatives', hi: 'शून्य रसायन', mr: 'कोणतीही रसायने नाहीत' },

  // ─── CART DRAWER ───
  'cart.orderTitle': { en: 'Your Order', hi: 'आपकी थाली', mr: 'तुमची ऑर्डर' },
  'cart.itemsCount': { en: 'items', hi: 'आइटम', mr: 'पदार्थ' },
  'cart.emptyBag': { en: 'Your bag is empty', hi: 'आपकी थाली खाली है', mr: 'तुमची पिशवी रिकामी आहे' },
  'cart.emptyDesc': {
    en: "Explore our Chef's Specials and Malvani Curries to build your coastal meal!",
    hi: 'अपना तटीय भोजन तैयार करने के लिए हमारे शेफ स्पेशल और मालवणी करी देखें!',
    mr: 'तुमचे अस्सल जेवण तयार करण्यासाठी आमचे शेफ स्पेशल आणि मालवणी करी पहा!'
  },
  'cart.subtotal': { en: 'Estimated Subtotal', hi: 'अनुमानित कुल', mr: 'अंदाजे एकूण रक्कम' },
  'cart.sendWhatsApp': { en: 'Send Order via WhatsApp', hi: 'व्हाट्सएप पर ऑर्डर भेजें', mr: 'व्हॉट्सॲप वर ऑर्डर पाठवा' },
  'cart.orderZomatoDirect': { en: 'Or Order Directly on Zomato', hi: 'या सीधे ज़ोमैटो पर ऑर्डर करें', mr: 'किंवा झोमॅटो वरून थेट ऑर्डर करा' },
  'cart.kitchenSupport': { en: 'Direct kitchen support:', hi: 'सीधा रसोई संपर्क:', mr: 'थेट किचन संपर्क:' },

  // ─── PRODUCT PAGE ───
  'prod.back': {
    en: 'Back to All Flavors & Menu',
    hi: 'सभी व्यंजन एवं मेनू पर वापस जाएं',
    mr: 'सर्व पदार्थ आणि मेनूवर परत जा'
  },
  'prod.heritageKicker': {
    en: 'Malvan Sourcing Heritage',
    hi: 'मालवणी परंपरा और धरोहर',
    mr: 'मालवणी परंपरेचा ठेवा'
  },
  'prod.heritageDesc': {
    en: 'Dockside catch inspected at 5:30 AM. Prepared to order with cold-pressed coconut oil.',
    hi: 'सुबह 5:30 बजे चुनी गई ताज़ी मछली। कोल्ड-प्रेस्ड नारियल तेल में ताज़ा तैयार।',
    mr: 'पहाटे ५:३० ची निवडक ताजी मासळी. अस्सल नारळाच्या तेलात आणि मसाल्यात खास तयार.'
  },
  'prod.chefPortion': {
    en: 'Standard Portion',
    hi: 'स्टैंडर्ड पोर्शन',
    mr: 'मानक भाग'
  },
  'prod.execPlatter': {
    en: 'Executive Feast',
    hi: 'एग्ज़ीक्यूटिव फ़ीस्ट',
    mr: 'एक्झिक्युटिव्ह दावत'
  },
  'prod.famBox': {
    en: 'Family Box',
    hi: 'फ़ैमिली बॉक्स',
    mr: 'कुटुंब बॉक्स'
  },

  // ─── MOBILE ACTIONS & DOCK ───
  'mobile.call': { en: 'Call', hi: 'कॉल', mr: 'कॉल करा' },
  'mobile.whatsapp': { en: 'WhatsApp', hi: 'व्हाट्सएप', mr: 'व्हॉट्सॲप' },
  'mobile.cart': { en: 'Cart', hi: 'कार्ट', mr: 'कार्ट' },
  'mobile.menu': { en: 'Menu', hi: 'मेनू', mr: 'मेनू' },
  'mobile.quickDial': { en: 'Quick Dial Kitchen', hi: 'रसोई को तुरंत कॉल करें', mr: 'किचनला थेट कॉल करा' },
  'mobile.chatWhatsApp': { en: 'Chat on WhatsApp', hi: 'व्हाट्सएप पर चैट करें', mr: 'व्हॉट्सॲपवर चॅट करा' },
  'mobile.orderWhatsApp': { en: 'Order via WhatsApp', hi: 'व्हाट्सएप से ऑर्डर करें', mr: 'व्हॉट्सॲपवर ऑर्डर करा' },
  'mobile.kitchenHours': { en: 'Open Daily: 11:30 AM – 11:00 PM', hi: 'रोज़ खुला: 11:30 AM – 11:00 PM', mr: 'दररोज उघडे: स. ११:३० ते रा. ११:००' },
  'mobile.freshDockCatch': { en: 'Fresh Morning Catch · Mumbai Docks', hi: 'सुबह की ताज़ी मछली · मुंबई डॉक्स', mr: 'दररोज सकाळची ताजी मासळी · मुंबई बंदर' }
};

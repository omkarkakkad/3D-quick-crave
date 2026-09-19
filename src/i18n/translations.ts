export type Lang = 'en' | 'hi' | 'mr';

export const langLabels: Record<Lang, string> = {
  en: 'EN',
  hi: 'हिं',
  mr: 'मरा',
};

interface Translations {
  [key: string]: Record<Lang, string>;
}

export const t: Translations = {
  // ─── NAVBAR ───
  'nav.catch': { en: 'The Catch', hi: 'समुद्री स्पेशल', mr: 'सागरी विशेष' },
  'nav.menu': { en: 'Menu', hi: 'मेनू', mr: 'मेनू' },
  'nav.plate': { en: 'Your Plate', hi: 'आपकी प्लेट', mr: 'तुझी प्लेट' },
  'nav.kitchen': { en: 'Kitchen', hi: 'रसोई', mr: 'स्वयंपाकघर' },
  'nav.journey': { en: 'Journey', hi: 'यात्रा', mr: 'प्रवास' },
  'nav.gallery': { en: 'Gallery', hi: 'गैलरी', mr: 'गॅलरी' },
  'nav.order': { en: 'Order', hi: 'ऑर्डर', mr: 'ऑर्डर' },
  'nav.orderNow': { en: 'Order Now', hi: 'अभी ऑर्डर करें', mr: 'आता ऑर्डर करा' },
  'nav.call': { en: 'Call', hi: 'कॉल', mr: 'कॉल' },
  'nav.coastal': { en: 'Coastal Seafood', hi: 'तटीय समुद्री भोजन', mr: 'किनारपट्टी सागरी अन्न' },

  // ─── LOADING ───
  'loading.text': { en: 'Freshness begins beneath the waves.', hi: 'ताजगी लहरों के नीचे शुरू होती है।', mr: 'ताजेपणा लाटांखाली सुरू होतो.' },

  // ─── HERO ───
  'hero.kicker': { en: 'From the ocean to your home', hi: 'समुद्र से आपके घर तक', mr: 'सागरापासून तुमच्या घरपर्यंत' },
  'hero.title1': { en: 'DIVE INTO', hi: 'में डुबकी लगाएं', mr: 'मध्ये डुबकी मारा' },
  'hero.title2': { en: 'THE COAST', hi: 'तटीय समुद्र', mr: 'किनारपट्टी' },
  'hero.desc': { en: 'Swim with the catch of the Konkan coast. Move your cursor — the sea answers.', hi: 'कोंकण तट की मछलियों के साथ तैरें। अपना कर्सर हिलाएं — सागर जवाब देता है।', mr: 'कोंकण किनाऱ्याच्या मासेसोबत पोहोचा. तुमचा कर्सर हलवा — सागर उत्तर देतो.' },
  'hero.explore': { en: 'EXPLORE THE CATCH', hi: 'स्पेशल देखें', mr: 'विशेष पहा' },
  'hero.dive': { en: 'DIVE DEEPER', hi: 'और गहराई में जाएं', mr: 'आणखी खोलीत जा' },
  'hero.meet': { en: 'Meet the catch', hi: 'मछली से मिलें', mr: 'मासाशी भेटा' },

  // ─── SURFACE ───
  'surface.kicker': { en: 'From the sea', hi: 'समुद्र से', mr: 'सागरातून' },
  'surface.title1': { en: 'FROM THE COAST', hi: 'तट से', mr: 'किनाऱ्यापासून' },
  'surface.title2': { en: 'TO YOUR PLATE', hi: 'आपकी प्लेट तक', mr: 'तुमच्या प्लेटपर्यंत' },
  'surface.desc': { en: 'The catch rises, the water slips away — and our kitchen takes over.', hi: 'मछली ऊपर आती है, पानी बहता है — और हमारी रसोई शुरू होती है।', mr: 'मासा वर येतो, पाणी वाहून जातं — आणि आमचे स्वयंपाकघर सुरू होतं.' },

  // ─── BRAND ───
  'brand.title1': { en: 'COASTAL', hi: 'तटीय', mr: 'किनारपट्टी' },
  'brand.title1b': { en: 'FLAVOURS.', hi: 'स्वाद।', mr: 'चव.' },
  'brand.title2': { en: 'HOME-COOKED', hi: 'घर का बना', mr: 'घरगुती' },
  'brand.title2b': { en: 'PERFECTION.', hi: 'परफेक्शन।', mr: 'परिपूर्णता.' },
  'brand.desc': { en: 'Authentic coastal seafood, freshly prepared with the flavours of the Konkan coast.', hi: 'प्रामाणिक तटीय समुद्री भोजन, कोंकण तट के स्वाद के साथ ताज़ा तैयार।', mr: 'खऱ्या किनारपट्टीचे सागरी अन्न, कोंकण किनाऱ्याच्या चवीने ताजे तयार.' },
  'brand.menu': { en: 'EXPLORE MENU', hi: 'मेनू देखें', mr: 'मेनू पहा' },
  'brand.order': { en: 'ORDER NOW', hi: 'अभी ऑर्डर करें', mr: 'आता ऑर्डर करा' },

  // ─── SIGNATURE ───
  'signature.kicker': { en: 'The signature', hi: 'प्रसिद्ध डिश', mr: 'प्रसिद्ध डिश' },
  'signature.title': { en: 'THE SIGNATURE PLATE', hi: 'प्रसिद्ध प्लेट', mr: 'प्रसिद्ध प्लेट' },
  'signature.desc': { en: 'Pomfret with Malvani curry. Move your cursor to turn the plate — scroll to lean in.', hi: 'मालवणी करी के साथ पोम्फ्रेट। कर्सर से प्लेट घुमाएं — स्क्रॉल करें।', mr: 'मालवणी करीसह पोम्फ्रेट. कर्सरने प्लेट फिरवा — स्क्रोल करा.' },
  'signature.hint': { en: 'Drag to rotate · Scroll to zoom · Hover ingredients', hi: 'घुमाने के लिए खींचें · ज़ूम के लिए स्क्रॉल करें', mr: 'फिरवण्यासाठी ओढा · झूम करण्यासाठी स्क्रोल करा' },

  // ─── MENU ───
  'menu.kicker': { en: 'Fresh from the net', hi: 'ताज़ा मछली बाज़ार से', mr: 'ताजे जाळ्यातून' },
  'menu.title': { en: 'THE COASTAL MENU', hi: 'तटीय मेनू', mr: 'किनारपट्टी मेनू' },
  'menu.all': { en: 'ALL', hi: 'सभी', mr: 'सर्व' },
  'menu.chefSpecial': { en: "CHEF'S SPECIAL", hi: 'शेफ स्पेशल', mr: 'शेफ स्पेशल' },
  'menu.mainCourse': { en: 'MAIN COURSE', hi: 'मुख्य कोर्स', mr: 'मुख्य कोर्स' },
  'menu.drinks': { en: 'DRINKS', hi: 'पेय', mr: 'पेये' },
  'menu.prices': { en: 'Prices include fresh catch · Prepared only to order', hi: 'कीमत में ताज़ी मछली शामिल · सिर्फ ऑर्डर पर बनाया जाता है', mr: 'किमतीमध्ये ताजा मासा समाविष्ट · केवळ ऑर्डरवर तयार' },

  // ─── MENU CARD ───
  'card.addToPlate': { en: 'Add to Plate', hi: 'प्लेट में जोड़ें', mr: 'प्लेटमध्ये जोडा' },

  // ─── BUILD YOUR PLATE ───
  'plate.kicker': { en: 'Seafood, your way', hi: 'समुद्री भोजन, आपके अंदाज़ में', mr: 'सागरी अन्न, तुमच्या स्वैर' },
  'plate.title': { en: 'BUILD YOUR COASTAL PLATE', hi: 'अपनी तटीय प्लेट बनाएं', mr: 'तुमची किनारपट्टी प्लेट तयार करा' },
  'plate.seafood': { en: 'SEAFOOD', hi: 'समुद्री भोजन', mr: 'सागरी अन्न' },
  'plate.style': { en: 'STYLE', hi: 'स्टाइल', mr: 'शैली' },
  'plate.drink': { en: 'DRINK', hi: 'पेय', mr: 'पेय' },
  'plate.your': { en: 'Your coastal plate', hi: 'आपकी तटीय प्लेट', mr: 'तुमची किनारपट्टी प्लेट' },
  'plate.add': { en: 'ADD TO ORDER', hi: 'ऑर्डर में जोड़ें', mr: 'ऑर्डरमध्ये जोडा' },
  'plate.desc': { en: 'prepared', hi: 'तैयार', mr: 'तयार' },
  'plate.fresh': { en: 'Fresh from our kitchen.', hi: 'हमारी रसोई से ताज़ा।', mr: 'आमच्या स्वयंपाकघरातून ताजे.' },
  'plate.hint': { en: 'Tap to build · slowly turning', hi: 'बनाने के लिए टैप करें', mr: 'तयार करण्यासाठी टॅप करा' },

  // ─── KITCHEN ───
  'kitchen.kicker': { en: 'Warm, personal, real', hi: 'गर्म, निजी, सच्चा', mr: 'उबदार, वैयक्तिक, खरे' },
  'kitchen.title': { en: 'FROM OUR KITCHEN', hi: 'हमारी रसोई से', mr: 'आमच्या स्वयंपाकघरातून' },
  'kitchen.desc': { en: 'A miniature of where the magic happens. Explore the hotspots.', hi: 'जहाँ जादू होती है उसका एक नज़ारा। हॉटस्पॉट एक्सप्लोर करें।', mr: 'जिथे जादू घडते त्याचे एक प्रतिमान. हॉटस्पॉट एक्सप्लोर करा.' },

  // ─── KITCHEN HOTSPOTS ───
  'hotspot.ingredients': { en: 'FRESH INGREDIENTS', hi: 'ताज़ी सामग्री', mr: 'ताजी सामग्री' },
  'hotspot.ingredients.body': { en: 'Lime, chillies, coriander and coconut — picked fresh every morning before the fry begins.', hi: 'नींबू, मिर्च, धनिया और नारियल — हर सुबह ताज़ा तोड़े जाते हैं।', mr: 'लिंबू, मिरची, कोथिंबीर आणि नारळ — दररोज सकाळी ताजे तोडले जातात.' },
  'hotspot.spices': { en: 'TRADITIONAL SPICES', hi: 'पारंपरिक मसाले', mr: 'पारंपरिक मसाले' },
  'hotspot.spices.body': { en: 'Roasted konkani spices ground the old way, in a mortar and pestle.', hi: 'कोंकणी मसाले पुराने तरीके से, हाथ की चक्की में पीसे जाते हैं।', mr: 'कोंकणी मसाले जुन्या पद्धतीने, खलबत्यात कुटले जातात.' },
  'hotspot.cooking': { en: 'HOME COOKING', hi: 'घर का खाना', mr: 'घरगुती स्वयंपाक' },
  'hotspot.cooking.body': { en: 'Every curry is cooked to order in a copper handi, the way it is at home.', hi: 'हर करी ऑर्डर पर तांबे के हांडी में बनाई जाती है, जैसे घर पर बनती है।', mr: 'प्रत्येक करी ऑर्डरवर तांब्याच्या हांड्यात तयार केली जाते, जसे घरी तयार केली जाते.' },
  'hotspot.masala': { en: 'MALVANI MASALA', hi: 'मालवणी मसाला', mr: 'मालवणी मसाला' },
  'hotspot.masala.body': { en: 'Our family blend of red chillies, tamarind and coconut — the secret behind the heat.', hi: 'लाल मिर्च, इमली और नारियल का हमारा पारिवारिक मिश्रण — तीखेपन का रहस्य।', mr: 'लाल मिरची, आंबा आणि नारळाचे आमचे कौटुंबिक मिश्रण — तिखटपणाचे रहस्य.' },
  'hotspot.seafood': { en: 'FRESH SEAFOOD', hi: 'ताज़ा समुद्री भोजन', mr: 'ताजे सागरी अन्न' },
  'hotspot.seafood.body': { en: 'Cleaned, spiced and ready for the tawa on the same day it leaves the sea.', hi: 'समुद्र से निकलने के उसी दिन साफ़, मसालेदार और तवे के लिए तैयार।', mr: 'सागरातून काढल्याच्या त्याच दिवशी स्वच्छ, मसालेदार आणि तव्यासाठी तयार.' },

  // ─── JOURNEY ───
  'journey.kicker': { en: 'From net to table', hi: 'जाल से थाली तक', mr: 'जाळ्यापासून थाळीपर्यंत' },
  'journey.title': { en: 'THE JOURNEY OF A DISH', hi: 'एक डिश की यात्रा', mr: 'एका डिशचा प्रवास' },
  'journey.01.title': { en: 'FRESH CATCH', hi: 'ताज़ी मछली', mr: 'ताजा मासा' },
  'journey.01.body': { en: 'Seafood inspired by the coast.', hi: 'तट से प्रेरित समुद्री भोजन।', mr: 'किनाऱ्याने प्रेरित सागरी अन्न.' },
  'journey.02.title': { en: 'CLEANED & PREPARED', hi: 'साफ़ और तैयार', mr: 'स्वच्छ आणि तयार' },
  'journey.02.body': { en: 'Carefully prepared in our kitchen.', hi: 'हमारी रसोई में सावधानी से तैयार।', mr: 'आमच्या स्वयंपाकघरात काळजीपूर्वक तयार.' },
  'journey.03.title': { en: 'MALVANI FLAVOUR', hi: 'मालवणी स्वाद', mr: 'मालवणी चव' },
  'journey.03.body': { en: 'Traditional coastal spices and techniques.', hi: 'पारंपरिक तटीय मसाले और तकनीकें।', mr: 'पारंपरिक किनारपट्टी मसाले आणि तंत्रे.' },
  'journey.04.title': { en: 'HOME COOKED', hi: 'घर का बना', mr: 'घरगुती बनवलेले' },
  'journey.04.body': { en: 'Freshly cooked to order.', hi: 'ऑर्डर पर ताज़ा पकाया जाता है।', mr: 'ऑर्डरवर ताजे शिजवले जाते.' },
  'journey.05.title': { en: 'READY TO SERVE', hi: 'परोसने के लिए तैयार', mr: 'सेव्यासाठी तयार' },
  'journey.05.body': { en: 'Packed and delivered to you.', hi: 'पैक और आप तक पहुंचाया जाता है।', mr: 'पॅक करून तुमच्यापर्यंत पोहोचवले जाते.' },

  // ─── GALLERY ───
  'gallery.kicker': { en: 'A glimpse of the kitchen', hi: 'रसोई की एक झलक', mr: 'स्वयंपाकघराची एक झलक' },
  'gallery.title': { en: 'THE GALLERY', hi: 'गैलरी', mr: 'गॅलरी' },
  'gallery.desc': { en: 'Scroll, drag or swipe — every dish tells the same story.', hi: 'स्क्रॉल करें, खींचें या स्वाइप करें — हर डिश एक ही कहानी बताती है।', mr: 'स्क्रोल करा, ओढा किंवा स्वाइप करा — प्रत्येक डिश एकच कथा सांगते.' },
  'gallery.fresh': { en: 'Fresh from the morning catch', hi: 'सुबह की ताज़ी मछली', mr: 'सकाळच्या ताज्या मासातून' },
  'gallery.drag': { en: 'Drag / scroll →', hi: 'खींचें / स्क्रॉल करें →', mr: 'ओढा / स्क्रोल करा →' },

  // ─── ORDER ───
  'order.kicker': { en: 'Ready for a craving?', hi: 'तैयार हैं चखने के लिए?', mr: 'चव घेण्यासाठी तयार?' },
  'order.title1': { en: 'READY FOR A', hi: 'तैयार हैं एक', mr: 'तयार आहोत एका' },
  'order.title2': { en: 'COASTAL CRAVING?', hi: 'तटीय चाहत के लिए?', mr: 'किनारपट्टी चवसाठी?' },
  'order.desc': { en: 'Fresh seafood. Bold Malvani flavours. Straight from our kitchen.', hi: 'ताज़ा समुद्री भोजन। बोल्ड मालवणी स्वाद। सीधे हमारी रसोई से।', mr: 'ताजे सागरी अन्न. बोल्ड मालवणी चव. थेट आमच्या स्वयंपाकघरातून.' },
  'order.callUs': { en: 'CALL US', hi: 'हमें कॉल करें', mr: 'आम्हाला कॉल करा' },
  'order.orderNow': { en: 'ORDER NOW', hi: 'अभी ऑर्डर करें', mr: 'आता ऑर्डर करा' },
  'order.whatsappUs': { en: 'WHATSAPP US', hi: 'व्हॉट्सएप करें', mr: 'व्हॉट्सएप करा' },
  'order.zomato': { en: 'AVAILABLE ON ZOMATO', hi: 'ZOMATO पर उपलब्ध', mr: 'ZOMATO वर उपलब्ध' },
  'order.zomatoSub': { en: 'Order QUICK CRAVE straight to your door', hi: 'QUICK CRAVE सीधे अपने दरवाज़े तक मंगवाएं', mr: 'QUICK CRAVE थेट तुमच्या दारापर्यंत मंगवा' },

  // ─── FOOTER ───
  'footer.from': { en: 'From the ocean to your home.', hi: 'समुद्र से आपके घर तक।', mr: 'सागरापासून तुमच्या घरपर्यंत.' },
  'footer.menu': { en: 'Menu', hi: 'मेनू', mr: 'मेनू' },
  'footer.order': { en: 'Order', hi: 'ऑर्डर', mr: 'ऑर्डर' },
  'footer.contact': { en: 'Contact', hi: 'संपर्क', mr: 'संपर्क' },
  'footer.gallery': { en: 'Gallery', hi: 'गैलरी', mr: 'गॅलरी' },
  'footer.kitchen': { en: 'Our Kitchen', hi: 'हमारी रसोई', mr: 'आमचे स्वयंपाकघर' },
  'footer.find': { en: 'Find Us', hi: 'हमें ढूंढें', mr: 'आम्हाला शोधा' },
  'footer.tagline': { en: 'Coastal flavours, home-cooked perfection.', hi: 'तटीय स्वाद, घर का बना परफेक्शन।', mr: 'किनारपट्टी चव, घरगुती परिपूर्णता.' },
  'footer.catch': { en: 'Fresh catch · Made to order', hi: 'ताज़ी मछली · ऑर्डर पर बनाया', mr: 'ताजा मासा · ऑर्डरवर बनवलेला' },

  // ─── CART ───
  'cart.title': { en: 'YOUR CATCH', hi: 'आपकी मछली', mr: 'तुमचा मासा' },
  'cart.empty': { en: 'Your plate is empty.', hi: 'आपकी प्लेट खाली है।', mr: 'तुमची प्लेट रिकामी आहे.' },
  'cart.emptySub': { en: 'Dive into the menu to add something coastal.', hi: 'मेनू में जाकर कुछ तटीय जोड़ें।', mr: 'मेनूमध्ये जाऊन काहीतरी किनारपट्टी जोडा.' },
  'cart.send': { en: 'SEND ORDER ON WHATSAPP', hi: 'व्हॉट्सएप पर ऑर्डर भेजें', mr: 'व्हॉट्सएपवर ऑर्डर पाठवा' },
  'cart.callUs': { en: 'OR CALL US', hi: 'या कॉल करें', mr: 'किंवा कॉल करा' },

  // ─── CURSOR ───
  'cursor.explore': { en: 'EXPLORE', hi: 'एक्सप्लोर', mr: 'एक्सप्लोर' },
  'cursor.taste': { en: 'TASTE', hi: 'चखें', mr: 'चव घ्या' },
  'cursor.open': { en: 'OPEN', hi: 'खोलें', mr: 'उघडा' },

  // ─── SPECIES ───
  'species.surmai.tagline': { en: 'King of the Coast', hi: 'तट का राजा', mr: 'किनाऱ्याचा राजा' },
  'species.pomfret.tagline': { en: 'A coastal classic', hi: 'तटीय क्लासिक', mr: 'किनारपट्टी क्लासिक' },
  'species.bangda.tagline': { en: 'Bold. Local. Authentic.', hi: 'बोल्ड। स्थानीय। प्रामाणिक।', mr: 'बोल्ड. स्थानिक. खरे.' },
  'species.prawns.tagline': { en: 'Small catch. Big flavour.', hi: 'छोटी मछली। बड़ा स्वाद।', mr: 'लहान मासा. मोठी चव.' },
  'species.crab.tagline': { en: 'Rich coastal indulgence', hi: 'समृद्ध तटीय आनंद', mr: 'समृद्ध किनारपट्टी आनंद' },

  // ─── FISH OVERLAY ───
  'fish.title': { en: 'LIVE FROM THE COAST', hi: 'तट से लाइव', mr: 'किनाऱ्यापासून लाइव्ह' },
  'fish.subtitle': { en: 'Click a fish to learn more', hi: 'मछली पर क्लिक करें', mr: 'मासावर क्लिक करा' },
};

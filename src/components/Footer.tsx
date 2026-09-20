import { Phone, ArrowUpRight } from 'lucide-react';
import { PHONE_1, PHONE_2, zomatoUrl, whatsappUrl } from '../data/menu';
import { useT } from '../i18n/useT';

export function Footer() {
  const { tr, isMr } = useT();

  return (
    <footer className="bg-[#1E2B58] text-white pt-20 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/15">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-bubble text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                QUICK<span className="ml-1 text-[#F9D36A]">CRAVE</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-300 max-w-sm leading-relaxed mb-6 font-normal">
              {tr('footer.desc')}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={zomatoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-[#1E2B58] text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <span>{tr('footer.orderZomato')}</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors active:scale-95"
              >
                {tr('footer.whatsappKitchen')}
              </a>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F9D36A] mb-4">
              {tr('footer.menuTitle')}
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  {isMr ? 'सुरमई आणि पापलेट फ्राय' : 'Surmai & Pomfret Fry'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  {isMr ? 'मालवणी खोबरे करी' : 'Malvani Coconut Curries'}
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-white transition-colors">
                  {isMr ? 'पोषण व ताजेपणा तथ्य' : 'Nutrition & Freshness Facts'}
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  {isMr ? 'किनारपट्टी थाळी बॉक्स' : 'The Coastal Feast Box'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  {isMr ? 'सोलकढी आणि कोकम सरबत' : 'Sol Kadi & Kokum Sarbat'}
                </a>
              </li>
            </ul>
          </div>

          {/* Kitchen Hotline & Timings */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F9D36A] mb-4">
              {tr('footer.hotlineTitle')}
            </h4>
            <div className="space-y-3 text-sm text-gray-300 font-medium">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#F9D36A]" />
                <span className="text-white font-mono font-bold">+91 {PHONE_1}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#F9D36A]" />
                <span className="text-white font-mono font-bold">022 {PHONE_2}</span>
              </p>
              <p className="text-xs text-gray-300 pt-2 leading-relaxed">
                {isMr ? 'दररोज दुपारचे जेवण: ११:३० ते ४:००' : 'Daily Lunch: 11:30 AM – 4:00 PM'} <br />
                {isMr ? 'दररोज रात्रीचे जेवण: ६:३० ते ११:३०' : 'Daily Dinner: 6:30 PM – 11:30 PM'}
              </p>
              <p className="text-xs text-gray-300">
                {tr('footer.deliveryNote')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} QUICK CRAVE. Inspired by MANA Yerba Maté aesthetic & Konkan coastal culinary craft.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5">
            <span>{tr('footer.tagWild')}</span>
            <span>•</span>
            <span>{tr('footer.tagStone')}</span>
            <span>•</span>
            <span>{tr('footer.tagZero')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
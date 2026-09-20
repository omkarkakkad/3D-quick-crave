import { Phone, ArrowUpRight, MessageCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import { PHONE_1, PHONE_2, zomatoUrl, whatsappUrl, callUrl, callUrl2 } from '../data/menu';
import { useT } from '../i18n/useT';
import { useStore } from '../store/useStore';

export function ZomatoOrderBanner() {
  const { tr } = useT();
  const setCursor = useStore((s) => s.setCursor);

  return (
    <section id="order" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 select-none">
      <div className="rounded-[2.5rem] bg-white border border-gray-200 p-8 sm:p-12 lg:p-16 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: MANA Playful Editorial Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0EFFF] text-[#1E2B58] text-xs font-black tracking-widest uppercase mb-4 font-sans">
              <Sparkles size={13} className="text-[#233876]" />
              <span>{tr('order.badge')}</span>
            </div>

            <h2 className="font-bubble text-4xl sm:text-5xl lg:text-6xl text-[#111827] font-black tracking-tight leading-[1.05] mb-4">
              {tr('order.title')}
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-normal">
              {tr('order.desc')}
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              {/* Primary: Zomato */}
              <a
                href={zomatoUrl}
                target="_blank"
                rel="noreferrer"
                onPointerEnter={() => setCursor('open', tr('order.zomatoBtn'))}
                onPointerLeave={() => setCursor('default', null)}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E23744] hover:bg-[#CB202D] text-white text-sm font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all"
              >
                <span>{tr('order.zomatoBtn')}</span>
                <ArrowUpRight size={16} />
              </a>

              {/* Secondary: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onPointerEnter={() => setCursor('open', tr('order.whatsappBtn'))}
                onPointerLeave={() => setCursor('default', null)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-gray-100 hover:bg-gray-200 text-[#111827] text-sm font-bold tracking-wide transition-all active:scale-95"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                <span>{tr('order.whatsappBtn')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hotline Contact Details Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#FDF9F3] border border-gray-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-0.5">
                    {tr('order.hotline')}
                  </span>
                  <h3 className="font-bubble text-2xl font-black text-[#111827]">
                    QUICK CRAVE
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[11px] font-extrabold uppercase tracking-wider">
                  {tr('order.openDaily')}
                </span>
              </div>

              {/* Both numbers from flyer */}
              <div className="space-y-3 mb-6">
                <a
                  href={callUrl}
                  onPointerEnter={() => setCursor('open', `${tr('order.call')} · ${PHONE_1}`)}
                  onPointerLeave={() => setCursor('default', null)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-[#111827] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E0EFFF] text-[#1E2B58] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-bold block">{tr('order.mobileDirect')}</span>
                      <span className="font-mono text-base font-bold text-[#111827]">
                        +91 {PHONE_1}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#233876] uppercase">{tr('order.call')}</span>
                </a>

                <a
                  href={callUrl2}
                  onPointerEnter={() => setCursor('open', `${tr('order.call')} · 022 ${PHONE_2}`)}
                  onPointerLeave={() => setCursor('default', null)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-[#111827] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E0EFFF] text-[#1E2B58] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 font-bold block">{tr('order.landline')}</span>
                      <span className="font-mono text-base font-bold text-[#111827]">
                        022 {PHONE_2}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#233876] uppercase">{tr('order.call')}</span>
                </a>
              </div>

              <div className="space-y-2 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#1E2B58]" />
                  <span>{tr('order.timings')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#1E2B58]" />
                  <span>{tr('order.kitchenNote')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

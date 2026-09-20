import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, MessageCircle, Phone, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { whatsappUrl, zomatoUrl, PHONE_1 } from '../data/menu';
import { useT } from '../i18n/useT';

export function CartDrawer() {
  const cart = useStore((s) => s.cart);
  const cartOpen = useStore((s) => s.cartOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const addToCart = useStore((s) => s.addToCart);

  const { tr, isMr } = useT();

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const totalItems = cart.reduce((a, c) => a + c.qty, 0);

  const greeting = isMr
    ? `नमस्कार QUICK CRAVE! मला पुढील पदार्थांची ऑर्डर द्यायची आहे:\n\n`
    : `Hi QUICK CRAVE! I'd like to place an order:\n\n`;

  const orderMessage = encodeURIComponent(
    greeting +
      cart.map((c) => `• ${c.name} (x${c.qty}) — ₹${c.price * c.qty}`).join('\n') +
      `\n\nTotal: ₹${total}\n\n` +
      (isMr ? `कृपया ऑर्डरची खात्री आणि डिलिव्हरी वेळ सांगा.` : `Please confirm availability and delivery time.`)
  );

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />

          {/* Clean Light Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[85] w-full max-w-md bg-[#FAF8F5] border-l border-[#E8E2D5] flex flex-col shadow-2xl text-[#1C2520]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-[#1E2B58]" />
                <h3 className="font-bubble text-2xl text-[#111827] font-black">
                  {tr('cart.orderTitle')}
                </h3>
                {totalItems > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0EFFF] text-[#1E2B58] text-xs font-bold">
                    {totalItems} {tr('cart.itemsCount')}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#E9F0EB] flex items-center justify-center mb-4 text-[#12382C]">
                    <ShoppingBag size={26} />
                  </div>
                  <p className="font-serif text-xl text-[#12382C] font-bold">
                    {tr('cart.emptyBag')}
                  </p>
                  <p className="text-[#718096] text-xs mt-1.5 max-w-xs leading-relaxed">
                    {tr('cart.emptyDesc')}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white border border-[#E8E2D5] flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#12382C] truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs text-[#718096]">
                          ₹{item.price} each
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#FAF8F5] px-2 py-1 rounded-full border border-[#E8E2D5]">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#718096] hover:text-[#12382C] font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold text-[#12382C] w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#718096] hover:text-[#12382C] font-bold text-sm"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-base font-bold text-[#12382C] w-14 text-right">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#E8E2D5] bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-[#718096]">
                    {tr('cart.subtotal')}
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#12382C]">
                    ₹{total}
                  </span>
                </div>

                {/* Primary: WhatsApp Checkout */}
                <a
                  href={`${whatsappUrl}&text=${orderMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#12382C] hover:bg-[#1E4D3D] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm mb-2.5 transition-all active:scale-95"
                >
                  <MessageCircle size={16} />
                  <span>{tr('cart.sendWhatsApp')}</span>
                </a>

                {/* Secondary: Zomato */}
                <a
                  href={zomatoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-full bg-[#FAF8F5] hover:bg-[#F4F0E8] border border-[#E8E2D5] text-[#12382C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all mb-2"
                >
                  <span>{tr('cart.orderZomatoDirect')}</span>
                  <ArrowUpRight size={14} />
                </a>

                <div className="text-center pt-2">
                  <a
                    href={`tel:+91${PHONE_1}`}
                    className="text-xs text-[#718096] hover:text-[#12382C] transition-colors"
                  >
                    {tr('cart.kitchenSupport')} {PHONE_1}
                  </a>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { whatsappUrl, PHONE_1 } from '../data/menu';

export function CartDrawer() {
  const cart = useStore((s) => s.cart);
  const cartOpen = useStore((s) => s.cartOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const lang = useStore((s) => s.lang);

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const items = cart.reduce((a, c) => a + c.qty, 0);

  const orderMessage = encodeURIComponent(
    `Hi QUICK CRAVE! I'd like to order:\n` +
      cart.map((c) => `${c.name} x${c.qty} — ₹${c.price * c.qty}`).join('\n') +
      `\n\nTotal: ₹${total}`
  );

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[86] w-full max-w-md bg-abyss-dark border-l border-aqua/15 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h3 className="font-display text-xl text-cream">
                {t['cart.title'][lang]}
              </h3>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream/60 hover:text-aqua-soft hover:bg-aqua/10 hover:border-aqua/30 transition-all duration-300" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
                    <svg viewBox="0 0 32 32" className="w-8 h-8 opacity-60">
                      <path d="M6 16 Q16 8 26 16 Q16 24 6 16Z" fill="#35d6c4" />
                    </svg>
                  </div>
                  <p className="text-cream/70 text-sm">{t['cart.empty'][lang]}</p>
                  <p className="text-seafoam/50 text-xs mt-2">{t['cart.emptySub'][lang]}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div key={item.id} className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-cream">{item.name}</p>
                        <p className="text-xs text-seafoam/60 mt-0.5">
                          ₹{item.price} × {item.qty} = <span className="text-aqua-soft">₹{item.price * item.qty}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full border border-white/10 text-cream/60 hover:text-ember hover:border-ember/40 hover:bg-ember/10 active:scale-90 transition-all duration-200 text-sm"
                        >
                          −
                        </button>
                        <span className="text-sm text-cream w-6 text-center font-medium">{item.qty}</span>
                        <button
                          onClick={() => useStore.getState().addToCart(item)}
                          className="w-8 h-8 rounded-full border border-white/10 text-cream/60 hover:text-aqua hover:border-aqua/40 hover:bg-aqua/10 active:scale-90 transition-all duration-200 text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          while (item.qty > 0) removeFromCart(item.id);
                        }}
                        className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-cream/40 hover:text-coral hover:border-coral/40 hover:bg-coral/10 active:scale-90 transition-all duration-200"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-white/5 bg-abyss/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-cream/70">{items} item{items > 1 ? 's' : ''}</span>
                  <span className="font-display text-2xl text-cream">₹{total}</span>
                </div>
                <a
                  href={`${whatsappUrl}&text=${orderMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-ember-deep to-ember text-coconut text-sm font-semibold tracking-wide hover:brightness-110 hover:shadow-ember hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                >
                  <MessageCircle size={16} /> {t['cart.send'][lang]}
                </a>
                <a
                  href={`tel:+91${PHONE_1}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-aqua/40 text-aqua-soft text-sm font-semibold tracking-wide mt-2 hover:bg-aqua/10 hover:border-aqua hover:shadow-glow hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                >
                  {t['cart.callUs'][lang]}
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
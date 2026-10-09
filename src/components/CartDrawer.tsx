import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, MessageCircle, Phone, ArrowUpRight, ShoppingBag, Tag, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useStore, type Order } from '../store/useStore';
import { whatsappUrl, zomatoUrl, PHONE_1 } from '../data/menu';
import { useT } from '../i18n/useT';

export function CartDrawer() {
  const cart = useStore((s) => s.cart);
  const cartOpen = useStore((s) => s.cartOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const addToCart = useStore((s) => s.addToCart);
  const clearCart = useStore((s) => s.clearCart);

  const appliedCoupon = useStore((s) => s.appliedCoupon);
  const couponDiscount = useStore((s) => s.couponDiscount);
  const applyCoupon = useStore((s) => s.applyCoupon);
  const removeCoupon = useStore((s) => s.removeCoupon);
  const addOrder = useStore((s) => s.addOrder);

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const { tr, isMr } = useT();
  const setCursor = useStore((s) => s.setCursor);

  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const total = Math.max(0, subtotal - couponDiscount);
  const totalItems = cart.reduce((a, c) => a + c.qty, 0);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim(), subtotal);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMsg(null);
  };

  // WhatsApp checkout message with coupon breakdown
  const greeting = isMr
    ? `नमस्कार QUICK CRAVE! मला पुढील पदार्थांची ऑर्डर द्यायची आहे:\n\n`
    : `Hi QUICK CRAVE! I'd like to place an order:\n\n`;

  const itemsList = cart.map((c) => `• ${c.name} (x${c.qty}) — ₹${c.price * c.qty}`).join('\n');
  const discountLine = appliedCoupon
    ? `\nSubtotal: ₹${subtotal}\nCoupon Applied (${appliedCoupon.code}): -₹${couponDiscount}`
    : '';

  const orderMessage = encodeURIComponent(
    greeting +
      itemsList +
      discountLine +
      `\n\nTotal Payable: ₹${total}\n\n` +
      (isMr ? `कृपया ऑर्डरची खात्री आणि डिलिव्हरी वेळ सांगा.` : `Please confirm availability and delivery time.`)
  );

  // When customer clicks WhatsApp checkout, record live order in store for admin
  const handleRecordCheckout = () => {
    const newOrder: Order = {
      id: 'ord-' + Date.now().toString(),
      orderNumber: 'QC-' + Math.floor(1000 + Math.random() * 9000),
      customerName: 'Customer (WhatsApp Checkout)',
      customerPhone: `+91 ${PHONE_1}`,
      deliveryAddress: 'Direct Kitchen WhatsApp Delivery',
      items: cart.map((c) => ({
        id: c.id,
        name: c.name,
        price: c.price,
        qty: c.qty,
        category: c.category
      })),
      subtotal,
      discount: couponDiscount,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedPrepMinutes: 20,
      paymentMethod: 'UPI / Online',
      notes: appliedCoupon ? `Coupon ${appliedCoupon.code} applied (-₹${couponDiscount})` : undefined
    };

    addOrder(newOrder);
  };

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
              <div className="p-5 border-t border-[#E8E2D5] bg-white space-y-3">
                {/* Coupon Code Section */}
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5]">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#15803D]/15 text-[#15803D] flex items-center justify-center">
                          <Tag size={14} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-[#12382C]">
                              {appliedCoupon.code}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#15803D] text-white font-bold">
                              Saved ₹{couponDiscount}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#718096]">
                            {appliedCoupon.description}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value.toUpperCase());
                              if (couponMsg) setCouponMsg(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleApplyCoupon();
                            }}
                            placeholder="Enter coupon code (e.g. MALVANI20)"
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-300 text-xs font-mono font-bold uppercase focus:outline-none focus:border-[#1E2B58] bg-white"
                          />
                        </div>
                        <button
                          onClick={handleApplyCoupon}
                          className="px-3.5 py-1.5 rounded-xl bg-[#1E2B58] hover:bg-[#253B80] text-white text-xs font-bold transition-colors"
                        >
                          Apply
                        </button>
                      </div>

                      {couponMsg && (
                        <p
                          className={`text-[11px] mt-1.5 font-medium flex items-center gap-1 ${
                            couponMsg.isError ? 'text-red-600' : 'text-emerald-700'
                          }`}
                        >
                          {couponMsg.isError ? <AlertCircle size={12} /> : <Check size={12} />}
                          <span>{couponMsg.text}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Subtotal & Discount Financials */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex justify-between items-center text-[#718096]">
                    <span>{tr('cart.subtotal')}</span>
                    <span className="font-mono font-bold text-sm text-[#12382C]">₹{subtotal}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-[#15803D] font-bold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-mono text-sm">-₹{couponDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-[#111827]">Final Total</span>
                    <span className="font-serif text-2xl font-bold text-[#12382C]">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Primary: WhatsApp Checkout */}
                <a
                  href={`${whatsappUrl}&text=${orderMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleRecordCheckout}
                  onPointerEnter={() => setCursor('open', tr('cart.sendWhatsApp'))}
                  onPointerLeave={() => setCursor('default', null)}
                  className="w-full py-3.5 rounded-full bg-[#12382C] hover:bg-[#1E4D3D] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <MessageCircle size={16} />
                  <span>{tr('cart.sendWhatsApp')}</span>
                </a>

                {/* Secondary: Zomato */}
                <a
                  href={zomatoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onPointerEnter={() => setCursor('open', tr('cart.orderZomatoDirect'))}
                  onPointerLeave={() => setCursor('default', null)}
                  className="w-full py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#F4F0E8] border border-[#E8E2D5] text-[#12382C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>{tr('cart.orderZomatoDirect')}</span>
                  <ArrowUpRight size={14} />
                </a>

                <div className="text-center pt-1">
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
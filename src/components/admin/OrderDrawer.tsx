import { X, Phone, MessageCircle, Clock, MapPin, Printer, CheckCircle2, ChefHat, Bike, AlertCircle } from 'lucide-react';
import type { Order, OrderStatus } from '../../store/useStore';

interface OrderDrawerProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export function OrderDrawer({ order, onClose, onUpdateStatus }: OrderDrawerProps) {
  if (!order) return null;

  const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');

  const getWhatsAppMessage = () => {
    if (order.status === 'preparing') {
      return encodeURIComponent(
        `नमस्कार ${order.customerName}! Your Quick Crave order #${order.orderNumber} is now freshly simmering & crisping on our kitchen tawa! Estimated delivery in ${order.estimatedPrepMinutes || 20} mins. 🐟🔥`
      );
    }
    if (order.status === 'out_for_delivery') {
      return encodeURIComponent(
        `नमस्कार ${order.customerName}! Your Quick Crave order #${order.orderNumber} has been packed hot and is OUT FOR DELIVERY to: ${order.deliveryAddress}. Enjoy your Konkan feast! 🛵✨`
      );
    }
    if (order.status === 'delivered') {
      return encodeURIComponent(
        `नमस्कार ${order.customerName}! Your Quick Crave order #${order.orderNumber} has been delivered. We hope you loved the authentic Malvani flavors! Please let us know your feedback. 🥥🍽️`
      );
    }
    return encodeURIComponent(
      `नमस्कार ${order.customerName}! Regarding your Quick Crave order #${order.orderNumber} (₹${order.total}): Our kitchen has received your order and is processing it now.`
    );
  };

  const printKOT = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#121E36] border-l border-white/15 h-full flex flex-col shadow-2xl text-white">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#0C1527] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-black text-[#F9D36A]">
                {order.orderNumber}
              </span>
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  order.status === 'pending'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : order.status === 'preparing'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : order.status === 'out_for_delivery'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : order.status === 'delivered'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
              <Clock size={12} />
              <span>Received {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={printKOT}
              title="Print Kitchen Ticket (KOT)"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Stepper Action Row */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-3">
              Kitchen Workflow Actions
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                onClick={() => onUpdateStatus(order.id, 'pending')}
                className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                  order.status === 'pending'
                    ? 'bg-amber-500 text-black border-amber-400 font-black shadow-md'
                    : 'bg-black/20 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <AlertCircle size={14} />
                <span>Pending</span>
              </button>

              <button
                onClick={() => onUpdateStatus(order.id, 'preparing')}
                className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                  order.status === 'preparing'
                    ? 'bg-blue-500 text-white border-blue-400 font-black shadow-md'
                    : 'bg-black/20 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <ChefHat size={14} />
                <span>Preparing</span>
              </button>

              <button
                onClick={() => onUpdateStatus(order.id, 'out_for_delivery')}
                className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                  order.status === 'out_for_delivery'
                    ? 'bg-purple-500 text-white border-purple-400 font-black shadow-md'
                    : 'bg-black/20 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Bike size={14} />
                <span>On Way</span>
              </button>

              <button
                onClick={() => onUpdateStatus(order.id, 'delivered')}
                className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-1 ${
                  order.status === 'delivered'
                    ? 'bg-emerald-500 text-white border-emerald-400 font-black shadow-md'
                    : 'bg-black/20 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <CheckCircle2 size={14} />
                <span>Delivered</span>
              </button>
            </div>
          </div>

          {/* Customer Profile & Direct Contact */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white">
                  {order.customerName}
                </h4>
                <p className="text-xs text-gray-400 font-mono">
                  {order.customerPhone}
                </p>
              </div>

              {/* Direct Call & WhatsApp Triggers */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-[#F9D36A] flex items-center justify-center transition-colors"
                  title="Call Customer"
                >
                  <Phone size={16} />
                </a>

                <a
                  href={`https://wa.me/${cleanPhone}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-black text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Send WhatsApp update to customer"
                >
                  <MessageCircle size={15} />
                  <span>Notify WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-white/10 text-xs text-gray-300">
              <MapPin size={15} className="text-[#F9D36A] shrink-0 mt-0.5" />
              <span>{order.deliveryAddress}</span>
            </div>

            {order.notes && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <span className="font-bold">Customer Note: </span>
                {order.notes}
              </div>
            )}
          </div>

          {/* Itemized Order List */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-3">
              Kitchen Preparation Ticket
            </span>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-[#F9D36A]/20 text-[#F9D36A] font-bold text-center leading-5 text-[11px]">
                      {item.qty}×
                    </span>
                    <span className="font-medium text-white">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-gray-300">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Totals */}
            <div className="pt-4 mt-3 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="font-mono">₹{order.subtotal}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-[#86EFAC]">
                  <span>Discount ({order.couponCode || 'Promo'})</span>
                  <span className="font-mono">-₹{order.discount}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="font-mono font-black text-[#F9D36A]">₹{order.total}</span>
              </div>

              <div className="pt-2 flex justify-between text-[11px] text-gray-400">
                <span>Payment Method</span>
                <span className="font-bold text-gray-200">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, ChefHat, Bike, CheckCircle2, AlertCircle, Phone, MessageCircle, Eye, Sparkles, Clock, Trash2, Printer } from 'lucide-react';
import { useStore, type Order, type OrderStatus } from '../../../store/useStore';

interface OrdersTabProps {
  onSelectOrder: (order: Order) => void;
}

export function OrdersTab({ onSelectOrder }: OrdersTabProps) {
  const orders = useStore((s) => s.orders);
  const updateOrderStatus = useStore((s) => s.updateOrderStatus);
  const deleteOrder = useStore((s) => s.deleteOrder);
  const simulateOrder = useStore((s) => s.simulateOrder);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState('');

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    out_for_delivery: orders.filter((o) => o.status === 'out_for_delivery').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab !== 'all' && order.status !== activeTab) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.includes(q) ||
        order.deliveryAddress.toLowerCase().includes(q) ||
        order.items.some((i) => i.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <AlertCircle size={11} />
            <span>Pending</span>
          </span>
        );
      case 'preparing':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
            <ChefHat size={11} />
            <span>Preparing</span>
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Bike size={11} />
            <span>On Way</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 size={11} />
            <span>Delivered</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
            Cancelled
          </span>
        );
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121E36] border border-white/15 p-5 rounded-3xl shadow-xl">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F9D36A]">
            Kitchen Dispatch Desk
          </span>
          <h2 className="text-xl font-black text-white">
            Live Orders & Delivery Tracker
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Accept pending orders, monitor preparation on tawa, dispatch delivery riders, and notify customers.
          </p>
        </div>

        <button
          onClick={() => simulateOrder()}
          className="px-5 py-2.5 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1427] font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Sparkles size={16} />
          <span>Simulate Incoming Order</span>
        </button>
      </div>

      {/* Tabs and Search */}
      <div className="p-4 bg-[#121E36] border border-white/15 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Orders', count: statusCounts.all },
            { id: 'pending', label: 'Pending', count: statusCounts.pending },
            { id: 'preparing', label: 'Preparing', count: statusCounts.preparing },
            { id: 'out_for_delivery', label: 'On Way', count: statusCounts.out_for_delivery },
            { id: 'delivered', label: 'Delivered', count: statusCounts.delivered }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#1E2B58] border-[#F9D36A] text-[#F9D36A]'
                  : 'bg-black/20 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] font-mono">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order #, customer, or phone..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
          />
        </div>
      </div>

      {/* Orders Grid / Cards */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#121E36] border border-white/15">
          <p className="text-gray-400 text-sm">No orders found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => {
            const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');

            return (
              <div
                key={order.id}
                className="p-5 rounded-3xl bg-[#121E36] border border-white/15 hover:border-white/30 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-[#F9D36A]">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        <span>{timeAgo(order.createdAt)}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                        title="View Full Order Details"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-white">
                      {order.customerName}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">
                      {order.customerPhone}
                    </p>
                    <p className="text-xs text-gray-300 truncate mt-0.5">
                      📍 {order.deliveryAddress}
                    </p>
                  </div>

                  {/* Itemized preview */}
                  <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1.5 mb-3 text-xs">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-gray-300">
                        <span>
                          <strong className="text-white">{it.qty}×</strong> {it.name}
                        </span>
                        <span className="font-mono text-gray-400">₹{it.price * it.qty}</span>
                      </div>
                    ))}

                    <div className="pt-2 mt-2 border-t border-white/10 flex justify-between font-bold">
                      <span className="text-gray-300">Total</span>
                      <span className="font-mono text-[#F9D36A] text-sm">₹{order.total}</span>
                    </div>
                  </div>
                </div>

                {/* Status Advancement & Customer Triggers */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  {/* Status buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        Accept & Cook 🍳
                      </button>
                    )}

                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        Dispatch Order 🛵
                      </button>
                    )}

                    {order.status === 'out_for_delivery' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        Mark Delivered ✓
                      </button>
                    )}

                    {order.status === 'delivered' && (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  {/* Customer Contact */}
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                      title="Call Customer"
                    >
                      <Phone size={14} />
                    </a>

                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hi ${order.customerName}! Update on your Quick Crave order #${order.orderNumber}: Status is now ${order.status.replace(/_/g, ' ')}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition-colors"
                      title="Send WhatsApp Update"
                    >
                      <MessageCircle size={14} />
                    </a>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete order ticket #${order.orderNumber}?`)) {
                          deleteOrder(order.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

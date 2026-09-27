import { TrendingUp, ShoppingBag, Clock, DollarSign, ChefHat, AlertCircle, ArrowUpRight, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore, type Order, type OrderStatus } from '../../../store/useStore';

interface DashboardTabProps {
  onNavigateTab: (tab: 'dashboard' | 'menu' | 'coupons' | 'orders' | 'settings') => void;
  onOpenDishModal: () => void;
  onOpenCouponModal: () => void;
  onSelectOrder: (order: Order) => void;
}

export function DashboardTab({
  onNavigateTab,
  onOpenDishModal,
  onOpenCouponModal,
  onSelectOrder
}: DashboardTabProps) {
  const orders = useStore((s) => s.orders);
  const menuItems = useStore((s) => s.menuItems);
  const coupons = useStore((s) => s.coupons);
  const kitchenStatus = useStore((s) => s.kitchenStatus);
  const setKitchenStatus = useStore((s) => s.setKitchenStatus);
  const simulateOrder = useStore((s) => s.simulateOrder);
  const updateOrderStatus = useStore((s) => s.updateOrderStatus);

  // Calculations
  const todayOrders = orders;
  const totalRevenue = todayOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrders = todayOrders.filter(
    (o) => o.status === 'pending' || o.status === 'preparing' || o.status === 'out_for_delivery'
  );

  const pendingCount = todayOrders.filter((o) => o.status === 'pending').length;
  const preparingCount = todayOrders.filter((o) => o.status === 'preparing').length;

  const aov = todayOrders.length > 0 ? Math.round(totalRevenue / todayOrders.length) : 0;
  const inStockCount = menuItems.filter((m) => m.inStock !== false).length;

  // Hourly order distribution for SVG chart
  const hourlyData = [
    { hour: '11 AM', orders: 2, rev: 890 },
    { hour: '12 PM', orders: 5, rev: 2350 },
    { hour: '1 PM', orders: 8, rev: 3890 },
    { hour: '2 PM', orders: 6, rev: 2740 },
    { hour: '3 PM', orders: 3, rev: 1200 },
    { hour: '4 PM', orders: 1, rev: 450 },
    { hour: '7 PM', orders: 7, rev: 3400 },
    { hour: '8 PM', orders: 9, rev: 4650 },
    { hour: '9 PM', orders: 8, rev: 3980 },
    { hour: '10 PM', orders: 4, rev: 1890 }
  ];

  const maxOrders = Math.max(...hourlyData.map((d) => d.orders));

  return (
    <div className="space-y-6">
      {/* Top Kitchen Alert & Status Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121E36] border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-3.5 h-3.5 rounded-full animate-ping ${
              kitchenStatus === 'open'
                ? 'bg-emerald-400'
                : kitchenStatus === 'busy'
                ? 'bg-amber-400'
                : 'bg-red-400'
            }`}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Live Kitchen Status:
              </h2>
              <span
                className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  kitchenStatus === 'open'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : kitchenStatus === 'busy'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {kitchenStatus === 'open'
                  ? 'Accepting Orders'
                  : kitchenStatus === 'busy'
                  ? 'Rush Hour (+15m prep delay)'
                  : 'Kitchen Closed'}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Current Shift: Evening Dinner Service · Malvani Iron Tawas Hot & Ready
            </p>
          </div>
        </div>

        {/* Kitchen Status Selector Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setKitchenStatus('open')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              kitchenStatus === 'open'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            🟢 Open
          </button>
          <button
            onClick={() => setKitchenStatus('busy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              kitchenStatus === 'busy'
                ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            🟡 Busy (+15m)
          </button>
          <button
            onClick={() => setKitchenStatus('closed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              kitchenStatus === 'closed'
                ? 'bg-red-600 text-white border-red-500 shadow-md'
                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            🔴 Closed
          </button>

          <button
            onClick={() => simulateOrder()}
            className="px-3.5 py-1.5 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1527] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 ml-1"
          >
            <Sparkles size={13} />
            <span>Simulate Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="p-5 rounded-2xl bg-[#121E36] border border-white/15 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <TrendingUp size={13} />
            <span>+24.8% vs yesterday</span>
          </div>
        </div>

        {/* Live Orders */}
        <div className="p-5 rounded-2xl bg-[#121E36] border border-white/15 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active In Kitchen</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <ChefHat size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {activeOrders.length}
          </div>
          <div className="mt-2 text-xs text-gray-400 font-medium">
            <span className="text-amber-400 font-bold">{pendingCount} pending</span> ·{' '}
            <span className="text-blue-400 font-bold">{preparingCount} on tawa</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-5 rounded-2xl bg-[#121E36] border border-white/15 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Order Value (AOV)</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            ₹{aov}
          </div>
          <div className="mt-2 text-xs text-gray-400 font-medium">
            Based on {todayOrders.length} customer tickets
          </div>
        </div>

        {/* Menu Status */}
        <div className="p-5 rounded-2xl bg-[#121E36] border border-white/15 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Dishes In Menu</span>
            <div className="w-8 h-8 rounded-xl bg-[#F9D36A]/15 flex items-center justify-center text-[#F9D36A]">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {menuItems.length}
          </div>
          <div className="mt-2 text-xs text-gray-400 font-medium">
            <span className="text-emerald-400 font-bold">{inStockCount} in stock</span> · {coupons.filter(c => c.isActive).length} active coupons
          </div>
        </div>
      </div>

      {/* Main Content Split: Chart & Live Orders Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Volume & Revenue Trend (7 cols) */}
        <div className="lg:col-span-7 bg-[#121E36] border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-white">
                Today's Kitchen Volume Trend
              </h3>
              <p className="text-xs text-gray-400">
                Peak rushes: Lunch (12-2 PM) & Coastal Dinner Service (7-9 PM)
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#F9D36A] px-2.5 py-1 rounded-full bg-[#F9D36A]/10 border border-[#F9D36A]/20">
              Real-time Tracker
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-52 w-full pt-4 flex items-end justify-between gap-1.5 sm:gap-2">
            {hourlyData.map((d, i) => {
              const heightPct = Math.round((d.orders / maxOrders) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <span className="text-[9px] text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.orders}ord
                  </span>
                  <div
                    style={{ height: `${Math.max(heightPct, 8)}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 group-hover:brightness-125 ${
                      i >= 6 ? 'bg-gradient-to-t from-[#E05A36] to-[#F9D36A]' : 'bg-gradient-to-t from-[#1E3A8A] to-[#60A5FA]'
                    }`}
                  />
                  <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold truncate max-w-full">
                    {d.hour}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#60A5FA]" />
                <span>Lunch Shift</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#F9D36A]" />
                <span>Dinner Shift</span>
              </span>
            </div>
            <span className="font-mono text-gray-300 font-bold">
              Total 53 tickets projected today
            </span>
          </div>
        </div>

        {/* Live Active Orders Quick Queue (5 cols) */}
        <div className="lg:col-span-5 bg-[#121E36] border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-white">
                Live Kitchen Queue
              </h3>
              <p className="text-xs text-gray-400">
                Orders requiring immediate cooking or dispatch
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-[#F9D36A] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-64 pr-1">
            {activeOrders.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <CheckCircle2 size={32} className="mx-auto text-emerald-400 mb-2 opacity-60" />
                <p className="text-xs">No pending orders. Kitchen is all caught up!</p>
              </div>
            ) : (
              activeOrders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  className="p-3.5 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#F9D36A]">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        order.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300'
                          : order.status === 'preparing'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-[#F9D36A] transition-colors truncate">
                    {order.customerName}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {order.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
                  </p>

                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-white">
                      ₹{order.total}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => onNavigateTab('orders')}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors"
            >
              Open Full Live Orders Monitor ({orders.length} Total)
            </button>
          </div>
        </div>
      </div>

      {/* Quick Launchpad Actions Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onOpenDishModal}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#1E2B58] to-[#121E36] border border-white/15 text-left group hover:border-[#F9D36A] transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F9D36A]/20 flex items-center justify-center text-[#F9D36A] mb-3 group-hover:scale-110 transition-transform">
            <Plus size={20} />
          </div>
          <h4 className="text-sm font-black text-white group-hover:text-[#F9D36A] transition-colors">
            Add New Dish
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Create new fry, curry, or combo with photos & Marathi translation
          </p>
        </button>

        <button
          onClick={onOpenCouponModal}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#1E2B58] to-[#121E36] border border-white/15 text-left group hover:border-[#F9D36A] transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
            <Sparkles size={20} />
          </div>
          <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
            Create Discount Coupon
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Offer % or flat ₹ discounts, set minimum cart value & expiry
          </p>
        </button>

        <button
          onClick={() => simulateOrder()}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#1E2B58] to-[#121E36] border border-white/15 text-left group hover:border-[#F9D36A] transition-all shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
            <ChefHat size={20} />
          </div>
          <h4 className="text-sm font-black text-white group-hover:text-purple-300 transition-colors">
            Simulate Customer Order
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Generate instant realistic Mumbai coastal order to test ticket dispatch
          </p>
        </button>
      </div>
    </div>
  );
}

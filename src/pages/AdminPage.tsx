import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tag,
  ShoppingBag,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles,
  Clock,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useStore, type MenuItem, type Coupon, type Order } from '../store/useStore';
import { AdminLockScreen } from '../components/admin/AdminLockScreen';
import { DashboardTab } from '../components/admin/tabs/DashboardTab';
import { MenuTab } from '../components/admin/tabs/MenuTab';
import { CouponsTab } from '../components/admin/tabs/CouponsTab';
import { OrdersTab } from '../components/admin/tabs/OrdersTab';
import { SettingsTab } from '../components/admin/tabs/SettingsTab';
import { DishModal } from '../components/admin/DishModal';
import { CouponModal } from '../components/admin/CouponModal';
import { OrderDrawer } from '../components/admin/OrderDrawer';

type TabType = 'dashboard' | 'menu' | 'coupons' | 'orders' | 'settings';

export function AdminPage() {
  const isAdminAuthenticated = useStore((s) => s.isAdminAuthenticated);
  const logoutAdmin = useStore((s) => s.logoutAdmin);
  const kitchenStatus = useStore((s) => s.kitchenStatus);
  const orders = useStore((s) => s.orders);
  const menuItems = useStore((s) => s.menuItems);
  const coupons = useStore((s) => s.coupons);
  const simulateOrder = useStore((s) => s.simulateOrder);
  const addMenuItem = useStore((s) => s.addMenuItem);
  const updateMenuItem = useStore((s) => s.updateMenuItem);
  const addCoupon = useStore((s) => s.addCoupon);
  const updateCoupon = useStore((s) => s.updateCoupon);
  const updateOrderStatus = useStore((s) => s.updateOrderStatus);

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Modals state
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isAdminAuthenticated) {
    return <AdminLockScreen />;
  }

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  const handleOpenDishModal = (dish?: MenuItem) => {
    setEditingDish(dish || null);
    setDishModalOpen(true);
  };

  const handleSaveDish = (dish: any) => {
    if (editingDish) {
      updateMenuItem(editingDish.id, dish);
    } else {
      addMenuItem(dish);
    }
  };

  const handleOpenCouponModal = (coupon?: Coupon) => {
    setEditingCoupon(coupon || null);
    setCouponModalOpen(true);
  };

  const handleSaveCoupon = (coupon: any) => {
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, coupon);
    } else {
      addCoupon(coupon);
    }
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : undefined
    },
    {
      id: 'menu',
      label: 'Menu & Pricing',
      icon: UtensilsCrossed,
      badge: `${menuItems.length}`
    },
    {
      id: 'coupons',
      label: 'Coupons & Offers',
      icon: Tag,
      badge: `${coupons.filter((c) => c.isActive).length}`
    },
    {
      id: 'orders',
      label: 'Live Orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A101D] text-white flex flex-col font-sans selection:bg-[#F9D36A] selection:text-[#0A101D]">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-[#0C1527]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left: Brand and Kitchen Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="font-bubble text-xl sm:text-2xl font-black text-white tracking-tight">
              QUICK<span className="text-[#F9D36A]">CRAVE</span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#F9D36A]/20 border border-[#F9D36A]/30 text-[#F9D36A] text-[10px] font-black uppercase tracking-wider">
              Kitchen OS
            </span>
          </Link>
        </div>

        {/* Center: Live Clock & Kitchen Pill */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
            <Clock size={13} className="text-[#F9D36A]" />
            <span className="font-mono font-bold">{currentTime || '12:00:00 PM'} IST</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                kitchenStatus === 'open'
                  ? 'bg-emerald-400 animate-pulse'
                  : kitchenStatus === 'busy'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-red-400'
              }`}
            />
            <span className="text-gray-300 font-bold uppercase tracking-wider text-[11px]">
              {kitchenStatus === 'open'
                ? 'Kitchen Accepting Orders'
                : kitchenStatus === 'busy'
                ? 'High Rush Hour (+15m)'
                : 'Kitchen Closed'}
            </span>
          </div>
        </div>

        {/* Right: Quick actions & Logout */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => simulateOrder()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-gray-200 transition-colors"
            title="Generate test simulated order"
          >
            <Sparkles size={13} className="text-[#F9D36A]" />
            <span>Simulate Order</span>
          </button>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-gray-200 transition-colors"
          >
            <span>Storefront</span>
            <ExternalLink size={12} />
          </Link>

          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 hover:text-red-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Lock session & Logout"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Lock / Logout</span>
          </button>
        </div>
      </header>

      {/* Main App Layout */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/10 p-4 shrink-0 bg-[#0C1527]/50">
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#F9D36A] text-[#0A101D] shadow-lg shadow-[#F9D36A]/10 font-black'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-black text-[#F9D36A]'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#F9D36A] block mb-1">
              Active Shift
            </span>
            <p className="text-xs font-bold text-white">
              Executive Chef Live
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Dadar Central Cloud Kitchen
            </p>
          </div>
        </aside>

        {/* Mobile Flyout / Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-bubble text-xl font-bold text-white">
                Kitchen Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/10 text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 py-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as TabType);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold ${
                      isActive
                        ? 'bg-[#F9D36A] text-[#0A101D] font-black'
                        : 'bg-white/5 text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-black/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                logoutAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-red-600/30 text-red-200 font-bold text-xs uppercase tracking-wider border border-red-500/30"
            >
              Lock & Logout
            </button>
          </div>
        )}

        {/* Main Tab Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenDishModal={() => handleOpenDishModal()}
              onOpenCouponModal={() => handleOpenCouponModal()}
              onSelectOrder={(ord) => setSelectedOrder(ord)}
            />
          )}

          {activeTab === 'menu' && (
            <MenuTab onOpenDishModal={(dish) => handleOpenDishModal(dish)} />
          )}

          {activeTab === 'coupons' && (
            <CouponsTab onOpenCouponModal={(coupon) => handleOpenCouponModal(coupon)} />
          )}

          {activeTab === 'orders' && (
            <OrdersTab onSelectOrder={(ord) => setSelectedOrder(ord)} />
          )}

          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      {/* Global Modals */}
      <DishModal
        isOpen={dishModalOpen}
        onClose={() => setDishModalOpen(false)}
        onSave={handleSaveDish}
        initialData={editingDish}
      />

      <CouponModal
        isOpen={couponModalOpen}
        onClose={() => setCouponModalOpen(false)}
        onSave={handleSaveCoupon}
        initialData={editingCoupon}
      />

      <OrderDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={(id, status) => {
          updateOrderStatus(id, status);
          if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder({ ...selectedOrder, status });
          }
        }}
      />
    </div>
  );
}

import { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, Copy, Check, Percent, IndianRupee, Sparkles, AlertCircle } from 'lucide-react';
import { useStore, type Coupon } from '../../../store/useStore';

interface CouponsTabProps {
  onOpenCouponModal: (coupon?: Coupon) => void;
}

export function CouponsTab({ onOpenCouponModal }: CouponsTabProps) {
  const coupons = useStore((s) => s.coupons);
  const toggleCoupon = useStore((s) => s.toggleCoupon);
  const deleteCoupon = useStore((s) => s.deleteCoupon);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to delete coupon code "${code}"?`)) {
      deleteCoupon(id);
    }
  };

  // Stats
  const activeCoupons = coupons.filter((c) => c.isActive);
  const totalUses = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121E36] border border-white/15 p-5 rounded-3xl shadow-xl">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F9D36A]">
            Marketing & Customer Incentives
          </span>
          <h2 className="text-xl font-black text-white">
            Coupons & Discount Engine
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Create percentage % and flat ₹ promo codes that customers can enter in their cart bag.
          </p>
        </div>

        <button
          onClick={() => onOpenCouponModal()}
          className="px-5 py-2.5 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1427] font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus size={16} />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#121E36] border border-white/15 shadow-lg">
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
            Active Promo Codes
          </span>
          <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
            <span>{activeCoupons.length}</span>
            <span className="text-xs text-emerald-400 font-sans font-bold">
              / {coupons.length} Total
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121E36] border border-white/15 shadow-lg">
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
            Total Times Redeemed
          </span>
          <div className="text-2xl font-black text-[#F9D36A] font-mono">
            {totalUses} Orders
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121E36] border border-white/15 shadow-lg">
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
            Checkout Auto-Validation
          </span>
          <div className="text-xs text-gray-300 font-medium mt-1">
            Active coupons auto-apply when customer cart meets minimum value.
          </div>
        </div>
      </div>

      {/* Coupons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((coupon) => {
          const isCopied = copiedCode === coupon.code;
          return (
            <div
              key={coupon.id}
              className={`p-5 rounded-3xl border transition-all shadow-lg flex flex-col justify-between ${
                coupon.isActive
                  ? 'bg-[#121E36] border-white/15 hover:border-white/30'
                  : 'bg-black/30 border-white/5 opacity-75'
              }`}
            >
              <div>
                {/* Top Row: Code & Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-black text-[#F9D36A] bg-black/40 px-3 py-1 rounded-xl border border-white/15 tracking-wider">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                      title="Copy Coupon Code"
                    >
                      {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      coupon.discountType === 'percentage'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT OFF`}
                  </span>
                </div>

                <p className="text-xs text-gray-300 font-medium mb-3">
                  {coupon.description}
                </p>

                {/* Requirements */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-400 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/5">
                    Min Cart: <strong>₹{coupon.minOrderValue}</strong>
                  </span>
                  {coupon.maxDiscount && (
                    <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/5">
                      Max Discount: <strong>₹{coupon.maxDiscount}</strong>
                    </span>
                  )}
                  {coupon.expiresAt && (
                    <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/5">
                      Expires: <strong>{coupon.expiresAt}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCoupon(coupon.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      coupon.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${coupon.isActive ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                    <span>{coupon.isActive ? 'Active' : 'Paused'}</span>
                  </button>

                  <span className="text-[11px] text-gray-400">
                    Used {coupon.usageCount || 0} times
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCouponModal(coupon)}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                    title="Edit Coupon"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id, coupon.code)}
                    className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete Coupon"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

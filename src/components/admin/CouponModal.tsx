import { useState, useEffect, type FormEvent } from 'react';
import { X, Tag, Percent, IndianRupee, Calendar } from 'lucide-react';
import type { Coupon } from '../../store/useStore';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coupon: Omit<Coupon, 'id' | 'usageCount'> | Coupon) => void;
  initialData?: Coupon | null;
}

export function CouponModal({ isOpen, onClose, onSave, initialData }: CouponModalProps) {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'flat'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [minOrderValue, setMinOrderValue] = useState<number>(499);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(150);
  const [expiresAt, setExpiresAt] = useState<string>('2026-12-31');
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (initialData) {
      setCode(initialData.code);
      setDescription(initialData.description);
      setDiscountType(initialData.discountType);
      setDiscountValue(initialData.discountValue);
      setMinOrderValue(initialData.minOrderValue);
      setMaxDiscount(initialData.maxDiscount);
      setExpiresAt(initialData.expiresAt || '');
      setIsActive(initialData.isActive);
    } else {
      setCode('');
      setDescription('');
      setDiscountType('percentage');
      setDiscountValue(20);
      setMinOrderValue(499);
      setMaxDiscount(150);
      setExpiresAt('2026-12-31');
      setIsActive(true);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const payload = {
      ...(initialData ? { id: initialData.id, usageCount: initialData.usageCount } : {}),
      code: code.trim().toUpperCase(),
      description: description.trim() || `${discountType === 'percentage' ? `${discountValue}% OFF` : `₹${discountValue} FLAT OFF`} on orders above ₹${minOrderValue}`,
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue),
      maxDiscount: discountType === 'percentage' && maxDiscount ? Number(maxDiscount) : undefined,
      expiresAt: expiresAt || undefined,
      isActive
    };

    onSave(payload as any);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#121E36] border border-white/15 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white my-8 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0C1527]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F9D36A]/20 flex items-center justify-center text-[#F9D36A]">
              <Tag size={16} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {initialData ? `Edit Coupon: ${initialData.code}` : 'Create Discount Coupon'}
              </h3>
              <p className="text-[11px] text-gray-400">
                Coupons instantly apply in customer checkout & cart
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Coupon Code */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Coupon Code *
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s+/g, ''))}
              placeholder="e.g. MALVANI25, FESTIVE50"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-[#F9D36A] font-mono font-bold tracking-wider placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Offer Description / Title
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 20% off on all coastal favorites up to ₹150"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
            />
          </div>

          {/* Discount Type Toggle */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Discount Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDiscountType('percentage')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  discountType === 'percentage'
                    ? 'bg-[#F9D36A] border-[#F9D36A] text-[#0C1527] shadow-md'
                    : 'bg-black/30 border-white/15 text-gray-400 hover:text-white'
                }`}
              >
                <Percent size={14} />
                <span>Percentage Discount (%)</span>
              </button>

              <button
                type="button"
                onClick={() => setDiscountType('flat')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  discountType === 'flat'
                    ? 'bg-[#F9D36A] border-[#F9D36A] text-[#0C1527] shadow-md'
                    : 'bg-black/30 border-white/15 text-gray-400 hover:text-white'
                }`}
              >
                <IndianRupee size={14} />
                <span>Flat Amount (₹)</span>
              </button>
            </div>
          </div>

          {/* Values Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                {discountType === 'percentage' ? 'Percentage Off (%)' : 'Flat Discount (₹)'} *
              </label>
              <input
                type="number"
                required
                min={1}
                max={discountType === 'percentage' ? 100 : 5000}
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#F9D36A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Minimum Cart Value (₹) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#F9D36A]"
              />
            </div>
          </div>

          {/* Max Discount & Expiry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {discountType === 'percentage' ? (
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Max Discount Cap (₹)
                </label>
                <input
                  type="number"
                  min={1}
                  value={maxDiscount !== undefined ? maxDiscount : ''}
                  onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 150 (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#F9D36A]"
                />
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-400 p-3 bg-white/5 rounded-xl border border-white/10">
                <span>Flat discount applies directly once minimum order value is reached.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Valid Until
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#F9D36A]"
                />
              </div>
            </div>
          </div>

          {/* Active Switch */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-gray-600 bg-black/40 text-[#15803D] focus:ring-[#15803D]/40"
              />
              <span className="text-xs font-bold text-gray-200">
                {isActive ? '🟢 Active (Customer can apply at checkout)' : '⚪ Inactive / Paused'}
              </span>
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1427] text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95"
            >
              {initialData ? 'Save Coupon' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

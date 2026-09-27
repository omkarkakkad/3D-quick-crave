import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { X, Upload, Image as ImageIcon, Flame, Tag, IndianRupee, Sparkles } from 'lucide-react';
import type { MenuItem, MenuCategory } from '../../store/useStore';

interface DishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dish: Omit<MenuItem, 'id'> | MenuItem) => void;
  initialData?: MenuItem | null;
}

const PRESET_IMAGES = [
  { label: 'Pomfret Fry', url: '/images/pomfret-fry.jpg' },
  { label: 'Surmai Fry', url: '/images/surmai.jpg' },
  { label: 'Bangda Fry', url: '/images/bangda-fry.jpg' },
  { label: 'Prawns Koliwada', url: '/images/prawns.jpg' },
  { label: 'Crab Masala', url: '/images/crab.jpg' },
  { label: 'Malvani Thali', url: '/images/malvani-thali.jpg' },
  { label: 'Fish Curry Thali', url: '/images/fish-curry-thali.jpg' },
  { label: 'Goan Fish Curry', url: '/images/goan-fish-curry.jpg' },
  { label: 'Sol Kadi', url: '/images/solkadi.jpg' },
  { label: 'Kokum Sherbet', url: '/images/kokum-drink.jpg' },
  { label: 'Bombil Fry', url: '/images/bombil.jpg' },
  { label: 'Halwa Fish', url: '/images/basa-halva.jpg' }
];

export function DishModal({ isOpen, onClose, onSave, initialData }: DishModalProps) {
  const [name, setName] = useState('');
  const [nameMr, setNameMr] = useState('');
  const [category, setCategory] = useState<MenuCategory>("CHEF'S SPECIAL");
  const [categoryMr, setCategoryMr] = useState('शेफ स्पेशल');
  const [price, setPrice] = useState<number>(399);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [descriptionMr, setDescriptionMr] = useState('');
  const [image, setImage] = useState('/images/surmai.jpg');
  const [imageInputMode, setImageInputMode] = useState<'presets' | 'upload' | 'url'>('presets');
  const [customUrl, setCustomUrl] = useState('');
  const [vibesText, setVibesText] = useState('Crispy Rava, Chef Special');
  const [vibesMrText, setVibesMrText] = useState('कुरकुरीत रवा, शेफची पसंती');
  const [spiceLevel, setSpiceLevel] = useState<1 | 2 | 3>(2);
  const [inStock, setInStock] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isCombo, setIsCombo] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setNameMr(initialData.nameMr || '');
      setCategory(initialData.category || "CHEF'S SPECIAL");
      setCategoryMr(initialData.categoryMr || 'शेफ स्पेशल');
      setPrice(initialData.price || 0);
      setDiscountPrice(initialData.discountPrice);
      setDescription(initialData.description || '');
      setDescriptionMr(initialData.descriptionMr || '');
      setImage(initialData.image || '/images/surmai.jpg');
      setCustomUrl(initialData.image || '');
      setVibesText(initialData.vibes ? initialData.vibes.join(', ') : '');
      setVibesMrText(initialData.vibesMr ? initialData.vibesMr.join(', ') : '');
      setSpiceLevel(initialData.spiceLevel || 2);
      setInStock(initialData.inStock !== false);
      setIsBestseller(!!initialData.isBestseller);
      setIsCombo(!!initialData.isCombo);
    } else {
      // Defaults for new item
      setName('');
      setNameMr('');
      setCategory("CHEF'S SPECIAL");
      setCategoryMr('शेफ स्पेशल');
      setPrice(399);
      setDiscountPrice(undefined);
      setDescription('');
      setDescriptionMr('');
      setImage('/images/surmai.jpg');
      setCustomUrl('');
      setVibesText('Crispy Rava, Wild Catch');
      setVibesMrText('कुरकुरीत रवा, ताजी मासळी');
      setSpiceLevel(2);
      setInStock(true);
      setIsBestseller(false);
      setIsCombo(false);
    }
  }, [initialData, isOpen]);

  // Handle category change and auto-set Marathi category
  const handleCategoryChange = (cat: MenuCategory) => {
    setCategory(cat);
    if (cat === "CHEF'S SPECIAL") setCategoryMr('शेफ स्पेशल');
    else if (cat === 'MAIN COURSE') setCategoryMr('मुख्य जेवण');
    else if (cat === 'DRINKS') setCategoryMr('पेये');
  };

  // Handle image file upload (FileReader to base64)
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImage(result);
      setCustomUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const vibes = vibesText
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const vibesMr = vibesMrText
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const dishPayload = {
      ...(initialData ? { id: initialData.id } : {}),
      name: name.trim(),
      nameMr: nameMr.trim() || name.trim(),
      category,
      categoryMr: categoryMr.trim(),
      price: Number(price),
      discountPrice: discountPrice && Number(discountPrice) < Number(price) ? Number(discountPrice) : undefined,
      description: description.trim(),
      descriptionMr: descriptionMr.trim() || description.trim(),
      image: image.trim() || '/images/surmai.jpg',
      visual: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      vibes: vibes.length > 0 ? vibes : ['Chef Special'],
      vibesMr: vibesMr.length > 0 ? vibesMr : ['शेफ स्पेशल'],
      spiceLevel,
      inStock,
      isBestseller,
      isCombo
    };

    onSave(dishPayload as any);
    onClose();
  };

  if (!isOpen) return null;

  const discountSavings =
    discountPrice && discountPrice < price
      ? {
          amount: price - discountPrice,
          pct: Math.round(((price - discountPrice) / price) * 100)
        }
      : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#121E36] border border-white/15 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-white my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0C1527]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F9D36A]">
              Menu Engineering
            </span>
            <h3 className="text-xl font-black text-white">
              {initialData ? `Edit Dish: ${initialData.name}` : 'Add New Konkan Dish'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Names Row (English & Marathi) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Dish Name (English) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Surmai Rava Fry"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Dish Name (मराठी)
              </label>
              <input
                type="text"
                value={nameMr}
                onChange={(e) => setNameMr(e.target.value)}
                placeholder="उदा. सुरमई रवा फ्राय"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
              />
            </div>
          </div>

          {/* Category & Combo Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Menu Category
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as MenuCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#F9D36A]"
              >
                <option value="CHEF'S SPECIAL">Chef's Special (ताजे तळलेले / स्पेशल)</option>
                <option value="MAIN COURSE">Main Course (रसदार मालवणी करी)</option>
                <option value="DRINKS">Drinks & Coolers (सोलकढी आणि सरबत)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Is Feast Combo Box?
              </label>
              <button
                type="button"
                onClick={() => setIsCombo(!isCombo)}
                className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-colors border flex items-center justify-center gap-2 ${
                  isCombo
                    ? 'bg-[#E05A36] border-[#E05A36] text-white'
                    : 'bg-black/30 border-white/15 text-gray-400 hover:text-white'
                }`}
              >
                <span>{isCombo ? '✓ Feast Combo' : 'Single Dish'}</span>
              </button>
            </div>
          </div>

          {/* Pricing Row (Regular Price + Discount / Sale Price) */}
          <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee size={16} className="text-[#F9D36A]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Pricing & Live Discount Control
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Regular Menu Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#F9D36A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Discount / Offer Price (₹) <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={discountPrice !== undefined ? discountPrice : ''}
                  onChange={(e) => {
                    const val = e.target.value ? Number(e.target.value) : undefined;
                    setDiscountPrice(val);
                  }}
                  placeholder="e.g. 349 (leave empty if no discount)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#F9D36A]"
                />
              </div>
            </div>

            {/* Savings pill preview */}
            {discountSavings && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#15803D]/20 border border-[#15803D]/40 text-xs text-[#86EFAC]">
                <Sparkles size={14} className="text-[#F9D36A]" />
                <span>
                  Customer saves <strong>₹{discountSavings.amount}</strong> ({discountSavings.pct}% OFF on storefront)!
                </span>
              </div>
            )}
          </div>

          {/* Dish Image Section */}
          <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <ImageIcon size={16} className="text-[#F9D36A]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  Dish Photography
                </h4>
              </div>
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageInputMode('presets')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                    imageInputMode === 'presets' ? 'bg-[#F9D36A] text-[#0C1527]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Gallery Presets
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('upload')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                    imageInputMode === 'upload' ? 'bg-[#F9D36A] text-[#0C1527]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('url')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                    imageInputMode === 'url' ? 'bg-[#F9D36A] text-[#0C1527]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Custom URL
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Preview Thumbnail */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-black/60 border border-white/20 shrink-0 relative group">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1.5 py-0.5 rounded text-white font-mono">
                  Preview
                </span>
              </div>

              {/* Mode Controls */}
              <div className="flex-1 w-full">
                {imageInputMode === 'presets' && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
                    {PRESET_IMAGES.map((p) => (
                      <button
                        type="button"
                        key={p.url}
                        onClick={() => setImage(p.url)}
                        className={`p-1 rounded-xl border text-left transition-all ${
                          image === p.url
                            ? 'border-[#F9D36A] bg-[#F9D36A]/20 scale-95'
                            : 'border-white/10 hover:border-white/30 bg-black/30'
                        }`}
                      >
                        <img src={p.url} alt={p.label} className="w-full h-10 object-cover rounded-lg mb-1" />
                        <span className="text-[10px] block truncate font-medium text-gray-300">
                          {p.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {imageInputMode === 'upload' && (
                  <div className="border border-dashed border-white/20 rounded-xl p-4 text-center hover:border-[#F9D36A] transition-colors">
                    <Upload size={22} className="mx-auto mb-2 text-[#F9D36A]" />
                    <p className="text-xs text-gray-300 mb-2 font-medium">
                      Select high-res food image from device
                    </p>
                    <label className="inline-block px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer transition-colors">
                      <span>Browse Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {imageInputMode === 'url' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Direct Image Web URL
                    </label>
                    <input
                      type="url"
                      value={customUrl}
                      onChange={(e) => {
                        setCustomUrl(e.target.value);
                        setImage(e.target.value);
                      }}
                      placeholder="https://example.com/photos/dish.jpg"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description Row (English & Marathi) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Description (English)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Fresh catch marinated in traditional red spices..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Description (मराठी)
              </label>
              <textarea
                rows={3}
                value={descriptionMr}
                onChange={(e) => setDescriptionMr(e.target.value)}
                placeholder="मालवणी मसाल्यात घोळवलेली ताजी मासळी..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
              />
            </div>
          </div>

          {/* Tags & Spice Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Vibes / Badges (comma separated)
              </label>
              <input
                type="text"
                value={vibesText}
                onChange={(e) => setVibesText(e.target.value)}
                placeholder="Crispy Rava, Chef Pick, Wild Catch"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#F9D36A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Spice Level
              </label>
              <div className="flex gap-2">
                {[
                  { level: 1, label: '🌶️ Mild' },
                  { level: 2, label: '🌶️🌶️ Medium' },
                  { level: 3, label: '🌶️🌶️🌶️ Konkan Hot' }
                ].map((s) => (
                  <button
                    key={s.level}
                    type="button"
                    onClick={() => setSpiceLevel(s.level as 1 | 2 | 3)}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                      spiceLevel === s.level
                        ? 'bg-[#E05A36] border-[#E05A36] text-white shadow-md'
                        : 'bg-black/30 border-white/15 text-gray-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stock & Bestseller Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-6">
              {/* In-Stock Toggle */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="rounded border-gray-600 bg-black/40 text-[#15803D] focus:ring-[#15803D]/40"
                />
                <span className="text-xs font-bold text-gray-200">
                  {inStock ? '🟢 In Stock (Available to Order)' : '🔴 Out of Stock (Sold Out)'}
                </span>
              </label>

              {/* Bestseller Toggle */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="rounded border-gray-600 bg-black/40 text-[#F9D36A] focus:ring-[#F9D36A]/40"
                />
                <span className="text-xs font-bold text-[#F9D36A] flex items-center gap-1">
                  <Flame size={13} />
                  <span>Highlight as Bestseller</span>
                </span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0C1527] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1427] text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95"
          >
            {initialData ? 'Save Changes' : 'Create & Publish Dish'}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Flame, Tag, Check, X, RefreshCw, Grid, List, Sparkles } from 'lucide-react';
import { useStore, type MenuItem, type MenuCategory } from '../../../store/useStore';

interface MenuTabProps {
  onOpenDishModal: (dish?: MenuItem) => void;
}

export function MenuTab({ onOpenDishModal }: MenuTabProps) {
  const menuItems = useStore((s) => s.menuItems);
  const deleteMenuItem = useStore((s) => s.deleteMenuItem);
  const toggleStock = useStore((s) => s.toggleStock);
  const resetMenuToDefault = useStore((s) => s.resetMenuToDefault);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [stockFilter, setStockFilter] = useState<'ALL' | 'IN_STOCK' | 'OUT_OF_STOCK'>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'COMBOS' && !item.isCombo) return false;
      if (selectedCategory !== 'COMBOS' && item.category !== selectedCategory) return false;
    }

    if (stockFilter === 'IN_STOCK' && item.inStock === false) return false;
    if (stockFilter === 'OUT_OF_STOCK' && item.inStock !== false) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.nameMr.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.vibes.some((v) => v.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the menu?`)) {
      deleteMenuItem(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121E36] border border-white/15 p-5 rounded-3xl shadow-xl">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F9D36A]">
            Kitchen Catalog ({menuItems.length} Dishes)
          </span>
          <h2 className="text-xl font-black text-white">
            Menu Items & Pricing Engine
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Set base prices, live sale discounts, upload dish photos, and toggle stock in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenDishModal()}
            className="px-5 py-2.5 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1427] font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Plus size={16} />
            <span>Add New Dish</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset menu items to default Konkan seafood catalog?')) {
                resetMenuToDefault();
              }
            }}
            title="Reset Default Menu Catalog"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#121E36] border border-white/15 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dish (English or मराठी)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F9D36A]"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Dishes' },
            { id: "CHEF'S SPECIAL", label: "Chef's Special" },
            { id: 'MAIN COURSE', label: 'Curries' },
            { id: 'COMBOS', label: 'Feast Combos' },
            { id: 'DRINKS', label: 'Coolers' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-[#1E2B58] border-[#F9D36A] text-[#F9D36A]'
                  : 'bg-black/20 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stock Filter & View Mode */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[#F9D36A]"
          >
            <option value="ALL">All Stock Status</option>
            <option value="IN_STOCK">🟢 In Stock Only</option>
            <option value="OUT_OF_STOCK">🔴 Out of Stock Only</option>
          </select>

          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-[#F9D36A] text-black' : 'text-gray-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#F9D36A] text-black' : 'text-gray-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Dishes List */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#121E36] border border-white/15">
          <p className="text-gray-400 text-sm">No dishes found matching your search or filters.</p>
        </div>
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="bg-[#121E36] border border-white/15 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#0C1527] text-gray-400 uppercase tracking-wider text-[10px] font-black border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Dish</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Base Price</th>
                  <th className="py-3.5 px-4">Sale / Discount</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => {
                  const isInStock = item.inStock !== false;
                  const hasDiscount = item.discountPrice && item.discountPrice < item.price;
                  const discountPct = hasDiscount
                    ? Math.round(((item.price - item.discountPrice!) / item.price) * 100)
                    : 0;

                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      {/* Photo & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover bg-black/40 border border-white/10 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-sm">
                                {item.name}
                              </span>
                              {item.isBestseller && (
                                <span title="Bestseller">
                                  <Flame size={12} className="text-[#F9D36A]" />
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-gray-400 block font-medium">
                              {item.nameMr}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10">
                          {item.category}
                        </span>
                      </td>

                      {/* Base Price */}
                      <td className="py-3 px-4 font-mono font-bold text-white text-sm">
                        <span className={hasDiscount ? 'line-through text-gray-400 text-xs' : ''}>
                          ₹{item.price}
                        </span>
                      </td>

                      {/* Sale Price */}
                      <td className="py-3 px-4">
                        {hasDiscount ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#F9D36A] text-sm">
                              ₹{item.discountPrice}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#15803D]/30 border border-[#15803D]/50 text-[10px] font-black text-[#86EFAC]">
                              {discountPct}% OFF
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">—</span>
                        )}
                      </td>

                      {/* Stock Switch Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleStock(item.id)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all border flex items-center gap-1.5 ${
                            isInStock
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isInStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
                          <span>{isInStock ? 'In Stock' : 'Out of Stock'}</span>
                        </button>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenDishModal(item)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                            title="Edit Dish"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 transition-colors"
                            title="Delete Dish"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isInStock = item.inStock !== false;
            const hasDiscount = item.discountPrice && item.discountPrice < item.price;
            const discountPct = hasDiscount
              ? Math.round(((item.price - item.discountPrice!) / item.price) * 100)
              : 0;

            return (
              <div
                key={item.id}
                className="bg-[#121E36] border border-white/15 rounded-3xl p-4 flex flex-col justify-between hover:border-white/30 transition-all shadow-xl"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3.5 bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      {hasDiscount && (
                        <span className="px-2 py-0.5 rounded-full bg-[#15803D] text-white text-[10px] font-black tracking-wider">
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h4 className="text-base font-bold text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        {item.nameMr}
                      </p>
                    </div>
                    {item.isBestseller && (
                      <span className="px-2 py-0.5 rounded-md bg-[#F9D36A]/20 text-[#F9D36A] text-[10px] font-bold flex items-center gap-1 shrink-0">
                        <Flame size={11} />
                        <span>Top</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block leading-none mb-0.5">
                      Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-base font-black text-white">
                        ₹{item.discountPrice || item.price}
                      </span>
                      {hasDiscount && (
                        <span className="font-mono text-xs text-gray-500 line-through">
                          ₹{item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStock(item.id)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${
                        isInStock
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}
                    >
                      {isInStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                    <button
                      onClick={() => onOpenDishModal(item)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
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

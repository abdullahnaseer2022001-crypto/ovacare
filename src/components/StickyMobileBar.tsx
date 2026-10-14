import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { BUNDLES } from '../data/productData';

interface StickyMobileBarProps {
  onOpenCart: () => void;
  onInstantBuy: (variantId: string, quantity: number) => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onOpenCart,
  onInstantBuy,
}) => {
  const featured = BUNDLES[1]; // Duo pack default

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[#3D5A44]/20 shadow-2xl flex items-center justify-between gap-3">
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display font-bold text-lg text-[#223728]">
            Rs. {featured.price.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-400 line-through">
            Rs. {featured.originalPrice.toLocaleString()}
          </span>
        </div>
        <span className="text-[10px] text-emerald-700 font-bold block">
          Cash on Delivery · 30-Day Cycle
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onOpenCart}
          className="p-2.5 rounded-xl border border-gray-300 text-[#223728] hover:bg-gray-100"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-5 h-5 text-[#3D5A44]" />
        </button>

        <button
          onClick={() => onInstantBuy(featured.id, 1)}
          className="py-2.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 whitespace-nowrap"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-current" />
          <span>Buy Now (COD)</span>
        </button>
      </div>
    </div>
  );
};

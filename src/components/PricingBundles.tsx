import React from 'react';
import { BUNDLES } from '../data/productData';
import { Check, Sparkles, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';

interface PricingBundlesProps {
  onAddToCart: (variantId: string, quantity: number) => void;
  onInstantBuy: (variantId: string, quantity: number) => void;
}

export const PricingBundles: React.FC<PricingBundlesProps> = ({
  onAddToCart,
  onInstantBuy,
}) => {
  return (
    <section id="pricing" className="py-16 bg-[#F4EFE6]/70 border-b border-[#3D5A44]/15 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D5A44]/10 text-[#3D5A44] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D49B38]" />
            <span>Honest & Transparent Pricing</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#223728] tracking-tight mb-4">
            Invest in Your Hormonal Health
          </h2>
          <p className="text-[#2B3B2F]/80 text-base sm:text-lg">
            Hormonal rebalancing is a gradual, natural process. Choose the protocol that aligns with your wellness goals. Cash on Delivery available nationwide.
          </p>
        </div>

        {/* Pricing Cards Grid (Responsive CSS Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {BUNDLES.map((bundle) => {
            const pricePerDay = Math.round(bundle.price / bundle.daysSupply);
            return (
              <div
                key={bundle.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  bundle.popular
                    ? 'bg-white border-2 border-[#3D5A44] shadow-2xl ring-4 ring-[#3D5A44]/10 lg:-translate-y-2'
                    : bundle.bestValue
                    ? 'bg-white border-2 border-[#C26859] shadow-xl lg:-translate-y-1'
                    : 'bg-white/90 border border-[#3D5A44]/20 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular / Best Value Badges */}
                {bundle.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3D5A44] text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    Most Popular Cycle Pack
                  </div>
                )}
                {bundle.bestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C26859] text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    Best Value 90-Day Reset
                  </div>
                )}

                <div>
                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#587960] block">
                      {bundle.bottles} {bundle.bottles === 1 ? 'Bottle' : 'Bottles'} ({bundle.capsules} Capsules)
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#223728] mt-1">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-[#2B3B2F]/75 mt-1">
                      {bundle.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/15 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-bold text-3xl sm:text-4xl text-[#223728]">
                        Rs. {bundle.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        Rs. {bundle.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#587960]">
                        Only Rs. {pricePerDay} / day
                      </span>
                      <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        Save Rs. {bundle.savings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2.5 text-xs text-[#2B3B2F] mb-6">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{bundle.daysSupply} days continuous supply at 2 capsules/day</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>100% Vegetarian HPMC capsules (Halal certified)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Cash on Delivery (Pay when courier arrives)</span>
                    </div>
                    {bundle.freeShipping && (
                      <div className="flex items-start gap-2 text-emerald-800 font-bold">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>FREE Nationwide Express Delivery</span>
                      </div>
                    )}
                    {bundle.gift && (
                      <div className="flex items-start gap-2 text-[#C26859] font-bold">
                        <Sparkles className="w-4 h-4 text-[#C26859] flex-shrink-0 mt-0.5" />
                        <span>Included: {bundle.gift}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => onInstantBuy(bundle.id, 1)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
                      bundle.popular
                        ? 'bg-[#3D5A44] hover:bg-[#25392A] text-white shadow-[#3D5A44]/30'
                        : 'bg-[#223728] hover:bg-[#152219] text-white'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-current" />
                    Order Cash on Delivery
                  </button>

                  <button
                    onClick={() => onAddToCart(bundle.id, 1)}
                    className="w-full py-2.5 px-3 rounded-xl border border-gray-300 hover:border-[#3D5A44] text-[#223728] hover:bg-gray-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#3D5A44]" />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Guarantee */}
        <div className="mt-12 text-center text-xs text-[#587960] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Every package is shipped in discreet, tamper-proof packaging to protect your personal privacy.</span>
        </div>

      </div>
    </section>
  );
};

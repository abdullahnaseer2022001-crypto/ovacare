import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Zap, 
  Leaf, 
  Layers,
  ArrowRight,
  Info,
  CalendarCheck
} from 'lucide-react';
import { PRODUCT_DETAILS, BUNDLES, ASSETS, STORE_DETAILS } from '../data/productData';

interface HeroSectionProps {
  onAddToCart: (variantId: string, quantity: number) => void;
  onInstantBuy: (variantId: string, quantity: number) => void;
  onOpenLabelInspector: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAddToCart,
  onInstantBuy,
  onOpenLabelInspector,
  onOpenQuiz,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState(BUNDLES[0].id); // 1 bottle (Rs. 1500) default
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'bottle' | 'table'>('bottle');

  const selectedBundle = BUNDLES.find((b) => b.id === selectedBundleId) || BUNDLES[0];
  const totalPrice = selectedBundle.price * quantity;
  const originalTotalPrice = selectedBundle.originalPrice * quantity;
  const totalSavings = originalTotalPrice - totalPrice;

  return (
    <section id="top" className="relative pt-6 pb-16 lg:py-16 overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#3D5A44]/10 via-[#C26859]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 -right-20 w-80 h-80 bg-[#D49B38]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & Ordering Controls */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* PureBite Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EDE4] border border-[#3D5A44]/25 text-[#223728] text-xs font-semibold mb-3 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#3D5A44] animate-ping" />
              <span className="font-bold text-[#3D5A44]">PureBite Nutrition</span>
              <span className="text-gray-400">|</span>
              <span>Featuring OvaCare Organics™</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#223728] leading-[1.18] mb-3">
              Restore Your Natural Cycle.{' '}
              <span className="shimmer-text block sm:inline">Hormonal Balance</span>{' '}
              with Daily 1 Capsule.
            </h1>

            {/* Subheading / Roman Urdu context */}
            <p className="text-base sm:text-lg text-[#2B3B2F]/85 leading-relaxed mb-4 max-w-2xl font-normal">
              A 100% natural blend of <strong className="text-[#223728] font-semibold">6 pure cold-ground seeds & Ceylon cinnamon</strong> in clean vegetarian capsules. Natural daily support for irregular periods, chin acne, and insulin cravings.
            </p>

            {/* Dosage Callout Highlight (Daily 1 capsule) */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-950 mb-5">
              <CalendarCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                <strong>Dosage: Daily 1 Capsule Only</strong> with water after breakfast (Each bottle lasts 30 Days / 1 Month)
              </span>
            </div>

            {/* Ratings & Social Proof Bar */}
            <div className="flex flex-wrap items-center gap-4 py-2 px-3.5 rounded-xl bg-white/80 border border-[#3D5A44]/15 shadow-sm mb-5 w-full sm:w-auto">
              <div className="flex items-center gap-1 text-[#D49B38]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs font-semibold text-[#223728]">
                <span>4.9 / 5.0 Rating</span>
                <span className="text-[#587960] font-normal ml-1.5">
                  (420+ Verified Reviews in Pakistan)
                </span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-gray-300" />
              <span className="text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Pure Natural Seeds
              </span>
            </div>

            {/* Bundle Selector Boxes (Rs. 1500 single / Rs. 3000 double / Rs. 4500 triple) */}
            <div className="w-full mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#223728]/80">
                  Select Quantity & Supply:
                </label>
                <button
                  onClick={onOpenQuiz}
                  className="text-xs font-semibold text-[#3D5A44] hover:text-[#C26859] underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#D49B38]" /> 30s PCOS Assessment
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUNDLES.map((bundle) => {
                  const isSelected = bundle.id === selectedBundleId;
                  return (
                    <button
                      key={bundle.id}
                      onClick={() => setSelectedBundleId(bundle.id)}
                      className={`relative text-left p-3.5 rounded-xl transition-all border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#E3EDE4]/70 border-[#3D5A44] ring-2 ring-[#3D5A44]/30 shadow-md'
                          : 'bg-white/80 border-gray-200 hover:border-[#3D5A44]/50 hover:bg-white'
                      }`}
                    >
                      {bundle.popular && (
                        <span className="absolute -top-2.5 right-3 bg-[#3D5A44] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                          Double Pack
                        </span>
                      )}
                      {bundle.bestValue && (
                        <span className="absolute -top-2.5 right-3 bg-[#C26859] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                          3-Month Reset
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#223728]">
                            {bundle.bottles} {bundle.bottles === 1 ? 'Bottle' : 'Bottles'}
                          </span>
                          <span className="text-[11px] font-semibold text-[#587960] bg-white/90 px-1.5 py-0.5 rounded">
                            {bundle.daysSupply} Days
                          </span>
                        </div>
                        <p className="text-[11px] text-[#2B3B2F]/75 mt-0.5">
                          {bundle.capsules} capsules (Daily 1)
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#3D5A44]/15 flex items-baseline justify-between">
                        <div>
                          <span className="font-bold text-base text-[#223728]">
                            Rs. {bundle.price.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-gray-400 line-through ml-1.5">
                            Rs. {bundle.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Save Rs. {bundle.savings}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Price & Checkout Actions */}
            <div className="w-full p-4 rounded-2xl bg-white border border-[#3D5A44]/20 shadow-md mb-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div>
                  <span className="text-xs text-[#587960] font-medium block">Price:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#223728]">
                      Rs. {totalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {originalTotalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#C26859] bg-[#F7E7E4] px-2 py-0.5 rounded-md">
                      Save Rs. {totalSavings.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#223728]">Sets:</span>
                  <div className="inline-flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 hover:bg-gray-200 text-[#223728] font-bold text-sm"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 font-semibold text-sm min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 hover:bg-gray-200 text-[#223728] font-bold text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onAddToCart(selectedBundle.id, quantity)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#E3EDE4] text-[#223728] border-2 border-[#3D5A44] font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-[#3D5A44]" />
                  Add to Cart ({quantity})
                </button>

                <button
                  onClick={() => onInstantBuy(selectedBundle.id, quantity)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#3D5A44]/30"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-current" />
                  Order Cash on Delivery (COD)
                </button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-[#587960] font-medium pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Pay Cash at Doorstep
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" /> 24–48h Dispatch in Pakistan
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Herbal
                </span>
              </div>
            </div>

            {/* Quick Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#2B3B2F] w-full">
              {PRODUCT_DETAILS.highlights.slice(0, 6).map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-700 bg-emerald-100 rounded-full p-0.5 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Natural Photorealistic Bottle Showcase (No Cheap Vectors) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* View Mode Toggle Switch */}
            <div className="inline-flex p-1 bg-white/80 backdrop-blur border border-[#3D5A44]/20 rounded-full shadow-sm mb-4">
              <button
                onClick={() => setViewMode('bottle')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'bottle'
                    ? 'bg-[#3D5A44] text-white shadow-md'
                    : 'text-[#223728] hover:text-[#3D5A44]'
                }`}
              >
                Natural Bottle Photo
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#3D5A44] text-white shadow-md'
                    : 'text-[#223728] hover:text-[#3D5A44]'
                }`}
              >
                Formula Breakdown
              </button>
            </div>

            {/* Product Card Container */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl bg-white border border-[#3D5A44]/20 p-4 shadow-xl overflow-hidden group">
              
              {/* Floating Badge 1 - Top Left */}
              <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-1.5 rounded-xl shadow-md border border-[#3D5A44]/20 text-left">
                <span className="text-[10px] uppercase font-bold text-[#C26859] block">
                  Per Capsule
                </span>
                <span className="text-xs font-bold text-[#223728]">
                  750 mg Pure Blend
                </span>
              </div>

              {/* Floating Badge 2 - Top Right */}
              <div className="absolute top-4 right-4 z-10 glass-panel px-3 py-1.5 rounded-xl shadow-md border border-[#3D5A44]/20 text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                  Daily 1 Capsule
                </span>
                <span className="text-xs font-bold text-[#223728]">
                  30 Days Supply
                </span>
              </div>

              {/* View 1: Real High-Resolution Photorealistic Bottle */}
              {viewMode === 'bottle' ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center pt-6">
                  <div className="relative w-full h-full max-h-[380px] flex items-center justify-center overflow-hidden rounded-2xl">
                    <img
                      src={ASSETS.bottle}
                      alt="OvaCare Organics Seed Blend Supplement Bottle by PureBite Nutrition"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating Footer Notification */}
                  <div className="absolute bottom-4 z-10 glass-panel px-4 py-1.5 rounded-full shadow-md border border-[#3D5A44]/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-[#223728]">
                      Authentic PureBite Nutrition Bottle (Rs. 1,500)
                    </span>
                  </div>
                </div>
              ) : (
                /* View 2: Formula Breakdown */
                <div className="w-full h-full flex flex-col justify-center p-2 text-xs">
                  <div className="text-center mb-3">
                    <span className="font-display font-bold text-base text-[#223728]">
                      Official Formula Breakdown
                    </span>
                    <p className="text-[11px] text-[#587960]">
                      Total Blend per Container: 22.5 grams (30 capsules)
                    </p>
                  </div>

                  <div className="bg-[#FAF7F2] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-[#223728] text-white">
                          <th className="py-1.5 px-3 font-semibold">Seed Ingredient</th>
                          <th className="py-1.5 px-3 font-semibold text-right">Per Capsule</th>
                          <th className="py-1.5 px-3 font-semibold text-right">Per Bottle</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {['Flaxseeds (Alsi)', 'Pumpkin Seeds (Kaddu)', 'Sunflower Seeds (Surajmukhi)', 'Sesame Seeds (Til)', 'Chia Seeds', 'Ceylon Cinnamon (Darcheeni)'].map(
                          (name, idx) => (
                            <tr key={idx} className="hover:bg-white">
                              <td className="py-2 px-3 font-medium text-[#223728]">{name}</td>
                              <td className="py-2 px-3 text-right text-emerald-800 font-bold">125 mg</td>
                              <td className="py-2 px-3 text-right text-gray-500">3.75 g</td>
                            </tr>
                          )
                        )}
                        <tr className="bg-emerald-50/80 font-bold text-[#223728]">
                          <td className="py-2.5 px-3">Total Active Blend</td>
                          <td className="py-2.5 px-3 text-right text-emerald-900 font-extrabold">750 mg</td>
                          <td className="py-2.5 px-3 text-right">22.5 g</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-center text-[10px] text-[#587960] mt-3">
                    Dosage: 1 capsule daily after meal with water.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Inspection Action */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onOpenLabelInspector}
                className="text-xs font-semibold text-[#3D5A44] hover:text-[#C26859] transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full hover:bg-white"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>View Packaging Label, Doses & Cautions</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

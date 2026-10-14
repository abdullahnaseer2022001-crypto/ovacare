import React, { useState } from 'react';
import { INGREDIENTS } from '../data/productData';
import { Ingredient } from '../types';
import { Sparkles, CheckCircle2, ChevronRight, X, AlertCircle } from 'lucide-react';

export const IngredientsBentoGrid: React.FC = () => {
  const [activeModalIngredient, setActiveModalIngredient] = useState<Ingredient | null>(null);

  return (
    <section id="ingredients" className="py-16 bg-[#F4EFE6]/60 border-y border-[#3D5A44]/15 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D5A44]/10 text-[#3D5A44] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D49B38]" />
            <span>Pure Botanical Formulation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#223728] tracking-tight mb-4">
            Six Power Seeds. Equal 125 mg Clinical Ratio.
          </h2>
          <p className="text-[#2B3B2F]/80 text-base sm:text-lg">
            Every vegetarian capsule contains an exact, laboratory-measured blend of 6 organically grown seeds and Ceylon cinnamon bark — providing the hormonal synergy of seed cycling without mess, grinding, or rancid oxidation.
          </p>
        </div>

        {/* Responsive CSS Grid (3 columns on lg, 2 on md, 1 on sm) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#3D5A44]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* High-Resolution Macro Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={`${item.name} (${item.urduName})`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Floating Urdu Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    {item.urduName}
                  </div>

                  {/* Dose Indicator Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#223728] text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm border border-emerald-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>{item.dosePerCap} / cap</span>
                    <span className="text-gray-400 font-normal">({item.doseTotal} bottle)</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-display font-bold text-lg text-[#223728]">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs italic text-[#587960] font-serif mb-2.5">
                    {item.botanicalName}
                  </p>

                  <p className="text-xs text-[#2B3B2F]/85 leading-relaxed mb-3.5">
                    {item.summary}
                  </p>

                  {/* PCOS Targeted Benefit Pill */}
                  <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#3D5A44]/15 text-xs text-[#223728] mb-2">
                    <strong className="text-[#C26859] block text-[11px] uppercase tracking-wider font-bold mb-0.5">
                      PCOS Target Action:
                    </strong>
                    <span className="text-[11.5px] leading-snug block">
                      {item.pcosBenefit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveModalIngredient(item)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#E3EDE4]/50 hover:bg-[#3D5A44] text-[#223728] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#3D5A44]/20"
                >
                  <span>Explore Science & Nutrients</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Encapsulation is Superior Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[#3D5A44]/20 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C26859] block mb-1">
                The Seed Cycling Dilemma Solved
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#223728] mb-2">
                Why Capsule Blends Outperform Raw Home-Ground Seeds
              </h3>
              <p className="text-xs sm:text-sm text-[#2B3B2F]/80 leading-relaxed">
                Raw seeds contain delicate polyunsaturated fatty acids that oxidize and turn rancid within 24 hours of home grinding, causing digestive irritation. OvaCare Organics cold-mills certified organic seeds in an oxygen-controlled environment and immediately encapsulates them in airtight vegetable shells.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-2.5 text-xs font-semibold text-[#223728]">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero seed rancidity or oxidation</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>No messy grinding or seed weighing</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Easy twice-daily travel friendly routine</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Ingredient Detailed Modal */}
      {activeModalIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3D5A44]/20 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalIngredient(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={activeModalIngredient.image}
                alt={activeModalIngredient.name}
                className="w-16 h-16 rounded-2xl object-cover border border-[#3D5A44]/20 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-xl text-[#223728]">
                    {activeModalIngredient.name}
                  </h3>
                  <span className="text-xs bg-[#FAF7F2] font-semibold text-[#C26859] px-2 py-0.5 rounded-full border border-[#C26859]/20">
                    {activeModalIngredient.urduName}
                  </span>
                </div>
                <p className="text-xs text-[#587960] italic font-serif">
                  {activeModalIngredient.botanicalName}
                </p>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  Standardized at {activeModalIngredient.dosePerCap} per capsule ({activeModalIngredient.doseTotal} per bottle)
                </p>
              </div>
            </div>

            {/* Key Nutrients */}
            <div className="mb-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#3D5A44]/15">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D5A44] block mb-1">
                Active Bioactive Molecules:
              </span>
              <p className="text-xs font-semibold text-[#223728]">
                {activeModalIngredient.keyNutrient}
              </p>
            </div>

            {/* PCOS Target Benefit */}
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                How It Helps PCOS Symptoms:
              </span>
              <p className="text-xs text-[#223728] leading-relaxed">
                {activeModalIngredient.pcosBenefit}
              </p>
            </div>

            {/* Detail Bullet Points */}
            <div className="space-y-2 mb-6 text-xs text-[#2B3B2F]">
              <span className="font-bold text-[#223728] block mb-1">Clinical Highlights:</span>
              {activeModalIngredient.details.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModalIngredient(null)}
              className="w-full py-3 rounded-xl bg-[#3D5A44] text-white font-bold text-xs hover:bg-[#25392A] transition-colors"
            >
              Close Ingredient Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

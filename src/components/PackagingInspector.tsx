import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  Building2, 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  Maximize2 
} from 'lucide-react';
import { INGREDIENTS, PRODUCT_DETAILS } from '../data/productData';

export const PackagingInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'table' | 'directions' | 'caution' | 'storage'>('table');

  return (
    <section id="label" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EDE4] text-[#223728] text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-[#3D5A44]" />
            <span>100% Transparent Labeling</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#223728] tracking-tight mb-3">
            The Official OvaCare Packaging & Quality Standards
          </h2>
          <p className="text-[#2B3B2F]/80 text-base">
            No hidden proprietary blends or mystery fillers. Every milligram is verified on our product carton and certified bottle label.
          </p>
        </div>

        {/* Interactive Label Inspector Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#FAF7F2] border-2 border-[#3D5A44]/20 p-6 sm:p-8 shadow-xl">
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-[#3D5A44]/15 pb-4">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'table'
                  ? 'bg-[#3D5A44] text-white shadow-md'
                  : 'bg-white text-[#223728] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Supplement Facts</span>
            </button>

            <button
              onClick={() => setActiveTab('directions')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'directions'
                  ? 'bg-[#3D5A44] text-white shadow-md'
                  : 'bg-white text-[#223728] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>How To Use & Dosage</span>
            </button>

            <button
              onClick={() => setActiveTab('caution')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'caution'
                  ? 'bg-[#C26859] text-white shadow-md'
                  : 'bg-white text-[#223728] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Cautions & Disclaimers</span>
            </button>

            <button
              onClick={() => setActiveTab('storage')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'storage'
                  ? 'bg-[#3D5A44] text-white shadow-md'
                  : 'bg-white text-[#223728] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Storage & Manufacturer</span>
            </button>
          </div>

          {/* Tab 1: Supplement Facts Table */}
          {activeTab === 'table' && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#3D5A44]/20 shadow-sm animate-fadeIn">
              <div className="border-b-4 border-black pb-2 mb-3">
                <h3 className="font-display font-black text-2xl tracking-tight uppercase text-black">
                  Supplement Facts
                </h3>
                <p className="text-xs text-gray-600 font-medium">
                  Serving Size: 1 Capsule (750 mg) | Servings Per Container: 30 Capsules
                </p>
                <p className="text-xs text-gray-500">
                  Daily Dosage: 2 Capsules (1,500 mg per day)
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black text-[11px] font-extrabold uppercase">
                      <th className="py-2 pr-4">Active Botanical Ingredient</th>
                      <th className="py-2 px-3 text-center">Form</th>
                      <th className="py-2 px-3 text-right">Per Capsule (750 mg)</th>
                      <th className="py-2 pl-3 text-right">Per Container (22.5 g)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs font-medium">
                    {INGREDIENTS.map((item) => (
                      <tr key={item.id} className="hover:bg-emerald-50/40">
                        <td className="py-2.5 pr-4">
                          <span className="font-bold text-[#223728] block">{item.name}</span>
                          <span className="text-[10px] text-gray-500 italic font-serif">
                            {item.botanicalName} ({item.urduName})
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center text-gray-600">Pure Ground</td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-[#3D5A44]">
                          {item.dosePerCap}
                        </td>
                        <td className="py-2.5 pl-3 text-right text-gray-700">
                          {item.doseTotal}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-black font-extrabold bg-[#FAF7F2] text-sm">
                      <td className="py-3 pr-4 text-[#223728]">Total Active Botanical Blend</td>
                      <td className="py-3 px-3 text-center text-gray-600">—</td>
                      <td className="py-3 px-3 text-right text-emerald-800 font-black">750 mg*</td>
                      <td className="py-3 pl-3 text-right text-black font-black">22.5 g*</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
                * Daily Value (DV) not established. Standardized non-GMO botanical seed blend. Free from soy, wheat, dairy, and artificial binding agents.
              </p>
            </div>
          )}

          {/* Tab 2: How To Use & Daily Routine */}
          {activeTab === 'directions' && (
            <div className="bg-white rounded-2xl p-6 border border-[#3D5A44]/20 shadow-sm animate-fadeIn">
              <h3 className="font-display font-bold text-xl text-[#223728] mb-4">
                Recommended Daily Dosage & Instructions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">☀️</span>
                    <strong className="text-sm font-bold text-amber-950">Morning Routine</strong>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Take <strong>1 capsule</strong> 15–30 minutes after your breakfast with a full glass of lukewarm water. This supplies essential omega-3s and Ceylon cinnamon to support post-breakfast insulin sensitivity.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🌙</span>
                    <strong className="text-sm font-bold text-indigo-950">Evening Routine</strong>
                  </div>
                  <p className="text-xs text-indigo-900 leading-relaxed">
                    Take <strong>1 capsule</strong> with water after dinner. Pumpkin seed magnesium and tryptophan help relax your nervous system for deep restorative sleep while seeds nourish hormonal pathways overnight.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#E3EDE4]/50 border border-[#3D5A44]/20 text-xs text-[#223728] space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Consistency is Key:</strong> Continue taking the blend consistently for at least 30–60 days to allow deep hormonal adaptation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Hydration:</strong> Drink at least 8 to 10 glasses of clean water daily to assist the natural seed fiber in binding waste estrogens.</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Cautions & Disclaimers */}
          {activeTab === 'caution' && (
            <div className="bg-white rounded-2xl p-6 border border-red-200 shadow-sm animate-fadeIn">
              <div className="flex items-center gap-2 text-red-700 mb-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <h3 className="font-display font-bold text-lg text-red-900">
                  Official Caution & Medical Disclaimer
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Not a substitute for a balanced diet:</strong> This product is a botanical dietary food supplement and should be used alongside healthy lifestyle practices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Recommended for adults only:</strong> Not intended for children under 18 years of age without explicit pediatric guidance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Pregnancy & Nursing:</strong> Consult your physician or OB/GYN before taking if you are pregnant, planning to conceive, or currently breastfeeding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Medications:</strong> If you are taking prescription blood thinners or diabetes medication, discuss with your doctor as cinnamon and seeds naturally modulate blood sugar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Discontinue use</strong> if any hypersensitivity or adverse reaction occurs.</span>
                </li>
              </ul>

              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 italic">
                * Legal Disclaimer: This product is not intended to diagnose, treat, cure, or prevent any medical condition.
              </div>
            </div>
          )}

          {/* Tab 4: Storage & Manufacturer Info */}
          {activeTab === 'storage' && (
            <div className="bg-white rounded-2xl p-6 border border-[#3D5A44]/20 shadow-sm animate-fadeIn">
              <h3 className="font-display font-bold text-xl text-[#223728] mb-4">
                Storage Instructions & Batch Verification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <strong className="block text-sm font-bold text-[#223728] mb-1">
                    Storage Guidelines:
                  </strong>
                  <ul className="space-y-1.5 text-gray-600">
                    <li>• Store in a cool, dry place away from direct sunlight.</li>
                    <li>• Keep the golden cap tightly closed after each use.</li>
                    <li>• Do not refrigerate or expose to excessive humidity.</li>
                    <li>• Keep out of reach of young children.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <strong className="block text-sm font-bold text-[#223728] mb-1">
                    Manufacturer & Quality Seal:
                  </strong>
                  <ul className="space-y-1.5 text-gray-600">
                    <li>• <strong>Brand:</strong> OvaCare Organics™</li>
                    <li>• <strong>Origin:</strong> A Proud Product of Pakistan 🇵🇰</li>
                    <li>• <strong>Capsule Shell:</strong> 100% Plant-Derived HPMC</li>
                    <li>• <strong>Barcode Verified:</strong> 9 780123 456789</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] border border-[#3D5A44]/15">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-bold text-[#223728]">
                    Batch-Tested for Moisture, Heavy Metals & Microbial Safety
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  QC Passed
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

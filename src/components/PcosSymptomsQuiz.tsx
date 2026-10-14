import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { BUNDLES } from '../data/productData';

interface PcosSymptomsQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBundle: (bundleId: string) => void;
}

export const PcosSymptomsQuiz: React.FC<PcosSymptomsQuizProps> = ({
  isOpen,
  onClose,
  onSelectBundle,
}) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    primarySymptom: '',
    cycleDelay: '',
    sugarCravings: '',
  });
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (step < 3) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ primarySymptom: '', cycleDelay: '', sugarCravings: '' });
    setCompleted(false);
  };

  // Determine recommended bundle based on answers
  const recommendedBundle =
    answers.cycleDelay === '3+ months' || answers.primarySymptom === 'Irregular Periods'
      ? BUNDLES[2] // 3-pack 45-day
      : BUNDLES[1]; // 2-pack 30-day

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3D5A44]/20 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Second PCOS Assessment</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#223728]">
                Find Your Tailored Seed Protocol
              </h3>
              <p className="text-xs text-[#587960] mt-1">
                Question {step} of 3 — Answer honestly for a customized recommendation.
              </p>
            </div>

            {/* Step 1: Primary Concern */}
            {step === 1 && (
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#223728] block">
                  1. What is your most frustrating PCOS symptom right now?
                </label>
                {[
                  { label: 'Irregular or absent menstrual periods', desc: 'Cycles longer than 35 days or skipped months' },
                  { label: 'Hormonal acne & facial hair (Hirsutism)', desc: 'Cystic breakouts on chin, jawline or chest' },
                  { label: 'Stubborn belly weight & intense sugar cravings', desc: 'Feeling constantly hungry after eating' },
                  { label: 'Severe fatigue, brain fog & mood swings', desc: 'Low energy throughout the afternoon' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelectOption('primarySymptom', item.label)}
                    className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-[#3D5A44] hover:bg-[#E3EDE4]/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <strong className="text-xs sm:text-sm font-bold text-[#223728] block">
                        {item.label}
                      </strong>
                      <span className="text-[11px] text-[#587960]">{item.desc}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#3D5A44] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Cycle Delay */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#223728] block">
                  2. How irregular or delayed are your menstrual cycles?
                </label>
                {[
                  { label: 'Mild delay (30–45 day cycles)', desc: 'Periods come but always a week or two late' },
                  { label: 'Moderate delay (2–3 months gap)', desc: 'Periods skip several months at a time' },
                  { label: '3+ months absent (Amenorrhea)', desc: 'Have not had a natural cycle in over 90 days' },
                  { label: 'Unpredictable & erratic', desc: 'Constant spotting or varying intervals' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelectOption('cycleDelay', item.label)}
                    className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-[#3D5A44] hover:bg-[#E3EDE4]/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <strong className="text-xs sm:text-sm font-bold text-[#223728] block">
                        {item.label}
                      </strong>
                      <span className="text-[11px] text-[#587960]">{item.desc}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#3D5A44] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Energy & Sugar */}
            {step === 3 && (
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#223728] block">
                  3. Do you experience post-lunch energy crashes or sugar cravings?
                </label>
                {[
                  { label: 'Yes, almost every single day', desc: 'Ceylon cinnamon in OvaCare specifically targets this' },
                  { label: 'Occasionally after high-carb meals', desc: 'Mild insulin response sensitivity' },
                  { label: 'No, cravings are under control', desc: 'Focus primarily on seed lignans for ovulation' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelectOption('sugarCravings', item.label)}
                    className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-[#3D5A44] hover:bg-[#E3EDE4]/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <strong className="text-xs sm:text-sm font-bold text-[#223728] block">
                        {item.label}
                      </strong>
                      <span className="text-[11px] text-[#587960]">{item.desc}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#3D5A44] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* Step Tracker dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {[1, 2, 3].map((num) => (
                <span
                  key={num}
                  className={`h-2 rounded-full transition-all ${
                    step === num ? 'w-6 bg-[#3D5A44]' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-emerald-600" />
            </div>

            <h3 className="font-display font-bold text-2xl text-[#223728] mb-1">
              Your Personalized PCOS Protocol
            </h3>
            <p className="text-xs text-[#587960] mb-5">
              Targeting: <strong className="text-[#223728]">{answers.primarySymptom || 'Hormonal Balance'}</strong>
            </p>

            {/* Recommended Box */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border-2 border-[#3D5A44] text-left mb-6 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C26859]">
                  Recommended Match
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {recommendedBundle.daysSupply} Days Supply
                </span>
              </div>

              <h4 className="font-display font-bold text-lg text-[#223728]">
                {recommendedBundle.title}
              </h4>
              <p className="text-xs text-[#587960] mt-0.5 mb-3">
                {recommendedBundle.bottles} Bottles ({recommendedBundle.bottles * 30} Vegetarian Capsules)
              </p>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-[#223728]">
                  Rs. {recommendedBundle.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  Rs. {recommendedBundle.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save Rs. {recommendedBundle.savings}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#2B3B2F] border-t border-gray-200 pt-3">
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dosing: 1 capsule after breakfast, 1 after dinner</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Cash on Delivery across Pakistan</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onSelectBundle(recommendedBundle.id);
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white font-bold text-sm shadow-lg shadow-[#3D5A44]/30 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Select {recommendedBundle.title}
              </button>

              <button
                onClick={resetQuiz}
                className="w-full py-2 text-xs font-semibold text-[#587960] hover:text-[#223728] flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Retake Assessment
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

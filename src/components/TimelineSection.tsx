import React from 'react';
import { TIMELINE_STEPS } from '../data/productData';
import { Clock, Sparkles } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-16 bg-[#FAF7F2] relative border-b border-[#3D5A44]/15">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D5A44]/10 text-[#3D5A44] text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>The Natural Journey</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#223728] tracking-tight mb-4">
            What To Expect: Your 60-Day Hormonal Adaptation
          </h2>
          <p className="text-[#2B3B2F]/80 text-base sm:text-lg">
            Unlike synthetic hormones that force withdrawal bleeds, natural seed phyto-nutrients work with your endocrine feedback loops. Here is the typical transformation observed over 60 days.
          </p>
        </div>

        {/* Responsive Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-6 sm:p-7 border border-[#3D5A44]/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Phase Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="text-xs font-black uppercase tracking-wider bg-[#E3EDE4] text-[#223728] px-3 py-1 rounded-full border border-[#3D5A44]/15">
                    {step.phase}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-[#223728] mb-2.5">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#2B3B2F]/80 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress visual bar */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-[#3D5A44] rounded-full"
                    style={{ width: `${(idx + 1) * 33.3}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-400">
                  Step {idx + 1} of 3
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Note */}
        <div className="mt-10 text-center text-xs text-[#587960] max-w-xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D49B38] flex-shrink-0" />
          <span>Individual results may vary based on diet, lifestyle, and existing hormonal profile.</span>
        </div>

      </div>
    </section>
  );
};

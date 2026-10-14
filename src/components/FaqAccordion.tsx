import React, { useState } from 'react';
import { FAQS } from '../data/productData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // first item open by default

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // 1. Quick Questions Array properly defined here
  const quickQuestions = [
    { label: "💊 How to use OvaCare daily?", text: "Hi, I want to know how to use OvaCare daily capsules." },
    { label: "🌿 Are these 100% natural seeds?", text: "Hi, are the seeds in OvaCare 100% natural and safe?" },
    { label: "📦 Delivery time in Pakistan?", text: "Hi, what is the delivery time across Pakistan for Cash on Delivery?" },
    { label: "🩸 Help with irregular periods", text: "Hi, can OvaCare help regulate irregular periods and hormonal acne?" }
  ];

  const whatsappNumber = "923127305519";

  return (
    <section id="faqs" className="py-16 bg-[#FAF7F2] relative border-b border-[#3D5A44]/15">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D5A44]/10 text-[#3D5A44] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#3D5A44]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#223728] tracking-tight mb-3">
            Got Questions? We Have Honest Answers.
          </h2>
          <p className="text-[#2B3B2F]/80 text-base max-w-xl mx-auto">
            Everything you need to know about OvaCare Organics ingredients, safety, dosage, and delivery across Pakistan.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all border ${
                  isOpen
                    ? 'bg-white border-[#3D5A44]/40 shadow-md ring-1 ring-[#3D5A44]/15'
                    : 'bg-white/80 border-gray-200 hover:border-[#3D5A44]/30 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-[#223728] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#3D5A44] text-white rotate-180' : 'bg-gray-100 text-[#223728]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#2B3B2F]/85 leading-relaxed border-t border-gray-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive WhatsApp Questions Card */}
        <div className="mt-10 p-6 rounded-2xl bg-[#E3EDE4]/50 border border-[#3D5A44]/25 text-center">
          <div className="mb-4">
            <h4 className="font-display font-bold text-base text-[#223728]">
              Still have a specific question about your symptoms?
            </h4>
            <p className="text-xs text-[#587960] mt-0.5">
              Tap any question below to chat instantly with our female health advisors on WhatsApp:
            </p>
          </div>

          {/* Quick Clickable Question Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {quickQuestions.map((item, qIdx) => {
              const encodedMsg = encodeURIComponent(item.text);
              const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
              return (
                <a
                  key={qIdx}
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-emerald-50 text-[#223728] border border-[#3D5A44]/20 hover:border-emerald-600 text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* General Custom Question Button */}
          <div className="flex justify-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I have a custom question about OvaCare symptoms.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-xl bg-[#223728] hover:bg-[#152219] text-white text-xs font-bold flex items-center gap-2 shadow transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Or Type Custom Question on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
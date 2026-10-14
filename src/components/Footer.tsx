import React from 'react';
import { ShieldCheck, Truck, PhoneCall, Award, Heart, MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/productData';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenTracking: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenTracking,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#1C2C20] text-white pt-14 pb-24 lg:pb-12 border-t border-[#3D5A44]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#3D5A44] flex items-center justify-center text-base">
                🌿
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                OvaCare Organics™
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 max-w-sm">
              Nature’s goodness for your hormonal wellness. Formulated with 6 certified organic seeds & Ceylon cinnamon bark to support cycle regularity, hormonal balance, and metabolic vitality.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>A Proud Product of Pakistan 🇵🇰</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 text-xs space-y-2">
            <h4 className="font-bold text-sm text-[#E3EDE4] uppercase tracking-wider mb-3">
              Explore Formula
            </h4>
            {['formula', 'ingredients', 'label', 'timeline', 'pricing'].map((id) => (
              <button
                key={id}
                onClick={() => onNavigateSection(id)}
                className="block text-gray-400 hover:text-white transition-colors capitalize text-left"
              >
                {id === 'formula' ? 'PCOS Blend' : id === 'label' ? 'Packaging Label' : id}
              </button>
            ))}
          </div>

          {/* Customer Care & Orders */}
          <div className="lg:col-span-2 text-xs space-y-2">
            <h4 className="font-bold text-sm text-[#E3EDE4] uppercase tracking-wider mb-3">
              Customer Support
            </h4>
            <button
              onClick={onOpenTracking}
              className="block text-gray-400 hover:text-white transition-colors text-left"
            >
              Track Your Order
            </button>
            <a
              href={STORE_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-400 hover:text-white transition-colors"
            >
              WhatsApp Support (0300-1234567)
            </a>
            <span className="block text-gray-500">
              Delivery via TCS, Leopards, M&P
            </span>
            <span className="block text-emerald-400 font-medium">
              Payment: Cash on Delivery (COD)
            </span>
          </div>

          {/* Academic & University FYP Notice */}
          <div className="lg:col-span-3 text-xs bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
              <Award className="w-4 h-4" />
              <span>FYP Capstone Project</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
              Developed as a Final Year Project (FYP) and production-ready e-commerce brand for women’s metabolic health.
            </p>
            <button
              onClick={onOpenAdmin}
              className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-colors"
            >
              Open Evaluation Dashboard
            </button>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-gray-400">
          <p className="max-w-2xl leading-normal">
            <strong>Medical Disclaimer:</strong> OvaCare Organics™ is a dietary herbal seed supplement intended to support overall dietary wellness and hormonal balance. It is not intended to diagnose, treat, cure, or prevent any disease. Always consult your gynaecologist or physician before starting any dietary supplement.
          </p>

          <p className="whitespace-nowrap">
            © {new Date().getFullYear()} OvaCare Organics. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

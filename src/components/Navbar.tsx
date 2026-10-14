import React from 'react';
import { ShoppingBag, PhoneCall, ShieldCheck, Truck, Menu, X, ArrowRight } from 'lucide-react';
import { STORE_DETAILS } from '../data/productData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onNavigateSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracking,
  onOpenAdmin,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'OvaCare™ Formula', id: 'formula' },
    { label: '6 Natural Seeds', id: 'ingredients' },
    { label: 'Label & Dosage', id: 'label' },
    { label: 'Cycle Timeline', id: 'timeline' },
    { label: 'Pricing (Rs. 1,500)', id: 'pricing' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQs', id: 'faqs' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Notification Bar */}
      <div className="bg-[#223728] text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3 overflow-hidden">
        <span className="flex items-center gap-1.5 text-[#E6A89F] font-semibold">
          <Truck className="w-3.5 h-3.5" /> FREE Delivery on 2+ Bottles
        </span>
        <span className="hidden sm:inline text-white/40">•</span>
        <span className="hidden sm:flex items-center gap-1.5 text-white/90">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cash on Delivery Nationwide (Rs. 1,500/bottle)
        </span>
        <span className="hidden md:inline text-white/40">•</span>
        <a 
          href={STORE_DETAILS.whatsappUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-white/90 hover:text-emerald-300 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp / Call: {STORE_DETAILS.phone}
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="glass-panel border-b border-[#3D5A44]/15 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand: PureBite Nutrition featuring OvaCare */}
          <button
            onClick={() => handleNavClick('top')}
            className="text-left group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2E4634] to-[#1E3023] text-emerald-300 flex items-center justify-center shadow-md shadow-[#3D5A44]/20 group-hover:scale-105 transition-transform border border-emerald-800/40">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tight text-[#223728] group-hover:text-[#3D5A44] transition-colors">
                  PureBite
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D5A44] bg-[#E3EDE4] px-2 py-0.5 rounded-md">
                  Nutrition
                </span>
              </div>
              <p className="text-[11px] text-[#587960] font-medium flex items-center gap-1">
                <span>Featuring</span>
                <strong className="text-[#C26859] font-bold">OvaCare Organics™</strong>
                <span className="hidden sm:inline">PCOS Blend</span>
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#223728]/85">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-[#3D5A44] transition-colors py-1 relative group text-xs font-semibold"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3D5A44] transition-all group-hover:w-full rounded-full" />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenTracking}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#3D5A44] hover:bg-[#3D5A44]/10 transition-colors border border-[#3D5A44]/25"
            >
              Track Order
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#3D5A44] hover:bg-[#283C2D] text-white px-3.5 py-2 rounded-full font-medium text-sm shadow-md shadow-[#3D5A44]/25 hover:shadow-lg transition-all active:scale-95"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              {cartCount > 0 ? (
                <span className="bg-[#C26859] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="bg-white/20 text-white text-[11px] rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#223728] hover:bg-[#3D5A44]/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#3D5A44]/15 flex flex-col gap-2">
            <div className="px-3 py-1.5 bg-[#FAF7F2] rounded-lg text-xs text-[#587960] mb-1">
              PureBite Nutrition Helpline: <strong>{STORE_DETAILS.phone}</strong>
            </div>
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-[#223728] hover:bg-[#3D5A44]/10 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#3D5A44]/60" />
              </button>
            ))}
            <div className="pt-2 flex gap-2 border-t border-[#3D5A44]/10">
              <button
                onClick={() => {
                  onOpenTracking();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-[#E3EDE4] text-[#223728]"
              >
                Track My Order
              </button>
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-[#FAF7F2] border border-[#3D5A44]/30 text-[#3D5A44]"
              >
                FYP Evaluator Portal
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IngredientsBentoGrid } from './components/IngredientsBentoGrid';
import { PackagingInspector } from './components/PackagingInspector';
import { TimelineSection } from './components/TimelineSection';
import { PricingBundles } from './components/PricingBundles';
import { CustomerReviews } from './components/CustomerReviews';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { PcosSymptomsQuiz } from './components/PcosSymptomsQuiz';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { BUNDLES } from './data/productData';
import { OrderItem, Order } from './types';

export default function App() {
  // Cart State (Persisted in localStorage with Fallback Safety)
  const [cartItems, setCartItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('ovacare_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [cartOpen, setCartOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);
  const [adminOpen, setAdminOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ovacare_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Default to BUNDLES[0] (1 Bottle Variant) if no matching variant ID is found
  const handleAddToCart = (variantId?: string, quantity: number = 1) => {
    const selectedBundle = BUNDLES.find((b) => b.id === variantId) || BUNDLES[0];

    setCartItems((prev) => {
      const existing = prev.find((i) => i.variantId === selectedBundle.id);
      if (existing) {
        return prev.map((i) =>
          i.variantId === selectedBundle.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [
          ...prev,
          {
            variantId: selectedBundle.id,
            title: selectedBundle.title,
            bottles: selectedBundle.bottles,
            quantity,
            price: selectedBundle.price,
          },
        ];
      }
    });

    showToast(`Added ${quantity}x ${selectedBundle.title} to your cart!`);
    setCartOpen(true);
  };

  const handleInstantBuy = (variantId?: string, quantity: number = 1) => {
    // If no variantId is provided, force 1-bottle variant
    const targetVariant = variantId || BUNDLES[0]?.id;
    handleAddToCart(targetVariant, quantity);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (variantId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const handleOrderPlaced = (order: Order) => {
    setCartItems([]);
    localStorage.removeItem('ovacare_cart'); // Clear cart state on successful order
    showToast(`Order #${order.id} placed successfully!`);
  };

  const handleOpenTrackingWithId = (orderId?: string) => {
    setTrackingOrderId(orderId);
    setTrackingOpen(true);
  };

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#223728] flex flex-col font-sans selection:bg-[#3D5A44] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#223728] text-white py-2.5 px-4 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-fadeIn border border-emerald-500/30">
          <span className="text-emerald-400">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenTracking={() => handleOpenTrackingWithId()}
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
          onOpenLabelInspector={() => scrollToSection('label')}
          onOpenQuiz={() => setQuizOpen(true)}
        />

        {/* 2. Key Pillars / Trust Band */}
        <section id="formula" className="py-8 bg-white border-y border-[#3D5A44]/15">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🌾</span>
                <strong className="text-xs sm:text-sm font-bold text-[#223728]">
                  Seed Cycling Synergy
                </strong>
                <span className="text-[11px] text-[#587960]">
                  Lignans, Zinc & Selenium
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🪵</span>
                <strong className="text-xs sm:text-sm font-bold text-[#223728]">
                  True Ceylon Cinnamon
                </strong>
                <span className="text-[11px] text-[#587960]">
                  Targeted Insulin Sensitivity
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🌿</span>
                <strong className="text-xs sm:text-sm font-bold text-[#223728]">
                  100% Plant Based
                </strong>
                <span className="text-[11px] text-[#587960]">
                  Gelatin-Free Vegetarian HPMC
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🇵🇰</span>
                <strong className="text-xs sm:text-sm font-bold text-[#223728]">
                  Cash On Delivery
                </strong>
                <span className="text-[11px] text-[#587960]">
                  Delivered Across Pakistan
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 6 High-Res Macro Seeds Bento Grid */}
        <IngredientsBentoGrid />

        {/* 4. PCOS Cycle Adaptation Timeline */}
        <TimelineSection />

        {/* 5. Authentic Packaging & Label Facts Inspector */}
        <PackagingInspector />

        {/* 6. Pricing & Bundles */}
        <PricingBundles
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
        />

        {/* 7. Verified Pakistani Customer Reviews */}
        <CustomerReviews />

        {/* 8. Frequently Asked Questions Accordion */}
        <FaqAccordion />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenTracking={() => handleOpenTrackingWithId()}
        onNavigateSection={scrollToSection}
      />

      {/* Sticky Mobile Buy Now Bar */}
      <StickyMobileBar
        onOpenCart={() => setCartOpen(true)}
        onInstantBuy={() => handleInstantBuy(BUNDLES[0]?.id, 1)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderPlaced={handleOrderPlaced}
        onOpenTracking={handleOpenTrackingWithId}
      />

      {/* 30-Second PCOS Symptoms Quiz */}
      <PcosSymptomsQuiz
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        onSelectBundle={(bundleId) => handleInstantBuy(bundleId, 1)}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />

      {/* FYP Evaluation / Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
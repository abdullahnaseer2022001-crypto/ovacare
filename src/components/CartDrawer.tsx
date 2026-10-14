import React, { useState } from 'react';
import { OrderItem, Order } from '../types';
import { BUNDLES } from '../data/productData';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Zap, 
  ArrowLeft, 
  MessageCircle, 
  CheckCircle,
  ExternalLink 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveItem: (variantId: string) => void;
  onOrderPlaced: (order: Order) => void;
  onOpenTracking: (orderId?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderPlaced,
  onOpenTracking,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Form Fields for Pakistani delivery
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Lahore',
    address: '',
    notes: '',
  });
  const [formError, setFormError] = useState('');

  const majorCities = [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
  ];

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 3000;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 199;
  const total = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^(03\d{9}|\+923\d{9})$/.test(cleaned);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim()) {
      setFormError('Please enter your full recipient name.');
      return;
    }

    if (!validatePhone(form.phone)) {
      setFormError('Please enter a valid Pakistani mobile number (e.g. 0300 1234567).');
      return;
    }

    if (!form.city.trim()) {
      setFormError('Please specify your city.');
      return;
    }

    if (!form.address.trim() || form.address.length < 8) {
      setFormError('Please enter complete delivery address (House/Plot, Street, Area).');
      return;
    }

    const newOrder: Order = {
      id: `OC-${Math.floor(10000 + Math.random() * 89999)}`,
      items: [...items],
      customerName: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      notes: form.notes.trim() || undefined,
      subtotal,
      shipping: shippingFee,
      discount: 0,
      total,
      paymentMethod: 'COD',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('ovacare_orders') || '[]');
      localStorage.setItem('ovacare_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error('Failed to save order in local storage', err);
    }

    setPlacedOrder(newOrder);
    onOrderPlaced(newOrder);
    setStep('success');
  };

  const generateWhatsAppMessage = (order: Order) => {
    const itemsList = order.items
      .map((i) => `• ${i.quantity}x ${i.title} (Rs. ${i.price.toLocaleString()})`)
      .join('\n');
    const msg = `*NEW OVACARE ORDER CONFIRMATION* 🌿
Order ID: #${order.id}
Customer: ${order.customerName}
Phone: ${order.phone}
City: ${order.city}
Delivery Address: ${order.address}
${order.notes ? `Note: ${order.notes}\n` : ''}
*Items:*
${itemsList}

Subtotal: Rs. ${order.subtotal.toLocaleString()}
Delivery Fee: ${order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping}`}
*Total (Cash on Delivery): Rs. ${order.total.toLocaleString()}*

Please dispatch my order as soon as possible. Thank you!`;

    const encodedMessage = encodeURIComponent(msg); 
    return `https://wa.me/923127305519?text=${encodedMessage}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#3D5A44] text-white flex items-center justify-center text-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#223728]">
                {step === 'cart' ? 'Your Shopping Cart' : step === 'checkout' ? 'Express COD Checkout' : 'Order Placed!'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          {step !== 'success' && items.length > 0 && (
            <div className="bg-[#E3EDE4]/60 px-5 py-2.5 border-b border-[#3D5A44]/10 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-[#223728] flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  {isFreeShipping ? (
                    <strong className="text-emerald-800">You unlocked FREE Nationwide Delivery!</strong>
                  ) : (
                    <>Add <strong>Rs. {amountToFreeShipping.toLocaleString()}</strong> more for FREE Shipping</>
                  )}
                </span>
                <span className="font-bold text-[#3D5A44]">{shippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3D5A44] rounded-full transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5">
            
            {/* STEP 1: CART VIEW */}
            {step === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#3D5A44] flex items-center justify-center mx-auto mb-3">
                      <ShoppingBag className="w-8 h-8 opacity-40" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-[#223728]">
                      Your Cart is Empty
                    </h4>
                    <p className="text-xs text-[#587960] mt-1 mb-6">
                      Select a PCOS herbal seed bundle to begin your hormonal balance journey.
                    </p>
                    <button
                      onClick={onClose}
                      className="py-2.5 px-5 rounded-full bg-[#3D5A44] text-white font-bold text-xs shadow-md"
                    >
                      Browse Bundles & Pricing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.variantId}
                        className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/15 flex items-start gap-3 shadow-sm"
                      >
                        {/* Bottle Mini Thumbnail */}
                        <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-amber-700 to-amber-950 p-1 flex flex-col items-center justify-between text-white text-[8px] flex-shrink-0 shadow">
                          <div className="w-8 h-2 bg-amber-200 rounded-t-sm" />
                          <span className="font-bold text-center leading-tight">OvaCare</span>
                          <span className="text-[7px] text-amber-300 font-bold">30 caps</span>
                        </div>

                        {/* Title & Quantity */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-sm text-[#223728] truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-[#587960] mb-2">
                            {item.quantity} Bottle(s)
                          </p>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden text-xs">
                              <button
                                onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                                className="px-2 py-0.5 hover:bg-gray-100 font-bold text-gray-700"
                              >
                                −
                              </button>
                              <span className="px-2.5 font-bold text-[#223728]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                                className="px-2 py-0.5 hover:bg-gray-100 font-bold text-gray-700"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-bold text-sm text-[#223728]">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => onRemoveItem(item.variantId)}
                          className="text-gray-400 hover:text-red-500 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Quick Upsell / Tip */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>100% Cash on Delivery Guarantee:</strong> Inspect the package at your doorstep and pay only when satisfied.
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT FORM */}
            {step === 'checkout' && (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 text-xs animate-fadeIn">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs font-semibold text-[#587960] hover:text-[#223728] flex items-center gap-1 mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
                </button>

                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs font-medium">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="font-bold text-[#223728] block mb-1">
                    Full Name (نام) *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Fatima Ali"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#223728] block mb-1">
                    Pakistani WhatsApp / Phone Number (موبائل نمبر) *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 0300 1234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none text-xs"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block">
                    Our courier will send an SMS and call before delivery.
                  </span>
                </div>

                <div>
                  <label className="font-bold text-[#223728] block mb-1">
                    City (شہر) *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Lahore, Karachi, Islamabad"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none text-xs mb-2"
                  />
                  
                  {/* City Quick Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {majorCities.slice(0, 6).map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setForm({ ...form, city: c })}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                          form.city === c
                            ? 'bg-[#3D5A44] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#223728] block mb-1">
                    Complete Street Address (مکمل پتہ) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House/Apartment #, Street #, Sector / Colony / Landmark..."
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#223728] block mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery, Leave with reception"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none text-xs"
                  />
                </div>

                {/* COD Payment Method Badge */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💵</span>
                    <div>
                      <strong className="text-xs text-amber-950 block">Payment Method</strong>
                      <span className="text-[11px] text-amber-800 font-medium">Cash on Delivery (COD)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-1 rounded">
                    Pay When Arrived
                  </span>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS CONFIRMATION */}
            {step === 'success' && placedOrder && (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>

                <h4 className="font-display font-bold text-2xl text-[#223728]">
                  Order Placed Successfully!
                </h4>
                <p className="text-xs text-[#587960] mt-1 mb-5">
                  Thank you, <strong className="text-[#223728]">{placedOrder.customerName}</strong>! Your order is being packed.
                </p>

                {/* Order Summary Receipt Box */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/20 text-left mb-6 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-bold text-[#587960]">Tracking Order ID:</span>
                    <span className="font-mono font-bold text-[#223728] bg-white px-2 py-0.5 rounded border">
                      #{placedOrder.id}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Deliver to:</span>
                    <span className="font-semibold text-[#223728] text-right">{placedOrder.address}, {placedOrder.city}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Contact Phone:</span>
                    <span className="font-semibold">{placedOrder.phone}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Payment Mode:</span>
                    <span className="font-semibold text-emerald-800">Cash on Delivery</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-sm font-bold text-[#223728]">
                    <span>Total Payable:</span>
                    <span className="text-emerald-900 font-black text-base">
                      Rs. {placedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Receipt Action */}
                <div className="space-y-3">
                  <a
                    href={generateWhatsAppMessage(placedOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send Order Receipt to WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      onOpenTracking(placedOrder.id);
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Track Live Shipment Status
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer (Subtotal & Buttons) */}
          {items.length > 0 && step !== 'success' && (
            <div className="p-5 border-t border-gray-200 bg-[#FAF7F2]">
              <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#223728]">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery to {form.city || 'Pakistan'}:</span>
                  <span className="font-bold text-emerald-800">
                    {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-base font-display font-bold text-[#223728]">
                  <span>Total Amount:</span>
                  <span className="text-2xl text-[#223728]">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white font-bold text-sm shadow-lg shadow-[#3D5A44]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-current" />
                  Proceed to Checkout (COD)
                </button>
              ) : (
                <button
                  form="checkout-form"
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white font-bold text-sm shadow-lg shadow-[#3D5A44]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Confirm Cash on Delivery Order (Rs. {total.toLocaleString()})
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
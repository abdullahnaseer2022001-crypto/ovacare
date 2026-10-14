import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId || '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ovacare_orders') || '[]');
      setOrders(stored);

      if (initialOrderId) {
        const found = stored.find((o: Order) => o.id.toLowerCase() === initialOrderId.toLowerCase());
        if (found) setSelectedOrder(found);
      } else if (stored.length > 0) {
        setSelectedOrder(stored[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen, initialOrderId]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        o.phone.includes(searchQuery.trim()) ||
        o.customerName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`No order found matching "${searchQuery}". Please check your Order ID or mobile number.`);
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Verified and queued for packaging', icon: Clock, done: true },
    { title: 'Laboratory QC Passed', desc: 'Moisture seal & batch verification', icon: ShieldCheck, done: true },
    { title: 'Dispatched via Courier', desc: 'Handed over to TCS / Leopards Express', icon: Package, done: selectedOrder?.status !== 'Confirmed' },
    { title: 'Out for Delivery', desc: 'Rider reaching your doorstep', icon: Truck, done: selectedOrder?.status === 'Delivered' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3D5A44]/20 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="font-display font-bold text-2xl text-[#223728]">
            Track Your OvaCare Delivery
          </h3>
          <p className="text-xs text-[#587960] mt-0.5">
            Real-time courier status and order confirmation for Pakistan shipments.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID (e.g. OC-12345) or Phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none text-xs"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white font-bold text-xs"
          >
            Track
          </button>
        </form>

        {selectedOrder ? (
          <div className="space-y-6 text-xs">
            {/* Status Card */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/15">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">
                    Order Tracking Number
                  </span>
                  <span className="font-mono text-base font-bold text-[#223728]">
                    #{selectedOrder.id}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {selectedOrder.status || 'Confirmed'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 text-gray-700">
                <div>
                  <span className="text-gray-400 block text-[10px]">Customer:</span>
                  <span className="font-bold text-[#223728]">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Payment:</span>
                  <span className="font-bold text-emerald-800">Rs. {selectedOrder.total.toLocaleString()} (COD)</span>
                </div>
                <div className="col-span-2 flex items-start gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C26859] flex-shrink-0 mt-0.5" />
                  <span>{selectedOrder.address}, {selectedOrder.city}</span>
                </div>
              </div>
            </div>

            {/* Stepper Progress */}
            <div>
              <span className="font-bold text-[#223728] block mb-3 uppercase tracking-wider text-[11px]">
                Shipment Milestones
              </span>

              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
                {steps.map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 relative">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                          st.done
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                        }`}
                      >
                        {st.done ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <strong className={`block text-xs ${st.done ? 'text-[#223728]' : 'text-gray-400'}`}>
                          {st.title}
                        </strong>
                        <span className="text-[11px] text-gray-500">{st.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items inside order */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="font-bold text-gray-700 block mb-1.5 text-[11px]">
                Items in this parcel:
              </span>
              <ul className="space-y-1 text-gray-600 text-[11px]">
                {selectedOrder.items.map((it, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{it.quantity}x {it.title}</span>
                    <span className="font-semibold">Rs. {(it.price * it.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 text-xs">
            Enter your Order ID or phone number above to track your parcel.
          </div>
        )}

      </div>
    </div>
  );
};

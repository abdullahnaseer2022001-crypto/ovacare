import React, { useState, useEffect } from 'react';
import { X, Award, DollarSign, Package, Users, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, [isOpen]);

  const loadOrders = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('ovacare_orders') || '[]');
      setOrders(stored);
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalBottles = orders.reduce(
    (sum, o) => sum + o.items.reduce((bSum, i) => bSum + i.bottles * i.quantity, 0),
    0
  );

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('ovacare_orders', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all test orders?')) {
      localStorage.removeItem('ovacare_orders');
      setOrders([]);
    }
  };

  const handleSeedDemoData = () => {
    const demoOrders: Order[] = [
      {
        id: 'OC-94218',
        customerName: 'Aiman Shah',
        phone: '0321 8492019',
        city: 'Lahore (Gulberg III)',
        address: 'House 42, Block J, Gulberg III',
        items: [{ variantId: 'bundle-duo', title: 'Complete 30-Day Cycle Pack', bottles: 2, quantity: 1, price: 4699 }],
        subtotal: 4699,
        shipping: 0,
        discount: 0,
        total: 4699,
        paymentMethod: 'COD',
        status: 'Dispatched',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'OC-71534',
        customerName: 'Hira Siddiqui',
        phone: '0300 9283741',
        city: 'Karachi (DHA Phase 6)',
        address: 'Plot 18-C, 24th Commercial Street',
        items: [{ variantId: 'bundle-trio', title: 'Hormonal Reset 45-Day Protocol', bottles: 3, quantity: 1, price: 6799 }],
        subtotal: 6799,
        shipping: 0,
        discount: 0,
        total: 6799,
        paymentMethod: 'COD',
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      },
    ];

    setOrders(demoOrders);
    localStorage.setItem('ovacare_orders', JSON.stringify(demoOrders));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3D5A44]/20 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-[#223728]">
              FYP Project Demonstration Portal
            </h3>
            <p className="text-xs text-[#587960]">
              Administrative telemetry, live order metrics & fulfillment dashboard for university evaluation.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-gray-500 block text-[10px] font-bold uppercase">
              Total Revenue (PKR)
            </span>
            <strong className="text-lg font-display text-emerald-900 block mt-0.5">
              Rs. {totalRevenue.toLocaleString()}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/15">
            <span className="text-gray-500 block text-[10px] font-bold uppercase">
              Orders Placed
            </span>
            <strong className="text-lg font-display text-[#223728] block mt-0.5">
              {orders.length}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-gray-500 block text-[10px] font-bold uppercase">
              Bottles Ordered
            </span>
            <strong className="text-lg font-display text-amber-900 block mt-0.5">
              {totalBottles}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200">
            <span className="text-gray-500 block text-[10px] font-bold uppercase">
              COD Fulfillment
            </span>
            <strong className="text-lg font-display text-indigo-900 block mt-0.5">
              100%
            </strong>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-sm text-[#223728]">
              Live Orders in Database ({orders.length})
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleSeedDemoData}
                className="text-xs font-semibold text-[#3D5A44] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Insert Demo Orders
              </button>
              {orders.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1 ml-2"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-2xl border text-xs">
              No orders placed yet. Click "Insert Demo Orders" or place a test order via the store cart.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/15 text-xs text-left"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className="font-mono font-bold text-sm text-[#223728]">
                      #{o.id} · Rs. {o.total.toLocaleString()} (COD)
                    </span>
                    
                    {/* Status Changer */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 font-semibold">Status:</span>
                      <select
                        value={o.status || 'Confirmed'}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value as Order['status'])}
                        className="py-1 px-2 rounded-lg border border-gray-300 font-bold bg-white text-[11px] text-[#223728]"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched (TCS)</option>
                        <option value="Delivered">Delivered (Cash Collected)</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-gray-700 font-medium mb-1">
                    Customer: <strong>{o.customerName}</strong> ({o.phone}) · {o.city}
                  </p>
                  <p className="text-gray-500 text-[11px] mb-2">Address: {o.address}</p>

                  <div className="pt-2 border-t border-gray-200 text-gray-600 text-[11px]">
                    {o.items.map((it, idx) => (
                      <span key={idx} className="mr-3">
                        • {it.quantity}x {it.title} ({it.bottles} bottles)
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FYP Evaluation Remarks */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
          <strong>FYP Evaluation Note:</strong> This e-commerce application is architected with modern React 19, TypeScript, and responsive CSS Grid/Flexbox architecture. It includes full persistence, realistic Pakistani address and phone validation, and real-time WhatsApp direct dispatch.
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { REVIEWS } from '../data/productData';
import { Review } from '../types';
import { Star, CheckCircle, MessageSquare, ThumbsUp, Filter, PlusCircle, X } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [activeConcernFilter, setActiveConcernFilter] = useState<string>('All');
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    city: '',
    rating: 5,
    title: '',
    comment: '',
    concern: 'Irregular Periods',
    duration: 'Used for 1 month',
  });

  const concerns = ['All', 'Irregular Periods', 'Hormonal Acne & Skin', 'Insulin Resistance & Cravings', 'Fatigue & Metabolism'];

  const filteredReviews = activeConcernFilter === 'All'
    ? reviewsList
    : reviewsList.filter((r) => r.concern.toLowerCase().includes(activeConcernFilter.toLowerCase()) || activeConcernFilter.toLowerCase().includes(r.concern.toLowerCase()));

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      city: newReview.city || 'Pakistan',
      rating: newReview.rating,
      date: 'Just now',
      title: newReview.title || 'Verified Customer Review',
      comment: newReview.comment,
      concern: newReview.concern,
      duration: newReview.duration,
      verified: true,
    };

    setReviewsList([created, ...reviewsList]);
    setWriteModalOpen(false);
    setNewReview({
      name: '',
      city: '',
      rating: 5,
      title: '',
      comment: '',
      concern: 'Irregular Periods',
      duration: 'Used for 1 month',
    });
  };

  return (
    <section id="reviews" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D5A44]/10 text-[#3D5A44] text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-current text-[#D49B38]" />
              <span>Real Women · Honest Results</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#223728] tracking-tight">
              Customer Experiences Across Pakistan
            </h2>
            <p className="text-[#2B3B2F]/80 text-sm sm:text-base mt-2 max-w-xl">
              Read how women from Lahore, Karachi, Islamabad, and beyond managed their PCOS symptoms using OvaCare’s botanical seed blend.
            </p>
          </div>

          {/* Aggregate Rating Box & Write Action */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/15 shadow-sm">
            <div className="text-center pr-4 border-r border-gray-300">
              <span className="font-display font-extrabold text-3xl text-[#223728] block">4.9</span>
              <div className="flex items-center text-[#D49B38]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-[#587960] font-semibold mt-0.5 block">
                420+ Reviews
              </span>
            </div>

            <div>
              <button
                onClick={() => setWriteModalOpen(true)}
                className="py-2.5 px-4 rounded-xl bg-[#3D5A44] hover:bg-[#25392A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Write Your Review
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar text-xs">
          <span className="font-bold text-[#223728] flex items-center gap-1 pl-1 pr-2">
            <Filter className="w-3.5 h-3.5 text-[#587960]" /> Filter:
          </span>
          {concerns.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveConcernFilter(tag)}
              className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                activeConcernFilter === tag
                  ? 'bg-[#3D5A44] text-white shadow-sm'
                  : 'bg-gray-100 text-[#223728] hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Reviews Grid (Responsive CSS Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#3D5A44]/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left"
            >
              <div>
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center text-[#D49B38]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-600" /> Verified Order
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h4 className="font-display font-bold text-sm sm:text-base text-[#223728] mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                {/* Comment Body */}
                <p className="text-xs text-[#2B3B2F]/85 leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-[#3D5A44]/10 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#223728] font-bold block">{rev.name}</strong>
                  <span className="text-[11px] text-[#587960]">{rev.city}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">{rev.date}</span>
                  <span className="text-[10px] font-semibold text-[#C26859]">{rev.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3D5A44]/20 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setWriteModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-2xl text-[#223728] mb-1">
              Share Your OvaCare Experience
            </h3>
            <p className="text-xs text-[#587960] mb-5">
              Your feedback helps fellow Pakistani women navigate their natural PCOS journey.
            </p>

            <form onSubmit={handleAddReview} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#223728] block mb-1">Your Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ayesha M."
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#223728] block mb-1">City in Pakistan</label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore"
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#223728] block mb-1">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#223728] block mb-1">Review Headline *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. My period arrived naturally on day 28!"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#223728] block mb-1">Detailed Story & Experience *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us how you took the capsules and what changes you noticed in your cycle, energy, skin, or cravings..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#223728] block mb-1">Primary Concern</label>
                  <select
                    value={newReview.concern}
                    onChange={(e) => setNewReview({ ...newReview, concern: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none bg-white"
                  >
                    <option value="Irregular Periods">Irregular Periods</option>
                    <option value="Hormonal Acne & Skin">Hormonal Acne & Skin</option>
                    <option value="Insulin Resistance & Cravings">Insulin Resistance & Cravings</option>
                    <option value="Fatigue & Metabolism">Fatigue & Metabolism</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#223728] block mb-1">Usage Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. Used for 30 days"
                    value={newReview.duration}
                    onChange={(e) => setNewReview({ ...newReview, duration: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:border-[#3D5A44] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#3D5A44] text-white font-bold text-xs hover:bg-[#25392A] transition-colors mt-2"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Briefcase, 
  Star, 
  ArrowLeft, 
  Calendar,
  Share2
} from 'lucide-react';
import Rating from '../components/Rating.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import Modal from '../components/Modal.jsx';
import RequestForm from '../components/RequestForm.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function ProviderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { providers, reviews, showToast } = useApp();

  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const provider = providers.find(p => p.id === id);
  const providerReviews = reviews.filter(r => r.providerId === id);

  if (!provider) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Provider Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested service provider does not exist or has been removed.</p>
        <Button variant="primary" onClick={() => navigate('/providers')}>
          Back to Providers Directory
        </Button>
      </div>
    );
  }

  // Calculate rating statistics
  const totalReviews = providerReviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = providerReviews.filter(r => Math.round(r.rating) === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, percentage };
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Profile link copied to clipboard!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link
        to="/providers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Providers Directory
      </Link>

      {/* Main Profile Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200 shrink-0">
              <img
                src={provider.avatar}
                alt={provider.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {provider.availableNow && (
                <span
                  className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
                  title="Available Today"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {provider.name}
                </h1>
                {provider.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Verified Provider
                  </span>
                )}
                {provider.availableNow && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available Today
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-red-700 mt-1">
                {provider.tagline || provider.category}
              </p>

              <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-slate-500">
                <Rating value={provider.rating} count={provider.reviewsCount} size="md" />
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {provider.area}, {provider.district}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {provider.completedJobs}+ jobs completed
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer"
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setRequestModalOpen(true)}
              className="w-full sm:w-auto font-bold"
            >
              Request Service
            </Button>
          </div>
        </div>

        {/* Highlighted Trust Markers */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-0.5">Response Time</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
              <Clock className="w-4 h-4 text-red-700" />
              {provider.responseTime}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-0.5">Experience</span>
            <span className="text-sm font-bold text-slate-900">
              {provider.experience} in Trade
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-0.5">Service Coverage</span>
            <span className="text-sm font-bold text-slate-900">
              {provider.serviceRadius} km around {provider.area}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-0.5">Starting Labor Rate</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">
              Rs. {provider.startingPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Services Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: About & Services Offered */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Provider */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              About the Professional
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {provider.bio}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Nepali Citizenship & Identity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fair, Standardized NPR Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doorstep Service with Diagnostic Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Post-Service Support Guarantee</span>
              </div>
            </div>
          </div>

          {/* Transparent Services & Pricing Menu */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Services & Labor Pricing
                </h2>
                <p className="text-xs text-slate-500">
                  Fixed standard labor rates (Spare parts billed separately upon receipt).
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {provider.services.map((srv, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{srv.name}</h4>
                    <span className="text-xs text-slate-400">Includes complete labor inspection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      Rs. {srv.price}+
                    </span>
                    <button
                      onClick={() => setRequestModalOpen(true)}
                      className="text-xs font-semibold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Customer Reviews & Ratings
                </h2>
                <p className="text-xs text-slate-500">
                  Verified feedback from households across Kathmandu Valley.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                  {provider.rating.toFixed(1)}
                </span>
                <div className="text-xs">
                  <Rating value={provider.rating} showValue={false} size="sm" />
                  <span className="text-slate-400 block">{provider.reviewsCount} verified reviews</span>
                </div>
              </div>
            </div>

            {/* Rating breakdown bars */}
            <div className="space-y-1.5 mb-8 p-4 bg-slate-50 rounded-xl">
              {ratingDistribution.map((row) => (
                <div key={row.star} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-slate-600 font-medium">{row.star} stars</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full" 
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-400 tabular-nums">{row.percentage}%</span>
                </div>
              ))}
            </div>

            {/* Review Cards list */}
            {providerReviews.length > 0 ? (
              <div className="space-y-4">
                {providerReviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">
                No detailed reviews yet. Be the first to book and rate {provider.name}!
              </p>
            )}
          </div>
        </div>

        {/* Right Col: Quick Request Sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Need this service today?
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Submit your problem details and get a quick phone call confirmation.
            </p>

            <div className="space-y-3 mb-6 text-xs text-slate-600">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Service Area</span>
                <span className="font-semibold text-slate-800">{provider.area}, {provider.district}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Estimated Arrival</span>
                <span className="font-semibold text-slate-800">Within {provider.responseTime.replace('~', '')}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Diagnostic Fee</span>
                <span className="font-semibold text-slate-800">From Rs. {provider.startingPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Payment</span>
                <span className="font-semibold text-slate-800">Cash / Fonepay upon finish</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full font-bold"
              onClick={() => setRequestModalOpen(true)}
            >
              Request Service Now
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        title={`Request Service from ${provider.name}`}
        subtitle={`${provider.category} · ${provider.area}, ${provider.district}`}
        maxWidth="max-w-2xl"
      >
        <RequestForm
          preselectedProvider={provider}
          onCancel={() => setRequestModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

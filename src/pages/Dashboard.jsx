import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle2, 
  Wrench, 
  MapPin, 
  Phone, 
  Star, 
  Plus, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge.jsx';
import Modal from '../components/Modal.jsx';
import Rating from '../components/Rating.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Dashboard() {
  const { user, requests, cancelRequest, addReview } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'completed', 'cancelled'
  const [reviewModalRequest, setReviewModalRequest] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [detailsModalRequest, setDetailsModalRequest] = useState(null);

  // Customer requests
  const customerRequests = requests.filter(r => !user?.id || r.customerId === user.id || user.role === 'customer');

  // Overview stats
  const activeRequests = customerRequests.filter(r => ['Pending', 'Accepted', 'On the Way', 'In Progress'].includes(r.status));
  const completedRequests = customerRequests.filter(r => r.status === 'Completed');
  const pendingRequests = customerRequests.filter(r => r.status === 'Pending');

  // Estimate total spending
  const totalSpending = completedRequests.reduce((acc, curr) => {
    const num = parseInt((curr.estimatedPrice || '0').replace(/[^0-9]/g, '')) || 800;
    return acc + num;
  }, 0);

  // Filtered requests by tab
  const displayedRequests = customerRequests.filter(req => {
    if (activeTab === 'active') return ['Pending', 'Accepted', 'On the Way', 'In Progress'].includes(req.status);
    if (activeTab === 'completed') return req.status === 'Completed';
    if (activeTab === 'cancelled') return req.status === 'Cancelled';
    return true;
  });

  const handleOpenReview = (request) => {
    setReviewModalRequest(request);
    setReviewRating(5);
    setReviewComment('');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      alert("Please provide a brief written review.");
      return;
    }

    addReview({
      providerId: reviewModalRequest.providerId,
      requestId: reviewModalRequest.id,
      rating: reviewRating,
      comment: reviewComment
    });

    setReviewModalRequest(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
            Customer Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user?.name || "Customer"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your local service bookings, track active technicians, and review completed jobs.
          </p>
        </div>

        <Link to="/request">
          <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1" />
            Book New Service
          </Button>
        </Link>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Active Requests
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {activeRequests.length}
          </div>
          <span className="text-xs text-sky-700 mt-1 inline-block">
            In progress / dispatched
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Pending Confirmation
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {pendingRequests.length}
          </div>
          <span className="text-xs text-amber-700 mt-1 inline-block">
            Awaiting provider response
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Completed Services
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {completedRequests.length}
          </div>
          <span className="text-xs text-emerald-700 mt-1 inline-block">
            Successfully serviced
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Total Spending
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            Rs. {totalSpending.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 mt-1 inline-block">
            Paid in NPR
          </span>
        </div>
      </div>

      {/* Requests Section with Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-bold text-slate-900">
            My Service Requests
          </h2>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            {[
              { id: 'all', label: `All (${customerRequests.length})` },
              { id: 'active', label: `Active (${activeRequests.length})` },
              { id: 'completed', label: `Completed (${completedRequests.length})` },
              { id: 'cancelled', label: `Cancelled` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        {displayedRequests.length === 0 ? (
          <EmptyState
            title="No service requests in this tab"
            description="You don't have any requests matching this filter. Explore local service providers to schedule a visit."
            actionLabel="Find Providers"
            onAction={() => window.location.href = '/providers'}
          />
        ) : (
          <div className="space-y-4">
            {displayedRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-slate-200/90 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <StatusBadge status={req.status} />
                    <span className="text-xs text-slate-400 font-mono">
                      #{req.id}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {req.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {req.serviceName}
                    </h3>
                    <p className="text-xs font-medium text-red-700">
                      Provider: {req.providerName}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1">
                    "{req.problemDescription}"
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {req.preferredDate || req.date} at {req.preferredTime || req.time}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {req.area}, {req.district}
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      Est. {req.estimatedPrice}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDetailsModalRequest(req)}
                  >
                    View Details
                  </Button>

                  {/* Review Button: only available if completed and not reviewed yet */}
                  {req.status === 'Completed' && !req.hasReview && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleOpenReview(req)}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Star className="w-3.5 h-3.5 mr-1 fill-white" />
                      Leave Review
                    </Button>
                  )}

                  {req.status === 'Completed' && req.hasReview && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Reviewed
                    </span>
                  )}

                  {/* Cancel button if pending */}
                  {req.status === 'Pending' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => cancelRequest(req.id)}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={Boolean(reviewModalRequest)}
        onClose={() => setReviewModalRequest(null)}
        title="Leave a Verified Review"
        subtitle={reviewModalRequest ? `How was your experience with ${reviewModalRequest.providerName}?` : ''}
        maxWidth="max-w-md"
      >
        {reviewModalRequest && (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <Rating
                value={reviewRating}
                interactive={true}
                onChange={setReviewRating}
                size="lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Written Review & Feedback
              </label>
              <textarea
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Was the provider punctual, polite, and skilled? How was the service quality?"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 placeholder:text-slate-400"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setReviewModalRequest(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Submit Review
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={Boolean(detailsModalRequest)}
        onClose={() => setDetailsModalRequest(null)}
        title="Request Details"
        subtitle={detailsModalRequest ? `Reference: #${detailsModalRequest.id}` : ''}
        maxWidth="max-w-lg"
      >
        {detailsModalRequest && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-slate-500">Status</span>
              <StatusBadge status={detailsModalRequest.status} />
            </div>

            <div className="space-y-2 pb-3 border-b border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{detailsModalRequest.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-semibold text-slate-800">{detailsModalRequest.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Provider:</span>
                <span className="font-semibold text-red-700">{detailsModalRequest.providerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Price:</span>
                <span className="font-bold text-slate-900">{detailsModalRequest.estimatedPrice}</span>
              </div>
            </div>

            <div className="space-y-2 pb-3 border-b border-slate-100">
              <span className="text-slate-500 block font-semibold">Problem Description:</span>
              <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                {detailsModalRequest.problemDescription}
              </p>
            </div>

            <div className="space-y-2 pb-3 border-b border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date & Time:</span>
                <span className="font-semibold text-slate-800">{detailsModalRequest.preferredDate || detailsModalRequest.date} at {detailsModalRequest.preferredTime || detailsModalRequest.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address / Landmark:</span>
                <span className="font-semibold text-slate-800 text-right">{detailsModalRequest.address || `${detailsModalRequest.area}, ${detailsModalRequest.district}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-semibold text-slate-800">{detailsModalRequest.customerPhone}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDetailsModalRequest(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  DollarSign, 
  Briefcase, 
  Navigation, 
  Wrench, 
  XCircle,
  ToggleLeft,
  ToggleRight,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Modal from '../components/Modal.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function ProviderDashboard() {
  const { user, providers, requests, updateRequestStatus, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming', 'active', 'completed'
  const [detailsModalRequest, setDetailsModalRequest] = useState(null);
  const [isAvailableNow, setIsAvailableNow] = useState(true);

  // Match provider data (defaults to p1 Ram Electrical if not logged in as a specific provider)
  const providerProfile = providers.find(p => p.id === (user?.providerId || 'p1')) || providers[0];

  // Requests assigned to this provider or open requests
  const providerRequests = requests.filter(r => 
    r.providerId === providerProfile.id || 
    r.providerId === 'open' || 
    r.category.toLowerCase() === providerProfile.category.toLowerCase()
  );

  const incomingRequests = providerRequests.filter(r => r.status === 'Pending');
  const activeJobs = providerRequests.filter(r => ['Accepted', 'On the Way', 'In Progress'].includes(r.status));
  const completedJobs = providerRequests.filter(r => r.status === 'Completed');

  // Estimate earnings
  const totalEarnings = completedJobs.reduce((acc, curr) => {
    const num = parseInt((curr.estimatedPrice || '0').replace(/[^0-9]/g, '')) || 1200;
    return acc + num;
  }, 0) + 18500; // base historical earnings

  const handleStatusChange = (requestId, nextStatus) => {
    updateRequestStatus(requestId, nextStatus);
  };

  const handleToggleAvailability = () => {
    setIsAvailableNow(!isAvailableNow);
    showToast(
      !isAvailableNow 
        ? "You are now marked Available Now for emergency calls!" 
        : "You are now marked Offline for emergency calls.",
      "info"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Provider Info and Availability Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
            <span>Provider Partner Portal</span>
            <span>·</span>
            <span>{providerProfile.category}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {providerProfile.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Operating in {providerProfile.area}, {providerProfile.district} ({providerProfile.serviceRadius} km radius).
          </p>
        </div>

        {/* Live Availability Toggle */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-2xs">
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Emergency Availability
            </span>
            <span className="text-[11px] text-slate-500">
              {isAvailableNow ? 'Visible to customers needing help now' : 'Not accepting urgent jobs'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleAvailability}
            className="cursor-pointer focus:outline-none"
            aria-label="Toggle availability"
          >
            {isAvailableNow ? (
              <ToggleRight className="w-8 h-8 text-emerald-600" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            New Requests
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 tabular-nums">
            {incomingRequests.length}
          </div>
          <span className="text-[11px] text-amber-700 mt-1 inline-block">Needs action</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Active Jobs
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 tabular-nums">
            {activeJobs.length}
          </div>
          <span className="text-[11px] text-sky-700 mt-1 inline-block">In progress</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Completed Jobs
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {providerProfile.completedJobs + completedJobs.length}
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 inline-block">Total delivered</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Total Earnings
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            Rs. {totalEarnings.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">NPR collected</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs col-span-2 lg:col-span-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Average Rating
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums flex items-center gap-1.5">
            {providerProfile.rating.toFixed(1)}
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">{providerProfile.reviewsCount} customer reviews</span>
        </div>
      </div>

      {/* Tabs and Job Operations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('incoming')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'incoming' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Incoming Requests ({incomingRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'active' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Active Jobs ({activeJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'completed' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Completed ({completedJobs.length})
            </button>
          </div>
        </div>

        {/* 1. Incoming Requests Tab */}
        {activeTab === 'incoming' && (
          <div>
            {incomingRequests.length === 0 ? (
              <EmptyState
                title="No incoming requests pending"
                description="You have accepted all new requests. New jobs from Kathmandu Valley residents will appear here automatically."
              />
            ) : (
              <div className="space-y-4">
                {incomingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white border-2 border-amber-200/80 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-xs">
                          NEW REQUEST
                        </span>
                        <span className="text-xs text-slate-400 font-mono">#{req.id}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {req.serviceName}
                      </h3>

                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                        "{req.problemDescription}"
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-red-700" />
                          {req.address || `${req.area}, ${req.district}`}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {req.customerPhone} ({req.customerName})
                        </span>
                        <span>·</span>
                        <span className="font-bold text-slate-900">
                          Est: {req.estimatedPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDetailsModalRequest(req)}
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleStatusChange(req.id, 'Cancelled')}
                        className="bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleStatusChange(req.id, 'Accepted')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Accept Job
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. Active Jobs Tab with Stepwise Status Transition */}
        {activeTab === 'active' && (
          <div>
            {activeJobs.length === 0 ? (
              <EmptyState
                title="No active jobs at the moment"
                description="Accept an incoming service request to begin work."
              />
            ) : (
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={job.status} />
                          <span className="text-xs text-slate-400 font-mono">#{job.id}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          {job.serviceName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Customer: {job.customerName} ({job.customerPhone}) · 📍 {job.address || `${job.area}, ${job.district}`}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Agreed Estimate</span>
                        <span className="text-sm font-bold text-slate-900">{job.estimatedPrice}</span>
                      </div>
                    </div>

                    {/* Sequential Status Management Steps as specified in Section 10:
                        Accepted -> On the Way -> In Progress -> Completed */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <span>Workflow Progress:</span>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className={`px-2 py-0.5 rounded ${job.status === 'Accepted' ? 'bg-sky-100 text-sky-800 font-bold' : 'text-slate-400'}`}>
                            1. Accepted
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className={`px-2 py-0.5 rounded ${job.status === 'On the Way' ? 'bg-indigo-100 text-indigo-800 font-bold' : 'text-slate-400'}`}>
                            2. On the Way
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className={`px-2 py-0.5 rounded ${job.status === 'In Progress' ? 'bg-purple-100 text-purple-800 font-bold' : 'text-slate-400'}`}>
                            3. In Progress
                          </span>
                          <span className="text-slate-300">→</span>
                          <span className="text-slate-400">
                            4. Completed
                          </span>
                        </div>
                      </div>

                      {/* Next Action Trigger */}
                      <div className="flex items-center gap-2">
                        {job.status === 'Accepted' && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleStatusChange(job.id, 'On the Way')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            <Navigation className="w-3.5 h-3.5 mr-1" />
                            Mark "On the Way"
                          </Button>
                        )}

                        {job.status === 'On the Way' && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleStatusChange(job.id, 'In Progress')}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <Wrench className="w-3.5 h-3.5 mr-1" />
                            Start Work (In Progress)
                          </Button>
                        )}

                        {job.status === 'In Progress' && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleStatusChange(job.id, 'Completed')}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Finish & Mark Completed
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDetailsModalRequest(job)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Completed Jobs Tab */}
        {activeTab === 'completed' && (
          <div>
            {completedJobs.length === 0 ? (
              <EmptyState
                title="No completed jobs yet"
                description="Completed jobs with earnings records will be displayed here."
              />
            ) : (
              <div className="space-y-4">
                {completedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status="Completed" />
                        <span className="text-xs text-slate-400 font-mono">#{job.id}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {job.serviceName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Customer: {job.customerName} · 📍 {job.area}, {job.district}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-emerald-600 font-semibold block">Paid in Full</span>
                      <span className="text-sm font-bold text-slate-900">{job.estimatedPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={Boolean(detailsModalRequest)}
        onClose={() => setDetailsModalRequest(null)}
        title="Job & Customer Details"
        subtitle={detailsModalRequest ? `Reference: #${detailsModalRequest.id}` : ''}
        maxWidth="max-w-lg"
      >
        {detailsModalRequest && (
          <div className="space-y-4 text-xs">
            <div className="space-y-2 pb-3 border-b border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-bold text-slate-900">{detailsModalRequest.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <a href={`tel:${detailsModalRequest.customerPhone}`} className="font-bold text-red-700 underline">
                  {detailsModalRequest.customerPhone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Full Address:</span>
                <span className="font-semibold text-slate-800 text-right">{detailsModalRequest.address || `${detailsModalRequest.area}, ${detailsModalRequest.district}`}</span>
              </div>
            </div>

            <div className="space-y-2 pb-3 border-b border-slate-100">
              <span className="text-slate-500 block font-semibold">Problem / Instructions:</span>
              <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200/60 leading-relaxed">
                {detailsModalRequest.problemDescription}
              </p>
            </div>

            <div className="flex justify-end">
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

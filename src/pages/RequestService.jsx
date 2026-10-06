import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import RequestForm from '../components/RequestForm.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function RequestService() {
  const [searchParams] = useSearchParams();
  const { providers } = useApp();

  const providerId = searchParams.get('providerId');
  const categoryId = searchParams.get('category');

  const preselectedProvider = providerId ? providers.find(p => p.id === providerId) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <Link
        to="/providers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Providers
      </Link>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6 pb-6 border-b border-slate-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
            Doorstep Local Service Booking
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Request a Service Provider
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tell us what needs fixing. Verified technicians in your area of Kathmandu Valley will review and confirm.
          </p>
        </div>

        <RequestForm
          preselectedProvider={preselectedProvider}
          preselectedCategory={categoryId}
        />
      </div>
    </div>
  );
}

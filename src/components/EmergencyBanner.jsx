import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, ChevronRight, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function EmergencyBanner({ onRequestQuickService }) {
  const { providers } = useApp();
  
  // Find top available now emergency providers
  const availableNowProviders = providers
    .filter(p => p.availableNow && ['electrician', 'plumber', 'mechanic', 'locksmith'].includes(p.categoryId))
    .slice(0, 3);

  return (
    <div className="bg-red-50 border-2 border-red-200/90 rounded-2xl p-6 sm:p-8 my-8 shadow-2xs">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-800 bg-red-100/90 px-2.5 py-0.5 rounded-md mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>24/7 Quick & Emergency Service</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Need Help Right Now?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Short-circuit, water pipe burst, flat bike tyre, or locked door? Verified emergency technicians in Kathmandu Valley responding in 10–20 minutes.
          </p>
        </div>

        <Link
          to="/providers?available=true"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 bg-white hover:bg-slate-50 px-4 py-2 rounded-lg border border-red-200 shadow-2xs transition-colors whitespace-nowrap"
        >
          View All Active Emergency Pros
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Service Cards on Clean White Surfaces */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableNowProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:border-red-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-emerald-700 mb-2 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Available Now
                </span>
                <span className="text-slate-400 font-normal flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {provider.responseTime}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 truncate">
                {provider.name}
              </h4>
              <p className="text-xs text-red-700 font-medium mb-1">
                {provider.category}
              </p>
              <p className="text-xs text-slate-500 truncate">
                📍 {provider.area}, {provider.district}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 tabular-nums">
                From Rs. {provider.startingPrice}
              </span>
              <button
                onClick={() => onRequestQuickService ? onRequestQuickService(provider) : null}
                className="text-xs font-semibold px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors cursor-pointer"
              >
                Request Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

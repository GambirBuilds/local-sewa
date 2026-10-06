import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Clock, Zap, CheckCircle2 } from 'lucide-react';
import Rating from './Rating.jsx';
import Button from './Button.jsx';

export default function ProviderCard({ provider, onRequestClick }) {
  return (
    <div className="group flex flex-col justify-between bg-white border border-slate-200/90 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all duration-200">
      <div>
        {/* Top Header */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            {provider.avatar ? (
              <img
                src={provider.avatar}
                alt={provider.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-full h-full bg-linear-to-br from-red-700 to-slate-800 text-white font-bold text-lg items-center justify-center hidden"
              style={{ display: !provider.avatar ? 'flex' : 'none' }}
            >
              {provider.name.charAt(0)}
            </div>
            {provider.availableNow && (
              <span 
                className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" 
                title="Available Now" 
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 truncate">
                {provider.name}
              </h3>
              {provider.verified && (
                <span className="inline-flex items-center text-blue-600 text-xs shrink-0" title="Verified Professional">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}
            </div>

            <p className="text-xs text-red-700 font-medium">
              {provider.category}
            </p>

            <div className="mt-1">
              <Rating value={provider.rating} count={provider.reviewsCount} size="sm" />
            </div>
          </div>
        </div>

        {/* Location & Response Time */}
        <div className="space-y-1.5 text-xs text-slate-500 mb-3.5 py-2 border-y border-slate-100">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{provider.area}, {provider.district}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400 font-mono text-[11px] tabular-nums">{provider.serviceRadius} km radius</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Responds {provider.responseTime}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span>{provider.experience} exp</span>
          </div>
        </div>

        {/* Services Teaser */}
        {provider.services && provider.services.length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Popular Services
            </p>
            <div className="flex flex-wrap gap-1.5">
              {provider.services.slice(0, 3).map((s, idx) => (
                <span 
                  key={idx}
                  className="text-xs text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60 truncate max-w-[200px]"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing & Actions */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xs text-slate-500">Starting from</span>
          <span className="text-base font-bold text-slate-900 tabular-nums">
            Rs. {provider.startingPrice}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/providers/${provider.id}`}
            className="w-full inline-flex items-center justify-center text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            View Profile
          </Link>
          <Button
            size="sm"
            variant="primary"
            onClick={() => onRequestClick ? onRequestClick(provider) : null}
            className="w-full text-xs font-semibold"
          >
            Request Service
          </Button>
        </div>
      </div>
    </div>
  );
}

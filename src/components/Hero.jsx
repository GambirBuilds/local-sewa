import React from 'react';
import { ShieldCheck, Clock, MapPin, Star, Wrench, CheckCircle2 } from 'lucide-react';
import SearchBar from './SearchBar.jsx';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-red-50/60 via-slate-50 to-white border-b border-slate-200 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          {/* Authentic clean tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-red-200 rounded-md text-xs font-semibold text-red-700 shadow-2xs mb-4">
            <span>🇳🇵 Kathmandu Valley Service Directory</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Bagmati Province</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find Trusted Local Services Near You.
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            From electricians and plumbers to mechanics and IT technicians, find reliable local professionals for your everyday home and office repair needs.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-4xl">
          <SearchBar />
        </div>

        {/* Student/Practical Key Trust Metrics */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              350+
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Verified Valley Providers
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              ~15 min
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Avg. Emergency Response
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums flex items-center gap-1">
              4.85
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Over 2,400+ Client Ratings
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              100%
            </div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              Transparent NPR (रू) Rates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

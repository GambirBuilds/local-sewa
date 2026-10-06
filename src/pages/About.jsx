import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Award, Users, Heart, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button.jsx';
import plumberImg from '../assets/images/nepal_plumbing_tech_1791167460460.jpg';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-2">
          About Local Sewa Nepal
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Bringing Trust & Reliability to Everyday Nepali Services.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Local Sewa was born from a simple everyday reality: when a tap bursts in Patan or a main fuse blows in Baneshwor, finding a trustworthy, skilled technician on time shouldn’t take ten frantic phone calls.
        </p>
      </div>

      {/* Story & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">
            Our Mission: Empowering Local Trades & Serving Homes
          </h2>
          <p>
            Nepal is home to hundreds of thousands of extraordinarily talented electricians, plumbers, carpenters, mechanics, and appliance specialists. Yet most operate informally with zero online visibility, fluctuating daily income, and no digital proof of their high craftsmanship.
          </p>
          <p>
            At the same time, urban households and commercial offices in Kathmandu Valley struggle with irregular pricing, missed appointments, and uncertain qualifications.
          </p>
          <p>
            Local Sewa bridges this gap by creating an organized, accountable, and transparent marketplace tailored exclusively to the geography and culture of Nepal.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-2xl font-black text-slate-900 block tabular-nums">350+</span>
              <span className="text-xs text-slate-500">Verified Technicians</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-2xl font-black text-slate-900 block tabular-nums">15+</span>
              <span className="text-xs text-slate-500">Service Categories</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs">
          <div className="rounded-xl overflow-hidden">
            <img
              src={plumberImg}
              alt="Skilled Nepali plumbing technician"
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover"
            />
          </div>
          <p className="text-xs text-slate-500 font-medium text-center mt-3">
            Real local technicians, verified credentials, and honest NPR pricing.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-2">Authentic Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every provider must undergo identity and citizenship verification, as well as a skill check before receiving bookings.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <Award className="w-8 h-8 text-red-700 mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-2">Fair Labor Dignity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We ensure providers earn fair living wages in NPR without unreasonable platform deductions or arbitrary penalties.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <Users className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-2">Community Accountability</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unfiltered customer reviews protect both honest customers and skilled service partners alike.
          </p>
        </div>
      </div>
    </div>
  );
}

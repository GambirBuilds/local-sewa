import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  PhoneCall, 
  Wrench, 
  Sparkles, 
  Award, 
  Users 
} from 'lucide-react';
import Hero from '../components/Hero.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProviderCard from '../components/ProviderCard.jsx';
import EmergencyBanner from '../components/EmergencyBanner.jsx';
import Modal from '../components/Modal.jsx';
import RequestForm from '../components/RequestForm.jsx';
import { serviceCategories } from '../data/services.js';
import { useApp } from '../context/AppContext.jsx';
import joinBannerImg from '../assets/images/nepal_join_providers_1791167483573.jpg';

export default function Home() {
  const navigate = useNavigate();
  const { providers } = useApp();
  const [selectedProviderForRequest, setSelectedProviderForRequest] = useState(null);

  // Top 8 popular categories for homepage
  const popularCategories = serviceCategories.slice(0, 8);
  
  // Featured top providers
  const featuredProviders = providers.slice(0, 6);

  const handleOpenRequest = (provider) => {
    setSelectedProviderForRequest(provider);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section with Kathmandu Valley Search */}
      <Hero />

      {/* 2. Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
              Popular Services
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What can we help you fix today?
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 transition-colors whitespace-nowrap"
          >
            Explore all 15 categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {popularCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. Emergency / Quick Service Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyBanner onRequestQuickService={handleOpenRequest} />
      </section>

      {/* 4. Top Rated Providers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
              Verified Professionals
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top Rated Providers Near You
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Background checked, skilled tradesmen with verified customer reviews in Kathmandu Valley.
            </p>
          </div>
          <Link
            to="/providers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 transition-colors whitespace-nowrap"
          >
            View all providers ({providers.length})
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onRequestClick={handleOpenRequest}
            />
          ))}
        </div>
      </section>

      {/* 5. How It Works */}
      <section id="how-it-works" className="bg-slate-100/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
              Simple & Transparent
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Local Sewa Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Book dependable doorstep service across Nepal in four straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <span className="text-4xl font-extrabold text-slate-200 block mb-3 tabular-nums">01</span>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Find a Service</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose the service category you need and select your specific municipality or local area in Kathmandu Valley.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <span className="text-4xl font-extrabold text-slate-200 block mb-3 tabular-nums">02</span>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Choose a Provider</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compare verified ratings, transparent pricing, past jobs, and response times of nearby tradespeople.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <span className="text-4xl font-extrabold text-slate-200 block mb-3 tabular-nums">03</span>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Request a Service</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Submit your problem description, preferred schedule, and exact location. The provider accepts and calls to confirm.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <span className="text-4xl font-extrabold text-slate-200 block mb-3 tabular-nums">04</span>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Get the Job Done</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The technician arrives at your doorstep, completes the work with fair NPR rates, and you leave a genuine rating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trust & Safety Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
              Built on Trust
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Why Kathmandu Valley Chooses Local Sewa
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Finding honest, skilled technicians in Nepal used to rely on word-of-mouth or roadside visiting cards. Local Sewa brings organized reliability, fair prices, and direct communication to every home.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Verified Providers & Identity Check</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Every service professional is verified with citizenship, business licenses, and trade credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Transparent NPR Rates</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clear baseline labor rates before work begins. No unexpected arbitrary surprise bills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Authentic Customer Reviews</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reviews can only be posted after a real completed service request has taken place.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Coverage Across the Valley</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    From Kirtipur to Thimi, Gongabu to Godawari—find technicians operating right in your neighbourhood.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Become a Provider CTA card */}
          <div className="bg-white border-2 border-red-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-1 rounded inline-block mb-3">
                For Service Professionals
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
                Grow Your Service Business in Kathmandu Valley
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Are you an electrician, plumber, carpenter, mechanic, or technician? Register for free, set your own schedule, and start receiving daily requests from local households.
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Receive direct requests from your chosen municipality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct cash or Fonepay QR payment upon job completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Build your reputation with verified 5-star customer reviews</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                to="/become-provider"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg shadow-2xs transition-colors"
              >
                Join as a Service Partner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Quick Service Booking */}
      <Modal
        isOpen={Boolean(selectedProviderForRequest)}
        onClose={() => setSelectedProviderForRequest(null)}
        title="Book Service Request"
        subtitle={selectedProviderForRequest ? `Request direct service from ${selectedProviderForRequest.name}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedProviderForRequest && (
          <RequestForm
            preselectedProvider={selectedProviderForRequest}
            onCancel={() => setSelectedProviderForRequest(null)}
            onSuccess={() => {
              // Form handles its own confirmation screen
            }}
          />
        )}
      </Modal>
    </div>
  );
}

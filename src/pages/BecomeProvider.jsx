import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Star
} from 'lucide-react';
import Button from '../components/Button.jsx';
import joinBannerImg from '../assets/images/nepal_join_providers_1791167483573.jpg';

export default function BecomeProvider() {
  const benefits = [
    {
      icon: Users,
      title: "Find Daily New Customers",
      desc: "Stop relying only on occasional word-of-mouth. Receive direct service requests from households in your neighborhood every morning."
    },
    {
      icon: Calendar,
      title: "Work on Your Own Schedule",
      desc: "Accept jobs when you are free. Toggle 'Available Now' whenever you want urgent jobs, or turn it off when you're busy."
    },
    {
      icon: Star,
      title: "Build Digital Reputation",
      desc: "Collect verified 5-star ratings and authentic client reviews that prove your trade skill to thousands of customers."
    },
    {
      icon: DollarSign,
      title: "Direct NPR Payments",
      desc: "Customers pay you directly in cash or Fonepay QR upon finishing the job. Keep what you rightfully earn."
    },
    {
      icon: ShieldCheck,
      title: "Verified Partner Badge",
      desc: "Stand out from informal labor with official Local Sewa verification, giving clients instant confidence."
    },
    {
      icon: TrendingUp,
      title: "Grow Your Local Business",
      desc: "Expand your radius from a single chowk to entire Kathmandu, Lalitpur, or Bhaktapur municipalities."
    }
  ];

  const steps = [
    { step: "01", title: "Quick Online Registration", desc: "Submit your name, phone, trade category, and primary service area." },
    { step: "02", title: "Trade Credential Check", desc: "Our Kathmandu team verifies your citizenship and skill experience within 24 hours." },
    { step: "03", title: "Start Receiving Requests", desc: "Open your provider dashboard, accept customer requests, and grow your monthly earnings." }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Clean Light Hero section */}
      <section className="bg-gradient-to-b from-red-50/70 via-slate-50 to-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 rounded-md text-xs font-semibold text-red-700 shadow-2xs mb-3">
              <span>🇳🇵 For Technicians & Tradespeople in Kathmandu Valley</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Grow Your Trade Business in Kathmandu Valley.
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Join hundreds of electricians, plumbers, carpenters, mechanics, and technicians earning steady income with trusted local customers.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/register?role=provider">
                <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold">
                  Register as a Service Provider
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-slate-700 border-slate-300 hover:bg-slate-100">
                  Already a Partner? Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
            Why Join Us
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed to Help Local Tradespeople Succeed
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Everything you need to run and expand your local service practice without marketing overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="p-6 bg-white border border-slate-200/90 rounded-xl shadow-2xs hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How to Join Steps */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
              Easy Onboarding
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-3xl font-extrabold text-slate-300 block mb-2 tabular-nums">
                  {st.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{st.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/register?role=provider">
              <Button variant="primary" size="lg" className="font-bold">
                Start Provider Registration
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Local<span className="text-red-500">Sewa</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Nepal’s verified marketplace connecting households and offices across Kathmandu, Lalitpur, and Bhaktapur with dependable electricians, plumbers, carpenters, and technicians.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>New Baneshwor, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+977 1-4782910 / +977 9841-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>support@localsewa.com.np</span>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Popular Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/providers?category=electrician" className="hover:text-white transition-colors">
                  Electricians in Kathmandu
                </Link>
              </li>
              <li>
                <Link to="/providers?category=plumber" className="hover:text-white transition-colors">
                  Plumbers in Lalitpur
                </Link>
              </li>
              <li>
                <Link to="/providers?category=carpenter" className="hover:text-white transition-colors">
                  Carpenters in Bhaktapur
                </Link>
              </li>
              <li>
                <Link to="/providers?category=cleaner" className="hover:text-white transition-colors">
                  Deep Home Cleaning
                </Link>
              </li>
              <li>
                <Link to="/providers?category=ac-fridge" className="hover:text-white transition-colors">
                  AC & Refrigerator Repair
                </Link>
              </li>
              <li>
                <Link to="/providers?category=mechanic" className="hover:text-white transition-colors">
                  Bike Puncture & Mechanic
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore & Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  All 15 Service Categories
                </Link>
              </li>
              <li>
                <Link to="/providers" className="hover:text-white transition-colors">
                  Verified Providers
                </Link>
              </li>
              <li>
                <Link to="/become-provider" className="hover:text-white transition-colors">
                  Join as a Service Partner
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Local Sewa
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Coverage Areas
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Kathmandu Metropolitan City</li>
              <li>Lalitpur Metropolitan City</li>
              <li>Bhaktapur & Thimi</li>
              <li>Kirtipur & Chandragiri</li>
              <li>Budhanilkantha & Tokha</li>
              <li>Suryabinayak & Mahalaxmi</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Local Sewa Nepal Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Kathmandu Valley, Nepal</span>
            <span>·</span>
            <span>All Rates in NPR (रू)</span>
            <span>·</span>
            <span>Trusted Local Professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

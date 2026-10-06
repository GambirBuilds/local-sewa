import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import CategoryCard from '../components/CategoryCard.jsx';
import { serviceCategories } from '../data/services.js';

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = serviceCategories.filter(cat => {
    const term = searchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(term) ||
      cat.nepaliName?.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term) ||
      cat.popularTasks.some(t => t.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-700 mb-2">
          <span>Complete Service Directory</span>
          <span>·</span>
          <span>Kathmandu Valley</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          All Service Categories
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Explore all 15 home, trade, electronics, and vehicle maintenance services available across Kathmandu, Lalitpur, and Bhaktapur.
        </p>

        {/* Filter input */}
        <div className="mt-6 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search category, problem or task (e.g. fan, geyser, leak)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
          />
        </div>
      </div>

      {/* Grid of All Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="flex flex-col justify-between bg-white border border-slate-200/90 rounded-xl p-5 hover:border-red-600/60 hover:shadow-md transition-all">
            <div>
              <CategoryCard category={category} />

              {/* Popular Tasks Pills */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Common Tasks Handled:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {category.popularTasks.map((task, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <Link
                to={`/providers?category=${category.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
              >
                <span>View {category.providersCount} Providers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200 p-8">
          <p className="text-sm font-semibold text-slate-800">No categories found matching "{searchTerm}"</p>
          <p className="text-xs text-slate-500 mt-1">Try searching for electrician, plumbing, painting, or cleaning.</p>
        </div>
      )}
    </div>
  );
}

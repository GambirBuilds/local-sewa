import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Star, 
  ShieldCheck, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import ProviderGrid from '../components/ProviderGrid.jsx';
import Modal from '../components/Modal.jsx';
import RequestForm from '../components/RequestForm.jsx';
import LocationSelector from '../components/LocationSelector.jsx';
import Button from '../components/Button.jsx';
import { serviceCategories } from '../data/services.js';
import { districtsList, locations } from '../data/locations.js';
import { useApp } from '../context/AppContext.jsx';

export default function Providers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { providers, userLocation, setUserLocation } = useApp();

  // Filter states initialized from URL or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || '');
  const [selectedArea, setSelectedArea] = useState(searchParams.get('area') || '');
  const [minRating, setMinRating] = useState(Number(searchParams.get('rating')) || 0);
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');
  const [availableNowOnly, setAvailableNowOnly] = useState(searchParams.get('available') === 'true');
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 0);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'price_asc', 'price_desc', 'reviews'

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedProviderForRequest, setSelectedProviderForRequest] = useState(null);

  // Sync when searchParams change externally (e.g. from hero search)
  useEffect(() => {
    if (searchParams.get('q') !== null) setSearchQuery(searchParams.get('q'));
    if (searchParams.get('category') !== null) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('district') !== null) setSelectedDistrict(searchParams.get('district'));
    if (searchParams.get('area') !== null) setSelectedArea(searchParams.get('area'));
    if (searchParams.get('available') !== null) setAvailableNowOnly(searchParams.get('available') === 'true');
  }, [searchParams]);

  // Derived filtered & sorted list
  const filteredProviders = useMemo(() => {
    return providers.filter(provider => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = provider.name.toLowerCase().includes(q);
        const matchesCat = provider.category.toLowerCase().includes(q);
        const matchesBio = provider.bio.toLowerCase().includes(q);
        const matchesServices = provider.services.some(s => s.name.toLowerCase().includes(q));
        const matchesArea = provider.area.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesBio && !matchesServices && !matchesArea) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory && provider.categoryId !== selectedCategory) {
        return false;
      }

      // 3. District
      if (selectedDistrict && provider.district !== selectedDistrict) {
        return false;
      }

      // 4. Area
      if (selectedArea && provider.area.toLowerCase() !== selectedArea.toLowerCase()) {
        return false;
      }

      // 5. Min Rating
      if (minRating > 0 && provider.rating < minRating) {
        return false;
      }

      // 6. Verified
      if (verifiedOnly && !provider.verified) {
        return false;
      }

      // 7. Available Now
      if (availableNowOnly && !provider.availableNow) {
        return false;
      }

      // 8. Max Price
      if (maxPrice > 0 && provider.startingPrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price_desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [
    providers, 
    searchQuery, 
    selectedCategory, 
    selectedDistrict, 
    selectedArea, 
    minRating, 
    verifiedOnly, 
    availableNowOnly, 
    maxPrice, 
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDistrict('');
    setSelectedArea('');
    setMinRating(0);
    setVerifiedOnly(false);
    setAvailableNowOnly(false);
    setMaxPrice(0);
    setSortBy('rating');
    setSearchParams({});
  };

  const handleOpenRequest = (provider) => {
    setSelectedProviderForRequest(provider);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Kathmandu Valley Marketplace</span>
            <span>·</span>
            <span className="text-red-700 font-bold">{filteredProviders.length} Providers Found</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Local Service Providers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Filter by trade, Kathmandu Valley locality, rating, and immediate availability.
          </p>
        </div>

        {/* Search input & Mobile filter trigger */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skill, or area..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block col-span-1 bg-white border border-slate-200 rounded-xl p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-red-700" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-red-700 hover:text-red-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 text-slate-800"
            >
              <option value="">All Categories</option>
              {serviceCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name} ({cat.providersCount})</option>
              ))}
            </select>
          </div>

          {/* Location Filters */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Kathmandu Valley Location
            </label>
            <div className="space-y-2">
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedArea('');
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 text-slate-800"
              >
                <option value="">All Districts (Kathmandu, Lalitpur, Bhaktapur)</option>
                {districtsList.map(d => (
                  <option key={d} value={d}>{d} District</option>
                ))}
              </select>

              {selectedDistrict && (
                <input
                  type="text"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  placeholder="Filter by specific area (e.g. Baneshwor, Patan)..."
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 text-slate-800"
                />
              )}
            </div>
          </div>

          {/* Verified & Available Now Checkboxes */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
              />
              <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Verified Providers Only
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={availableNowOnly}
                onChange={(e) => setAvailableNowOnly(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
              />
              <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Available Right Now
              </span>
            </label>
          </div>

          {/* Minimum Rating */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Minimum Rating
            </label>
            <div className="space-y-1 text-xs">
              {[
                { val: 0, label: "Any Rating" },
                { val: 4.8, label: "4.8 & above ⭐" },
                { val: 4.5, label: "4.5 & above ⭐" },
                { val: 4.0, label: "4.0 & above ⭐" }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setMinRating(opt.val)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                    minRating === opt.val
                      ? 'bg-red-50 text-red-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Maximum Price Filter */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Max Starting Price (NPR)
            </label>
            <div className="space-y-1 text-xs">
              {[
                { val: 0, label: "All Prices" },
                { val: 400, label: "Under Rs. 400" },
                { val: 600, label: "Under Rs. 600" },
                { val: 1000, label: "Under Rs. 1,000" }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setMaxPrice(opt.val)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                    maxPrice === opt.val
                      ? 'bg-red-50 text-red-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="col-span-1 md:col-span-3 space-y-5">
          {/* Top Sort Bar */}
          <div className="flex items-center justify-between bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs">
            <span className="text-slate-500">
              Showing <strong className="text-slate-900 tabular-nums">{filteredProviders.length}</strong> available professionals
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Provider Grid */}
          <ProviderGrid
            providers={filteredProviders}
            onRequestClick={handleOpenRequest}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white p-5 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Filters</h3>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="p-1 rounded-lg text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-6 flex-1">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="">All Categories</option>
                {serviceCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="">All Districts</option>
                {districtsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="text-sm font-medium text-slate-800">Verified Providers Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableNowOnly}
                  onChange={(e) => setAvailableNowOnly(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="text-sm font-medium text-slate-800">Available Right Now</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex gap-2">
            <button
              onClick={() => { handleResetFilters(); setMobileFilterOpen(false); }}
              className="w-1/2 py-2.5 text-xs font-bold border border-slate-300 rounded-lg text-slate-700"
            >
              Reset
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-1/2 py-2.5 text-xs font-bold bg-red-700 text-white rounded-lg"
            >
              Show Results
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <Modal
        isOpen={Boolean(selectedProviderForRequest)}
        onClose={() => setSelectedProviderForRequest(null)}
        title="Request Service"
        subtitle={selectedProviderForRequest ? `Direct request to ${selectedProviderForRequest.name}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedProviderForRequest && (
          <RequestForm
            preselectedProvider={selectedProviderForRequest}
            onCancel={() => setSelectedProviderForRequest(null)}
          />
        )}
      </Modal>
    </div>
  );
}

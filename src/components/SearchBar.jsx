import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { serviceCategories } from '../data/services.js';
import { districtsList, getAreasByMunicipality, locations } from '../data/locations.js';
import Button from './Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function SearchBar({ initialQuery = '', initialCategory = '', initialLocation = null, className = '' }) {
  const navigate = useNavigate();
  const { userLocation, setUserLocation } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [district, setDistrict] = useState(initialLocation?.district || userLocation.district || 'Kathmandu');
  const [area, setArea] = useState(initialLocation?.area || userLocation.area || 'Baneshwor');

  // Municipalities for chosen district
  const muns = locations[district]?.municipalities || [];
  // All areas in district
  const districtAreas = [];
  muns.forEach(m => {
    m.areas.forEach(a => {
      if (!districtAreas.includes(a)) districtAreas.push(a);
    });
  });

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    // Update global location preference
    const matchedMun = muns.find(m => m.areas.includes(area))?.name || (muns[0]?.name || 'Kathmandu Metropolitan City');
    setUserLocation({
      district,
      municipality: matchedMun,
      area
    });

    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category) params.set('category', category);
    if (district) params.set('district', district);
    if (area) params.set('area', area);

    navigate(`/providers?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 sm:p-3 transition-all ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
        {/* Service keyword input */}
        <div className="md:col-span-4 relative flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border border-slate-200/80 md:border-none">
          <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Service
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Electrician, plumber, AC..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-3 relative flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border border-slate-200/80 md:border-l md:border-slate-200 md:rounded-none">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-2.5 shrink-0 hidden sm:block" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer truncate"
            >
              <option value="">All 15 Categories</option>
              {serviceCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* District & Area Selection */}
        <div className="md:col-span-3 relative flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border border-slate-200/80 md:border-l md:border-slate-200 md:rounded-none">
          <MapPin className="w-4 h-4 text-red-700 mr-2.5 shrink-0 hidden sm:block" />
          <div className="w-full grid grid-cols-2 gap-1">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                District
              </label>
              <select
                value={district}
                onChange={(e) => {
                  const newDist = e.target.value;
                  setDistrict(newDist);
                  const firstArea = locations[newDist]?.municipalities[0]?.areas[0] || 'Patan';
                  setArea(firstArea);
                }}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                {districtsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                Area
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer truncate"
              >
                {districtAreas.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            size="md"
            variant="primary"
            className="w-full h-11 text-sm font-semibold rounded-xl"
          >
            Find Services
          </Button>
        </div>
      </div>
    </form>
  );
}

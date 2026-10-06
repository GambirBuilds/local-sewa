import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { 
  PROVINCE, 
  districtsList, 
  getMunicipalitiesByDistrict, 
  getAreasByMunicipality 
} from '../data/locations.js';

export default function LocationSelector({
  value = { district: 'Kathmandu', municipality: 'Kathmandu Metropolitan City', area: 'Baneshwor' },
  onChange,
  layout = 'horizontal', // 'horizontal', 'vertical', 'compact'
  showProvince = true,
  className = ''
}) {
  const [district, setDistrict] = useState(value.district || 'Kathmandu');
  const [municipality, setMunicipality] = useState(value.municipality || 'Kathmandu Metropolitan City');
  const [area, setArea] = useState(value.area || 'Baneshwor');

  const availableMunicipalities = getMunicipalitiesByDistrict(district);
  const availableAreas = getAreasByMunicipality(district, municipality);

  // Sync external changes
  useEffect(() => {
    if (value.district && value.district !== district) {
      setDistrict(value.district);
    }
    if (value.municipality && value.municipality !== municipality) {
      setMunicipality(value.municipality);
    }
    if (value.area && value.area !== area) {
      setArea(value.area);
    }
  }, [value]);

  const handleDistrictChange = (newDistrict) => {
    setDistrict(newDistrict);
    const muns = getMunicipalitiesByDistrict(newDistrict);
    const firstMun = muns[0] || '';
    setMunicipality(firstMun);
    const areas = getAreasByMunicipality(newDistrict, firstMun);
    const firstArea = areas[0] || '';
    setArea(firstArea);

    if (onChange) {
      onChange({
        district: newDistrict,
        municipality: firstMun,
        area: firstArea
      });
    }
  };

  const handleMunicipalityChange = (newMun) => {
    setMunicipality(newMun);
    const areas = getAreasByMunicipality(district, newMun);
    const firstArea = areas[0] || '';
    setArea(firstArea);

    if (onChange) {
      onChange({
        district,
        municipality: newMun,
        area: firstArea
      });
    }
  };

  const handleAreaChange = (newArea) => {
    setArea(newArea);
    if (onChange) {
      onChange({
        district,
        municipality,
        area: newArea
      });
    }
  };

  if (layout === 'compact') {
    return (
      <div className={`flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs ${className}`}>
        <MapPin className="w-3.5 h-3.5 text-red-700 shrink-0" />
        <select
          value={district}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
        >
          {districtsList.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <span className="text-slate-300">/</span>
        <select
          value={area}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer max-w-[130px] truncate"
        >
          {availableAreas.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={`${layout === 'horizontal' ? 'grid grid-cols-1 sm:grid-cols-3 gap-3' : 'space-y-3'} ${className}`}>
      {showProvince && (
        <div className={layout === 'horizontal' ? 'col-span-1 sm:col-span-3' : ''}>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Province</span>
            <span className="text-[11px] font-medium text-slate-400">Bagmati</span>
          </div>
          <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
            {PROVINCE}
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          District
        </label>
        <select
          value={district}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-slate-800"
        >
          {districtsList.map(d => (
            <option key={d} value={d}>{d} District</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Municipality / Palika
        </label>
        <select
          value={municipality}
          onChange={(e) => handleMunicipalityChange(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-slate-800 truncate"
        >
          {availableMunicipalities.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Area / Tole / Chowk
        </label>
        <select
          value={area}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 text-slate-800 truncate"
        >
          {availableAreas.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

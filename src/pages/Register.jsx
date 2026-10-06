import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Wrench, ShieldCheck, UserCheck } from 'lucide-react';
import LocationSelector from '../components/LocationSelector.jsx';
import Button from '../components/Button.jsx';
import { serviceCategories } from '../data/services.js';
import { useApp } from '../context/AppContext.jsx';

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginUser, registerProvider } = useApp();

  const initialRole = searchParams.get('role') === 'provider' ? 'provider' : 'customer';
  const [role, setRole] = useState(initialRole);

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+977 98');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState({
    district: 'Kathmandu',
    municipality: 'Kathmandu Metropolitan City',
    area: 'Baneshwor'
  });

  // Provider specific fields
  const [category, setCategory] = useState('electrician');
  const [experience, setExperience] = useState('5+ Years');
  const [serviceRadius, setServiceRadius] = useState(8);
  const [startingPrice, setStartingPrice] = useState(400);
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please provide your name or business name.");
      return;
    }

    if (role === 'customer') {
      loginUser({
        id: "cust-" + Date.now().toString().slice(-4),
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        phone,
        role: "customer",
        district: location.district,
        municipality: location.municipality,
        area: location.area,
        address: `${location.area}, ${location.district}`
      });
      navigate('/dashboard');
    } else {
      const selectedCatObj = serviceCategories.find(c => c.id === category);
      registerProvider({
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        phone,
        category: selectedCatObj ? selectedCatObj.name : 'Home Maintenance',
        categoryId: category,
        experience,
        district: location.district,
        municipality: location.municipality,
        area: location.area,
        serviceRadius,
        startingPrice,
        bio
      });
      navigate('/provider-dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-700 text-white flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Local<span className="text-red-700">Sewa</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">
            Create an Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Join Kathmandu Valley’s trusted network for home & local services.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`w-1/2 py-2 rounded-md transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register as Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('provider')}
            className={`w-1/2 py-2 rounded-md transition-all cursor-pointer ${
              role === 'provider'
                ? 'bg-white text-red-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register as Service Provider
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {role === 'provider' ? 'Business or Full Name' : 'Full Name'} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'provider' ? 'E.g. Shrestha Electricals' : 'E.g. Sushmita Thapa'}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+977 9841-XXXXXX"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                required
              />
            </div>
          </div>

          {/* Provider Specific Section */}
          {role === 'provider' && (
            <div className="p-4 bg-red-50/50 border border-red-200/60 rounded-xl space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
                <ShieldCheck className="w-4 h-4 text-red-700" />
                <span>Trade & Service Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Primary Service Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    required
                  >
                    {serviceCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Trade Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  >
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Base Visit / Starting Fee (NPR)
                  </label>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Service Radius (km)
                  </label>
                  <input
                    type="number"
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Brief Bio / Specializations
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="E.g. Certified wiring expert with 6 years experience in Lalitpur and Kathmandu."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20"
                />
              </div>
            </div>
          )}

          {/* Location Selector */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="block text-xs font-bold text-slate-900 mb-2">
              Primary Location in Kathmandu Valley
            </span>
            <LocationSelector
              value={location}
              onChange={setLocation}
              layout="horizontal"
              showProvince={false}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full font-bold"
          >
            Complete {role === 'provider' ? 'Provider Registration' : 'Customer Sign Up'}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-red-700 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}

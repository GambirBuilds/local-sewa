import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Lock, Mail, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { loginUser, switchRole } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' or 'provider'

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter an email address or mobile number.");
      return;
    }

    if (role === 'provider') {
      loginUser({
        id: "p1",
        name: "Ram Krishna Shrestha",
        email: email || "ram.electrical.ktm@gmail.com",
        phone: "+977 9841-238910",
        role: "provider",
        providerId: "p1",
        category: "Electrician",
        district: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        area: "Baneshwor"
      });
      navigate('/provider-dashboard');
    } else {
      loginUser({
        id: "cust-1",
        name: "Aayush Sharma",
        email: email || "aayush.sharma@gmail.com",
        phone: "+977 9841-552233",
        role: "customer",
        district: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        area: "Baneshwor",
        address: "Near Shankhamul Bridge, New Baneshwor"
      });
      navigate('/dashboard');
    }
  };

  const handleQuickDemo = (type) => {
    if (type === 'customer') {
      switchRole('customer');
      navigate('/dashboard');
    } else {
      switchRole('provider');
      navigate('/provider-dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Brand header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-700 text-white flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Local<span className="text-red-700">Sewa</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your bookings or manage incoming trade jobs.
          </p>
        </div>

        {/* Role Segmented Switch */}
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
            I'm a Customer
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
            I'm a Service Provider
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email or Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'provider' ? 'ram.electrical@gmail.com or 9841...' : 'aayush.sharma@gmail.com or 9841...'}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Password
              </label>
              <span className="text-[11px] text-slate-400">
                Demo: any password works
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full font-bold"
          >
            Sign In as {role === 'provider' ? 'Service Provider' : 'Customer'}
          </Button>
        </form>

        {/* Quick Demo Logins for Reviewer convenience */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2.5">
            Quick 1-Click Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('customer')}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-slate-900">Aayush (Customer)</div>
              <div className="text-[10px] text-slate-500">View bookings</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('provider')}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-red-700 text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-red-700">Ram (Electrician)</div>
              <div className="text-[10px] text-slate-500">Manage jobs</div>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-red-700 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

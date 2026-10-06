import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Wrench, User, LogOut, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Button from './Button.jsx';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutUser, switchRole, userLocation } = useApp();
  const navigate = useNavigate();

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Find Providers', path: '/providers' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Become a Provider', path: '/become-provider' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 border-t-3 border-t-red-700 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group focus:outline-none"
            onClick={closeMenu}
          >
            <div className="w-9 h-9 rounded-xl bg-red-700 text-white flex items-center justify-center font-black shadow-xs group-hover:bg-red-800 transition-colors">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Local<span className="text-red-700">Sewa</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-red-700 transition-colors whitespace-nowrap ${
                    isActive ? 'text-red-700 font-semibold' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Role Switcher */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => switchRole('customer')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  user?.role === 'customer'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'hover:text-slate-900'
                }`}
                title="Switch to Customer view"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => switchRole('provider')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  user?.role === 'provider'
                    ? 'bg-white text-red-700 shadow-2xs font-bold'
                    : 'hover:text-slate-900'
                }`}
                title="Switch to Service Provider view"
              >
                Provider
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={user.role === 'provider' ? '/provider-dashboard' : '/dashboard'}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user.role === 'provider' ? 'Provider Portal' : 'My Requests'}</span>
                </Link>
                <button
                  type="button"
                  onClick={logoutUser}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="text-xs"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-xl">
          {/* Location indicator in mobile menu */}
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
            <MapPin className="w-4 h-4 text-red-700 shrink-0" />
            <span>Serving: {userLocation.area}, {userLocation.district}</span>
          </div>

          {/* Mobile Role Switcher */}
          <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-lg text-xs font-semibold">
            <span className="text-slate-500 pl-2">Role Mode:</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => { switchRole('customer'); closeMenu(); }}
                className={`px-3 py-1 rounded-md ${
                  user?.role === 'customer' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => { switchRole('provider'); closeMenu(); }}
                className={`px-3 py-1 rounded-md ${
                  user?.role === 'provider' ? 'bg-white text-red-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Provider
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={user.role === 'provider' ? '/provider-dashboard' : '/dashboard'}
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
                >
                  {user.role === 'provider' ? 'Open Provider Dashboard' : 'Open Customer Dashboard'}
                </Link>
                <button
                  type="button"
                  onClick={() => { logoutUser(); closeMenu(); }}
                  className="w-full text-center px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Sign Out ({user.name})
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-center px-4 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="text-center px-4 py-2.5 bg-red-700 text-white text-xs font-semibold rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

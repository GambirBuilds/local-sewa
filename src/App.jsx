import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Providers from './pages/Providers.jsx';
import ProviderDetails from './pages/ProviderDetails.jsx';
import RequestService from './pages/RequestService.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProviderDashboard from './pages/ProviderDashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import BecomeProvider from './pages/BecomeProvider.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import { AppProvider } from './context/AppContext.jsx';

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/providers/:id" element={<ProviderDetails />} />
              <Route path="/request" element={<RequestService />} />
              <Route path="/request-service" element={<RequestService />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/become-provider" element={<BecomeProvider />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

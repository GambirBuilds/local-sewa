import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProviders } from '../data/providers.js';
import { initialReviews } from '../data/reviews.js';

const AppContext = createContext();

const STORAGE_KEYS = {
  USER: 'local_sewa_user',
  PROVIDERS: 'local_sewa_providers',
  REQUESTS: 'local_sewa_requests',
  REVIEWS: 'local_sewa_reviews',
  LOCATION: 'local_sewa_location'
};

const defaultCustomerUser = {
  id: "cust-1",
  name: "Aayush Sharma",
  email: "aayush.sharma@gmail.com",
  phone: "+977 9841-552233",
  role: "customer",
  district: "Kathmandu",
  municipality: "Kathmandu Metropolitan City",
  area: "Baneshwor",
  address: "Near Shankhamul Bridge, New Baneshwor"
};

const defaultSampleRequests = [
  {
    id: "req-101",
    customerId: "cust-1",
    customerName: "Aayush Sharma",
    customerPhone: "+977 9841-552233",
    providerId: "p1",
    providerName: "Ram Krishna Shrestha (Ram Electrical)",
    category: "Electrician",
    serviceName: "Ceiling Fan Installation / Repair",
    problemDescription: "Living room ceiling fan is humming loudly and rotating at very slow speed. Capacitor might be worn out.",
    date: "2026-10-06",
    time: "10:30 AM",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    area: "Baneshwor",
    address: "Near Shankhamul Bridge, New Baneshwor",
    estimatedPrice: "Rs. 500 - 800",
    status: "Accepted",
    createdAt: "2026-10-04T10:15:00Z",
    hasReview: false
  },
  {
    id: "req-102",
    customerId: "cust-1",
    customerName: "Aayush Sharma",
    customerPhone: "+977 9841-552233",
    providerId: "p2",
    providerName: "Bijay Thapa (Patan Plumbing Works)",
    category: "Plumber",
    serviceName: "Water Tank Float Valve Fix",
    problemDescription: "Overhead 1000L Sintex water tank is overflowing whenever motor runs. Float brass valve needs urgent replacement.",
    date: "2026-10-05",
    time: "02:00 PM",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    area: "Baneshwor",
    address: "Near Shankhamul Bridge, New Baneshwor",
    estimatedPrice: "Rs. 600 - 900",
    status: "On the Way",
    createdAt: "2026-10-04T08:30:00Z",
    hasReview: false
  },
  {
    id: "req-103",
    customerId: "cust-1",
    customerName: "Aayush Sharma",
    customerPhone: "+977 9841-552233",
    providerId: "p6",
    providerName: "Rohan Shakya (Kathmandu Tech Doctor)",
    category: "Computer Technician",
    serviceName: "Laptop Screen / Keyboard Replacement",
    problemDescription: "Dell Inspiron laptop display flickering and horizontal green lines after accidental drop.",
    date: "2026-09-25",
    time: "11:00 AM",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    area: "Baneshwor",
    address: "Near Shankhamul Bridge, New Baneshwor",
    estimatedPrice: "Rs. 1,200",
    status: "Completed",
    createdAt: "2026-09-24T14:00:00Z",
    hasReview: true
  },
  {
    id: "req-104",
    customerId: "cust-2",
    customerName: "Sita Khadka",
    customerPhone: "+977 9801-998811",
    providerId: "p1",
    providerName: "Ram Krishna Shrestha (Ram Electrical)",
    category: "Electrician",
    serviceName: "MCB Trip / Short-Circuit Diagnosis",
    problemDescription: "Main MCB breaker in kitchen trips immediately when rice cooker is plugged in. Suspect wire short in junction box.",
    date: "2026-10-05",
    time: "09:00 AM",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    area: "Old Baneshwor",
    address: "Near Apex College, Old Baneshwor",
    estimatedPrice: "Rs. 650 - 1,000",
    status: "Pending",
    createdAt: "2026-10-04T18:00:00Z",
    hasReview: false
  },
  {
    id: "req-105",
    customerId: "cust-3",
    customerName: "Dhiraj Basnet",
    customerPhone: "+977 9841-112244",
    providerId: "p1",
    providerName: "Ram Krishna Shrestha (Ram Electrical)",
    category: "Electrician",
    serviceName: "Inverter & Battery Wiring",
    problemDescription: "New Luminous 1050VA inverter purchased. Need DC battery cable crimping and inverter bypass switch installation.",
    date: "2026-10-05",
    time: "04:00 PM",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan City",
    area: "Koteshwor",
    address: "Near Mahadevsthan, Koteshwor",
    estimatedPrice: "Rs. 1,800 - 2,500",
    status: "In Progress",
    createdAt: "2026-10-04T12:00:00Z",
    hasReview: false
  }
];

export function AppProvider({ children }) {
  // Current user (can be customer, provider, or null)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : defaultCustomerUser;
    } catch {
      return defaultCustomerUser;
    }
  });

  // Providers list with dynamic avatar sync
  const [providers, setProviders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
      if (!saved) return initialProviders;
      const parsed = JSON.parse(saved);
      // Ensure all initial providers have their distinct new profile photo synced
      return parsed.map(p => {
        const matchingInit = initialProviders.find(ip => ip.id === p.id);
        if (matchingInit) {
          return { ...p, avatar: matchingInit.avatar };
        }
        return p;
      });
    } catch {
      return initialProviders;
    }
  });

  // Service requests
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      return saved ? JSON.parse(saved) : defaultSampleRequests;
    } catch {
      return defaultSampleRequests;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Active search / filter location
  const [userLocation, setUserLocation] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCATION);
      return saved ? JSON.parse(saved) : {
        district: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        area: "Baneshwor"
      };
    } catch {
      return {
        district: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        area: "Baneshwor"
      };
    }
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
    } catch (e) {
      console.error(e);
    }
  }, [providers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    } catch (e) {
      console.error(e);
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(userLocation));
    } catch (e) {
      console.error(e);
    }
  }, [userLocation]);

  // Actions
  const loginUser = (userData) => {
    setUser(userData);
    showToast(`Logged in as ${userData.name}`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast("Signed out successfully", "info");
  };

  const switchRole = (targetRole) => {
    if (targetRole === 'provider') {
      const providerUser = {
        id: "p1",
        name: "Ram Krishna Shrestha",
        businessName: "Ram Electrical",
        email: "ram.electrical.ktm@gmail.com",
        phone: "+977 9841-238910",
        role: "provider",
        providerId: "p1",
        category: "Electrician",
        district: "Kathmandu",
        municipality: "Kathmandu Metropolitan City",
        area: "Baneshwor"
      };
      setUser(providerUser);
      showToast("Switched to Provider mode: Ram Electrical");
    } else {
      setUser(defaultCustomerUser);
      showToast("Switched to Customer mode: Aayush Sharma");
    }
  };

  const addRequest = (newReq) => {
    const id = "req-" + (Date.now().toString().slice(-4));
    const fullRequest = {
      id,
      createdAt: new Date().toISOString(),
      status: "Pending",
      hasReview: false,
      customerId: user?.id || "guest",
      customerName: user?.name || newReq.customerName || "Customer",
      customerPhone: user?.phone || newReq.customerPhone || "+977 9841-000000",
      ...newReq
    };
    setRequests(prev => [fullRequest, ...prev]);
    showToast("Service request submitted successfully! Providers will respond shortly.");
    return fullRequest;
  };

  const updateRequestStatus = (requestId, newStatus) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return { ...r, status: newStatus };
      }
      return r;
    }));
    showToast(`Job status updated to "${newStatus}"`);
  };

  const cancelRequest = (requestId) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return { ...r, status: "Cancelled" };
      }
      return r;
    }));
    showToast("Request cancelled", "info");
  };

  const addReview = ({ providerId, requestId, rating, comment }) => {
    const newRev = {
      id: "rev-" + Date.now(),
      providerId,
      customerName: user?.name || "Verified Customer",
      location: `${user?.area || 'Baneshwor'}, ${user?.district || 'Kathmandu'}`,
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      serviceName: requests.find(r => r.id === requestId)?.serviceName || "Service Task",
      comment,
      verifiedBooking: true
    };

    setReviews(prev => [newRev, ...prev]);

    // Mark request as reviewed
    if (requestId) {
      setRequests(prev => prev.map(r => r.id === requestId ? { ...r, hasReview: true } : r));
    }

    // Recalculate provider rating
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        const allProviderReviews = [...reviews.filter(r => r.providerId === providerId), newRev];
        const avg = allProviderReviews.reduce((sum, r) => sum + r.rating, 0) / allProviderReviews.length;
        return {
          ...p,
          rating: Number(avg.toFixed(2)),
          reviewsCount: p.reviewsCount + 1
        };
      }
      return p;
    }));

    showToast("Thank you for your feedback! Review published.");
  };

  const registerProvider = (providerData) => {
    const newId = "p" + (providers.length + 1);
    const newProvider = {
      id: newId,
      name: providerData.name,
      category: providerData.category,
      categoryId: providerData.categoryId || "home-maintenance",
      tagline: providerData.tagline || `${providerData.category} Specialist in ${providerData.area}`,
      district: providerData.district,
      municipality: providerData.municipality,
      area: providerData.area,
      serviceRadius: Number(providerData.serviceRadius) || 8,
      rating: 5.0,
      reviewsCount: 1,
      experience: providerData.experience || "3+ Years",
      startingPrice: Number(providerData.startingPrice) || 400,
      verified: true,
      availableNow: true,
      responseTime: "~20 min",
      phone: providerData.phone,
      email: providerData.email,
      avatar: "/src/assets/images/nepal_provider_avatar_1791167471544.jpg",
      completedJobs: 1,
      bio: providerData.bio || "Professional service provider dedicated to quality and customer satisfaction.",
      services: providerData.services && providerData.services.length > 0 ? providerData.services : [
        { name: "Standard Diagnostic & Visit", price: Number(providerData.startingPrice) || 400 },
        { name: "General Service / Repair", price: (Number(providerData.startingPrice) || 400) + 300 }
      ]
    };

    setProviders(prev => [newProvider, ...prev]);

    // Switch user to this new provider
    const newProviderUser = {
      id: newId,
      name: providerData.name,
      businessName: providerData.name,
      email: providerData.email,
      phone: providerData.phone,
      role: "provider",
      providerId: newId,
      category: providerData.category,
      district: providerData.district,
      municipality: providerData.municipality,
      area: providerData.area
    };
    setUser(newProviderUser);
    showToast("Congratulations! Your provider profile is active on Local Sewa.");
    return newProvider;
  };

  return (
    <AppContext.Provider value={{
      user,
      providers,
      requests,
      reviews,
      userLocation,
      setUserLocation,
      loginUser,
      logoutUser,
      switchRole,
      addRequest,
      updateRequestStatus,
      cancelRequest,
      addReview,
      registerProvider,
      showToast
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl bg-slate-900 text-white text-sm font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className={`w-2 h-2 rounded-full ${toast.type === 'info' ? 'bg-sky-400' : 'bg-emerald-400'}`} />
          <span>{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-3 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

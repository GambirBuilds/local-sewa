import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { serviceCategories } from '../data/services.js';
import LocationSelector from './LocationSelector.jsx';
import Button from './Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function RequestForm({ 
  preselectedProvider = null, 
  preselectedCategory = '', 
  onSuccess,
  onCancel 
}) {
  const navigate = useNavigate();
  const { user, userLocation, addRequest } = useApp();

  const [category, setCategory] = useState(
    preselectedProvider?.categoryId || preselectedCategory || 'electrician'
  );
  const [selectedService, setSelectedService] = useState(
    preselectedProvider?.services?.[0]?.name || ''
  );
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00 AM');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+977 98');
  const [address, setAddress] = useState(user?.address || '');
  const [location, setLocation] = useState({
    district: userLocation.district || 'Kathmandu',
    municipality: userLocation.municipality || 'Kathmandu Metropolitan City',
    area: userLocation.area || 'Baneshwor'
  });
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const activeCategoryObj = serviceCategories.find(c => c.id === category) || serviceCategories[0];
  const servicesList = preselectedProvider?.services 
    ? preselectedProvider.services.map(s => s.name)
    : activeCategoryObj.popularTasks;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please describe your problem or requirements.");
      return;
    }
    if (!phone || phone.length < 10) {
      alert("Please provide a valid Nepali contact phone number.");
      return;
    }

    setIsSubmitting(true);

    const estStarting = preselectedProvider ? preselectedProvider.startingPrice : activeCategoryObj.startingPrice;
    const estPrice = `Rs. ${estStarting} - Rs. ${estStarting * 2.5}`;

    setTimeout(() => {
      const created = addRequest({
        providerId: preselectedProvider ? preselectedProvider.id : 'open',
        providerName: preselectedProvider ? preselectedProvider.name : 'Open Request (Assigned by Area)',
        category: activeCategoryObj.name,
        serviceName: selectedService || activeCategoryObj.popularTasks[0],
        problemDescription: description,
        preferredDate: date,
        preferredTime: time,
        customerName: customerName || user?.name || "Customer",
        customerPhone: phone,
        district: location.district,
        municipality: location.municipality,
        area: location.area,
        address: address || `${location.area}, ${location.district}`,
        additionalNotes: notes,
        estimatedPrice: estPrice
      });

      setIsSubmitting(false);
      setSubmittedRequest(created);

      if (onSuccess) {
        onSuccess(created);
      }
    }, 400);
  };

  if (submittedRequest) {
    return (
      <div className="text-center py-8 px-4 max-w-lg mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">
          Service Request Submitted!
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Booking Reference: <span className="font-mono font-semibold text-slate-800">{submittedRequest.id}</span>
        </p>

        <div className="bg-slate-50 rounded-xl p-4 text-left text-xs space-y-2 mb-6 border border-slate-200/70">
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-slate-800">{submittedRequest.serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Provider:</span>
            <span className="font-semibold text-slate-800">{submittedRequest.providerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Scheduled:</span>
            <span className="font-semibold text-slate-800">{submittedRequest.preferredDate} at {submittedRequest.preferredTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Location:</span>
            <span className="font-semibold text-slate-800 truncate max-w-[200px]">{submittedRequest.area}, {submittedRequest.district}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200">
            <span className="text-slate-500">Estimated Price:</span>
            <span className="font-bold text-red-700">{submittedRequest.estimatedPrice}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          The technician will contact you on <strong className="text-slate-800">{submittedRequest.customerPhone}</strong> to confirm the exact arrival time.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/dashboard')}
          >
            Track in My Requests
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/providers')}
          >
            Browse More Providers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Target Provider Banner if preselected */}
      {preselectedProvider && (
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {preselectedProvider.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {preselectedProvider.name}
                </h4>
                {preselectedProvider.verified && (
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500">
                {preselectedProvider.category} · 📍 {preselectedProvider.area} · Responds {preselectedProvider.responseTime}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-400 block">Starting</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">Rs. {preselectedProvider.startingPrice}</span>
          </div>
        </div>
      )}

      {/* Category & Specific Task */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!preselectedProvider && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Service Category <span className="text-red-600">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                const newCat = serviceCategories.find(c => c.id === e.target.value);
                if (newCat && newCat.popularTasks[0]) {
                  setSelectedService(newCat.popularTasks[0]);
                }
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
              required
            >
              {serviceCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className={preselectedProvider ? "sm:col-span-2" : ""}>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Specific Service / Task
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
          >
            {servicesList.map((task, idx) => (
              <option key={idx} value={typeof task === 'string' ? task : task.name}>
                {typeof task === 'string' ? task : `${task.name} (Rs. ${task.price}+)`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problem Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Describe the problem or requirement <span className="text-red-600">*</span>
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g., Living room ceiling fan is making clicking noise and not turning on. Need urgent inspection."
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 placeholder:text-slate-400"
          required
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Preferred Date <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Preferred Time <span className="text-red-600">*</span>
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
            required
          >
            <option value="08:00 AM">Morning (08:00 AM - 10:00 AM)</option>
            <option value="10:00 AM">Late Morning (10:00 AM - 12:00 PM)</option>
            <option value="01:00 PM">Early Afternoon (01:00 PM - 03:00 PM)</option>
            <option value="03:30 PM">Late Afternoon (03:30 PM - 05:30 PM)</option>
            <option value="06:00 PM">Evening (06:00 PM - 08:00 PM)</option>
            <option value="Immediate">Urgent / As soon as possible</option>
          </select>
        </div>
      </div>

      {/* Service Location in Kathmandu Valley */}
      <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-3">
          <MapPin className="w-4 h-4 text-red-700" />
          <span>Service Location (Kathmandu Valley)</span>
        </div>

        <LocationSelector
          value={location}
          onChange={setLocation}
          layout="horizontal"
          showProvince={false}
        />

        <div className="mt-3">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Exact Street / House / Landmark Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="E.g., Near Apex College, House No. 42, 2nd Floor"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
          />
        </div>
      </div>

      {/* Customer Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Your Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Aayush Sharma"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Contact Number <span className="text-red-600">*</span>
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

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Additional Notes / Special Instructions (Optional)
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g., Please bring a tall ladder / Ring the red bell"
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
        />
      </div>

      {/* Price Estimate Notice */}
      <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-900 block">
            Estimated Service Price:
          </span>
          <span className="text-xs text-amber-700">
            Based on standard Valley rates (Parts billed separately on actuals)
          </span>
        </div>
        <div className="text-base font-extrabold text-slate-900 tabular-nums shrink-0">
          Rs. {preselectedProvider ? preselectedProvider.startingPrice : activeCategoryObj.startingPrice} – Rs. {(preselectedProvider ? preselectedProvider.startingPrice : activeCategoryObj.startingPrice) * 2.5}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="min-w-[160px]"
        >
          {isSubmitting ? "Submitting..." : "Submit Service Request"}
        </Button>
      </div>
    </form>
  );
}

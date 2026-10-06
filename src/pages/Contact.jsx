import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Contact() {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) {
      alert("Please provide your name and message.");
      return;
    }
    setSubmitted(true);
    showToast("Message received! Our Kathmandu support team will respond shortly.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-2">
          Contact & Help Center
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Have questions about booking a service, onboarding as a provider, or feedback on a completed job? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Col */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Kathmandu Operations Office</h3>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Local Sewa Nepal Pvt. Ltd.</strong>
                  <span>Opposite Civil Bank, New Baneshwor, Kathmandu 44600, Nepal</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-700 shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-900">+977 1-4782910</span>
                  <span className="text-slate-400">Toll-free / Hotline (8 AM – 8 PM)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-700 shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-900">support@localsewa.com.np</span>
                  <span className="text-slate-400">Response within 2 hours</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-red-700 shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-900">Emergency Support</span>
                  <span className="text-slate-400">Available 24/7 for urgent lockouts & electrical shorts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Thank you, {name}!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We have received your message. A Local Sewa customer support specialist will reach out to you at {phone || 'your contact details'}.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-2">Send Us a Direct Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Bikash Thapa"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 9841-XXXXXX"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Booking Assistance">Booking Assistance</option>
                  <option value="Provider Partnership">Provider Partnership / Onboarding</option>
                  <option value="Service Quality Complaint">Service Quality Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you?"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                  required
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md">
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

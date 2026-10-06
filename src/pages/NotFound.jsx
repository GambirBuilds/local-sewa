import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button.jsx';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-red-50 text-red-700 flex items-center justify-center mb-4 border border-red-200">
        <SearchX className="w-8 h-8" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 max-w-md mb-8">
        We couldn't find the page or service category you're looking for. It might have moved or the URL may be incorrect.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/">
          <Button variant="primary" size="md">
            <Home className="w-4 h-4 mr-1.5" />
            Back to Homepage
          </Button>
        </Link>
        <Link to="/providers">
          <Button variant="outline" size="md">
            Browse All Providers
          </Button>
        </Link>
      </div>
    </div>
  );
}

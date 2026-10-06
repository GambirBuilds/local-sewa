import React from 'react';
import { CheckCircle2, MapPin } from 'lucide-react';
import Rating from './Rating.jsx';

export default function ReviewCard({ review }) {
  return (
    <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900">{review.customerName}</h4>
            {review.verifiedBooking && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Service
              </span>
            )}
          </div>
          {review.location && (
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {review.location}
            </p>
          )}
        </div>

        <span className="text-xs text-slate-400 tabular-nums">
          {review.date}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Rating value={review.rating} size="sm" showValue={false} />
        {review.serviceName && (
          <span className="text-xs text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
            {review.serviceName}
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        "{review.comment}"
      </p>
    </div>
  );
}

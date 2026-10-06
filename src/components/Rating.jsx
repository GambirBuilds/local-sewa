import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({
  value = 5,
  count,
  size = 'md', // 'sm', 'md', 'lg'
  interactive = false,
  onChange,
  showValue = true,
  className = ''
}) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-semibold"
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.round(value);
          return (
            <button
              key={star}
              type={interactive ? "button" : undefined}
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(star)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default pointer-events-none'} focus:outline-none`}
              aria-label={`${star} star`}
            >
              <Star
                className={`${iconSizes[size] || iconSizes.md} ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-100 text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className={`font-semibold text-slate-800 tabular-nums ${textSizes[size] || textSizes.md}`}>
          {Number(value).toFixed(1)}
        </span>
      )}

      {count !== undefined && (
        <span className="text-xs text-slate-500 font-normal">
          ({count} reviews)
        </span>
      )}
    </div>
  );
}

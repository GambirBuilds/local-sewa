import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2";
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5"
  };

  const variantClasses = {
    primary: "bg-red-700 text-white hover:bg-red-800 shadow-sm focus-visible:outline-red-700 active:translate-y-px",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm focus-visible:outline-slate-900 active:translate-y-px",
    outline: "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-slate-600",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-400",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus-visible:outline-rose-600",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

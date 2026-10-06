import React from 'react';
import { Clock, CheckCircle2, Navigation, AlertCircle, XCircle, Wrench } from 'lucide-react';

export default function StatusBadge({ status, className = '' }) {
  const getStatusConfig = (s) => {
    switch (s) {
      case 'Pending':
        return {
          icon: Clock,
          classes: 'bg-amber-50 text-amber-800 border-amber-200',
          label: 'Pending Confirmation'
        };
      case 'Accepted':
        return {
          icon: CheckCircle2,
          classes: 'bg-sky-50 text-sky-800 border-sky-200',
          label: 'Accepted'
        };
      case 'On the Way':
        return {
          icon: Navigation,
          classes: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          label: 'On the Way'
        };
      case 'In Progress':
        return {
          icon: Wrench,
          classes: 'bg-purple-50 text-purple-800 border-purple-200',
          label: 'In Progress'
        };
      case 'Completed':
        return {
          icon: CheckCircle2,
          classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          label: 'Completed'
        };
      case 'Cancelled':
        return {
          icon: XCircle,
          classes: 'bg-rose-50 text-rose-800 border-rose-200',
          label: 'Cancelled'
        };
      default:
        return {
          icon: AlertCircle,
          classes: 'bg-slate-100 text-slate-700 border-slate-200',
          label: status
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${config.classes} ${className}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}

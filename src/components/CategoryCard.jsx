import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Wrench, 
  Sparkles, 
  Hammer, 
  Paintbrush, 
  Monitor, 
  Smartphone, 
  Cpu, 
  Snowflake, 
  Cog, 
  Key, 
  Truck, 
  Flower2, 
  Shirt, 
  Home, 
  ArrowUpRight 
} from 'lucide-react';

const iconMap = {
  Zap,
  Wrench,
  Sparkles,
  Hammer,
  Paintbrush,
  Monitor,
  Smartphone,
  Cpu,
  Snowflake,
  Cog,
  Key,
  Truck,
  Flower2,
  Shirt,
  Home
};

export default function CategoryCard({ category, compact = false }) {
  const IconComponent = iconMap[category.iconName] || Wrench;

  if (compact) {
    return (
      <Link
        to={`/providers?category=${category.id}`}
        className="group flex items-center gap-3 p-3 bg-white border border-slate-200/80 rounded-xl hover:border-red-600/50 hover:shadow-sm transition-all duration-150"
      >
        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0 group-hover:bg-red-700 group-hover:text-white transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition-colors truncate">
            {category.name}
          </h4>
          <p className="text-xs text-slate-500 tabular-nums">
            {category.providersCount} providers · From Rs. {category.startingPrice}
          </p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-red-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    );
  }

  return (
    <Link
      to={`/providers?category=${category.id}`}
      className="group relative flex flex-col justify-between p-5 bg-white border border-slate-200/90 rounded-xl hover:border-red-600/60 hover:shadow-md transition-all duration-200"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-red-700 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors duration-200">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-slate-400 group-hover:text-red-700 transition-colors flex items-center gap-1">
            Browse
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors mb-0.5">
          {category.name}
        </h3>
        {category.nepaliName && (
          <p className="text-xs text-slate-400 mb-2 font-normal">
            {category.nepaliName}
          </p>
        )}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-700 tabular-nums">
          {category.providersCount} Providers
        </span>
        <span className="text-slate-900 font-semibold tabular-nums">
          Rs. {category.startingPrice}+
        </span>
      </div>
    </Link>
  );
}

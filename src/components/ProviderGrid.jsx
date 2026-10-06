import React from 'react';
import ProviderCard from './ProviderCard.jsx';
import EmptyState from './EmptyState.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function ProviderGrid({
  providers = [],
  loading = false,
  onRequestClick,
  emptyTitle,
  emptyDescription,
  onResetFilters
}) {
  if (loading) {
    return <LoadingSpinner text="Searching verified local providers in your area..." />;
  }

  if (!providers || providers.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || "No service providers found"}
        description={emptyDescription || "No professionals matched your selected filters or location. Try expanding your search area or clearing category filters."}
        actionLabel={onResetFilters ? "Reset Filters" : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          onRequestClick={onRequestClick}
        />
      ))}
    </div>
  );
}

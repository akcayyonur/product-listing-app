'use client';

import { useState } from 'react';
import { ProductFilters } from '@/types/product';

interface Props {
  onFiltersChange: (filters: ProductFilters) => void;
  isLoading: boolean;
}

export default function FilterComponent({ onFiltersChange, isLoading }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [minPopularity, setMinPopularity] = useState<number | ''>('');
  const [maxPopularity, setMaxPopularity] = useState<number | ''>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const handleApplyFilters = () => {
    const filters: ProductFilters = {};

    if (minPopularity !== '') filters.minPopularity = Number(minPopularity);
    if (maxPopularity !== '') filters.maxPopularity = Number(maxPopularity);
    if (minPrice !== '') filters.minPrice = Number(minPrice);
    if (maxPrice !== '') filters.maxPrice = Number(maxPrice);

    onFiltersChange(filters);
    setShowFilters(false);
  };

  return (
    <div className="w-full mb-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 rounded-md shadow-sm text-sm"
      >
        {showFilters ? 'Filtreyi Gizle' : 'Filtrele'}
      </button>

      {showFilters && (
        <div className="mt-3 bg-gray-50 p-4 rounded-md shadow-sm w-fit">
          {/* Rating */}
          <div className="flex gap-6 mb-3">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Min Rating (0–5)</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={minPopularity}
                onChange={(e) => setMinPopularity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-32 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Max Rating (0–5)</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={maxPopularity}
                onChange={(e) => setMaxPopularity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-32 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex gap-6 mb-3">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-32 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-32 border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm disabled:opacity-50"
            >
              Uygula
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

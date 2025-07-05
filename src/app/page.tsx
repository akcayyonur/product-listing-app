// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/types/product';
import ProductCarousel from '@/components/ProductCarousel';
import FilterComponent from '@/components/FilterComponent';
import LoadingComponent, { CarouselSkeleton } from '@/components/LoadingComponent';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({});

  const fetchProducts = async (currentFilters: ProductFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (currentFilters.minPrice) params.append('minPrice', currentFilters.minPrice.toString());
      if (currentFilters.maxPrice) params.append('maxPrice', currentFilters.maxPrice.toString());
      if (currentFilters.minPopularity) params.append('minPopularity', currentFilters.minPopularity.toString());
      if (currentFilters.maxPopularity) params.append('maxPopularity', currentFilters.maxPopularity.toString());

      const response = await fetch(`/api/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => fetchProducts(filters)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Much more compact */}
        <div className="text-center py-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Discover Our Golden Collection
          </h1>
        </div>

        {/* Filters and Product Count - More compact */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
            {!loading && (
              <>
                <span className="font-medium">{products.length}</span> {products.length === 1 ? 'product' : 'products'} found
              </>
            )}
          </div>
          
          <FilterComponent 
            onFiltersChange={handleFiltersChange}
            isLoading={loading}
          />
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          {loading ? (
            <CarouselSkeleton />
          ) : products.length > 0 ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Featured Products
                </h2>
              </div>
              <div className="max-w-6xl mx-auto">
                <ProductCarousel products={products} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more products.
              </p>
              <button
                onClick={() => handleFiltersChange({})}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
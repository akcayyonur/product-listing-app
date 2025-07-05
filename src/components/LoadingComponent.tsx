// src/components/LoadingComponent.tsx
import { Loader2 } from 'lucide-react';

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <p className="text-gray-600">Loading products...</p>
    </div>
  );
};

export default LoadingComponent;

// Product Card Skeleton for better loading experience
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        
        {/* Price Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
        
        {/* Rating Skeleton */}
        <div className="flex items-center mb-3">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="ml-2 h-4 bg-gray-200 rounded w-8"></div>
        </div>
        
        {/* Color Options Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* Weight Skeleton */}
        <div className="mt-3 h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

// Carousel Skeleton
export const CarouselSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
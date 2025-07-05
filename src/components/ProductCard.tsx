// src/components/ProductCard.tsx
'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice, convertPopularityToScore } from '@/lib/utils';
import { Star } from 'lucide-react';
import PlaceholderImage from './PlaceholderImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<keyof typeof product.images>('yellow');
  const [imageError, setImageError] = useState(false);
  
  const currentImageUrl = product.images[selectedColor];
  const popularityScore = convertPopularityToScore(product.popularityScore);

  const colorStyles = {
    yellow: { backgroundColor: '#E6CA97', borderColor: '#D4B876' },
    white: { backgroundColor: '#D9D9D9', borderColor: '#C0C0C0' },
    rose: { backgroundColor: '#E1A4A9', borderColor: '#D18A90' },
  };

  const colorLabels = {
    yellow: 'Yellow Gold',
    white: 'White Gold',
    rose: 'Rose Gold',
  };

  const handleColorChange = (color: keyof typeof product.images) => {
    setSelectedColor(color);
    setImageError(false);
  };

  const availableColors = Object.keys(product.images) as Array<keyof typeof product.images>;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 w-full max-w-[280px] mx-auto">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-50">
        {imageError ? (
          <PlaceholderImage 
            productName={product.name}
            color={selectedColor}
            className="w-full h-full"
          />
        ) : (
          <img
            src={currentImageUrl}
            alt={`${product.name} in ${colorLabels[selectedColor]}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        )}
      </div>

      {/* Product Details - Reordered layout */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-base font-medium text-gray-900 mb-6 text-center line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-lg font-semibold text-gray-900 mb-8 text-center">
          {formatPrice(product.price || 0)}
        </div>

        {/* Color Picker - Circles first */}
        <div className="mb-6">
          <div className="flex justify-center space-x-6 py-4 mb-4">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                style={colorStyles[color]}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color
                    ? 'ring-2 ring-gray-400 ring-offset-2 scale-110'
                    : 'hover:scale-105'
                }`}
                title={colorLabels[color]}
                aria-label={`Select ${colorLabels[color]} variant`}
              />
            ))}
          </div>
          {/* Color text */}
          <p className="text-center text-sm text-gray-600 mb-8">
            {colorLabels[selectedColor]}
          </p>
        </div>

        {/* Popularity Score - Now at bottom */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(popularityScore)
                    ? 'text-yellow-400 fill-current'
                    : i < popularityScore
                    ? 'text-yellow-400 fill-current opacity-50'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-3 text-sm text-gray-600">
            {popularityScore.toFixed(1)}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
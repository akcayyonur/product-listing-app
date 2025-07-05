// src/components/SimpleProductCard.tsx
'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice, convertPopularityToScore } from '@/lib/utils';
import { Star } from 'lucide-react';
import PlaceholderImage from './PlaceholderImage';

interface SimpleProductCardProps {
  product: Product;
}

const SimpleProductCard = ({ product }: SimpleProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<keyof typeof product.images>('yellow');
  const [imageError, setImageError] = useState(false);
  
  const currentImageUrl = product.images[selectedColor];
  const popularityScore = convertPopularityToScore(product.popularityScore);

  const colorMap = {
    yellow: 'bg-yellow-400',
    white: 'bg-gray-100',
    rose: 'bg-pink-300',
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-64 bg-gray-100">
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

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {formatPrice(product.price || 0)}
        </div>

        {/* Popularity Score */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
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
          <span className="ml-2 text-sm text-gray-600">
            {popularityScore.toFixed(1)}
          </span>
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Color:</p>
          <div className="flex space-x-2">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? 'border-gray-800 ring-2 ring-gray-300'
                    : 'border-gray-300 hover:border-gray-400'
                } ${colorMap[color] || 'bg-gray-400'}`}
                title={colorLabels[color]}
                aria-label={`Select ${colorLabels[color]} variant`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">
            {colorLabels[selectedColor]}
          </p>
        </div>

        {/* Product Weight */}
        <div className="mt-3 text-sm text-gray-600">
          Weight: {product.weight}g
        </div>
      </div>
    </div>
  );
};

export default SimpleProductCard;
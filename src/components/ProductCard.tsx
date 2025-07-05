'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice, convertPopularityToScore } from '@/lib/utils';
import PlaceholderImage from './PlaceholderImage';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<keyof typeof product.images>('yellow');
  const [imageError, setImageError] = useState(false);

  const currentImageUrl = product.images?.[selectedColor];
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

  const availableColors = Object.keys(product.images || {}) as Array<keyof typeof product.images>;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 w-full max-w-[280px] mx-auto">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-50">
        {!currentImageUrl || imageError ? (
          <PlaceholderImage
            productName={product.name}
            color={selectedColor}
            className="absolute inset-0"
          />
        ) : (
          <img
            src={currentImageUrl}
            alt={`${product.name} in ${colorLabels[selectedColor]}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-base font-medium text-gray-900 mb-6 text-center line-clamp-2">
          {product.name}
        </h3>

        <div className="text-lg font-semibold text-gray-900 mb-8 text-center">
          {formatPrice(product.price || 0)}
        </div>

        {/* Color Picker */}
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
          <p className="text-center text-sm text-gray-600 mb-8">
            {colorLabels[selectedColor]}
          </p>
        </div>

        {/* Star Rating */}
        <StarRating score={popularityScore} />
      </div>
    </div>
  );
};

export default ProductCard;

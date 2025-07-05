'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  score: number;
}

const StarRating = ({ score }: StarRatingProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(score)
                ? 'text-yellow-400 fill-current'
                : i < score
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="ml-3 text-sm text-gray-600">
        {score.toFixed(1)}/5
      </span>
    </div>
  );
};

export default StarRating;

// src/components/PlaceholderImage.tsx
interface PlaceholderImageProps {
  productName: string;
  color: string;
  className?: string;
}

const PlaceholderImage = ({ productName, color, className = "" }: PlaceholderImageProps) => {
  const colorStyles = {
    yellow: 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400',
    white: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200',
    rose: 'bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400',
  };

  const colorStyle = colorStyles[color as keyof typeof colorStyles] || 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400';

  // Create initials from product name
  const initials = productName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 3);

  return (
    <div className={`${colorStyle} flex flex-col items-center justify-center ${className} relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-2 w-4 h-4 border border-white rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="text-center z-10 p-4">
        <div className="text-white text-3xl font-bold mb-2 drop-shadow-sm">
          {initials}
        </div>
        <div className="text-white text-sm font-medium capitalize drop-shadow-sm">
          {color} Gold
        </div>
        <div className="text-white text-xs mt-1 opacity-90">
          Jewelry
        </div>
      </div>
    </div>
  );
};

export default PlaceholderImage;
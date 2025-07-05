// src/components/ProductCarousel.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  return (
    <div className="relative px-8">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={32} // Increased spacing between slides
        slidesPerView={1} // Start with 1 on mobile
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        scrollbar={{ 
          draggable: true,
          hide: false,
        }}
        breakpoints={{
          480: {
            slidesPerView: 1.5, // Show 1.5 cards with preview
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2.2, // Show 2+ cards with preview
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3.2, // Show 3+ cards with preview
            spaceBetween: 28,
          },
          1024: {
            slidesPerView: 4, // Show exactly 4 cards on desktop (like your design)
            spaceBetween: 32,
          },
          1280: {
            slidesPerView: 4.2, // Show 4+ cards with slight preview
            spaceBetween: 36,
          },
          1536: {
            slidesPerView: 5, // Show 5 cards on very large screens
            spaceBetween: 40,
          },
        }}
        className="!pb-20 !pt-4" // More bottom padding for pagination
        style={{ 
          height: 'auto',
          overflow: 'visible' // Allow cards to show outside bounds
        }}
        centeredSlides={false}
        loop={products.length > 3} // Enable loop only if more than 3 products
        watchOverflow={true} // Disable navigation if not needed
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${product.name}-${index}`} className="!h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Better positioned */}
      <button
        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:shadow-xl border border-gray-100"
        aria-label="Previous products"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      
      <button
        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:shadow-xl border border-gray-100"
        aria-label="Next products"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default ProductCarousel;
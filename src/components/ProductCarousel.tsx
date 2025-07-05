'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

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
        spaceBetween={32}
        slidesPerView={1}
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
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 28,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
          1280: {
            slidesPerView: 4.2,
            spaceBetween: 36,
          },
          1536: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        className="!pb-20 !pt-4"
        style={{
          height: 'auto',
          overflow: 'visible',
        }}
        centeredSlides={false}
        loop={products.length > 3}
        watchOverflow={true}
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${product.name}-${index}`} className="!h-auto">
            <ProductCard product={product} priority={index < 4} />
          </SwiperSlide>
        ))}
      </Swiper>

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

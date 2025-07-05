'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  return (
    <div className="relative px-6">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={products.length > 4}
        className="!pb-10"
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${product.name}-${index}`} className="!h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCarousel;

// src/types/product.ts
export interface ProductImages {
  yellow: string;
  rose: string;
  white: string;
}

export interface Product {
  name: string;
  popularityScore: number; // 0-1 decimal
  weight: number; // in grams
  images: ProductImages;
  price?: number; // calculated dynamically
}

export interface ProductResponse {
  products: Product[];
  totalCount: number;
}

export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}

export interface GoldPriceResponse {
  price: number;
  currency: string;
  timestamp: number;
}
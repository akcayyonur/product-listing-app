import { Product, GoldPriceResponse } from '@/types/product';

let goldPriceCache: { price: number; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000;

export async function getGoldPrice(): Promise<number> {
  if (goldPriceCache && Date.now() - goldPriceCache.timestamp < CACHE_DURATION) {
    return goldPriceCache.price;
  }

  try {
    const response = await fetch('https://api.metals.live/v1/spot/gold');
    const data = await response.json();
    const pricePerGram = data.price / 31.1035;

    goldPriceCache = {
      price: pricePerGram,
      timestamp: Date.now(),
    };

    return pricePerGram;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return 65; // fallback price
  }
}

export function calculatePrice(popularityScore: number, weight: number, goldPrice: number): number {
  const price = (popularityScore + 1) * weight * goldPrice;
  return Math.round(price * 100) / 100;
}

export function convertPopularityToScore(popularityScore: number): number {
  const score = popularityScore * 5;
  return Math.round(score * 10) / 10;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function filterProducts(
  products: Product[],
  filters: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number; // 0–5
    maxPopularity?: number; // 0–5
  }
): Product[] {
  return products.filter(product => {
    const minP = filters.minPopularity !== undefined ? filters.minPopularity / 5 : undefined;
    const maxP = filters.maxPopularity !== undefined ? filters.maxPopularity / 5 : undefined;

    if (filters.minPrice !== undefined && product.price! < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.price! > filters.maxPrice) return false;
    if (minP !== undefined && product.popularityScore < minP) return false;
    if (maxP !== undefined && product.popularityScore > maxP) return false;

    return true;
  });
}

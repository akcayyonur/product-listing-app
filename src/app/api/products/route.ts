import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Product, ProductResponse } from '@/types/product';
import { getGoldPrice, calculatePrice, filterProducts } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    // Read product data from local JSON
    const filePath = join(process.cwd(), 'data', 'products.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const productsArray = JSON.parse(fileContents);

    // Get current gold price (cached if possible)
    const goldPrice = await getGoldPrice();

    // Add calculated price and ID to each product
    const productsWithPrices: Product[] = productsArray.map((product: Product, index: number) => ({
      ...product,
      id: `product-${index + 1}`,
      price: calculatePrice(product.popularityScore * 100, product.weight, goldPrice),
    }));

    // Extract filter parameters from query string
    const { searchParams } = new URL(request.url);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minPopularity = searchParams.get('minPopularity');
    const maxPopularity = searchParams.get('maxPopularity');

    // Convert filter values to numbers (popularity stays 0–5 scale)
    const filters = {
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minPopularity: minPopularity ? parseFloat(minPopularity) : undefined,
      maxPopularity: maxPopularity ? parseFloat(maxPopularity) : undefined,
    };

    // Filter products
    const filteredProducts = filterProducts(productsWithPrices, filters);

    const response: ProductResponse = {
      products: filteredProducts,
      totalCount: filteredProducts.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Optional CORS support
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

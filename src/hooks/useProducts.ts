import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';

export function useProducts(first: number = 20, query?: string) {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['products', first, query],
    queryFn: () => fetchProducts(first, query),
  });
}

export function useProductByHandle(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle),
    enabled: !!handle,
  });
}

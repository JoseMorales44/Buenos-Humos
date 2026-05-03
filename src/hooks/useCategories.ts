import { useQuery } from '@tanstack/react-query'

import { CATEGORIES, type Category } from '../data/categories'
import { normalizeWpToCategories, normalizeWpToProducts, type FlatProduct, type WpProduct } from '../lib/wpCatalog'

const WP_PRODUCTS_URL = '/wp-api/wp/v2/products?_embed&per_page=100&acf_format=standard'

async function fetchProductsRaw(): Promise<WpProduct[]> {
  const res = await fetch(WP_PRODUCTS_URL, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`wp_products_${res.status}`)
  return (await res.json()) as WpProduct[]
}

async function fetchCategories(): Promise<Category[]> {
  const products = await fetchProductsRaw()
  const categories = normalizeWpToCategories(products)
  if (categories.length === 0) throw new Error('wp_products_empty')
  return categories
}

async function fetchProducts(): Promise<FlatProduct[]> {
  const products = await fetchProductsRaw()
  const flat = normalizeWpToProducts(products)
  if (flat.length === 0) throw new Error('wp_products_empty')
  return flat
}

export function useCategories() {
  return useQuery({
    queryKey: ['catalog', 'categories'],
    queryFn: fetchCategories,
    placeholderData: CATEGORIES,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}

export function useProducts() {
  return useQuery({
    queryKey: ['catalog', 'products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}

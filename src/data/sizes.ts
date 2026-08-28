import { ProductCategory, ProductSize } from '@/types'

export const BASE_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ÚNICA']

// Tallas adicionales según la categoría (p. ej. tallas de cintura para jeans).
const EXTRA_SIZES_BY_CATEGORY: Partial<Record<ProductCategory, ProductSize[]>> = {
  jeans: ['30', '32', '34', '36'],
}

export const getSizesForCategory = (category: ProductCategory): ProductSize[] => [
  ...BASE_SIZES,
  ...(EXTRA_SIZES_BY_CATEGORY[category] ?? []),
]

export const ALL_SIZES: ProductSize[] = [
  ...BASE_SIZES,
  ...Object.values(EXTRA_SIZES_BY_CATEGORY).flat(),
]

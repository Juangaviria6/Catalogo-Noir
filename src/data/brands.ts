import { ProductCategory } from '@/types'

// Marcas disponibles por categoría de prenda. Las categorías que no
// aparecen aquí no tienen selector de marca en el formulario de Admin.
export const BRANDS_BY_CATEGORY: Partial<Record<ProductCategory, string[]>> = {
  camisas: ['Clemont', 'Undergold', 'Y/Out', 'Monastery'],
  gorras: ['Clemont', 'Undergold', 'Y/Out', 'Monastery', 'New Era', 'Goorin Bros', 'Hugo Boss', 'Jordan'],
}

export const getBrandsForCategory = (category: ProductCategory): string[] =>
  BRANDS_BY_CATEGORY[category] ?? []

export const ALL_BRANDS: string[] = Array.from(
  new Set(Object.values(BRANDS_BY_CATEGORY).flat())
).sort()

export type ProductCategory = 'gorras' | 'buzos' | 'camisas' | 'jeans'

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'ÚNICA' | '30' | '32' | '34' | '36'

export interface ProductColor {
  name: string
  hex: string
  images: string[]
  sizes?: ProductSize[]
}

export interface Product {
  id: string
  name: string
  price: number
  category: ProductCategory
  images: string[]
  description: string
  sizes: ProductSize[]
  featured: boolean
  badge?: string
  sku?: string
  brand?: string
  colors?: ProductColor[]
}

export interface Category {
  id: ProductCategory
  name: string
  description: string
  image: string
  count?: number
}

export interface CartItem {
  product: Product
  size: ProductSize
  color?: string
  quantity: number
}

export interface FilterState {
  category: ProductCategory | 'all'
  brand: string | 'all'
  priceRange: [number, number]
  sizes: ProductSize[]
  search: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

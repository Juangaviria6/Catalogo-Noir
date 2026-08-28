import { useState, useMemo, useEffect } from 'react'
import { Product, FilterState, ProductCategory, ProductSize } from '@/types'
import { getSizesForCategory } from '@/data/sizes'

const DEFAULT_RANGE: [number, number] = [0, 10_000_000]

const initialFilters = (): FilterState => ({
  category: 'all',
  brand: 'all',
  priceRange: DEFAULT_RANGE,
  sizes: [],
  search: '',
})

export const useFilter = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [rangeInitialized, setRangeInitialized] = useState(false)

  // Calcula el rango real de precios de los productos cargados
  const productPriceRange = useMemo((): [number, number] => {
    if (!products.length) return DEFAULT_RANGE
    return [
      Math.min(...products.map(p => p.price)),
      Math.max(...products.map(p => p.price)),
    ]
  }, [products])

  // Inicializa el rango de precio con el real cuando llegan los productos
  useEffect(() => {
    if (products.length > 0 && !rangeInitialized) {
      setFilters(prev => ({ ...prev, priceRange: productPriceRange }))
      setRangeInitialized(true)
    }
  }, [products.length, productPriceRange, rangeInitialized])

  const filtered = useMemo(() => {
    return products.filter(product => {
      const matchCategory =
        filters.category === 'all' || product.category === filters.category

      const matchBrand =
        filters.brand === 'all' || product.brand === filters.brand

      const matchPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]

      const matchSize =
        filters.sizes.length === 0 ||
        filters.sizes.some(size => product.sizes.includes(size))

      const matchSearch =
        filters.search === '' ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())

      return matchCategory && matchBrand && matchPrice && matchSize && matchSearch
    })
  }, [products, filters])

  const setCategory = (category: ProductCategory | 'all') =>
    setFilters(prev => ({
      ...prev,
      category,
      brand: 'all',
      sizes: category === 'all' ? prev.sizes : prev.sizes.filter(s => getSizesForCategory(category).includes(s)),
    }))

  const setBrand = (brand: string | 'all') =>
    setFilters(prev => ({ ...prev, brand }))

  const setPriceRange = (range: [number, number]) =>
    setFilters(prev => ({ ...prev, priceRange: range }))

  const toggleSize = (size: ProductSize) =>
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }))

  const setSearch = (search: string) =>
    setFilters(prev => ({ ...prev, search }))

  const resetFilters = () => {
    setFilters({ ...initialFilters(), priceRange: productPriceRange })
  }

  return {
    filters,
    filtered,
    productPriceRange,
    setCategory,
    setBrand,
    setPriceRange,
    toggleSize,
    setSearch,
    resetFilters,
  }
}

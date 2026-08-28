import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { useFilter } from '@/hooks/useFilter'
import { useProducts } from '@/hooks/useProducts'
import { getBrandsForCategory, ALL_BRANDS } from '@/data/brands'
import { getSizesForCategory, ALL_SIZES } from '@/data/sizes'
import { formatPrice } from '@/utils'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/products/ProductCard'
import Button from '@/components/ui/Button'
import { ProductCategory, ProductSize } from '@/types'
import { useState } from 'react'

const CATEGORIES: Array<{ value: ProductCategory | 'all'; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'gorras', label: 'Gorras' },
  { value: 'conjuntos', label: 'Conjuntos' },
  { value: 'camisas', label: 'Camisas' },
  { value: 'jeans', label: 'Jeans' },
]

const SkeletonCard = () => (
  <div className="bg-noir-dark animate-pulse">
    <div className="aspect-[3/4] bg-noir-mid" />
    <div className="p-4 space-y-2">
      <div className="h-2 bg-noir-mid rounded w-1/3" />
      <div className="h-3 bg-noir-mid rounded w-2/3" />
      <div className="h-3 bg-noir-mid rounded w-1/4 mt-3" />
    </div>
  </div>
)

const CatalogPage = () => {
  const [searchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const { data: products, loading, error } = useProducts()
  const { filters, filtered, productPriceRange, setCategory, setBrand, setPriceRange, toggleSize, setSearch, resetFilters } =
    useFilter(products)

  const availableBrands = filters.category === 'all' ? ALL_BRANDS : getBrandsForCategory(filters.category)
  const availableSizes = filters.category === 'all' ? ALL_SIZES : getSizesForCategory(filters.category)

  // Sincronizar parámetro URL con el filtro de categoría
  useEffect(() => {
    const cat = searchParams.get('categoria') as ProductCategory | null
    if (cat) setCategory(cat)
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.title = 'Catálogo | Noir Store'
  }, [])

  const activeFilterCount = [
    filters.category !== 'all',
    filters.brand !== 'all',
    filters.sizes.length > 0,
    filters.priceRange[1] < productPriceRange[1],
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Page header */}
      <div className="border-b border-white/10">
        <Container className="py-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading font-black text-white text-4xl sm:text-5xl tracking-tight"
          >
            Catálogo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-body text-white/40 text-sm mt-2"
          >
            {loading ? 'Cargando productos...' : `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`}
          </motion.p>
        </Container>
      </div>

      <Container className="py-8">
        {error && (
          <div className="mb-6 border border-red-500/20 bg-red-500/5 px-4 py-3 text-red-400 text-xs font-heading tracking-wide">
            Error al cargar productos: {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar Filters (desktop) ─────────────────────────── */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-8">
              <FilterPanel
                filters={filters}
                productPriceRange={productPriceRange}
                availableBrands={availableBrands}
                availableSizes={availableSizes}
                setCategory={setCategory}
                setBrand={setBrand}
                setPriceRange={setPriceRange}
                toggleSize={toggleSize}
                resetFilters={resetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </aside>

          {/* ── Main content ──────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Search + mobile filter trigger */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={filters.search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-noir-dark border border-white/10 text-white placeholder-white/20 pl-10 pr-4 py-3 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                />
                {filters.search && (
                  <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setFiltersOpen(v => !v)}
                className="lg:hidden flex items-center gap-2 bg-noir-dark border border-white/10 text-white px-4 py-3 text-xs font-heading tracking-widest uppercase hover:border-white/30 transition-colors"
              >
                <SlidersHorizontal size={14} />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 bg-white text-black text-[9px] font-bold flex items-center justify-center rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile filters drawer */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden lg:hidden mb-6 border border-white/10 bg-noir-dark p-5"
                >
                  <FilterPanel
                    filters={filters}
                    productPriceRange={productPriceRange}
                    availableBrands={availableBrands}
                    availableSizes={availableSizes}
                    setCategory={setCategory}
                    setBrand={setBrand}
                    setPriceRange={setPriceRange}
                    toggleSize={toggleSize}
                    resetFilters={resetFilters}
                    activeFilterCount={activeFilterCount}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category pills */}
            <div className="flex gap-2 flex-wrap mb-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={[
                    'font-heading text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200',
                    filters.category === cat.value
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white',
                  ].join(' ')}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <p className="font-heading font-black text-white/10 text-5xl mb-4">0</p>
                <p className="font-heading text-white/40 text-sm tracking-widest uppercase">Sin resultados</p>
                <p className="font-body text-white/20 text-xs mt-2 mb-6">
                  Prueba con otros filtros o términos de búsqueda
                </p>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Limpiar filtros
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

// ── Filter Panel ───────────────────────────────────────────────────────────
interface FilterPanelProps {
  filters: ReturnType<typeof useFilter>['filters']
  productPriceRange: [number, number]
  availableBrands: string[]
  availableSizes: ProductSize[]
  setCategory: (c: ProductCategory | 'all') => void
  setBrand: (b: string | 'all') => void
  setPriceRange: (r: [number, number]) => void
  toggleSize: (s: ProductSize) => void
  resetFilters: () => void
  activeFilterCount: number
}

const FilterPanel = ({
  filters,
  productPriceRange,
  availableBrands,
  availableSizes,
  setCategory,
  setBrand,
  setPriceRange,
  toggleSize,
  resetFilters,
  activeFilterCount,
}: FilterPanelProps) => (
  <div className="space-y-7">
    {activeFilterCount > 0 && (
      <button
        onClick={resetFilters}
        className="flex items-center gap-2 font-heading text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors"
      >
        <X size={10} />
        Limpiar ({activeFilterCount})
      </button>
    )}

    {/* Categoría */}
    <div>
      <p className="font-heading text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3 flex items-center justify-between">
        Categoría <ChevronDown size={10} />
      </p>
      <div className="space-y-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={[
              'w-full text-left font-heading text-xs tracking-wide py-1.5 transition-colors',
              filters.category === cat.value ? 'text-white font-semibold' : 'text-white/40 hover:text-white',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>

    {/* Marca */}
    {availableBrands.length > 0 && (
      <div>
        <p className="font-heading text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3 flex items-center justify-between">
          Marca <ChevronDown size={10} />
        </p>
        <div className="space-y-1">
          <button
            onClick={() => setBrand('all')}
            className={[
              'w-full text-left font-heading text-xs tracking-wide py-1.5 transition-colors',
              filters.brand === 'all' ? 'text-white font-semibold' : 'text-white/40 hover:text-white',
            ].join(' ')}
          >
            Todas
          </button>
          {availableBrands.map(brand => (
            <button
              key={brand}
              onClick={() => setBrand(brand)}
              className={[
                'w-full text-left font-heading text-xs tracking-wide py-1.5 transition-colors',
                filters.brand === brand ? 'text-white font-semibold' : 'text-white/40 hover:text-white',
              ].join(' ')}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Precio */}
    <div>
      <p className="font-heading text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">Precio máx.</p>
      <input
        type="range"
        min={productPriceRange[0]}
        max={productPriceRange[1]}
        step={5000}
        value={filters.priceRange[1]}
        onChange={e => setPriceRange([productPriceRange[0], Number(e.target.value)])}
        className="w-full accent-white cursor-pointer"
      />
      <div className="flex justify-between mt-2">
        <span className="font-heading text-[10px] text-white/30">{formatPrice(productPriceRange[0])}</span>
        <span className="font-heading text-[10px] text-white font-semibold">{formatPrice(filters.priceRange[1])}</span>
      </div>
    </div>

    {/* Tallas */}
    <div>
      <p className="font-heading text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">Talla</p>
      <div className="grid grid-cols-4 gap-1.5">
        {availableSizes.map(size => (
          <button
            key={size}
            onClick={() => toggleSize(size)}
            className={[
              'font-heading text-[9px] tracking-wide py-1.5 border transition-all',
              filters.sizes.includes(size)
                ? 'bg-white text-black border-white'
                : 'text-white/40 border-white/10 hover:border-white/30 hover:text-white',
            ].join(' ')}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  </div>
)

export default CatalogPage

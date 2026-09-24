import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Star, Package, Layers, Check, Image as ImageIcon } from 'lucide-react'
import { productsService } from '@/services/products'
import { categoriesService } from '@/services/categories'
import { useCategories } from '@/hooks/useCategories'
import { getBrandsForCategory } from '@/data/brands'
import { getSizesForCategory } from '@/data/sizes'
import { Product, ProductCategory, ProductColor, ProductSize } from '@/types'
import { formatPrice } from '@/utils'
import CloudinaryUpload from '@/components/ui/CloudinaryUpload'
import Button from '@/components/ui/Button'

// ── Tipos del formulario ───────────────────────────────────────────────────
type FormData = {
  name: string
  price: string
  category: ProductCategory
  description: string
  sizes: ProductSize[]
  featured: boolean
  badge: string
  sku: string
  brand: string
  images: string[]
  colors: ProductColor[]
}

const EMPTY_FORM: FormData = {
  name: '',
  price: '',
  category: 'jeans',
  description: '',
  sizes: [],
  featured: false,
  badge: '',
  sku: '',
  brand: '',
  images: [],
  colors: [],
}

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'gorras', label: 'Gorras' },
  { value: 'buzos', label: 'Buzos' },
  { value: 'camisas', label: 'Camisas' },
  { value: 'jeans', label: 'Jeans' },
]

// ── Admin Page ─────────────────────────────────────────────────────────────
const AdminPage = () => {
  const [adminTab, setAdminTab] = useState<'products' | 'categories'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filterCat, setFilterCat] = useState<ProductCategory | 'all'>('all')

  // Estado para la gestión de imágenes de colecciones
  const { data: categoryList } = useCategories()
  const [catImageInputs, setCatImageInputs] = useState<Record<string, string>>({})
  const [catSaving, setCatSaving] = useState<Record<string, boolean>>({})
  const [catSuccess, setCatSuccess] = useState<Record<string, string>>({})

  useEffect(() => {
    document.title = 'Admin | Noir Store'
    loadProducts()
  }, [])

  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      const initial: Record<string, string> = {}
      categoryList.forEach(c => {
        initial[c.id] = c.image
      })
      setCatImageInputs(prev => ({ ...initial, ...prev }))
    }
  }, [categoryList])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await productsService.getAll()
      setProducts(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setError(null)
    setPanelOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      description: product.description,
      sizes: [...product.sizes],
      featured: product.featured,
      badge: product.badge ?? '',
      sku: product.sku ?? '',
      brand: product.brand ?? '',
      images: [...product.images],
      colors: product.colors ? product.colors.map(c => ({ ...c, images: [...c.images] })) : [],
    })
    setError(null)
    setPanelOpen(true)
  }

  const closePanel = () => {
    setPanelOpen(false)
    setEditing(null)
    setError(null)
  }

  const toggleSize = (size: ProductSize) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size],
    }))
  }

  const addColor = () => {
    setForm(f => ({ ...f, colors: [...f.colors, { name: '', hex: '#1a1a1a', images: [] }] }))
  }

  const updateColor = (index: number, patch: Partial<ProductColor>) => {
    setForm(f => ({
      ...f,
      colors: f.colors.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    }))
  }

  const removeColor = (index: number) => {
    setForm(f => ({ ...f, colors: f.colors.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.images.length === 0) { setError('Sube al menos una imagen.'); return }
    if (form.sizes.length === 0) { setError('Selecciona al menos una talla.'); return }
    if (getBrandsForCategory(form.category).length > 0 && !form.brand) {
      setError('Selecciona una marca.'); return
    }

    setSaving(true)
    setError(null)

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      description: form.description.trim(),
      sizes: form.sizes,
      featured: form.featured,
      badge: form.badge.trim() || undefined,
      sku: form.sku.trim() || undefined,
      brand: form.brand.trim() || undefined,
      images: form.images,
      colors: form.colors
        .filter(c => c.name.trim())
        .map(c => ({ name: c.name.trim(), hex: c.hex, images: c.images })),
    }

    try {
      if (editing) {
        const updated = await productsService.update(editing.id, payload)
        setProducts(p => p.map(x => x.id === editing.id ? updated : x))
      } else {
        const created = await productsService.create(payload)
        setProducts(p => [created, ...p])
      }
      closePanel()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return
    setDeletingId(id)
    try {
      await productsService.delete(id)
      setProducts(p => p.filter(x => x.id !== id))
    } catch (e) {
      alert('Error al eliminar: ' + (e as Error).message)
    } finally {
      setDeletingId(null)
    }
  }

  const handleSaveCategoryImage = async (catId: ProductCategory) => {
    const imageUrl = catImageInputs[catId]
    if (!imageUrl) return

    setCatSaving(prev => ({ ...prev, [catId]: true }))
    try {
      await categoriesService.updateImage(catId, imageUrl)
      setCatSuccess(prev => ({ ...prev, [catId]: '¡Portada actualizada en el Inicio!' }))
      setTimeout(() => {
        setCatSuccess(prev => ({ ...prev, [catId]: '' }))
      }, 3500)
    } catch (e) {
      alert('Error al guardar imagen de categoría: ' + (e as Error).message)
    } finally {
      setCatSaving(prev => ({ ...prev, [catId]: false }))
    }
  }

  const visible = filterCat === 'all' ? products : products.filter(p => p.category === filterCat)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-noir-dark sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={16} className="text-white/40" />
            <span className="font-heading font-black tracking-[0.2em] text-sm uppercase">Noir Admin</span>
          </div>

          {adminTab === 'products' && (
            <Button variant="primary" size="sm" onClick={openNew}>
              <Plus size={13} className="mr-1.5" />
              Nuevo producto
            </Button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-white/5">
          <button
            onClick={() => setAdminTab('products')}
            className={[
              'font-heading text-xs tracking-[0.2em] uppercase font-bold py-3 px-4 border-b-2 transition-all flex items-center gap-2',
              adminTab === 'products'
                ? 'border-white text-white bg-white/5'
                : 'border-transparent text-white/40 hover:text-white',
            ].join(' ')}
          >
            <Package size={14} />
            Catálogo de Productos ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('categories')}
            className={[
              'font-heading text-xs tracking-[0.2em] uppercase font-bold py-3 px-4 border-b-2 transition-all flex items-center gap-2',
              adminTab === 'categories'
                ? 'border-white text-white bg-white/5'
                : 'border-transparent text-white/40 hover:text-white',
            ].join(' ')}
          >
            <Layers size={14} />
            Colecciones del Inicio (Portadas)
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── VISTA DE PRODUCTOS ────────────────────────────────────────── */}
        {adminTab === 'products' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Total', value: products.length },
                { label: 'Destacados', value: products.filter(p => p.featured).length },
                ...CATEGORIES.map(c => ({
                  label: c.label,
                  value: products.filter(p => p.category === c.value).length,
                })),
              ].map(stat => (
                <div key={stat.label} className="bg-noir-dark border border-white/5 p-4">
                  <p className="font-heading text-[10px] tracking-widest text-white/30 uppercase mb-1">{stat.label}</p>
                  <p className="font-heading font-black text-white text-2xl">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap mb-6">
              {[{ value: 'all' as const, label: 'Todos' }, ...CATEGORIES].map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setFilterCat(cat.value)}
                  className={[
                    'font-heading text-[10px] tracking-widest uppercase px-4 py-2 border transition-all',
                    filterCat === cat.value
                      ? 'bg-white text-black border-white'
                      : 'text-white/40 border-white/10 hover:border-white/30 hover:text-white',
                  ].join(' ')}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product list */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-noir-dark animate-pulse h-24 border border-white/5" />
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-heading text-white/20 tracking-widest uppercase text-sm">Sin productos</p>
                <button onClick={openNew} className="mt-4 text-white/40 hover:text-white text-xs font-heading tracking-wide underline">
                  Crear el primero
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visible.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-noir-dark border border-white/5 flex gap-4 p-3 hover:border-white/15 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 shrink-0 overflow-hidden bg-noir-mid">
                      {product.images[0] ? (
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={16} className="text-white/20" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-heading font-bold text-white text-sm leading-tight truncate">
                            {product.name}
                          </p>
                          <p className="font-heading text-[10px] tracking-wide text-white/30 uppercase mt-0.5">
                            {product.category}{product.brand ? ` · ${product.brand}` : ''} · {formatPrice(product.price)}
                          </p>
                        </div>
                        {product.featured && (
                          <Star size={11} className="text-white/60 shrink-0 mt-0.5" />
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-1 flex-wrap">
                          {product.sizes.slice(0, 4).map(s => (
                            <span key={s} className="text-[8px] font-heading text-white/30 border border-white/10 px-1">
                              {s}
                            </span>
                          ))}
                          {product.sizes.length > 4 && (
                            <span className="text-[8px] font-heading text-white/20">+{product.sizes.length - 4}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openEdit(product)}
                            className="w-7 h-7 border border-white/10 text-white/40 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
                          >
                            <Pencil size={11} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="w-7 h-7 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 flex items-center justify-center transition-colors disabled:opacity-30"
                          >
                            {deletingId === product.id
                              ? <span className="w-2.5 h-2.5 border border-white/30 border-t-white rounded-full animate-spin" />
                              : <Trash2 size={11} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* ── VISTA DE GESTIÓN DE PORTADAS DE COLECCIONES ─────────────── */
          <div className="space-y-8">
            <div className="bg-noir-dark border border-white/10 p-6">
              <h2 className="font-heading font-black text-xl text-white tracking-tight mb-2 flex items-center gap-2">
                <ImageIcon size={20} className="text-white/60" />
                Imágenes de la Sección "Explorar Colecciones"
              </h2>
              <p className="font-body text-xs text-white/50 leading-relaxed max-w-2xl">
                Cambia las imágenes de las portadas que aparecen en la página principal para las 4 categorías principales. Puedes subir una nueva foto desde tu equipo o pegar un enlace de imagen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryList.map(cat => {
                const currentImg = catImageInputs[cat.id] || cat.image
                const isSaving = catSaving[cat.id]
                const successMsg = catSuccess[cat.id]

                return (
                  <div key={cat.id} className="bg-noir-dark border border-white/10 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                          {cat.name}
                        </h3>
                        <p className="font-body text-xs text-white/40">{cat.description}</p>
                      </div>
                      <span className="font-heading text-[10px] tracking-widest text-white/30 uppercase px-2.5 py-1 bg-white/5 border border-white/10">
                        {cat.id}
                      </span>
                    </div>

                    {/* Previsualización */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-noir-mid border border-white/10 group">
                      <img
                        src={currentImg}
                        alt={`Portada de ${cat.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <span className="font-heading text-[10px] tracking-widest text-white/70 uppercase">
                          Vista previa en el Inicio
                        </span>
                      </div>
                    </div>

                    {/* Cargador de Cloudinary */}
                    <div>
                      <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                        Subir nueva foto o seleccionar imagen
                      </label>
                      <CloudinaryUpload
                        maxFiles={1}
                        value={catImageInputs[cat.id] ? [catImageInputs[cat.id]] : [cat.image]}
                        onChange={imgs => {
                          if (imgs.length > 0) {
                            setCatImageInputs(prev => ({ ...prev, [cat.id]: imgs[imgs.length - 1] }))
                          }
                        }}
                      />
                    </div>

                    {/* Input manual de URL */}
                    <div>
                      <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
                        O pega una URL de imagen directamente:
                      </label>
                      <input
                        type="url"
                        value={catImageInputs[cat.id] || ''}
                        onChange={e => setCatImageInputs(prev => ({ ...prev, [cat.id]: e.target.value }))}
                        placeholder="https://..."
                        className="w-full bg-noir-mid border border-white/10 text-white placeholder-white/20 px-3 py-2 text-xs font-body focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    {/* Botón Guardar */}
                    <div className="pt-2 flex items-center justify-between">
                      <Button
                        variant="primary"
                        size="md"
                        loading={isSaving}
                        onClick={() => handleSaveCategoryImage(cat.id)}
                      >
                        <Check size={14} className="mr-1.5" />
                        Guardar foto de {cat.name}
                      </Button>

                      {successMsg && (
                        <span className="font-body text-xs text-green-400 flex items-center gap-1.5 animate-pulse">
                          <Check size={13} />
                          {successMsg}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Side Panel ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {panelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-noir-dark border-l border-white/10 z-50 flex flex-col overflow-hidden"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                <h2 className="font-heading font-black text-white tracking-tight">
                  {editing ? 'Editar producto' : 'Nuevo producto'}
                </h2>
                <button onClick={closePanel} className="text-white/40 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                {/* Imágenes */}
                <div>
                  <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-3">
                    Imágenes del producto *
                  </label>
                  <CloudinaryUpload
                    value={form.images}
                    onChange={imgs => setForm(f => ({ ...f, images: imgs }))}
                  />
                </div>

                <div className="border-t border-white/10" />

                {/* Nombre */}
                <div>
                  <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                    Nombre *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Ej: Noir Classic Cap"
                    className="w-full bg-noir-mid border border-white/10 text-white placeholder-white/15 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                {/* Precio + Categoría */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                      Precio (COP) *
                    </label>
                    <input
                      required
                      type="number"
                      min={0}
                      step={1000}
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                      placeholder="89000"
                      className="w-full bg-noir-mid border border-white/10 text-white placeholder-white/15 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                      Categoría *
                    </label>
                    <select
                      value={form.category}
                      onChange={e => {
                        const category = e.target.value as ProductCategory
                        setForm(f => ({
                          ...f,
                          category,
                          brand: '',
                          sizes: f.sizes.filter(s => getSizesForCategory(category).includes(s)),
                        }))
                      }}
                      className="w-full bg-noir-mid border border-white/10 text-white px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Marca */}
                {getBrandsForCategory(form.category).length > 0 && (
                  <div>
                    <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                      Marca *
                    </label>
                    <select
                      required
                      value={form.brand}
                      onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                      className="w-full bg-noir-mid border border-white/10 text-white px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="" disabled>Selecciona una marca</option>
                      {getBrandsForCategory(form.category).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Descripción */}
                <div>
                  <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                    Descripción *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Describe el producto..."
                    className="w-full bg-noir-mid border border-white/10 text-white placeholder-white/15 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                {/* Tallas */}
                <div>
                  <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                    Tallas disponibles *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {getSizesForCategory(form.category).map(size => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={[
                          'font-heading text-[10px] font-semibold tracking-wide px-3 py-1.5 border transition-all',
                          form.sizes.includes(size)
                            ? 'bg-white text-black border-white'
                            : 'text-white/40 border-white/10 hover:border-white/30 hover:text-white',
                        ].join(' ')}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colores */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase">
                      Colores
                      <span className="ml-1 text-white/20 normal-case tracking-normal">(opcional, tú los defines)</span>
                    </label>
                    <button
                      type="button"
                      onClick={addColor}
                      className="flex items-center gap-1 font-heading text-[10px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
                    >
                      <Plus size={11} />
                      Agregar color
                    </button>
                  </div>

                  {form.colors.length === 0 ? (
                    <p className="font-body text-xs text-white/20">
                      Sin variantes de color — el producto usará las imágenes generales de arriba.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {form.colors.map((color, i) => (
                        <div key={i} className="border border-white/10 bg-black/30 p-3 space-y-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={color.hex}
                              onChange={e => updateColor(i, { hex: e.target.value })}
                              title="Elegir tono"
                              className="w-9 h-9 shrink-0 bg-transparent border border-white/10 cursor-pointer p-0.5"
                            />
                            <input
                              value={color.name}
                              onChange={e => updateColor(i, { name: e.target.value })}
                              placeholder="Nombre del color (ej: Azul petróleo)"
                              className="flex-1 bg-noir-mid border border-white/10 text-white placeholder-white/15 px-3 py-2 text-xs font-body focus:outline-none focus:border-white/30 transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => removeColor(i)}
                              title="Quitar color"
                              className="w-8 h-8 shrink-0 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 flex items-center justify-center transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>

                          <div>
                            <p className="font-heading text-[9px] tracking-widest text-white/30 uppercase mb-2">
                              Imágenes para este color
                            </p>
                            <CloudinaryUpload
                              value={color.images}
                              onChange={imgs => updateColor(i, { images: imgs })}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10" />

                {/* Badge + SKU */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                      Badge
                      <span className="ml-1 text-white/20 normal-case tracking-normal">(opcional)</span>
                    </label>
                    <input
                      value={form.badge}
                      onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                      placeholder="Nuevo, Bestseller..."
                      className="w-full bg-noir-mid border border-white/10 text-white placeholder-white/15 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                      SKU
                      <span className="ml-1 text-white/20 normal-case tracking-normal">(opcional)</span>
                    </label>
                    <input
                      value={form.sku}
                      onChange={e => setForm(f => ({ ...f, sku: e.target.value }))}
                      placeholder="NR-001"
                      className="w-full bg-noir-mid border border-white/10 text-white placeholder-white/15 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Destacado */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                    className={[
                      'w-10 h-5 rounded-full transition-colors relative',
                      form.featured ? 'bg-white' : 'bg-white/10 border border-white/20',
                    ].join(' ')}
                  >
                    <div className={[
                      'absolute top-0.5 w-4 h-4 rounded-full transition-all bg-black',
                      form.featured ? 'left-[22px]' : 'left-0.5',
                    ].join(' ')} />
                  </div>
                  <div>
                    <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase">Producto destacado</p>
                    <p className="font-body text-[10px] text-white/20 mt-0.5">Aparece en la sección "Más vendidos" del Home</p>
                  </div>
                </label>

                {/* Error */}
                {error && (
                  <div className="border border-red-500/20 bg-red-500/5 px-3 py-2 text-red-400 text-xs font-body">
                    {error}
                  </div>
                )}
              </form>

              {/* Panel footer */}
              <div className="px-6 py-4 border-t border-white/10 shrink-0 flex gap-3">
                <Button type="button" variant="ghost" size="md" onClick={closePanel} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  form="product-form"
                  variant="primary"
                  size="md"
                  loading={saving}
                  className="flex-1"
                >
                  {editing ? 'Guardar cambios' : 'Crear producto'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPage


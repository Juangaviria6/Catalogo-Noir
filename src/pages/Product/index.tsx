import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Share2, ShoppingBag, Check } from 'lucide-react'
import { useProduct } from '@/hooks/useProduct'
import { formatPrice, generateWhatsAppLink } from '@/utils'
import { useCart } from '@/context/CartContext'
import { ProductSize } from '@/types'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, loading, error, notFound } = useProduct(id)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [sizeError, setSizeError] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (notFound) navigate('/catalogo', { replace: true })
  }, [notFound, navigate])

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Noir Store`
      setCurrentImage(0)
      setSelectedSize(null)
      setSizeError(false)
    }
  }, [product])

  const requireSize = (): ProductSize | null => {
    if (!product) return null
    if (product.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2500)
      return null
    }
    return selectedSize ?? product.sizes[0] ?? null
  }

  const handleWhatsApp = () => {
    if (!product) return
    const size = requireSize()
    if (!size) return
    window.open(generateWhatsAppLink(product.name, product.price, size), '_blank')
  }

  const handleAddToCart = () => {
    if (!product) return
    const size = requireSize()
    if (!size) return
    addItem(product, size)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product?.name, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <Container className="py-8">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
            <div className="aspect-[4/5] bg-noir-dark animate-pulse" />
            <div className="space-y-4 pt-4">
              <div className="h-3 bg-noir-dark animate-pulse rounded w-1/4" />
              <div className="h-8 bg-noir-dark animate-pulse rounded w-3/4" />
              <div className="h-6 bg-noir-dark animate-pulse rounded w-1/4 mt-4" />
              <div className="h-24 bg-noir-dark animate-pulse rounded mt-6" />
            </div>
          </div>
        </Container>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-white/30 text-sm tracking-widest uppercase mb-4">Error al cargar</p>
          <Link to="/catalogo">
            <Button variant="outline" size="md">Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!product) return null

  const prevImage = () => setCurrentImage(i => (i === 0 ? product.images.length - 1 : i - 1))
  const nextImage = () => setCurrentImage(i => (i === product.images.length - 1 ? 0 : i + 1))

  return (
    <div className="min-h-screen bg-black pt-20">
      <Container className="py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 font-heading text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            Catálogo
          </Link>
          <span className="text-white/20">/</span>
          <span className="font-heading text-[10px] tracking-widest uppercase text-white/40">{product.category}</span>
          <span className="text-white/20">/</span>
          <span className="font-heading text-[10px] tracking-widest uppercase text-white/60 truncate max-w-[140px]">
            {product.name}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── Galería ────────────────────────────────────────────── */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] bg-noir-dark overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={product.images[currentImage]}
                  alt={`${product.name} — vista ${currentImage + 1}`}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge label={product.badge} variant="featured" />
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={[
                        'h-1.5 rounded-full transition-all duration-300',
                        i === currentImage ? 'bg-white w-4' : 'bg-white/30 w-1.5',
                      ].join(' ')}
                    />
                  ))}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={[
                      'aspect-square overflow-hidden border-2 transition-all',
                      i === currentImage ? 'border-white' : 'border-transparent opacity-50 hover:opacity-75',
                    ].join(' ')}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col"
          >
            <p className="font-heading text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2">
              {product.category}{product.brand ? ` · ${product.brand}` : ''}{product.sku ? ` · ${product.sku}` : ''}
            </p>

            <h1 className="font-heading font-black text-white text-3xl sm:text-4xl tracking-tight leading-tight mb-4">
              {product.name}
            </h1>

            <p className="font-body font-semibold text-white text-2xl mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="font-body text-white/50 text-sm leading-relaxed mb-8 border-t border-b border-white/10 py-6">
              {product.description}
            </p>

            {/* Tallas */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-heading text-[10px] tracking-[0.25em] text-white/40 uppercase">
                  Talla{selectedSize && <span className="text-white ml-2">— {selectedSize}</span>}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={[
                      'font-heading text-xs font-semibold tracking-wide px-4 py-2.5 border-2 transition-all duration-200 min-w-[52px]',
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white/60 border-white/15 hover:border-white/50 hover:text-white',
                    ].join(' ')}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-body text-xs text-red-400 mt-2"
                  >
                    Por favor selecciona una talla antes de continuar.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Button variant="white" size="lg" fullWidth onClick={handleAddToCart}>
                {justAdded ? <Check size={14} className="mr-2" /> : <ShoppingBag size={14} className="mr-2" />}
                {justAdded ? 'Agregado al carrito' : 'Agregar al carrito'}
              </Button>
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-black font-heading font-bold text-sm tracking-widest uppercase py-4 hover:bg-[#22c55e] active:scale-[0.98] transition-all duration-200"
              >
                <MessageCircle size={18} />
                Comprar por WhatsApp
              </button>
              <Button variant="outline" size="lg" fullWidth onClick={handleShare}>
                <Share2 size={14} className="mr-2" />
                Compartir producto
              </Button>
            </div>

            {/* Trust signals */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              {['Envíos a todo Colombia', 'Pago seguro', 'Atención personalizada'].map(label => (
                <div key={label} className="text-center">
                  <p className="font-heading text-[9px] tracking-wide text-white/30 uppercase leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}

export default ProductPage

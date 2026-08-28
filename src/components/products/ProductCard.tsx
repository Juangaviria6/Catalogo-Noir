import { useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye, Check } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/utils'
import { useCart } from '@/context/CartContext'
import Badge from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  index?: number
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()
  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0]

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.sizes.length === 0) return
    addItem(product, product.sizes[0])
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-noir-dark"
    >
      {/* Image container */}
      <Link to={`/producto/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
        {/* Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-noir-mid animate-pulse" />
        )}

        <img
          src={currentImage}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={[
            'w-full h-full object-cover transition-all duration-700',
            'group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

        {/* Quick actions */}
        <div
          className={[
            'absolute bottom-4 left-0 right-0 flex justify-center gap-2',
            'transition-all duration-400',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          ].join(' ')}
        >
          {/* La navegación la maneja el <Link> contenedor; este span solo la representa visualmente
              para evitar anidar un <a> dentro de otro <a>. */}
          <span className="flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-heading font-semibold tracking-widest uppercase hover:bg-noir-light transition-colors">
            <Eye size={12} />
            Ver
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-black text-white border border-white/30 px-4 py-2 text-[10px] font-heading font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
          >
            {justAdded ? <Check size={12} /> : <ShoppingBag size={12} />}
            {justAdded ? 'Agregado' : 'Agregar'}
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge label={product.badge} variant="featured" />
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="font-heading text-[10px] tracking-widest text-noir-light uppercase mb-1">
          {product.category}{product.brand ? ` · ${product.brand}` : ''}
        </p>
        <Link to={`/producto/${product.id}`}>
          <h3 className="font-heading font-bold text-white text-sm tracking-wide hover:text-noir-light transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="font-body font-semibold text-white mt-2 text-sm">
          {formatPrice(product.price)}
        </p>

        {/* Sizes preview */}
        <div className="flex gap-1 mt-2">
          {product.sizes.slice(0, 5).map(size => (
            <span
              key={size}
              className="text-[9px] font-heading text-noir-light border border-noir-mid px-1.5 py-0.5"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 5 && (
            <span className="text-[9px] font-heading text-noir-light">
              +{product.sizes.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

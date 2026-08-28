import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import ProductCard from '@/components/products/ProductCard'
import { useFeaturedProducts } from '@/hooks/useProducts'

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

const FeaturedProducts = () => {
  const { data: products, loading } = useFeaturedProducts()

  return (
    <section className="py-24 bg-noir-dark">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionTitle
            eyebrow="Destacados"
            title="Más vendidos"
            subtitle="Los favoritos de nuestra comunidad. Piezas que combinan calidad, estética y actitud."
            light
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="shrink-0"
          >
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 font-heading text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors group"
            >
              Ver todo
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProducts

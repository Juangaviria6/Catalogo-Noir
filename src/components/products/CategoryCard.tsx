import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  index?: number
}

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden cursor-pointer"
    >
      <Link to={`/catalogo?categoria=${category.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/50" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {category.count !== undefined && (
              <p className="font-heading text-[10px] tracking-[0.25em] text-noir-light uppercase mb-2 transition-transform duration-400 group-hover:-translate-y-1">
                {category.count} productos
              </p>
            )}
            <h3 className="font-heading font-black text-white text-2xl sm:text-3xl tracking-tight leading-none mb-2 transition-transform duration-400 group-hover:-translate-y-1">
              {category.name}
            </h3>
            <p className="font-body text-xs text-noir-light mb-4 transition-all duration-400 group-hover:-translate-y-1">
              {category.description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-white text-xs font-heading font-semibold tracking-widest uppercase transition-all duration-400 group-hover:-translate-y-1">
              <span>Explorar</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>

          {/* Top right corner accent */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/30 transition-all duration-400 group-hover:border-white/60" />
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard

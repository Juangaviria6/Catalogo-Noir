import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import CategoryCard from '@/components/products/CategoryCard'
import { useCategories } from '@/hooks/useCategories'

const SkeletonCategory = () => (
  <div className="aspect-[4/5] bg-noir-mid animate-pulse" />
)

const CategoriesSection = () => {
  const { data: categories, loading } = useCategories()

  return (
    <section className="py-24 bg-black">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <SectionTitle
            eyebrow="Explorar"
            title="Colecciones"
            subtitle="Encuentra tu estilo en nuestras categorías premium. Cada pieza diseñada para quienes no se conforman con lo ordinario."
            light
          />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCategory key={i} />)
            : categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
        </div>
      </Container>
    </section>
  )
}

export default CategoriesSection

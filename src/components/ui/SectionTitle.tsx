import { motion } from 'framer-motion'
import { clsx } from '@/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}: SectionTitleProps) => {
  return (
    <div className={clsx(centered && 'text-center', className)}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={clsx(
            'font-heading text-[10px] tracking-[0.25em] uppercase font-semibold mb-3',
            light ? 'text-noir-light' : 'text-noir-mid'
          )}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={clsx(
          'font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05]',
          light ? 'text-white' : 'text-black'
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={clsx(
            'font-body text-sm leading-relaxed mt-4 max-w-xl',
            centered && 'mx-auto',
            light ? 'text-noir-light' : 'text-noir-mid'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionTitle

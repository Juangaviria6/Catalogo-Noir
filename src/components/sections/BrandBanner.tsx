import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const BrandBanner = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      {/* Marquee strip */}
      <div className="border-y border-white/10 py-4 mb-0 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-heading font-black text-[11px] tracking-[0.4em] text-white/10 uppercase px-8"
            >
              NOIR STORE · MEDELLÍN · STREETWEAR PREMIUM · REPLICAS 1.1 ·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        {/* overflow-hidden contiene el texto decorativo de fondo */}
        <div className="relative overflow-hidden">
          {/* Texto decorativo — tamaño relativo al viewport para no desbordar */}
          <p className="absolute -top-4 left-0 font-heading font-black text-[18vw] leading-none text-white/[0.04] select-none pointer-events-none whitespace-nowrap">
            NOIR
          </p>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-heading text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4"
              >
                Nuestra esencia
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]"
              >
                Las mejores
                <br />
                <span className="text-white/30">marcas</span>
                <br />
                en un solo lugar.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:pl-12"
            >
              <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
                Noir Store nació en las calles de Medellín con una visión clara: hacer que tu
                esencia hable por cómo te vistes. Selección exclusiva de marcas urbanas premium y
                réplicas 1.1 de la mejor calidad para quienes se niegan a pasar desapercibidos.
              </p>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-3 font-heading font-semibold text-[11px] tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-white transition-colors group"
              >
                Descubrir colección
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandBanner

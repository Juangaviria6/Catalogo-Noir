import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const NotFoundPage = () => {
  useEffect(() => {
    document.title = '404 — Página no encontrada | Noir Store'
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-heading font-black text-[120px] sm:text-[180px] leading-none text-white/5 select-none">
          404
        </p>
        <p className="font-heading font-black text-white text-3xl sm:text-4xl tracking-tight -mt-8 mb-4">
          Página no encontrada
        </p>
        <p className="font-body text-white/40 text-sm mb-8 max-w-xs mx-auto">
          La página que buscas no existe o fue movida.
        </p>
        <Link to="/">
          <Button variant="outline" size="lg">
            Volver al inicio
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFoundPage

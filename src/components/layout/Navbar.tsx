import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useCart } from '@/context/CartContext'
import { clsx } from '@/utils'
import NoirLogo from '@/components/ui/NoirLogo'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Contacto', to: '/contacto' },
]

const Navbar = () => {
  const { isScrolled } = useScrollPosition(60)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { totalItems, openCart } = useCart()

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = location.pathname === '/'

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled || !isHome
            ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <NoirLogo size={36} color="white" />
              <span className="font-heading font-black text-white text-lg tracking-[0.25em] uppercase">
                STORE
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    clsx(
                      'font-heading text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300',
                      'relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:bg-white after:transition-all after:duration-300',
                      isActive
                        ? 'text-white after:w-full'
                        : 'text-white/60 hover:text-white after:w-0 hover:after:w-full'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Cart + Mobile menu trigger */}
            <div className="flex items-center gap-4">
              <button
                onClick={openCart}
                className="relative text-white p-1 transition-opacity hover:opacity-70"
                aria-label="Carrito"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(v => !v)}
                className="text-white p-1 transition-opacity hover:opacity-70 md:hidden"
                aria-label="Menú"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col h-full px-8 pt-20 pb-12">
              {/* Logo en menú móvil */}
              <div className="flex items-center gap-3.5 mb-10">
                <NoirLogo size={42} color="white" />
                <span className="font-heading font-black text-white text-xl tracking-[0.25em] uppercase">STORE</span>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        clsx(
                          'block font-heading font-black text-4xl tracking-tight py-3 border-b border-white/10 transition-colors',
                          isActive ? 'text-white' : 'text-white/55 hover:text-white'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <p className="text-white/30 text-xs font-heading tracking-widest mt-6 uppercase">
                Medellín, Colombia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

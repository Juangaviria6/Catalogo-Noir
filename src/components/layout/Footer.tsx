import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react'
import { WHATSAPP_PHONE } from '@/utils'
import NoirLogo from '@/components/ui/NoirLogo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-noir-dark border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-5 hover:opacity-80 transition-opacity">
              <NoirLogo size={38} color="white" />
              <span className="font-heading font-black text-white text-base tracking-[0.25em] uppercase">
                STORE
              </span>
            </Link>
            <p className="font-body text-xs text-white/40 leading-relaxed max-w-xs">
              Streetwear premium y réplicas 1.1 para quienes marcan tendencia. Haz que tu esencia
              hable por cómo te vistes.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-white/30">
              <MapPin size={11} />
              <span className="font-heading text-[10px] tracking-widest uppercase">
                Medellín, Antioquia, Colombia
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-[10px] tracking-[0.25em] text-white/40 uppercase mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', to: '/' },
                { label: 'Catálogo', to: '/catalogo' },
                { label: 'Gorras', to: '/catalogo?categoria=gorras' },
                { label: 'Buzos', to: '/catalogo?categoria=buzos' },
                { label: 'Camisas', to: '/catalogo?categoria=camisas' },
                { label: 'Jeans', to: '/catalogo?categoria=jeans' },
                { label: 'Contacto', to: '/contacto' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-heading text-xs tracking-wide text-white/50 hover:text-white transition-colors uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-heading font-semibold text-[10px] tracking-[0.25em] text-white/40 uppercase mb-5">
              Síguenos
            </h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/noir_store09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group text-white/50 hover:text-white transition-colors py-2 border-b border-white/5"
              >
                <div className="flex items-center gap-3">
                  <Instagram size={14} />
                  <span className="font-heading text-xs tracking-widest uppercase">Instagram</span>
                </div>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group text-white/50 hover:text-white transition-colors py-2 border-b border-white/5"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={14} />
                  <span className="font-heading text-xs tracking-widest uppercase">WhatsApp</span>
                </div>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-heading text-[10px] tracking-widest text-white/20 uppercase">
            © {currentYear} Noir Store. Todos los derechos reservados.
          </p>
          <p className="font-heading text-[10px] tracking-widest text-white/20 uppercase">
            Medellín, Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

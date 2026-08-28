import { useState, useEffect, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Send, MapPin, Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const socialLinks = [
  {
    platform: 'Instagram',
    handle: '@noir_store09',
    description: 'Síguenos para ver los últimos drops y contenido exclusivo.',
    href: 'https://instagram.com/noir_store09',
    icon: Instagram,
    color: 'from-purple-600 to-pink-500',
  },
  {
    platform: 'WhatsApp',
    handle: '+57 319 787 2281',
    description: 'Escríbenos directamente para pedidos y consultas personalizadas.',
    href: 'https://wa.me/573197872281',
    icon: MessageCircle,
    color: 'from-green-600 to-green-400',
  },
]

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Contacto | Noir Store'
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate send — integrate with your backend/EmailJS/Formspree here
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <div className="border-b border-white/10">
        <Container className="py-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4"
          >
            Hablemos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-black text-white text-5xl sm:text-6xl tracking-tight leading-none"
          >
            Contacto
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-body text-white/40 text-sm mt-4 max-w-sm"
          >
            Estamos en Medellín, Colombia. Respuesta rápida garantizada.
          </motion.p>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Social channels */}
          <div>
            <p className="font-heading text-[10px] tracking-[0.25em] text-white/30 uppercase mb-8">
              Canales de contacto
            </p>

            <div className="space-y-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-5 p-5 border border-white/10 bg-noir-dark hover:border-white/25 hover:bg-noir-mid transition-all duration-300 group"
                >
                  <div className="shrink-0 w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <social.icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm tracking-wide mb-0.5">
                      {social.platform}
                    </p>
                    <p className="font-heading text-[10px] tracking-widest text-white/40 uppercase mb-2">
                      {social.handle}
                    </p>
                    <p className="font-body text-xs text-white/30 leading-relaxed">
                      {social.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 pt-8 border-t border-white/10 flex items-start gap-3"
            >
              <MapPin size={14} className="text-white/30 mt-0.5 shrink-0" />
              <div>
                <p className="font-heading text-[10px] tracking-widest uppercase text-white/30 mb-1">
                  Ubicación
                </p>
                <p className="font-body text-sm text-white/60">
                  Medellín, Antioquia, Colombia
                </p>
                <p className="font-body text-xs text-white/30 mt-1">
                  Atención por WhatsApp · Lun–Sáb 9am–7pm
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-heading text-[10px] tracking-[0.25em] text-white/30 uppercase mb-8">
              Envíanos un mensaje
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center border border-white/10 bg-noir-dark"
              >
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-5">
                  <Check size={20} className="text-white" />
                </div>
                <p className="font-heading font-bold text-white text-lg tracking-tight mb-2">
                  Mensaje enviado
                </p>
                <p className="font-body text-white/40 text-sm max-w-xs">
                  Gracias por contactarnos. Te respondemos pronto por email o WhatsApp.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-[10px] tracking-widest text-white/30 uppercase mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className="w-full bg-noir-dark border border-white/10 text-white placeholder-white/15 px-4 py-3 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-[10px] tracking-widest text-white/30 uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="tu@email.com"
                      className="w-full bg-noir-dark border border-white/10 text-white placeholder-white/15 px-4 py-3 text-sm font-body focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-heading text-[10px] tracking-widest text-white/30 uppercase mb-2">
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-noir-dark border border-white/10 text-white placeholder-white/15 px-4 py-3 text-sm font-body focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                  <Send size={14} className="mr-2" />
                  Enviar mensaje
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  )
}

export default ContactPage

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles, ShieldCheck } from 'lucide-react'
import NoirLogo from '@/components/ui/NoirLogo'

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] max-h-[1080px] overflow-hidden flex items-center justify-center bg-[#050505] text-white selection:bg-white selection:text-black"
    >
      {/* ── Graphic Background Elements ────────────────────────────────────── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {/* Fine luxury grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient radial lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

        {/* Giant Watermarked Typography Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <p className="font-heading font-black text-[25vw] leading-none text-white/[0.02] tracking-tighter uppercase select-none whitespace-nowrap">
            NOIR
          </p>
        </div>
      </motion.div>

      {/* ── Main Hero Content ─────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 w-full text-center px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 md:-mt-14"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Standing Pure White Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-4 relative"
          >
            <div className="drop-shadow-[0_0_35px_rgba(255,255,255,0.35)] transition-transform duration-500 hover:scale-105">
              <NoirLogo size={80} color="white" />
            </div>
          </motion.div>

          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-md mb-5"
          >
            <Sparkles size={12} className="text-white/70" />
            <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.35em] text-white/80 uppercase font-semibold">
              Medellín · Streetwear Premium & Réplicas 1.1
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] tracking-tight leading-none uppercase"
            >
              NOIR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">STORE</span>
            </motion.h1>
          </div>

          {/* Subtitle / Brand Promise */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-body text-white/60 text-base sm:text-lg md:text-xl max-w-xl mb-8 leading-relaxed font-light"
          >
            Haz que tu esencia hable por cómo te vistes. Las mejores marcas urbanas y piezas exclusivas en un solo lugar.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex justify-center w-full sm:w-auto"
          >
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center px-12 py-4 font-heading font-bold text-xs tracking-[0.25em] uppercase bg-white text-black hover:bg-zinc-200 active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-none"
            >
              Ver catálogo
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Corner Badges ─────────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3 z-30 opacity-40 hover:opacity-100 transition-opacity">
        <ShieldCheck size={14} className="text-white" />
        <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-white">
          Calidad Garantizada 1.1
        </span>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block z-30 opacity-40 text-right">
        <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-white block">
          Medellín, Colombia
        </span>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="font-heading text-[9px] tracking-[0.35em] text-white/40 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection





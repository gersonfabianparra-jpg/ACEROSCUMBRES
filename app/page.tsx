'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useSpring
} from 'framer-motion'
import { ArrowRight, ChevronRight, CheckCircle, Clock, Phone, Package, Layers, Shield, Wrench, Play } from 'lucide-react'

// ─── Kinetic text helpers ────────────────────────────────────────────────────

function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <span ref={ref} className={className} aria-label={text} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 60, rotateX: -40 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.03, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Animation helpers ───────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}>
      {children}
    </motion.div>
  )
}


function SlideIn({ children, delay = 0, from = 'left', className = '' }: { children: React.ReactNode; delay?: number; from?: 'left' | 'right'; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: from === 'left' ? -80 : 80 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}>
      {children}
    </motion.div>
  )
}

function Stagger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } }
      }}>
      {children}
    </motion.div>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const val = useMotionValue(0)
  const spring = useSpring(val, { stiffness: 50, damping: 20 })

  useEffect(() => { if (inView) val.set(to) }, [inView, val, to])
  useEffect(() => spring.on('change', (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix }), [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { name: 'Perfiles de Acero', slug: 'Perfiles de Acero', desc: 'Ángulos, canales, tubos cuadrados y rectangulares', icon: <Layers size={24} />, count: '26+', color: '#2563eb' },
  { name: 'Cubiertas y Revestimientos', slug: 'Cubiertas y Revestimientos', desc: 'Planchas AC-4, AC-6, AC-8 y paneles arquitectónicos', icon: <Package size={24} />, count: '5+', color: '#475569' },
  { name: 'Paneles Aislados', slug: 'Paneles Aislados', desc: 'Poliestireno, poliuretano y lana de roca', icon: <Shield size={24} />, count: '6+', color: '#4f46e5' },
  { name: 'Tejas Metálicas', slug: 'Tejas', desc: 'Española, romana y colonial en acero prepintado', icon: <Package size={24} />, count: '3', color: '#0284c7' },
  { name: 'Accesorios', slug: 'Accesorios', desc: 'Tornillos, sello butilo y cumbreras', icon: <Wrench size={24} />, count: '3', color: '#64748b' },
]

const stats = [
  { value: 200, suffix: '+', label: 'Productos en stock' },
  { value: 2, suffix: 'h', label: 'Respuesta garantizada' },
  { value: 7, suffix: '', label: 'Sectores atendidos' },
  { value: 2018, suffix: '', label: 'Año de fundación' },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])


  return (
    <div className="bg-[#060d1a] overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a] via-[#060d1a]/85 to-[#060d1a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-transparent to-transparent" />
        </motion.div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Floating orbs */}
        <motion.div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

        <motion.div className="relative max-w-7xl mx-auto px-6 py-32 w-full" style={{ opacity: heroOpacity }}>
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <motion.span className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Distribuidores de acero en Chile desde 2018
            </motion.div>

            {/* Headline — kinetic split text */}
            <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tight mb-10" style={{ perspective: '800px' }}>
              <div className="mb-2">
                <SplitText text="Acero de" className="text-white" delay={0.3} />
              </div>
              <div className="mb-2">
                <SplitText text="Alta Calidad" className="text-blue-400" delay={0.5} />
              </div>
              <div>
                <SplitText text="para Chile" className="text-white/30" delay={0.7} />
              </div>
            </h1>

            <motion.p
              className="text-gray-300 text-xl leading-relaxed max-w-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}>
              Más de 200 productos en stock. Perfiles, cubiertas, paneles y accesorios con cotización garantizada en menos de 2 horas.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/tienda"
                  className="group flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors shadow-2xl shadow-blue-500/30">
                  Ver Catálogo
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={22} />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/cotizacion"
                  className="flex items-center gap-3 border border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:bg-white/5 backdrop-blur-sm">
                  <Play size={18} className="fill-current" />
                  Solicitar Cotización
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating stats */}
          <motion.div
            className="absolute bottom-12 right-6 hidden lg:flex gap-4"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4 }}>
            {stats.map((s, i) => (
              <motion.div key={s.label}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px]"
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.08)' }}
                transition={{ duration: 0.2 }}>
                <div className="text-2xl font-black text-blue-400">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-gray-400 text-xs mt-1 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}>
          <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div className="w-px h-12 bg-gradient-to-b from-blue-400 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </section>

      {/* ── MARQUEE BAR ──────────────────────────────────────────────────────── */}
      <div className="bg-blue-600 py-4 overflow-hidden border-y border-blue-500/50">
        <motion.div className="flex gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              {['Perfiles de Acero', 'Cubiertas Metálicas', 'Paneles Aislados', 'Tejas Metálicas', 'Accesorios', 'Cotización en 2 horas', 'Atención Personalizada', 'Calidad Garantizada'].map((t) => (
                <span key={t} className="text-white/90 font-bold text-sm uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PROPUESTA DE VALOR ───────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Clock size={26} />, title: 'Cotización en 2 horas', desc: 'Respuesta garantizada en horario hábil. Sin demoras ni complicaciones.', color: 'from-blue-600/20 to-blue-600/5' },
              { icon: <CheckCircle size={26} />, title: 'Materiales Certificados', desc: 'Acero de calidad superior para construcción, minería e industria.', color: 'from-indigo-600/20 to-indigo-600/5' },
              { icon: <Phone size={26} />, title: 'Asesoría Personalizada', desc: 'Te ayudamos a elegir el producto exacto para tu proyecto.', color: 'from-sky-600/20 to-sky-600/5' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className={`relative bg-gradient-to-br ${item.color} border border-white/5 rounded-2xl p-8 overflow-hidden group cursor-default`}
                  whileHover={{ y: -6, borderColor: 'rgba(96,165,250,0.3)' }}
                  transition={{ duration: 0.3 }}>
                  <motion.div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="text-blue-400 mb-5">{item.icon}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CATEGORÍAS ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#080f1e]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">Catálogo completo</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white">Nuestras <span className="text-blue-400">Categorías</span></h2>
            <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">Amplio stock de productos para todos tus proyectos industriales y de construcción</p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Featured category — large */}
            <FadeUp delay={0.1} className="lg:row-span-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                className="relative h-full min-h-[360px] rounded-3xl overflow-hidden cursor-pointer group">
                <Link href={`/tienda?categoria=${encodeURIComponent(categories[0].slug)}`} className="block h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-[#060d1a]" />
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #3b82f6 0%, transparent 60%)' }} />
                  <motion.div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full border border-blue-500/20"
                    animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
                  <motion.div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full border border-blue-500/10"
                    animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
                  <div className="relative p-10 h-full flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full mb-6">
                        {categories[0].count} productos
                      </span>
                      <div className="text-blue-400 mb-4">{categories[0].icon}</div>
                      <h3 className="text-3xl font-black text-white mb-3">{categories[0].name}</h3>
                      <p className="text-gray-400 text-base leading-relaxed">{categories[0].desc}</p>
                    </div>
                    <motion.div className="flex items-center gap-2 text-blue-400 font-bold mt-8 group-hover:gap-4 transition-all duration-300">
                      Ver todos los perfiles <ArrowRight size={18} />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            </FadeUp>

            {/* Remaining categories */}
            {categories.slice(1).map((cat, i) => (
              <FadeUp key={cat.name} delay={0.15 + i * 0.1}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                  className="group">
                  <Link href={`/tienda?categoria=${encodeURIComponent(cat.slug)}`}
                    className="flex items-center gap-5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white/70"
                      style={{ backgroundColor: cat.color + '20', border: `1px solid ${cat.color}30` }}>
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-bold">{cat.name}</span>
                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{cat.count}</span>
                      </div>
                      <p className="text-gray-500 text-sm truncate">{cat.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" />
                  </Link>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center mt-10">
            <Link href="/tienda"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Ver catálogo completo <ArrowRight size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── STATS CINEMATOGRÁFICOS ───────────────────────────────────────────── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&q=80')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#060d1a] via-blue-950/80 to-[#060d1a]" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white">Números que <span className="text-blue-400">hablan</span></h2>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <motion.div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  whileHover={{ y: -4, backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(96,165,250,0.3)' }}
                  transition={{ duration: 0.3 }}>
                  <div className="text-4xl lg:text-5xl font-black text-blue-400 mb-2">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{s.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── SECTORES ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#080f1e]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">Industrias</p>
            <h2 className="text-5xl font-black text-white">Sectores que <span className="text-blue-400">atendemos</span></h2>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Minería', emoji: '⛏️' },
              { name: 'Construcción', emoji: '🏗️' },
              { name: 'Industria Naval', emoji: '⚓' },
              { name: 'Energía', emoji: '⚡' },
              { name: 'Agroindustria', emoji: '🌾' },
              { name: 'Sector Forestal', emoji: '🌲' },
              { name: 'Contratistas', emoji: '🔧' },
              { name: 'Industria General', emoji: '🏭' },
            ].map((s) => (
              <StaggerItem key={s.name}>
                <motion.div
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-default"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}>
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-gray-300 font-semibold text-sm">{s.name}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <SlideIn from="left">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">¿Por qué elegirnos?</p>
            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              Más que un distribuidor,
              <span className="text-blue-400"> tu socio estratégico</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Desde 2018 entregamos soluciones en acero de alta calidad para los sectores más exigentes de Chile, con foco en atención personalizada y tiempos de respuesta inigualables.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/nosotros"
                className="inline-flex items-center gap-3 border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 px-7 py-3.5 rounded-xl font-bold transition-all">
                Conoce nuestra historia <ArrowRight size={18} />
              </Link>
            </motion.div>
          </SlideIn>

          <SlideIn from="right">
            <div className="space-y-4">
              {[
                { n: '01', title: 'Stock permanente', desc: 'Más de 200 productos disponibles de forma inmediata, sin tiempos de espera.' },
                { n: '02', title: 'Respuesta en 2 horas', desc: 'Garantizamos respuesta a toda cotización en menos de 2 horas hábiles.' },
                { n: '03', title: 'Precios competitivos', desc: 'Precios de distribuidor directo sin intermediarios innecesarios.' },
                { n: '04', title: 'Asesoría técnica', desc: 'Equipo especializado para ayudarte a elegir el producto correcto.' },
              ].map((item, i) => (
                <motion.div key={item.n}
                  className="flex gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-blue-500/20 hover:bg-white/[0.05] transition-all group"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={{ x: 4 }}>
                  <span className="text-blue-500/50 font-black text-3xl leading-none shrink-0">{item.n}</span>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#080f1e] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">Proceso simple</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white">
              De la consulta al <span className="text-blue-400">despacho</span>
            </h2>
          </FadeUp>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <Stagger className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { n: '01', title: 'Explora el catálogo', desc: 'Más de 200 productos organizados por categoría con especificaciones completas.' },
                { n: '02', title: 'Arma tu cotización', desc: 'Agrega los productos que necesitas al carrito y selecciona cantidades.' },
                { n: '03', title: 'Envía la solicitud', desc: 'Completa tus datos en el formulario. Sin registro previo necesario.' },
                { n: '04', title: 'Respuesta en 2 horas', desc: 'Te contactamos con precio final y disponibilidad en tiempo récord.' },
              ].map((step) => (
                <StaggerItem key={step.n}>
                  <motion.div
                    className="relative text-center group"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}>
                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300">
                      <span className="text-blue-400 font-black text-xl">{step.n}</span>
                      <motion.div
                        className="absolute inset-0 rounded-2xl border border-blue-400/20"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: parseInt(step.n) * 0.5 }}
                      />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <FadeUp delay={0.4} className="text-center mt-14">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/tienda"
                className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/30 transition-colors">
                Empezar ahora <ArrowRight size={20} />
              </Link>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ── GALERÍA DE PROYECTOS ─────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a] via-[#070e1c] to-[#060d1a]" />

        <div className="relative max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">Nuestro trabajo</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Proyectos que<br /><span className="text-blue-400">hablan por sí solos</span>
            </h2>
          </FadeUp>

          {/* Mosaic grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
            {[
              { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', span: 'col-span-2 row-span-2', label: 'Estructura Industrial' },
              { url: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80', span: 'col-span-1 row-span-1', label: 'Cubierta Metálica' },
              { url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80', span: 'col-span-1 row-span-1', label: 'Perfiles Estructurales' },
              { url: 'https://images.unsplash.com/photo-1590359802044-9a8d9df0e2bc?w=800&q=80', span: 'col-span-1 row-span-2', label: 'Panel Aislado' },
              { url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', span: 'col-span-1 row-span-1', label: 'Revestimiento Arquitectónico' },
              { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', span: 'col-span-2 row-span-1', label: 'Bodega Industrial' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`${item.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={item.url} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                >
                  <p className="text-white font-bold text-sm">{item.label}</p>
                </motion.div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center mt-12">
            <Link href="/proyectos"
              className="inline-flex items-center gap-3 border border-white/20 hover:border-blue-400/60 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:bg-blue-500/10 backdrop-blur-sm">
              Ver todos los proyectos <ArrowRight size={18} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#060d1a] to-indigo-900/30" />
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-6">Cotiza ahora</p>
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-none mb-6">
              ¿Tienes un<br />
              <span className="text-blue-400">proyecto</span>?
            </h2>
            <p className="text-gray-300 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
              Agrega productos a tu cotización y recibe respuesta en menos de 2 horas hábiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/tienda"
                  className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-400 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/40 transition-colors">
                  Explorar Catálogo <ArrowRight size={22} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contacto"
                  className="flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all backdrop-blur-sm">
                  Hablar con un asesor
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}

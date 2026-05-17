'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'

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

const projects = [
  {
    id: 1,
    title: 'Bodega Industrial Quilicura',
    category: 'Estructura Industrial',
    description: 'Construcción de bodega de 2.400 m² con estructura de perfiles de acero, cubierta metálica AC-6 y paneles aislados de poliuretano. Proyecto ejecutado en 45 días.',
    tags: ['Perfiles Acero', 'Cubierta AC-6', 'Paneles Aislados'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    size: 'large',
    year: '2024',
  },
  {
    id: 2,
    title: 'Cubierta Agroindustrial Rancagua',
    category: 'Cubiertas',
    description: 'Instalación de cubierta metálica sobre estructura existente. 1.800 m² de plancha AC-8 con aislación térmica incorporada.',
    tags: ['Cubierta AC-8', 'Aislación'],
    image: 'https://images.unsplash.com/photo-1590359802044-9a8d9df0e2bc?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1590359802044-9a8d9df0e2bc?w=600&q=80',
    size: 'medium',
    year: '2024',
  },
  {
    id: 3,
    title: 'Centro de Distribución Maipú',
    category: 'Panel Aislado',
    description: 'Proyecto de revestimiento de fachada y cubierta con paneles aislados de lana de roca. Certificación de resistencia al fuego RF-60.',
    tags: ['Panel Lana de Roca', 'RF-60'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
    size: 'medium',
    year: '2023',
  },
  {
    id: 4,
    title: 'Nave Industrial Pudahuel',
    category: 'Estructura Industrial',
    description: 'Fabricación y montaje de nave industrial con 3.200 m². Perfiles tubulares cuadrados y rectangulares, correas C y cubierta zinc-alum.',
    tags: ['Tubos Rectangulares', 'Correas C', 'Zinc-alum'],
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80',
    size: 'large',
    year: '2023',
  },
  {
    id: 5,
    title: 'Planta Minera Atacama',
    category: 'Minería',
    description: 'Provisión de materiales para planta procesadora. Más de 80 toneladas de perfiles y tubos en acero estructural A36.',
    tags: ['Perfiles A36', 'Ángulos', 'Canales'],
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80',
    size: 'medium',
    year: '2023',
  },
  {
    id: 6,
    title: 'Edificio Comercial Vitacura',
    category: 'Revestimiento',
    description: 'Revestimiento de fachada con paneles arquitectónicos acanalados y lisos. Acabado moderno con colores personalizados.',
    tags: ['Panel Arquitectónico', 'Fachada'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    size: 'medium',
    year: '2022',
  },
  {
    id: 7,
    title: 'Galpón Forestal Valdivia',
    category: 'Estructura Industrial',
    description: 'Estructura completa para galpón de almacenamiento. Cercha metálica, correas Z y cubierta traslúcida.',
    tags: ['Cercha', 'Correas Z', 'Traslúcida'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    size: 'medium',
    year: '2022',
  },
  {
    id: 8,
    title: 'Resort Patagónico Punta Arenas',
    category: 'Tejas Metálicas',
    description: 'Cubiertas de teja metálica española para complejo turístico en zona de alta demanda climática. Colores terracotas y ocre.',
    tags: ['Teja Española', 'Alta Resistencia'],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    size: 'medium',
    year: '2022',
  },
]

const allCategories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))]

export default function ProyectosPage() {
  const [filter, setFilter] = useState('Todos')
  const [selected, setSelected] = useState<typeof projects[0] | null>(null)

  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="min-h-screen bg-[#060d1a]">

      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=60')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/80 via-[#060d1a]/60 to-[#060d1a]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-5">Portafolio</p>
          <h1 className="text-6xl lg:text-8xl font-black text-white leading-none mb-6">
            Nuestros<br /><span className="text-blue-400">Proyectos</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Más de 500 proyectos ejecutados en toda Chile. Desde naves industriales hasta revestimientos arquitectónicos.
          </p>
        </motion.div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-20 bg-[#060d1a]/95 backdrop-blur-md border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto scrollbar-none">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer ${project.size === 'large' ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                onClick={() => setSelected(project)}
                whileHover={{ y: -4 }}
              >
                <img
                  src={project.thumb}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-blue-500/30 border border-blue-400/30 text-blue-300 px-2.5 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-black text-xl leading-tight mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.category} · {project.year}</p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/10 border border-white/0 group-hover:border-white/20 flex items-center justify-center transition-all duration-500">
                  <ArrowRight size={16} className="text-white/0 group-hover:text-white transition-colors duration-500 rotate-[-45deg]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div
              className="relative max-w-4xl w-full bg-[#0d1a30] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a30] via-transparent to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{selected.category} · {selected.year}</span>
                    <h2 className="text-3xl font-black text-white mt-1">{selected.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X size={18} className="text-white" />
                  </button>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.tags.map(tag => (
                    <span key={tag} className="text-sm bg-blue-500/20 border border-blue-400/30 text-blue-300 px-3 py-1.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/cotizacion"
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-500/30"
                >
                  Cotizar materiales similares <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA bottom */}
      <FadeUp className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-blue-900/30 via-[#0d1a30] to-indigo-900/20 p-12 text-center">
          <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity }} />
          <div className="relative">
            <h3 className="text-4xl font-black text-white mb-4">¿Tienes un proyecto similar?</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">Contáctanos y cotiza los materiales que necesitas. Respuesta garantizada en menos de 2 horas.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tienda" className="inline-flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-500/30">
                Ver catálogo <ArrowRight size={18} />
              </Link>
              <Link href="/cotizacion" className="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/5 transition-all">
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  )
}

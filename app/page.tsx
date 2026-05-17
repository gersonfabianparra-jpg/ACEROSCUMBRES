import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Phone, Package, Layers, Shield, Wrench, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/types'

async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(6)
  return data ?? []
}

const categories = [
  {
    name: 'Perfiles de Acero',
    slug: 'Perfiles de Acero',
    description: 'Ángulos, canales, tubos cuadrados y rectangulares en múltiples medidas',
    icon: <Layers size={28} />,
    color: 'from-blue-600 to-blue-800',
    count: '26+ productos',
  },
  {
    name: 'Cubiertas y Revestimientos',
    slug: 'Cubiertas y Revestimientos',
    description: 'Planchas industriales AC-4, AC-6, AC-8 y paneles arquitectónicos',
    icon: <Package size={28} />,
    color: 'from-slate-600 to-slate-800',
    count: '5+ productos',
  },
  {
    name: 'Paneles Aislados',
    slug: 'Paneles Aislados',
    description: 'Núcleos de poliestireno, poliuretano y lana de roca',
    icon: <Shield size={28} />,
    color: 'from-indigo-600 to-indigo-800',
    count: '6+ productos',
  },
  {
    name: 'Tejas',
    slug: 'Tejas',
    description: 'Tejas metálicas española, romana y colonial en acero prepintado',
    icon: <Package size={28} />,
    color: 'from-sky-600 to-sky-800',
    count: '3 productos',
  },
  {
    name: 'Accesorios',
    slug: 'Accesorios',
    description: 'Tornillos autoperforantes, sello butilo y cumbreras',
    icon: <Wrench size={28} />,
    color: 'from-gray-600 to-gray-800',
    count: '3 productos',
  },
]

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a1628] text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Distribuidores de acero en Chile desde 2018
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Acero de Alta
              <span className="block text-blue-400">Calidad para</span>
              tu Proyecto
            </h1>
            <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-lg">
              Más de 200 productos en stock. Perfiles, cubiertas, paneles y accesorios con cotización garantizada en menos de 2 horas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/tienda"
                className="group bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all duration-200 shadow-lg shadow-blue-500/30">
                Ver Catálogo Completo
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/cotizacion"
                className="border border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-white/5 transition-all duration-200">
                Solicitar Cotización
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { value: '200+', label: 'Productos en stock' },
                { value: '< 2h', label: 'Respuesta cotización' },
                { value: '7', label: 'Sectores industriales' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-blue-400">{s.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { bg: 'bg-blue-500/10 border-blue-500/20', title: 'Perfiles de Acero', sub: 'Ángulos · Canales · Tubos', n: '26+' },
              { bg: 'bg-slate-500/10 border-slate-500/20', title: 'Cubiertas', sub: 'AC-4 · AC-6 · AC-8', n: '5+' },
              { bg: 'bg-indigo-500/10 border-indigo-500/20', title: 'Paneles Aislados', sub: 'EPS · PUR · Lana de Roca', n: '6+' },
              { bg: 'bg-sky-500/10 border-sky-500/20', title: 'Tejas y Accesorios', sub: 'Española · Romana · Colonial', n: '6+' },
            ].map((card) => (
              <div key={card.title} className={`border ${card.bg} rounded-2xl p-6 backdrop-blur-sm`}>
                <div className="text-4xl font-black text-white mb-1">{card.n}</div>
                <div className="font-semibold text-white">{card.title}</div>
                <div className="text-gray-400 text-xs mt-1">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPUESTA DE VALOR */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Clock size={22} className="text-blue-600" />, title: 'Cotización en 2 horas', desc: 'Respuesta garantizada en horario hábil. Sin demoras.' },
            { icon: <CheckCircle size={22} className="text-blue-600" />, title: 'Materiales certificados', desc: 'Acero de calidad para construcción, minería e industria.' },
            { icon: <Phone size={22} className="text-blue-600" />, title: 'Asesoría personalizada', desc: 'Te ayudamos a elegir el producto exacto para tu proyecto.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-xl h-fit shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Catálogo</p>
              <h2 className="text-4xl font-black text-gray-900">Nuestras Categorías</h2>
            </div>
            <Link href="/tienda" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
              Ver todo el catálogo <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.slice(0, 3).map((cat) => (
              <Link key={cat.name} href={`/tienda?categoria=${encodeURIComponent(cat.slug)}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br text-white p-8 hover:scale-[1.02] transition-all duration-300 shadow-lg"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
                <div className="relative">
                  <div className="bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                    {cat.icon}
                  </div>
                  <span className="text-white/60 text-xs font-medium uppercase tracking-widest">{cat.count}</span>
                  <h3 className="text-xl font-bold mt-1">{cat.name}</h3>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{cat.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                    Ver productos <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
            {categories.slice(3).map((cat) => (
              <Link key={cat.name} href={`/tienda?categoria=${encodeURIComponent(cat.slug)}`}
                className="group bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl p-7 flex items-center gap-5 transition-all duration-200">
                <div className="bg-white border border-gray-200 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-gray-600 shadow-sm">
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <span className="text-gray-400 text-xs font-medium">{cat.count}</span>
                  <h3 className="font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{cat.description}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      {featured.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Lo más solicitado</p>
                <h2 className="text-4xl font-black text-gray-900">Productos Destacados</h2>
              </div>
              <Link href="/tienda" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                Ver todos <ChevronRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTORES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Industrias</p>
            <h2 className="text-4xl font-black text-gray-900">Sectores que Atendemos</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Soluciones en acero para los principales sectores productivos de Chile</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Minería', icon: '⛏️' },
              { name: 'Construcción', icon: '🏗️' },
              { name: 'Industria Naval', icon: '⚓' },
              { name: 'Energía', icon: '⚡' },
              { name: 'Agroindustria', icon: '🌾' },
              { name: 'Sector Forestal', icon: '🌲' },
              { name: 'Contratistas', icon: '🔧' },
              { name: 'Industria General', icon: '🏭' },
            ].map((s) => (
              <div key={s.name} className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-3 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold text-gray-800 text-sm">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#0a1628] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Cotiza ahora</p>
          <h2 className="text-5xl font-black leading-tight">
            ¿Tienes un proyecto<br />en mente?
          </h2>
          <p className="mt-5 text-gray-300 text-lg max-w-xl mx-auto">
            Agrega productos a tu cotización y recibe respuesta en menos de 2 horas hábiles. Sin compromiso.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda"
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/30">
              Explorar Catálogo
            </Link>
            <Link href="/contacto"
              className="border border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-all">
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

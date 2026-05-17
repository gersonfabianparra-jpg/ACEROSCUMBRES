import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Phone, Star, Package, Layers, Shield } from 'lucide-react'
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
    description: 'Ángulos, canales, tubos y perfiles cerrados',
    icon: <Layers size={32} className="text-blue-700" />,
  },
  {
    name: 'Cubiertas y Revestimientos',
    slug: 'Cubiertas y Revestimientos',
    description: 'Planchas industriales y paneles arquitectónicos',
    icon: <Package size={32} className="text-blue-700" />,
  },
  {
    name: 'Paneles Aislados',
    slug: 'Paneles Aislados',
    description: 'Poliestireno, poliuretano, lana de roca',
    icon: <Shield size={32} className="text-blue-700" />,
  },
]

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-300 uppercase tracking-widest text-sm font-medium">
              Distribución de materiales de acero
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
              Soluciones en Acero para la Construcción e Industria
            </h1>
            <p className="mt-5 text-blue-100 text-lg leading-relaxed">
              Más de 200 productos en stock. Cotización en menos de 2 horas. Atención personalizada para proyectos industriales y de construcción en todo Chile.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/tienda"
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Ver Catálogo <ArrowRight size={18} />
              </Link>
              <Link
                href="/cotizacion"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                Solicitar Cotización
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {[
              { value: '200+', label: 'Productos en stock' },
              { value: '2h', label: 'Tiempo de cotización' },
              { value: '7', label: 'Sectores atendidos' },
              { value: '2018', label: 'Fundada en' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Clock size={24} className="text-blue-700" />, title: 'Cotización en 2 horas', desc: 'Respondemos tu solicitud de cotización en menos de 2 horas hábiles.' },
            { icon: <CheckCircle size={24} className="text-blue-700" />, title: 'Calidad garantizada', desc: 'Materiales certificados para la industria, construcción y minería.' },
            { icon: <Phone size={24} className="text-blue-700" />, title: 'Atención personalizada', desc: 'Asesoría directa para encontrar el producto adecuado a tu proyecto.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 flex gap-4 shadow-sm">
              <div className="shrink-0 mt-1">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Nuestras Categorías</h2>
          <p className="text-gray-500 mt-2">Amplio catálogo de productos para todos tus proyectos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/tienda?categoria=${encodeURIComponent(cat.slug)}`}
              className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{cat.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-blue-700 text-sm font-medium">
                Ver productos <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      {featured.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <Star size={28} className="text-blue-700" /> Productos Destacados
                </h2>
                <p className="text-gray-500 mt-1">Los más solicitados por nuestros clientes</p>
              </div>
              <Link href="/tienda" className="text-blue-700 font-medium flex items-center gap-1 hover:underline">
                Ver todos <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sectores */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Sectores que Atendemos</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {['Minería', 'Construcción', 'Industria Naval', 'Energía', 'Agroindustria', 'Sector Forestal', 'Contratistas'].map((sector) => (
            <span key={sector} className="bg-blue-50 text-blue-800 px-5 py-2 rounded-full font-medium border border-blue-100">
              {sector}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold">¿Listo para cotizar?</h2>
          <p className="mt-3 text-blue-200 text-lg">
            Agrega productos a tu cotización y recibe respuesta en menos de 2 horas hábiles.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tienda"
              className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explorar Catálogo
            </Link>
            <Link
              href="/contacto"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contactar Directamente
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

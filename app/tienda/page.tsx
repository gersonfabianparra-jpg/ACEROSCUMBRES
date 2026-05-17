'use client'

import { useState, useEffect, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import ProductCard from '@/components/ui/ProductCard'
import { Search, Layers, Package, Shield, Wrench, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const CATEGORIES = [
  { name: 'Todos', icon: null, count: null },
  { name: 'Perfiles de Acero', icon: <Layers size={18} />, count: '26+' },
  { name: 'Cubiertas y Revestimientos', icon: <Package size={18} />, count: '5+' },
  { name: 'Paneles Aislados', icon: <Shield size={18} />, count: '6+' },
  { name: 'Tejas', icon: <Package size={18} />, count: '3' },
  { name: 'Accesorios', icon: <Wrench size={18} />, count: '3' },
]

function TiendaContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('categoria') || 'Todos'

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      let query = supabase.from('products').select('*').order('name')
      if (selectedCategory !== 'Todos') {
        query = query.eq('category', selectedCategory)
      }
      const { data } = await query
      setProducts(data ?? [])
      setLoading(false)
    }
    loadProducts()
  }, [selectedCategory])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const subcategories = selectedCategory !== 'Todos'
    ? [...new Set(filtered.map((p) => p.subcategory).filter(Boolean))] as string[]
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0a1628] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <span>Inicio</span><ChevronRight size={14} /><span className="text-white">Tienda</span>
            {selectedCategory !== 'Todos' && <><ChevronRight size={14} /><span className="text-blue-400">{selectedCategory}</span></>}
          </div>
          <h1 className="text-4xl font-black">Catálogo de Productos</h1>
          <p className="mt-2 text-gray-400">Más de 200 productos disponibles para cotización inmediata</p>
        </div>
      </div>

      {/* Categorías visuales */}
      <div className="bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat.icon}
                {cat.name}
                {cat.count && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat.name ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative mb-8 max-w-xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {subcategories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {subcategories.map((sub) => (
              <button key={sub} onClick={() => setSearch(sub)}
                className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-blue-300 hover:text-blue-700 transition-colors font-medium text-gray-700">
                {sub}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Package size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No se encontraron productos</p>
            <p className="text-sm mt-1">Intenta con otro término o categoría</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-5 font-medium">
              {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
              {selectedCategory !== 'Todos' && <span className="text-blue-600"> en {selectedCategory}</span>}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function TiendaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Cargando tienda...</div>
      </div>
    }>
      <TiendaContent />
    </Suspense>
  )
}

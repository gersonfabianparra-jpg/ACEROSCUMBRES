'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import ProductCard from '@/components/ui/ProductCard'
import { Search, Filter } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const CATEGORIES = [
  'Todos',
  'Perfiles de Acero',
  'Cubiertas y Revestimientos',
  'Paneles Aislados',
  'Tejas',
  'Accesorios',
]

export default function TiendaPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Catálogo de Productos</h1>
          <p className="mt-2 text-blue-200">Más de 200 productos disponibles para cotización inmediata</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filtros */}
          <aside className="w-full md:w-60 shrink-0">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Filter size={18} /> Categorías
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? 'bg-blue-700 text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Productos */}
          <div className="flex-1">
            {/* Buscador */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl h-72 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">No se encontraron productos</p>
                <p className="text-sm mt-1">Intenta con otro término o categoría</p>
              </div>
            ) : (
              <>
                <p className="text-gray-500 text-sm mb-4">{filtered.length} productos encontrados</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Product } from '@/types'
import { ShoppingCart, Package, CheckCircle } from 'lucide-react'
import { useQuote } from './QuoteContext'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useQuote()
  const [added, setAdded] = useState(false)
  const inQuote = items.some((i) => i.product.id === product.id)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <Package size={44} />
            <span className="text-xs font-medium">Sin imagen</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.is_featured && (
            <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow">
              ★ Destacado
            </span>
          )}
          {inQuote && (
            <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow flex items-center gap-1">
              <CheckCircle size={11} /> En cotización
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {product.subcategory && (
          <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">
            {product.subcategory}
          </span>
        )}
        <h3 className="font-bold text-gray-900 mt-1 leading-snug">
          {product.name}
        </h3>
        {product.sku && (
          <p className="text-xs text-gray-400 mt-1 font-mono">SKU: {product.sku}</p>
        )}

        {/* Specs */}
        {product.specs && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Object.entries(product.specs).slice(0, 3).map(([, value]) => (
              <span key={value} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                {value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-50 mt-4">
          <div className="mb-3">
            {product.price ? (
              <div>
                <span className="text-2xl font-black text-gray-900">
                  ${Number(product.price).toLocaleString('es-CL')}
                </span>
                <span className="text-gray-400 text-sm ml-1">/ {product.unit}</span>
              </div>
            ) : (
              <span className="text-gray-500 text-sm font-medium">Precio a consultar</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              added || inQuote
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            {added ? (
              <><CheckCircle size={16} /> ¡Agregado!</>
            ) : inQuote ? (
              <><CheckCircle size={16} /> En cotización</>
            ) : (
              <><ShoppingCart size={16} /> Agregar a cotización</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

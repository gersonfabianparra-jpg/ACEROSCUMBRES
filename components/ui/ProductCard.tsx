'use client'

import { Product } from '@/types'
import { ShoppingCart, Package } from 'lucide-react'
import { useQuote } from './QuoteContext'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useQuote()

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Package size={48} className="text-gray-300" />
        )}
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
            Destacado
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {product.subcategory && (
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
            {product.subcategory}
          </span>
        )}
        <h3 className="font-semibold text-gray-800 mt-1 text-sm leading-snug">
          {product.name}
        </h3>
        {product.sku && (
          <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
        )}

        {/* Specs preview */}
        {product.specs && (
          <div className="mt-2 flex flex-wrap gap-1">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          {product.price ? (
            <span className="text-blue-800 font-bold">
              ${product.price.toLocaleString('es-CL')} / {product.unit}
            </span>
          ) : (
            <span className="text-gray-500 text-sm">Precio a consultar</span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => addItem(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors"
          >
            <ShoppingCart size={15} />
            Cotizar
          </button>
          <Link
            href={`/tienda/${product.slug}`}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
          >
            Ver
          </Link>
        </div>
      </div>
    </div>
  )
}

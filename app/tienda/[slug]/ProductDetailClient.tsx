'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useQuote } from '@/components/ui/QuoteContext'
import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { ShoppingCart, CheckCircle, Package, ChevronRight, ArrowLeft, Tag, Layers } from 'lucide-react'

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const { addItem, items } = useQuote()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const inQuote = items.some(i => i.product.id === product.id)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#060d1a] pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Inicio</Link>
          <ChevronRight size={14} />
          <Link href="/tienda" className="hover:text-gray-300 transition-colors">Tienda</Link>
          <ChevronRight size={14} />
          <Link href={`/tienda?categoria=${encodeURIComponent(product.category)}`} className="hover:text-gray-300 transition-colors">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-300 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="sticky top-28"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                  <Package size={80} />
                  <p className="mt-4 text-sm">Sin imagen</p>
                </div>
              )}
              {product.is_featured && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  ★ Destacado
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {product.subcategory && (
              <span className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full mb-4">
                <Layers size={12} /> {product.subcategory}
              </span>
            )}
            <h1 className="text-4xl font-black text-white leading-tight mb-3">{product.name}</h1>

            {product.sku && (
              <p className="text-gray-500 text-sm font-mono mb-6 flex items-center gap-2">
                <Tag size={14} /> SKU: {product.sku}
              </p>
            )}

            {product.description && (
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">{product.description}</p>
            )}

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
                      <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 capitalize">{key}</div>
                      <div className="text-white font-semibold">{value as string}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price & stock */}
            <div className="flex items-center gap-4 mb-8 p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
              <div className="flex-1">
                {product.price ? (
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Precio referencial</p>
                    <p className="text-3xl font-black text-white">${Number(product.price).toLocaleString('es-CL')}</p>
                    <p className="text-gray-500 text-sm">por {product.unit}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500 text-sm">Precio</p>
                    <p className="text-xl font-bold text-blue-400">A consultar</p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">Disponibilidad</p>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
                </span>
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-white/[0.03]">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-bold">−</button>
                <span className="px-5 text-white font-bold min-w-[48px] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-bold">+</button>
              </div>
              <motion.button
                onClick={handleAdd}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-lg transition-all ${
                  added || inQuote
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30'
                }`}
              >
                {added ? <><CheckCircle size={20} /> ¡Agregado!</> : inQuote ? <><CheckCircle size={20} /> En cotización</> : <><ShoppingCart size={20} /> Agregar a cotización</>}
              </motion.button>
            </div>

            <Link href="/cotizacion"
              className="flex items-center justify-center gap-2 w-full border border-white/10 text-gray-300 hover:border-white/30 hover:text-white py-3 rounded-xl font-medium transition-all text-sm">
              Ver mi cotización →
            </Link>

            {/* Category */}
            <div className="mt-8 pt-8 border-t border-white/[0.06] flex items-center gap-3">
              <span className="text-gray-500 text-sm">Categoría:</span>
              <Link href={`/tienda?categoria=${encodeURIComponent(product.category)}`}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                {product.category} <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-white">Productos relacionados</h2>
              <Link href={`/tienda?categoria=${encodeURIComponent(product.category)}`}
                className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center gap-1">
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link href="/tienda" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm">
            <ArrowLeft size={16} /> Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useQuote } from '@/components/ui/QuoteContext'
import { Trash2, Plus, Minus, Send, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function CotizacionPage() {
  const { items, removeItem, updateQuantity, clearQuote } = useQuote()
  const [form, setForm] = useState({
    name: '', surname: '', company: '', company_rut: '',
    phone: '', email: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setStatus('loading')

    const quoteItems = items.map((item) => ({
      product_id: item.product.id,
      product_name: item.product.name,
      sku: item.product.sku,
      quantity: item.quantity,
      unit: item.product.unit,
    }))

    const { error } = await supabase.from('quotes').insert({
      ...form,
      items: quoteItems,
      status: 'pendiente',
    })

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      clearQuote()
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800">¡Cotización enviada!</h2>
          <p className="text-gray-500 mt-2">Te contactaremos en menos de 2 horas hábiles.</p>
          <Link href="/tienda" className="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
            Seguir explorando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart size={32} /> Solicitud de Cotización
          </h1>
          <p className="mt-2 text-blue-200">Respuesta garantizada en menos de 2 horas hábiles</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        {/* Productos seleccionados */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Productos Seleccionados</h2>
          {items.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center text-gray-400 shadow-sm">
              <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
              <p>No hay productos en tu cotización.</p>
              <Link href="/tienda" className="mt-4 inline-block text-blue-700 font-medium hover:underline">
                Ir a la tienda
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
                    {item.product.sku && <p className="text-xs text-gray-400">SKU: {item.product.sku}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center border rounded-lg hover:bg-gray-100">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center border rounded-lg hover:bg-gray-100">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 w-16">{item.product.unit}</span>
                  <button onClick={() => removeItem(item.product.id)}
                    className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <p className="text-sm text-gray-500 mt-2 text-right">{items.length} producto(s) seleccionado(s)</p>
            </div>
          )}
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Tus Datos</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                <input required value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RUT Empresa</label>
              <input value={form.company_rut} onChange={(e) => setForm({ ...form, company_rut: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios adicionales</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            {status === 'error' && (
              <p className="text-red-500 text-sm">Error al enviar. Intenta nuevamente.</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading' || items.length === 0}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
              {status === 'loading' ? 'Enviando...' : 'Enviar Cotización'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

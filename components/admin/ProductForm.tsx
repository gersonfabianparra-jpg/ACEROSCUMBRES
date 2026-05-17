'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Upload, Save } from 'lucide-react'
import { Product } from '@/types'

const CATEGORIES = [
  'Perfiles de Acero',
  'Cubiertas y Revestimientos',
  'Paneles Aislados',
  'Tejas',
  'Accesorios',
]

interface Props {
  product?: Product
}

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEditing = !!product

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    price: product?.price?.toString() ?? '',
    category: product?.category ?? CATEGORIES[0],
    subcategory: product?.subcategory ?? '',
    sku: product?.sku ?? '',
    stock: product?.stock?.toString() ?? '0',
    unit: product?.unit ?? 'unidad',
    is_featured: product?.is_featured ?? false,
    image_url: product?.image_url ?? '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(product?.image_url ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setForm((f) => ({ ...f, name, slug: isEditing ? f.slug : slug }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createSupabaseBrowserClient()
    const ext = file.name.split('.').pop()
    const path = `products/${form.slug}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('productos').upload(path, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from('productos').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createSupabaseBrowserClient()

    try {
      let image_url = form.image_url
      if (imageFile) {
        image_url = await uploadImage(imageFile)
      }

      const data = {
        name: form.name,
        slug: form.slug,
        description: form.description || null,
        price: form.price ? parseFloat(form.price) : null,
        category: form.category,
        subcategory: form.subcategory || null,
        sku: form.sku || null,
        stock: parseInt(form.stock) || 0,
        unit: form.unit,
        is_featured: form.is_featured,
        image_url,
      }

      if (isEditing) {
        await supabase.from('products').update(data).eq('id', product.id)
      } else {
        await supabase.from('products').insert(data)
      }

      router.push('/admin/productos')
      router.refresh()
    } catch (err: any) {
      setError(err.message ?? 'Error al guardar')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input required value={form.name} onChange={(e) => handleNameChange(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
              <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
              <input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
              <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (CLP, opcional)</label>
            <input type="number" min="0" step="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Dejar vacío = Precio a consultar"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm font-medium text-gray-700">Producto destacado (aparece en Home)</span>
          </label>
        </div>

        {/* Columna derecha - imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-56 object-contain rounded-lg mb-3" />
                <button type="button" onClick={() => { setImagePreview(''); setImageFile(null); setForm({ ...form, image_url: '' }) }}
                  className="text-red-500 text-sm hover:underline">Quitar imagen</button>
              </div>
            ) : (
              <div className="py-10">
                <Upload size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500 text-sm">Sube una imagen del producto</p>
                <p className="text-gray-400 text-xs mt-1">JPG, PNG o WEBP</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange}
              className="mt-3 w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-800 disabled:opacity-50 transition-colors">
          <Save size={18} />
          {loading ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  )
}

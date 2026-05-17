import { createSupabaseServerClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Plus, Pencil, Package } from 'lucide-react'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default async function AdminProductosPage() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('category')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors"
        >
          <Plus size={18} /> Nuevo Producto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-5 py-3">Producto</th>
              <th className="text-left px-5 py-3">Categoría</th>
              <th className="text-left px-5 py-3">SKU</th>
              <th className="text-left px-5 py-3">Stock</th>
              <th className="text-left px-5 py-3">Precio</th>
              <th className="text-left px-5 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products?.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package size={16} className="text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      {p.subcategory && <p className="text-xs text-gray-400">{p.subcategory}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-600">{p.category}</td>
                <td className="px-5 py-3 text-gray-500 font-mono text-xs">{p.sku || '—'}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.stock > 0 ? `${p.stock} unid.` : 'Sin stock'}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-600">
                  {p.price ? `$${Number(p.price).toLocaleString('es-CL')}` : '—'}
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Pencil size={15} />
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!products || products.length === 0) && (
          <p className="text-center py-12 text-gray-400">No hay productos. ¡Crea el primero!</p>
        )}
      </div>
    </div>
  )
}

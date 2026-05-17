import { createSupabaseServerClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Plus, Pencil, Package, Star } from 'lucide-react'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default async function AdminProductosPage() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('category')
    .order('name')

  const grouped = (products ?? []).reduce<Record<string, typeof products>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category]!.push(p)
    return acc
  }, {})

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Productos</h1>
          <p className="text-gray-500 text-sm mt-1">{products?.length ?? 0} productos en total</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus size={16} /> Nuevo Producto
        </Link>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="font-bold text-white text-sm">{category}</h2>
            <span className="text-xs text-gray-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full">
              {items?.length} productos
            </span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {items?.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors group">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center shrink-0">
                    <Package size={18} className="text-gray-600" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-sm truncate">{p.name}</p>
                    {p.is_featured && <Star size={12} className="text-amber-400 shrink-0 fill-amber-400" />}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    {p.sku && <span className="text-gray-600 text-xs font-mono">{p.sku}</span>}
                    {p.subcategory && <span className="text-gray-600 text-xs">{p.subcategory}</span>}
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-6 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                    p.stock > 0
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {p.stock > 0 ? `${p.stock} en stock` : 'Sin stock'}
                  </span>
                  <span className="text-gray-400 text-sm font-medium w-28 text-right">
                    {p.price
                      ? `$${Number(p.price).toLocaleString('es-CL')}`
                      : <span className="text-gray-600 italic text-xs">A consultar</span>
                    }
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/admin/productos/${p.id}`}
                    className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  >
                    <Pencil size={15} />
                  </Link>
                  <DeleteProductButton id={p.id} name={p.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {(!products || products.length === 0) && (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-16 text-center">
          <Package size={40} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500 mb-4">No hay productos. ¡Crea el primero!</p>
          <Link href="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
            <Plus size={16} /> Crear Producto
          </Link>
        </div>
      )}
    </div>
  )
}

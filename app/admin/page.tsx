import { createSupabaseServerClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Package, FileText, AlertCircle, Star, Plus, ArrowRight } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient()

  const [
    { count: totalProducts },
    { count: totalQuotes },
    { count: pendingQuotes },
    { count: featuredProducts },
    { count: noImageProducts },
    { data: recentQuotes },
    { data: recentProducts },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }).eq('status', 'pendiente'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_featured', true),
    supabase.from('products').select('*', { count: 'exact', head: true }).is('image_url', null),
    supabase.from('quotes').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('products').select('id,name,category,image_url,stock').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Total Productos', value: totalProducts ?? 0, icon: <Package size={20} />, color: 'blue', href: '/admin/productos' },
    { label: 'Cotizaciones', value: totalQuotes ?? 0, icon: <FileText size={20} />, color: 'indigo', href: '/admin/cotizaciones' },
    { label: 'Pendientes', value: pendingQuotes ?? 0, icon: <AlertCircle size={20} />, color: 'amber', href: '/admin/cotizaciones' },
    { label: 'Destacados', value: featuredProducts ?? 0, icon: <Star size={20} />, color: 'emerald', href: '/admin/productos' },
  ]

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    indigo: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Resumen general del sitio</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus size={16} /> Nuevo Producto
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className="group bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-4 ${colorMap[s.color]}`}>
              {s.icon}
            </div>
            <div className="text-3xl font-black text-white mb-1">{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </Link>
        ))}
      </div>

      {(noImageProducts ?? 0) > 0 && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-4">
          <AlertCircle size={18} className="text-amber-400 shrink-0" />
          <p className="text-amber-300 text-sm">
            <span className="font-bold">{noImageProducts} productos</span> sin foto. Agrégalas desde el editor de cada producto.
          </p>
          <Link href="/admin/productos" className="ml-auto text-amber-400 hover:text-amber-300 text-sm font-medium whitespace-nowrap flex items-center gap-1">
            Ver <ArrowRight size={14} />
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent quotes */}
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-bold text-white text-sm">Últimas Cotizaciones</h2>
            <Link href="/admin/cotizaciones" className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
              Ver todas <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentQuotes && recentQuotes.length > 0 ? recentQuotes.map((q: any) => (
              <div key={q.id} className="px-6 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm shrink-0">
                  {q.name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{q.name} {q.surname}</p>
                  <p className="text-gray-500 text-xs truncate">{q.email}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                  q.status === 'pendiente' ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' :
                  q.status === 'respondida' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' :
                  'bg-gray-500/15 text-gray-400 border-gray-500/20'
                }`}>
                  {q.status}
                </span>
              </div>
            )) : (
              <p className="px-6 py-10 text-gray-600 text-sm text-center">Sin cotizaciones aún</p>
            )}
          </div>
        </div>

        {/* Recent products */}
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-bold text-white text-sm">Últimos Productos</h2>
            <Link href="/admin/productos" className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentProducts && recentProducts.length > 0 ? recentProducts.map((p: any) => (
              <Link key={p.id} href={`/admin/productos/${p.id}`}
                className="px-6 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-white/10 shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Package size={14} className="text-gray-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{p.name}</p>
                  <p className="text-gray-500 text-xs">{p.category}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  p.stock > 0
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {p.stock}
                </span>
              </Link>
            )) : (
              <p className="px-6 py-10 text-gray-600 text-sm text-center">Sin productos aún</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

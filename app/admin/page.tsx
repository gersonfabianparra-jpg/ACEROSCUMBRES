import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Package, FileText, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient()

  const [{ count: totalProducts }, { count: totalQuotes }, { data: recentQuotes }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Package size={24} className="text-blue-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Productos</p>
            <p className="text-3xl font-bold text-gray-800">{totalProducts ?? 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <FileText size={24} className="text-green-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Cotizaciones</p>
            <p className="text-3xl font-bold text-gray-800">{totalQuotes ?? 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl">
            <TrendingUp size={24} className="text-orange-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Estado</p>
            <p className="text-lg font-bold text-green-600">Activo</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link href="/admin/productos/nuevo" className="bg-blue-700 text-white rounded-xl p-5 hover:bg-blue-800 transition-colors flex items-center gap-3">
          <Package size={22} />
          <span className="font-semibold">Nuevo Producto</span>
        </Link>
        <Link href="/admin/cotizaciones" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow transition-shadow flex items-center gap-3 text-gray-700">
          <FileText size={22} />
          <span className="font-semibold">Ver Cotizaciones</span>
        </Link>
      </div>

      {/* Cotizaciones recientes */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Clock size={18} /> Cotizaciones Recientes
          </h2>
          <Link href="/admin/cotizaciones" className="text-blue-700 text-sm hover:underline">Ver todas</Link>
        </div>
        {recentQuotes && recentQuotes.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {recentQuotes.map((q: any) => (
              <div key={q.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{q.name} {q.surname}</p>
                  <p className="text-sm text-gray-500">{q.email} · {q.company || 'Sin empresa'}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    q.status === 'pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {q.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(q.created_at).toLocaleDateString('es-CL')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-6 text-center text-gray-400">No hay cotizaciones aún</p>
        )}
      </div>
    </div>
  )
}

import { createSupabaseServerClient } from '@/lib/supabase-server'
import QuoteStatusButton from '@/components/admin/QuoteStatusButton'
import { FileText, Mail, Phone, Building2 } from 'lucide-react'

export default async function AdminCotizacionesPage() {
  const supabase = await createSupabaseServerClient()
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Cotizaciones</h1>
        <p className="text-gray-500 text-sm mt-1">{quotes?.length ?? 0} cotizaciones recibidas</p>
      </div>

      {!quotes || quotes.length === 0 ? (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-16 text-center">
          <FileText size={40} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500">No hay cotizaciones aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q: any) => (
            <div key={q.id} className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-colors">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="w-9 h-9 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm shrink-0">
                      {q.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <h3 className="font-bold text-white text-base">{q.name} {q.surname}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                      q.status === 'pendiente' ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' :
                      q.status === 'contactado' ? 'bg-blue-500/15 text-blue-400 border-blue-500/20' :
                      'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {q.status}
                    </span>
                    <span className="text-gray-600 text-xs ml-auto">
                      {new Date(q.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Mail size={13} className="shrink-0 text-gray-600" /> {q.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Phone size={13} className="shrink-0 text-gray-600" /> {q.phone}
                    </div>
                    {q.company && (
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Building2 size={13} className="shrink-0 text-gray-600" /> {q.company}
                      </div>
                    )}
                    {q.company_rut && (
                      <div className="text-gray-500 text-sm">
                        <span className="text-gray-600">RUT:</span> {q.company_rut}
                      </div>
                    )}
                  </div>

                  {q.message && (
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 mb-4">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        <span className="text-gray-600 font-medium">Mensaje: </span>
                        {q.message}
                      </p>
                    </div>
                  )}

                  {q.items && q.items.length > 0 && (
                    <div>
                      <p className="text-gray-600 text-xs uppercase tracking-wider mb-2 font-medium">
                        {q.items.length} producto(s) solicitado(s)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {q.items.map((item: any, i: number) => (
                          <span key={i} className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-3 py-1.5 rounded-full font-medium">
                            {item.product_name} × {item.quantity} {item.unit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 shrink-0 min-w-[140px]">
                  <QuoteStatusButton id={q.id} currentStatus={q.status} />
                  <a
                    href={`mailto:${q.email}?subject=Cotización Aceros Cumbres`}
                    className="flex items-center justify-center gap-2 text-sm text-gray-300 border border-white/[0.08] px-3 py-2 rounded-xl hover:border-blue-500/30 hover:text-white transition-all"
                  >
                    <Mail size={14} /> Responder
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

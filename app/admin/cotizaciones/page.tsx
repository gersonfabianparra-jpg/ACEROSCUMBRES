import { createSupabaseServerClient } from '@/lib/supabase-server'
import QuoteStatusButton from '@/components/admin/QuoteStatusButton'

export default async function AdminCotizacionesPage() {
  const supabase = await createSupabaseServerClient()
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cotizaciones Recibidas</h1>

      {!quotes || quotes.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400 shadow-sm">
          <p className="text-lg">No hay cotizaciones aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q: any) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{q.name} {q.surname}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      q.status === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      q.status === 'contacto' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-4">
                    <div><span className="text-gray-400">Email:</span> {q.email}</div>
                    <div><span className="text-gray-400">Teléfono:</span> {q.phone}</div>
                    {q.company && <div><span className="text-gray-400">Empresa:</span> {q.company}</div>}
                    {q.company_rut && <div><span className="text-gray-400">RUT:</span> {q.company_rut}</div>}
                  </div>
                  {q.message && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">
                      <span className="font-medium">Mensaje:</span> {q.message}
                    </p>
                  )}
                  {q.items && q.items.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Productos solicitados:</p>
                      <div className="flex flex-wrap gap-2">
                        {q.items.map((item: any, i: number) => (
                          <span key={i} className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">
                            {item.product_name} × {item.quantity} {item.unit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(q.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                  <QuoteStatusButton id={q.id} currentStatus={q.status} />
                  <a href={`mailto:${q.email}`}
                    className="mt-2 block text-center text-sm text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                    Responder
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

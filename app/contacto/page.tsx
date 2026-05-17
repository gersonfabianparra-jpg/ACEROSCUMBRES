'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: '', surname: '', company: '', company_rut: '',
    phone: '', email: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('quotes').insert({
      ...form,
      items: [],
      status: 'contacto',
    })
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', surname: '', company: '', company_rut: '', phone: '', email: '', message: '' })
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Contáctanos</h1>
          <p className="mt-2 text-blue-200">Estamos disponibles para resolver tus dudas y atender tus proyectos</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h2>
          <div className="space-y-5">
            {[
              { icon: <Phone size={20} className="text-blue-700" />, label: 'Teléfono', content: ['+56 2 2840 0951', '+569 2999 7599', '+569 5119 1983'] },
              { icon: <Mail size={20} className="text-blue-700" />, label: 'Email', content: ['contacto@aceroscumbres.cl'] },
              { icon: <MapPin size={20} className="text-blue-700" />, label: 'Dirección', content: ['Av. Apoquindo #6410, Oficina 212', 'Las Condes, Región Metropolitana'] },
              { icon: <Clock size={20} className="text-blue-700" />, label: 'Horario', content: ['Lun–Jue: 8:00 – 17:45', 'Viernes: 8:00 – 17:00'] },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="bg-blue-50 p-3 rounded-xl h-fit">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{item.label}</p>
                  {item.content.map((line) => (
                    <p key={line} className="text-gray-600 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/56929997599"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors w-fit"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Escribir por WhatsApp
          </a>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-800">¡Mensaje enviado!</h3>
              <p className="text-gray-500 mt-2">Te contactaremos a la brevedad.</p>
            </div>
          ) : (
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm">Error al enviar. Intenta nuevamente.</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

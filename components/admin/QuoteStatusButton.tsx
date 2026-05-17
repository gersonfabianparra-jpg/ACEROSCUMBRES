'use client'

import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const STATUSES = ['pendiente', 'en proceso', 'respondida']

export default function QuoteStatusButton({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter()

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const supabase = createSupabaseBrowserClient()
    await supabase.from('quotes').update({ status: e.target.value }).eq('id', id)
    router.refresh()
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}

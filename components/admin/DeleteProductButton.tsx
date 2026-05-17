'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    const supabase = createSupabaseBrowserClient()
    await supabase.from('products').delete().eq('id', id)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
      <Trash2 size={15} />
    </button>
  )
}

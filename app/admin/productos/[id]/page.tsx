import { createSupabaseServerClient } from '@/lib/supabase-server'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditarProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single()

  if (!product) notFound()

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Producto</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ProductForm product={product} />
      </div>
    </div>
  )
}

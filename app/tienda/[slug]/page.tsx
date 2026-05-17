import { createSupabaseServerClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createSupabaseServerClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) notFound()

  const { data: related } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(4)

  return <ProductDetailClient product={product} related={related ?? []} />
}

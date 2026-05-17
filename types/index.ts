export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number | null
  category: string
  subcategory: string | null
  sku: string | null
  stock: number
  unit: string
  image_url: string | null
  specs: Record<string, string> | null
  is_featured: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

export interface QuoteItem {
  product: Product
  quantity: number
}

import ProductForm from '@/components/admin/ProductForm'

export default function NuevoProductoPage() {
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Producto</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ProductForm />
      </div>
    </div>
  )
}

import { Target, Eye, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Nosotros | Aceros Cumbres',
  description: 'Conoce nuestra historia, misión y visión. Fundados en 2018, somos expertos en distribución de materiales de acero en Chile.',
}

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Sobre Nosotros</h1>
          <p className="mt-4 text-blue-100 text-lg">
            Desde 2018, transformando las necesidades del sector industrial y construcción en soluciones concretas.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-700 font-medium uppercase tracking-wider text-sm">Nuestra Historia</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Fundados el 19 de agosto de 2018</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Aceros Cumbres nació en Santiago con el propósito de proporcionar aceros de alta calidad al sector industrial, contribuyendo de manera significativa al desarrollo y éxito de nuestros clientes.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Desde nuestros inicios, nos hemos distinguido por ofrecer atención 100% personalizada, precios competitivos y un compromiso inquebrantable con la satisfacción de cada cliente.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2018', label: 'Año de fundación' },
              { value: '200+', label: 'Productos disponibles' },
              { value: '7', label: 'Sectores atendidos' },
              { value: '2h', label: 'Tiempo de cotización' },
            ].map((stat) => (
              <div key={stat.label} className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-800">{stat.value}</div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Target size={28} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Nuestra Misión</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Transformar las necesidades del sector industrial y construcción en soluciones concretas mediante materiales de acero de calidad superior. Nos distinguimos por ofrecer atención 100% personalizada, precios competitivos y un compromiso inquebrantable con la satisfacción de nuestros clientes.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Eye size={28} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Nuestra Visión</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Ser el líder indiscutible en la distribución de materiales de acero en Chile, destacándose por innovación, profesionalismo y compromiso con la calidad. Aspiramos a ser el socio estratégico preferido por la industria y la construcción a nivel nacional.
            </p>
          </div>
        </div>
      </section>

      {/* Sectores */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Sectores que Atendemos</h2>
          <p className="text-gray-500 mt-2">Soluciones especializadas para diversas industrias</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Minería', 'Construcción', 'Industria Naval', 'Energía', 'Agroindustria', 'Sector Forestal', 'Contratistas', 'Industria General'].map((sector) => (
            <div key={sector} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
              <CheckCircle size={18} className="text-blue-700 shrink-0" />
              <span className="text-gray-700 text-sm font-medium">{sector}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Principios */}
      <section className="bg-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Nuestros Principios</h2>
          <p className="mt-3 text-blue-200">
            Nos basamos en tres pilares fundamentales que guían cada decisión y acción en Aceros Cumbres.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { title: 'Desarrollo', desc: 'Crecimiento continuo y mejora constante de nuestros procesos y productos.' },
              { title: 'Innovación', desc: 'Integración de nuevas tecnologías para satisfacer las demandas del mercado.' },
              { title: 'Autonomía', desc: 'Soluciones independientes y personalizadas para cada cliente.' },
            ].map((p) => (
              <div key={p.title} className="bg-white/10 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-2">{p.title}</h4>
                <p className="text-blue-200 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

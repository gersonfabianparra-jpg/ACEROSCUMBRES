import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { QuoteProvider } from '@/components/ui/QuoteContext'

export const metadata: Metadata = {
  title: 'Aceros Cumbres | Materiales de Construcción en Acero',
  description: 'Expertos en venta y distribución de materiales de construcción en acero. Perfiles, cubiertas, paneles aislados y más. Santiago, Chile.',
  keywords: 'acero, perfiles acero, cubiertas, paneles aislados, construcción, Santiago, Chile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <QuoteProvider>
          <Navbar />
          <main className="pt-[72px]">{children}</main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  )
}

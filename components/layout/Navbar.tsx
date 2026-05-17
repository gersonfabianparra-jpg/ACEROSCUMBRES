'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, ShoppingCart } from 'lucide-react'
import { useQuote } from '@/components/ui/QuoteContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useQuote()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/tienda', label: 'Tienda' },
    { href: '/cotizacion', label: 'Cotización' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-blue-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <a href="tel:+56228400951" className="flex items-center gap-1 hover:text-blue-200">
              <Phone size={14} />
              +56 2 2840 0951
            </a>
            <a href="mailto:contacto@aceroscumbres.cl" className="flex items-center gap-1 hover:text-blue-200">
              <Mail size={14} />
              contacto@aceroscumbres.cl
            </a>
          </div>
          <div className="hidden md:block text-blue-200">
            Lun-Jue 8:00–17:45 | Vie 8:00–17:00
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-800">ACEROS</span>
            <span className="text-2xl font-bold text-gray-600">CUMBRES</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cotizacion"
              className="relative flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <ShoppingCart size={18} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
              Cotizar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-700 font-medium py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

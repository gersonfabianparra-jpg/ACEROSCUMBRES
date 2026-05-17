'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ShoppingCart } from 'lucide-react'
import { useQuote } from '@/components/ui/QuoteContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items } = useQuote()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/tienda', label: 'Tienda' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ]

  const navBg = isHome
    ? scrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
    : 'bg-[#0a1628] shadow-md'

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center h-18 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-black text-white tracking-tight">ACEROS</span>
          <span className="text-xl font-black text-blue-400 tracking-tight">CUMBRES</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+56228400951" className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors">
            <Phone size={15} /> +56 2 2840 0951
          </a>
          <Link href="/cotizacion"
            className="relative flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-500/30">
            <ShoppingCart size={16} />
            Cotizar
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile button */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-gray-300 hover:text-white font-medium py-3 border-b border-white/5"
              onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/cotizacion"
            className="mt-3 bg-blue-500 text-white py-3 rounded-xl text-center font-bold"
            onClick={() => setIsOpen(false)}>
            Cotizar {items.length > 0 && `(${items.length})`}
          </Link>
        </div>
      )}
    </header>
  )
}

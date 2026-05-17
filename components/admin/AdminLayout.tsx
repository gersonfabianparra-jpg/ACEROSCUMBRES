'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, FileText, LogOut, ChevronRight, ExternalLink, Menu } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { useState } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, exact: true },
  { href: '/admin/productos', label: 'Productos', icon: <Package size={18} />, exact: false },
  { href: '/admin/cotizaciones', label: 'Cotizaciones', icon: <FileText size={18} />, exact: false },
]

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : (pathname === item.href || pathname.startsWith(item.href + '/'))

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-[#0d1117] border-r border-white/[0.06] flex flex-col h-full">
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-white font-black text-base tracking-tight">ACEROS</span>
          <span className="text-blue-400 font-black text-base tracking-tight">CUMBRES</span>
        </div>
        <span className="text-[11px] text-gray-600 font-medium uppercase tracking-widest">Admin Panel</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNav}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              {item.icon}
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.06] space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/[0.05] transition-all"
        >
          <ExternalLink size={16} />
          Ver sitio público
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/[0.07] transition-all"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#080d14] flex text-white">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64">
            <SidebarContent onNav={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-4 px-4 py-3 bg-[#0d1117] border-b border-white/[0.06]">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-1">
            <span className="text-white font-black text-sm">ACEROS</span>
            <span className="text-blue-400 font-black text-sm">CUMBRES</span>
          </div>
        </div>

        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

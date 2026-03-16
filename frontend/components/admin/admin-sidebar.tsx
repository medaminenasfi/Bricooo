"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Handshake,
  FolderKanban,
  FileText,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "./auth-context"

const roleNavItems = {
  ADMIN: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads", href: "/admin/leads", icon: Users },
    { label: "Partenaires", href: "/admin/partners", icon: Handshake },
    { label: "Projets", href: "/admin/projects", icon: FolderKanban },
    { label: "Devis", href: "/admin/quotes", icon: FileText },
    { label: "Magazine", href: "/admin/magazine", icon: Newspaper },
    { label: "Parametres", href: "/admin/settings", icon: Settings },
  ],
  COMMERCIAL: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads", href: "/admin/leads", icon: Users },
    { label: "Projets", href: "/admin/projects", icon: FolderKanban },
    { label: "Devis", href: "/admin/quotes", icon: FileText },
  ],
  SUPERVISOR: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projets", href: "/admin/projects", icon: FolderKanban },
  ],
} as const

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { logout, user } = useAuth()
  const navItems = roleNavItems[user?.role || "ADMIN"]

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 sm:top-4 left-3 sm:left-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0B2440] text-white flex items-center justify-center shadow-lg"
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/30 z-50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[280px] sm:w-[272px] bg-[#0B2440] text-white flex flex-col transition-transform duration-300 shadow-[8px_0_30px_rgba(8,19,35,0.18)] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close on mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-3 sm:top-4 right-3 sm:right-4 text-white/60 hover:text-white"
          aria-label="Fermer le menu"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-white/10">
          <Link href="/admin">
            <span className="font-serif text-lg sm:text-xl font-bold text-white">
              HelloBrico
            </span>
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-white/45 mt-0.5">
              Admin
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 sm:px-3 py-3 sm:py-4 space-y-1 sm:space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/78 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User info */}
        {user && (
          <div className="px-4 sm:px-6 py-2 sm:py-3 border-t border-white/10">
            <p className="text-xs font-medium text-white/90 truncate">
              {user.name}
            </p>
            <p className="text-xs text-white/60 truncate">
              {user.email}
            </p>
            <button
              onClick={logout}
              className="mt-2 sm:mt-3 w-full flex items-center gap-2 px-2 sm:px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
            >
              <LogOut size={14} />
              <span className="truncate">Déconnexion</span>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

"use client"

import { usePathname } from "next/navigation"
import { AuthProvider } from "./auth-context"
import { AuthGuard } from "./auth-guard"
import { AdminSidebar } from "./admin-sidebar"
import { NotificationBell } from "./notification-bell"

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <AdminContent>{children}</AdminContent>
      </AuthGuard>
    </AuthProvider>
  )
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  // Login page renders full-screen, no sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  // All other admin pages get the sidebar layout with header
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-[272px]">
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </header>
        <main className="bg-background overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

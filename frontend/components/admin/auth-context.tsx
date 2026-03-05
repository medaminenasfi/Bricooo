"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: { email: string; name: string } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials for frontend-only auth
const DEMO_EMAIL = "admin@hellobrico.tn"
const DEMO_PASSWORD = "admin123"
const AUTH_KEY = "hb_admin_auth"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Check session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
        setIsAuthenticated(true)
      } catch {
        sessionStorage.removeItem(AUTH_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  // Redirect logic
  useEffect(() => {
    if (isLoading) return

    const isLoginPage = pathname === "/admin/login"

    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login")
    }

    if (isAuthenticated && isLoginPage) {
      router.replace("/admin")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 800))

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const userData = { email, name: "Admin HelloBrico" }
      setUser(userData)
      setIsAuthenticated(true)
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(userData))
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    sessionStorage.removeItem(AUTH_KEY)
    router.replace("/admin/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

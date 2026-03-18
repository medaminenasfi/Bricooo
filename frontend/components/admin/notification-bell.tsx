"use client"

import { useEffect, useState } from "react"
import { Bell, Loader2 } from "lucide-react"
import { type NotificationDto } from "@/lib/api"
import { useAuth } from "./auth-context"
import { useRouter } from "next/navigation"

export function NotificationBell() {
  const { token, user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<NotificationDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  
  useEffect(() => {
    const loadNotifications = async () => {
      if (!token) return
      setIsLoading(true)
      
      try {
        // Load from backend API with timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (res.ok) {
          const data = await res.json()
          
          // Backend returns user notifications with nested notification data
          let notifications: NotificationDto[] = []
          
          if (Array.isArray(data)) {
            // Map backend UserNotification to frontend NotificationDto
            notifications = data.map((userNotif: any) => ({
              id: userNotif.notification.id,
              title: userNotif.notification.title,
              content: userNotif.notification.content,
              isSeen: userNotif.isSeen,
              createdAt: userNotif.notification.createdAt
            }))
          } else if (data.data && Array.isArray(data.data)) {
            // Handle wrapped response
            notifications = data.data.map((userNotif: any) => ({
              id: userNotif.notification.id,
              title: userNotif.notification.title,
              content: userNotif.notification.content,
              isSeen: userNotif.isSeen,
              createdAt: userNotif.notification.createdAt
            }))
          }
          
          setNotifications(notifications)
          const unread = notifications.filter((n: any) => !n.isSeen).length
          setUnreadCount(unread)
        } else {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }
      } catch (error) {
        // Handle different types of errors
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.warn("Notifications request timed out")
          } else if (error.message.includes('Failed to fetch')) {
            console.warn("Backend not reachable - notifications unavailable")
          } else {
            console.warn("Notifications error:", error.message)
          }
        } else {
          console.warn("Unknown notifications error:", error)
        }
        
        // Set empty state on any error
        setNotifications([])
        setUnreadCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotifications()
    
    // Refresh notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [token, user])

  const handleClick = () => {
    try {
      router.push('/admin/notifications')
    } catch (error) {
      // Fallback: use window.location
      window.location.href = '/admin/notifications'
    }
  }

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
      title="Notifications"
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Bell size={18} />
      )}
      
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}
